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
