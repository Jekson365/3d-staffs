'use strict';
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
