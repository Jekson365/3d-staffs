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
