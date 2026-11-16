'use strict';
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
