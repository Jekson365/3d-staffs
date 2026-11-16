'use strict';
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
