'use strict';
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
