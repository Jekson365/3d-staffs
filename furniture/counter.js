'use strict';
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
