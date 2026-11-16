'use strict';
const FLAT = {"name":"onebed62r","file":"onebed-balcony-62m2-rebuild","title":{"ka":"ბინა","en":"One-bedroom flat","rooms":"6 rooms incl. balcony"},"total":61.67,"ref":{"image":"onebed62r.png","ppm":55.8,"origin":[195,0],"turn":180},"start":[3.53,0.538,180],"rooms":[{"id":"hall","ka":"ჰოლი","en":"Hall","area":4.24,"rects":[[2.76,0.197,4.283,2.903],[4.283,1.201,4.352,2.903]],"label":[3.495,1.703],"floor":{"mat":"floorHall","uv":"plank"}},{"id":"kit","ka":"სამზარეულო","en":"Kitchen","area":6.49,"rects":[[4.373,0.197,5.789,0.627],[6.613,0.197,6.792,0.627],[4.373,0.627,6.792,1.201],[4.352,1.201,6.792,2.903],[4.352,2.903,6.523,3.024]],"label":[5.287,1.882],"floor":{"mat":"floorLiv","uv":"tile"}},{"id":"living","ka":"საერთო ოთახი","en":"Living room","area":18.87,"rects":[[3.513,2.903,4.352,3.024],[3.513,3.024,6.523,4.14],[3.513,4.14,6.792,8.566],[3.513,8.566,5.896,8.978]],"label":[4.57,7.885],"floor":{"mat":"floorLiv","uv":"plank"}},{"id":"bed","ka":"საძინებელი","en":"Bedroom","area":16.15,"rects":[[0.305,4.14,3.423,8.566],[1.057,8.566,3.423,8.978],[2.222,2.975,3.423,4.14]],"label":[1.882,8.065],"floor":{"mat":"floorBed","uv":"plank"}},{"id":"bath","ka":"WC","en":"Bathroom","area":7.41,"rects":[[1.057,0.197,2.688,0.627],[0.52,0.627,2.688,2.885],[0.627,2.885,2.151,4.068]],"label":[1.703,1.792],"floor":{"mat":"floorBath","uv":"tile"},"walls":"wallTile"},{"id":"balc","ka":"აივანი","en":"Balcony","area":7.93,"rects":[[0.305,9.265,6.846,10.477]],"label":[1.882,9.946],"outdoor":true}],"walls":[[0.323,0,7.151,0.197],[0.323,0.197,0.52,2.885],[0,2.885,0.627,4.14],[0,4.14,0.305,9.265],[0.305,8.566,1.057,8.978],[6.792,0.197,7.151,9.265],[6.523,2.903,6.792,4.14],[5.896,8.566,6.792,8.978],[0.305,8.978,7.151,9.265],[3.423,2.975,3.513,8.978],[2.151,2.885,3.513,2.975],[2.151,2.975,2.222,4.068],[0.627,4.068,2.222,4.14],[2.688,0.197,2.76,2.885],[4.283,0.197,4.373,1.201]],"shafts":[{"rect":[0.52,0.197,1.057,0.627]},{"rect":[5.789,0.197,6.613,0.627]}],"openings":[{"id":"entry","kind":"entry","axis":"x","at":[0,0.197],"a":3.047,"b":3.996,"handle":"a"},{"id":"bath","kind":"door","axis":"z","at":[2.688,2.76],"a":1.254,"b":2.079,"leaf":"plain","hinge":"a","into":-1,"rest":0.4},{"id":"bed","kind":"door","axis":"z","at":[3.423,3.513],"a":3.118,"b":4.05,"leaf":"plain","hinge":"a","into":-1,"rest":0.4},{"id":"winBed","kind":"window","axis":"x","at":[8.978,9.265],"a":1.111,"b":2.097},{"id":"balcBed","kind":"door","axis":"x","at":[8.978,9.265],"a":2.133,"b":2.975,"leaf":"glazed","hinge":"a","into":1,"rest":0.3},{"id":"balcLiv","kind":"door","axis":"x","at":[8.978,9.265],"a":3.548,"b":4.409,"leaf":"glazed","hinge":"b","into":1,"rest":0.3},{"id":"winLiv","kind":"window","axis":"x","at":[8.978,9.265],"a":4.444,"b":5.412}],"rails":[{"pts":[[0.305,9.265],[0.305,10.477],[6.846,10.477],[6.846,9.265]]}],"switches":[],"furniture":[{"t":"counter","rect":[4.373,0.197,5.789,0.932],"face":"s","sink":0.6},{"t":"counter","rect":[6.183,0.627,6.792,2.832],"face":"w","hob":0.5},{"t":"kitchenShelf","x":5.072,"z":0.197,"r":0},{"t":"fruitBowl","x":4.928,"z":0.448},{"t":"diningSet","x":5.108,"z":2.903,"w":0.9,"d":0.9,"ends":"","endPlates":false},{"t":"pendant","x":5.108,"z":2.903},{"t":"downlight","x":5.287,"z":1.075,"I":0.85,"col":"COOL","ch":1},{"t":"downlight","x":5.287,"z":2.151,"I":0.85,"col":"COOL","ch":1},{"t":"sofa","x":6.237,"z":6.272,"r":-90},{"t":"rug","rect":[4.391,4.839,5.914,7.706],"mat":"rugTri"},{"t":"block","rect":[4.857,5.412,5.52,7.097],"h":0.4,"mat":"oak"},{"t":"media","x":3.513,"z":6.272,"r":0},{"t":"floorLamp","x":6.523,"z":8.333},{"t":"plantLeafy","x":6.47,"z":4.444,"seed":3,"h":1.3,"n":16,"leaf":0.3,"mats":["leafA","leafA","leafD"],"pot":"pot","potR":0.16,"potH":0.32},{"t":"downlight","x":4.211,"z":5.018},{"t":"downlight","x":6.004,"z":5.018},{"t":"downlight","x":4.211,"z":7.527},{"t":"downlight","x":6.004,"z":7.527},{"t":"bed","x":1.416,"z":6.9,"r":0},{"t":"nightTable","x":0.538,"z":5.699},{"t":"nightTable","x":0.538,"z":8.1},{"t":"closet","rect":[0.305,4.14,2.168,4.946],"face":"s"},{"t":"ceilingLamp","x":1.882,"z":6.81,"s":0.22,"I":1.6,"col":"SOFT","ch":2},{"t":"closet","rect":[2.76,2.294,3.513,2.903],"face":"n"},{"t":"rug","rect":[3.1,0.323,3.943,0.806],"mat":"rubber"},{"t":"ceilingLamp","x":3.53,"z":1.703,"s":0.11,"I":0.6,"col":"COOL","ch":1},{"t":"toilet","x":1.918,"z":0.197},{"t":"washer","x":0.824,"z":0.627},{"t":"vanity","x":0.52,"z":2.061,"r":90},{"t":"shower","x":1.38,"z":2.975,"w":1.4,"d":1.05,"glass":"e"},{"t":"ceilingLamp","x":1.613,"z":1.703,"s":0.16,"I":1,"col":"COOL","ch":1},{"t":"bistroTable","x":6.183,"z":9.767},{"t":"rattanChair","x":5.645,"z":9.767,"r":-90},{"t":"planter","x":0.717,"z":9.677,"seed":21},{"t":"ceilingLamp","x":3.674,"z":9.857,"s":0.14,"I":0.9,"col":"SOFT","ch":2}],"bounds":[0,0,7.151,10.477],"map":{"x0":-0.2,"z0":-0.2,"w":7.551,"d":10.877},"digits":2};
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

// ---------- 20-mats.js : procedural textures and materials ----------
const MAT = {}, TEX = {};
let ANISO = 4;

// Baked light arrives as three per-vertex colours: A daylight, B lamps that are always on, C evening lamps.
const UNI = {
  uBA: { value: new T.Vector3(1, 1, 1) },
  uBB: { value: new T.Vector3(1, 1, 1) },
  uBC: { value: new T.Vector3(0, 0, 0) },
  uSpec: { value: 0.3 },
};
let LFB = '', LFM = '';
function patchChunks() {
  const a = 'vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );';
  const b = 'iblIrradiance += getIBLIrradiance( geometryNormal );';
  const c = 'radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );';
  const s1 = T.ShaderChunk.lights_fragment_begin, s2 = T.ShaderChunk.lights_fragment_maps;
  if (!s1.includes(a) || !s2.includes(b) || !s2.includes(c)) throw new Error('this page needs three.js r159 (shader chunks differ)');
  LFB = s1.replace(a, 'vec3 irradiance = getAmbientLightIrradiance( ambientLightColor ) + vBake;');
  // The environment map only adds reflections, dimmed where the baked light says the place is dark.
  LFM = s2.replace(b, '').replace(c, 'radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness ) * clamp( dot( vBake, vec3( uSpec ) ), 0.0, 1.0 );');
}
function bakePatch(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uBA = UNI.uBA; sh.uniforms.uBB = UNI.uBB; sh.uniforms.uBC = UNI.uBC; sh.uniforms.uSpec = UNI.uSpec;
    sh.vertexShader = 'attribute vec3 bakeA;\nattribute vec3 bakeB;\nattribute vec3 bakeC;\nuniform vec3 uBA;\nuniform vec3 uBB;\nuniform vec3 uBC;\nvarying vec3 vBake;\n' +
      sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvBake = bakeA * uBA + bakeB * uBB + bakeC * uBC;');
    sh.fragmentShader = 'varying vec3 vBake;\nuniform float uSpec;\n' +
      sh.fragmentShader.replace('#include <lights_fragment_begin>', LFB).replace('#include <lights_fragment_maps>', LFM);
  };
  m.customProgramCacheKey = () => 'bake';
}

const rgb = (c, a) => (a === undefined ? 'rgb(' : 'rgba(') + Math.round(clamp(c[0], 0, 255)) + ',' + Math.round(clamp(c[1], 0, 255)) + ',' + Math.round(clamp(c[2], 0, 255)) + (a === undefined ? ')' : ',' + a + ')');
function tex(w, h, draw, o) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d', { willReadFrequently: true }), w, h);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = (o && o.clamp) ? T.ClampToEdgeWrapping : T.RepeatWrapping;
  t.anisotropy = ANISO;
  if (o && o.rep) t.repeat.set(o.rep[0], o.rep[1]);
  return t;
}
function grainNoise(g, w, h, amt, R) {
  const im = g.getImageData(0, 0, w, h), d = im.data;
  for (let i = 0; i < d.length; i += 4) { const n = (R() - 0.5) * amt; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(im, 0, 0);
}
function blotches(g, w, h, n, R, rMin, rMax, a) {
  for (let i = 0; i < n; i++) {
    const x = R() * w, y = R() * h, r = rMin + R() * (rMax - rMin), dark = R() < 0.5;
    for (const ox of [-w, 0, w]) for (const oy of [-h, 0, h]) {
      if (x + ox + r < 0 || x + ox - r > w || y + oy + r < 0 || y + oy - r > h) continue;
      const gr = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
      gr.addColorStop(0, dark ? 'rgba(0,0,0,' + a + ')' : 'rgba(255,255,255,' + a + ')');
      gr.addColorStop(1, dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(x + ox - r, y + oy - r, r * 2, r * 2);
    }
  }
}

// ---- wood ----
function drawBoard(g, seed, x, y, w, len, col) {
  const r = rng(seed);
  g.save(); g.beginPath(); g.rect(x, y, w, len); g.clip();
  g.fillStyle = rgb(col); g.fillRect(x, y, w, len);
  const n = Math.round(w / 2.6);
  for (let k = 0; k < n; k++) {
    const gx = x + r() * w, a = 0.035 + r() * 0.075;
    g.strokeStyle = r() < 0.68 ? 'rgba(62,46,32,' + a + ')' : 'rgba(255,248,236,' + a + ')';
    g.lineWidth = 0.5 + r() * 1.3;
    const amp = r() * 2.2, ph = r() * TAU, fr = (0.6 + r() * 1.8) * TAU / len;
    g.beginPath();
    for (let t = -8; t <= len + 8; t += 14) { const xx = gx + Math.sin(ph + t * fr) * amp; if (t === -8) g.moveTo(xx, y + t); else g.lineTo(xx, y + t); }
    g.stroke();
  }
  if (r() < 0.3) {
    const kx = x + w * (0.25 + r() * 0.5), ky = y + len * (0.1 + r() * 0.8);
    for (let q = 3; q > 0; q--) { g.strokeStyle = 'rgba(70,50,35,' + (0.05 + 0.04 * q) + ')'; g.lineWidth = 1; g.beginPath(); g.ellipse(kx, ky, q * 2.4, q * 4.6, 0, 0, TAU); g.stroke(); }
    g.fillStyle = 'rgba(60,42,30,0.35)'; g.beginPath(); g.ellipse(kx, ky, 1.7, 3, 0, 0, TAU); g.fill();
  }
  g.fillStyle = 'rgba(28,20,14,0.55)'; g.fillRect(x, y, 1, len); g.fillRect(x, y, w, 1.2);
  g.fillStyle = 'rgba(255,255,255,0.09)'; g.fillRect(x + 1, y, 1, len);
  g.restore();
}
// Floor boards: 12 planks of 0.2 m across 2.4 m, running 3.6 m along the canvas height.
function texPlanks() {
  return tex(1024, 1024, (g, W, H) => {
    const R = rng(11), cols = 12, pw = W / cols, base = [189, 179, 165];
    g.fillStyle = rgb(base); g.fillRect(0, 0, W, H);
    for (let c = 0; c < cols; c++) {
      const n = 2 + (R() < 0.55 ? 1 : 0), lens = [];
      let sum = 0;
      for (let i = 0; i < n; i++) { const l = 0.7 + R(); lens.push(l); sum += l; }
      let y = R() * H;
      for (let i = 0; i < n; i++) {
        const len = (lens[i] / sum) * H, tone = 1 + (R() - 0.5) * 0.2, hue = (R() - 0.5) * 0.05, seed = (R() * 1e9) | 0;
        const col = [base[0] * tone * (1 + hue), base[1] * tone, base[2] * tone * (1 - hue)];
        drawBoard(g, seed, c * pw, y, pw, len, col);
        if (y + len > H) drawBoard(g, seed, c * pw, y - H, pw, len, col);
        y = (y + len) % H;
      }
    }
  });
}
// Neutral straight grain, 1 m square, tinted by the material colour.
function texGrain() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(5);
    g.fillStyle = 'rgb(233,225,215)'; g.fillRect(0, 0, W, H);
    for (let k = 0; k < 560; k++) {
      const x = R() * W, a = 0.03 + R() * 0.09;
      g.strokeStyle = R() < 0.72 ? 'rgba(70,50,34,' + a + ')' : 'rgba(255,255,255,' + a + ')';
      g.lineWidth = 0.5 + R() * 1.6;
      const amp = R() * 5, ph = R() * TAU, fr = Math.round(1 + R() * 2) * TAU / H;
      g.beginPath();
      for (let y = 0; y <= H; y += 16) { const xx = x + Math.sin(ph + y * fr) * amp; if (!y) g.moveTo(xx, y); else g.lineTo(xx, y); }
      g.stroke();
    }
  });
}
// Table top: five glued staves per 0.5 m with clearly different tones, grain along the canvas width.
function texStaves() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(23), tones = [1.0, 0.8, 0.93, 0.74, 0.88], sh = H / 5;
    for (let s = 0; s < 5; s++) {
      const t = tones[s];
      g.fillStyle = rgb([236 * t, 226 * t, 212 * t]); g.fillRect(0, s * sh, W, sh);
      for (let k = 0; k < 44; k++) {
        const y = s * sh + R() * sh, a = 0.04 + R() * 0.1;
        g.strokeStyle = R() < 0.75 ? 'rgba(70,48,30,' + a + ')' : 'rgba(255,255,255,' + a + ')';
        g.lineWidth = 0.5 + R() * 1.4;
        const amp = R() * 2.5, ph = R() * TAU, fr = Math.round(1 + R() * 2) * TAU / W;
        g.beginPath();
        for (let x = 0; x <= W; x += 16) { const yy = y + Math.sin(ph + x * fr) * amp; if (!x) g.moveTo(x, yy); else g.lineTo(x, yy); }
        g.stroke();
      }
      g.fillStyle = 'rgba(40,28,18,0.4)'; g.fillRect(0, s * sh, W, 1);
    }
  });
}

// ---- tile and stone ----
function texTerrazzo() {   // 1.2 m: four 0.6 m tiles
  return tex(512, 512, (g, W, H) => {
    const R = rng(31);
    g.fillStyle = 'rgb(236,234,229)'; g.fillRect(0, 0, W, H);
    const chips = [[150, 150, 152], [188, 184, 176], [96, 98, 102], [206, 190, 168], [222, 222, 224]];
    for (let i = 0; i < 2600; i++) {
      const c = chips[(R() * chips.length) | 0], x = R() * W, y = R() * H, s = 0.8 + R() * R() * 4.2;
      g.fillStyle = rgb(c, 0.35 + R() * 0.5);
      g.beginPath(); g.ellipse(x, y, s, s * (0.5 + R() * 0.6), R() * PI, 0, TAU); g.fill();
    }
    g.fillStyle = 'rgba(150,148,142,0.75)';
    for (const p of [0, W / 2]) { g.fillRect(p, 0, 1.5, H); g.fillRect(0, p, W, 1.5); }
  });
}
function texWallTile() {   // 0.6 m: two 0.6 x 0.3 m glazed tiles stacked
  return tex(256, 256, (g, W, H) => {
    g.fillStyle = 'rgb(240,241,240)'; g.fillRect(0, 0, W, H);
    for (let t = 0; t < 2; t++) {
      const gr = g.createLinearGradient(0, t * H / 2, W, (t + 1) * H / 2);
      gr.addColorStop(0, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(210,214,216,0.25)');
      g.fillStyle = gr; g.fillRect(0, t * H / 2, W, H / 2);
    }
    g.fillStyle = 'rgb(196,198,198)';
    g.fillRect(0, 0, W, 1.5); g.fillRect(0, H / 2, W, 1.5); g.fillRect(0, 0, 1.5, H);
  });
}
function texConcrete() {   // 1.2 m: four 0.6 m slabs
  return tex(512, 512, (g, W, H) => {
    const R = rng(41);
    g.fillStyle = 'rgb(134,136,138)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 46, R, 30, 120, 0.07);
    blotches(g, W, H, 160, R, 3, 14, 0.06);
    grainNoise(g, W, H, 18, R);
    g.fillStyle = 'rgba(48,48,52,0.85)';
    for (const p of [0, W / 2]) { g.fillRect(p, 0, 2.5, H); g.fillRect(0, p, W, 2.5); }
  });
}
function texStone() {      // 1.5 m of dark honed slate with pale veins
  return tex(512, 512, (g, W, H) => {
    const R = rng(53);
    g.fillStyle = 'rgb(52,56,64)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 40, R, 40, 150, 0.1);
    for (let v = 0; v < 15; v++) {
      let x = R() * W, y = R() * H, a = R() * TAU;
      g.strokeStyle = 'rgba(214,220,228,' + (0.12 + R() * 0.3) + ')';
      g.lineWidth = 0.6 + R() * 1.5;
      g.beginPath(); g.moveTo(x, y);
      for (let s = 0; s < 26; s++) { a += (R() - 0.5) * 0.7; x += Math.cos(a) * 14; y += Math.sin(a) * 14; g.lineTo(x, y); }
      g.stroke();
    }
    grainNoise(g, W, H, 10, R);
  });
}

// ---- textiles ----
function texFabric() {     // 0.25 m of plain weave, near white so the material colour sets the hue
  return tex(256, 256, (g, W, H) => {
    const R = rng(61);
    g.fillStyle = 'rgb(228,228,228)'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < W; i += 2) {
      g.fillStyle = 'rgba(0,0,0,' + (0.04 + R() * 0.07) + ')'; g.fillRect(i, 0, 1, H);
      g.fillStyle = 'rgba(0,0,0,' + (0.04 + R() * 0.07) + ')'; g.fillRect(0, i, W, 1);
    }
    grainNoise(g, W, H, 26, R);
  });
}
// 0.4 m of chenille: heathered patches of light and dark pile, short curly tufts, a faint diagonal weave.
// Near white, so the material colour sets the hue.
function texChenille() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(83);
    g.fillStyle = 'rgb(214,214,214)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 90, R, 10, 40, 0.07);          // the marbled look of crushed pile
    blotches(g, W, H, 320, R, 3, 10, 0.07);
    g.lineCap = 'round';
    for (let i = 0; i < 9000; i++) {                  // tufts: short bent strokes, light where the pile catches the light
      const x = R() * W, y = R() * H, a = R() * TAU, l = 2 + R() * 6, b = (R() - 0.5) * 1.6, light = R() < 0.55;
      g.strokeStyle = light ? 'rgba(255,255,255,' + (0.1 + R() * 0.25) + ')' : 'rgba(40,40,40,' + (0.06 + R() * 0.16) + ')';
      g.lineWidth = 0.7 + R() * 1.1;
      for (const ox of [-W, 0, W]) for (const oy of [-H, 0, H]) {
        if (x + ox < -10 || x + ox > W + 10 || y + oy < -10 || y + oy > H + 10) continue;
        g.beginPath(); g.moveTo(x + ox, y + oy);
        g.quadraticCurveTo(x + ox + Math.cos(a + b) * l * 0.6, y + oy + Math.sin(a + b) * l * 0.6, x + ox + Math.cos(a) * l, y + oy + Math.sin(a) * l);
        g.stroke();
      }
    }
    g.fillStyle = 'rgba(0,0,0,0.035)';               // weave: rows 2 px apart
    for (let y = 0; y < H; y += 2) g.fillRect(0, y, W, 1);
    grainNoise(g, W, H, 22, R);
  });
}
function texStripe() {     // 0.4 m: woven throw, grey stripes on off-white
  return tex(256, 256, (g, W, H) => {
    const R = rng(67);
    g.fillStyle = 'rgb(226,224,220)'; g.fillRect(0, 0, W, H);
    for (let s = 0; s < 8; s++) { g.fillStyle = s % 2 ? 'rgb(128,130,134)' : 'rgb(172,174,176)'; g.fillRect(0, s * 32 + 6, W, s % 2 ? 9 : 4); }
    grainNoise(g, W, H, 22, R);
  });
}
function texRugTri() {     // 0.3 m repeat: triangle lattice
  return tex(256, 256, (g, W, H) => {
    const R = rng(71);
    g.fillStyle = 'rgb(84,84,88)'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgb(168,166,160)'; g.lineWidth = 5;
    g.beginPath();
    for (const y of [0, H / 2, H]) { g.moveTo(0, y); g.lineTo(W, y); }
    for (let k = -2; k <= 2; k++) {
      const x = k * W / 2;
      g.moveTo(x, 0); g.lineTo(x + W / 2, H / 2); g.lineTo(x, H);
      g.moveTo(x + W / 2, 0); g.lineTo(x, H / 2); g.lineTo(x + W / 2, H);
    }
    g.stroke();
    grainNoise(g, W, H, 30, R);
  });
}
function texPlaid() {      // whole round rug, plaid laid on the diagonal
  return tex(512, 512, (g, W, H) => {
    const R = rng(73);
    g.fillStyle = 'rgb(150,150,152)'; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H / 2); g.rotate(PI / 4);
    const L = W * 0.75, step = 52;
    for (let pass = 0; pass < 2; pass++) {
      g.rotate(pass * PI / 2);
      for (let p = -L; p < L; p += step) {
        g.fillStyle = 'rgba(52,54,58,0.42)'; g.fillRect(p, -L, 24, 2 * L);
        g.fillStyle = 'rgba(236,236,232,0.5)'; g.fillRect(p + 34, -L, 6, 2 * L);
        g.fillStyle = 'rgba(30,30,34,0.5)'; g.fillRect(p + 10, -L, 2, 2 * L);
      }
    }
    g.restore();
    grainNoise(g, W, H, 26, R);
  }, { clamp: true });
}
function texWicker() {     // 0.1 m basket weave
  return tex(128, 128, (g, W, H) => {
    g.fillStyle = 'rgb(214,206,190)'; g.fillRect(0, 0, W, H);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) {
      const over = (i + j) % 2 === 0;
      g.fillStyle = over ? 'rgb(240,234,220)' : 'rgb(186,176,158)';
      if (over) g.fillRect(i * 16 + 1, j * 16 + 4, 14, 8); else g.fillRect(i * 16 + 4, j * 16 + 1, 8, 14);
    }
  });
}

// ---- pictures and small things ----
function texHob() {
  return tex(256, 256, (g, W, H) => {
    g.fillStyle = 'rgb(12,12,14)'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgb(96,98,102)'; g.lineWidth = 2;
    for (const [x, y, r] of [[78, 70, 44], [182, 74, 34], [76, 186, 34], [182, 186, 44]]) {
      g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
      g.beginPath(); g.arc(x, y, r * 0.55, 0, TAU); g.stroke();
    }
    g.strokeStyle = 'rgb(60,62,66)'; g.strokeRect(4, 4, W - 8, H - 8);
  }, { clamp: true });
}
function texArt(kind) {
  return tex(384, 512, (g, W, H) => {
    const R = rng(90 + kind);
    g.fillStyle = 'rgb(236,231,220)'; g.fillRect(0, 0, W, H);
    if (kind === 1) {      // arcs and a sun
      g.fillStyle = 'rgb(202,150,74)'; g.beginPath(); g.arc(W * 0.64, H * 0.3, 62, 0, TAU); g.fill();
      for (const [c, y, a] of [['rgb(44,92,98)', 0.62, 150], ['rgb(52,56,62)', 0.78, 190], ['rgb(160,176,172)', 0.94, 230]]) {
        g.fillStyle = c; g.beginPath(); g.ellipse(W * 0.5, H * (y + 0.35), W * 0.9, a, 0, 0, TAU); g.fill();
      }
      g.strokeStyle = 'rgba(40,40,44,0.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(W * 0.16, H * 0.1); g.lineTo(W * 0.16, H * 0.52); g.stroke();
    } else if (kind === 2) {   // stacked washes
      const bands = ['rgb(198,206,204)', 'rgb(126,150,154)', 'rgb(56,92,100)', 'rgb(214,170,108)', 'rgb(64,60,60)'];
      let y = H * 0.18;
      for (const c of bands) {
        const h = H * (0.08 + R() * 0.12);
        g.fillStyle = c; g.beginPath(); g.moveTo(0, y + R() * 10);
        for (let x = 0; x <= W; x += 24) g.lineTo(x, y + Math.sin(x * 0.02 + R()) * 5 + R() * 4);
        g.lineTo(W, y + h); g.lineTo(0, y + h); g.closePath(); g.fill();
        y += h;
      }
    } else {               // leaf study
      g.strokeStyle = 'rgb(58,84,62)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(W * 0.5, H * 0.92); g.quadraticCurveTo(W * 0.46, H * 0.5, W * 0.52, H * 0.1); g.stroke();
      for (let i = 0; i < 9; i++) {
        const t = 0.16 + i * 0.085, s = i % 2 ? 1 : -1, len = 60 + (1 - Math.abs(t - 0.5) * 2) * 70;
        g.fillStyle = i % 3 ? 'rgb(74,108,76)' : 'rgb(118,144,98)';
        g.save(); g.translate(W * 0.5, H * (1 - t)); g.rotate(s * (0.9 - t * 0.3)); g.beginPath(); g.ellipse(0, -len / 2, 15, len / 2, 0, 0, TAU); g.fill(); g.restore();
      }
    }
    grainNoise(g, W, H, 14, R);
  }, { clamp: true });
}
function texGlow() {
  return tex(128, 128, (g, W, H) => {
    const gr = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(255,255,255,0.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.14)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }, { clamp: true });
}

// ---- the world outside ----
// Panorama strip for a cylinder of radius 220 m that spans 21 m below to 45 m above eye level.
const PANO = { R: 220, lo: -21, hi: 45 };
function texPanorama(night) {
  return tex(4096, 512, (g, W, H) => {
    const R = rng(77), span = PANO.hi - PANO.lo, yOf = (m) => H * (PANO.hi - m) / span, pxm = W / (TAU * PANO.R);
    g.clearRect(0, 0, W, H);
    const ridge = (base, amp, col, seed, freq) => {
      const r = rng(seed), ph = [r() * TAU, r() * TAU, r() * TAU, r() * TAU];
      g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) {
        const a = (x / W) * TAU;
        const h = base + amp * (0.5 * Math.sin(a * freq + ph[0]) + 0.28 * Math.sin(a * freq * 2 + ph[1]) + 0.14 * Math.sin(a * freq * 5 + ph[2]) + 0.08 * Math.sin(a * freq * 11 + ph[3]));
        g.lineTo(x, yOf(h));
      }
      g.lineTo(W, H); g.closePath(); g.fill();
    };
    ridge(17, 11, night ? 'rgb(30,36,52)' : 'rgb(158,176,196)', 3, 2);
    ridge(9, 9, night ? 'rgb(24,30,42)' : 'rgb(128,150,150)', 4, 3);
    // a lattice TV mast on the ridge, the way one stands above Tbilisi
    const tx = W * 0.71, tb = yOf(14), tt = yOf(40);
    g.strokeStyle = night ? 'rgb(120,90,90)' : 'rgb(196,150,140)'; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(tx - 7, tb); g.lineTo(tx, tt); g.lineTo(tx + 7, tb); g.moveTo(tx - 4, yOf(25)); g.lineTo(tx + 4, yOf(25)); g.moveTo(tx - 2, yOf(33)); g.lineTo(tx + 2, yOf(33)); g.stroke();
    if (night) { g.fillStyle = 'rgb(255,70,60)'; g.fillRect(tx - 1, tt - 1, 2, 2); g.fillRect(tx - 1, yOf(33), 2, 2); }
    ridge(3.5, 5, night ? 'rgb(18,24,30)' : 'rgb(98,122,104)', 5, 4);
    // town
    const wallCols = [[214, 206, 194], [196, 190, 184], [226, 220, 210], [186, 172, 160], [204, 196, 200], [168, 172, 178]];
    for (let i = 0; i < 230; i++) {
      const x = R() * W, w = (9 + R() * 16) * pxm, top = -12 + R() * R() * 34, c = wallCols[(R() * wallCols.length) | 0], k = night ? 0.13 : 0.86 + R() * 0.14;
      const y0 = yOf(top), y1 = yOf(PANO.lo);
      for (const ox of [0, -W, W]) {
        if (x + ox + w < 0 || x + ox > W) continue;
        g.fillStyle = rgb([c[0] * k, c[1] * k, c[2] * k * (night ? 1.3 : 1)]); g.fillRect(x + ox, y0, w, y1 - y0);
        g.fillStyle = night ? 'rgba(0,0,0,0.35)' : 'rgba(40,50,70,0.16)'; g.fillRect(x + ox + w * 0.62, y0, w * 0.38, y1 - y0);
      }
      const r2 = rng(1000 + i);
      for (let wy = y0 + 5; wy < y1 - 6; wy += 11) for (let wx = 3; wx < w - 3; wx += 5) {
        const lit = night && r2() < 0.3;
        g.fillStyle = lit ? (r2() < 0.7 ? 'rgb(255,214,140)' : 'rgb(206,226,255)') : (night ? 'rgb(10,12,18)' : 'rgba(58,72,92,0.55)');
        for (const ox of [0, -W, W]) g.fillRect(x + ox + wx, wy, 2.4, 5);
      }
    }
    // trees along the street below
    for (let i = 0; i < 700; i++) {
      const x = R() * W, y = yOf(-13 - R() * 7), s = 5 + R() * 9;
      g.fillStyle = night ? 'rgb(12,20,16)' : rgb([54 + R() * 30, 92 + R() * 36, 50 + R() * 20]);
      g.beginPath(); g.ellipse(x, y, s * 1.2, s, 0, 0, TAU); g.fill();
    }
    // haze near the horizon
    const hz = g.createLinearGradient(0, yOf(26), 0, yOf(-8));
    hz.addColorStop(0, 'rgba(210,224,236,0)'); hz.addColorStop(1, night ? 'rgba(30,36,60,0.2)' : 'rgba(214,226,236,0.3)');
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = hz; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
  }, { clamp: false });
}
function drawSky(g, W, H, night) {
  const gr = g.createLinearGradient(0, 0, 0, H);
  if (night) {
    gr.addColorStop(0, 'rgb(10,16,38)'); gr.addColorStop(0.36, 'rgb(22,34,72)'); gr.addColorStop(0.47, 'rgb(96,74,104)');
    gr.addColorStop(0.5, 'rgb(214,128,86)'); gr.addColorStop(0.52, 'rgb(60,56,74)'); gr.addColorStop(1, 'rgb(16,18,26)');
  } else {
    gr.addColorStop(0, 'rgb(52,112,198)'); gr.addColorStop(0.3, 'rgb(104,160,224)'); gr.addColorStop(0.46, 'rgb(182,212,238)');
    gr.addColorStop(0.5, 'rgb(222,234,242)'); gr.addColorStop(0.52, 'rgb(170,186,190)'); gr.addColorStop(1, 'rgb(120,134,128)');
  }
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
}

function lin(hex) { const c = new T.Color(hex); return [c.r, c.g, c.b]; }
// o.rough / o.metal / o.env make a glossy (standard) material; without them it is a cheap matte one.
function mk(name, o) {
  o = o || {};
  MKO[name] = o;
  const color = o.color === undefined ? 0xffffff : o.color;
  const glossy = o.rough !== undefined || o.metal !== undefined || o.env !== undefined;
  let m;
  if (glossy) {
    m = new T.MeshStandardMaterial({ color, roughness: o.rough === undefined ? 0.5 : o.rough, metalness: o.metal || 0 });
    m.envMapIntensity = o.env === undefined ? 0.5 : o.env;
  } else m = new T.MeshLambertMaterial({ color });
  if (o.map) m.map = o.map;
  if (o.side) m.side = o.side;
  m.dithering = true;
  m.shadowSide = T.DoubleSide;
  const c = lin(color), k = o.texAlb || 1;
  m.userData = { bake: true, cast: o.cast !== false, recv: o.recv !== false, fine: !!o.fine, two: !!o.two, alb: o.alb || [c[0] * k, c[1] * k, c[2] * k], env: glossy ? m.envMapIntensity : 0 };
  bakePatch(m);
  MAT[name] = m;
  return m;
}
// ---- finishes the viewer can pick for floors and walls (the Finishes panel) ----
// size: metres one copy of the texture covers. Every room's floor and every room group's walls get a material of their own
// (SURF lists them, filled by buildPlan), so a change touches one room only. 'design' puts back what the flat was built with.
const FINISHES = {
  floor: [
    { id: 'design', en: 'As designed' },
    { id: 'oak', en: 'Oak boards', tex: 'planks', size: [2.4, 3.6], color: 0xffffff, rough: 0.46 },
    { id: 'darkOak', en: 'Dark oak', tex: 'planks', size: [2.4, 3.6], color: 0x9c9186, rough: 0.46 },
    { id: 'paleOak', en: 'Pale oak', tex: 'planks', size: [2.4, 3.6], color: 0xd6cdc2, rough: 0.5 },
    { id: 'greyOak', en: 'Grey oak', tex: 'planks', size: [2.4, 3.6], color: 0xbcb8b4, rough: 0.5 },
    { id: 'terrazzo', en: 'Terrazzo', tex: 'terrazzo', size: [1.2, 1.2], color: 0xffffff, rough: 0.3 },
    { id: 'tiles', en: 'Ceramic tiles', tex: 'wallTile', size: [0.6, 0.6], color: 0xffffff, rough: 0.25 },
    { id: 'slate', en: 'Slate', tex: 'stone', size: [1.5, 1.5], color: 0xffffff, rough: 0.35 },
    { id: 'concrete', en: 'Polished concrete', tex: 'concrete', size: [1.2, 1.2], color: 0xd2d2d4, rough: 0.4 },
  ],
  wall: [
    { id: 'design', en: 'As designed' },
    { id: 'white', en: 'White paint', color: 0xefece5 },
    { id: 'greige', en: 'Warm grey', color: 0xd8d1c5 },
    { id: 'sage', en: 'Sage green', color: 0xbcc6ae },
    { id: 'blue', en: 'Pale blue', color: 0xbccad6 },
    { id: 'clay', en: 'Clay', color: 0xd6aa90 },
    { id: 'charcoal', en: 'Charcoal', color: 0x5d6064 },
    { id: 'tiles', en: 'Ceramic tiles', tex: 'wallTile', size: [0.6, 0.6], color: 0xffffff, rough: 0.22 },
    { id: 'concrete', en: 'Concrete', tex: 'concrete', size: [1.2, 1.2], color: 0xdcdcdc, rough: 0.8 },
  ],
};
const FIN_TEX = { planks: () => TEX.planks || (TEX.planks = texPlanks()), terrazzo: texTerrazzo, wallTile: texWallTile, stone: texStone, concrete: texConcrete };
const SURF = { floor: [], wall: [] };   // { key: material name, base, uvm: [u, v] metres per texture unit, rooms, label }
const MKO = {};
// A material of its own, made like `base`, for one room's floor or one group's walls.
function mkLike(key, base) {
  if (!MAT[key]) mk(key, MKO[base] || {});
  return key;
}
function applyFinish(s, id) {
  const m = MAT[s.key], kind = SURF.floor.includes(s) ? 'floor' : 'wall', f = FINISHES[kind].find((q) => q.id === id) || FINISHES[kind][0];
  if (!s.orig) s.orig = { map: m.map, color: m.color.getHex(), rough: m.roughness };
  let map = s.orig.map, color = s.orig.color, rough = s.orig.rough;
  if (f.id !== 'design') {
    color = f.color; rough = f.rough === undefined ? 0.6 : f.rough; map = null;
    if (f.tex) {
      const k = 'fin:' + f.id + ':' + s.uvm.join('x');
      if (!TEX[k]) {
        TEX['fin:' + f.tex] = TEX['fin:' + f.tex] || FIN_TEX[f.tex]();
        const t = TEX[k] = TEX['fin:' + f.tex].clone();
        t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(s.uvm[0] / f.size[0], s.uvm[1] / f.size[1]); t.needsUpdate = true;
      }
      map = TEX[k];
    }
  }
  if (m.map !== map) m.needsUpdate = true;
  m.map = map; m.color.setHex(color);
  if (m.roughness !== undefined && rough !== undefined) m.roughness = rough;
  s.now = f.id;
}

function mkRaw(name, m, alb) {
  m.userData = { bake: false, cast: false, recv: false, alb: alb || [0.5, 0.5, 0.5], env: m.envMapIntensity || 0 };
  MAT[name] = m;
  return m;
}

function initMaterials(maxAniso) {
  ANISO = Math.min(8, maxAniso || 1);
  patchChunks();
  const planks = TEX.planks = texPlanks(), grain = TEX.grain = texGrain(), fabric = texFabric();
  fabric.repeat.set(4, 4);
  const D = T.DoubleSide;

  // shell
  mk('wall', { color: 0xefece5, fine: true });
  mk('wallTile', { map: texWallTile(), rough: 0.22, env: 0.45, fine: true, alb: [0.84, 0.85, 0.84] });
  mk('splash', { map: texWallTile(), rough: 0.22, env: 0.45, alb: [0.84, 0.85, 0.84] });
  mk('ceil', { color: 0xf8f7f3, fine: true, cast: false });
  mk('floorLiv', { map: planks, rough: 0.46, env: 0.34, fine: true, alb: [0.48, 0.43, 0.36], cast: false });
  mk('floorHall', { map: planks, color: 0x9c9186, rough: 0.46, env: 0.34, fine: true, alb: [0.17, 0.14, 0.11], cast: false });
  mk('floorBed', { map: planks, color: 0xd6cdc2, rough: 0.5, env: 0.3, fine: true, alb: [0.32, 0.27, 0.21], cast: false });
  mk('floorBath', { map: texTerrazzo(), rough: 0.3, env: 0.4, fine: true, alb: [0.78, 0.77, 0.73], cast: false });
  mk('floorBalc', { map: texConcrete(), color: 0xb2b2b4, fine: true, alb: [0.11, 0.11, 0.115], cast: false });
  mk('facade', { color: 0xe4e0d8, fine: true });
  mk('skirt', { color: 0xf5f4f0 });
  mk('trim', { color: 0xf3f2ef, rough: 0.42, env: 0.3 });           // door linings, window frames
  mk('doorWhite', { color: 0xf1efea, rough: 0.48, env: 0.25 });
  mk('doorEntry', { map: grain, color: 0x6b4f3c, rough: 0.5, env: 0.3, texAlb: 0.8 });
  mk('alu', { color: 0x33363a, rough: 0.4, metal: 0.7, env: 0.6 });  // anthracite aluminium of the balcony glazing
  mk('aluLight', { color: 0xb9bcc0, rough: 0.38, metal: 0.9, env: 0.8 });
  mk('switch', { color: 0xfbfbf9, rough: 0.4, env: 0.3 });

  // wood
  mk('oak', { map: grain, color: 0xe6c89f, rough: 0.55, env: 0.25, texAlb: 0.8 });
  mk('oakStave', { map: texStaves(), color: 0xe9cda6, rough: 0.5, env: 0.3, texAlb: 0.66 });
  mk('walnut', { map: grain, color: 0x6a4f3d, rough: 0.5, env: 0.3, texAlb: 0.8 });
  mk('greyWood', { map: grain, color: 0x94826f, rough: 0.7, env: 0.15, texAlb: 0.8 });
  mk('darkWood', { map: grain, color: 0x3a2e28, rough: 0.5, env: 0.3, texAlb: 0.8 });
  MAT.oakStave.map.repeat.set(2, 2);

  // kitchen and bathroom
  mk('cabinet', { color: 0xf2f1ed, rough: 0.42, env: 0.25 });
  mk('plinth', { color: 0x2a2a2c });
  mk('stone', { map: texStone(), rough: 0.16, env: 0.7, alb: [0.05, 0.055, 0.065] });
  MAT.stone.map.repeat.set(1 / 1.5, 1 / 1.5);
  mk('steel', { color: 0xcfd2d6, rough: 0.3, metal: 1, env: 0.9 });
  mk('fridge', { color: 0x8795a3, rough: 0.34, metal: 0.85, env: 0.8 });
  mk('chrome', { color: 0xffffff, rough: 0.07, metal: 1, env: 1.1 });
  mk('ceramic', { color: 0xfbfbfa, rough: 0.1, env: 0.55 });
  mk('hob', { map: texHob(), rough: 0.08, env: 0.9, alb: [0.02, 0.02, 0.02] });
  mk('blackMetal', { color: 0x1d1d1f, rough: 0.42, metal: 0.6, env: 0.5 });
  mk('brass', { color: 0xc9a25a, rough: 0.3, metal: 1, env: 0.8 });

  // upholstery and textiles
  mk('sofa', { map: fabric, color: 0x6c7078, texAlb: 0.78 });
  mk('cushion', { map: fabric, color: 0xb9c7d6, texAlb: 0.78 });
  mk('terracotta', { map: fabric, color: 0xa65c4a, texAlb: 0.78 });
  mk('beige', { map: fabric, color: 0xe6d6bd, texAlb: 0.78 });
  const chen = texChenille();
  chen.repeat.set(1 / 0.4, 1 / 0.4);
  mk('chenille', { map: chen, color: 0xb9b7b3, texAlb: 0.8 });       // light warm grey chenille (modularSofa)
  mk('ebony', { map: grain, color: 0x2b2624, rough: 0.55, env: 0.2, texAlb: 0.8 });   // near-black stained legs
  mk('linen', { map: fabric, color: 0xfcfaf5, texAlb: 0.78 });
  mk('duvet', { map: fabric, color: 0xd6d4d0, texAlb: 0.78 });
  mk('stripe', { map: texStripe(), alb: [0.55, 0.55, 0.55] });
  MAT.stripe.map.repeat.set(2.5, 2.5);
  mk('skyblue', { map: fabric, color: 0xaed2f2, texAlb: 0.78 });
  mk('towel', { map: fabric, color: 0x9dbcc0, texAlb: 0.78 });
  mk('rugTri', { map: texRugTri(), alb: [0.1, 0.1, 0.11], cast: false });
  MAT.rugTri.map.repeat.set(1 / 0.3, 1 / 0.3);
  mk('rugPlaid', { map: texPlaid(), alb: [0.26, 0.26, 0.27], cast: false });
  mk('curtain', { color: 0xffffff, side: D, two: true });
  mk('rubber', { color: 0x2a2a2e });

  // plants
  mk('leafA', { color: 0x4a7a3e, side: D, two: true });
  mk('leafB', { color: 0x7a9a3e, side: D, two: true });
  mk('leafC', { color: 0x9cbd3c, side: D, two: true });
  mk('leafD', { color: 0x6f8f6a, side: D, two: true });
  mk('stem', { color: 0x5c4630 });
  mk('pot', { color: 0x2e2e31, rough: 0.6, env: 0.2 });
  mk('potWhite', { color: 0xecebe6, rough: 0.5, env: 0.25 });
  mk('potTerra', { color: 0xb86f4f });
  mk('soil', { color: 0x2b2118 });

  // odds and ends
  mk('wicker', { map: texWicker(), color: 0xd9b27a, texAlb: 0.75 });
  mk('wickerWhite', { map: texWicker(), color: 0xffffff, texAlb: 0.75 });
  MAT.wicker.map.repeat.set(10, 10);
  mk('plastic', { color: 0x19191b, rough: 0.36, env: 0.5 });        // chair shells, TV bodies
  mk('screen', { color: 0x05060a, rough: 0.06, env: 1.0 });
  mk('paper', { color: 0xf6f4ef });
  mk('teal', { color: 0x1f6068 });
  mk('ochre', { color: 0xc9983a });
  mk('charcoal', { color: 0x2e2f35 });
  mk('yellow', { color: 0xf3d132 });
  mk('wine', { color: 0x5c0f1e, rough: 0.1, env: 0.8 });
  mk('bottle', { color: 0x1c3324, rough: 0.08, env: 1.0 });
  mk('shoe', { color: 0xdddcda });
  mk('art1', { map: texArt(1), alb: [0.5, 0.48, 0.42] });
  mk('art2', { map: texArt(2), alb: [0.4, 0.44, 0.44] });
  mk('art3', { map: texArt(3), alb: [0.6, 0.6, 0.54] });

  // not baked: glass, mirrors, glowing things
  const glass = new T.MeshStandardMaterial({ color: 0xdff1f0, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.16, depthWrite: false });
  glass.envMapIntensity = 1.1;
  mkRaw('glass', glass);
  const glassTeal = new T.MeshStandardMaterial({ color: 0x8fd0cc, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.3, depthWrite: false, side: D });
  glassTeal.envMapIntensity = 1.0;
  mkRaw('glassTeal', glassTeal);
  const mirror = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, metalness: 1 });
  mirror.envMapIntensity = 1.0;
  mkRaw('mirror', mirror);
  mkRaw('lampOn', new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.9, 1.05) }));    // warm shades that glow day and evening
  mkRaw('lampCool', new T.MeshBasicMaterial({ color: new T.Color(2.4, 2.25, 1.9) }));   // bathroom and hall ceiling lights
  mkRaw('lampEve', new T.MeshBasicMaterial({ color: new T.Color(0.8, 0.8, 0.78) }));    // evening lights, switched by the app
  mkRaw('cap', new T.MeshBasicMaterial({ color: 0xf4f2ec }));                           // cut wall tops in the plan view
  mkRaw('capWood', new T.MeshBasicMaterial({ map: grain, color: 0x5a4334 }));           // top of the hall wardrobe, seen only from above
  mkRaw('capDark', new T.MeshBasicMaterial({ color: 0x141416 }));                       // the two riser shafts, as the render draws them
  mkRaw('capRing', new T.MeshBasicMaterial({ color: 0x8e8e90 }));
  TEX.glow = texGlow();
  // warm light washing the wall behind the bedroom television
  mkRaw('halo', new T.MeshBasicMaterial({ map: TEX.glow, color: new T.Color(1.0, 0.6, 0.28), transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false }));
}

// ---------- 30-plan.js : the flat itself, built from its data file ----------
// FLAT is flats/<name>.json, put in front of the code by tools/build.mjs (flats/FORMAT.md describes it).
// Metres. X runs west to east, Z north to south, Y up; the origin is the outer north-west corner of the flat.
// Rooms are unions of rectangles; wall runs are rectangles; openings sit in a wall run and find it by themselves.
// Wall surfaces, the outside of the block, ceilings, roof and the light-bake stand-ins are all worked out from these.
const H = FLAT.height || 2.7;          // clear room height
const ALB_WALL = [0.8, 0.78, 0.74];
const ROOMS = FLAT.rooms;
const TOTAL_AREA = FLAT.total;
const BOUNDS = FLAT.bounds;            // [x0, z0, x1, z1] around every wall and room, worked out by build.mjs
const roomIn = (x, z) => ROOMS.find((r) => roomHas(r, x, z));

// ---- openings: defaults by kind, which side the room is on, and the local frame of each ----
const KINDS = {
  entry: { sill: 0, head: 2.1 }, door: { sill: 0, head: 2.1 }, gap: { sill: 0, head: 2.1 },
  slide: { sill: 0, head: 2.32 }, fixed: { sill: 0, head: 2.32 }, window: { sill: 0.8, head: 2.4 },
};
// The face of the wall on the room side: indoors beats the balcony, the balcony beats outside.
function innerOf(o) {
  const m = (o.a + o.b) / 2, rank = (r) => (r ? (r.outdoor ? 1 : 2) : 0);
  const r0 = o.axis === 'x' ? roomIn(m, o.at[0] - 0.06) : roomIn(o.at[0] - 0.06, m);
  const r1 = o.axis === 'x' ? roomIn(m, o.at[1] + 0.06) : roomIn(o.at[1] + 0.06, m);
  return rank(r0) >= rank(r1) ? o.at[0] : o.at[1];
}
const OPEN = FLAT.openings.map((src) => {
  const o = Object.assign({}, KINDS[src.kind], src);
  o.pass = ['door', 'slide', 'gap'].includes(o.kind);
  o.glass = ['slide', 'fixed', 'window'].includes(o.kind) || (o.kind === 'door' && o.leaf === 'glazed');
  o.inner = innerOf(o);
  if (o.kind === 'entry') { o.recess = 0.105; o.rev = o.inner === o.at[1] ? [o.at[0] + 0.15, o.at[1]] : [o.at[0], o.at[1] - 0.15]; }
  return o;
});
const opening = (id) => OPEN.find((o) => o.id === id);
// Frame of an opening: local x runs 0..W along it, local z runs 0..D from the outer face to the room-side face.
function frameOf(o) {
  const W = o.b - o.a, D = o.at[1] - o.at[0], in1 = o.inner === o.at[1];
  if (o.axis === 'x') return in1 ? { ox: o.a, oz: o.at[0], ry: 0, W, D } : { ox: o.b, oz: o.at[1], ry: PI, W, D };
  return in1 ? { ox: o.at[0], oz: o.b, ry: PI / 2, W, D } : { ox: o.at[1], oz: o.a, ry: -PI / 2, W, D };
}

const PLAN = { walls: [], runs: [], glass: [], roof: [] };   // plan rectangles: minimap, colliders, wall caps, roof
const DOORS = [];                                  // moving leaves, animated by the app
const LAMPS = [];                                  // light sources for the bake and the glow sprites
const CEIL = new Map(), CAPS = new Map();          // ceiling pieces (hidden in the plan view) and wall caps (shown only there)
const GX = [], GZ = [];                            // grid lines every floor and ceiling must share
const FRAME = [];                                  // wall faces as plan segments [ax, az, bx, bz]: the green frame of the empty view
const MIRRORS = [];                                // looking glasses; the app gives each a real reflection
const HARDY = [0, H].concat(OPEN.flatMap((o) => (o.sill > 0 ? [o.sill, o.head] : [o.head])));   // heights every wall grid must share
const LAP = 0.012;                                 // floors and ceilings run this far into the walls, so no gap can open at the join

// A light source. ch 1: on day and evening, ch 2: evening only. down: a recessed light that only shines downwards.
function lamp(x, y, z, I, col, ch, o) {
  LAMPS.push(Object.assign({ p: [x, y, z], I, col, ch, down: 0, glow: 0.5 }, o));
}

// A straight run of wall in plan with the openings that cross it; registers light occluders and walk colliders.
function wallRun(x0, z0, x1, z1, ops) {
  const alongX = (x1 - x0) > (z1 - z0), e = alongX ? x1 : z1;
  let s = alongX ? x0 : z0;
  const seg = (a, b, y0, y1, solid) => {
    if (b - a < 1e-4) return;
    const r = alongX ? [a, z0, b, z1] : [x0, a, x1, b];
    occBox(r[0], y0, r[1], r[2], y1, r[3], ALB_WALL);
    if (solid) { COL.push({ k: 0, x0: r[0], z0: r[1], x1: r[2], z1: r[3] }); PLAN.walls.push(r); }
  };
  for (const o of (ops || []).slice().sort((p, q) => p.a - q.a)) {
    seg(s, o.a, 0, H, true);
    if (o.head < H) seg(o.a, o.b, o.head, H, false);
    if (o.sill > 0) seg(o.a, o.b, 0, o.sill, false);
    const r = alongX ? [o.a, z0, o.b, z1] : [x0, o.a, x1, o.b];
    if (!o.pass) COL.push({ k: 0, x0: r[0], z0: r[1], x1: r[2], z1: r[3] });
    if (o.recess) {                                  // the entrance door sits this far in from the outer face
      const t0 = o.inner === o.at[1] ? o.at[0] : o.at[1] - o.recess, t1 = t0 + o.recess;
      if (alongX) occBox(o.a, 0, t0, o.b, o.head, t1, ALB_WALL); else occBox(t0, 0, o.a, t1, o.head, o.b, ALB_WALL);
    }
    if (o.glass) PLAN.glass.push(r);
    s = o.b;
  }
  seg(s, e, 0, H, true);
  PLAN.runs.push([x0, z0, x1, z1]);
  GX.push(x0, x1); GZ.push(z0, z1);
}
const deepInSolid = (x, z) => { for (const r of PLAN.walls) if (x > r[0] + 2 * LAP && x < r[2] - 2 * LAP && z > r[1] + 2 * LAP && z < r[3] - 2 * LAP) return true; return false; };
const inRect = (r, x, z) => x > r[0] && x < r[2] && z > r[1] && z < r[3];
const onRun = (x, z) => PLAN.runs.some((r) => inRect(r, x, z));

// ---- plan geometry on a grid made of every rectangle edge ----
// cells(add, sub, label): each cell is set when its centre is in an 'add' rectangle and in no 'sub' one.
function cells(add, sub, label) {
  const q = (v) => Math.round(v * 1e6) / 1e6, all = add.concat(sub);
  const xs = [...new Set(all.flatMap((r) => [q(r[0]), q(r[2])]))].sort((a, b) => a - b);
  const zs = [...new Set(all.flatMap((r) => [q(r[1]), q(r[3])]))].sort((a, b) => a - b);
  const nx = xs.length - 1, nz = zs.length - 1, on = new Int32Array(Math.max(0, nx * nz));
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const cx = (xs[i] + xs[i + 1]) / 2, cz = (zs[j] + zs[j + 1]) / 2;
    if (sub.some((r) => inRect(r, cx, cz))) continue;
    const k = add.findIndex((r) => inRect(r, cx, cz));
    if (k >= 0) on[j * nx + i] = label ? label[k] : 1;
  }
  return { xs, zs, nx, nz, on, get: (i, j) => (i >= 0 && j >= 0 && i < nx && j < nz ? on[j * nx + i] : 0) };
}
// Boundary of a set of cells as straight edges with the set on their left, joined end to end where they line up.
// keep(xOut, zOut, xIn, zIn) is asked with points just either side of each piece; pieces it turns down are left out.
function outline(G, has, keep) {
  const pieces = new Map(), e = 0.005;
  const add = (key, lo, hi) => { if (!pieces.has(key)) pieces.set(key, []); pieces.get(key).push([lo, hi]); };
  for (let j = 0; j < G.nz; j++) for (let i = 0; i < G.nx; i++) {
    if (!has(i, j)) continue;
    const x0 = G.xs[i], x1 = G.xs[i + 1], z0 = G.zs[j], z1 = G.zs[j + 1], xm = (x0 + x1) / 2, zm = (z0 + z1) / 2;
    if (!has(i, j - 1) && keep(xm, z0 - e, xm, z0 + e)) add('E ' + z0, x0, x1);     // north side, walked eastwards
    if (!has(i, j + 1) && keep(xm, z1 + e, xm, z1 - e)) add('W ' + z1, x0, x1);     // south side, walked westwards
    if (!has(i - 1, j) && keep(x0 - e, zm, x0 + e, zm)) add('N ' + x0, z0, z1);     // west side, walked northwards
    if (!has(i + 1, j) && keep(x1 + e, zm, x1 - e, zm)) add('S ' + x1, z0, z1);     // east side, walked southwards
  }
  const out = [];
  for (const [key, list] of pieces) {
    const d = key[0], f = +key.slice(2);
    list.sort((p, q) => p[0] - q[0]);
    const merged = [];
    for (const p of list) { const m = merged[merged.length - 1]; if (m && Math.abs(m[1] - p[0]) < 1e-6) m[1] = p[1]; else merged.push(p.slice()); }
    for (const [lo, hi] of merged) {
      if (d === 'E') out.push([lo, f, hi, f]); else if (d === 'W') out.push([hi, f, lo, f]);
      else if (d === 'S') out.push([f, lo, f, hi]); else out.push([f, hi, f, lo]);
    }
  }
  return out;
}
// Rectangles, largest first along each row, that together cover the set cells.
function cover(G, has) {
  const used = new Uint8Array(G.nx * G.nz), out = [];
  for (let j = 0; j < G.nz; j++) for (let i = 0; i < G.nx; i++) {
    if (!has(i, j) || used[j * G.nx + i]) continue;
    let i2 = i;
    while (i2 + 1 < G.nx && has(i2 + 1, j) && !used[j * G.nx + i2 + 1]) i2++;
    let j2 = j;
    for (;;) {
      if (j2 + 1 >= G.nz) break;
      let ok = true;
      for (let k = i; k <= i2; k++) if (!has(k, j2 + 1) || used[(j2 + 1) * G.nx + k]) { ok = false; break; }
      if (!ok) break;
      j2++;
    }
    for (let b = j; b <= j2; b++) for (let k = i; k <= i2; k++) used[b * G.nx + k] = 1;
    out.push([G.xs[i], G.zs[j], G.xs[i2 + 1], G.zs[j2 + 1]]);
  }
  return out;
}

// Rooms that touch with no wall between them share their walls and ceiling: hall, kitchen and living room, say.
// Indoor rooms never join the balcony this way.
function roomGroups() {
  const G = cells(ROOMS.flatMap((r) => r.rects), PLAN.runs, ROOMS.flatMap((r, k) => r.rects.map(() => k + 1)));
  const seen = new Int32Array(G.nx * G.nz).fill(-1), groups = [];
  for (let j = 0; j < G.nz; j++) for (let i = 0; i < G.nx; i++) {
    if (!G.get(i, j) || seen[j * G.nx + i] >= 0) continue;
    const rooms = new Set(), set = new Set(), out = !!ROOMS[G.get(i, j) - 1].outdoor, stack = [[i, j]];
    seen[j * G.nx + i] = groups.length;
    while (stack.length) {
      const [a, b] = stack.pop();
      rooms.add(ROOMS[G.get(a, b) - 1]); set.add(b * G.nx + a);
      for (const [u, v] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) {
        const s = G.get(u, v);
        if (!s || seen[v * G.nx + u] >= 0 || !!ROOMS[s - 1].outdoor !== out) continue;
        seen[v * G.nx + u] = groups.length; stack.push([u, v]);
      }
    }
    groups.push({ rooms: [...rooms], outdoor: out, G, has: (a, b) => a >= 0 && b >= 0 && a < G.nx && b < G.nz && set.has(b * G.nx + a) });
  }
  return groups;
}

function buildWalls() {
  const used = new Set();
  for (const w of FLAT.walls.concat((FLAT.shafts || []).map((s) => s.rect))) {
    const alongX = (w[2] - w[0]) > (w[3] - w[1]), ops = OPEN.filter((o) => (o.axis === 'x') === alongX
      && Math.abs(o.at[0] - (alongX ? w[1] : w[0])) < 1e-6 && Math.abs(o.at[1] - (alongX ? w[3] : w[2])) < 1e-6
      && o.a >= (alongX ? w[0] : w[1]) - 1e-6 && o.b <= (alongX ? w[2] : w[3]) + 1e-6);
    for (const o of ops) used.add(o.id);
    wallRun(w[0], w[1], w[2], w[3], ops);
  }
  for (const s of FLAT.slants || []) slantWall(s);
  for (const o of OPEN) if (!used.has(o.id)) throw new Error('opening "' + o.id + '" lies in no wall run: its "at" must be the two faces of a run in "walls"');
  // the floor slab, each room's floor, and the slab overhead
  const B = BOUNDS;
  occBox(B[0] - 1, -0.6, B[1] - 1, B[2] + 1.05, -0.3, B[3] + 1, [0.3, 0.3, 0.3]);
  for (const r of ROOMS) {
    const a = MAT[floorOf(r)].userData.alb;
    for (const q of r.rects) { occBox(q[0], -0.3, q[1], q[2], 0, q[3], a); GX.push(q[0], q[2]); GZ.push(q[1], q[3]); }
    if (r.poly) for (const q of polyStrips(r.poly, 0.1)) occBox(q[0], -0.3, q[1], q[2], 0, q[3], a);
  }
  // Roof: every room, wall and enclosed corner (a wardrobe recess, say), plus covered balconies.
  const covered = ROOMS.filter((r) => !r.outdoor || r.covered !== false).flatMap((r) => r.rects);
  const F = cells(covered.concat(PLAN.runs), []), outside = new Uint8Array(F.nx * F.nz), stack = [];
  for (let j = 0; j < F.nz; j++) for (let i = 0; i < F.nx; i++) if ((i === 0 || j === 0 || i === F.nx - 1 || j === F.nz - 1) && !F.get(i, j)) { outside[j * F.nx + i] = 1; stack.push([i, j]); }
  while (stack.length) {
    const [a, b] = stack.pop();
    for (const [u, v] of [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]]) if (u >= 0 && v >= 0 && u < F.nx && v < F.nz && !F.get(u, v) && !outside[v * F.nx + u]) { outside[v * F.nx + u] = 1; stack.push([u, v]); }
  }
  const balc = ROOMS.filter((r) => r.outdoor).flatMap((r) => r.rects);
  const isOut = (i, j) => balc.some((r) => inRect(r, (F.xs[i] + F.xs[i + 1]) / 2, (F.zs[j] + F.zs[j + 1]) / 2));
  const roofIn = cover(F, (i, j) => !outside[j * F.nx + i] && !isOut(i, j)), roofOut = cover(F, (i, j) => !outside[j * F.nx + i] && isOut(i, j));
  for (const r of roofIn) occBox(r[0], H, r[1], r[2], H + 0.3, r[3], [0.86, 0.86, 0.84]);
  for (const r of roofOut) occBox(r[0], H, r[1], r[2], H + 0.3, r[3], [0.8, 0.8, 0.78]);
  PLAN.roof = PLAN.roof.concat(roofIn, roofOut);
  for (const r of ROOMS) if (r.poly && (!r.outdoor || r.covered !== false)) for (const q of polyStrips(r.poly, 0.1, true)) { occBox(q[0], H, q[1], q[2], H + 0.3, q[3], [0.8, 0.8, 0.78]); PLAN.roof.push(q); }
  for (const o of OPEN) { if (o.axis === 'x') { GX.push(o.a, o.b); GZ.push(o.at[0], o.at[1]); } else { GZ.push(o.a, o.b); GX.push(o.at[0], o.at[1]); } }
}
const floorSpec = (r) => Object.assign({}, r.outdoor ? { mat: 'floorBalc', uv: 'slab' } : { mat: 'floorLiv', uv: 'plank', off: [0, 0] }, r.floor);
const floorOf = (r) => floorSpec(typeof r === 'string' ? ROOMS.find((q) => q.id === r) : r).mat;

// Floor or ceiling over a union of rectangles, on one shared grid.
function slab(matName, rects, y, cell, up, uvOf) {
  let x0 = 1e9, z0 = 1e9, x1 = -1e9, z1 = -1e9;
  for (const r of rects) { x0 = Math.min(x0, r[0]); z0 = Math.min(z0, r[1]); x1 = Math.max(x1, r[2]); z1 = Math.max(z1, r[3]); }
  const lap = (g) => { const o = []; for (const v of g) o.push(v - LAP, v, v + LAP); return o; };
  const xs = ticks(x0 - LAP, x1 + LAP, cell, lap(GX)), zs = ticks(z0 - LAP, z1 + LAP, cell, lap(GZ));
  const out = (x, z) => { for (const r of rects) if (x > r[0] - LAP && x < r[2] + LAP && z > r[1] - LAP && z < r[3] + LAP) return deepInSolid(x, z); return true; };
  if (up) quadGrid(matName, 0, y, 0, [0, 0, 1], [1, 0, 0], zs, xs, uvOf, (i, j) => out((xs[j] + xs[j + 1]) / 2, (zs[i] + zs[i + 1]) / 2));
  else quadGrid(matName, 0, y, 0, [1, 0, 0], [0, 0, 1], xs, zs, uvOf, (i, j) => out((xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2));
}

// What crosses the wall edge a -> b (the room is on its left). skip: an opening kind to leave closed.
function edgeInfo(ax, az, bx, bz, plain, skip) {
  const alongX = Math.abs(bz - az) < 1e-9, s0 = alongX ? ax : az, fixed = alongX ? az : ax;
  const len = Math.abs(alongX ? bx - ax : bz - az), dir = Math.sign(alongX ? bx - ax : bz - az), holes = [];
  for (const op of plain ? [] : OPEN) {
    if ((op.axis === 'x') !== alongX || (skip && op.kind === skip)) continue;
    if (Math.abs(fixed - op.at[0]) > 1e-6 && Math.abs(fixed - op.at[1]) > 1e-6) continue;
    let u0 = (op.a - s0) * dir, u1 = (op.b - s0) * dir;
    if (u0 > u1) { const t = u0; u0 = u1; u1 = t; }
    if (u1 <= 1e-6 || u0 >= len - 1e-6) continue;
    holes.push({ u0, u1, sill: op.sill, head: op.head, id: op.id });
  }
  return { alongX, s0, fixed, len, dir, holes };
}
function edgeFace(matName, ax, az, bx, bz, o) {
  o = o || {};
  const e = edgeInfo(ax, az, bx, bz, o.plain, o.skip), cell = o.plain ? 0.3 : 0.15, k = o.uvs || 1;
  const w0 = Math.min(e.s0, e.s0 + e.dir * e.len), w1 = Math.max(e.s0, e.s0 + e.dir * e.len), hardW = [];
  for (const h of e.holes) hardW.push(e.s0 + e.dir * h.u0, e.s0 + e.dir * h.u1);
  const us = ticks(w0, w1, cell, hardW).map((w) => (w - e.s0) * e.dir);
  if (e.dir < 0) us.reverse();
  const ys = ticks(-0.02, H + 0.02, cell, o.plain ? [0, H] : HARDY);
  quadGrid(matName, ax, 0, az, e.alongX ? [e.dir, 0, 0] : [0, 0, e.dir], [0, 1, 0], us, ys, (x, y, z) => [(x + z) * k, y * k], (i, j) => {
    const um = (us[i] + us[i + 1]) / 2, ym = (ys[j] + ys[j + 1]) / 2;
    for (const h of e.holes) if (um > h.u0 && um < h.u1 && ym > h.sill && ym < h.head) return true;
    return false;
  });
}
function skirting(ax, az, bx, bz) {
  const e = edgeInfo(ax, az, bx, bz), t = 0.012, hgt = 0.08, cuts = e.holes.filter((h) => h.sill === 0).map((h) => [h.u0 - 0.07, h.u1 + 0.07]).sort((p, q) => p[0] - q[0]);
  let s = -t;
  const run = (u0, u1) => {
    if (u1 - u0 < 0.03) return;
    const w0 = e.s0 + e.dir * u0, w1 = e.s0 + e.dir * u1, lo = Math.min(w0, w1), hi = Math.max(w0, w1);
    if (e.alongX) BX('skirt', lo, 0, Math.min(e.fixed, e.fixed + e.dir * t), hi, hgt, Math.max(e.fixed, e.fixed + e.dir * t), { occ: false, cell: 0.5 });
    else BX('skirt', Math.min(e.fixed, e.fixed - e.dir * t), 0, lo, Math.max(e.fixed, e.fixed - e.dir * t), hgt, hi, { occ: false, cell: 0.5 });
  };
  for (const c of cuts) { run(s, c[0]); s = c[1]; }
  run(s, e.len + t);
}
// The four faces across the wall thickness inside an opening.
function reveals(op, matName) {
  const t0 = op.rev ? op.rev[0] : op.at[0], t1 = op.rev ? op.rev[1] : op.at[1], d = t1 - t0;
  const us = ticks(op.a, op.b, 0.15), ys = ticks(op.sill, op.head, 0.15, HARDY);
  if (op.axis === 'x') {
    quadGrid(matName, op.a, 0, t1, [0, 0, -1], [0, 1, 0], [0, d], ys);
    quadGrid(matName, op.b, 0, t0, [0, 0, 1], [0, 1, 0], [0, d], ys);
    quadGrid(matName, 0, op.head, t0, [1, 0, 0], [0, 0, 1], us, [0, d]);
    if (op.sill > 0) quadGrid(matName, 0, op.sill, t0, [0, 0, 1], [1, 0, 0], [0, d], us);
  } else {
    quadGrid(matName, t0, 0, op.a, [1, 0, 0], [0, 1, 0], [0, d], ys);
    quadGrid(matName, t1, 0, op.b, [-1, 0, 0], [0, 1, 0], [0, d], ys);
    quadGrid(matName, t0, op.head, 0, [1, 0, 0], [0, 0, 1], [0, d], us);
    if (op.sill > 0) quadGrid(matName, t0, op.sill, 0, [0, 0, 1], [1, 0, 0], us, [0, d]);
  }
}
// Box given along an opening: u along the wall, t across it.
function opBox(op, matName, u0, u1, y0, y1, t0, t1, o) {
  if (op.axis === 'x') BX(matName, u0, y0, t0, u1, y1, t1, o); else BX(matName, t0, y0, u0, t1, y1, u1, o);
}
// Lining and architraves of an interior door.
function doorTrim(op) {
  const p = 0.014, a = op.a, b = op.b, t0 = op.at[0], t1 = op.at[1], hd = op.head, o = { occ: false, cell: 0.6 };
  opBox(op, 'trim', a, a + 0.02, 0, hd, t0 - p, t1 + p, o);
  opBox(op, 'trim', b - 0.02, b, 0, hd, t0 - p, t1 + p, o);
  opBox(op, 'trim', a + 0.02, b - 0.02, hd - 0.02, hd, t0 - p, t1 + p, o);
  for (const [f0, f1] of [[t0 - p, t0], [t1, t1 + p]]) {
    opBox(op, 'trim', a - 0.07, a, 0, hd + 0.07, f0, f1, o);
    opBox(op, 'trim', b, b + 0.07, 0, hd + 0.07, f0, f1, o);
    opBox(op, 'trim', a, b, hd, hd + 0.07, f0, f1, o);
  }
}
// Lining of a glazed door, with architraves on the room side only.
function glazedTrim(op) {
  const p = 0.012, t0 = op.at[0], t1 = op.at[1], N = { occ: false };
  for (const [u0, u1] of [[op.a, op.a + 0.02], [op.b - 0.02, op.b]]) opBox(op, 'trim', u0, u1, 0.012, op.head, t0 - p, t1 + p, N);
  opBox(op, 'trim', op.a + 0.02, op.b - 0.02, op.head - 0.02, op.head, t0 - p, t1 + p, N);
  const f0 = op.inner === t0 ? t0 - p : t1, f1 = f0 + p;
  for (const [u0, u1] of [[op.a - 0.06, op.a], [op.b, op.b + 0.06]]) opBox(op, 'trim', u0, u1, 0, op.head + 0.06, f0, f1, N);
  opBox(op, 'trim', op.a, op.b, op.head, op.head + 0.06, f0, f1, N);
}
function leverHandle(matName, x, y, dirX) {
  for (const s of [-1, 1]) {
    CY(matName, x, y - 0.004, s * 0.024, 0.026, 0.026, 0.008, { rx: PI / 2, seg: 16 });
    CY(matName, x, y - 0.0225, s * 0.045, 0.009, 0.009, 0.045, { rx: PI / 2, seg: 10 });
    B(matName, x + dirX * 0.055, y - 0.009, s * 0.062, 0.13, 0.018, 0.014);
  }
}
// A hinged leaf in its own frame: the hinge is the Y axis, the closed leaf runs along +X.
function swingDoor(id, kind, hx, hz, yaw0, swing, w, h, cx, cz) {
  const map = into(new Map(), () => {
    if (kind === 'plain') {
      B('doorWhite', w / 2 + 0.002, 0.006, 0, w, h, 0.04, { cell: 0.3 });
      leverHandle('blackMetal', w - 0.065, 1.0, -1);
    } else {
      const fw = 0.085;
      B('trim', fw / 2, 0.006, 0, fw, h, 0.055, { cell: 0.3 }); B('trim', w - fw / 2, 0.006, 0, fw, h, 0.055, { cell: 0.3 });
      B('trim', w / 2, 0.006, 0, w - 2 * fw, 0.11, 0.055); B('trim', w / 2, h - 0.085, 0, w - 2 * fw, 0.09, 0.055);
      B('glass', w / 2, 0.116, 0, w - 2 * fw, h - 0.2, 0.008);
      leverHandle('aluLight', w - 0.045, 1.02, -1);
    }
  });
  DOORS.push({ id, type: 'swing', map, hx, hz, yaw0, swing, w, cx, cz, t: 0, want: 0 });
}
// A door from its opening: hinge 'a' or 'b' (the end it hangs on), into +1 or -1 (the side of the wall it opens to).
function hingedDoor(o) {
  const glazed = o.leaf === 'glazed', inset = glazed ? 0.052 : 0.02, s = o.hinge === 'b' ? -1 : 1, into = o.into > 0 ? 1 : -1;
  const u = o.hinge === 'b' ? o.b - 0.022 : o.a + 0.022, t = into > 0 ? o.at[1] - inset : o.at[0] + inset;
  let yaw0, swing;
  if (o.axis === 'x') { yaw0 = s > 0 ? 0 : PI; swing = (into > 0 ? -1 : 1) * (s > 0 ? 1 : -1); }
  else { yaw0 = s > 0 ? -PI / 2 : PI / 2; swing = into > 0 ? (yaw0 < 0 ? 1 : -1) : (yaw0 < 0 ? -1 : 1); }
  const hx = o.axis === 'x' ? u : t, hz = o.axis === 'x' ? t : u, mid = (o.a + o.b) / 2, tm = (o.at[0] + o.at[1]) / 2;
  swingDoor(o.id, glazed ? 'glazed' : 'plain', hx, hz, yaw0, swing * PI / 2 * 0.97, o.b - o.a - 0.044, o.head - (glazed ? 0.042 : 0.032),
    o.axis === 'x' ? mid : tm, o.axis === 'x' ? tm : mid);
}
// The entrance door, kept shut, in the opening's frame (outer face at z 0, room side at z D).
function entryDoor(o) {
  const F = frameOf(o), W = F.W, D = F.D, hd = o.head, N = { occ: false };
  place(F.ox, 0, F.oz, F.ry, () => {
    BX('doorEntry', 0.02, 0.004, 0.105, W - 0.02, hd - 0.02, 0.15, { cell: 0.3, occ: false });
    BX('alu', 0, 0, 0.15, W, 0.005, D + LAP, N);
    for (const [x0, x1] of [[0, 0.02], [W - 0.02, W]]) BX('darkWood', x0, 0, 0.1, x1, hd, D + 0.014, N);
    BX('darkWood', 0.02, hd - 0.02, 0.1, W - 0.02, hd, D + 0.014, N);
    for (const [x0, x1] of [[-0.06, 0], [W, W + 0.06]]) BX('darkWood', x0, 0, D, x1, hd + 0.06, D + 0.014, N);
    BX('darkWood', 0, hd, D, W, hd + 0.06, D + 0.014, N);
    const hs = o.handle === 'b' ? -1 : 1;
    place(hs > 0 ? 0.11 : W - 0.11, 0, 0.15, 0, () => {         // lever, lock and spyhole on the room side
      CY('aluLight', 0, 0.996, 0.004, 0.028, 0.028, 0.008, { rx: PI / 2, seg: 16 });
      CY('aluLight', 0, 0.98, 0.025, 0.009, 0.009, 0.04, { rx: PI / 2, seg: 10 });
      B('aluLight', 0.055 * hs, 0.991, 0.045, 0.13, 0.018, 0.014);
      CY('aluLight', 0, 0.846, 0.004, 0.02, 0.02, 0.008, { rx: PI / 2, seg: 14 });
      CY('brass', (W / 2 - 0.11) * hs, 1.496, 0.003, 0.012, 0.012, 0.006, { rx: PI / 2, seg: 12 });
    });
  });
}
// A casement window: frame, one sash, inner sill board and outer sill. d counts in from the room-side face.
function casement(o) {
  const F = frameOf(o), W = F.W, D = F.D, f = 0.055, c = 0.125, N = { occ: false };
  const ib = (mat, u0, u1, y0, y1, d0, d1, opt) => BX(mat, u0, y0, D - d1, u1, y1, D - d0, opt);
  place(F.ox, 0, F.oz, F.ry, () => {
    ib('trim', 0, f, o.sill, o.head, c - 0.035, c + 0.035, N); ib('trim', W - f, W, o.sill, o.head, c - 0.035, c + 0.035, N);
    ib('trim', f, W - f, o.sill, o.sill + f, c - 0.035, c + 0.035, N); ib('trim', f, W - f, o.head - f, o.head, c - 0.035, c + 0.035, N);
    const s = 0.05, a = f, b = W - f, y0 = o.sill + f, y1 = o.head - f;     // the sash
    ib('trim', a, a + s, y0, y1, c - 0.045, c + 0.02, N); ib('trim', b - s, b, y0, y1, c - 0.045, c + 0.02, N);
    ib('trim', a + s, b - s, y0, y0 + s, c - 0.045, c + 0.02, N); ib('trim', a + s, b - s, y1 - s, y1, c - 0.045, c + 0.02, N);
    ib('glass', a + s, b - s, y0 + s, y1 - s, c - 0.012, c - 0.004, N);   // glass lets the daylight through: no stand-in
    ib('aluLight', a + s / 2 - 0.011, a + s / 2 + 0.011, 1.5, 1.63, c - 0.065, c - 0.051, N);
    ib('aluLight', a + s / 2 - 0.008, a + s / 2 + 0.008, 1.5, 1.53, c - 0.081, c - 0.059, N);
    ib('trim', -0.03, W + 0.03, o.sill - 0.02, o.sill + 0.01, -0.045, c - 0.03, { occ: false, cell: 0.2 });   // inner sill board
    ib('aluLight', 0, W, o.sill - 0.008, o.sill + 0.004, c + 0.03, D + 0.02, N);                           // outer sill
  });
}
// Floor-to-head fixed glazing in an aluminium frame, split by mullions about every 1.1 m.
function fixedGlass(o) {
  const tm = (o.at[0] + o.at[1]) / 2, f = 0.05, N = { occ: false };
  opBox(o, 'alu', o.a, o.a + f, 0, o.head, tm - 0.05, tm + 0.05, N); opBox(o, 'alu', o.b - f, o.b, 0, o.head, tm - 0.05, tm + 0.05, N);
  opBox(o, 'alu', o.a + f, o.b - f, 0, 0.06, tm - 0.05, tm + 0.05, N); opBox(o, 'alu', o.a + f, o.b - f, o.head - 0.06, o.head, tm - 0.05, tm + 0.05, N);
  const n = Math.max(1, Math.round((o.b - o.a) / 1.1));
  for (let i = 1; i < n; i++) { const u = o.a + (o.b - o.a) * i / n; opBox(o, 'alu', u - 0.025, u + 0.025, 0.06, o.head - 0.06, tm - 0.04, tm + 0.04, N); }
  opBox(o, 'glass', o.a + f, o.b - f, 0.06, o.head - 0.06, tm - 0.004, tm + 0.004);
}
// Sliding glazing. panes 2: a fixed pane at end 'fixed' ('b' unless given) and one that slides over it;
// panes 4: fixed panes at both ends and two in the middle that part. The sliding panes run on the room side.
function slider(o) {
  const hd = o.head, f = 0.05, N = { occ: false }, tm = (o.at[0] + o.at[1]) / 2, tin = o.inner === o.at[0] ? -1 : 1;
  const L = o.b - o.a - 2 * f, tf = tm - tin * 0.035, tmv = tm + tin * 0.025, ry = o.axis === 'x' ? 0 : -PI / 2;
  const panes = o.panes || (o.b - o.a > 2.6 ? 4 : 2);
  opBox(o, 'alu', o.a, o.a + f, 0, hd, tm - 0.07, tm + 0.07, N); opBox(o, 'alu', o.b - f, o.b, 0, hd, tm - 0.07, tm + 0.07, N);
  opBox(o, 'alu', o.a + f, o.b - f, hd - 0.06, hd, tm - 0.07, tm + 0.07, N);
  const pane = (w) => {
    const s = 0.05, d = 0.04;
    B('alu', s / 2, 0.014, 0, s, hd - 0.076, d, { cell: 0.4 }); B('alu', w - s / 2, 0.014, 0, s, hd - 0.076, d, { cell: 0.4 });
    B('alu', w / 2, 0.014, 0, w - 2 * s, 0.06, d); B('alu', w / 2, hd - 0.112, 0, w - 2 * s, 0.05, d);
    B('glass', w / 2, 0.074, 0, w - 2 * s, hd - 0.186, 0.008);
  };
  const fixedAt = (u0, w) => {
    if (o.axis === 'x') { place(u0, 0, tf, 0, () => pane(w)); COL.push({ k: 0, x0: u0 - 0.015, z0: tm - 0.07, x1: u0 + w + 0.015, z1: tm + 0.07 }); }
    else { place(tf, 0, u0, ry, () => pane(w)); COL.push({ k: 0, x0: tm - 0.07, z0: u0 - 0.015, x1: tm + 0.07, z1: u0 + w + 0.015 }); }
  };
  const mover = (id, u0, w, slide, hx) => {
    const map = into(new Map(), () => { pane(w); B('aluLight', hx, 0.95, -0.036, 0.02, 0.26, 0.022); B('aluLight', hx, 0.95, 0.036, 0.02, 0.26, 0.022); });
    const c = u0 + w / 2;
    DOORS.push({ id, type: 'slide', axis: o.axis, map, hx: o.axis === 'x' ? u0 : tmv, hz: o.axis === 'x' ? tmv : u0, slide, w,
      cx: o.axis === 'x' ? c : tm, cz: o.axis === 'x' ? tm : c, t: 0, want: 0 });
  };
  if (panes === 4) {
    const wd = L / 4, pw = wd + 0.02;
    fixedAt(o.a + f, pw); fixedAt(o.b - f - pw, pw);
    mover(o.id + '1', o.a + f + wd - 0.02, pw, -(wd - 0.04), pw - 0.025);
    mover(o.id + '2', o.a + f + 2 * wd, pw, wd - 0.04, 0.025);
  } else {
    const wm = L / 2 + 0.03, wf = L / 2 + 0.02, fb = o.fixed !== 'a';
    fixedAt(fb ? o.b - f - wf : o.a + f, wf);
    mover(o.id, fb ? o.a + f : o.b - f - wm, wm, (fb ? 1 : -1) * (L - wm + 0.005), fb ? wm - 0.025 : 0.025);
  }
}
// A glass balustrade along a polyline: posts about every 0.8 m, panes, handrail, bottom rail, and a collider.
// One straight glass balustrade from u = a to b along local X (slanted runs; the collider turns with it).
function railRun(a, b, top, N) {
  const box = (mat, u0, u1, y0, y1, d, o) => B(mat, (u0 + u1) / 2, y0, 0, u1 - u0, y1 - y0, 2 * d, Object.assign({ occ: false }, o));
  const n = Math.max(1, Math.round((b - a) / 0.8));
  for (let i = 0; i <= n; i++) { const u = a + (b - a) * i / n; box('aluLight', u - 0.02, u + 0.02, 0, top, 0.02, N); }
  for (let i = 0; i < n; i++) box('glassTeal', a + (b - a) * i / n + 0.035, a + (b - a) * (i + 1) / n - 0.035, 0.09, top - 0.09, 0.006);
  box('aluLight', a - 0.02, b + 0.02, top, top + 0.03, 0.028, N); box('aluLight', a, b, 0.05, 0.075, 0.012, N);
  colRect(a - 0.03, -0.03, b + 0.03, 0.03);
}
// A full-height wall at a slant: { "a": [x, z], "b": [x, z], "t": thickness, "mat" }. Its centre line runs a -> b.
// Optional: "in" the finish on the indoor face (e.g. "wall"), and "ops", openings along it, each { kind: "door" | "fixed",
// from, to (metres along a -> b), head }; a door also takes id, hinge "a"/"b", into 1/-1 (1: the side left of a -> b
// seen from above, i.e. local +z), rest, leaf. Fixed glazing lets daylight into the bake (SLANT_OPEN).
const SLANT_OPEN = [];
function slantWall(s) {
  const [ax, az] = s.a, [bx, bz] = s.b, t = s.t, L = Math.hypot(bx - ax, bz - az), ry = Math.atan2(-(bz - az), bx - ax);
  const cx = (ax + bx) / 2, cz = (az + bz) / 2, ux = (bx - ax) / L, uz = (bz - az) / L, nx = -uz * t / 2, nz = ux * t / 2;
  into(CAPS, () => put('cap', new T.PlaneGeometry(L, t), xf(cx, H + 0.002, cz, ry, -PI / 2), { uv: 'keep' }));
  const P = [[ax + nx, az + nz], [bx + nx, bz + nz], [bx - nx, bz - nz], [ax - nx, az - nz]];
  for (const q of polyStrips(P, 0.1, true)) PLAN.roof.push(q);
  if (!s.ops && !s.in) {
    place(cx, 0, cz, ry, () => { B(s.mat || 'facade', 0, -0.02, 0, L, H + 0.02, t, { occ: false, cell: 0.15 }); colRect(-L / 2, -t / 2, L / 2, t / 2); });
    for (const q of polyStrips(P, 0.06)) occBox(q[0], 0, q[1], q[2], H, q[3], ALB_WALL);
    return;
  }
  // the indoor side: +1 when an indoor room lies on local +z (left of a -> b), -1 on the other side
  const wx = (u) => ax + ux * u, wz = (u) => az + uz * u, n1 = [-uz, ux];
  const indoorAt = (k) => [0.25, 0.5, 0.75].some((f) => ROOMS.some((r) => !r.outdoor && roomHas(r, wx(L * f) + k * n1[0] * (t / 2 + 0.2), wz(L * f) + k * n1[1] * (t / 2 + 0.2))));
  const rs = indoorAt(1) ? 1 : indoorAt(-1) ? -1 : 0;
  const ops = (s.ops || []).map((o) => Object.assign({ head: o.kind === 'door' ? 2.1 : 2.32 }, o)).sort((p, q) => p.from - q.from);
  const quad = (u0, u1) => [[wx(u0) + nx, wz(u0) + nz], [wx(u1) + nx, wz(u1) + nz], [wx(u1) - nx, wz(u1) - nz], [wx(u0) - nx, wz(u0) - nz]];
  const solid = (u0, u1, y0, y1) => {                // wall between u0 and u1 (from a), y0..y1; two halves when the inside differs
    const x = (u0 + u1) / 2 - L / 2, w = u1 - u0, o = { occ: false, cell: 0.15 };
    if (s.in && rs) { B(s.mat || 'facade', x, y0, -rs * t / 4, w, y1 - y0, t / 2, o); B(s.in, x, y0, rs * t / 4, w, y1 - y0, t / 2, o); }
    else B(s.mat || 'facade', x, y0, 0, w, y1 - y0, t, o);
  };
  let u = 0;
  const spans = [];
  for (const o of ops) { if (o.from > u) spans.push([u, o.from]); u = Math.max(u, o.to); }
  if (u < L) spans.push([u, L]);
  place(cx, 0, cz, ry, () => {
    for (const [u0, u1] of spans) { solid(u0, u1, -0.02, H + 0.02); colRect(u0 - L / 2, -t / 2, u1 - L / 2, t / 2); }
    for (const o of ops) {
      const x0 = o.from - L / 2, x1 = o.to - L / 2, N = { occ: false }, hd = o.head;
      solid(o.from, o.to, hd, H + 0.02);
      if (o.kind === 'door') {                       // lining and architraves
        const p = 0.014, oc = { occ: false, cell: 0.6 };
        BX('trim', x0, 0, -t / 2 - p, x0 + 0.02, hd, t / 2 + p, oc); BX('trim', x1 - 0.02, 0, -t / 2 - p, x1, hd, t / 2 + p, oc);
        BX('trim', x0 + 0.02, hd - 0.02, -t / 2 - p, x1 - 0.02, hd, t / 2 + p, oc);
        for (const k of [-1, 1]) {
          const z0 = k * (t / 2), z1 = k * (t / 2 + p);
          BX('trim', x0 - 0.07, 0, z0, x0, hd + 0.07, z1, oc); BX('trim', x1, 0, z0, x1 + 0.07, hd + 0.07, z1, oc); BX('trim', x0, hd, z0, x1, hd + 0.07, z1, oc);
        }
      } else {                                       // fixed glazing on the outer third of the wall, mullions about every 1.1 m
        const tm = -rs * t / 6, f = 0.05;
        BX('alu', x0, 0, tm - 0.05, x0 + f, hd, tm + 0.05, N); BX('alu', x1 - f, 0, tm - 0.05, x1, hd, tm + 0.05, N);
        BX('alu', x0 + f, 0, tm - 0.05, x1 - f, 0.06, tm + 0.05, N); BX('alu', x0 + f, hd - 0.06, tm - 0.05, x1 - f, hd, tm + 0.05, N);
        const n = Math.max(1, Math.round((x1 - x0) / 1.1));
        for (let i = 1; i < n; i++) { const m = x0 + (x1 - x0) * i / n; BX('alu', m - 0.025, 0.06, tm - 0.04, m + 0.025, hd - 0.06, tm + 0.04, N); }
        BX('glass', x0 + f, 0.06, tm - 0.004, x1 - f, hd - 0.06, tm + 0.004);
        BX('alu', x0, 0, -t / 2, x1, 0.02, t / 2, N);
        colRect(x0, -t / 2, x1, t / 2);
      }
    }
  });
  for (const [u0, u1] of spans) for (const q of polyStrips(quad(u0, u1), 0.06)) occBox(q[0], 0, q[1], q[2], H, q[3], ALB_WALL);
  for (const o of ops) {
    for (const q of polyStrips(quad(o.from, o.to), 0.06)) occBox(q[0], o.head, q[1], q[2], H, q[3], ALB_WALL);
    const um = (o.from + o.to) / 2, mx = wx(um), mz = wz(um);
    if (o.kind === 'door') {
      const glazed = o.leaf === 'glazed', inset = glazed ? 0.052 : 0.02, k = o.into > 0 ? 1 : -1, hb = o.hinge === 'b';
      const uh = hb ? o.to - 0.022 : o.from + 0.022, off = k * (t / 2 - inset);
      swingDoor(o.id, glazed ? 'glazed' : 'plain', wx(uh) + n1[0] * off, wz(uh) + n1[1] * off, hb ? ry + PI : ry, (hb ? 1 : -1) * k * PI / 2 * 0.97,
        o.to - o.from - 0.044, o.head - (glazed ? 0.042 : 0.032), mx, mz);
    }
    if (rs && (o.kind === 'fixed' || o.leaf === 'glazed')) {
      const hu = (o.to - o.from) / 2, hv = o.head / 2;
      SLANT_OPEN.push({ c: [mx, hv, mz], n: [rs * n1[0], 0, rs * n1[1]], u: [ux * hu, 0, uz * hu], v: [0, hv, 0], nu: Math.max(3, Math.round(hu * 8.5)), nv: Math.round(hv * 9), T: 0.82 });
    }
  }
}
// The edge of a slanted balcony slab, under its floor.
function slabEdge(P) {
  for (let i = 0; i < P.length; i++) {
    const [ax, az] = P[i], [bx, bz] = P[(i + 1) % P.length], L = Math.hypot(bx - ax, bz - az);
    place((ax + bx) / 2, 0, (az + bz) / 2, Math.atan2(-(bz - az), bx - ax), () => B('facade', 0, -0.22, 0, L + 0.02, 0.219, 0.04, { occ: false, cell: 1 }));
  }
}
function railing(r) {
  const top = r.top || 1.05, N = { occ: false };
  for (let k = 0; k + 1 < r.pts.length; k++) {
    const [ax, az] = r.pts[k], [bx, bz] = r.pts[k + 1], alongX = Math.abs(bz - az) < 1e-6;
    if (!alongX && Math.abs(bx - ax) > 1e-6) {           // a slanted run: built along X in its own frame
      place(ax, 0, az, Math.atan2(-(bz - az), bx - ax), () => railRun(0, Math.hypot(bx - ax, bz - az), top, N));
      continue;
    }
    const a = alongX ? Math.min(ax, bx) : Math.min(az, bz), b = alongX ? Math.max(ax, bx) : Math.max(az, bz), t = alongX ? az : ax;
    const box = (mat, u0, u1, y0, y1, d, o) => (alongX ? BX(mat, u0, y0, t - d, u1, y1, t + d, o) : BX(mat, t - d, y0, u0, t + d, y1, u1, o));
    const n = Math.max(1, Math.round((b - a) / 0.8));
    for (let i = 0; i <= n; i++) { const u = a + (b - a) * i / n; box('aluLight', u - 0.02, u + 0.02, 0, top, 0.02, N); }
    for (let i = 0; i < n; i++) box('glassTeal', a + (b - a) * i / n + 0.035, a + (b - a) * (i + 1) / n - 0.035, 0.09, top - 0.09, 0.006);
    box('aluLight', a - 0.02, b + 0.02, top, top + 0.03, 0.028, N); box('aluLight', a, b, 0.05, 0.075, 0.012, N);
    if (alongX) COL.push({ k: 0, x0: a - 0.03, z0: t - 0.03, x1: b + 0.03, z1: t + 0.03 }); else COL.push({ k: 0, x0: t - 0.03, z0: a - 0.03, x1: t + 0.03, z1: b + 0.03 });
  }
}

function buildPlan() {
  buildWalls();
  const UV = {
    plank: (o) => (x, y, z) => [(x + o[0]) / 2.4, (z + o[1]) / 3.6],        // boards run north-south
    plankX: (o) => (x, y, z) => [(z + o[1]) / 2.4, (x + o[0]) / 3.6],       // boards run east-west
    tile: () => (x, y, z) => [x / 1.2, z / 1.2],
  };
  // ---- floors and ceilings ----
  for (const r of ROOMS) {
    const f = floorSpec(r), x0 = Math.min(...r.rects.map((q) => q[0])), z0 = Math.min(...r.rects.map((q) => q[1]));
    const uv = f.uv === 'slab' ? (x, y, z) => [(x - x0) / 1.2, (z - z0) / 1.2] : UV[f.uv || 'plank'](f.off || [0, 0]);
    const key = mkLike('floor@' + r.id, f.mat), plank = !f.uv || f.uv === 'plank' || f.uv === 'plankX';
    SURF.floor.push({ key, base: f.mat, uvm: plank ? [2.4, 3.6] : [1.2, 1.2], rooms: [r] });
    if (r.rects.length) slab(key, r.rects, 0, r.outdoor ? 0.14 : 0.125, true, uv);
    if (r.poly) put(key, polyGeo(r.poly, 0, r.outdoor ? 0.3 : 0.25, true), null, { uvScale: 1 / (plank ? 2.4 : 1.2), uo: 0, vo: 0 });
  }
  const groups = roomGroups();
  into(CEIL, () => { for (const g of groups) if (!g.outdoor || g.rooms.every((r) => r.covered !== false)) slab('ceil', g.rooms.flatMap((r) => r.rects), H, g.outdoor ? 0.25 : 0.2, false);
    for (const r of ROOMS) if (r.poly && (!r.outdoor || r.covered !== false)) put('ceil', polyGeo(r.poly, H, 0.3, false), null, { uo: 0, vo: 0 }); });
  // thresholds
  const TH = { door: ['oak', 0.004], gap: ['oak', 0.004], slide: ['alu', 0.012], fixed: ['alu', 0.01] };
  for (const o of OPEN) {
    const th = o.kind === 'door' && o.leaf === 'glazed' ? ['trim', 0.012] : TH[o.kind];
    if (th) opBox(o, th[0], o.a, o.b, 0, th[1], o.at[0], o.at[1], { occ: false, cell: 0.2 });
  }

  // ---- walls: each group of rooms gets a surface wherever a wall run lies against it ----
  groups.forEach((g, gi) => {
    const base = g.outdoor ? 'facade' : g.rooms[0].walls || 'wall', skirt = !g.outdoor && base === 'wall' && g.rooms[0].skirt !== false;
    const mat = g.outdoor ? base : mkLike('wall@' + gi, base), uvs = base === 'wallTile' ? 1 / 0.6 : 1;
    if (!g.outdoor) SURF.wall.push({ key: mat, base, uvm: [1 / uvs, 1 / uvs], rooms: g.rooms });
    for (const [ax, az, bx, bz] of outline(g.G, g.has, (xo, zo) => onRun(xo, zo))) {
      edgeFace(mat, ax, az, bx, bz, uvs !== 1 ? { uvs } : {});
      FRAME.push([ax, az, bx, bz]);
      if (skirt) skirting(ax, az, bx, bz);
    }
  });
  // the outside of the block, so the model reads as a solid from every side of the plan view
  {
    const F = cells(ROOMS.flatMap((r) => r.rects).concat(PLAN.runs), []);
    for (const [ax, az, bx, bz] of outline(F, (i, j) => !!F.get(i, j), (xo, zo, xi, zi) => onRun(xi, zi))) { edgeFace('facade', bx, bz, ax, az, { skip: 'entry' }); FRAME.push([ax, az, bx, bz]); }
  }
  for (const o of OPEN) reveals(o, 'wall');
  into(CAPS, () => {
    for (const r of PLAN.runs) quadGrid('cap', r[0], H + 0.002, r[1], [0, 0, 1], [1, 0, 0], [0, r[3] - r[1]], [0, r[2] - r[0]]);
    for (const s of FLAT.shafts || []) {                               // riser shafts, dark inside the wall cap, with their ducts
      const d = s.dark || [s.rect[0] + 0.055, s.rect[1] + 0.055, s.rect[2] - 0.055, s.rect[3] - 0.055], alongX = d[2] - d[0] >= d[3] - d[1];
      quadGrid('capDark', d[0], H + 0.003, d[1], [0, 0, 1], [1, 0, 0], [0, d[3] - d[1]], [0, d[2] - d[0]]);
      const n = s.rings || 1, rings = Array.isArray(n) ? n : Array.from({ length: n }, (v, k) => (k + 0.5) / n);
      for (const f of rings) put('capRing', new T.RingGeometry(0.062, 0.08, 28), xf(alongX ? lerp(d[0], d[2], f) : (d[0] + d[2]) / 2, H + 0.004, alongX ? (d[1] + d[3]) / 2 : lerp(d[1], d[3], f), 0, -PI / 2), { uv: 'keep' });
    }
  });

  // ---- doors, windows, glazing ----
  for (const o of OPEN) {
    if (o.kind === 'door') { if (o.leaf === 'glazed') glazedTrim(o); else doorTrim(o); hingedDoor(o); }
    else if (o.kind === 'entry') entryDoor(o);
    else if (o.kind === 'window') casement(o);
    else if (o.kind === 'fixed') fixedGlass(o);
    else if (o.kind === 'slide') slider(o);
    else if (o.kind === 'gap') doorTrim(o);
  }
  // ---- balconies: rails and the edge of the slab ----
  for (const r of FLAT.rails || []) railing(r);
  for (const r of ROOMS) if (r.outdoor) for (const q of r.rects) BX('facade', q[0] - 0.02, -0.22, q[1] - 0.02, q[2] + 0.02, -0.001, q[3] + 0.02, { occ: false, cell: 1 });
  for (const r of ROOMS) if (r.outdoor && r.poly) slabEdge(r.poly);
  // light switches beside the doors, 1.05 m up: [x, z, turn in degrees]
  for (const [x, z, r] of FLAT.switches || []) place(x, 1.05, z, r * DEG, () => { B('switch', 0, -0.041, 0.005, 0.082, 0.082, 0.01); B('switch', 0, -0.03, 0.011, 0.034, 0.06, 0.004); });
}

// ---------- 40-furn.js : the furniture registry ----------
// The pieces themselves live in the shared folder furniture/ at the top of the project, one file per piece, and every
// flat page loads them from there (furniture/_parts.js first, then the rest). A piece file calls
//   piece('name', { name: 'Panel label', add: position in the Add list, values: { its Add defaults } }, function (p) { ... });
// FLAT.furniture lists the pieces of a flat: { "t": piece name, "x", "z", "r": turn in degrees, ...its own values }.
const PIECES = {}, PIECE_INFO = {};
function piece(t, info, fn) { PIECES[t] = fn; PIECE_INFO[t] = info || {}; }

// Every piece of furniture gets batches of its own, so the Furniture panel can move, turn or take away one piece while
// the page runs, and the "Empty" button can hide them all. Built-in ceiling lights (FIXED) stay with the shell.
// A piece's lamps, looking glasses and colliders go into LAMPS, MIRRORS and COL as usual, marked furn and listed on its
// record; its light stand-ins are kept on the record only, so OCC holds the shell's.
const FIXED = { downlight: 1, ceilingLamp: 1 };
const PIECE_RECS = [];
// Builds piece p into rec (a new record if none): rec.map, rec.ceil, rec.caps hold its batches.
function buildPiece(p, rec) {
  const fn = PIECES[p.t];
  if (!fn) throw new Error('no piece called "' + p.t + '" (flats/FORMAT.md lists them)');
  rec = Object.assign(rec || {}, { p, map: new Map(), ceil: new Map(), caps: new Map() });
  const l0 = LAMPS.length, m0 = MIRRORS.length, c0 = COL.length, o0 = OCC.box.length, a0 = OCC.alb.length, save = TARGET, saveM = CUR;
  OCC_SETS.add(rec.map);
  REMAP.set(CEIL, rec.ceil); REMAP.set(CAPS, rec.caps); TARGET = rec.map; CUR = new T.Matrix4();
  try { fn(p); } finally { TARGET = save; CUR = saveM; REMAP.clear(); OCC_SETS.delete(rec.map); }
  rec.lamps = LAMPS.slice(l0); rec.mirrors = MIRRORS.slice(m0); rec.cols = COL.slice(c0);
  rec.occBox = OCC.box.splice(o0); rec.occAlb = OCC.alb.splice(a0);
  for (const a of [rec.lamps, rec.mirrors, rec.cols]) for (const q of a) q.furn = true;
  return rec;
}
function buildFurniture() {
  (FLAT.furniture || []).forEach((p, i) => {
    if (!PIECES[p.t]) throw new Error('furniture[' + i + ']: no piece called "' + p.t + '" (flats/FORMAT.md lists them)');
    if (FIXED[p.t] || p.fixed) PIECES[p.t](p);
    else PIECE_RECS.push(buildPiece(p));
  });
}

// ---------- furniture/_parts.js : shared parts and helpers for the pieces in this folder ----------
// Loaded before every piece file. The engine (source/src) provides the builders (B, BX, place, lamp, ...).
// FLAT.furniture lists the pieces of a flat: { "t": piece name, "x", "z", "r": turn in degrees, ...its own values }.
// PIECES below holds every piece; flats/FORMAT.md lists them with their values. A piece's "native" direction is how
// it stands at r 0; r turns it anticlockwise seen from above (90 turns a piece facing south to face east).
// Some pieces are drawn at the spot where flat 1 has them (pFrom moves them into the piece's own frame).
// Lathe profiles are listed so that the outside of the solid is on the right of the direction of travel:
// out along the bottom, up the side, in along the top.
const WARM = [1.0, 0.79, 0.57], SOFT = [1.0, 0.9, 0.76], COOL = [1.0, 0.96, 0.9];
const COLOURS = { WARM, SOFT, COOL };
const colOf = (c) => (Array.isArray(c) ? c : COLOURS[c || 'SOFT']);
const dg = (v) => (v || 0) * DEG;

// ---- building in a piece's own frame ----
const pAt = (p, fn) => place(p.x, p.y || 0, p.z, dg(p.r), fn);
const pFrom = (ax, az, fn) => place(-ax, 0, -az, 0, fn);          // code written at (ax, az) of flat 1
const _pv = new T.Vector3();
function pLamp(x, y, z, I, col, ch, o) { _pv.set(x, y, z).applyMatrix4(CUR); lamp(_pv.x, _pv.y, _pv.z, I, col, ch, o); }
function pOcc(x0, y0, z0, x1, y1, z1, alb) { occLocal(xf((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), x1 - x0, y1 - y0, z1 - z0, alb); }
// A looking glass: p and n in the piece's frame. zone: the world rectangle it can be seen from (default: its room).
function pMirror(M, zone) {
  const p = new T.Vector3(M.p[0], M.p[1], M.p[2]).applyMatrix4(CUR), n = new T.Vector3(M.n[0], M.n[1], M.n[2]).transformDirection(CUR);
  const r = (v) => Math.round(v * 1e6) / 1e6;
  if (!zone) {
    const room = roomIn(p.x + n.x * 0.3, p.z + n.z * 0.3), q = room && room.rects.length ? room.rects : [BOUNDS];
    zone = [Math.min(...q.map((a) => a[0])) - 0.1, Math.min(...q.map((a) => a[1])) - 0.1, Math.max(...q.map((a) => a[2])) + 0.1, Math.max(...q.map((a) => a[3])) + 0.1];
  }
  MIRRORS.push(Object.assign({}, M, { p: [p.x, p.y, p.z], n: [r(n.x), r(n.y), r(n.z)], zone }));
}
// BX with its corners in any order.
function BXS(m, xa, y0, za, xb, y1, zb, o) { BX(m, Math.min(xa, xb), y0, Math.min(za, zb), Math.max(xa, xb), y1, Math.max(za, zb), o); }

// ---- lights ----
function downlight(x, z, I, col, ch) {
  into(CEIL, () => {
    CY('trim', x, H - 0.006, z, 0.05, 0.05, 0.006, { seg: 16 });
    CY(ch === 2 ? 'lampEve' : 'lampCool', x, H - 0.009, z, 0.036, 0.036, 0.003, { seg: 14 });
  });
  lamp(x, H - 0.03, z, I, col, ch, { down: 1, glow: 0.28 });
}
function ceilingLamp(x, z, r, I, col, ch) {
  into(CEIL, () => {
    CY('trim', x, H - 0.03, z, r + 0.012, r + 0.012, 0.03, { seg: 28 });
    LA(ch === 2 ? 'lampEve' : 'lampCool', x, H - 0.03, z, [[0.001, -0.08], [r * 0.4, -0.075], [r * 0.75, -0.06], [r * 0.96, -0.03], [r, 0]], { seg: 28 });
  });
  lamp(x, H - 0.14, z, I, col, ch, { glow: r * 3.4 });
}
function pendant(x, z, y) {
  into(CEIL, () => {
    LA('blackMetal', x, y, z, [[0.165, 0], [0.17, 0.006], [0.125, 0.1], [0.055, 0.16], [0.022, 0.18], [0.001, 0.182]], { seg: 24 });
    CY('lampEve', x, y + 0.012, z, 0.158, 0.158, 0.004, { seg: 24 });
    BAR('blackMetal', [x, y + 0.18, z], [x, H, z], 0.004, { seg: 6 });
  });
  lamp(x, y - 0.03, z, 1.1, SOFT, 2, { down: 1, glow: 0.42 });
}

// ---- plants ----
function leafGeo(len, wid, droop, fold) {
  const n = 6, pos = [], idx = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, w = wid * 0.5 * Math.pow(Math.sin(PI * Math.pow(t, 0.75)), 0.9) + (i === 0 ? 0.004 : 0), y = -droop * t * t * len, z = t * len;
    pos.push(-w, y + w * fold, z, 0, y, z, w, y + w * fold, z);
  }
  for (let i = 0; i < n; i++) { const a = i * 3; idx.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5); }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
function bladeGeo(len, wid, droop) {
  const n = 6, pos = [], idx = [];
  for (let i = 0; i <= n; i++) { const t = i / n, w = wid * 0.5 * (1 - t * t * 0.86), y = -droop * t * t * len * 0.5, z = t * len * (1 - 0.15 * droop * t); pos.push(-w, y, z, w, y, z); }
  for (let i = 0; i < n; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
function pot(matName, r, h) {
  LA(matName, 0, 0, 0, [[0.001, 0], [r * 0.78, 0], [r, h], [r * 0.9, h], [r * 0.88, h - 0.03]], { seg: 20 });
  CY('soil', 0, h - 0.035, 0, r * 0.89, r * 0.89, 0.005, { seg: 16 });
  occLocal(xf(0, h / 2, 0), r * 1.1, h, r * 1.1, albOf(matName));
  colCircle(0, 0, r + 0.02);
}
// Trunk with large leaves spiralling up it. o.y lifts the pot (onto a shelf, say).
function plantLeafy(x, z, o) {
  const R = rng(o.seed), ph = o.potH || 0.32, pr = o.potR || 0.15, stems = o.stems || 1;
  place(x, o.y || 0, z, 0, () => {
    pot(o.pot || 'pot', pr, ph);
    for (let s = 0; s < stems; s++) {
      const la = R() * TAU, lean = (R() - 0.5) * 0.3, top = o.h * (0.78 + R() * 0.22), off = stems > 1 ? pr * 0.35 : 0;
      const bx = Math.cos(la) * off, bz = Math.sin(la) * off, tx = bx + Math.cos(la) * lean * top, tz = bz + Math.sin(la) * lean * top;
      BAR('stem', [bx, ph - 0.04, bz], [tx, top, tz], 0.008, { r2: 0.014, seg: 6 });
      const n = Math.round(o.n / stems);
      for (let i = 0; i < n; i++) {
        const t = 0.22 + 0.78 * (i + R() * 0.5) / n, len = o.leaf * (0.72 + R() * 0.5);
        put(o.mats[(R() * o.mats.length) | 0], leafGeo(len, len * (o.ratio || 0.48), 0.3 + R() * 0.35, 0.22),
          xf(lerp(bx, tx, t), lerp(ph, top, t), lerp(bz, tz, t), i * 2.4 + s * 1.3 + R() * 0.6, -(0.55 + R() * 0.55 - t * 0.25)));
      }
    }
  });
}
// Rosette of arching blades.
function plantSpiky(x, z, o) {
  const R = rng(o.seed), ph = o.potH || 0.3, pr = o.potR || 0.14;
  place(x, o.y || 0, z, 0, () => {
    pot(o.pot || 'potWhite', pr, ph);
    for (let i = 0; i < o.n; i++) {
      const len = o.len * (0.6 + R() * 0.5);
      put(o.mats[(R() * o.mats.length) | 0], bladeGeo(len, o.wid || 0.028, 0.5 + R() * 0.9), xf((R() - 0.5) * pr * 0.5, ph - 0.03, (R() - 0.5) * pr * 0.5, R() * TAU, -(0.25 + R() * 1.2)));
    }
  });
}
function bush(x, y0, z, r, seed) {
  const R = rng(seed), N = 190;
  SP('leafA', x, y0 + r * 0.95, z, r * 0.7, { seg: 10, hseg: 8 });
  for (let i = 0; i < N; i++) {
    const cy = 1 - 2 * (i + 0.5) / N;
    if (cy < -0.5) continue;
    const rho = Math.sqrt(1 - cy * cy), ph = i * 2.39996, dx = rho * Math.cos(ph), dz = rho * Math.sin(ph), k = r * (0.62 + R() * 0.16), len = 0.13 + R() * 0.1;
    put(R() < 0.6 ? 'leafC' : 'leafB', leafGeo(len, len * 0.5, 0.5, 0.3), xf(x + dx * k, y0 + r * 0.95 + cy * k, z + dz * k, Math.atan2(dx, dz) + (R() - 0.5), -Math.asin(clamp(cy * 0.7 + 0.25, -1, 1))));
  }
}

// ---- small recurring things ----
function art(matName, x, y, z, w, h, ry) {
  place(x, y, z, ry, () => {
    B('blackMetal', 0, -h / 2 - 0.014, 0.011, w + 0.028, h + 0.028, 0.022);
    B('paper', 0, -h / 2, 0.0125, w, h, 0.022);
    put(matName, new T.PlaneGeometry(w - 0.1, h - 0.1), xf(0, 0, 0.0245), { uv: 'keep' });
  });
}
function curtain(x0, x1, z, y0, y1) {
  const w = x1 - x0, h = y1 - y0, g = new T.PlaneGeometry(w, h, Math.round(w / 0.013), 8), P = g.attributes.position;
  for (let i = 0; i < P.count; i++) { const x = P.getX(i), f = 0.7 + 0.3 * (P.getY(i) / h + 0.5); P.setZ(i, 0.042 * Math.sin(x * TAU / 0.105 + Math.sin(x * 9) * 0.8) * f); }
  g.computeVertexNormals();
  put('curtain', g, xf((x0 + x1) / 2, (y0 + y1) / 2, z), { uv: 'keep' });
}
function diningChair(x, z, ry) {
  place(x, 0, z, ry, () => {                                        // the sitter faces +Z
    RB('plastic', 0, 0.425, 0, 0.44, 0.035, 0.42, 0.016);
    put('plastic', bendGeo(roundedBoxGeo(0.47, 0.33, 0.028, 0.012, 2, 0.06), 0.34), xf(0, 0.655, -0.2, PI, 0.15));
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) BAR('oak', [sx * 0.21, 0, sz * 0.2], [sx * 0.15, 0.43, sz * 0.14], 0.012, { r2: 0.016, seg: 8 });
    BAR('blackMetal', [-0.17, 0.24, -0.16], [0.17, 0.24, 0.16], 0.004, { seg: 5 }); BAR('blackMetal', [0.17, 0.24, -0.16], [-0.17, 0.24, 0.16], 0.004, { seg: 5 });
    colRect(-0.2, -0.2, 0.2, 0.2);
  });
}
function wineGlass(x, y, z, fill) {
  LA('glass', x, y, z, [[0.001, 0], [0.032, 0], [0.032, 0.004], [0.004, 0.008], [0.004, 0.09], [0.03, 0.12], [0.04, 0.16], [0.034, 0.2]], { seg: 14 });
  if (fill) CY('wine', x, y + 0.118, z, 0.036, 0.028, 0.03, { seg: 12 });
}
function books(x, y, z, ry, list) {
  place(x, y, z, ry, () => {
    let h = 0;
    for (const [m, w, d, t, r] of list) { B(m, 0, h, 0, w, t, d, { ry: r }); B('paper', 0, h + 0.003, 0, w - 0.012, t - 0.006, d + 0.002, { ry: r }); h += t; }
  });
}
const BOOKS = [['teal', 0.22, 0.29, 0.035, 0], ['charcoal', 0.2, 0.27, 0.03, 0.12], ['paper', 0.19, 0.25, 0.025, -0.1]];
// Double bed, head at local -x.
function doubleBed() {
  for (const [x, z] of [[-0.9, -0.88], [0.9, -0.88], [-0.9, 0.88], [0.9, 0.88]]) CY('darkWood', x, 0, z, 0.026, 0.02, 0.12, { seg: 8 });
  RB('beige', 0, 0.12, 0, 1.96, 0.22, 1.94, 0.03, { cell: 0.3 });
  RB('beige', -1.055, 0, 0, 0.15, 1.08, 1.98, 0.04, { cell: 0.3 });
  RB('linen', 0.01, 0.34, 0, 1.92, 0.2, 1.8, 0.06, { cell: 0.25 });
  RB('duvet', 0.255, 0.5, 0, 1.35, 0.09, 1.96, 0.04, { cell: 0.2 });
  for (const s of [-1, 1]) { RB('duvet', 0.255, 0.3, s * 0.99, 1.35, 0.27, 0.05, 0.022, { occ: false, cell: 0.2 }); RB('stripe', 0.65, 0.33, s * 1.016, 0.42, 0.27, 0.028, 0.012, { occ: false }); }
  RB('stripe', 0.65, 0.586, 0, 0.42, 0.028, 2.0, 0.012, { occ: false, cell: 0.2 });
  for (const s of [-1, 1]) {                                        // pillows leaning on the headboard, a cushion in front of each
    RB('linen', -0.82, 0.535, s * 0.45, 0.17, 0.44, 0.72, 0.075, { rz: 0.34, occ: false, k: 3 });
    RB('duvet', -0.585, 0.535, s * 0.43, 0.13, 0.31, 0.46, 0.06, { rz: 0.55, ry: s * 0.12, occ: false, k: 3 });
  }
  colRect(-1.13, -0.99, 0.98, 0.99);
}

// outdoor air-conditioning unit 0.8 x 0.3 x 0.56 on two feet. native: back to a north wall at (x, z), its fan facing south
piece('acUnit', { name: 'Air conditioner', add: 32 }, function (p) {
  pAt(p, () => {
    BX('blackMetal', -0.36, 0, 0.03, -0.3, 0.06, 0.29); BX('blackMetal', 0.3, 0, 0.03, 0.36, 0.06, 0.29);
    RB('doorWhite', 0, 0.06, 0.16, 0.8, 0.56, 0.28, 0.015);
    put('charcoal', new T.CircleGeometry(0.2, 28), xf(-0.11, 0.34, 0.301), { uv: 'keep' });
    for (const r of [0.08, 0.14, 0.2]) put('blackMetal', new T.RingGeometry(r - 0.008, r, 28), xf(-0.11, 0.34, 0.303), { uv: 'keep' });
    BX('charcoal', 0.2, 0.12, 0.29, 0.34, 0.56, 0.302);
    colRect(-0.42, 0, 0.42, 0.32);
  });
});

// native: the sitter faces south
piece('armchair', { name: 'Armchair', add: 5 }, function (p) {
  pAt(p, () => {
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) CY('darkWood', sx * 0.3, 0, sz * 0.3, 0.02, 0.016, 0.12, { seg: 8 });
    RB('sofa', 0, 0.12, 0, 0.78, 0.26, 0.76, 0.04, { cell: 0.3 });
    RB('sofa', 0, 0.38, -0.3, 0.78, 0.44, 0.16, 0.05, { cell: 0.3 });
    for (const s of [-1, 1]) RB('sofa', s * 0.33, 0.38, 0.06, 0.12, 0.2, 0.62, 0.04, { cell: 0.3 });
    RB('sofa', 0, 0.38, 0.06, 0.54, 0.1, 0.6, 0.04, { occ: false });
    RB('cushion', 0, 0.5, -0.17, 0.4, 0.34, 0.12, 0.05, { rx: -0.35, occ: false });
    colRect(-0.39, -0.38, 0.39, 0.38);
  });
});

// framed print on a wall: mat (art1..art3), y its centre, w, h; native: faces south
piece('art', { name: 'Picture', add: 29, values: { mat: 'art1', y: 1.5, w: 0.7, h: 0.5 } }, function (p) { art(p.mat, p.x, p.y, p.z, p.w, p.h, dg(p.r)); });

// built-in bath, rect with its long side along Z. mixer 'w'|'e': the tap wall; head 'n'|'s': the shower end;
piece('bath', { name: 'Bath' }, function (p) {
  //           rain (overhead shower on the head wall), screen (glass at the head end): true unless false; hole [w, d]
  if (p.along === 'x') {                                           // long side along X: build it along Z, turned a quarter
    const [a0, b0, a1, b1] = p.rect, cx = (a0 + a1) / 2, cz = (b0 + b1) / 2, hw = (a1 - a0) / 2, hd = (b1 - b0) / 2;
    const nc = COL.length, no = OCC.box.length;                    // turned frame: world (x, z) = (cx + lz, cz - lx)
    place(cx, 0, cz, Math.PI / 2, () => PIECES.bath({ ...p, along: undefined, rect: [-hd, -hw, hd, hw] }));
    for (let i = nc; i < COL.length; i++) {
      const c = COL[i]; if (c.k !== 0) continue;
      [c.x0, c.z0, c.x1, c.z1] = [cx + c.z0, cz - c.x1, cx + c.z1, cz - c.x0];
    }
    for (let i = no; i < OCC.box.length; i += 6) {
      const [x0, y0, z0, x1, y1, z1] = OCC.box.slice(i, i + 6);
      OCC.box.splice(i, 6, cx + z0, y0, cz - x1, cx + z1, y1, cz - x0);
    }
    return;
  }
  const [x0, z0, x1, z1] = p.rect, top = 0.58, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0, cer = albOf('ceramic');
  const hole = p.hole || [w - 0.26, d - 0.275], sx = p.mixer === 'e' ? -1 : 1, sz = p.head === 's' ? -1 : 1, N = { occ: false, cell: 0.3 };
  const X = (u) => (sx > 0 ? x0 + u : x1 - u), Z = (v) => (sz > 0 ? z0 + v : z1 - v);    // u out from the tap wall, v from the shower end
  rim('ceramic', cx, top, cz, w, d, hole[0], hole[1], 0.2);
  basin('ceramic', cx, top, cz, hole[0], hole[1], 0.44, 0.2);
  BXS('ceramic', X(w - 0.018), 0, z0, X(w), top - 0.001, z1, N);
  BXS('ceramic', X(0), 0, Z(d - 0.018), X(w - 0.018), top - 0.001, Z(d), N);
  occBox(x1 - 0.13, 0, z0, x1, top, z1, cer); occBox(x0, 0, z0, x0 + 0.13, top, z1, cer);
  occBox(x0, 0, z1 - 0.137, x1, top, z1, cer); occBox(x0, 0, z0, x1, top, z0 + 0.137, cer); occBox(x0, 0, z0, x1, 0.14, z1, cer);
  COL.push({ k: 0, x0, z0, x1, z1 });
  CY('chrome', cx, top - 0.438, Z(d / 2 + 0.55), 0.028, 0.028, 0.004, { seg: 14 });
  const m = d / 2;                                                // wall mixer halfway along, with hose and hand shower
  BXS('chrome', X(0), 0.74, Z(m - 0.09), X(0.045), 0.795, Z(m + 0.09));
  TU('chrome', [[X(0.03), 0.765, Z(m)], [X(0.13), 0.765, Z(m)], [X(0.17), 0.735, Z(m)]], 0.013, { seg: 8 });
  CY('chrome', X(0.022), 0.8, Z(m - 0.06), 0.014, 0.014, 0.03, { seg: 10 }); CY('chrome', X(0.022), 0.8, Z(m + 0.06), 0.014, 0.014, 0.03, { seg: 10 });
  TU('chrome', [[X(0.03), 0.75, Z(m + 0.08)], [X(0.09), 0.66, Z(m + 0.16)], [X(0.06), 0.72, Z(m + 0.3)], [X(0.022), 0.96, Z(m + 0.36)], [X(0.022), 1.12, Z(m + 0.36)]], 0.007, { seg: 6, n: 30 });
  CY('chrome', X(0.022), 1.1, Z(m + 0.36), 0.013, 0.013, 0.16, { seg: 8, rx: 0.5 * sz });
  CY('chrome', X(0.035), 1.245, Z(m + 0.41), 0.04, 0.04, 0.014, { seg: 14, rz: -1.1 * sx });
  if (p.rain !== false) {
    BAR('chrome', [cx, 1.0, Z(0.012)], [cx, 2.12, Z(0.012)], 0.011, { seg: 8 });
    TU('chrome', [[cx, 2.1, Z(0.012)], [cx, 2.16, Z(0.055)], [cx, 2.16, Z(0.315)]], 0.011, { seg: 8 });
    CY('chrome', cx, 2.125, Z(0.315), 0.115, 0.115, 0.012, { seg: 24 });
  }
  if (p.screen !== false) { BXS('glass', X(w - 0.016), top, Z(0.015), X(w - 0.008), 2.0, Z(0.855)); BXS('chrome', X(w - 0.022), top, Z(0), X(w - 0.002), 2.0, Z(0.017)); }
  CY('teal', X(0.18), top, Z(0.085), 0.032, 0.032, 0.17, { seg: 12 }); CY('paper', X(0.26), top, Z(0.075), 0.028, 0.028, 0.14, { seg: 12 }); CY('ochre', X(0.33), top, Z(0.09), 0.026, 0.03, 0.11, { seg: 12 });
});

// double bed 2.1 x 1.98. native: head to the west
piece('bed', { name: 'Double bed', add: 15 }, function (p) { pAt(p, doubleBed); });

// grey bench 1.16 long with a clock, cushion, basket and shoes. native: back to a south wall at (x, z), facing north
piece('bench', { name: 'Hall bench', add: 20 }, function (p) {
  pAt(p, () => pFrom(1.99, 9.42, () => {
    BX('greyWood', 1.41, 0.4, 9.05, 2.57, 0.45, 9.42, { cell: 0.25 });
    BX('greyWood', 1.45, 0, 9.08, 1.5, 0.4, 9.4, { occ: false }); BX('greyWood', 2.48, 0, 9.08, 2.53, 0.4, 9.4, { occ: false });
    BX('greyWood', 1.5, 0.12, 9.1, 2.48, 0.15, 9.38, { occ: false });
    colRect(1.41, 9.05, 2.57, 9.42);
    place(2.37, 0.45, 9.3, 0.25, () => {
      CY('teal', 0, 0.045, 0, 0.075, 0.075, 0.06, { rx: PI / 2, seg: 24 });
      CY('paper', 0, 0.0735, -0.031, 0.062, 0.062, 0.003, { rx: PI / 2, seg: 24 });
      B('charcoal', 0.012, 0.074, -0.034, 0.03, 0.005, 0.002, { rz: 0.5 }); B('charcoal', 0, 0.075, -0.034, 0.005, 0.045, 0.002);
    });
    RB('beige', 1.72, 0.45, 9.24, 0.4, 0.06, 0.28, 0.02, { occ: false }); RB('cushion', 1.72, 0.51, 9.24, 0.38, 0.05, 0.26, 0.02, { occ: false });
    LA('wicker', 1.95, 0.15, 9.24, [[0.001, 0], [0.13, 0], [0.16, 0.2], [0.15, 0.2], [0.125, 0.01], [0.001, 0.01]], { seg: 20, uv: 'box' });
    for (const [x, z, r] of [[1.78, 8.83, 0.2], [1.92, 8.86, -0.15]]) { RB('shoe', x, 0, z, 0.1, 0.07, 0.27, 0.03, { ry: r, occ: false }); RB('rubber', x, 0, z, 0.104, 0.02, 0.274, 0.008, { ry: r, occ: false }); }
  }));
});

// round table 0.6 across with a cup
piece('bistroTable', { name: 'Bistro table', add: 13 }, function (p) {
  pAt(p, () => {
    CY('plastic', 0, 0.7, 0, 0.3, 0.3, 0.025, { seg: 32 });
    CY('blackMetal', 0, 0.02, 0, 0.025, 0.025, 0.68, { seg: 10 }); CY('blackMetal', 0, 0, 0, 0.2, 0.22, 0.02, { seg: 24 });
    LA('ceramic', 0.08, 0.725, 0.05, [[0.001, 0], [0.04, 0], [0.045, 0.09], [0.04, 0.09], [0.035, 0.008], [0.001, 0.008]], { seg: 14 });
    colCircle(0, 0, 0.3);
  });
});

// solid low block (a balcony pier, say): rect, h (1.05), mat (facade)
piece('block', { name: 'Block' }, function (p) {
  const [x0, z0, x1, z1] = p.rect;
  BX(p.mat || 'facade', x0, 0, z0, x1, p.h || 1.05, z1, { cell: 0.25 });
  COL.push({ k: 0, x0, z0, x1, z1 });
});

// plain box: mat, b [x0, y0, z0, x1, y1, z1], occ, col (true: walk collider)
piece('box', { name: 'Box' }, function (p) {
  const b = p.b;
  BX(p.mat, b[0], b[1], b[2], b[3], b[4], b[5], { occ: p.occ, cell: p.cell });
  if (p.col) COL.push({ k: 0, x0: b[0], z0: b[2], x1: b[3], z1: b[5] });
});

// flush dish of radius s
piece('ceilingLamp', {}, function (p) { ceilingLamp(p.x, p.z, p.s || 0.16, p.I || 1, colOf(p.col), p.ch || 1); });

// sliding-door wardrobe filling a recess: rect, face 'w'|'e'|'n'|'s' (the side its doors are on)
piece('closet', { name: 'Built-in wardrobe' }, function (p) {
  const [x0, z0, x1, z1] = p.rect, f = p.face || 'w', L = f === 'w' || f === 'e' ? z1 - z0 : x1 - x0, N = { occ: false, cell: 0.35 }, h = L / 2;
  const fb = (mat, u0, u1, y0, y1, t0, t1, o) => {               // u along the doors from the north or west end, t in from the front
    if (f === 'w') BX(mat, x0 + t0, y0, z0 + u0, x0 + t1, y1, z0 + u1, o);
    else if (f === 'e') BX(mat, x1 - t1, y0, z0 + u0, x1 - t0, y1, z0 + u1, o);
    else if (f === 'n') BX(mat, x0 + u0, y0, z0 + t0, x0 + u1, y1, z0 + t1, o);
    else BX(mat, x0 + u0, y0, z1 - t1, x0 + u1, y1, z1 - t0, o);
  };
  fb('walnut', 0, h + 0.01, 0.04, H - 0.04, 0.01, 0.04, N); fb('walnut', h - 0.01, L, 0.04, H - 0.04, 0.04, 0.07, N);
  fb('alu', 0, L, 0, 0.04, 0, 0.08, { occ: false }); fb('alu', 0, L, H - 0.04, H, 0, 0.08, { occ: false });
  fb('blackMetal', h - 0.075, h - 0.057, 0.9, 1.3, 0.002, 0.01, { occ: false }); fb('blackMetal', h + 0.06, h + 0.078, 0.9, 1.3, 0.032, 0.04, { occ: false });
  occBox(x0, 0, z0, x1, H, z1, albOf('walnut'));
  into(CAPS, () => quadGrid('capWood', x0, H + 0.001, z0, [0, 0, 1], [1, 0, 0], [0, z1 - z0], [0, x1 - x0], (x, y, z) => [x * 2, z]));
  COL.push({ k: 0, x0, z0, x1, z1 });
});

// shoe bench 0.95 long with coat hooks above. native: on a west wall at (x, z), facing east
piece('coatBench', { name: 'Coat bench', add: 21 }, function (p) {
  pAt(p, () => {
    BX('greyWood', 0, 0.42, -0.475, 0.36, 0.46, 0.475, { cell: 0.25 });
    BX('greyWood', 0.03, 0, -0.445, 0.33, 0.42, -0.405, { occ: false }); BX('greyWood', 0.03, 0, 0.405, 0.33, 0.42, 0.445, { occ: false });
    BX('greyWood', 0.03, 0.12, -0.405, 0.33, 0.15, 0.405, { occ: false });
    colRect(0, -0.475, 0.36, 0.475);
    BX('oak', 0, 1.7, -0.425, 0.02, 1.78, 0.425, { occ: false });
    for (const z of [-0.325, -0.075, 0.175]) BAR('blackMetal', [0.02, 1.74, z], [0.09, 1.77, z], 0.007, { seg: 6 });
    RB('beige', 0.065, 1.05, -0.075, 0.07, 0.62, 0.36, 0.03, { occ: false });
    for (const [x, z, r] of [[0.14, -0.225, 0.1], [0.24, -0.155, -0.1]]) { RB('shoe', x, 0.15, z, 0.27, 0.07, 0.1, 0.03, { ry: r, occ: false }); RB('rubber', x, 0.15, z, 0.274, 0.02, 0.104, 0.008, { ry: r, occ: false }); }
    RB('cushion', 0.18, 0.46, 0.225, 0.3, 0.05, 0.38, 0.02, { occ: false });
  });
});

// round, dark wood, 0.82 across
piece('coffeeTable', { name: 'Coffee table', add: 6 }, function (p) {
  pAt(p, () => {
    CY('darkWood', 0, 0.37, 0, 0.41, 0.41, 0.035, { seg: 44, occ: false });
    occLocal(xf(0, 0.3875, 0), 0.56, 0.035, 0.56, albOf('darkWood'));
    for (let i = 0; i < 3; i++) { const a = i * TAU / 3 + 0.5; BAR('blackMetal', [Math.cos(a) * 0.34, 0, Math.sin(a) * 0.34], [Math.cos(a) * 0.2, 0.37, Math.sin(a) * 0.2], 0.012, { seg: 8 }); }
    CY('blackMetal', 0, 0.17, 0, 0.27, 0.27, 0.008, { seg: 30 });
    B('plastic', -0.04, 0.405, -0.03, 0.25, 0.008, 0.18, { ry: 0.55 }); B('screen', -0.04, 0.4131, -0.03, 0.23, 0.001, 0.16, { ry: 0.55 });
    CY('yellow', 0.16, 0.405, 0.1, 0.034, 0.034, 0.07, { seg: 12 });
    LA('ceramic', 0.02, 0.405, 0.2, [[0.001, 0], [0.03, 0], [0.04, 0.07], [0.035, 0.07], [0.027, 0.008], [0.001, 0.008]], { seg: 12 });
    colCircle(0, 0, 0.41);
  });
});

// corner sofa 2.78 long with a chaise at its east end. native: the sitter faces south
piece('cornerSofa', { name: 'Corner sofa', add: 2 }, function (p) {
  pAt(p, () => {
    for (const [x, z] of [[-1.26, -0.45], [1.26, -0.45], [-1.26, 0.45], [1.26, 1.25]]) CY('blackMetal', x, 0, z, 0.022, 0.018, 0.08, { seg: 8 });
    RB('sofa', 0, 0.08, 0, 2.78, 0.3, 1.11, 0.04, { cell: 0.3 });
    RB('sofa', 0.98, 0.08, 0.95, 0.82, 0.3, 0.8, 0.04, { cell: 0.3 });
    RB('sofa', 0, 0.38, -0.43, 2.78, 0.42, 0.25, 0.06, { cell: 0.3 });
    RB('sofa', -1.26, 0.38, 0.07, 0.26, 0.24, 0.97, 0.06, { cell: 0.3 });
    RB('sofa', 1.26, 0.38, 0.47, 0.26, 0.24, 1.77, 0.06, { cell: 0.3 });
    for (const x of [-0.85, -0.18]) { RB('sofa', x, 0.38, 0.12, 0.655, 0.14, 0.8, 0.05, { cell: 0.25 }); RB('sofa', x, 0.5, -0.25, 0.64, 0.36, 0.16, 0.07, { rx: -0.16, occ: false }); }
    RB('sofa', 0.73, 0.38, 0.52, 0.71, 0.14, 1.6, 0.05, { cell: 0.25 }); RB('sofa', 0.73, 0.5, -0.25, 0.7, 0.36, 0.16, 0.07, { rx: -0.16, occ: false });
    RB('cushion', 0.3, 0.55, -0.12, 0.42, 0.4, 0.13, 0.06, { rx: -0.42, ry: 0.15, occ: false });
    RB('cushion', 0.95, 0.55, -0.1, 0.44, 0.4, 0.13, 0.06, { rx: -0.42, ry: -0.2, occ: false });
    RB('cushion', -0.98, 0.55, -0.1, 0.48, 0.4, 0.14, 0.06, { rx: -0.5, ry: -0.3, occ: false });
    RB('beige', 0.73, 0.525, 0.9, 0.6, 0.022, 0.9, 0.01, { occ: false, cell: 0.2 });
    B('paper', -0.4, 0.522, 0.2, 0.2, 0.006, 0.27, { ry: 0.3, rz: 0.03 }); B('paper', -0.21, 0.522, 0.26, 0.2, 0.006, 0.27, { ry: 0.3, rz: -0.03 });
    colRect(-1.39, -0.555, 1.39, 0.555); colRect(0.57, 0.5, 1.39, 1.35);
  });
});

// a straight run of base units with a slate top: rect (worktop, back to front), face 'n'|'s'|'e'|'w' (where the fronts look),
piece('counter', { name: 'Kitchen units' }, function (p) {
  //             sink, hob: distances along the run from its west or north end; sinkW (0.6); oven under the hob unless false;
  //             hood over the hob unless false; fronts [from, to] along the run; splash unless false
  const [x0, z0, x1, z1] = p.rect, f = p.face || 's', alongX = f === 's' || f === 'n', L = alongX ? x1 - x0 : z1 - z0, D = alongX ? z1 - z0 : x1 - x0;
  const top = 0.9, w0 = 0.87, N = { occ: false };
  const wx = (u, t) => (alongX ? x0 + u : f === 'e' ? x0 + t : x1 - t), wz = (u, t) => (!alongX ? z0 + u : f === 's' ? z0 + t : z1 - t);
  const cb = (mat, u0, u1, y0, y1, t0, t1, o) => BXS(mat, wx(u0, t0), y0, wz(u0, t0), wx(u1, t1), y1, wz(u1, t1), o);
  const pt = (u, t) => [wx(u, t), wz(u, t)];
  cb('cabinet', 0, L, 0.1, w0, 0, D - 0.04);
  cb('plinth', 0, L, 0, 0.1, 0.05, D - 0.09, N);
  const hob = p.hob, oven = hob !== undefined && p.oven !== false;
  const [fa, fz] = p.fronts || [0, L], parts = oven ? [[fa, Math.max(fa, hob - 0.29)], [Math.min(fz, hob + 0.29), fz]] : [[fa, fz]];
  for (const [s, e] of parts) {                                   // doors of at most 0.6 m with bar handles
    if (e - s < 0.1) continue;
    const n = Math.ceil((e - s) / 0.6 - 1e-6), w = (e - s) / n;
    for (let i = 0; i < n; i++) {
      const a = s + i * w + 0.002, b = s + (i + 1) * w - 0.002, m = (a + b) / 2;
      cb('cabinet', a, b, 0.105, w0 - 0.005, D - 0.04, D - 0.022, { occ: false, cell: 0.3 });
      cb('steel', m - 0.12, m + 0.12, w0 - 0.06, w0 - 0.048, D - 0.022, D - 0.002, N);
    }
  }
  if (oven) {
    cb('plastic', hob - 0.29, hob + 0.29, 0.105, w0 - 0.005, D - 0.04, D - 0.018, N);
    cb('screen', hob - 0.25, hob + 0.25, 0.33, 0.76, D - 0.018, D - 0.014);
    cb('steel', hob - 0.25, hob + 0.25, 0.79, 0.804, D - 0.004, D + 0.01, N);
    for (const k of [-0.15, 0.15]) { const [x, z] = pt(hob + k, D - 0.012); CY('steel', x, 0.832, z, 0.014, 0.014, 0.012, alongX ? { seg: 10, rx: PI / 2 } : { seg: 10, rz: PI / 2 }); }
  }
  if (p.sink !== undefined) {                                     // worktop with the sink let into it
    const su = p.sink, sw = p.sinkW || 0.6, [sx, sz] = pt(su, D / 2), [tx, tz] = pt(su, 0.07);
    if (su - sw / 2 > 0.005) cb('stone', 0, su - sw / 2, w0, top, 0, D, { cell: 0.2 });
    if (L - su - sw / 2 > 0.005) cb('stone', su + sw / 2, L, w0, top, 0, D, { cell: 0.2 });
    const hw = alongX ? 0.44 : 0.4, hd = alongX ? 0.4 : 0.44;
    rim('stone', sx, top, sz, alongX ? sw : D, alongX ? D : sw, hw, hd, 0.04);
    basin('steel', sx, top, sz, hw, hd, 0.17, 0.04, { free: true });
    rim('steel', sx, top + 0.001, sz, hw + 0.028, hd + 0.028, hw, hd, 0.04);
    CY('chrome', sx, top - 0.169, sz, 0.03, 0.03, 0.004, { seg: 12, free: true });
    CY('chrome', tx, top, tz, 0.024, 0.027, 0.04, { seg: 12 });                                    // mixer tap
    const sp = (t, y) => { const [x, z] = pt(su, t); return [x, y, z]; };
    TU('chrome', [sp(0.07, top + 0.03), sp(0.07, 1.2), sp(0.13, 1.28), sp(0.23, 1.26), sp(0.25, 1.2)], 0.012, { seg: 8, n: 26 });
    const [lx, lz] = pt(su + 0.05, 0.07);
    B('chrome', lx, top + 0.03, lz, 0.08, 0.012, 0.016, { ry: alongX ? 0.4 : 0.4 + PI / 2 });
  } else cb('stone', 0, L, w0, top, 0, D, { cell: 0.2 });
  if (p.splash !== false) cb('splash', 0, L, top, 1.5, 0, 0.006, { occ: false, cell: 0.25 });
  if (hob !== undefined) {                                        // hob with pan supports, and the hood above it
    const [hx, hz] = pt(hob, D / 2);
    cb('plastic', hob - 0.2725, hob + 0.2725, top, top + 0.006, D / 2 - 0.23, D / 2 + 0.23, N);
    put('hob', new T.PlaneGeometry(0.46, 0.545, 3, 3), xf(hx, top + 0.0068, hz, alongX ? PI / 2 : 0, -PI / 2), { uv: 'keep' });
    for (const [u, v] of [[78, 70], [182, 74], [76, 186], [182, 186]]) {
      const a = (u / 256 - 0.5) * 0.46, b = (v / 256 - 0.5) * 0.545, x = hx + (alongX ? b : a), z = hz + (alongX ? -a : b);
      CY('plastic', x, top + 0.007, z, 0.03, 0.036, 0.012, { seg: 12 });
      BAR('blackMetal', [x - 0.075, top + 0.026, z], [x + 0.075, top + 0.026, z], 0.004, { seg: 4 }); BAR('blackMetal', [x, top + 0.026, z - 0.075], [x, top + 0.026, z + 0.075], 0.004, { seg: 4 });
    }
    if (p.hood !== false) into(CEIL, () => { cb('steel', hob - 0.3, hob + 0.3, 1.62, 1.68, 0, 0.53); cb('steel', hob - 0.1, hob + 0.1, 1.68, H, 0, 0.23, { cell: 0.4 }); });
  }
  COL.push({ k: 0, x0, z0, x1, z1 });
});

// oval wicker crib 1.25 x 0.78, long side along X
piece('crib', { name: 'Crib', add: 17 }, function (p) {
  pAt(p, () => {
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) BAR('oak', [sx * 0.5, 0, sz * 0.3], [sx * 0.36, 0.5, sz * 0.2], 0.014, { r2: 0.018, seg: 8 });
    BAR('oak', [-0.43, 0.24, -0.25], [-0.43, 0.24, 0.25], 0.012, { seg: 6 }); BAR('oak', [0.43, 0.24, -0.25], [0.43, 0.24, 0.25], 0.012, { seg: 6 });
    LA('wickerWhite', 0, 0.45, 0, [[0.001, 0], [0.5, 0], [0.6, 0.3], [0.625, 0.325], [0.585, 0.325], [0.5, 0.06], [0.001, 0.05]], { seg: 40, sz: 0.62 });
    CY('linen', 0, 0.5, 0, 0.5, 0.5, 0.06, { seg: 30, sz: 0.62 });
    RB('beige', 0.12, 0.555, 0, 0.5, 0.03, 0.46, 0.012, { occ: false });
    SP('linen', -0.34, 0.6, 0, 1, { sx: 0.1, sy: 0.04, sz: 0.16, seg: 12, hseg: 8 });
    occLocal(xf(0, 0.475, 0), 0.7, 0.05, 0.43, albOf('wickerWhite'));
    colRect(-0.62, -0.39, 0.62, 0.39);
  });
});

// runs along X only
piece('curtain', { name: 'Curtain' }, function (p) { curtain(p.x0, p.x1, p.z, p.y0 === undefined ? 0.02 : p.y0, p.y1 === undefined ? 2.66 : p.y1); });

piece('curtainTrack', { name: 'Curtain track' }, function (p) { into(CEIL, () => BX('trim', p.x0, 2.66, p.z - 0.03, p.x1, H, p.z + 0.03)); });

// oak table w x d (1.48 x 0.745) laid for a meal, two chairs on each long side; ends 'w', 'e', 'we' or '': chairs at the ends
piece('diningSet', { name: 'Dining table', add: 12, values: { w: 1.48, d: 0.745, ends: '' } }, function (p) {
  //                (with a plate each unless endPlates is false). native: long side along X
  const w = p.w || 1.48, d = p.d || 0.745, ty = 0.75, hw = w / 2, hd = d / 2, ends = p.ends === undefined ? 'w' : p.ends;
  pAt(p, () => {
    RB('oakStave', 0, ty - 0.04, 0, w, 0.04, d, 0.008, { cell: 0.2 });
    for (const x of [-hw + 0.21, hw - 0.21]) {
      BAR('blackMetal', [x, 0, -hd + 0.08], [x, ty - 0.04, -hd + 0.17], 0.016, { seg: 8 }); BAR('blackMetal', [x, 0, hd - 0.08], [x, ty - 0.04, hd - 0.17], 0.016, { seg: 8 });
      BX('blackMetal', x - 0.016, ty - 0.07, -hd + 0.15, x + 0.016, ty - 0.04, hd - 0.15, { occ: false });
    }
    colRect(-hw, -hd, hw, hd);
    BX('linen', -0.25, ty, -hd - 0.042, -0.01, ty + 0.003, hd + 0.042, { occ: false, cell: 0.2 });   // runner
    BX('linen', -0.25, ty - 0.14, -hd - 0.045, -0.01, ty + 0.003, -hd - 0.042, { occ: false }); BX('linen', -0.25, ty - 0.14, hd + 0.042, -0.01, ty + 0.003, hd + 0.045, { occ: false });
    const plates = [[-hw + 0.29, -0.2], [hw - 0.27, -0.2], [-hw + 0.29, 0.2], [hw - 0.27, 0.2]];
    if (p.endPlates !== false) { if (ends.includes('w')) plates.push([-hw + 0.13, 0]); if (ends.includes('e')) plates.push([hw - 0.13, 0]); }
    for (const [x, z] of plates) LA('ceramic', x, ty, z, [[0.001, 0], [0.07, 0], [0.125, 0.016], [0.118, 0.016], [0.07, 0.006], [0.001, 0.006]], { seg: 20 });
    place(-0.15, ty + 0.003, 0, 0, () => {                         // jug of yellow flowers
      LA('teal', 0, 0, 0, [[0.001, 0], [0.045, 0], [0.066, 0.07], [0.05, 0.15], [0.03, 0.19], [0.036, 0.2]], { seg: 16 });
      const R = rng(19);
      for (let i = 0; i < 9; i++) {
        const a = R() * TAU, r = 0.03 + R() * 0.09, h = 0.3 + R() * 0.12, x = Math.cos(a) * r, z = Math.sin(a) * r;
        BAR('leafA', [0, 0.18, 0], [x, h, z], 0.0025, { seg: 4 });
        SP('yellow', x, h, z, 0.024, { seg: 8, hseg: 6, sy: 0.7 });
      }
    });
    LA('bottle', 0.05, ty, -0.09, [[0.001, 0], [0.037, 0], [0.037, 0.19], [0.014, 0.25], [0.014, 0.31], [0.001, 0.31]], { seg: 14 });
    wineGlass(0.17, ty, -0.05, true); wineGlass(0.21, ty, 0.11, true); wineGlass(0.32, ty, 0.06, false);
    diningChair(-0.17 * w, -hd - 0.16, 0.06); diningChair(0.27 * w, -hd - 0.17, -0.05);
    diningChair(-0.21 * w, hd + 0.195, PI + 0.08); diningChair(0.32 * w, hd + 0.185, PI - 0.04);
    if (ends.includes('w')) diningChair(-hw - 0.29, -0.0175, PI / 2 + 0.05);
    if (ends.includes('e')) diningChair(hw + 0.29, 0.02, -PI / 2 - 0.04);
  });
});

// recessed spot: I, col, ch
piece('downlight', {}, function (p) { downlight(p.x, p.z, p.I || 0.75, colOf(p.col), p.ch || 2); });

// native: on a west wall at (x, z), facing east
piece('entryPhone', { name: 'Entry phone' }, function (p) {
  pAt(p, () => { BX('switch', 0, 1.36, -0.05, 0.022, 1.56, 0.05, { occ: false }); BX('plastic', 0.022, 1.44, -0.03, 0.024, 1.54, 0.03, { occ: false }); });
});

// drum shade on a stem, lit day and evening
piece('floorLamp', { name: 'Floor lamp', add: 9 }, function (p) {
  pAt(p, () => {
    CY('blackMetal', 0, 0, 0, 0.15, 0.16, 0.02, { seg: 24 }); BAR('blackMetal', [0, 0.02, 0], [0, 1.36, 0], 0.011, { seg: 8 });
    CY('lampOn', 0, 1.3, 0, 0.15, 0.19, 0.27, { seg: 28, open: true, occ: false }); CY('lampOn', 0, 1.3, 0, 0.19, 0.19, 0.002, { seg: 28, occ: false });
    colCircle(0, 0, 0.16);
    pLamp(0, 1.42, 0, 0.85, WARM, 1, { glow: 0.9 });
  });
});

// fridge-freezer w x d x h (0.66 x 0.6 x 1.9). native: back to a north wall at (x, z), facing south
piece('fridge', { name: 'Fridge', add: 25 }, function (p) {
  const w = p.w || 0.66, d = p.d || 0.6, h = p.h || 1.9, hw = w / 2, N = { occ: false };
  pAt(p, () => {
    BX('fridge', -hw, 0.02, 0.02, hw, h, 0.02 + d, { cell: 0.4 });
    BX('fridge', -hw + 0.004, 0.72, 0.02 + d, hw - 0.004, h - 0.004, 0.042 + d, { occ: false, cell: 0.4 }); BX('fridge', -hw + 0.004, 0.03, 0.02 + d, hw - 0.004, 0.705, 0.042 + d, N);
    BX('steel', -hw + 0.04, 0.95, 0.042 + d, -hw + 0.062, 1.6, 0.07 + d, N); BX('steel', -hw + 0.04, 0.3, 0.042 + d, -hw + 0.062, 0.62, 0.07 + d, N);
    BX('plinth', -hw + 0.02, 0, 0.07, hw - 0.02, 0.02, d, N);
    colRect(-hw - 0.01, 0, hw + 0.01, d + 0.07);
  });
});

// y: the worktop
piece('fruitBowl', { name: 'Fruit bowl' }, function (p) {
  place(p.x, p.y || 0.9, p.z, 0, () => {
    LA('ochre', 0, 0, 0, [[0.001, 0], [0.07, 0], [0.15, 0.07], [0.142, 0.07], [0.066, 0.01], [0.001, 0.01]], { seg: 20 });
    for (const [x, z, m] of [[0.04, 0.02, 'yellow'], [-0.05, 0.03, 'yellow'], [0, -0.055, 'yellow'], [0.01, 0.01, 'leafC'], [-0.03, -0.02, 'yellow']]) SP(m, x, 0.045 + (m === 'leafC' ? 0.045 : 0), z, 0.034, { sy: 0.9 });
  });
});

// four storage jars in a row southwards from (x, z), on the worktop
piece('jars', { name: 'Jars' }, function (p) {
  pAt(p, () => { for (let i = 0; i < 4; i++) { const z = i * 0.13, m = i % 2 ? 'teal' : 'ceramic', h = 0.12 + (i % 2) * 0.03; CY(m, 0, 0.9, z, 0.048, 0.044, h, { seg: 14 }); CY('oak', 0, 0.9 + h, z, 0.05, 0.05, 0.016, { seg: 14 }); } });
});

// oak wall shelf of length w (0.8) with storage jars, bowls and a small plant. native: on a north wall, facing south
piece('kitchenShelf', { name: 'Kitchen shelf' }, function (p) {
  const w = p.w || 0.8, a = -0.375 * w, b = -0.2 * w, c = 0.1 * w, d = 0.375 * w;
  pAt(p, () => {
    BX('oak', -w / 2, 1.58, 0.006, w / 2, 1.61, 0.2, { cell: 0.2 });
    CY('ceramic', a, 1.61, 0.1, 0.05, 0.045, 0.13, { seg: 14 }); CY('oak', a, 1.74, 0.1, 0.052, 0.052, 0.018, { seg: 14 });
    CY('teal', b, 1.61, 0.1, 0.045, 0.04, 0.1, { seg: 14 }); CY('oak', b, 1.71, 0.1, 0.047, 0.047, 0.016, { seg: 14 });
    for (let i = 0; i < 3; i++) LA('ceramic', c, 1.61 + i * 0.022, 0.1, [[0.001, 0], [0.04, 0], [0.075, 0.045], [0.07, 0.045], [0.038, 0.008], [0.001, 0.008]], { seg: 14 });
    plantSpiky(d, 0.1, { seed: 31, n: 16, len: 0.2, wid: 0.018, potR: 0.045, potH: 0.08, mats: ['leafA', 'leafB'], y: 1.61 });
  });
});

// oak cabinet 0.9 high: rect; books and a bowl on top
piece('lowShelf', { name: 'Low cabinet', add: 19, values: { w: 1.2, d: 0.4 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, alongZ = z1 - z0 >= x1 - x0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  BX('oak', x0, 0, z0, x1, 0.9, z1, { cell: 0.25 });
  COL.push({ k: 0, x0, z0, x1, z1 });
  books(alongZ ? cx : x0 + 0.23, 0.9, alongZ ? z0 + 0.23 : cz, 0.3, BOOKS);
  LA('ochre', alongZ ? cx : x1 - 0.3, 0.9, alongZ ? z1 - 0.3 : cz, [[0.001, 0], [0.035, 0], [0.06, 0.04], [0.054, 0.04], [0.032, 0.007], [0.001, 0.007]], { seg: 14 });
});

// low oak console 1.7 long with a television, books and a vase. native: back to a west wall at (x, z), facing east
piece('media', { name: 'TV console', add: 8 }, function (p) {
  pAt(p, () => pFrom(3.46, 5.81, () => {
    BX('blackMetal', 3.53, 0, 5.02, 3.81, 0.1, 6.6, { occ: false });
    RB('oak', 3.67, 0.1, 5.81, 0.34, 0.36, 1.7, 0.008, { cell: 0.25 });
    for (const z of [5.385, 5.81, 6.235]) BX('plinth', 3.838, 0.12, z - 0.002, 3.8415, 0.44, z + 0.002, { occ: false });
    colRect(3.46, 4.96, 3.84, 6.66);
    BX('plastic', 3.6, 0.46, 5.7, 3.74, 0.474, 5.96, { occ: false }); BX('plastic', 3.655, 0.474, 5.8, 3.675, 0.57, 5.86, { occ: false });
    BX('plastic', 3.648, 0.55, 5.215, 3.682, 1.26, 6.445, { cell: 0.3 });
    BX('screen', 3.682, 0.562, 5.227, 3.685, 1.248, 6.433);
    books(3.67, 0.46, 6.37, 0.2, BOOKS);
    LA('pot', 3.66, 0.46, 5.09, [[0.001, 0], [0.05, 0], [0.075, 0.1], [0.05, 0.22], [0.028, 0.27], [0.034, 0.29]], { seg: 16 });
    const R = rng(13);
    for (let i = 0; i < 5; i++) BAR('stem', [3.66, 0.74, 5.09], [3.66 + (R() - 0.3) * 0.2, 1.05 + R() * 0.25, 5.09 + (R() - 0.5) * 0.3], 0.003, { seg: 4 });
    LA('ochre', 3.7, 0.46, 6.58, [[0.001, 0], [0.035, 0], [0.06, 0.04], [0.054, 0.04], [0.032, 0.007], [0.001, 0.007]], { seg: 14 });
  }));
});

// floating shelf under a round mirror, with a vase of twigs and a bowl. native: on a west wall, facing east. zone
piece('mirrorShelf', { name: 'Mirror and shelf' }, function (p) {
  pAt(p, () => {
    BX('oak', 0, 0.905, -0.4, 0.18, 0.945, 0.4, { cell: 0.25 });
    colRect(0, -0.4, 0.12, 0.4);
    CY('blackMetal', 0, 1.494, 0, 0.3, 0.3, 0.012, { seg: 40, rz: PI / 2 });
    pMirror({ kind: 'disc', r: 0.285, p: [0.0075, 1.5, 0], n: [1, 0, 0] }, p.zone);
    LA('potWhite', 0.09, 0.945, -0.25, [[0.001, 0], [0.04, 0], [0.06, 0.08], [0.035, 0.17], [0.03, 0.2]], { seg: 14 });
    const R = rng(7);
    for (let i = 0; i < 6; i++) BAR('stem', [0.09, 1.13, -0.25], [0.09 + (R() - 0.3) * 0.16, 1.42 + R() * 0.16, -0.25 + (R() - 0.5) * 0.24], 0.003, { seg: 4 });
    LA('ochre', 0.09, 0.945, 0.21, [[0.001, 0], [0.07, 0], [0.085, 0.02], [0.078, 0.02], [0.066, 0.006], [0.001, 0.006]], { seg: 16 });
  });
});

// Modular three-seat sofa with a loose ottoman, 2.81 wide, 0.82 deep (1.43 with the ottoman), 0.85 high
// (gorgia.ge MLM-110293, BM-00227947): slim track arms, a box cushion under each flanged pillow-top seat, three big
// flanged back pillows leaning on a low frame, two throw pillows, near-black block legs. native: the sitter faces south.
// Values: `mat` the fabric (default chenille), `legs` (default ebony), `ottoman` 1 in front of the east seat
// (default), -1 the west seat, 0 none; `pillows` 0 leaves the two throw pillows out.
piece('modularSofa', { name: 'Modular sofa', add: 4 }, function (p) {
  const F = p.mat || 'chenille', L = p.legs || 'ebony', side = p.ottoman === undefined ? 1 : p.ottoman;
  const W = 2.81, D = 0.82, ARM = 0.15, ARMH = 0.62, LEG = 0.11, BASE = 0.30, BOX = 0.375;
  const SW = (W - 2 * ARM) / 3, z0 = -D / 2, z1 = D / 2, OD = 0.6;
  const legs = (xa, xb, za, zb) => { for (const x of [xa + 0.06, xb - 0.06]) for (const z of [za + 0.06, zb - 0.06]) B(L, x, 0, z, 0.055, LEG + 0.01, 0.055); };
  // one seat: frame, box cushion with a sewn welt, pillow top whose flange laps over the front
  const seat = (cx, za, zb, seed) => {
    RB(F, cx, LEG, (za + zb) / 2, SW - 0.008, BASE - LEG, zb - za, 0.03, { cell: 0.2 });
    RB(F, cx, BASE, (za + 0.12 + zb) / 2, SW - 0.012, BOX - BASE, zb - za - 0.12, 0.03, { cell: 0.2 });
    RB(F, cx, BOX - 0.006, (za + 0.12 + zb) / 2, SW - 0.004, 0.009, zb - za - 0.112, 0.004, { occ: false });
    PIL(F, cx, BOX + 0.035, (za + 0.1 + zb) / 2 - 0.005, SW - 0.045, 0.125, zb - za - 0.15, { lower: 0.32, flange: 0.024, seed, lump: 0.035 });
  };
  pAt(p, () => {
    const mods = [[-W / 2, -W / 2 + ARM + SW], [-SW / 2, SW / 2], [W / 2 - ARM - SW, W / 2]];
    mods.forEach(([xa, xb]) => legs(xa, xb, z0, z1));
    for (const sx of [-1, 1]) RB(F, sx * (W / 2 - ARM / 2), LEG, 0, ARM, ARMH - LEG, D, 0.05, { k: 3, cell: 0.15 });
    for (let k = 0; k < 3; k++) {
      const cx = (k - 1) * SW;
      // low back frame per module; the back pillows hide it from the front
      RB(F, cx, BASE, z0 + 0.08, SW - 0.008, 0.40, 0.16, 0.04, { cell: 0.2 });
      seat(cx, z0, z1, 11 + k);
      PIL(F, cx, 0.625, -0.175, SW - 0.03, 0.2, 0.42, { rx: PI / 2 - 0.2, lower: 0.42, flange: 0.024, seed: 21 + k, lump: 0.06 });
    }
    if (p.pillows !== 0) {
      PIL(F, -1.13, 0.64, -0.1, 0.44, 0.15, 0.44, { rx: PI / 2 - 0.42, ry: 0.55, rz: -0.18, flange: 0.02, seed: 31 });
      PIL(F, 1.13, 0.64, -0.1, 0.44, 0.15, 0.44, { rx: PI / 2 - 0.42, ry: -0.55, rz: 0.18, flange: 0.02, seed: 32 });
    }
    colRect(-W / 2, z0, W / 2, z1);
    if (side) {
      const cx = side * SW, za = z1 + 0.01, zb = za + OD;
      legs(cx - SW / 2, cx + SW / 2, za, zb);
      RB(F, cx, LEG, (za + zb) / 2, SW - 0.008, BASE - LEG, OD, 0.03, { cell: 0.2 });
      RB(F, cx, BASE, (za + zb) / 2, SW - 0.012, BOX - BASE, OD - 0.004, 0.03, { cell: 0.2 });
      RB(F, cx, BOX - 0.006, (za + zb) / 2, SW - 0.004, 0.009, OD + 0.004, 0.004, { occ: false });
      PIL(F, cx, BOX + 0.035, (za + zb) / 2, SW - 0.045, 0.125, OD - 0.04, { lower: 0.32, flange: 0.024, seed: 15, lump: 0.035 });
      colRect(cx - SW / 2, za, cx + SW / 2, zb);
    }
  });
});

// drum table with a globe lamp
piece('nightTable', { name: 'Bedside table', add: 16 }, function (p) {
  pAt(p, () => {
    CY('darkWood', 0, 0, 0, 0.19, 0.19, 0.5, { seg: 28 });
    CY('brass', 0, 0.5, 0, 0.055, 0.06, 0.012, { seg: 16 }); CY('brass', 0, 0.512, 0, 0.008, 0.008, 0.09, { seg: 8 });
    SP('lampOn', 0, 0.68, 0, 0.085, { seg: 16, hseg: 12 });
    colCircle(0, 0, 0.19);
    pLamp(0.03, 0.72, 0, 0.42, WARM, 1, { glow: 0.75 });
  });
});

// black dome, evening only; y: its rim
piece('pendant', { name: 'Pendant lamp', add: 30 }, function (p) { pendant(p.x, p.z, p.y || 1.55); });

// seed, h, n, leaf, stems, ratio, mats, pot, potR, potH, y
piece('plantLeafy', { name: 'Leafy plant', add: 22, values: { seed: 3, h: 1.4, n: 16, leaf: 0.3, mats: ['leafA', 'leafA', 'leafD'], pot: 'pot', potR: 0.17, potH: 0.34 } }, function (p) { plantLeafy(p.x, p.z, p); });

// seed, n, len, wid, mats, pot, potR, potH, y
piece('plantSpiky', { name: 'Spiky plant', add: 23, values: { seed: 4, n: 46, len: 0.62, wid: 0.03, mats: ['leafB', 'leafB', 'leafA'], pot: 'potWhite', potR: 0.15, potH: 0.36 } }, function (p) { plantSpiky(p.x, p.z, p); });

// square pot with a round bush; seed
piece('planter', { name: 'Planter', add: 24, values: { seed: 21 } }, function (p) {
  pAt(p, () => {
    BX('pot', -0.2, 0, -0.2, 0.2, 0.38, 0.2, { cell: 0.2 });
    BX('soil', -0.18, 0.36, -0.18, 0.18, 0.37, 0.18, { occ: false });
    colRect(-0.2, -0.2, 0.2, 0.2);
    bush(0, 0.34, 0, 0.31, p.seed || 21);
  });
});

// panel radiator 0.8 long. native: on a south wall at (x, z), facing north
piece('radiator', { name: 'Radiator', add: 27 }, function (p) {
  pAt(p, () => pFrom(0.95, 9.42, () => {
    BX('trim', 0.55, 0.16, 9.335, 1.35, 0.7, 9.4, { occ: false, cell: 0.3 });
    for (let i = 0; i < 16; i++) BX('trim', 0.556 + i * 0.05, 0.17, 9.325, 0.59 + i * 0.05, 0.69, 9.336, { occ: false });
    for (const x of [0.6, 1.3]) BAR('chrome', [x, 0, 9.37], [x, 0.16, 9.37], 0.008, { seg: 6 });
  }));
});

// native: the sitter faces south
piece('rattanChair', { name: 'Rattan chair', add: 14 }, function (p) {
  pAt(p, () => {
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) BAR('wicker', [sx * 0.28, 0, sz * 0.28], [sx * 0.25, 0.35, sz * 0.25], 0.016, { seg: 8, uv: 'box' });
    RB('wicker', 0, 0.33, 0, 0.6, 0.05, 0.58, 0.02);
    put('wicker', bendGeo(roundedBoxGeo(1.25, 0.36, 0.035, 0.015, 2, 0.08), 0.33), xf(0, 0.56, -0.33, PI));
    RB('skyblue', 0, 0.38, 0.02, 0.5, 0.09, 0.5, 0.04, { occ: false });
    colCircle(0, 0, 0.36);
  });
});

// round plaid rug, radius 0.78
piece('roundRug', { name: 'Round rug', add: 10 }, function (p) {
  LA('rugPlaid', p.x, 0, p.z, [[0.78, 0], [0.78, 0.01], [0.66, 0.01], [0.54, 0.01], [0.42, 0.01], [0.3, 0.01], [0.18, 0.01], [0.08, 0.01], [0.001, 0.01]], { seg: 48, uv: 'box', uvScale: 1 / 1.56, uo: 0.5, vo: 0.5 });
});

// flat rectangle on the floor: mat, rect, h (0.012), round (corner radius)
piece('rug', { name: 'Rug', add: 11, values: { mat: 'rugTri', w: 1.6, d: 2.3 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, h = p.h || 0.012;
  if (p.round) RB(p.mat, (x0 + x1) / 2, 0, (z0 + z1) / 2, x1 - x0, h, z1 - z0, p.round, { occ: false, cell: 0.2 });
  else BX(p.mat, x0, 0, z0, x1, h, z1, { occ: false, cell: 0.2 });
});

// Two-and-a-half-seat shell sofa 1.72 x 0.82, 0.80 high: channel-tufted back that curves round into low flared arms,
// one long seat cushion, tapered pale-wood legs (after a JYSK photo). native: the sitter faces south.
// Values: `mat` the fabric (default terracotta), `legs` the leg material (default oak).
piece('shellSofa', { name: 'Shell sofa', add: 3 }, function (p) {
  const F = p.mat || 'terracotta', L = p.legs || 'oak';
  const LEG = 0.18, SEAT = 0.40, BACK = 0.80, ARM = 0.62;   // heights
  const AX = 0.745, BZ = -0.32, RC = 0.27, FRONT = 0.33;    // flute centreline: arm x, back z, corner radius, arm front z
  pAt(p, () => {
    for (const [x, z] of [[-0.7, -0.29], [0.7, -0.29], [-0.7, 0.29], [0.7, 0.29]]) CY(L, x, 0, z, 0.024, 0.015, LEG, { seg: 12, rx: -z * 0.25, rz: x * 0.07 });   // splayed outwards
    RB(F, 0, LEG, 0.02, 1.68, SEAT - LEG + 0.02, 0.78, 0.07, { cell: 0.3 });           // base under the cushion
    RB(F, 0, SEAT - 0.01, 0.07, 2 * (AX - 0.07), 0.13, 0.66, 0.06, { cell: 0.25, occ: false }); // seat cushion
    // The U-shaped shell: walk its centreline (back, two quarter turns, arms) and stand a rounded flute every ~0.12 m.
    // An outer skin follows the same line so the outside reads smooth; the grooves only show inside.
    const cx = AX - RC, cz = BZ + RC, arc = PI / 2 * RC, side = FRONT - cz;
    const half = cx + arc + side, n = Math.round(half / 0.12), step = half / n;
    const at = (s) => {                                   // s from the middle of the back outwards (x >= 0 side)
      if (s <= cx) return { x: s, z: BZ, a: 0, top: BACK };
      if (s <= cx + arc) { const t = (s - cx) / RC; return { x: cx + Math.sin(t) * RC, z: cz - Math.cos(t) * RC, a: t, top: lerp(BACK, ARM + 0.05, sstep(0, PI / 2, t)) }; }
      const u = (s - cx - arc) / side;
      return { x: AX, z: cz + u * side, a: PI / 2, top: ARM + 0.05 - u * 0.05 };
    };
    for (const sx of [-1, 1]) {
      for (let i = 0; i < n; i++) {
        const q = at((i + 0.5) * step), ry = -sx * q.a;
        const ox = Math.sin(q.a) * 0.035, oz = -Math.cos(q.a) * 0.035;   // outwards from the seat
        const lean = q.a < 0.01 ? -0.1 : 0;
        RB(F, sx * q.x, SEAT - 0.04, q.z, step * 1.0, q.top - SEAT - 0.01, 0.16, 0.042, { ry, rx: lean, cell: 0.2, occ: false });
        // smooth outer skin; its top tucks under the rolled edge below
        RB(F, sx * (q.x + ox), LEG + 0.02, q.z + oz, step * 1.3, q.top - LEG - 0.08, 0.12, 0.03, { ry, rx: lean, cell: 0.2, occ: false });
      }
      // flared arm front: a round end cap where the shell meets the seat front
      RB(F, sx * AX, LEG + 0.02, FRONT + 0.02, 0.19, ARM - LEG - 0.03, 0.1, 0.05, { cell: 0.2, occ: false });
    }
    // one rolled top edge over the whole U, so the channels run into a smooth roll as on the real sofa
    const RR = 0.08, roll = [];
    for (let i = 0; i <= 40; i++) {
      const s = (i / 40) * 2 * half - half, q = at(Math.abs(s)), sg = s < 0 ? -1 : 1;
      roll.push([sg * q.x, q.top - RR, q.z - (q.a < 0.01 ? 0.02 : 0)]);
    }
    TU(F, roll, RR, { n: 120, seg: 14, occ: false });
    for (const sx of [-1, 1]) { const q = at(half); SP(F, sx * q.x, q.top - RR, q.z, RR, { occ: false }); }
    // light stand-ins for the bake: back, arms, base (kept inside the visible shapes)
    pOcc(-0.6, SEAT + 0.04, -0.4, 0.6, BACK - 0.08, -0.29, albOf(F));
    for (const sx of [-1, 1]) pOcc(sx * 0.745 - 0.055, LEG + 0.05, -0.05, sx * 0.745 + 0.055, ARM - 0.06, 0.3, albOf(F));
    colRect(-0.86, -0.41, 0.86, 0.41);
  });
});

// walk-in shower: low tray w x d (0.9 x 1.0), mixer and rain head on the back wall, glass screen on side
piece('shower', { name: 'Shower', add: 31 }, function (p) {
  //            glass 'w' | 'e' | '' (default 'w'). native: back to a north wall at (x, z), the tray running south
  const w = p.w || 0.9, d = p.d || 1.0, g = p.glass === undefined ? 'w' : p.glass;
  pAt(p, () => {
    B('ceramic', 0, 0, d / 2, w, 0.035, d, { cell: 0.3, occ: false });
    put('chrome', new T.CircleGeometry(0.05, 18), xf(0, 0.036, d / 2, 0, -PI / 2), { uv: 'keep' });
    BX('chrome', -0.09, 0.98, 0, 0.09, 1.1, 0.04);
    BAR('chrome', [0, 1.1, 0.02], [0, 2.12, 0.02], 0.011, { seg: 8 });
    TU('chrome', [[0, 2.1, 0.02], [0, 2.16, 0.06], [0, 2.16, 0.3]], 0.011, { seg: 8 });
    CY('chrome', 0, 2.125, 0.3, 0.115, 0.115, 0.012, { seg: 24 });
    if (g) {
      const sx = g === 'e' ? 1 : -1, gx = sx * (w / 2 - 0.01);
      BXS('glass', gx - 0.004, 0.035, 0, gx + 0.004, 2.0, d - 0.04, { occ: false });
      BXS('chrome', gx - 0.012, 0.035, d - 0.06, gx + 0.012, 2.0, d - 0.035, { occ: false });
      colRect(gx - 0.03, 0, gx + 0.03, d - 0.03);
    }
  });
});

// tripod table with a wicker tray
piece('sideTable', { name: 'Side table', add: 7 }, function (p) {
  pAt(p, () => {
    CY('plastic', 0, 0.47, 0, 0.22, 0.22, 0.03, { seg: 30 });
    for (let i = 0; i < 3; i++) { const a = i * TAU / 3 - PI / 2; BAR('oak', [Math.cos(a) * 0.27, 0, Math.sin(a) * 0.27], [Math.cos(a) * 0.1, 0.47, Math.sin(a) * 0.1], 0.013, { r2: 0.017, seg: 8 }); }
    LA('wicker', 0, 0.5, 0, [[0.001, 0], [0.12, 0], [0.135, 0.03], [0.125, 0.03], [0.115, 0.008], [0.001, 0.008]], { seg: 20, uv: 'box' });
    colCircle(0, 0, 0.22);
  });
});

// three-seat sofa 2.52 x 1.11. native: the sitter faces south (back to the north)
piece('sofa', { name: 'Sofa', add: 1 }, function (p) {
  pAt(p, () => {
    for (const [x, z] of [[-1.16, -0.45], [1.16, -0.45], [-1.16, 0.45], [1.16, 0.45]]) CY('blackMetal', x, 0, z, 0.022, 0.018, 0.08, { seg: 8 });
    RB('sofa', 0, 0.08, 0, 2.52, 0.3, 1.11, 0.04, { cell: 0.3 });
    RB('sofa', 0, 0.38, -0.43, 2.52, 0.42, 0.25, 0.06, { cell: 0.3 });
    for (const s of [-1, 1]) RB('sofa', s * 1.13, 0.38, 0.07, 0.26, 0.24, 0.97, 0.06, { cell: 0.3 });
    for (const x of [-0.67, 0, 0.67]) { RB('sofa', x, 0.38, 0.12, 0.655, 0.14, 0.8, 0.05, { cell: 0.25 }); RB('sofa', x, 0.5, -0.25, 0.64, 0.36, 0.16, 0.07, { rx: -0.16, occ: false }); }
    RB('cushion', 0.4, 0.55, -0.12, 0.42, 0.4, 0.13, 0.06, { rx: -0.42, ry: 0.15, occ: false });
    RB('cushion', 0.84, 0.53, 0.12, 0.44, 0.13, 0.42, 0.06, { ry: 0.5, rz: 0.1, occ: false });
    RB('cushion', -0.86, 0.55, -0.1, 0.48, 0.4, 0.14, 0.06, { rx: -0.5, ry: -0.3, occ: false });
    RB('beige', 0.36, 0.515, 0.2, 0.5, 0.022, 0.72, 0.01, { occ: false, cell: 0.2 });           // throw spilling over the seat front
    RB('beige', 0.36, 0.03, 0.572, 0.5, 0.5, 0.022, 0.01, { occ: false, cell: 0.2 }); RB('beige', 0.34, 0, 0.66, 0.52, 0.03, 0.2, 0.012, { occ: false, ry: 0.1 });
    B('paper', -0.3, 0.522, 0.2, 0.2, 0.006, 0.27, { ry: 0.3, rz: 0.03 }); B('paper', -0.11, 0.522, 0.26, 0.2, 0.006, 0.27, { ry: 0.3, rz: -0.03 });   // open magazine
    colRect(-1.26, -0.555, 1.26, 0.555);
  });
});

// rail with a tea towel on a cabinet front. native: front faces south, (x, z) on it
piece('teaRail', { name: 'Tea towel' }, function (p) {
  pAt(p, () => {
    BX('steel', -0.205, 0.8, 0, 0.205, 0.812, 0.024, { occ: false });
    RB('stripe', -0.045, 0.5, 0.03, 0.2, 0.318, 0.012, 0.005, { occ: false }); RB('stripe', -0.045, 0.62, 0.008, 0.2, 0.196, 0.008, 0.003, { occ: false });
  });
});

// native: back to a north wall at (x, z), facing south
piece('toilet', { name: 'Toilet' }, function (p) {
  const cer = albOf('ceramic');
  pAt(p, () => {
    RB('ceramic', 0, 0.4, 0.105, 0.38, 0.36, 0.17, 0.03);
    RB('ceramic', 0, 0.76, 0.105, 0.395, 0.022, 0.185, 0.008);
    CY('chrome', 0, 0.782, 0.105, 0.022, 0.022, 0.006, { seg: 14 });
    LA('ceramic', 0, 0, 0.43, [[0.001, 0], [0.12, 0], [0.13, 0.12], [0.185, 0.36], [0.195, 0.4], [0.15, 0.4], [0.12, 0.3], [0.06, 0.25], [0.001, 0.24]], { seg: 24, sz: 1.3 });
    CY('ceramic', 0, 0.4, 0.43, 0.2, 0.2, 0.022, { seg: 28, sz: 1.3 });
    BX('ceramic', -0.1, 0.1, 0.19, 0.1, 0.4, 0.27, { occ: false });
    occLocal(xf(0, 0.2, 0.43), 0.3, 0.4, 0.42, cer);
    colRect(-0.2, 0, 0.2, 0.7);
  });
});

// native: on an east wall at (x, z), facing west
piece('towelLadder', { name: 'Towel ladder' }, function (p) {
  pAt(p, () => {
    const xl = -0.032;
    for (const z of [-0.23, 0.23]) BAR('chrome', [xl, 0.78, z], [xl, 1.58, z], 0.011, { seg: 8 });
    for (let i = 0; i < 7; i++) BAR('chrome', [xl, 0.84 + i * 0.115, -0.23], [xl, 0.84 + i * 0.115, 0.23], 0.008, { seg: 6 });
    RB('towel', xl - 0.016, 1.06, 0, 0.036, 0.46, 0.36, 0.014, { occ: false });
  });
});

// wall-hung walnut unit 0.77 wide with a vessel basin, mirror and light bar. native: back to a north wall, facing south. zone
piece('vanity', { name: 'Basin' }, function (p) {
  pAt(p, () => {
    B('walnut', 0, 0.36, 0.255, 0.77, 0.44, 0.51);
    BX('plinth', -0.385, 0.577, 0.508, 0.385, 0.583, 0.513, { occ: false });
    BX('blackMetal', -0.155, 0.7, 0.51, 0.155, 0.712, 0.53, { occ: false }); BX('blackMetal', -0.155, 0.48, 0.51, 0.155, 0.492, 0.53, { occ: false });
    const vz = 0.29, vt = 0.93;
    rim('ceramic', 0, vt, vz, 0.62, 0.42, 0.56, 0.36, 0.05);
    basin('ceramic', 0, vt, vz, 0.56, 0.36, 0.11, 0.05, { free: true });
    BX('ceramic', -0.31, 0.8, vz - 0.21, 0.31, vt - 0.001, vz - 0.192, { occ: false }); BX('ceramic', -0.31, 0.8, vz + 0.192, 0.31, vt - 0.001, vz + 0.21, { occ: false });
    BX('ceramic', -0.31, 0.8, vz - 0.192, -0.292, vt - 0.001, vz + 0.192, { occ: false }); BX('ceramic', 0.292, 0.8, vz - 0.192, 0.31, vt - 0.001, vz + 0.192, { occ: false });
    CY('chrome', 0, vt - 0.109, vz, 0.022, 0.022, 0.004, { seg: 12, free: true });
    CY('chrome', 0, 0.8, 0.045, 0.022, 0.026, 0.03, { seg: 12 });                                // tall tap behind it
    TU('chrome', [[0, 0.82, 0.045], [0, 1.07, 0.045], [0, 1.11, 0.085], [0, 1.09, 0.155], [0, 1.05, 0.165]], 0.011, { seg: 8, n: 24 });
    B('chrome', 0.05, 0.83, 0.045, 0.07, 0.012, 0.016, { ry: 0.5 });
    BX('blackMetal', -0.36, 1.15, 0, 0.36, 1.97, 0.012, { occ: false });                           // mirror frame and light bar
    BX('lampCool', -0.27, 2.0, 0.01, 0.27, 2.028, 0.045);
    CY('ceramic', -0.3, 0.8, 0.43, 0.03, 0.035, 0.1, { seg: 12 }); CY('chrome', -0.3, 0.9, 0.43, 0.012, 0.012, 0.03, { seg: 8 });   // soap pump
    colRect(-0.4, 0, 0.4, 0.54);
    pMirror({ kind: 'rect', w: 0.7, h: 0.8, p: [0, 1.56, 0.0135], n: [0, 0, 1] }, p.zone);
    pLamp(0, 1.97, 0.15, 0.28, COOL, 1, { glow: 0.5 });
  });
});

// native: on an east wall, facing west; (x, z) on the wall face
piece('wallLight', { name: 'Wall light' }, function (p) {
  pAt(p, () => {
    BX('alu', -0.04, 1.92, -0.06, 0, 2.08, 0.06, { occ: false });
    BX('lampEve', -0.036, 1.914, -0.05, -0.004, 1.92, 0.05); BX('lampEve', -0.036, 2.08, -0.05, -0.004, 2.086, 0.05);
    pLamp(-0.15, 1.9, 0, 0.7, SOFT, 2, { glow: 0.45 });
  });
});

// flat television with a warm halo behind it. native: on an east wall at (x, z), facing west
piece('wallTV', { name: 'Wall TV', add: 28 }, function (p) {
  pAt(p, () => pFrom(3.34, 6.05, () => {
    BX('plastic', 3.305, 0.93, 5.495, 3.34, 1.57, 6.605, { cell: 0.3 });
    BX('screen', 3.301, 0.942, 5.507, 3.305, 1.558, 6.593);
    put('halo', new T.PlaneGeometry(2.1, 1.5), xf(3.3375, 1.25, 6.05, -PI / 2), { uv: 'keep' });
    pLamp(3.2, 1.25, 6.05, 0.2, WARM, 1, { glow: 0 });
  }));
});

// free-standing walnut wardrobe 2.4 high: rect, face 'n'|'s'|'e'|'w'
piece('wardrobe', { name: 'Wardrobe', add: 18, values: { face: 's', w: 1.2, d: 0.6 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, f = p.face || 's', N = { occ: false }, ht = 2.4;
  BX('walnut', x0, 0.04, z0, x1, ht, z1, { cell: 0.35 });
  BX('plinth', x0 + 0.02, 0, z0 + 0.02, x1 - 0.02, 0.04, z1 - 0.02, N);
  if (f === 'e' || f === 'w') {
    const zm = (z0 + z1) / 2, xa = f === 'e' ? x1 : x0 - 0.004, xh = f === 'e' ? x1 : x0 - 0.01;
    BX('plinth', xa, 0.06, zm - 0.003, xa + 0.004, ht - 0.02, zm + 0.003, N);
    BX('blackMetal', xh, 0.9, zm - 0.12, xh + 0.01, 1.3, zm - 0.1, N); BX('blackMetal', xh, 0.9, zm + 0.1, xh + 0.01, 1.3, zm + 0.12, N);
  } else {
    const xm = (x0 + x1) / 2, za = f === 's' ? z1 : z0 - 0.004, zh = f === 's' ? z1 : z0 - 0.01;
    BX('plinth', xm - 0.003, 0.06, za, xm + 0.003, ht - 0.02, za + 0.004, N);
    BX('blackMetal', xm - 0.12, 0.9, zh, xm - 0.1, 1.3, zh + 0.01, N); BX('blackMetal', xm + 0.1, 0.9, zh, xm + 0.12, 1.3, zh + 0.01, N);
  }
  COL.push({ k: 0, x0, z0, x1, z1 });
});

// washing machine 0.6 wide. native: back to a north wall, facing south
piece('washer', { name: 'Washing machine', add: 26 }, function (p) {
  pAt(p, () => {
    BX('fridge', -0.3, 0.02, 0.02, 0.3, 0.85, 0.54, { cell: 0.3 });
    BX('plastic', -0.28, 0.72, 0.54, 0.28, 0.83, 0.544, { occ: false });
    CY('steel', 0, 0.43, 0.548, 0.19, 0.19, 0.02, { seg: 28, rx: PI / 2 });
    CY('screen', 0, 0.43, 0.556, 0.15, 0.15, 0.008, { seg: 28, rx: PI / 2 });
    colRect(-0.31, 0, 0.31, 0.56);
  });
});
// ---------- 50-bake.js : the light bake ----------
// Works out, for every vertex, how much light reaches it: daylight through the glazing (A), the lamps that are
// always on (B) and the evening lamps (C), each with one bounce gathered through a grid of probes.
// bakeCore is self-contained (it only uses its argument) so it can be handed to web workers as source text.
function bakeCore(d) {
  const boxes = d.boxes, balb = d.alb, nb = (boxes.length / 6) | 0;
  const PI = Math.PI, sqrt = Math.sqrt, abs = Math.abs, floor = Math.floor;
  const EPS = 1e-4, FAR = 1e9, T0 = Date.now(), PB = d.patchBox;   // patchBox: where light patches may lie
  const prog = d.prog || (() => {});
  const smooth = (a, b, x) => { let t = (x - a) / (b - a); t = t < 0 ? 0 : t > 1 ? 1 : t; return t * t * (3 - 2 * t); };

  // ---- uniform grid over the plan: each cell lists the solids that touch it ----
  const GX0 = d.grid[0], GZ0 = d.grid[1], CS = 0.5, GNX = d.grid[2], GNZ = d.grid[3], NC = GNX * GNZ;   // grid: from the flat's bounds
  const cellStart = new Int32Array(NC + 1);
  const cell = (v, g0, n) => { const i = floor((v - g0) / CS); return i < 0 ? 0 : i >= n ? n - 1 : i; };
  let cellList = null;
  for (let pass = 0; pass < 2; pass++) {
    const cur = pass ? cellStart.slice(0, NC) : null;
    for (let b = 0; b < nb; b++) {
      const o = b * 6, i0 = cell(boxes[o], GX0, GNX), i1 = cell(boxes[o + 3], GX0, GNX), j0 = cell(boxes[o + 2], GZ0, GNZ), j1 = cell(boxes[o + 5], GZ0, GNZ);
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) { if (pass) cellList[cur[j * GNX + i]++] = b; else cellStart[j * GNX + i + 1]++; }
    }
    if (!pass) { for (let c = 0; c < NC; c++) cellStart[c + 1] += cellStart[c]; cellList = new Int32Array(cellStart[NC]); }
  }
  let rays = 0;
  // Is the ray o + t*dir (dir a unit vector) stopped for some t in (0, tMax)? A solid that contains the start is ignored.
  function blocked(ox, oy, oz, dx, dy, dz, tMax) {
    rays++;
    let cx = floor((ox - GX0) / CS), cz = floor((oz - GZ0) / CS);
    if (cx < 0 || cz < 0 || cx >= GNX || cz >= GNZ) return 0;
    const mx = abs(dx) > 1e-9, mz = abs(dz) > 1e-9, ix = mx ? 1 / dx : 1e30, iy = abs(dy) > 1e-9 ? 1 / dy : 1e30, iz = mz ? 1 / dz : 1e30;
    const sx = dx > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1, tdx = mx ? abs(CS * ix) : FAR * 10, tdz = mz ? abs(CS * iz) : FAR * 10;
    let tmx = mx ? ((dx > 0 ? cx + 1 : cx) * CS + GX0 - ox) * ix : FAR * 10, tmz = mz ? ((dz > 0 ? cz + 1 : cz) * CS + GZ0 - oz) * iz : FAR * 10;
    for (;;) {
      const c = cz * GNX + cx;
      for (let k = cellStart[c], e = cellStart[c + 1]; k < e; k++) {
        const b = cellList[k] * 6;
        let t0 = (boxes[b] - ox) * ix, t1 = (boxes[b + 3] - ox) * ix, lo, hi;
        if (t0 > t1) { lo = t1; hi = t0; } else { lo = t0; hi = t1; }
        t0 = (boxes[b + 1] - oy) * iy; t1 = (boxes[b + 4] - oy) * iy;
        if (t0 > t1) { if (t1 > lo) lo = t1; if (t0 < hi) hi = t0; } else { if (t0 > lo) lo = t0; if (t1 < hi) hi = t1; }
        if (lo > hi) continue;
        t0 = (boxes[b + 2] - oz) * iz; t1 = (boxes[b + 5] - oz) * iz;
        if (t0 > t1) { if (t1 > lo) lo = t1; if (t0 < hi) hi = t0; } else { if (t0 > lo) lo = t0; if (t1 < hi) hi = t1; }
        if (lo <= hi && lo > -EPS && lo < tMax) return 1;
      }
      if (tmx < tmz) { if (tmx >= tMax) return 0; cx += sx; tmx += tdx; if (cx < 0 || cx >= GNX) return 0; }
      else { if (tmz >= tMax) return 0; cz += sz; tmz += tdz; if (cz < 0 || cz >= GNZ) return 0; }
    }
  }
  // Distance to the nearest solid along the ray, or tMax.
  function nearest(ox, oy, oz, dx, dy, dz, tMax) {
    rays++;
    let cx = floor((ox - GX0) / CS), cz = floor((oz - GZ0) / CS), best = tMax;
    if (cx < 0 || cz < 0 || cx >= GNX || cz >= GNZ) return best;
    const mx = abs(dx) > 1e-9, mz = abs(dz) > 1e-9, ix = mx ? 1 / dx : 1e30, iy = abs(dy) > 1e-9 ? 1 / dy : 1e30, iz = mz ? 1 / dz : 1e30;
    const sx = dx > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1, tdx = mx ? abs(CS * ix) : FAR * 10, tdz = mz ? abs(CS * iz) : FAR * 10;
    let tmx = mx ? ((dx > 0 ? cx + 1 : cx) * CS + GX0 - ox) * ix : FAR * 10, tmz = mz ? ((dz > 0 ? cz + 1 : cz) * CS + GZ0 - oz) * iz : FAR * 10;
    for (;;) {
      const c = cz * GNX + cx;
      for (let k = cellStart[c], e = cellStart[c + 1]; k < e; k++) {
        const b = cellList[k] * 6;
        let t0 = (boxes[b] - ox) * ix, t1 = (boxes[b + 3] - ox) * ix, lo, hi;
        if (t0 > t1) { lo = t1; hi = t0; } else { lo = t0; hi = t1; }
        t0 = (boxes[b + 1] - oy) * iy; t1 = (boxes[b + 4] - oy) * iy;
        if (t0 > t1) { if (t1 > lo) lo = t1; if (t0 < hi) hi = t0; } else { if (t0 > lo) lo = t0; if (t1 < hi) hi = t1; }
        if (lo > hi) continue;
        t0 = (boxes[b + 2] - oz) * iz; t1 = (boxes[b + 5] - oz) * iz;
        if (t0 > t1) { if (t1 > lo) lo = t1; if (t0 < hi) hi = t0; } else { if (t0 > lo) lo = t0; if (t1 < hi) hi = t1; }
        if (lo <= hi && lo > -EPS && lo < best) best = lo < 0 ? 0 : lo;
      }
      if (tmx < tmz) { if (tmx >= best) return best; cx += sx; tmx += tdx; if (cx < 0 || cx >= GNX) return best; }
      else { if (tmz >= best) return best; cz += sz; tmz += tdz; if (cz < 0 || cz >= GNZ) return best; }
    }
  }
  // Is the point inside a solid (by more than a millimetre)?
  function buried(x, y, z) {
    const cx = floor((x - GX0) / CS), cz = floor((z - GZ0) / CS);
    if (cx < 0 || cz < 0 || cx >= GNX || cz >= GNZ) return 0;
    const c = cz * GNX + cx, m = 1e-3;
    for (let k = cellStart[c], e = cellStart[c + 1]; k < e; k++) {
      const b = cellList[k] * 6;
      if (x > boxes[b] + m && x < boxes[b + 3] - m && y > boxes[b + 1] + m && y < boxes[b + 4] - m && z > boxes[b + 2] + m && z < boxes[b + 5] - m) return 1;
    }
    return 0;
  }

  // ---- the sky ----
  const sun = d.sun.dir, sunE = d.sun.col, sh = sqrt(sun[0] * sun[0] + sun[2] * sun[2]) || 1, shx = sun[0] / sh, shz = sun[2] / sh;
  const skyZ = d.skyZ, skyH = d.skyH, gnd = d.ground;
  let sR = 0, sG = 0, sB = 0;
  function sky(dx, dy, dz) {
    if (dy <= 0) { sR = gnd[0]; sG = gnd[1]; sB = gnd[2]; return; }
    const t = sqrt(dy), side = dx * shx + dz * shz, k = 1 + 0.6 * (side > 0 ? side : 0) * (1 - dy);
    sR = (skyH[0] + (skyZ[0] - skyH[0]) * t) * k; sG = (skyH[1] + (skyZ[1] - skyH[1]) * t) * k; sB = (skyH[2] + (skyZ[2] - skyH[2]) * t) * k;
  }
  const indoorRects = d.indoor;
  function indoor(x, z) { for (let i = 0; i < indoorRects.length; i++) { const r = indoorRects[i]; if (x > r[0] && x < r[2] && z > r[1] && z < r[3]) return 1; } return 0; }

  // glazed openings as area lights: sample points spread over each
  const opens = d.open.map((o) => {
    const hu = Math.hypot(o.u[0], o.u[1], o.u[2]), hv = Math.hypot(o.v[0], o.v[1], o.v[2]), pts = new Float32Array(o.nu * o.nv * 3);
    let k = 0;
    for (let j = 0; j < o.nv; j++) for (let i = 0; i < o.nu; i++) {
      const a = 2 * (i + 0.5) / o.nu - 1, b = 2 * (j + 0.5) / o.nv - 1;
      pts[k++] = o.c[0] + o.u[0] * a + o.v[0] * b; pts[k++] = o.c[1] + o.u[1] * a + o.v[1] * b; pts[k++] = o.c[2] + o.u[2] * a + o.v[2] * b;
    }
    return { c: o.c, n: o.n, ud: [o.u[0] / hu, o.u[1] / hu, o.u[2] / hu], vd: [o.v[0] / hv, o.v[1] / hv, o.v[2] / hv], hu, hv, pts, cnt: o.nu * o.nv, dA: 4 * hu * hv / (o.nu * o.nv), T: o.T };
  });
  // fixed cosine-weighted directions about +Z, turned into each vertex's own frame
  const hemi = (n) => { const a = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, r = sqrt(u), p = i * 2.399963; a[i * 3] = r * Math.cos(p); a[i * 3 + 1] = r * Math.sin(p); a[i * 3 + 2] = sqrt(1 - u); } return a; };
  const H64 = hemi(64), H24 = hemi(24), H12 = hemi(12), H6 = hemi(6);
  let tx = 0, ty = 0, tz = 0, bx = 0, by = 0, bz = 0;
  function frame(nx, ny, nz) {
    if (abs(ny) < 0.99) { const l = 1 / sqrt(nx * nx + nz * nz); tx = nz * l; ty = 0; tz = -nx * l; } else { tx = 1; ty = 0; tz = 0; }
    bx = ny * tz - nz * ty; by = nz * tx - nx * tz; bz = nx * ty - ny * tx;
  }
  const lamps = d.lamps;
  const E = new Float64Array(9);      // light arriving directly at the current point: A rgb, B rgb, C rgb

  // q: 1 = full quality, 3 = every third sky sample (furniture). two: a leaf or curtain, lit from both sides.
  function direct(ox, oy, oz, nx, ny, nz, q, two) {
    E.fill(0);
    const ind = indoor(ox, oz);
    let near = FAR;
    if (ind) {
      for (let k = 0; k < opens.length; k++) {
        const o = opens[k], rx = ox - o.c[0], ry = oy - o.c[1], rz = oz - o.c[2];
        const du = abs(rx * o.ud[0] + ry * o.ud[1] + rz * o.ud[2]) - o.hu, dv = abs(rx * o.vd[0] + ry * o.vd[1] + rz * o.vd[2]) - o.hv, dn = rx * o.n[0] + ry * o.n[1] + rz * o.n[2];
        const dd = sqrt((du > 0 ? du * du : 0) + (dv > 0 ? dv * dv : 0) + dn * dn);
        if (dd < near) near = dd;
      }
    }
    const wh = ind ? 1 - smooth(0.35, 0.85, near) : 1;
    if (wh > 0) {                       // open sky estimate: rays over the hemisphere
      const hs = q === 1 ? H64 : H24, n = hs.length / 3, k = wh * PI / n * (ind ? 0.82 : 1);
      frame(nx, ny, nz);
      for (let i = 0; i < n; i++) {
        const a = hs[i * 3], b = hs[i * 3 + 1], c = hs[i * 3 + 2], dx = tx * a + bx * b + nx * c, dy = ty * a + by * b + ny * c, dz = tz * a + bz * b + nz * c;
        if (blocked(ox, oy, oz, dx, dy, dz, FAR)) continue;
        sky(dx, dy, dz);
        E[0] += sR * k; E[1] += sG * k; E[2] += sB * k;
      }
    }
    if (wh < 1) {                       // far from the glass: aim at the openings
      const f = 1 - wh;
      for (let k = 0; k < opens.length; k++) {
        const o = opens[k];
        if ((ox - o.c[0]) * o.n[0] + (oy - o.c[1]) * o.n[1] + (oz - o.c[2]) * o.n[2] < 0.02) continue;
        const pts = o.pts, dA = o.dA * q, g = f * o.T * dA;
        for (let s = (q > 1 ? 1 : 0); s < o.cnt; s += q) {
          const vx = pts[s * 3] - ox, vy = pts[s * 3 + 1] - oy, vz = pts[s * 3 + 2] - oz, d2 = vx * vx + vy * vy + vz * vz, inv = 1 / sqrt(d2);
          let cv = (nx * vx + ny * vy + nz * vz) * inv;
          if (cv <= 0) { if (!two) continue; cv = -cv; }
          const co = -(o.n[0] * vx + o.n[1] * vy + o.n[2] * vz) * inv;
          if (co <= 0) continue;
          const dx = vx * inv, dy = vy * inv, dz = vz * inv;
          if (blocked(ox, oy, oz, dx, dy, dz, FAR)) continue;
          sky(dx, dy, dz);
          const w = g * cv * co / (d2 > dA ? d2 : dA);
          E[0] += sR * w; E[1] += sG * w; E[2] += sB * w;
        }
      }
    }
    for (let k = 0; k < lamps.length; k++) {
      const L = lamps[k], vx = L.p[0] - ox, vy = L.p[1] - oy, vz = L.p[2] - oz, d2 = vx * vx + vy * vy + vz * vz;
      if (d2 > L.r2) continue;
      const dist = sqrt(d2), inv = 1 / dist;
      let cv = (nx * vx + ny * vy + nz * vz) * inv;
      if (cv <= 0) { if (!two) continue; cv = -cv; }
      let w = L.I * cv / (d2 > 0.02 ? d2 : 0.02);
      if (L.down) { const c = vy * inv; if (c <= 0) continue; w *= c; }
      if (blocked(ox, oy, oz, vx * inv, vy * inv, vz * inv, dist - 0.03)) continue;
      const o = L.ch * 3;
      E[o] += L.col[0] * w; E[o + 1] += L.col[1] * w; E[o + 2] += L.col[2] * w;
    }
  }
  function aoAt(ox, oy, oz, nx, ny, nz, hs, R) {
    const n = hs.length / 3;
    let occ = 0;
    frame(nx, ny, nz);
    for (let i = 0; i < n; i++) {
      const a = hs[i * 3], b = hs[i * 3 + 1], c = hs[i * 3 + 2];
      occ += 1 - nearest(ox, oy, oz, tx * a + bx * b + nx * c, ty * a + by * b + ny * c, tz * a + bz * b + nz * c, R) / R;
    }
    return 1 - occ / n;
  }

  // ---- patches: the faces of every solid cut into half-metre cells; they hand light on ----
  const PS = d.patch || 0.5, pP = [], pN = [], pA = [], pAl = [];
  {
    const lo = [0, 0, 0], hi = [0, 0, 0], c = [0, 0, 0], n = [0, 0, 0];
    for (let b = 0; b < nb; b++) {
      for (let a = 0; a < 3; a++) { lo[a] = boxes[b * 6 + a]; hi[a] = boxes[b * 6 + 3 + a]; }
      for (let f = 0; f < 6; f++) {
        const ax = f >> 1, sg = f & 1 ? 1 : -1, u = (ax + 1) % 3, v = (ax + 2) % 3, lu = hi[u] - lo[u], lv = hi[v] - lo[v];
        if (lu < 0.28 || lv < 0.28) continue;
        const nu = Math.max(1, Math.round(lu / PS)), nv = Math.max(1, Math.round(lv / PS));
        n[0] = n[1] = n[2] = 0; n[ax] = sg;
        for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
          c[ax] = (sg > 0 ? hi[ax] : lo[ax]) + sg * 0.02; c[u] = lo[u] + (i + 0.5) * lu / nu; c[v] = lo[v] + (j + 0.5) * lv / nv;
          if (c[0] < PB[0] || c[0] > PB[1] || c[2] < PB[2] || c[2] > PB[3] || c[1] < -0.1 || c[1] > 2.76) continue;
          if (buried(c[0], c[1], c[2])) continue;
          pP.push(c[0], c[1], c[2]); pN.push(n[0], n[1], n[2]); pA.push(lu / nu * lv / nv, lu / nu, lv / nv, u); pAl.push(balb[b * 3], balb[b * 3 + 1], balb[b * 3 + 2]);
        }
      }
    }
  }
  const np = pP.length / 3, pRad = new Float32Array(np * 9), pRad2 = new Float32Array(np * 9);
  for (let p = 0; p < np; p++) {
    const x = pP[p * 3], y = pP[p * 3 + 1], z = pP[p * 3 + 2], nx = pN[p * 3], ny = pN[p * 3 + 1], nz = pN[p * 3 + 2];
    direct(x, y, z, nx, ny, nz, 3, 0);
    const cs = nx * sun[0] + ny * sun[1] + nz * sun[2];
    if (cs > 0) {                       // the sun itself: four points on the patch
      const u = pA[p * 4 + 3], v = (u + 1) % 3, hu = pA[p * 4 + 1] * 0.25, hv = pA[p * 4 + 2] * 0.25, q = [x, y, z];
      let lit = 0;
      for (let s = 0; s < 4; s++) {
        q[0] = x; q[1] = y; q[2] = z; q[u] += s & 1 ? hu : -hu; q[v] += s & 2 ? hv : -hv;
        if (!blocked(q[0], q[1], q[2], sun[0], sun[1], sun[2], FAR)) lit++;
      }
      const k = cs * lit / 4 * (indoor(x, z) ? 0.82 : 1);
      E[0] += sunE[0] * k; E[1] += sunE[1] * k; E[2] += sunE[2] * k;
    }
    for (let c = 0; c < 9; c++) pRad[p * 9 + c] = E[c] * pAl[p * 3 + c % 3];
  }
  prog(0.08);

  // ---- probes: a coarse lattice that gathers what the patches hand on, for the six axis directions ----
  const G = d.probe, PNX = G.nx, PNY = G.ny, PNZ = G.nz, NP = PNX * PNY * PNZ;
  const pv = new Uint8Array(NP), cube = new Float32Array(NP * 54), cube2 = new Float32Array(NP * 54), vis = new Uint8Array(Math.ceil(NP * np / 8));
  const ppos = (i, a) => (a === 0 ? G.x0 + G.dx * (i % PNX) : a === 1 ? G.y0 + G.dy * (floor(i / PNX) % PNY) : G.z0 + G.dz * floor(i / (PNX * PNY)));
  for (let i = 0; i < NP; i++) pv[i] = buried(ppos(i, 0), ppos(i, 1), ppos(i, 2)) ? 0 : 1;
  function gather(rad, out, first) {
    for (let i = 0; i < NP; i++) {
      if (!pv[i]) continue;
      const x = ppos(i, 0), y = ppos(i, 1), z = ppos(i, 2), o = i * 54;
      for (let p = 0; p < np; p++) {
        const bit = i * np + p;
        if (!first && !(vis[bit >> 3] & (1 << (bit & 7)))) continue;
        const vx = pP[p * 3] - x, vy = pP[p * 3 + 1] - y, vz = pP[p * 3 + 2] - z, d2 = vx * vx + vy * vy + vz * vz;
        if (first) {
          if (d2 > 90 || d2 < 1e-4) continue;
          if (pN[p * 3] * vx + pN[p * 3 + 1] * vy + pN[p * 3 + 2] * vz >= 0) continue;
          const dist = sqrt(d2), inv = 1 / dist;
          if (blocked(x, y, z, vx * inv, vy * inv, vz * inv, dist - 0.03)) continue;
          vis[bit >> 3] |= 1 << (bit & 7);
        }
        const r = p * 9;
        if (rad[r] + rad[r + 1] + rad[r + 2] + rad[r + 3] + rad[r + 4] + rad[r + 5] + rad[r + 6] + rad[r + 7] + rad[r + 8] <= 0) continue;
        const inv = 1 / sqrt(d2), ar = pA[p * 4], cq = -(pN[p * 3] * vx + pN[p * 3 + 1] * vy + pN[p * 3 + 2] * vz) * inv, g = cq * ar / (PI * (d2 + ar * 0.5)) * inv;
        for (let f = 0; f < 6; f++) {
          const comp = f < 2 ? vx : f < 4 ? vy : vz, w = (f & 1 ? comp : -comp) * g;
          if (w <= 0) continue;
          const q = o + f * 9;
          for (let c = 0; c < 9; c++) out[q + c] += rad[r + c] * w;
        }
      }
      if (first && (i & 31) === 0) prog(0.08 + 0.3 * i / NP);
    }
  }
  const Bn = new Float64Array(9);     // bounced light at the current point
  const cubeAt = (src, i, nx, ny, nz, w) => {
    const o = i * 54, fx = (nx > 0 ? 1 : 0) * 9, fy = (2 + (ny > 0 ? 1 : 0)) * 9, fz = (4 + (nz > 0 ? 1 : 0)) * 9, wx = nx * nx * w, wy = ny * ny * w, wz = nz * nz * w;
    for (let c = 0; c < 9; c++) Bn[c] += src[o + fx + c] * wx + src[o + fy + c] * wy + src[o + fz + c] * wz;
  };
  function probe(src, ox, oy, oz, nx, ny, nz, two) {
    Bn.fill(0);
    const gx = (ox + nx * 0.13 - G.x0) / G.dx, gy = (oy + ny * 0.13 - G.y0) / G.dy, gz = (oz + nz * 0.13 - G.z0) / G.dz;
    let i0 = floor(gx), j0 = floor(gy), k0 = floor(gz);
    i0 = i0 < 0 ? 0 : i0 > PNX - 2 ? PNX - 2 : i0; j0 = j0 < 0 ? 0 : j0 > PNY - 2 ? PNY - 2 : j0; k0 = k0 < 0 ? 0 : k0 > PNZ - 2 ? PNZ - 2 : k0;
    let fx = gx - i0, fy = gy - j0, fz = gz - k0;
    fx = fx < 0 ? 0 : fx > 1 ? 1 : fx; fy = fy < 0 ? 0 : fy > 1 ? 1 : fy; fz = fz < 0 ? 0 : fz > 1 ? 1 : fz;
    let ws = 0;
    for (let pass = 0; pass < 2 && ws < 1e-3; pass++) {       // second pass: nothing visible, so take what is merely in front
      for (let c = 0; c < 8; c++) {
        const a = c & 1, b = (c >> 1) & 1, e = c >> 2, i = (k0 + e) * PNX * PNY + (j0 + b) * PNX + i0 + a;
        if (!pv[i]) continue;
        let w = (a ? fx : 1 - fx) * (b ? fy : 1 - fy) * (e ? fz : 1 - fz);
        if (pass) w += 0.02; else if (w < 1e-3) continue;
        const vx = ppos(i, 0) - ox, vy = ppos(i, 1) - oy, vz = ppos(i, 2) - oz, dist = sqrt(vx * vx + vy * vy + vz * vz);
        if (!two && vx * nx + vy * ny + vz * nz < 0.01) continue;
        if (!pass && dist > 0.03 && blocked(ox, oy, oz, vx / dist, vy / dist, vz / dist, dist - 0.01)) continue;
        if (two) { cubeAt(src, i, nx, ny, nz, w * 0.5); cubeAt(src, i, -nx, -ny, -nz, w * 0.5); } else cubeAt(src, i, nx, ny, nz, w);
        ws += w;
      }
    }
    if (ws > 0) for (let c = 0; c < 9; c++) Bn[c] /= ws;
  }
  gather(pRad, cube, true);
  for (let p = 0; p < np; p++) {        // what each patch hands on a second time
    probe(cube, pP[p * 3], pP[p * 3 + 1], pP[p * 3 + 2], pN[p * 3], pN[p * 3 + 1], pN[p * 3 + 2], 0);
    for (let c = 0; c < 9; c++) pRad2[p * 9 + c] = Bn[c] * pAl[p * 3 + c % 3];
  }
  gather(pRad2, cube2, false);
  const tail = d.tail === undefined ? 1.5 : d.tail, gain = d.gain === undefined ? 1 : d.gain;
  for (let i = 0; i < cube.length; i++) cube[i] += cube2[i] * tail;
  prog(0.42);
  const tProbe = Date.now() - T0;

  // ---- vertices ----
  const pos = d.pos, nor = d.nor, flg = d.flg, nv = (pos.length / 3) | 0, mod = d.mod || 1, rem = d.rem || 0, cnt = Math.max(0, Math.ceil((nv - rem) / mod));
  const A = new Float32Array(cnt * 3), B = new Float32Array(cnt * 3), C = new Float32Array(cnt * 3);
  let dead = 0;
  for (let i = rem, o = 0, step = 0; i < nv; i += mod, o += 3, step++) {
    let nx = nor[i * 3], ny = nor[i * 3 + 1], nz = nor[i * 3 + 2];
    const l = sqrt(nx * nx + ny * ny + nz * nz) || 1, f = flg[i], fine = f & 1, two = f & 4;
    nx /= l; ny /= l; nz /= l;
    if (two && ny < 0) { nx = -nx; ny = -ny; nz = -nz; }
    const ox = pos[i * 3] + nx * 0.02, oy = pos[i * 3 + 1] + ny * 0.02, oz = pos[i * 3 + 2] + nz * 0.02;
    if (!(f & 2) && buried(ox, oy, oz)) { dead++; continue; }
    direct(ox, oy, oz, nx, ny, nz, fine ? 1 : 3, two);
    probe(cube, ox, oy, oz, nx, ny, nz, two);
    const k = (two ? 0.85 : 0.3 + 0.7 * aoAt(ox, oy, oz, nx, ny, nz, fine ? H12 : H6, 0.7)) * gain;
    A[o] = E[0] + Bn[0] * k; A[o + 1] = E[1] + Bn[1] * k; A[o + 2] = E[2] + Bn[2] * k;
    B[o] = E[3] + Bn[3] * k; B[o + 1] = E[4] + Bn[4] * k; B[o + 2] = E[5] + Bn[5] * k;
    C[o] = E[6] + Bn[6] * k; C[o + 1] = E[7] + Bn[7] * k; C[o + 2] = E[8] + Bn[8] * k;
    if ((step & 1023) === 0) prog(0.42 + 0.58 * step / cnt);
  }
  prog(1);
  return { A, B, C, stats: { ms: Date.now() - T0, msProbes: tProbe, rays, solids: nb, patches: np, probes: NP, vertices: cnt, buried: dead } };
}

// Runs the bake off the main thread on a few workers, each taking every n-th vertex; falls back to the main thread.
function runBake(input, onProgress, onDone) {
  const nv = input.pos.length / 3, n = clamp((navigator.hardwareConcurrency || 4) - 1, 1, 6), out = { A: new Float32Array(nv * 3), B: new Float32Array(nv * 3), C: new Float32Array(nv * 3) };
  const merge = (r, k, m) => { for (const ch of ['A', 'B', 'C']) { const s = r[ch], t = out[ch]; for (let i = k, j = 0; i < nv; i += m, j += 3) { t[i * 3] = s[j]; t[i * 3 + 1] = s[j + 1]; t[i * 3 + 2] = s[j + 2]; } } };
  const local = () => setTimeout(() => { const r = bakeCore(Object.assign({}, input, { mod: 1, rem: 0 })); merge(r, 0, 1); onDone(out, [r.stats], 'main thread'); }, 30);
  let url = null, workers = [];
  try {
    const src = bakeCore.toString() + '\nonmessage = (e) => { const d = e.data; d.prog = (p) => postMessage({ p }); const r = bakeCore(d); postMessage({ r }, [r.A.buffer, r.B.buffer, r.C.buffer]); };';
    url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    const part = new Float32Array(n), stats = [];
    let left = n, failed = false;
    for (let k = 0; k < n; k++) {
      const w = new Worker(url);
      workers.push(w);
      w.onmessage = (e) => {
        if (failed) return;
        if (e.data.r) { merge(e.data.r, k, n); stats[k] = e.data.r.stats; w.terminate(); if (--left === 0) { URL.revokeObjectURL(url); onDone(out, stats, n + ' workers'); } }
        else { part[k] = e.data.p; let s = 0; for (let i = 0; i < n; i++) s += part[i]; onProgress(s / n); }
      };
      w.onerror = () => { if (failed) return; failed = true; for (const x of workers) x.terminate(); local(); };
      w.postMessage(Object.assign({}, input, { mod: n, rem: k }));
    }
  } catch (err) {
    for (const x of workers) x.terminate();
    local();
  }
}

// ---------- 55-town.js : the streets, houses and trees below the balcony ----------
// Everything lies south of the block, where the windows look. The far ring of hills and towers is the painted
// panorama; this fills the 230 m in front of it with things that shift as you walk.
const TOWN_R = 232;

function makeTown(groundY, toSun) {
  const R = rng(4242), cx = MIDX, cz = MIDZ;
  const houses = [], trees = [], streets = [];
  // ---- layout: four rows of houses with streets between them ----
  const rows = [46, 94, 143, 192];
  for (let i = 0; i < rows.length; i++) {
    let x = cx - 214 + R() * 12;
    while (x < cx + 205) {
      const w = 20 + R() * 26, d = 12.5 + R() * 3.5, tall = i >= 2 && R() < 0.24;
      const h = tall ? 34 + R() * 16 : [9, 12, 15, 18][i] + Math.round(R() * [2, 3, 4, 5][i]) * 3;
      houses.push({ x0: x, x1: x + w, z0: rows[i] - d / 2, z1: rows[i] + d / 2, h, tint: (R() * 6) | 0 });
      x += w + 9 + R() * 15;
    }
  }
  for (const z of [26, 70, 118, 167]) streets.push({ a: [cx - TOWN_R, z], b: [cx + TOWN_R, z], w: 7 });
  for (const x of [cx - 138, cx - 52, cx + 44, cx + 131]) streets.push({ a: [x, 26], b: [x, cz + TOWN_R], w: 6 });
  const onStreet = (x, z, m) => streets.some((s) => (s.a[1] === s.b[1] ? Math.abs(z - s.a[1]) < s.w / 2 + m : Math.abs(x - s.a[0]) < s.w / 2 + m && z > 22));
  const inHouse = (x, z, m) => houses.some((b) => x > b.x0 - m && x < b.x1 + m && z > b.z0 - m && z < b.z1 + m);
  for (let i = 0; i < 520 && trees.length < 230; i++) {
    const x = cx + (R() - 0.5) * 420, z = 12 + R() * 205, r = 2.2 + R() * 2.3;
    if (onStreet(x, z, r * 0.6) || inHouse(x, z, r) || (Math.abs(x - cx) < 9 && z < 17)) continue;
    trees.push({ x, z, r, h: 4 + R() * 4.5, tone: R() });
  }

  // ---- ground picture drawn from the same layout ----
  const groundTex = tex(2048, 2048, (g, W, Hh) => {
    const k = W / (2 * TOWN_R), X = (x) => (x - cx + TOWN_R) * k, Z = (z) => (z - cz + TOWN_R) * k, Rg = rng(99);
    g.fillStyle = 'rgb(112,128,98)'; g.fillRect(0, 0, W, Hh);
    blotches(g, W, Hh, 260, Rg, 20, 90, 0.08);
    for (let i = 0; i < 2600; i++) { g.fillStyle = Rg() < 0.5 ? 'rgba(70,98,62,0.35)' : 'rgba(150,160,112,0.3)'; g.beginPath(); g.arc(Rg() * W, Rg() * Hh, 1 + Rg() * 3, 0, TAU); g.fill(); }
    // paved yards around the houses
    for (const b of houses) { g.fillStyle = 'rgba(176,170,158,0.55)'; g.fillRect(X(b.x0 - 3), Z(b.z0 - 3), (b.x1 - b.x0 + 6) * k, (b.z1 - b.z0 + 6) * k); }
    // the yard of this block: paths and a round sand playground
    g.strokeStyle = 'rgb(196,186,166)'; g.lineWidth = 1.6 * k; g.lineCap = 'round';
    g.beginPath(); g.moveTo(X(cx - 40), Z(14)); g.quadraticCurveTo(X(cx - 6), Z(21), X(cx + 34), Z(15)); g.moveTo(X(cx + 2), Z(11)); g.lineTo(X(cx + 4), Z(22.5)); g.stroke();
    g.fillStyle = 'rgb(206,190,150)'; g.beginPath(); g.arc(X(cx + 17), Z(18.5), 3.2 * k, 0, TAU); g.fill();
    g.fillStyle = 'rgb(196,84,60)'; g.fillRect(X(cx + 16), Z(17.6), 1.1 * k, 1.1 * k); g.fillStyle = 'rgb(70,120,170)'; g.fillRect(X(cx + 18.2), Z(19), 1.3 * k, 0.5 * k);
    // streets with pavements, centre dashes and parked cars
    const carCols = ['rgb(214,214,216)', 'rgb(52,54,60)', 'rgb(150,36,34)', 'rgb(40,70,120)', 'rgb(232,230,224)', 'rgb(110,112,116)', 'rgb(188,170,120)'];
    for (const s of streets) {
      const horiz = s.a[1] === s.b[1], len = horiz ? s.b[0] - s.a[0] : s.b[1] - s.a[1];
      const rect = (off0, off1, col) => { g.fillStyle = col; if (horiz) g.fillRect(X(s.a[0]), Z(s.a[1] + off0), len * k, (off1 - off0) * k); else g.fillRect(X(s.a[0] + off0), Z(s.a[1]), (off1 - off0) * k, len * k); };
      rect(-s.w / 2 - 1.8, s.w / 2 + 1.8, 'rgb(184,180,170)');
      rect(-s.w / 2, s.w / 2, 'rgb(104,106,108)');
      g.fillStyle = 'rgba(236,234,224,0.8)';
      for (let t = 2; t < len; t += 7) { if (horiz) g.fillRect(X(s.a[0] + t), Z(s.a[1] - 0.08), 3 * k, 0.16 * k); else g.fillRect(X(s.a[0] - 0.08), Z(s.a[1] + t), 0.16 * k, 3 * k); }
      for (const side of [-1, 1]) for (let t = 4; t < len - 6; t += 5.6) {
        if (Rg() < 0.45) continue;
        const o = side * (s.w / 2 - 1.15);
        g.fillStyle = carCols[(Rg() * carCols.length) | 0];
        if (horiz) g.fillRect(X(s.a[0] + t), Z(s.a[1] + o - 0.9), 4.3 * k, 1.8 * k); else g.fillRect(X(s.a[0] + o - 0.9), Z(s.a[1] + t), 1.8 * k, 4.3 * k);
        g.fillStyle = 'rgba(20,26,34,0.55)';
        if (horiz) g.fillRect(X(s.a[0] + t + 1.1), Z(s.a[1] + o - 0.75), 2.0 * k, 1.5 * k); else g.fillRect(X(s.a[0] + o - 0.75), Z(s.a[1] + t + 1.1), 1.5 * k, 2.0 * k);
      }
    }
    // shadows fall away from the sun
    const sl = 1 / Math.tan(Math.asin(toSun[1])), sh = Math.hypot(toSun[0], toSun[2]), sx = -toSun[0] / sh * sl, sz = -toSun[2] / sh * sl;
    g.fillStyle = 'rgba(18,26,30,0.36)';
    for (const b of houses) {
      const dx = sx * b.h, dz = sz * b.h, P = [[b.x0, b.z0], [b.x1, b.z0], [b.x1, b.z1], [b.x0, b.z1]], Q = P.map((p) => [p[0] + dx, p[1] + dz]);
      for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; g.beginPath(); g.moveTo(X(P[i][0]), Z(P[i][1])); g.lineTo(X(P[j][0]), Z(P[j][1])); g.lineTo(X(Q[j][0]), Z(Q[j][1])); g.lineTo(X(Q[i][0]), Z(Q[i][1])); g.closePath(); g.fill(); }
      g.fillRect(X(b.x0 + dx), Z(b.z0 + dz), (b.x1 - b.x0) * k, (b.z1 - b.z0) * k);
    }
    for (const t of trees) { g.beginPath(); g.ellipse(X(t.x + sx * t.h * 0.7), Z(t.z + sz * t.h * 0.7), t.r * 1.1 * k, t.r * 0.9 * k, 0, 0, TAU); g.fill(); }
  }, { clamp: true });

  // ---- house fronts: eight by eight window bays, repeated ----
  const facade = (night) => tex(256, 256, (g, W, Hh) => {
    const Rf = rng(night ? 7 : 6);
    g.fillStyle = night ? 'rgb(44,46,58)' : 'rgb(255,255,255)'; g.fillRect(0, 0, W, Hh);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) {
      const lit = night && Rf() < 0.34;
      g.fillStyle = lit ? (Rf() < 0.75 ? 'rgb(255,214,150)' : 'rgb(214,230,255)') : (night ? 'rgb(16,18,26)' : 'rgb(86,104,128)');
      g.fillRect(i * 32 + 8, j * 32 + 7, 16, 17);
      if (!night) { g.fillStyle = 'rgba(255,255,255,0.28)'; g.fillRect(i * 32 + 8, j * 32 + 7, 16, 5); }
    }
  });
  const fronts = [facade(false), facade(true)];
  const tints = ['rgb(232,226,214)', 'rgb(214,210,204)', 'rgb(240,236,228)', 'rgb(206,188,172)', 'rgb(220,216,224)', 'rgb(190,196,202)'].map((c) => new T.Color(c));
  const pos = [], uv = [], col = [], idx = [];
  const quad = (p, uvs, c, shade) => {
    const base = pos.length / 3;
    for (let i = 0; i < 4; i++) { pos.push(p[i][0], p[i][1], p[i][2]); uv.push(uvs[i][0], uvs[i][1]); col.push(c.r * shade[0], c.g * shade[1], c.b * shade[2]); }
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  for (const b of houses) {
    const c = tints[b.tint], y0 = groundY, y1 = groundY + b.h, w = (b.x1 - b.x0) / 3.2 / 8, d = (b.z1 - b.z0) / 3.2 / 8, fl = b.h / 3 / 8, o = R();
    const wall = (ax, az, bx, bz, n, shade) => quad([[ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az]], [[o, 0], [o + n, 0], [o + n, fl], [o, fl]], c, shade);
    wall(b.x1, b.z0, b.x0, b.z0, w, [0.6, 0.64, 0.72]);         // north front, in shade: the one the flat looks at
    wall(b.x0, b.z1, b.x1, b.z1, w, [1.0, 0.98, 0.94]);         // south, in the sun
    wall(b.x0, b.z0, b.x0, b.z1, d, [0.88, 0.86, 0.84]);        // west
    wall(b.x1, b.z1, b.x1, b.z0, d, [0.66, 0.69, 0.76]);        // east
    const pl = [0.008, 0.008];
    quad([[b.x0, y1, b.z1], [b.x1, y1, b.z1], [b.x1, y1, b.z0], [b.x0, y1, b.z0]], [pl, pl, pl, pl], c, [0.8, 0.79, 0.77]);
    quad([[b.x0 + 1.5, y1 + 0.02, b.z1 - 1.5], [b.x1 - 1.5, y1 + 0.02, b.z1 - 1.5], [b.x1 - 1.5, y1 + 0.02, b.z0 + 1.5], [b.x0 + 1.5, y1 + 0.02, b.z0 + 1.5]], [pl, pl, pl, pl], c, [0.56, 0.56, 0.57]);   // roof felt inside the parapet
  }
  const hg = new T.BufferGeometry();
  hg.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  hg.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  hg.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  hg.setIndex(idx);
  const houseMat = new T.MeshBasicMaterial({ map: fronts[0], vertexColors: true, toneMapped: false, transparent: true });
  const houseMesh = new T.Mesh(hg, houseMat);
  houseMesh.renderOrder = -2;

  // ---- trees: low blobs, lighter on the sunny side ----
  const tp = [], tc = [], ico = [new T.IcosahedronGeometry(1, 1), new T.IcosahedronGeometry(1, 0)], v = new T.Vector3(), cA = new T.Color('rgb(58,98,50)'), cB = new T.Color('rgb(104,134,62)'), cc = new T.Color();
  for (const t of trees) {
    const near = t.z < 80, g = ico[near ? 0 : 1], P = g.attributes.position;
    cc.copy(cA).lerp(cB, t.tone);
    // near trees are a clump of three blobs, far ones a single one
    const blobs = near ? [[0, 0, 0, 1], [0.62, -0.16, 0.2, 0.66], [-0.45, 0.1, -0.5, 0.6]] : [[0, 0, 0, 1]];
    for (const [bx, by, bz, bs] of blobs) {
      for (let i = 0; i < P.count; i++) {
        v.fromBufferAttribute(P, i);
        const lit = 0.5 + 0.5 * clamp(0.5 + 0.6 * (v.x * toSun[0] + v.y * toSun[1] + v.z * toSun[2]), 0, 1);
        tp.push(t.x + (bx + v.x * bs) * t.r, groundY + t.h + (by + v.y * bs * 0.82) * t.r, t.z + (bz + v.z * bs) * t.r);
        tc.push(cc.r * lit, cc.g * lit, cc.b * lit);
      }
    }
  }
  const tg = new T.BufferGeometry();
  tg.setAttribute('position', new T.Float32BufferAttribute(tp, 3));
  tg.setAttribute('color', new T.Float32BufferAttribute(tc, 3));
  const treeMat = new T.MeshBasicMaterial({ vertexColors: true, toneMapped: false, transparent: true });
  const treeMesh = new T.Mesh(tg, treeMat);
  treeMesh.renderOrder = -1.5;

  return {
    groundTex, meshes: [houseMesh, treeMesh], mats: [houseMat, treeMat], textures: [groundTex, fronts[0], fronts[1]],
    night(on) { houseMat.map = fronts[on ? 1 : 0]; houseMat.color.setScalar(on ? 0.75 : 1); treeMat.color.setScalar(on ? 0.1 : 1); },
  };
}

// ---------- 60-app.js : scene, daylight, the plan view, walking, the HUD ----------
const EYE = 1.62, RAD = 0.2, FOV_WALK = 68, FOV_PLAN = 26;
// Everything below that depends on the flat comes from FLAT (its data file) or from BOUNDS, the box around it.
const [BX0, BZ0, BX1, BZ1] = FLAT.bounds;
const MIDX = (BX0 + BX1) / 2, MIDZ = (BZ0 + BZ1) / 2;   // camera target, centre of the town
const REST = Object.fromEntries(FLAT.openings.concat((FLAT.slants || []).flatMap((s) => s.ops || [])).filter((o) => o.rest).map((o) => [o.id, o.rest]));   // how far each door stands open in the render
const START = FLAT.start;                             // [x, z, yaw in degrees]: where a walk starts, inside the entrance
// Afternoon sun from the south-west, 36 degrees up: it reaches the living room floor and crosses the bedroom.
const TOSUN = (() => { const el = 36 * DEG, az = 27 * DEG; return [-Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)]; })();
const LIGHT = { sunCol: [1.0, 0.9, 0.74], sunI: 13, skyZ: [3.2, 4.6, 7.0], skyH: [6.4, 6.9, 7.3], ground: [2.4, 2.2, 1.9], gain: 1.6 };
const BACK = new T.Color(0x24262a);                    // behind everything while walking; never seen unless two surfaces part by a hair
const LOOKS = [
  { A: [1, 1, 1], B: [2.2, 2.2, 2.2], C: [0, 0, 0], exp: 1.0, sun: 1, eve: [0.8, 0.8, 0.78], glowB: 0.45, glowC: 0 },              // day
  { A: [0.03, 0.04, 0.07], B: [2.5, 2.2, 1.8], C: [1.5, 1.32, 1.05], exp: 1.0, sun: 0, eve: [2.6, 2.2, 1.6], glowB: 0.8, glowC: 0.7 },    // evening
];
const MAPR = FLAT.map;                                // what the key plan shows: { x0, z0, w, d }, from build.mjs
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

async function boot() {
  const canvas = $('view'), app = $('app');
  const setStage = (txt, f) => { $('stage').textContent = txt; $('bar').style.width = Math.round(f * 100) + '%'; };
  const paint = () => new Promise((r) => { let done = false; const go = () => { if (!done) { done = true; r(); } }; requestAnimationFrame(() => setTimeout(go, 0)); setTimeout(go, 150); });
  const coarse = matchMedia('(pointer: coarse)').matches, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (err) { setStage('This page needs WebGL, and this browser or device has it switched off.', 0); return; }
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(FOV_PLAN, 1, 0.06, 1600);
  scene.add(camera);

  // S: everything that changes while the page runs
  const S = {
    mode: 'plan', fly: null, x: START[0], z: START[1], yaw: START[2] * DEG, pitch: 0, vx: 0, vz: 0, bob: 0,
    theta: 0, phi: 0, dist: 24, userView: false, eve: 0, eveWant: 0, locked: false, noLock: false, touch: coarse,
    room: null, dirty: 3, pr: Math.min(window.devicePixelRatio || 1, coarse ? 2 : 1.5), ready: false,
  };

  // ---- build ----
  await paint();
  initMaterials(renderer.capabilities.getMaxAnisotropy());
  buildPlan();
  setStage('Moving the furniture in…', 0.12);
  await paint();
  // furniture moved, turned, added or taken away in this browser (the Furniture panel), kept per flat
  const FURN_KEY = 'flat3d:' + FLAT.name + ':furniture', DESIGN = JSON.stringify(FLAT.furniture || []);
  const BASE = (() => { let h = 2166136261; for (let i = 0; i < DESIGN.length; i++) h = Math.imul(h ^ DESIGN.charCodeAt(i), 16777619); return (h >>> 0).toString(36); })();
  try {
    const s = JSON.parse(localStorage.getItem(FURN_KEY) || 'null');
    if (s && s.base === BASE && Array.isArray(s.list) && s.list.every((p) => p && PIECES[p.t])) FLAT.furniture = s.list;
  } catch (err) { /* nothing kept, or storage is off */ }
  buildFurniture();
  const world = new T.Group(), ceilGroup = new T.Group(), capGroup = new T.Group();
  scene.add(world);
  buildMeshes(STATIC, world);
  buildMeshes(CEIL, ceilGroup);
  buildMeshes(CAPS, capGroup);
  world.add(ceilGroup, capGroup);
  // furniture, kept apart so the "Empty" button can hide it (its ceiling parts and plan caps follow their own groups);
  // each piece has its own three groups (rec.g), so it can be moved on its own
  const furnGroup = new T.Group(), furnCeil = new T.Group(), furnCaps = new T.Group();
  world.add(furnGroup); ceilGroup.add(furnCeil); capGroup.add(furnCaps);
  const meshPiece = (rec) => {
    rec.g = [new T.Group(), new T.Group(), new T.Group()];
    buildMeshes(rec.map, rec.g[0]); buildMeshes(rec.ceil, rec.g[1]); buildMeshes(rec.caps, rec.g[2]);
    rec.map = rec.ceil = rec.caps = null;
    furnGroup.add(rec.g[0]); furnCeil.add(rec.g[1]); furnCaps.add(rec.g[2]);
    for (const g of rec.g) { g.traverse((o) => { if (o.isMesh) o.userData.rec = rec; }); g.updateMatrixWorld(true); }
  };
  for (const rec of PIECE_RECS) meshPiece(rec);
  const isFurn = (o) => { for (let p = o; p; p = p.parent) if (p === furnGroup || p === furnCeil || p === furnCaps) return true; return false; };

  const poseDoor = (d) => {
    if (d.type === 'swing') {
      const yaw = d.yaw0 + d.swing * d.t, c = Math.cos(yaw), s = Math.sin(yaw);
      d.group.position.set(d.hx, 0, d.hz);
      d.group.rotation.y = yaw;
      d.col = { k: 2, x: d.hx + c * d.w / 2, z: d.hz - s * d.w / 2, hx: d.w / 2, hz: 0.03, c, s };
    } else {
      if (d.axis === 'z') {                              // a pane sliding along Z: its frame is turned so local +x runs south
        const z = d.hz + d.slide * d.t;
        d.group.position.set(d.hx, 0, z); d.group.rotation.y = -PI / 2;
        d.col = { k: 0, x0: d.hx - 0.03, z0: z, x1: d.hx + 0.03, z1: z + d.w };
      } else {
        const x = d.hx + d.slide * d.t;
        d.group.position.set(x, 0, d.hz);
        d.col = { k: 0, x0: x, z0: d.hz - 0.03, x1: x + d.w, z1: d.hz + 0.03 };
      }
    }
  };
  for (const d of DOORS) {
    d.group = new T.Group();
    buildMeshes(d.map, d.group);
    world.add(d.group);
    d.rest = REST[d.id] || 0;
    d.t = d.want = d.rest;
    poseDoor(d);
  }
  world.updateMatrixWorld(true);

  // ---- sun, with one shadow map that is only redrawn when a door moves ----
  const sun = new T.DirectionalLight(new T.Color(LIGHT.sunCol[0], LIGHT.sunCol[1], LIGHT.sunCol[2]), LIGHT.sunI);
  sun.position.set(MIDX + TOSUN[0] * 40, 1.3 + TOSUN[1] * 40, MIDZ + TOSUN[2] * 40);
  sun.target.position.set(MIDX, 1.3, MIDZ);
  sun.castShadow = true;
  const bigMap = renderer.capabilities.maxTextureSize >= 8192 && !coarse;
  sun.shadow.mapSize.set(bigMap ? 4096 : 2048, bigMap ? 4096 : 2048);
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);
  {
    const cam = sun.shadow.camera, v = new T.Vector3();
    sun.updateMatrixWorld(); sun.target.updateMatrixWorld();
    cam.position.copy(sun.position); cam.lookAt(sun.target.position); cam.updateMatrixWorld();
    const inv = cam.matrixWorld.clone().invert();
    let l = 1e9, r = -1e9, b = 1e9, t = -1e9, n = 1e9, f = -1e9;
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? BX1 + 0.2 : BX0 - 0.2, i & 2 ? 3.1 : -0.35, i & 4 ? BZ1 + 0.23 : BZ0 - 0.2).applyMatrix4(inv);
      l = Math.min(l, v.x); r = Math.max(r, v.x); b = Math.min(b, v.y); t = Math.max(t, v.y); n = Math.min(n, -v.z); f = Math.max(f, -v.z);
    }
    cam.left = l - 0.1; cam.right = r + 0.1; cam.bottom = b - 0.1; cam.top = t + 0.1; cam.near = n - 0.5; cam.far = f + 0.5;
    cam.updateProjectionMatrix();
  }
  // the floor above: never drawn, but it keeps the sun out
  const unseen = new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  unseen.shadowSide = T.DoubleSide;                   // its top face must count, or sunlight creeps in under its underside
  for (const [x0, z0, x1, z1] of PLAN.roof) {
    const m = new T.Mesh(new T.BoxGeometry(x1 - x0, 0.3, z1 - z0), unseen);
    m.position.set((x0 + x1) / 2, H + 0.15, (z0 + z1) / 2);
    m.castShadow = true;
    m.userData.noPick = true;
    world.add(m);
  }

  // ---- the town outside: sky, a ring of hills and houses, the streets below ----
  const ext = new T.Group();
  const flat = (o) => new T.MeshBasicMaterial(Object.assign({ fog: false, toneMapped: false, depthWrite: false, transparent: true }, o));
  const clouds = (g, W, Hh) => {
    const R = rng(5);
    for (let i = 0; i < 30; i++) {
      const x = R() * W, y = Hh * (0.2 + R() * 0.26), rx = 40 + R() * 120, ry = 5 + R() * 13;
      for (const ox of [-W, 0, W]) {
        const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
        gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.save(); g.translate(x + ox, y); g.scale(rx, ry); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 1, 0, TAU); g.fill(); g.restore();
      }
    }
  };
  const stars = (g, W, Hh) => { const R = rng(8); for (let i = 0; i < 380; i++) { g.fillStyle = 'rgba(255,255,255,' + (0.2 + R() * 0.55) + ')'; const s = 0.6 + R() * 0.7; g.fillRect(R() * W, R() * Hh * 0.42, s, s); } };
  const skyTex = [false, true].map((night) => tex(night ? 2048 : 1024, night ? 1024 : 512, (g, W, Hh) => { drawSky(g, W, Hh, night); if (night) stars(g, W, Hh); else clouds(g, W, Hh); }, { clamp: true }));
  const panoTex = [texPanorama(false), texPanorama(true)];
  for (const t of panoTex) t.wrapT = T.ClampToEdgeWrapping;   // the ring repeats sideways only
  const sky = new T.Mesh(new T.SphereGeometry(900, 40, 20), flat({ map: skyTex[0], side: T.BackSide }));
  sky.position.set(MIDX, EYE, MIDZ); sky.renderOrder = -5;
  const pano = new T.Mesh(new T.CylinderGeometry(PANO.R, PANO.R, PANO.hi - PANO.lo, 96, 1, true), flat({ map: panoTex[0], side: T.BackSide }));
  pano.position.set(MIDX, EYE + (PANO.hi + PANO.lo) / 2, MIDZ); pano.renderOrder = -3;
  const town = makeTown(EYE + PANO.lo, TOSUN);
  const ground = new T.Mesh(new T.CircleGeometry(TOWN_R, 64).rotateX(-PI / 2), flat({ map: town.groundTex }));
  ground.position.set(MIDX, EYE + PANO.lo, MIDZ); ground.renderOrder = -4;
  const sunDisc = new T.Sprite(new T.SpriteMaterial({ map: TEX.glow, color: new T.Color(1, 0.94, 0.8), blending: T.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
  sunDisc.position.set(MIDX + TOSUN[0] * 850, EYE + TOSUN[1] * 850, MIDZ + TOSUN[2] * 850); sunDisc.scale.setScalar(420); sunDisc.renderOrder = -4.5;
  ext.add(sky, ground, pano, sunDisc, town.meshes[0], town.meshes[1]);
  scene.add(ext);
  const hazes = [new T.Color(0xc6d3df), new T.Color(0x1c2233)];
  scene.fog = new T.Fog(hazes[0], 90, 560);              // only reaches the town; the rooms are far too near to haze

  // ---- reflections: a small picture of a room with bright glazing to the south, or of lamplight ----
  const pm = new T.PMREMGenerator(renderer);
  const envOf = (night) => {
    const t = tex(256, 128, (g, W, Hh) => {
      const gr = g.createLinearGradient(0, 0, 0, Hh);
      if (night) { gr.addColorStop(0, 'rgb(58,50,42)'); gr.addColorStop(0.45, 'rgb(82,68,54)'); gr.addColorStop(0.56, 'rgb(46,38,31)'); gr.addColorStop(1, 'rgb(24,20,16)'); }
      else { gr.addColorStop(0, 'rgb(216,214,208)'); gr.addColorStop(0.45, 'rgb(178,174,166)'); gr.addColorStop(0.56, 'rgb(122,110,96)'); gr.addColorStop(1, 'rgb(88,74,60)'); }
      g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
      if (night) { g.fillStyle = 'rgb(255,206,140)'; for (const [u, v, r] of [[0.3, 0.42, 5], [0.55, 0.36, 6], [0.9, 0.44, 5], [0.72, 0.3, 4]]) { g.beginPath(); g.arc(u * W, v * Hh, r, 0, TAU); g.fill(); } }
      else { g.fillStyle = 'rgb(255,255,255)'; g.fillRect(0.69 * W, 0.2 * Hh, 0.12 * W, 0.32 * Hh); g.fillStyle = 'rgb(236,242,250)'; g.fillRect(0.88 * W, 0.26 * Hh, 0.04 * W, 0.2 * Hh); }
    }, { clamp: true });
    t.mapping = T.EquirectangularReflectionMapping;
    const out = pm.fromEquirectangular(t).texture;
    t.dispose();
    return out;
  };
  const envs = [envOf(false), envOf(true)];
  pm.dispose();
  scene.environment = envs[0];

  // ---- looking glasses: each shows the room as seen from behind the glass, drawn only while it can be seen ----
  const mirrors = [];
  let mirrorsOk = true;
  const hdr = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
  const makeMirror = (M) => {
    {
      const rt = new T.WebGLRenderTarget(512, 512, { type: hdr ? T.HalfFloatType : T.UnsignedByteType, samples: renderer.capabilities.isWebGL2 ? 4 : 0 });
      const texM = new T.Matrix4();
      const mat = new T.ShaderMaterial({
        uniforms: { tMap: { value: rt.texture }, texM: { value: texM }, tint: { value: new T.Color(0.9, 0.93, 0.94) } },
        vertexShader: 'uniform mat4 texM;\nvarying vec4 vP;\nvoid main() {\n\tvP = texM * modelMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
        fragmentShader: 'uniform sampler2D tMap;\nuniform vec3 tint;\nvarying vec4 vP;\nvoid main() {\n\tgl_FragColor = vec4( texture2DProj( tMap, vP ).rgb * tint, 1.0 );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}',
      });
      const mesh = new T.Mesh(M.kind === 'disc' ? new T.CircleGeometry(M.r, 48) : new T.PlaneGeometry(M.w, M.h), mat);
      const n = new T.Vector3(M.n[0], M.n[1], M.n[2]);
      mesh.position.set(M.p[0], M.p[1], M.p[2]);
      mesh.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), n);
      world.add(mesh);
      const m = { M, furn: !!M.furn, zone: M.zone, mesh, rt, texM, n, p: mesh.position.clone(), cam: new T.PerspectiveCamera(), drawn: false };
      mirrors.push(m);
      return m;
    }
  };
  try { for (const M of MIRRORS) makeMirror(M); } catch (err) { mirrorsOk = false; for (const m of mirrors) world.remove(m.mesh); mirrors.length = 0; }
  const _mv = new T.Vector3(), _mt = new T.Vector3(), _mr = new T.Matrix4(), _mpl = new T.Plane(), _mq = new T.Vector4(), _mc = new T.Vector4(), _fr = new T.Frustum(), _pm = new T.Matrix4();
  const drawMirrors = (force) => {
    if (!mirrors.length) return;
    camera.updateMatrixWorld();
    _fr.setFromProjectionMatrix(_pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    for (const m of mirrors) {
      if (m.off) continue;
      const z = m.zone, eye = camera.position;
      if (!force && m.drawn && (eye.x < z[0] || eye.x > z[2] || eye.z < z[1] || eye.z > z[3] || eye.y > H)) continue;
      _mv.subVectors(m.p, eye);
      if (_mv.dot(m.n) > -0.02) continue;                 // the eye is behind the glass
      if (!force && m.drawn && !_fr.intersectsObject(m.mesh)) continue;
      _mv.reflect(m.n).negate().add(m.p);                 // the eye, mirrored
      _mr.extractRotation(camera.matrixWorld);
      _mt.set(0, 0, -1).applyMatrix4(_mr).add(eye);
      _mt.subVectors(m.p, _mt).reflect(m.n).negate().add(m.p);
      const c = m.cam;
      c.position.copy(_mv);
      c.up.set(0, 1, 0).applyMatrix4(_mr).reflect(m.n);
      c.lookAt(_mt);
      c.far = camera.far;
      c.updateMatrixWorld();
      c.projectionMatrix.copy(camera.projectionMatrix);
      m.texM.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1).multiply(c.projectionMatrix).multiply(c.matrixWorldInverse);
      // push the near plane onto the glass so nothing behind the wall gets into the picture
      _mpl.setFromNormalAndCoplanarPoint(m.n, m.p).applyMatrix4(c.matrixWorldInverse);
      _mc.set(_mpl.normal.x, _mpl.normal.y, _mpl.normal.z, _mpl.constant);
      const e = c.projectionMatrix.elements;
      _mq.set((Math.sign(_mc.x) + e[8]) / e[0], (Math.sign(_mc.y) + e[9]) / e[5], -1, (1 + e[10]) / e[14]);
      _mc.multiplyScalar(2 / _mc.dot(_mq));
      e[2] = _mc.x; e[6] = _mc.y; e[10] = _mc.z + 1 - 0.003; e[14] = _mc.w;
      m.mesh.visible = false;
      renderer.setRenderTarget(m.rt);
      renderer.render(scene, c);
      renderer.setRenderTarget(null);
      m.mesh.visible = true;
      m.drawn = true;
    }
  };

  // ---- soft glow around every lamp ----
  const glows = [];
  const makeGlow = (L) => {
    if (!(L.glow > 0)) return null;
    const s = new T.Sprite(new T.SpriteMaterial({ map: TEX.glow, color: new T.Color(L.col[0], L.col[1], L.col[2]), blending: T.AdditiveBlending, depthWrite: false, fog: false, opacity: 0 }));
    s.position.set(L.p[0], L.p[1], L.p[2]);
    s.scale.setScalar(L.glow);
    s.userData.ch = L.ch;
    s.userData.high = L.p[1] > 2.1;
    s.userData.furn = !!L.furn;
    s.userData.L = L;
    glows.push(s);
    scene.add(s);
    return s;
  };
  for (const L of LAMPS) makeGlow(L);

  // ---- the light bake ----
  setStage('Working out the light…', 0.2);
  await paint();
  const baked = [];
  world.traverse((o) => { if (o.isMesh && o.material.userData && o.material.userData.bake) baked.push(o); });
  // bakes the light onto `baked` meshes with the given stand-ins and lamps (also used again for the emptied flat)
  const bakeInto = (baked, occ, lamps, onProg) => new Promise((resolve) => {
    let n = 0;
    for (const m of baked) n += m.geometry.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), flg = new Uint8Array(n), v = new T.Vector3(), nm = new T.Matrix3();
    let o = 0;
    for (const m of baked) {
      const P = m.geometry.attributes.position, N = m.geometry.attributes.normal, f = m.userData.flg, ud = m.material.userData, add = (ud.fine ? 1 : 0) | (ud.two ? 4 : 0);
      nm.getNormalMatrix(m.matrixWorld);
      for (let i = 0; i < P.count; i++, o++) {
        v.fromBufferAttribute(P, i).applyMatrix4(m.matrixWorld);
        pos[o * 3] = v.x; pos[o * 3 + 1] = v.y; pos[o * 3 + 2] = v.z;
        v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
        nor[o * 3] = v.x; nor[o * 3 + 1] = v.y; nor[o * 3 + 2] = v.z;
        flg[o] = (f[i] || 0) | add;
      }
    }
    const input = {
      boxes: occ.box, alb: occ.alb, pos, nor, flg,
      sun: { dir: TOSUN, col: LIGHT.sunCol.map((c) => c * LIGHT.sunI) }, skyZ: LIGHT.skyZ, skyH: LIGHT.skyH, ground: LIGHT.ground,
      indoor: ROOMS.filter((r) => !r.outdoor).flatMap((r) => r.poly ? r.rects.concat(polyStrips(r.poly, 0.1)) : r.rects),
      open: OPEN.filter((o) => o.glass).map((o) => {   // each glazed opening, as a light source facing into the room
        const mid = (o.at[0] + o.at[1]) / 2, out = o.inner === o.at[0] ? 1 : -1, hu = (o.b - o.a) / 2, hv = (o.head - o.sill) / 2, c = (o.a + o.b) / 2;
        const nu = Math.max(3, Math.round(hu * 8.5)), nv = Math.round(hv * 9);
        return o.axis === 'x'
          ? { c: [c, o.sill + hv, mid], n: [0, 0, -out], u: [hu, 0, 0], v: [0, hv, 0], nu, nv, T: 0.82 }
          : { c: [mid, o.sill + hv, c], n: [-out, 0, 0], u: [0, 0, hu], v: [0, hv, 0], nu, nv, T: 0.82 };
      }).concat(SLANT_OPEN),
      grid: [BX0 - 1.5, BZ0 - 1.5, Math.ceil((BX1 - BX0 + 3) / 0.5 - 1e-6), Math.ceil((BZ1 - BZ0 + 3) / 0.5 - 1e-6)],
      patchBox: [BX0 + 0.05, BX1 - 0.05, BZ0 + 0.05, BZ1 + 0.08],
      lamps: lamps.map((L) => ({ p: L.p, I: L.I, col: L.col, ch: L.ch, down: L.down, r2: Math.min(64, L.I / 0.006) })),
      probe: { x0: BX0 + 0.4, y0: 0.3, z0: BZ0 + 0.4, dx: 0.52, dy: 0.7, dz: 0.5, nx: Math.ceil((BX1 - BX0 - 0.8) / 0.52) + 1, ny: 4, nz: Math.ceil((BZ1 - BZ0 - 0.8) / 0.5) + 1 }, patch: 0.5, tail: 1.5, gain: LIGHT.gain,
    };
    // Evens out the light on walls, floors and ceilings: each vertex moves halfway to the mean of its neighbours, twice.
    const soften = (m) => {
      const g = m.geometry, ix = g.index.array, c = g.attributes.position.count, nb = new Array(c);
      for (let i = 0; i < c; i++) nb[i] = [];
      for (let t = 0; t < ix.length; t += 3) for (let e = 0; e < 3; e++) { const a = ix[t + e], b = ix[t + (e + 1) % 3]; if (!nb[a].includes(b)) nb[a].push(b); if (!nb[b].includes(a)) nb[b].push(a); }
      const A = g.attributes.bakeA.array, B = g.attributes.bakeB.array, C = g.attributes.bakeC.array, lit = new Uint8Array(c);
      for (let i = 0; i < c * 3; i++) if (A[i] + B[i] + C[i] > 0) lit[(i / 3) | 0] = 1;
      for (const arr of [A, B, C]) for (let it = 0; it < 2; it++) {
        const src = arr.slice();
        for (let i = 0; i < c; i++) {
          if (!lit[i]) continue;
          let r = 0, gg = 0, b = 0, k = 0;
          for (const j of nb[i]) if (lit[j]) { r += src[j * 3]; gg += src[j * 3 + 1]; b += src[j * 3 + 2]; k++; }
          if (k) { arr[i * 3] = 0.5 * src[i * 3] + 0.5 * r / k; arr[i * 3 + 1] = 0.5 * src[i * 3 + 1] + 0.5 * gg / k; arr[i * 3 + 2] = 0.5 * src[i * 3 + 2] + 0.5 * b / k; }
        }
      }
    };
    runBake(input, onProg, (out, stats, how) => {
      let k = 0;
      for (const m of baked) {
        const c = m.geometry.attributes.position.count;
        for (const ch of ['A', 'B', 'C']) { const a = m.geometry.attributes['bake' + ch]; a.array.set(out[ch].subarray(k * 3, (k + c) * 3)); a.needsUpdate = true; }
        if (m.material.userData.fine) soften(m);
        k += c;
      }
      resolve({ how, vertices: n, solids: occ.box.length / 6, ms: Math.max(...stats.map((s) => s.ms)), rays: stats.reduce((a, s) => a + s.rays, 0), patches: stats[0].patches, buried: stats.reduce((a, s) => a + s.buried, 0) });
    });
  });
  // the shell's light stand-ins and those of every piece of furniture
  const occAll = () => {
    const box = OCC.box.slice(), alb = OCC.alb.slice();
    for (const r of PIECE_RECS) if (r.p) { for (const v of r.occBox) box.push(v); for (const v of r.occAlb) alb.push(v); }
    return { box: new Float32Array(box), alb: new Float32Array(alb) };
  };
  const bakeStats = await bakeInto(baked, occAll(), LAMPS, (p) => setStage('Working out the light…', 0.2 + 0.8 * p));

  // ---- day and evening ----
  const applyLook = () => {
    const a = LOOKS[0], b = LOOKS[1], e = S.eve, mix = (p, q) => p + (q - p) * e;
    UNI.uBA.value.set(mix(a.A[0], b.A[0]), mix(a.A[1], b.A[1]), mix(a.A[2], b.A[2]));
    UNI.uBB.value.set(mix(a.B[0], b.B[0]), mix(a.B[1], b.B[1]), mix(a.B[2], b.B[2]));
    UNI.uBC.value.set(mix(a.C[0], b.C[0]), mix(a.C[1], b.C[1]), mix(a.C[2], b.C[2]));
    renderer.toneMappingExposure = mix(a.exp, b.exp);
    sun.intensity = LIGHT.sunI * mix(a.sun, b.sun);
    MAT.lampEve.color.setRGB(mix(a.eve[0], b.eve[0]), mix(a.eve[1], b.eve[1]), mix(a.eve[2], b.eve[2]));
    for (const s of glows) s.material.opacity = s.userData.ch === 2 ? mix(a.glowC, b.glowC) : mix(a.glowB, b.glowB);
    const night = e > 0.5 ? 1 : 0;
    sky.material.map = skyTex[night]; pano.material.map = panoTex[night]; scene.environment = envs[night];
    sunDisc.visible = !night;
    ground.material.color.setScalar(night ? 0.16 : 1);
    town.night(night);
    scene.fog.color.copy(hazes[night]);
    S.dirty = 3;
  };

  // ---- theme ----
  let stageCol = new T.Color(0xe9e6de), markCol = '#d4551a', inkCol = '#1e2327';
  const readTheme = () => {
    const cs = getComputedStyle(document.documentElement);
    try { stageCol = new T.Color(cs.getPropertyValue('--stage').trim() || '#e9e6de'); } catch (err) { /* keep the last colour */ }
    markCol = cs.getPropertyValue('--mark').trim() || markCol;
    inkCol = cs.getPropertyValue('--ink').trim() || inkCol;
    scene.background = S.mode === 'walk' ? BACK : stageCol;
  };

  // ---- cameras ----
  const _up = new T.Vector3(), _tgt = new T.Vector3(), _m = new T.Matrix4(), _eu = new T.Euler(0, 0, 0, 'YXZ'), _v = new T.Vector3();
  const fitDist = () => Math.max(BZ1 - BZ0 + 1.68, (BX1 - BX0 + 1.75) / camera.aspect) / (2 * Math.tan(FOV_PLAN * DEG / 2));
  const planPose = (pos, quat) => {
    const sp = Math.sin(S.phi), cp = Math.cos(S.phi), st = Math.sin(S.theta), ct = Math.cos(S.theta);
    pos.set(MIDX + S.dist * sp * st, 0.9 + S.dist * cp, MIDZ + S.dist * sp * ct);
    _up.set(-st * cp, sp, -ct * cp);                    // keeps north at the top when looking straight down
    quat.setFromRotationMatrix(_m.lookAt(pos, _tgt.set(MIDX, 0.9, MIDZ), _up));
  };
  const walkPose = (pos, quat) => { pos.set(S.x, EYE + S.bob, S.z); quat.setFromEuler(_eu.set(S.pitch, S.yaw, 0, 'YXZ')); };

  // ---- standing room: colliders, rooms, free spots ----
  const hit = (c, x, z, r) => {
    if (c.k === 0) { const dx = x - clamp(x, c.x0, c.x1), dz = z - clamp(z, c.z0, c.z1); return dx * dx + dz * dz < r * r; }
    if (c.k === 1) { const dx = x - c.x, dz = z - c.z, rr = r + c.r; return dx * dx + dz * dz < rr * rr; }
    const dx = x - c.x, dz = z - c.z, lx = dx * c.c - dz * c.s, lz = dx * c.s + dz * c.c, ex = lx - clamp(lx, -c.hx, c.hx), ez = lz - clamp(lz, -c.hz, c.hz);
    return ex * ex + ez * ez < r * r;
  };
  const blockedAt = (x, z, r) => {
    for (const c of COL) if (!(S.empty && c.furn) && hit(c, x, z, r)) return true;
    for (const d of DOORS) if (hit(d.col, x, z, r)) return true;
    return false;
  };
  const roomAt = (x, z) => { for (const R of ROOMS) if (roomHas(R, x, z)) return R; return null; };
  const inFlat = (x, z) => x > BX0 + 0.1 && x < BX1 - 0.1 && z > BZ0 + 0.1 && z < BZ1 - 0.07;
  // Moves the point out of one collider; returns true if it had to.
  const pushOut = (p, c) => {
    if (c.k === 1) {
      const dx = p.x - c.x, dz = p.z - c.z, rr = RAD + c.r, d2 = dx * dx + dz * dz;
      if (d2 >= rr * rr) return false;
      const d = Math.sqrt(d2) || 1e-6;
      p.x = c.x + dx / d * rr; p.z = c.z + dz / d * rr;
      return true;
    }
    const rot = c.k === 2, ox = rot ? c.x : 0, oz = rot ? c.z : 0;
    let lx = p.x - ox, lz = p.z - oz, x0 = c.x0, x1 = c.x1, z0 = c.z0, z1 = c.z1;
    if (rot) { const dx = lx, dz = lz; lx = dx * c.c - dz * c.s; lz = dx * c.s + dz * c.c; x0 = -c.hx; x1 = c.hx; z0 = -c.hz; z1 = c.hz; }
    const ex = lx - clamp(lx, x0, x1), ez = lz - clamp(lz, z0, z1), d2 = ex * ex + ez * ez;
    if (d2 >= RAD * RAD) return false;
    if (d2 > 1e-12) { const d = Math.sqrt(d2), k = (RAD - d) / d; lx += ex * k; lz += ez * k; }
    else {                                              // centre inside: leave by the nearest side
      const a = lx - x0, b = x1 - lx, e = lz - z0, f = z1 - lz, m = Math.min(a, b, e, f);
      if (m === a) lx = x0 - RAD; else if (m === b) lx = x1 + RAD; else if (m === e) lz = z0 - RAD; else lz = z1 + RAD;
    }
    if (rot) { p.x = ox + lx * c.c + lz * c.s; p.z = oz - lx * c.s + lz * c.c; } else { p.x = lx; p.z = lz; }
    return true;
  };
  const settle = (p) => {
    for (let it = 0; it < 4; it++) {
      let moved = false;
      for (const c of COL) if (!(S.empty && c.furn) && pushOut(p, c)) moved = true;
      for (const d of DOORS) if (pushOut(p, d.col)) moved = true;
      if (!moved) break;
    }
    p.x = clamp(p.x, BX0 + 0.3, BX1 - 0.3); p.z = clamp(p.z, BZ0 + 0.3, BZ1 - 0.3);
  };
  const freeAt = (x, z) => inFlat(x, z) && !!roomAt(x, z) && !blockedAt(x, z, RAD + 0.04);
  const standNear = (x, z) => {
    if (freeAt(x, z)) return [x, z];
    for (let r = 0.12; r <= 1.33; r += 0.12) for (let i = 0; i < 16; i++) { const a = i * TAU / 16, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r; if (freeAt(px, pz)) return [px, pz]; }
    return null;
  };
  // Looks along the longest clear line from a spot, so you arrive facing the room, not a wall.
  const openYaw = (x, z) => {
    let best = -1, yaw = PI;
    for (let i = 0; i < 32; i++) {
      const a = i * TAU / 32, dx = -Math.sin(a), dz = -Math.cos(a);
      let d = 0;
      while (d < 9 && inFlat(x + dx * (d + 0.15), z + dz * (d + 0.15)) && !blockedAt(x + dx * (d + 0.15), z + dz * (d + 0.15), 0.1)) d += 0.15;
      if (d > best + 1e-6) { best = d; yaw = a; }
    }
    return yaw;
  };

  // ---- HUD pieces ----
  const tags = ROOMS.map((R) => {
    const el = document.createElement('div');
    el.className = 'tag';
    const b = document.createElement('b'); b.textContent = R.ka;
    const n = document.createElement('span'); n.className = 'num'; n.textContent = R.area.toFixed(FLAT.digits) + ' მ²';
    el.append(b, n);
    $('tags').append(el);
    return { el, R };
  });
  const placeTags = () => {
    const w = app.clientWidth, h = app.clientHeight, show = S.mode !== 'walk';
    for (const t of tags) {
      _v.set(t.R.label[0], 1.2, t.R.label[1]).project(camera);
      const on = show && _v.z < 1 && Math.abs(_v.x) < 1.05 && Math.abs(_v.y) < 1.05;
      t.el.hidden = !on;
      if (on) t.el.style.transform = 'translate(-50%, -50%) translate(' + ((_v.x * 0.5 + 0.5) * w).toFixed(1) + 'px,' + ((-_v.y * 0.5 + 0.5) * h).toFixed(1) + 'px)';
    }
  };
  const mapCv = $('map'), mapCtx = mapCv.getContext('2d'), mapImg = document.createElement('canvas');
  mapImg.width = mapCv.width; mapImg.height = mapCv.height;
  const ortho = new T.OrthographicCamera(-MAPR.w / 2, MAPR.w / 2, MAPR.d / 2, -MAPR.d / 2, 1, 80);
  ortho.position.set(MAPR.x0 + MAPR.w / 2, 40, MAPR.z0 + MAPR.d / 2);
  ortho.up.set(0, 0, -1);
  ortho.lookAt(MAPR.x0 + MAPR.w / 2, 0, MAPR.z0 + MAPR.d / 2);
  scene.add(ortho);
  // The key plan is a small top-down picture of the model itself, taken once.
  const captureMap = () => {
    const size = renderer.getSize(new T.Vector2()), pr = renderer.getPixelRatio(), keep = [ext.visible, ceilGroup.visible, scene.background];
    ext.visible = false; ceilGroup.visible = false; scene.background = stageCol; ring.visible = false;
    for (const s of glows) s.visible = false;
    renderer.setPixelRatio(1); renderer.setSize(mapImg.width, mapImg.height, false);
    renderer.render(scene, ortho);
    mapImg.getContext('2d').drawImage(canvas, 0, 0, mapImg.width, mapImg.height);
    renderer.setPixelRatio(pr); renderer.setSize(size.x, size.y, false);
    ext.visible = keep[0]; ceilGroup.visible = keep[1]; scene.background = keep[2];
    for (const s of glows) s.visible = (!s.userData.high || ceilGroup.visible) && !(S.empty && s.userData.furn);
    S.dirty = 3;
  };
  const drawMap = () => {
    const g = mapCtx, w = mapCv.width, h = mapCv.height, px = (S.x - MAPR.x0) / MAPR.w * w, py = (S.z - MAPR.z0) / MAPR.d * h, a = Math.atan2(-Math.cos(S.yaw), -Math.sin(S.yaw));
    g.clearRect(0, 0, w, h);
    g.drawImage(mapImg, 0, 0);
    g.fillStyle = markCol; g.globalAlpha = 0.28;
    g.beginPath(); g.moveTo(px, py); g.arc(px, py, 46, a - 0.6, a + 0.6); g.closePath(); g.fill();
    g.globalAlpha = 1;
    g.beginPath(); g.arc(px, py, 7, 0, TAU); g.fill();
    g.lineWidth = 2.5; g.strokeStyle = '#fff'; g.stroke();
  };
  let hintTimer = 0;
  const hint = (text, ms) => {
    const el = $('hint');
    clearTimeout(hintTimer);
    if (!text) { el.classList.add('off'); return; }
    el.textContent = text; el.hidden = false; el.classList.remove('off');
    if (ms) hintTimer = setTimeout(() => el.classList.add('off'), ms);
  };
  const planHint = () => hint(S.touch ? 'Tap a spot on the floor to stand there. Drag to turn the plan, pinch to zoom.' : 'Click a spot on the floor to stand there. Drag to turn the plan, scroll to zoom.', 0);
  const walkHint = () => hint(S.touch ? 'Left thumb walks, right thumb looks. The Plan button takes you back up.' : 'W A S D to walk. Drag to look around, or click to hold the mouse. M takes you back to the plan.', 9000);
  const showRoom = (R) => {
    if (R === S.room) return;
    S.room = R;
    if (R) { $('roomKa').textContent = R.ka; $('roomEn').textContent = R.en; $('roomArea').textContent = R.area.toFixed(FLAT.digits) + ' მ²'; }
  };
  const syncUI = () => {
    const walking = S.mode === 'walk' || (S.mode === 'fly' && S.fly.to === 'walk');
    $('bMode').firstChild.textContent = walking ? 'Plan ' : 'Walk in ';
    $('room').hidden = !walking; $('mapBox').hidden = !walking;
    canvas.classList.toggle('walk', walking);
    app.classList.toggle('touch', S.touch);
    scene.background = S.mode === 'walk' ? BACK : stageCol;
    $('dot').hidden = !(S.locked && S.mode === 'walk');
    $('bEve').setAttribute('aria-pressed', S.eveWant ? 'true' : 'false');
    if (walking) { $('scaleBar').style.width = Math.max(4, mapCv.clientWidth / MAPR.w - 2).toFixed(1) + 'px'; drawMap(); }
  };

  // ---- the ring that shows where a click would put you ----
  const ring = new T.Mesh(new T.RingGeometry(0.17, 0.23, 40).rotateX(-PI / 2), new T.MeshBasicMaterial({ color: 0xd4551a, transparent: true, opacity: 0.95, depthTest: false, toneMapped: false, fog: false }));
  ring.renderOrder = 10; ring.visible = false;
  scene.add(ring);
  const floorAt = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    _v.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1, 0.5).unproject(camera);
    const o = camera.position, dx = _v.x - o.x, dy = _v.y - o.y, dz = _v.z - o.z;
    if (dy > -1e-6) return null;
    const t = -o.y / dy;
    return standNear(o.x + dx * t, o.z + dz * t);
  };

  // ---- moving between the plan and the floor ----
  const goWalk = (x, z, yaw, instant) => {
    S.x = x; S.z = z; S.yaw = yaw === undefined ? openYaw(x, z) : yaw; S.pitch = 0; S.vx = S.vz = 0; S.bob = 0;
    const f = { to: 'walk', t: 0, dur: instant || reduced ? 0.001 : 1.7, p0: camera.position.clone(), q0: camera.quaternion.clone(), f0: camera.fov, p1: new T.Vector3(), q1: new T.Quaternion(), f1: FOV_WALK };
    walkPose(f.p1, f.q1);
    S.fly = f; S.mode = 'fly'; ring.visible = false;
    showRoom(roomAt(x, z));
    hint('', 0); syncUI(); S.dirty = 3;
  };
  const goPlan = (instant) => {
    if (document.pointerLockElement === canvas && document.exitPointerLock) document.exitPointerLock();
    const f = { to: 'plan', t: 0, dur: instant || reduced ? 0.001 : 1.5, p0: camera.position.clone(), q0: camera.quaternion.clone(), f0: camera.fov, p1: new T.Vector3(), q1: new T.Quaternion(), f1: FOV_PLAN };
    planPose(f.p1, f.q1);
    S.fly = f; S.mode = 'fly';
    hint('', 0); syncUI(); S.dirty = 3;
  };
  const toggleMode = () => {
    if (S.mode === 'plan') { const s = standNear(S.x, S.z) || START; goWalk(s[0], s[1], S.walked ? S.yaw : START[2] * DEG); }
    else if (S.mode === 'walk') goPlan();
  };
  const toggleEve = () => { S.eveWant = S.eveWant ? 0 : 1; syncUI(); S.dirty = 3; };

  // ---- input ----
  const K = {}, stick = { id: 0, bx: 0, by: 0, x: 0, y: 0 }, pts = new Map();
  let pinch = 0;
  const lockMouse = () => {
    if (S.noLock || !canvas.requestPointerLock) return;
    try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => { S.noLock = true; }); } catch (err) { S.noLock = true; }
  };
  canvas.addEventListener('pointerdown', (e) => {
    if (!S.ready) return;
    canvas.focus({ preventScroll: true });
    if (e.pointerType === 'touch' && !S.touch) { S.touch = true; app.classList.add('touch'); }
    const p = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, role: 'look', type: e.pointerType };
    if (S.edit && (S.mode === 'plan' || S.mode === 'walk') && !pts.size) {
      const h = pickAt(e.clientX, e.clientY);
      if (h) { select(h.rec); p.role = 'drag'; drag = { rec: h.rec, y: h.point.y, f0: floorPoint(e.clientX, e.clientY, h.point.y), dx: 0, dz: 0 }; canvas.style.cursor = 'grabbing'; }
    }
    if (p.role === 'look' && S.mode === 'walk' && e.pointerType === 'touch' && !stick.id && e.clientX < app.clientWidth * 0.45) {
      p.role = 'stick'; stick.id = e.pointerId; stick.bx = e.clientX; stick.by = e.clientY;
      const r = app.getBoundingClientRect(), el = $('stick');
      el.style.left = (e.clientX - r.left) + 'px'; el.style.top = (e.clientY - r.top) + 'px'; el.hidden = false;
      $('knob').style.transform = '';
    }
    pts.set(e.pointerId, p);
    pinch = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* not capturable */ }
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) {
      if (S.edit && e.pointerType === 'mouse' && S.ready && (S.mode === 'plan' || S.mode === 'walk')) {
        const now = performance.now();
        if (now - (S.hoverT || 0) > 60) { S.hoverT = now; canvas.style.cursor = pickAt(e.clientX, e.clientY) ? 'grab' : ''; }
        return;
      }
      if (S.mode === 'plan' && e.pointerType === 'mouse' && S.ready) {
        const s = floorAt(e.clientX, e.clientY);
        ring.visible = !!s;
        if (s) ring.position.set(s[0], 0.03, s[1]);
        canvas.style.cursor = s ? 'pointer' : '';
        S.dirty = 3;
      }
      return;
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY; p.moved += Math.abs(dx) + Math.abs(dy);
    if (p.role === 'drag') {
      const f = floorPoint(e.clientX, e.clientY, drag.y);
      if (f && drag.f0) { drag.dx = f[0] - drag.f0[0]; drag.dz = f[1] - drag.f0[1]; shiftPiece(drag.rec, drag.dx, drag.dz); }
      return;
    }
    if (p.role === 'stick') {
      const ox = clamp(p.x - stick.bx, -46, 46), oy = clamp(p.y - stick.by, -46, 46);
      stick.x = ox / 46; stick.y = -oy / 46;
      $('knob').style.transform = 'translate(' + ox + 'px,' + oy + 'px)';
    } else if (S.mode === 'plan') {
      if (pts.size >= 2) {
        const a = [...pts.values()], d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
        if (pinch) S.dist = clamp(S.dist * pinch / Math.max(d, 1), 7, 48);
        pinch = d;
      } else { S.theta -= dx * 0.006; S.phi = clamp(S.phi - dy * 0.006, 0, 0.95); }
      S.userView = true; ring.visible = false;
    } else if (S.mode === 'walk' && !S.locked) {
      const k = p.type === 'touch' ? 0.0052 : 0.0036;
      S.yaw += dx * k; S.pitch = clamp(S.pitch + dy * k, -1.45, 1.45);
    }
    S.dirty = 3;
  });
  const lift = (e) => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    pts.delete(e.pointerId);
    pinch = 0;
    if (p.role === 'stick') { stick.id = 0; stick.x = stick.y = 0; $('stick').hidden = true; return; }
    if (p.role === 'drag') {
      const d = drag;
      drag = null; canvas.style.cursor = 'grab';
      if (!d || !d.rec.p) return;
      if (e.type === 'pointerup' && p.moved > 4 && Math.abs(d.dx) + Math.abs(d.dz) > 0.005) setPiece(d.rec, movedP(d.rec.p, d.dx, d.dz));
      else { shiftPiece(d.rec, 0, 0); for (const m of mirrors) if (d.rec.mirrors.includes(m.M)) m.off = S.empty; }
      return;
    }
    if (e.type !== 'pointerup' || p.moved > 8 || performance.now() - p.t > 500) return;
    if (S.edit) { select(null); return; }
    if (S.mode === 'plan') { const s = floorAt(e.clientX, e.clientY); if (s) goWalk(s[0], s[1]); }
    else if (S.mode === 'walk' && p.type === 'mouse') lockMouse();
  };
  canvas.addEventListener('pointerup', lift);
  canvas.addEventListener('pointercancel', lift);
  canvas.addEventListener('pointerleave', () => { if (!pts.size && ring.visible) { ring.visible = false; S.dirty = 3; } });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (S.mode !== 'plan') return;
    S.dist = clamp(S.dist * Math.exp(clamp(e.deltaY, -240, 240) * 0.0012), 7, 48);
    S.userView = true; S.dirty = 3;
  }, { passive: false });
  document.addEventListener('pointerlockchange', () => {
    S.locked = document.pointerLockElement === canvas;
    if (S.locked) hint('Esc lets the mouse go.', 4000);
    syncUI(); S.dirty = 3;
  });
  document.addEventListener('pointerlockerror', () => { S.noLock = true; });
  document.addEventListener('mousemove', (e) => {
    if (!S.locked || S.mode !== 'walk') return;
    S.yaw -= e.movementX * 0.0022; S.pitch = clamp(S.pitch - e.movementY * 0.0022, -1.45, 1.45);
  });
  const MOVE = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);
  window.addEventListener('keydown', (e) => {
    if (S.ready && S.edit && (e.ctrlKey || e.metaKey) && !e.altKey && e.code === 'KeyZ') { e.preventDefault(); undoLast(); return; }
    if (!S.ready || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = e.target && e.target.tagName;
    if (tag === 'SELECT') { if (e.code === 'Escape') { if (e.target.closest('#edit')) toggleEdit(); else toggleFin(); canvas.focus({ preventScroll: true }); } return; }   // the Finishes lists keep their keys
    if (MOVE.has(e.code)) { K[e.code] = true; if (e.code.startsWith('Arrow') && tag !== 'BUTTON') e.preventDefault(); return; }
    if (e.repeat) return;
    if (e.code === 'KeyM') toggleMode();
    else if (e.code === 'KeyL') toggleEve();
    else if (e.code === 'KeyF') fullscreen();
    else if (e.code === 'KeyH' || e.code === 'Slash') toggleHelp();
    else if (e.code === 'KeyX') setEmpty(!S.empty);
    else if (e.code === 'KeyT') toggleFin();
    else if (e.code === 'KeyG') toggleEdit();
    else if (S.edit && sel && e.code === 'KeyR') turnSel(e.shiftKey ? 1 : -1);
    else if (S.edit && sel && (e.code === 'Delete' || e.code === 'Backspace')) { e.preventDefault(); removeSel(); }
    else if (e.code === 'Escape' && !$('help').hidden) toggleHelp();
    else if (e.code === 'Escape' && S.edit && sel) select(null);
    else if (e.code === 'Escape' && S.edit) toggleEdit();
    else if (e.code === 'Escape' && !$('fin').hidden) toggleFin();
  });
  window.addEventListener('keyup', (e) => { K[e.code] = false; });
  window.addEventListener('blur', () => { for (const k in K) K[k] = false; });
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (app.requestFullscreen) { const r = app.requestFullscreen(); if (r && r.catch) r.catch(() => {}); }
  };
  const toggleHelp = () => { const el = $('help'); el.hidden = !el.hidden; $('bHelp').setAttribute('aria-pressed', el.hidden ? 'false' : 'true'); if (!el.hidden && !$('fin').hidden) toggleFin(); if (!el.hidden && S.edit) toggleEdit(); };

  // ---- empty rooms: the furniture goes, the shell stays with its edges drawn in green ----
  // The first time, the light is baked again without the furniture's stand-ins and lamps; both bakes are kept and swapped.
  S.empty = false;
  let emptyPrep = null, emptyBusy = false;
  const prepEmpty = async () => {
    const meshes = baked.filter((m) => !isFurn(m)), CH = ['A', 'B', 'C'];
    const grab = () => meshes.map((m) => CH.map((c) => m.geometry.attributes['bake' + c].array.slice()));
    const keep = grab();
    await bakeInto(meshes, { box: new Float32Array(OCC.box), alb: new Float32Array(OCC.alb) }, LAMPS.filter((L) => !L.furn), (p) => hint('Clearing the rooms… ' + Math.round(p * 100) + ' %', 0));
    const empty = grab();
    // the frame: every wall face outlined at the floor, under the ceiling and on the wall tops, with its corners;
    // every opening outlined on both faces of its wall
    const v = [], ln = (q, r) => v.push(q[0], q[1], q[2], r[0], r[1], r[2]), y0 = 0.004, y1 = H - 0.004, yc = H + 0.006;
    for (const [ax, az, bx, bz] of FRAME) {
      for (const y of [y0, y1, yc]) ln([ax, y, az], [bx, y, bz]);
      ln([ax, y0, az], [ax, y1, az]); ln([bx, y0, bz], [bx, y1, bz]);
    }
    for (const o of OPEN) for (const t of o.at) {
      const q = (u, y) => (o.axis === 'x' ? [u, y, t] : [t, y, u]), lo = Math.max(o.sill, y0);
      ln(q(o.a, lo), q(o.b, lo)); ln(q(o.a, o.head), q(o.b, o.head)); ln(q(o.a, lo), q(o.a, o.head)); ln(q(o.b, lo), q(o.b, o.head));
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(v, 3));
    const frame = new T.LineSegments(g, new T.LineBasicMaterial({ color: 0x1fbf4f, toneMapped: false, fog: false }));
    frame.visible = false; frame.raycast = () => {};
    world.add(frame);
    const mats = new Set(), lines = [frame];
    world.traverse((o) => { if (o.isMesh && !isFurn(o) && !o.material.isShaderMaterial) mats.add(o.material); });
    emptyPrep = { meshes, keep, empty, lines, mats: [...mats], grab };
    hint('', 0);
  };
  const setEmpty = async (on) => {
    on = !!on;
    if (on && S.edit) { clearAll(); return; }
    while (relight.busy) await new Promise((r) => setTimeout(r, 100));   // one bake at a time
    if (on && !emptyPrep) {
      if (emptyBusy) return;
      emptyBusy = true; $('bEmpty').disabled = true;
      try { await prepEmpty(); } finally { emptyBusy = false; $('bEmpty').disabled = false; }
    }
    S.empty = on;
    furnGroup.visible = furnCeil.visible = furnCaps.visible = !on;
    for (const m of mirrors) if (m.furn) { m.off = on; m.mesh.visible = !on; }
    for (const g of glows) g.visible = (!g.userData.high || ceilGroup.visible) && !(on && g.userData.furn);
    const E = emptyPrep;
    if (E) {
      E.meshes.forEach((m, i) => ['A', 'B', 'C'].forEach((c, j) => { const a = m.geometry.attributes['bake' + c]; a.array.set((on ? E.empty : E.keep)[i][j]); a.needsUpdate = true; }));
      for (const l of E.lines) l.visible = on;
      for (const m of E.mats) { m.polygonOffset = on; m.polygonOffsetFactor = 1; m.polygonOffsetUnits = 1; }
    }
    $('bEmpty').setAttribute('aria-pressed', on ? 'true' : 'false');
    renderer.shadowMap.needsUpdate = true;
    captureMap(); syncUI(); S.dirty = 3;
  };

  // ---- finishes: a floor for every room and walls for every group of rooms, kept per flat in this browser ----
  const FIN_KEY = 'flat3d:' + FLAT.name + ':finishes', ALL_SURF = SURF.floor.concat(SURF.wall);
  let finSaved = {};
  try { finSaved = JSON.parse(localStorage.getItem(FIN_KEY) || '{}') || {}; } catch (err) { finSaved = {}; }
  const saveFin = () => {
    const o = {};
    for (const s of ALL_SURF) if (s.now && s.now !== 'design') o[s.key] = s.now;
    try { localStorage.setItem(FIN_KEY, JSON.stringify(o)); } catch (err) { /* private window: the choice lasts this visit only */ }
  };
  const setFinish = (key, id) => {
    const s = ALL_SURF.find((q) => q.key === key);
    if (!s) return false;
    applyFinish(s, id);
    markFin(s);
    saveFin(); captureMap(); S.dirty = 3;
    return s.now;
  };
  // A swatch: a piece of the texture about 1.2 m across (or of the colour alone), tinted by the finish colour.
  const swatch = (map, color, size) => {
    const c = document.createElement('canvas'), g = c.getContext('2d');
    c.width = c.height = 64;
    const im = map && map.image;
    if (im && im.width) {
      const fx = size ? Math.min(1, 1.2 / size[0]) : 0.5, fz = size ? Math.min(1, 1.2 / size[1]) : 0.5;
      g.drawImage(im, 0, 0, im.width * fx, im.height * fz, 0, 0, 64, 64);
      g.globalCompositeOperation = 'multiply';
    }
    g.fillStyle = '#' + new T.Color(color).getHexString();
    g.fillRect(0, 0, 64, 64);
    return c.toDataURL();
  };
  const finKind = (s) => (SURF.floor.includes(s) ? 'floor' : 'wall');
  const markFin = (s) => {
    const row = document.querySelector('#fin [data-key="' + s.key + '"]');
    if (!row) return;
    for (const b of row.querySelectorAll('button')) b.setAttribute('aria-pressed', b.dataset.id === (s.now || 'design') ? 'true' : 'false');
    const f = FINISHES[finKind(s)].find((q) => q.id === (s.now || 'design'));
    row.parentNode.querySelector('.fin-now').textContent = f ? f.en : '';
  };
  for (const kind of ['floor', 'wall']) {
    const list = $(kind === 'floor' ? 'finFloor' : 'finWall');
    for (const s of SURF[kind]) {
      const box = document.createElement('div'), head = document.createElement('div'), sub = document.createElement('span'), now = document.createElement('span'), row = document.createElement('div');
      box.className = 'fin-item'; head.className = 'fin-head'; now.className = 'fin-now'; row.className = 'fin-sw';
      head.append(s.rooms.map((q) => q.ka + ' ' + q.area.toFixed(FLAT.digits) + ' მ²').join(' + '));
      sub.textContent = s.rooms.map((q) => q.en).join(', ');
      row.dataset.key = s.key;
      row.setAttribute('role', 'group'); row.setAttribute('aria-label', sub.textContent);
      const m = MAT[s.key];
      for (const f of FINISHES[kind]) {
        const b = document.createElement('button'), img = document.createElement('img');
        b.type = 'button'; b.dataset.id = f.id; b.title = f.en; b.setAttribute('aria-label', f.en);
        img.alt = ''; img.src = f.id === 'design' ? swatch(m.map, m.color.getHex(), null) : swatch(f.tex ? (TEX['fin:' + f.tex] = TEX['fin:' + f.tex] || FIN_TEX[f.tex]()) : null, f.color, f.size);
        b.append(img);
        b.addEventListener('click', () => setFinish(s.key, f.id));
        row.append(b);
      }
      box.append(head, sub, now, row); list.append(box);
      if (finSaved[s.key]) applyFinish(s, finSaved[s.key]);
      markFin(s);
    }
  }
  $('finReset').addEventListener('click', () => { for (const s of ALL_SURF) setFinish(s.key, 'design'); });
  const toggleFin = () => {
    const el = $('fin');
    el.hidden = !el.hidden;
    $('bFin').setAttribute('aria-pressed', el.hidden ? 'false' : 'true');
    if (!el.hidden && !$('help').hidden) toggleHelp();
    if (!el.hidden && S.edit) toggleEdit();
  };

  const press = (id, fn) => $(id).addEventListener('click', (e) => { fn(); e.currentTarget.blur(); canvas.focus({ preventScroll: true }); });
  press('bMode', toggleMode); press('bEve', toggleEve); press('bHelp', toggleHelp); press('bFull', fullscreen);
  press('bEmpty', () => setEmpty(!S.empty)); press('bFin', toggleFin); press('bEdit', () => toggleEdit());
  if (document.fullscreenEnabled && app.requestFullscreen) $('bFull').hidden = false;

  // ---- furniture: pick a piece, drag it, turn it, take it away or add one; kept per flat in this browser ----
  // A changed piece is built again from its data; the light is baked again a moment after the last change.
  S.edit = false;
  // labels and the Add list come from the piece files in furniture/ (piece('t', { name, add, values }, ...))
  const NAMES = Object.fromEntries(Object.entries(PIECE_INFO).filter(([, i]) => i.name).map(([t, i]) => [t, i.name]));
  // what the Add list offers, in the order of each piece's add: piece, its values; w x d for pieces that fill a rectangle
  const ADD = Object.entries(PIECE_INFO).filter(([, i]) => i.add).sort((a, b) => a[1].add - b[1].add).map(([t, i]) => (i.values ? [t, i.values] : [t]));
  const NO_TURN = { bath: 1, box: 1, curtain: 1, curtainTrack: 1 };
  const r2 = (v) => Math.round(v * 100) / 100;
  const copyP = (p) => JSON.parse(JSON.stringify(p));
  const pivotOf = (p) => (p.rect ? [(p.rect[0] + p.rect[2]) / 2, (p.rect[1] + p.rect[3]) / 2] : p.b ? [(p.b[0] + p.b[3]) / 2, (p.b[2] + p.b[5]) / 2]
    : p.x !== undefined ? [p.x, p.z] : [((p.x0 || 0) + (p.x1 || 0)) / 2, p.z || 0]);
  const movedP = (p, dx, dz) => {
    const q = copyP(p);
    if (q.rect) q.rect = [r2(q.rect[0] + dx), r2(q.rect[1] + dz), r2(q.rect[2] + dx), r2(q.rect[3] + dz)];
    if (q.b) { q.b[0] = r2(q.b[0] + dx); q.b[3] = r2(q.b[3] + dx); q.b[2] = r2(q.b[2] + dz); q.b[5] = r2(q.b[5] + dz); }
    if (q.x0 !== undefined) { q.x0 = r2(q.x0 + dx); q.x1 = r2(q.x1 + dx); }
    if (q.x !== undefined) q.x = r2(q.x + dx);
    if (q.z !== undefined) q.z = r2(q.z + dz);
    delete q.zone;                                       // a looking glass works its zone out again from the room it is in
    return q;
  };
  // dir 1 turns anticlockwise seen from above, -1 clockwise: 15 degrees, or a quarter for pieces that fill a rectangle
  const turnedP = (p, dir) => {
    const q = copyP(p);
    delete q.zone;
    if (!q.rect) { let r = (q.r || 0) + dir * 15; r = ((r % 360) + 540) % 360 - 180; q.r = r === -180 ? 180 : r; return q; }
    const [x0, z0, x1, z1] = q.rect, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    const alongX = q.face ? q.face === 's' || q.face === 'n' : w >= d;
    const rot = (x, z) => { const dx = x - cx, dz = z - cz; return dir > 0 ? [cx + dz, cz - dx] : [cx - dz, cz + dx]; };
    q.rect = [r2(cx - d / 2), r2(cz - w / 2), r2(cx + d / 2), r2(cz + w / 2)];
    if (q.face) q.face = (dir > 0 ? { s: 'e', e: 'n', n: 'w', w: 's' } : { s: 'w', w: 'n', n: 'e', e: 's' })[q.face];
    // places along a kitchen run are measured from its west or north end
    const at = (u) => (alongX ? [x0 + u, cz] : [cx, z0 + u]), back = ([x, z]) => (alongX ? z - q.rect[1] : x - q.rect[0]);
    for (const k of ['sink', 'hob']) if (q[k] !== undefined) q[k] = r2(back(rot(...at(q[k]))));
    if (q.fronts) { const a = back(rot(...at(q.fronts[0]))), b = back(rot(...at(q.fronts[1]))); q.fronts = [r2(Math.min(a, b)), r2(Math.max(a, b))]; }
    return q;
  };

  // taking a piece apart, and putting it together again from its data
  const avgLight = (rec) => {
    const s = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let n = 0;
    if (rec && rec.g) for (const g of rec.g) g.traverse((o) => {
      if (!o.isMesh || !o.geometry.attributes.bakeA) return;
      const A = o.geometry.attributes.bakeA.array, B = o.geometry.attributes.bakeB.array, C = o.geometry.attributes.bakeC.array;
      for (let i = 0; i < A.length; i += 3) for (let j = 0; j < 3; j++) { s[j] += A[i + j]; s[3 + j] += B[i + j]; s[6 + j] += C[i + j]; }
      n += A.length / 3;
    });
    return n ? s.map((v) => v / n) : null;
  };
  let lightGuess = null;                                // the furniture's mean light, for a piece that is new until the next bake
  const takeApart = (rec) => {
    if (!rec.g) return;
    for (const g of rec.g) { g.parent && g.parent.remove(g); g.traverse((o) => { if (o.isMesh) o.geometry.dispose(); }); }
    rec.g = null;
    const out = (arr, gone) => { for (let i = arr.length - 1; i >= 0; i--) if (gone.includes(arr[i])) arr.splice(i, 1); };
    out(COL, rec.cols); out(LAMPS, rec.lamps); out(MIRRORS, rec.mirrors);
    for (let i = glows.length - 1; i >= 0; i--) if (rec.lamps.includes(glows[i].userData.L)) { scene.remove(glows[i]); glows[i].material.dispose(); glows.splice(i, 1); }
    for (let i = mirrors.length - 1; i >= 0; i--) if (rec.mirrors.includes(mirrors[i].M)) { world.remove(mirrors[i].mesh); mirrors[i].rt.dispose(); mirrors.splice(i, 1); }
    rec.cols = rec.lamps = rec.mirrors = []; rec.occBox = rec.occAlb = [];
  };
  const putTogether = (rec, light) => {
    buildPiece(rec.p, rec);
    meshPiece(rec);
    for (const L of rec.lamps) makeGlow(L);
    if (mirrorsOk) for (const M of rec.mirrors) makeMirror(M);
    resize();                                            // sizes the new looking glasses
    const l = light || lightGuess || [0.9, 0.9, 0.9, 0, 0, 0, 0, 0, 0];
    for (const g of rec.g) g.traverse((o) => {
      if (!o.isMesh || !o.geometry.attributes.bakeA) return;
      ['A', 'B', 'C'].forEach((c, k) => { const a = o.geometry.attributes['bake' + c].array; for (let i = 0; i < a.length; i += 3) { a[i] = l[k * 3]; a[i + 1] = l[k * 3 + 1]; a[i + 2] = l[k * 3 + 2]; } });
    });
    applyLook();
  };

  // the light bake, again: a moment after the last change, one at a time
  const relight = { busy: false, again: false, timer: 0, gen: 0 };
  const bakeAgain = () => {
    clearTimeout(relight.timer);
    if (relight.busy) { relight.again = true; return; }
    relight.pending = true;
    relight.timer = setTimeout(async () => {
      relight.pending = false; relight.busy = true; relight.again = false; $('bEmpty').disabled = true;
      const meshes = [];
      world.traverse((o) => { if (o.isMesh && o.material.userData && o.material.userData.bake) meshes.push(o); });
      try { await bakeInto(meshes, occAll(), LAMPS, (p) => { if (S.edit) $('edBusy').textContent = 'Working out the light… ' + Math.round(p * 100) + ' %'; }); }
      finally { relight.busy = false; $('bEmpty').disabled = false; }
      if (emptyPrep) emptyPrep.keep = emptyPrep.grab();
      relight.gen++;
      $('edBusy').textContent = '';
      lightGuess = null;
      renderer.shadowMap.needsUpdate = true; captureMap(); S.dirty = 3;
      if (relight.again) bakeAgain();
    }, 300);
  };

  const saveFurn = () => {
    FLAT.furniture = FLAT.furniture.filter((p) => FIXED[p.t] || p.fixed).concat(PIECE_RECS.filter((r) => r.p).map((r) => r.p));
    try { localStorage.setItem(FURN_KEY, JSON.stringify({ base: BASE, list: FLAT.furniture })); } catch (err) { /* private window: this visit only */ }
  };
  // sets a piece to p (null takes it away); every change goes through here so it can be undone
  const undo = [];
  const setPiece = (rec, p, noUndo) => {
    if (!noUndo) { undo.push({ rec, p: rec.p }); if (undo.length > 200) undo.shift(); }
    const light = avgLight(rec);
    if (!lightGuess) lightGuess = avgLight(PIECE_RECS.find((r) => r.g && r !== rec));
    takeApart(rec);
    rec.p = p;
    if (p) putTogether(rec, light);
    if (sel === rec && !p) select(null); else if (sel === rec) select(rec);
    saveFurn(); syncEdit();
    renderer.shadowMap.needsUpdate = true; S.dirty = 3;
    bakeAgain();
  };
  const undoLast = () => {
    const u = undo.pop();
    if (!u) { hint('Nothing to undo.', 1800); return; }
    if (u.batch) { for (const b of u.batch) setPiece(b.rec, b.p, true); select(null); return; }
    setPiece(u.rec, u.p, true);
    if (u.p) select(u.rec);
  };
  // every piece out at once; one undo brings them all back
  const clearAll = () => {
    const batch = [];
    for (const rec of PIECE_RECS) if (rec.p) { batch.push({ rec, p: rec.p }); setPiece(rec, null, true); }
    if (batch.length) undo.push({ batch });
    select(null);
    hint(batch.length ? 'All the furniture is out. Add pieces from the pictures; Ctrl+Z brings everything back.' : 'The rooms are already empty.', 5000);
  };
  const addPiece = (t, vals) => {
    let x = S.x, z = S.z;
    if (S.mode === 'walk') { x -= Math.sin(S.yaw) * 1.4; z -= Math.cos(S.yaw) * 1.4; }
    else {                                               // under the middle of the view
      const r = canvas.getBoundingClientRect(), f = floorPoint(r.left + r.width / 2, r.top + r.height / 2, 0);
      if (f) { x = f[0]; z = f[1]; }
    }
    // the nearest spot with clear floor about 0.6 m all round, so a new piece does not land in a wall or another piece
    const clear = (px, pz) => inFlat(px, pz) && !!roomAt(px, pz) && !blockedAt(px, pz, 0.6);
    if (!clear(x, z)) {
      let found = null;
      for (let r = 0.15; r <= 4 && !found; r += 0.15) for (let i = 0; i < 24 && !found; i++) { const a = i * TAU / 24; if (clear(x + Math.cos(a) * r, z + Math.sin(a) * r)) found = [x + Math.cos(a) * r, z + Math.sin(a) * r]; }
      if (found) [x, z] = found;
    }
    x = r2(clamp(x, BX0 + 0.5, BX1 - 0.5)); z = r2(clamp(z, BZ0 + 0.5, BZ1 - 0.5));
    const v = Object.assign({}, vals || {}), p = { t };
    if (v.w !== undefined && v.d !== undefined && (t === 'rug' || t === 'wardrobe' || t === 'lowShelf' || t === 'block')) {
      p.rect = [r2(x - v.w / 2), r2(z - v.d / 2), r2(x + v.w / 2), r2(z + v.d / 2)];
      delete v.w; delete v.d;
    } else { p.x = x; p.z = z; p.r = 0; }
    Object.assign(p, v);
    const rec = { p: null, g: null };
    PIECE_RECS.push(rec);
    setPiece(rec, p);
    // now that its size is known: the nearest place where its whole footprint is on clear floor
    const b = new T.Box3().setFromObject(rec.g[0]);
    if (!b.isEmpty()) {
      const hx = (b.max.x - b.min.x) / 2, hz = (b.max.z - b.min.z) / 2, cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2;
      const others = COL.filter((c) => !rec.cols.includes(c));
      const nx = Math.ceil(hx / 0.04), nz = Math.ceil(hz / 0.04);   // samples 8 cm apart or closer, finer than any wall
      const fits = (ox, oz) => {
        for (let i = 0; i <= nx; i++) for (let j = 0; j <= nz; j++) {
          const px = ox - hx + 2 * hx * i / nx, pz = oz - hz + 2 * hz * j / nz;
          if (!inFlat(px, pz) || !roomAt(px, pz)) return false;
          for (const c of others) if (hit(c, px, pz, 0.02)) return false;
        }
        return true;
      };
      let off = null;
      if (!fits(cx, cz)) for (let r = 0.1; r <= 4 && !off; r += 0.1) for (let i = 0; i < 32 && !off; i++) { const a = i * TAU / 32, dx = Math.cos(a) * r, dz = Math.sin(a) * r; if (fits(cx + dx, cz + dz)) off = [dx, dz]; }
      if (off) setPiece(rec, movedP(rec.p, off[0], off[1]), true);
      else if (!fits(cx, cz)) hint('No clear spot big enough nearby: drag it where it should go.', 3000);
    }
    select(rec);
    return rec;
  };
  const resetFurn = () => {
    for (const rec of PIECE_RECS) takeApart(rec);
    PIECE_RECS.length = 0; undo.length = 0; select(null);
    FLAT.furniture = JSON.parse(DESIGN);
    for (const p of FLAT.furniture) if (!(FIXED[p.t] || p.fixed)) { const rec = { p: null, g: null }; PIECE_RECS.push(rec); rec.p = p; putTogether(rec, null); }
    try { localStorage.removeItem(FURN_KEY); } catch (err) { /* storage off */ }
    syncEdit(); renderer.shadowMap.needsUpdate = true; S.dirty = 3;
    bakeAgain();
  };

  // picking: the first thing under the pointer, walls included, so nothing is picked through a wall
  const caster = new T.Raycaster();
  const shown = (o) => { for (let q = o; q; q = q.parent) if (!q.visible) return false; return true; };
  const pickAt = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    caster.setFromCamera(new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    for (const h of caster.intersectObject(world, true)) {
      if (!h.object.isMesh || h.object.userData.noPick || h.object.material.isShaderMaterial || !shown(h.object)) continue;
      return h.object.userData.rec ? { rec: h.object.userData.rec, point: h.point } : null;
    }
    return null;
  };
  // where the pointer meets the level y
  const floorPoint = (cx, cy, y) => {
    const r = canvas.getBoundingClientRect();
    caster.setFromCamera(new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    const o = caster.ray.origin, d = caster.ray.direction;
    if (Math.abs(d.y) < 1e-4) return null;
    const t = (y - o.y) / d.y;
    return t > 0 ? [o.x + d.x * t, o.z + d.z * t] : null;
  };

  // the selected piece: an orange box around it
  let sel = null, drag = null;
  const selBox = new T.Box3Helper(new T.Box3(), new T.Color(0xd4551a));
  selBox.material.depthTest = false; selBox.material.toneMapped = false; selBox.material.fog = false;
  selBox.renderOrder = 11; selBox.visible = false;
  scene.add(selBox);
  const fitBox = () => {
    if (!sel || !sel.g) { selBox.visible = false; return; }
    selBox.box.makeEmpty();
    for (const g of sel.g) if (g.parent && shown(g.parent)) selBox.box.expandByObject(g);
    if (selBox.box.isEmpty()) for (const g of sel.g) selBox.box.expandByObject(g);
    selBox.box.expandByScalar(0.02);
    selBox.visible = S.edit;
    S.dirty = 3;
  };
  const select = (rec) => {
    sel = rec && rec.p ? rec : null;
    fitBox(); syncEdit();
  };
  // while a piece is dragged its groups, glows and glasses are only shifted; it is built again where it is let go
  const shiftPiece = (rec, dx, dz) => {
    for (const g of rec.g) g.position.set(dx, 0, dz);
    for (const s of glows) if (rec.lamps.includes(s.userData.L)) { const L = s.userData.L; s.position.set(L.p[0] + dx, L.p[1], L.p[2] + dz); }
    for (const m of mirrors) if (rec.mirrors.includes(m.M)) { m.mesh.position.set(m.M.p[0] + dx, m.M.p[1], m.M.p[2] + dz); m.p.copy(m.mesh.position); m.off = true; }
    fitBox();
    renderer.shadowMap.needsUpdate = true; S.dirty = 3;
  };
  const turnSel = (dir) => {
    if (!sel) return;
    if (NO_TURN[sel.p.t]) { hint('This piece can only be moved.', 2200); return; }
    setPiece(sel, turnedP(sel.p, dir));
  };
  const removeSel = () => { if (sel) { const r = sel; select(null); setPiece(r, null); hint('Taken away. Ctrl+Z puts it back.', 2500); } };

  const syncEdit = () => {
    $('edSel').hidden = !sel;
    if (sel) {
      $('edName').textContent = NAMES[sel.p.t] || sel.p.t;
      thumbFor(atOrigin(sel.p), $('edImg'));
      const turn = !NO_TURN[sel.p.t];
      $('edL').disabled = $('edR').disabled = !turn;
      $('edWhere').textContent = 'at ' + pivotOf(sel.p).map((v) => v.toFixed(2)).join(', ') + ' m' + (sel.p.rect || !turn ? '' : ', turned ' + (((((sel.p.r || 0) % 360) + 540) % 360 - 180) || 0).toString().replace(/^-180$/, '180') + '°');
    }
    $('edUndo').disabled = !undo.length;
  };
  const toggleEdit = async () => {
    const el = $('edit');
    const on = el.hidden;
    const fromEmpty = on && S.empty;
    if (fromEmpty) await setEmpty(false);
    el.hidden = !on;
    S.edit = on;
    $('bEdit').setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      if (!$('fin').hidden) toggleFin();
      if (!$('help').hidden) toggleHelp();
      if (document.pointerLockElement === canvas && document.exitPointerLock) document.exitPointerLock();
      ring.visible = false;
      drawTiles();
      if (fromEmpty) { clearAll(); return; }
      hint(S.touch ? 'Drag a piece to move it. Tap one to choose it, then turn or remove it here.' : 'Drag a piece to move it. Click one to choose it: R turns it, Delete takes it away, Ctrl+Z undoes.', 6000);
    } else { select(null); canvas.style.cursor = ''; }
    fitBox(); syncEdit(); S.dirty = 3;
  };
  // ---- pictures of pieces: each built on its own far outside the flat, lit by the day sun and a soft made-up light
  // from above, seen from the south-east; a few per frame so the page keeps moving ----
  const THUMB = 144, thumbs = new Map(), thumbWant = [];
  const thumbCam = new T.PerspectiveCamera(28, 1, 0.05, 60), FAR = [BX1 + 60, BZ1 + 60];
  const thumbKey = (p) => JSON.stringify(p);
  const atOrigin = (p) => { const q = copyP(p), c = pivotOf(q); return movedP(q, -c[0], -c[1]); };
  const tilePiece = (t, v) => {
    const p = Object.assign({ t }, v || {});
    if (p.w !== undefined && p.d !== undefined && (t === 'rug' || t === 'wardrobe' || t === 'lowShelf' || t === 'block')) { p.rect = [-p.w / 2, -p.d / 2, p.w / 2, p.d / 2]; delete p.w; delete p.d; }
    else { p.x = 0; p.z = 0; p.r = 0; }
    return p;
  };
  const drawThumbs = (list) => {
    const size = renderer.getSize(new T.Vector2()), pr = renderer.getPixelRatio();
    const keep = { world: world.visible, ext: ext.visible, bg: scene.background, fog: scene.fog, sel: selBox.visible, ring: ring.visible, exp: renderer.toneMappingExposure,
      A: UNI.uBA.value.clone(), B: UNI.uBB.value.clone(), C: UNI.uBC.value.clone(), sun: sun.intensity, env: scene.environment };
    world.visible = ext.visible = selBox.visible = ring.visible = false;
    for (const g of glows) g.visible = false;
    scene.background = new T.Color(0xe9e6e0); scene.fog = null; scene.environment = envs[0];
    const L = LOOKS[0];
    UNI.uBA.value.set(L.A[0], L.A[1], L.A[2]); UNI.uBB.value.set(0, 0, 0); UNI.uBC.value.set(0, 0, 0);
    renderer.toneMappingExposure = L.exp; sun.intensity = LIGHT.sunI * L.sun * 0.55;
    renderer.setPixelRatio(1); renderer.setSize(THUMB, THUMB, false);
    const cv = document.createElement('canvas');
    cv.width = cv.height = THUMB;
    const n = new T.Vector3(), up = new T.Vector3(0.25, 1, 0.35).normalize();
    for (const { p, done } of list) {
      let url = '';
      try {
        const rec = buildPiece(atOrigin(p));
        const out = (arr, gone) => { for (let i = arr.length - 1; i >= 0; i--) if (gone.includes(arr[i])) arr.splice(i, 1); };
        out(COL, rec.cols); out(LAMPS, rec.lamps); out(MIRRORS, rec.mirrors);
        const g = new T.Group();
        buildMeshes(rec.map, g); buildMeshes(rec.ceil, g);
        g.traverse((o) => {
          if (!o.isMesh || !o.geometry.attributes.bakeA) return;
          const N = o.geometry.attributes.normal, A = o.geometry.attributes.bakeA.array;
          for (let i = 0; i < N.count; i++) { n.fromBufferAttribute(N, i); const k = 0.42 + 0.5 * Math.max(0, n.dot(up)) + 0.12 * (n.y * 0.5 + 0.5); A[i * 3] = k; A[i * 3 + 1] = k * 0.98; A[i * 3 + 2] = k * 0.95; }
        });
        g.position.set(FAR[0], 0, FAR[1]);
        scene.add(g); g.updateMatrixWorld(true);
        const box = new T.Box3().setFromObject(g), c = box.getCenter(new T.Vector3()), r = Math.max(0.15, box.getBoundingSphere(new T.Sphere()).radius);
        const dist = r / Math.sin(thumbCam.fov * DEG / 2) * 1.02;
        thumbCam.position.copy(c).add(new T.Vector3(0.62, 0.62, 0.95).normalize().multiplyScalar(dist));
        thumbCam.lookAt(c); thumbCam.near = Math.max(0.02, dist - r * 1.5); thumbCam.far = dist + r * 1.5; thumbCam.updateProjectionMatrix();
        renderer.render(scene, thumbCam);
        cv.getContext('2d').drawImage(canvas, 0, 0, THUMB, THUMB);
        url = cv.toDataURL('image/png');
        scene.remove(g);
        g.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
      } catch (err) { url = ''; }
      thumbs.set(thumbKey(p), url);
      done(url);
    }
    renderer.setPixelRatio(pr); renderer.setSize(size.x, size.y, false);
    world.visible = keep.world; ext.visible = keep.ext; scene.background = keep.bg; scene.fog = keep.fog; selBox.visible = keep.sel; ring.visible = keep.ring;
    scene.environment = keep.env; renderer.toneMappingExposure = keep.exp; sun.intensity = keep.sun;
    UNI.uBA.value.copy(keep.A); UNI.uBB.value.copy(keep.B); UNI.uBC.value.copy(keep.C);
    for (const g of glows) g.visible = (!g.userData.high || ceilGroup.visible) && !(S.empty && g.userData.furn);
    S.dirty = 3;
  };
  const pumpThumbs = () => {
    if (!thumbWant.length) return;
    drawThumbs(thumbWant.splice(0, 4));
    if (thumbWant.length) requestAnimationFrame(pumpThumbs);
  };
  // sets img.src to the picture of piece p, now or when it is drawn
  const thumbFor = (p, img) => {
    const k = thumbKey(p);
    if (thumbs.has(k)) { img.src = thumbs.get(k) || ''; img.hidden = !thumbs.get(k); return; }
    img.hidden = true;
    const w = thumbWant.find((q) => q.k === k), done = (url) => { img.src = url; img.hidden = !url; };
    if (w) { const d0 = w.done; w.done = (u) => { d0(u); done(u); }; return; }
    thumbWant.push({ k, p, done });
    if (thumbWant.length === 1) requestAnimationFrame(pumpThumbs);
  };
  const tiles = [];
  for (const [t, v] of ADD) {
    const b = document.createElement('button'), img = document.createElement('img'), nm = document.createElement('span');
    b.type = 'button'; b.className = 'ed-tile'; b.title = 'Add: ' + (NAMES[t] || t);
    img.alt = ''; img.width = img.height = 72; img.hidden = true; nm.textContent = NAMES[t] || t;
    b.append(img, nm);
    b.addEventListener('click', () => addPiece(t, v));
    $('edAdd').append(b);
    tiles.push({ img, p: tilePiece(t, v) });
  }
  let tilesDrawn = false;
  const drawTiles = () => { if (tilesDrawn) return; tilesDrawn = true; for (const q of tiles) thumbFor(q.p, q.img); };
  $('edL').addEventListener('click', () => turnSel(1));
  $('edR').addEventListener('click', () => turnSel(-1));
  $('edDel').addEventListener('click', removeSel);
  $('edUndo').addEventListener('click', undoLast);
  $('edReset').addEventListener('click', resetFurn);
  $('edClear').addEventListener('click', clearAll);
  $('edCopy').addEventListener('click', () => {
    const txt = '"furniture": [\n' + FLAT.furniture.map((p) => '  ' + JSON.stringify(p)).join(',\n') + '\n]';
    const done = () => hint('The furniture list is copied.', 2000);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => hint('This browser would not copy.', 2500));
    else hint('This browser would not copy.', 2500);
  });

  // ---- per-frame work ----
  const P = { x: 0, z: 0 };
  const walkStep = (dt) => {
    let ix = 0, iz = 0;
    if (K.KeyW || K.ArrowUp) iz += 1;
    if (K.KeyS || K.ArrowDown) iz -= 1;
    if (K.KeyD) ix += 1;
    if (K.KeyA) ix -= 1;
    const turn = (K.ArrowLeft || K.KeyQ ? 1 : 0) - (K.ArrowRight || K.KeyE ? 1 : 0);
    if (turn) S.yaw += turn * dt * 1.9;
    ix += stick.x; iz += stick.y;
    const il = Math.hypot(ix, iz);
    if (il > 1) { ix /= il; iz /= il; }
    const sp = K.ShiftLeft || K.ShiftRight ? 3.0 : 1.55, sy = Math.sin(S.yaw), cy = Math.cos(S.yaw);
    const wx = (-sy * iz + cy * ix) * sp, wz = (-cy * iz - sy * ix) * sp, k = 1 - Math.exp(-dt * (il > 0.01 ? 9 : 13));
    S.vx += (wx - S.vx) * k; S.vz += (wz - S.vz) * k;
    const v = Math.hypot(S.vx, S.vz);
    if (v < 0.004) { S.vx = S.vz = 0; }
    P.x = S.x; P.z = S.z;
    const n = Math.max(1, Math.ceil(v * dt / 0.05));
    for (let i = 0; i < n; i++) { P.x += S.vx * dt / n; P.z += S.vz * dt / n; settle(P); }
    const mx = P.x - S.x, mz = P.z - S.z, went = Math.hypot(mx, mz);
    if (dt > 0 && v > 0.01) { S.vx = lerp(S.vx, mx / dt, 0.5); S.vz = lerp(S.vz, mz / dt, 0.5); }   // walls take the speed out of you
    S.x = P.x; S.z = P.z;
    S.step = (S.step || 0) + went;
    const bobWant = reduced ? 0 : Math.sin(S.step * 4.4) * 0.011 * clamp(went / Math.max(dt, 1e-4) / 1.5, 0, 1);
    S.bob += (bobWant - S.bob) * (1 - Math.exp(-dt * 12));
    if (went > 1e-5) S.walked = true;
    const R = roomAt(S.x, S.z);
    if (R) showRoom(R);
  };
  const stepDoors = (dt) => {
    let moving = false;
    for (const d of DOORS) {
      if (S.mode === 'walk') { const dist = Math.hypot(S.x - d.cx, S.z - d.cz); if (dist < 1.25) d.want = 1; else if (dist > 1.9) d.want = d.rest; }
      else if (S.mode === 'plan') d.want = d.rest;
      const diff = d.want - d.t;
      if (Math.abs(diff) < 0.0015) { if (diff) { d.t = d.want; poseDoor(d); moving = true; } continue; }
      const was = d.t;
      d.t += clamp(diff * (1 - Math.exp(-dt * 7)), -dt * 1.7, dt * 1.7);
      poseDoor(d);
      if (S.mode === 'walk' && hit(d.col, S.x, S.z, RAD + 0.01)) { d.t = was; poseDoor(d); continue; }   // someone is in the way: wait
      moving = true;
    }
    if (moving) { renderer.shadowMap.needsUpdate = true; S.dirty = 3; }
  };
  let slow = 0, fast = 0, acc = 0, accN = 0;
  const tunePixels = (dt) => {                          // keep the walk smooth on small graphics chips
    acc += dt; accN++;
    if (accN < 45) return;
    const avg = acc / accN;
    acc = 0; accN = 0;
    if (avg > 1 / 34) { slow++; fast = 0; } else if (avg < 1 / 55) { fast++; slow = 0; } else { slow = 0; fast = 0; }
    const cap = Math.min(window.devicePixelRatio || 1, coarse ? 2 : 1.5);
    if (slow >= 2 && S.pr > 0.6) { S.pr = Math.max(0.6, S.pr - 0.15); slow = 0; resize(); }
    else if (fast >= 6 && S.pr < cap) { S.pr = Math.min(cap, S.pr + 0.1); fast = 0; resize(); }
  };
  const resize = () => {
    const w = app.clientWidth, h = app.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(S.pr);
    renderer.setSize(w, h, false);
    const mk = Math.min(0.75 * S.pr, 1280 / w);         // mirrors are drawn a little smaller than the view
    for (const m of mirrors) m.rt.setSize(Math.max(64, Math.round(w * mk)), Math.max(64, Math.round(h * mk)));
    camera.aspect = w / h;
    if (!S.userView) S.dist = fitDist();
    camera.updateProjectionMatrix();
    S.dirty = 3;
  };
  const update = (dt) => {
    if (S.eve !== S.eveWant) { S.eve = S.eveWant > S.eve ? Math.min(S.eveWant, S.eve + dt / (reduced ? 0.01 : 1.1)) : Math.max(S.eveWant, S.eve - dt / (reduced ? 0.01 : 1.1)); applyLook(); }
    stepDoors(dt);
    let out = 0;                                        // how much of the town outside to show
    if (S.mode === 'fly') {
      const f = S.fly;
      f.t = Math.min(1, f.t + dt / f.dur);
      const e = easeIO(f.t), turn = f.to === 'walk' ? easeIO(clamp((f.t - 0.22) / 0.78, 0, 1)) : easeIO(clamp(f.t / 0.8, 0, 1));
      camera.position.lerpVectors(f.p0, f.p1, e);
      camera.quaternion.slerpQuaternions(f.q0, f.q1, turn);
      camera.fov = lerp(f.f0, f.f1, e);
      out = f.to === 'walk' ? sstep(0.35, 0.9, f.t) : 1 - sstep(0.1, 0.65, f.t);
      if (f.t >= 1) {
        S.mode = f.to; S.fly = null;
        if (S.mode === 'walk') walkHint(); else planHint();
        syncUI();
      }
      S.dirty = 3;
    } else if (S.mode === 'walk') {
      walkStep(dt);
      walkPose(camera.position, camera.quaternion);
      camera.fov = FOV_WALK;
      out = 1;
      S.dirty = 3;
      tunePixels(dt);
    } else {
      planPose(camera.position, camera.quaternion);
      camera.fov = FOV_PLAN;
    }
    camera.updateProjectionMatrix();
    ext.visible = out > 0.001;
    if (ext.visible) { sky.material.opacity = out; pano.material.opacity = out; ground.material.opacity = out; sunDisc.material.opacity = out; for (const m of town.mats) m.opacity = out; }
    ceilGroup.visible = camera.position.y < H - 0.02;
    for (const s of glows) s.visible = (!s.userData.high || ceilGroup.visible) && !(S.empty && s.userData.furn);
  };
  let last = performance.now();
  const frame = (now) => {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    update(dt);
    if (S.dirty <= 0) return;
    S.dirty--;
    if (S.mode !== 'plan') drawMirrors(false);
    renderer.render(scene, camera);
    placeTags();
    if (S.mode === 'walk') drawMap();
  };

  // ---- go ----
  readTheme();
  applyLook();
  S.dist = fitDist();
  resize();
  new ResizeObserver(resize).observe(app);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { readTheme(); captureMap(); });
  new MutationObserver(() => { readTheme(); captureMap(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  // Warm-up behind the opening sheet: shaders for the screen and for the mirrors, and the large pictures of the
  // town and both skies, are prepared now rather than in the middle of the first steps.
  setStage('Opening the door…', 1);
  await paint();
  renderer.shadowMap.needsUpdate = true;
  ext.visible = true; ceilGroup.visible = true;
  for (const t of [skyTex[0], skyTex[1], panoTex[0], panoTex[1], ...town.textures]) renderer.initTexture(t);
  renderer.compile(scene, camera);
  if (mirrors.length) { renderer.setRenderTarget(mirrors[0].rt); renderer.compile(scene, camera); renderer.setRenderTarget(null); }
  {                                                     // a spot in front of the mirrors, so their shaders are ready
    const m = MIRRORS[0], w = FLAT.warm || (m ? [m.p[0] + m.n[0] * 1.2, m.p[2] + m.n[2] * 1.2] : START);
    camera.position.set(w[0], EYE, w[1]);
  }
  camera.quaternion.setFromEuler(_eu.set(0, 0.6, 0, 'YXZ'));
  camera.fov = FOV_WALK;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);                       // also fills the shadow map
  drawMirrors(true);
  planPose(camera.position, camera.quaternion);
  camera.fov = FOV_PLAN;
  camera.updateProjectionMatrix();
  ext.visible = false; ceilGroup.visible = false;
  renderer.render(scene, camera);
  captureMap();
  S.ready = true;
  syncUI();
  planHint();
  $('veil').classList.add('off');
  setTimeout(() => { $('veil').hidden = true; }, 700);
  requestAnimationFrame(frame);
  if (location.hash === '#walk') goWalk(START[0], START[1], START[2] * DEG, true);

  // hooks for checking the page from scripts
  window.__flat = {
    empty: (on) => setEmpty(on), finish: (key, id) => setFinish(key, id), surfaces: SURF,
    furniture: {
      edit: toggleEdit, pieces: () => PIECE_RECS.filter((r) => r.p), pick: pickAt, select, selected: () => sel,
      move: (rec, dx, dz) => setPiece(rec, movedP(rec.p, dx, dz)), turn: (rec, dir) => setPiece(rec, turnedP(rec.p, dir)), remove: (rec) => setPiece(rec, null),
      add: addPiece, undo: undoLast, clear: clearAll, reset: resetFurn, busy: () => relight.busy || relight.pending, gen: () => relight.gen, ADD,
    },
    S, data: FLAT, stats: bakeStats, doors: DOORS, lamps: LAMPS, renderer, scene, camera, ext, ceilGroup, capGroup,
    plan(theta, phi, dist) { S.mode = 'plan'; S.fly = null; S.theta = theta || 0; S.phi = phi || 0; if (dist) { S.dist = dist; S.userView = true; } syncUI(); S.dirty = 3; },
    walk(x, z, yawDeg, pitchDeg) { S.mode = 'walk'; S.fly = null; S.x = x; S.z = z; S.yaw = (yawDeg || 0) * DEG; S.pitch = (pitchDeg || 0) * DEG; S.vx = S.vz = 0; showRoom(roomAt(x, z)); for (let i = 0; i < 90; i++) stepDoors(0.05); hint('', 0); syncUI(); S.dirty = 3; },
    evening(on) { S.eve = S.eveWant = on ? 1 : 0; applyLook(); syncUI(); },
    free: freeAt, room: (x, z) => { const R = roomAt(x, z); return R && R.id; },
    top() {
      const w = app.clientWidth, h = app.clientHeight, keep = [ortho.left, ortho.right, ext.visible, ceilGroup.visible, ortho.top, ortho.bottom];
      const half = Math.max(MAPR.d, MAPR.w * h / w) / 2;   // the whole key-plan area, whichever side is the limit
      ortho.left = -half * w / h; ortho.right = half * w / h; ortho.top = half; ortho.bottom = -half; ortho.updateProjectionMatrix();
      ext.visible = false; ceilGroup.visible = false; ring.visible = false;
      for (const s of glows) s.visible = false;
      for (const t of tags) t.el.hidden = true;
      scene.background = new T.Color(0xffffff);
      renderer.render(scene, ortho);
      ortho.left = keep[0]; ortho.right = keep[1]; ortho.top = keep[4]; ortho.bottom = keep[5]; ortho.updateProjectionMatrix(); ext.visible = keep[2]; ceilGroup.visible = keep[3];
      S.dirty = 0;
    },
  };
  window.__ready = true;
}

boot().catch((err) => {
  const el = $('stage');
  if (el) el.textContent = 'The model could not be built: ' + (err && err.message ? err.message : err);
  console.error(err);
});

