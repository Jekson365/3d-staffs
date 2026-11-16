'use strict';
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
