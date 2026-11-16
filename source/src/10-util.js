// ---------- 10-util.js : maths, geometry batching, primitive builders ----------
const T = THREE;
const PI = Math.PI, TAU = PI * 2, DEG = PI / 180;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const $ = (id) => document.getElementById(id);

// Small seeded generator so every load builds the same flat.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- transform stack: furniture is modelled in its own frame, then placed ----
const IDENT = new T.Matrix4();
let CUR = new T.Matrix4();
const _e = new T.Euler(), _q = new T.Quaternion();
function xf(x, y, z, ry, rx, rz, sx, sy, sz) {
  _e.set(rx || 0, ry || 0, rz || 0, 'YXZ');
  _q.setFromEuler(_e);
  return new T.Matrix4().compose(new T.Vector3(x, y, z), _q, new T.Vector3(sx || 1, sy || 1, sz || 1));
}
// ---- polygons [[x, z], ...] (a room's "poly", a slanted wall's footprint) ----
function inPoly(P, x, z) {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, zi] = P[i], [xj, zj] = P[j];
    if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) c = !c;
  }
  return c;
}
const roomHas = (r, x, z) => r.rects.some((q) => x >= q[0] && x <= q[2] && z >= q[1] && z <= q[3]) || (!!r.poly && inPoly(r.poly, x, z));
// x-range of a convex polygon at depth z, or null
function polySpan(P, z) {
  let lo = Infinity, hi = -Infinity;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, zi] = P[i], [xj, zj] = P[j];
    if ((zi - z) * (zj - z) > 0 || zi === zj) { if (zi === z) { lo = Math.min(lo, xi, xj); hi = Math.max(hi, xi, xj); } continue; }
    const x = xi + (xj - xi) * (z - zi) / (zj - zi);
    lo = Math.min(lo, x); hi = Math.max(hi, x);
  }
  return lo <= hi ? [lo, hi] : null;
}
// Axis-aligned boxes in strips of dz that a convex polygon covers: inside (all within it) or around (covering it).
function polyStrips(P, dz, around) {
  const zs = P.map((p) => p[1]), z0 = Math.min(...zs), z1 = Math.max(...zs), n = Math.max(1, Math.ceil((z1 - z0) / dz - 1e-6)), out = [];
  for (let k = 0; k < n; k++) {
    const a = z0 + (z1 - z0) * k / n, b = z0 + (z1 - z0) * (k + 1) / n, sa = polySpan(P, a + (around ? 0 : 1e-6)), sb = polySpan(P, b - (around ? 0 : 1e-6));
    if (!sa || !sb) continue;
    let lo, hi;
    if (around) {
      lo = Math.min(sa[0], sb[0]); hi = Math.max(sa[1], sb[1]);
      for (const [x, z] of P) if (z > a && z < b) { lo = Math.min(lo, x); hi = Math.max(hi, x); }
    } else { lo = Math.max(sa[0], sb[0]); hi = Math.min(sa[1], sb[1]); }
    if (hi - lo > 0.01) out.push([lo, a, hi, b]);
  }
  return out;
}
// A flat polygon at height y facing up (or down), cut into triangles no longer than cell for the light bake.
function polyGeo(P, y, cell, up) {
  const tri = T.ShapeUtils.triangulateShape(P.map(([x, z]) => new T.Vector2(x, z)), []), pos = [], nor = [];
  const len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  for (const [ia, ib, ic] of tri) {
    const A = P[ia], Bq = P[ib], C = P[ic], n = Math.max(1, Math.ceil(Math.max(len(A, Bq), len(Bq, C), len(C, A)) / cell));
    const pt = (i, j) => [A[0] + (Bq[0] - A[0]) * i / n + (C[0] - A[0]) * j / n, A[1] + (Bq[1] - A[1]) * i / n + (C[1] - A[1]) * j / n];
    const add = (p, q, r) => {
      const cy = (q[1] - p[1]) * (r[0] - p[0]) - (q[0] - p[0]) * (r[1] - p[1]);   // y of (q - p) x (r - p)
      if ((cy > 0) !== up) { const t = q; q = r; r = t; }
      for (const v of [p, q, r]) { pos.push(v[0], y, v[1]); nor.push(0, up ? 1 : -1, 0); }
    };
    for (let i = 0; i < n; i++) for (let j = 0; j < n - i; j++) {
      add(pt(i, j), pt(i + 1, j), pt(i, j + 1));
      if (i + j < n - 1) add(pt(i + 1, j), pt(i + 1, j + 1), pt(i, j + 1));
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
  return g;
}

function place(x, y, z, ry, fn) {
  const save = CUR;
  CUR = save.clone().multiply(xf(x, y, z, ry));
  try { fn(); } finally { CUR = save; }
}

// ---- batches: every static piece is merged into one mesh per material ----
function newBatch() { return { pos: [], nor: [], uv: [], idx: [], flg: [], count: 0 }; }
const STATIC = new Map();
let TARGET = STATIC;
const OCC_SETS = new Set([STATIC]);   // sets whose solid pieces get light stand-ins (the shell and the furniture)
function batch(name) {
  let b = TARGET.get(name);
  if (!b) { b = newBatch(); TARGET.set(name, b); }
  return b;
}
// Collects the pieces built by fn into a separate set of batches (doors, which move; ceilings, which the plan view hides).
// REMAP sends a set elsewhere while it holds an entry (furniture's ceiling parts go to their own set, so they can be hidden).
const REMAP = new Map();
function into(map, fn) {
  map = REMAP.get(map) || map;
  const save = TARGET, saveM = CUR;
  TARGET = map; CUR = new T.Matrix4();
  try { fn(); } finally { TARGET = save; CUR = saveM; }
  return map;
}

const _v = new T.Vector3(), _n = new T.Vector3(), _nm = new T.Matrix3(), _mw = new T.Matrix4();
let pieceNo = 0;
// Appends a geometry to a batch with `local` (and the current placement) baked in.
// o.uv: 'box' (default) projects local coordinates so textures keep a real-world scale; 'keep' uses the geometry's uvs.
// o.free: the piece sits inside another solid on purpose (a sink in a worktop), so the light bake must not treat it as buried.
function put(matName, geo, local, o) {
  o = o || {};
  const b = batch(matName), P = geo.attributes.position, N = geo.attributes.normal, UV = geo.attributes.uv;
  _mw.multiplyMatrices(CUR, local || IDENT);
  _nm.getNormalMatrix(_mw);
  const base = b.count, s = o.uvScale || 1, mode = o.uv || 'box', flag = o.free ? 2 : 0;
  pieceNo++;
  const uo = o.uo !== undefined ? o.uo : (pieceNo * 0.377) % 1, vo = o.vo !== undefined ? o.vo : (pieceNo * 0.613) % 1;
  for (let i = 0; i < P.count; i++) {
    _v.fromBufferAttribute(P, i);
    _n.fromBufferAttribute(N, i);
    let u = 0, v = 0;
    if (mode === 'box') {
      const ax = Math.abs(_n.x), ay = Math.abs(_n.y), az = Math.abs(_n.z);
      if (ay >= ax && ay >= az) { u = _v.x; v = _v.z; } else if (ax >= az) { u = _v.z; v = _v.y; } else { u = _v.x; v = _v.y; }
      if (o.swap) { const t = u; u = v; v = t; }
      u = u * s + uo; v = v * s + vo;
    } else if (UV) { u = UV.getX(i) * s; v = UV.getY(i) * s; }
    _v.applyMatrix4(_mw);
    _n.applyMatrix3(_nm).normalize();
    b.pos.push(_v.x, _v.y, _v.z);
    b.nor.push(_n.x, _n.y, _n.z);
    b.uv.push(u, v);
    b.flg.push(flag);
  }
  const ix = geo.index;
  if (ix) for (let i = 0; i < ix.count; i++) b.idx.push(base + ix.getX(i));
  else for (let i = 0; i < P.count; i++) b.idx.push(base + i);
  b.count += P.count;
  geo.dispose();
}

// Tessellated quad: points o + U*us[i] + V*vs[j]; the front face looks along U x V.
// skip(i, j) leaves a cell out (openings in walls, the parts of an L-shaped floor that are not there).
function quadGrid(matName, ox, oy, oz, U, V, us, vs, uvOf, skip) {
  const b = batch(matName), w = us.length, id = new Int32Array(w * vs.length).fill(-1);
  const nx = U[1] * V[2] - U[2] * V[1], ny = U[2] * V[0] - U[0] * V[2], nz = U[0] * V[1] - U[1] * V[0];
  const vert = (i, j) => {
    const k = j * w + i;
    if (id[k] < 0) {
      const x = ox + U[0] * us[i] + V[0] * vs[j], y = oy + U[1] * us[i] + V[1] * vs[j], z = oz + U[2] * us[i] + V[2] * vs[j];
      b.pos.push(x, y, z);
      b.nor.push(nx, ny, nz);
      const uv = uvOf ? uvOf(x, y, z) : UV0;
      b.uv.push(uv[0], uv[1]);
      b.flg.push(0);
      id[k] = b.count++;
    }
    return id[k];
  };
  for (let j = 0; j < vs.length - 1; j++) {
    for (let i = 0; i < w - 1; i++) {
      if (skip && skip(i, j)) continue;
      const a = vert(i, j), c = vert(i + 1, j), d = vert(i, j + 1), e = vert(i + 1, j + 1);
      b.idx.push(a, c, e, a, e, d);
    }
  }
}
const UV0 = [0, 0];
// Grid lines from a to b: the ends, every `hard` position in between, and world multiples of `cell` in the gaps.
// Two neighbouring grids that share their hard positions therefore share their vertices, so no seams open between them.
function ticks(a, b, cell, hard) {
  const pts = [a, b];
  if (hard) for (const h of hard) if (h > a + 1e-6 && h < b - 1e-6) pts.push(h);
  pts.sort((p, q) => p - q);
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    if (i && pts[i] - pts[i - 1] <= 1e-6) continue;
    if (i) for (let k = Math.ceil((pts[i - 1] + 0.03) / cell); k * cell < pts[i] - 0.03; k++) out.push(k * cell);
    out.push(pts[i]);
  }
  return out;
}

// ---- light occluders (for the light bake) and walk colliders ----
const OCC = { box: [], alb: [] };
function occBox(x0, y0, z0, x1, y1, z1, alb) {
  OCC.box.push(x0, y0, z0, x1, y1, z1);
  OCC.alb.push(alb[0], alb[1], alb[2]);
}
function occLocal(local, w, h, d, alb) {
  _mw.multiplyMatrices(CUR, local);
  let x0 = 1e9, y0 = 1e9, z0 = 1e9, x1 = -1e9, y1 = -1e9, z1 = -1e9;
  for (let i = 0; i < 8; i++) {
    _v.set((i & 1 ? 0.5 : -0.5) * w, (i & 2 ? 0.5 : -0.5) * h, (i & 4 ? 0.5 : -0.5) * d).applyMatrix4(_mw);
    x0 = Math.min(x0, _v.x); y0 = Math.min(y0, _v.y); z0 = Math.min(z0, _v.z);
    x1 = Math.max(x1, _v.x); y1 = Math.max(y1, _v.y); z1 = Math.max(z1, _v.z);
  }
  occBox(x0, y0, z0, x1, y1, z1, alb);
}
const COL = [];   // k:0 rect {x0,z0,x1,z1} | k:1 circle {x,z,r} | k:2 rotated rect {x,z,hx,hz,c,s}
function colRect(x0, z0, x1, z1) {
  const e = CUR.elements, a = Math.atan2(-e[2], e[0]);
  _v.set((x0 + x1) / 2, 0, (z0 + z1) / 2).applyMatrix4(CUR);
  const hx = Math.abs(x1 - x0) / 2, hz = Math.abs(z1 - z0) / 2, c = Math.cos(a), s = Math.sin(a);
  let col;
  if (Math.abs(s) < 1e-3) col = { k: 0, x0: _v.x - hx, z0: _v.z - hz, x1: _v.x + hx, z1: _v.z + hz };
  else if (Math.abs(c) < 1e-3) col = { k: 0, x0: _v.x - hz, z0: _v.z - hx, x1: _v.x + hz, z1: _v.z + hx };
  else col = { k: 2, x: _v.x, z: _v.z, hx, hz, c, s };
  COL.push(col);
  return col;
}
function colCircle(x, z, r) {
  _v.set(x, 0, z).applyMatrix4(CUR);
  const col = { k: 1, x: _v.x, z: _v.z, r };
  COL.push(col);
  return col;
}

// ---- primitives (y0 is the underside of the piece) ----
const seg = (len, cell) => clamp(Math.ceil(len / cell - 1e-6), 1, 24);
function wantsOcc(o, w, h, d) {
  if (!OCC_SETS.has(TARGET)) return false;
  if (o.occ !== undefined) return o.occ;
  const s = [w, h, d].sort((a, b) => a - b);
  return s[1] >= 0.2 && w * h * d >= 0.002;
}
function albOf(matName) { const m = MAT[matName]; return (m && m.userData.alb) || [0.5, 0.5, 0.5]; }

function B(matName, x, y0, z, w, h, d, o) {
  o = o || {};
  const cell = o.cell || 0.4;
  const g = new T.BoxGeometry(w, h, d, seg(w, cell), seg(h, cell), seg(d, cell));
  const m = xf(x, y0 + h / 2, z, o.ry, o.rx, o.rz);
  put(matName, g, m, o);
  if (wantsOcc(o, w, h, d)) occLocal(m, w, h, d, albOf(matName));
}

// The same box given by two opposite corners, which is how the plan thinks.
function BX(matName, x0, y0, z0, x1, y1, z1, o) { B(matName, (x0 + x1) / 2, y0, (z0 + z1) / 2, x1 - x0, y1 - y0, z1 - z0, o); }

// Box with rounded edges: a cube-face grid pushed out from the inner box by r.
function roundedBoxGeo(w, h, d, r, k, cell) {
  r = Math.max(0.001, Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4));
  k = k || 3; cell = cell || 0.35;
  const axis = (len) => {
    const hi = len / 2 - r, out = [];
    for (let j = k; j >= 1; j--) out.push(-hi - r * Math.tan((j / k) * PI / 4));
    const n = Math.max(1, Math.ceil((2 * hi) / cell));
    for (let j = 0; j <= n; j++) out.push(-hi + (2 * hi * j) / n);
    for (let j = 1; j <= k; j++) out.push(hi + r * Math.tan((j / k) * PI / 4));
    return out;
  };
  const A = [axis(w), axis(h), axis(d)], half = [w / 2, h / 2, d / 2], inner = [w / 2 - r, h / 2 - r, d / 2 - r];
  const pos = [], nor = [], idx = [];
  // each face: fixed axis f at sign sg, grid over axes u,v chosen so that u x v points outwards
  const faces = [[0, 1, 2, 1], [0, 2, 1, -1], [1, 2, 0, 1], [1, 0, 2, -1], [2, 0, 1, 1], [2, 1, 0, -1]];
  const p = [0, 0, 0];
  for (const [f, u, v, sg] of faces) {
    const base = pos.length / 3, U = A[u], V = A[v];
    for (let j = 0; j < V.length; j++) {
      for (let i = 0; i < U.length; i++) {
        p[f] = sg * half[f]; p[u] = U[i]; p[v] = V[j];
        const cx = clamp(p[0], -inner[0], inner[0]), cy = clamp(p[1], -inner[1], inner[1]), cz = clamp(p[2], -inner[2], inner[2]);
        let dx = p[0] - cx, dy = p[1] - cy, dz = p[2] - cz;
        const l = Math.hypot(dx, dy, dz) || 1;
        dx /= l; dy /= l; dz /= l;
        pos.push(cx + dx * r, cy + dy * r, cz + dz * r);
        nor.push(dx, dy, dz);
      }
    }
    const wU = U.length;
    for (let j = 0; j < V.length - 1; j++) {
      for (let i = 0; i < wU - 1; i++) {
        const a = base + j * wU + i, c = a + 1, dd = a + wU, e = dd + 1;
        idx.push(a, c, e, a, e, dd);
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}
function RB(matName, x, y0, z, w, h, d, r, o) {
  o = o || {};
  const g = roundedBoxGeo(w, h, d, r, o.k || 2, o.cell || 0.4);
  const m = xf(x, y0 + h / 2, z, o.ry, o.rx, o.rz);
  put(matName, g, m, o);
  if (wantsOcc(o, w, h, d)) occLocal(m, w - r * 0.6, h - r * 0.6, d - r * 0.6, albOf(matName));
}

// Keeps only the lower half of a geometry and turns it inside out: the inside of a basin, tub or bowl.
function hollowLower(g) {
  const P = g.attributes.position, N = g.attributes.normal, ix = g.index, keep = [];
  for (let i = 0; i < ix.count; i += 3) {
    const a = ix.getX(i), b = ix.getX(i + 1), c = ix.getX(i + 2);
    if (P.getY(a) <= 1e-5 && P.getY(b) <= 1e-5 && P.getY(c) <= 1e-5) keep.push(a, c, b);
  }
  for (let i = 0; i < N.count; i++) N.setXYZ(i, -N.getX(i), -N.getY(i), -N.getZ(i));
  g.setIndex(keep);
  return g;
}
// Open basin whose rim sits at yTop: inner size w x d, depth, corner radius r.
function basin(matName, x, yTop, z, w, d, depth, r, o) {
  const g = hollowLower(roundedBoxGeo(w, depth * 2, d, r, 3, Math.max(depth, 0.05)));
  put(matName, g, xf(x, yTop, z, o && o.ry), Object.assign({ occ: false }, o));
}
// Flat ring between an outer rectangle and a rounded-rectangle hole (tub and basin rims, worktop cut-outs).
function rimGeo(w, d, hw, hd, hr) {
  const s = new T.Shape();
  s.moveTo(-w / 2, -d / 2); s.lineTo(w / 2, -d / 2); s.lineTo(w / 2, d / 2); s.lineTo(-w / 2, d / 2); s.closePath();
  const hx = hw / 2, hz = hd / 2, q = new T.Path();
  q.moveTo(-hx + hr, -hz); q.lineTo(hx - hr, -hz); q.absarc(hx - hr, -hz + hr, hr, -PI / 2, 0, false);
  q.lineTo(hx, hz - hr); q.absarc(hx - hr, hz - hr, hr, 0, PI / 2, false);
  q.lineTo(-hx + hr, hz); q.absarc(-hx + hr, hz - hr, hr, PI / 2, PI, false);
  q.lineTo(-hx, -hz + hr); q.absarc(-hx + hr, -hz + hr, hr, PI, PI * 1.5, false);
  s.holes.push(q);
  const g = new T.ShapeGeometry(s, 6);
  g.rotateX(-PI / 2);
  return g;
}
function rim(matName, x, y, z, w, d, hw, hd, hr, o) { put(matName, rimGeo(w, d, hw, hd, hr), xf(x, y, z, o && o.ry), o); }

function CY(matName, x, y0, z, rTop, rBot, h, o) {
  o = o || {};
  const g = new T.CylinderGeometry(rTop, rBot, h, o.seg || 20, o.hseg || 1, !!o.open, o.t0 || 0, o.tl || TAU);
  const m = xf(x, y0 + h / 2, z, o.ry, o.rx, o.rz, o.sx, 1, o.sz);
  put(matName, g, m, Object.assign({ uv: 'keep' }, o));
  const r = Math.max(rTop, rBot);
  // the stand-in box for the light bake sits inside the round shape, so none of its surface ends up buried
  if (OCC_SETS.has(TARGET) && (o.occ !== undefined ? o.occ : r >= 0.15 && h >= 0.2)) occLocal(m, r * 1.38, h, r * 1.38, albOf(matName));
}
// Solid of revolution; profile points [radius, height] listed bottom to top face outwards.
function LA(matName, x, y0, z, pts, o) {
  o = o || {};
  const g = new T.LatheGeometry(pts.map((p) => new T.Vector2(Math.max(p[0], 1e-4), p[1])), o.seg || 20);
  put(matName, g, xf(x, y0, z, o.ry, o.rx, o.rz, o.sx, o.sy, o.sz), Object.assign({ uv: 'keep' }, o));
}
function SP(matName, x, y, z, r, o) {
  o = o || {};
  put(matName, new T.SphereGeometry(r, o.seg || 14, o.hseg || 10), xf(x, y, z, o.ry, o.rx, o.rz, o.sx, o.sy, o.sz), Object.assign({ uv: 'keep' }, o));
}
// Stuffed cushion sewn round its edge: a top and a bottom skin that meet at a seam, plus a flat flange sticking out of it.
// Thickness falls off as (1 - |s|^p)^q towards each edge, so the corners pinch in as on a real pillow.
// Lying flat: w along X, d along Z, h thick (o.lower: the share of h below the seam). The seam plane is at y 0.
// o.flange: how far the flange sticks out; o.seed: a little uneven stuffing. UVs are in metres.
function pillowGeo(w, h, d, o) {
  o = o || {};
  const fl = o.flange === undefined ? 0.02 : o.flange, ft = 0.004, p = o.p || 4, q = o.q || 0.42, cell = o.cell || 0.035;
  const hb = h * (o.lower === undefined ? 0.5 : o.lower), ht = h - hb, R = rng(o.seed || 7);
  const ph = [R() * TAU, R() * TAU, R() * TAU], lump = o.lump === undefined ? 0.05 : o.lump;
  // samples crowd towards the edges, where the shape bends most; the flange edge is the last sample
  const axis = (len) => {
    const n = Math.max(6, Math.ceil(len / cell)), out = [];
    for (let i = 0; i <= n; i++) { const t = -1 + 2 * i / n; out.push(Math.sign(t) * Math.pow(Math.abs(t), 0.75)); }
    return fl > 0 ? [-1 - fl / (len / 2), ...out, 1 + fl / (len / 2)] : out;
  };
  const U = axis(w), V = axis(d), nu = U.length, nv = V.length;
  const f = (s) => (Math.abs(s) >= 1 ? 0 : Math.pow(1 - Math.pow(Math.abs(s), p), q));
  const pos = [], uv = [], idx = [];
  for (const side of [1, -1]) {
    for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
      const x = U[i] * w / 2, z = V[j] * d / 2, k = f(U[i]) * f(V[j]);
      const bump = 1 + lump * Math.sin(x * 7.1 + ph[0]) * Math.sin(z * 6.3 + ph[1]) + lump * 0.6 * Math.sin((x + z) * 11 + ph[2]);
      pos.push(x, side * Math.max(ft, (side > 0 ? ht : hb) * k * bump), z);
      uv.push(x, z);
    }
  }
  const off = nu * nv, at = (i, j) => j * nu + i;
  for (let j = 0; j < nv - 1; j++) for (let i = 0; i < nu - 1; i++) {
    const a = at(i, j), c = at(i + 1, j), dd = at(i, j + 1), e = at(i + 1, j + 1);
    idx.push(a, dd, c, c, dd, e);                                    // top skin faces up
    idx.push(off + a, off + c, off + dd, off + c, off + e, off + dd); // bottom skin faces down
  }
  // close the flange edge: walk the rim (back edge, east, front, west) and join the two skins
  const ring = [];
  for (let i = 0; i < nu - 1; i++) ring.push(at(i, 0));
  for (let j = 0; j < nv - 1; j++) ring.push(at(nu - 1, j));
  for (let i = nu - 1; i > 0; i--) ring.push(at(i, nv - 1));
  for (let j = nv - 1; j > 0; j--) ring.push(at(0, j));
  for (let r = 0; r < ring.length; r++) {
    const a = ring[r], b = ring[(r + 1) % ring.length];
    idx.push(a, b, off + a, b, off + b, off + a);
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
// A pillow with its seam centred on (x, y, z). Stand one up with rx near PI/2 (its crown then faces +Z).
// No light stand-in: a soft shape is never a box.
function PIL(matName, x, y, z, w, h, d, o) {
  o = o || {};
  put(matName, pillowGeo(w, h, d, o), xf(x, y, z, o.ry, o.rx, o.rz), Object.assign({ uv: 'keep', uo: x * 0.37, vo: z * 0.61 }, o));
}
// Round tube through points [[x,y,z],...]
function TU(matName, pts, r, o) {
  o = o || {};
  const curve = new T.CatmullRomCurve3(pts.map((p) => new T.Vector3(p[0], p[1], p[2])), false, 'catmullrom', o.tension === undefined ? 0.5 : o.tension);
  put(matName, new T.TubeGeometry(curve, o.n || pts.length * 6, r, o.seg || 8, false), IDENT, Object.assign({ uv: 'keep' }, o));
}
// Straight round bar between two points.
function BAR(matName, a, b, r, o) {
  const d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), len = d.length();
  const g = new T.CylinderGeometry(r, (o && o.r2) || r, len, (o && o.seg) || 8, 1, false);
  const q = new T.Quaternion().setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
  const m = new T.Matrix4().compose(new T.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), q, new T.Vector3(1, 1, 1));
  put(matName, g, m, Object.assign({ uv: 'keep' }, o));
}
// Bends a geometry around the vertical axis: x runs along the arc, z is the distance from it.
// The middle of the piece stays put and its ends curl towards -Z.
function bendGeo(g, R) {
  const P = g.attributes.position, N = g.attributes.normal;
  for (let i = 0; i < P.count; i++) {
    const a = P.getX(i) / R, rr = R + P.getZ(i), c = Math.cos(a), s = Math.sin(a);
    P.setXYZ(i, s * rr, P.getY(i), c * rr - R);
    if (N) { const nx = N.getX(i), nz = N.getZ(i); N.setXYZ(i, nx * c + nz * s, N.getY(i), -nx * s + nz * c); }
  }
  if (!N) g.computeVertexNormals();
  return g;
}

// ---- turning batches into meshes ----
function buildMeshes(map, parent) {
  const out = [];
  for (const [name, b] of map) {
    if (!b.count) continue;
    const m = MAT[name];
    if (!m) throw new Error('unknown material: ' + name);
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(b.pos, 3));
    g.setAttribute('normal', new T.Float32BufferAttribute(b.nor, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(b.uv, 2));
    g.setIndex(b.count > 65535 ? new T.Uint32BufferAttribute(b.idx, 1) : new T.Uint16BufferAttribute(b.idx, 1));
    if (m.userData.bake) {
      // until the light bake arrives every vertex gets the same soft light
      g.setAttribute('bakeA', new T.Float32BufferAttribute(new Float32Array(b.count * 3).fill(0.9), 3));
      g.setAttribute('bakeB', new T.Float32BufferAttribute(new Float32Array(b.count * 3), 3));
      g.setAttribute('bakeC', new T.Float32BufferAttribute(new Float32Array(b.count * 3), 3));
    }
    const mesh = new T.Mesh(g, m);
    mesh.name = name;
    mesh.castShadow = !!m.userData.cast;
    mesh.receiveShadow = !!m.userData.recv;
    mesh.userData.flg = b.flg;
    parent.add(mesh);
    out.push(mesh);
  }
  return out;
}
