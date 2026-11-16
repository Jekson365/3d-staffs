'use strict';
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
