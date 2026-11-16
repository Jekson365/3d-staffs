'use strict';
// shoe bench 0.95 long with coat hooks above. native: on a west wall at (x, z), facing east
piece('coatBench', { name: 'Coat bench', add: 21 }, function (p) {
  pAt(p, () => {
    BX('greyWood', 0, 0.42, -0.475, 0.36, 0.46, 0.475, { cell: 0.25 });
    BX('greyWood', 0.03, 0, -0.445, 0.33, 0.42, -0.405, { occ: false }); BX('greyWood', 0.03, 0, 0.405, 0.33, 0.42, 0.445, { occ: false });
    BX('greyWood', 0.03, 0.12, -0.405, 0.33, 0.15, 0.405, { occ: false });
    colRect(0, -0.475, 0.36, 0.475);
    BX('oak', 0, 1.7, -0.425, 0.02, 1.78, 0.425, { occ: false });
    for (const z of [-0.325, -0.075, 0.175]) BAR('blackMetal', [0.02, 1.74, z], [0.09, 1.77, z], 0.007, { seg: 6 });
    RB('beige', 0.065, 1.05, -0.075, 0.07, 0.62, 0.36, 0.03, { occ: false });
    for (const [x, z, r] of [[0.14, -0.225, 0.1], [0.24, -0.155, -0.1]]) { RB('shoe', x, 0.15, z, 0.27, 0.07, 0.1, 0.03, { ry: r, occ: false }); RB('rubber', x, 0.15, z, 0.274, 0.02, 0.104, 0.008, { ry: r, occ: false }); }
    RB('cushion', 0.18, 0.46, 0.225, 0.3, 0.05, 0.38, 0.02, { occ: false });
  });
});
