'use strict';
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
