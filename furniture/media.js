'use strict';
// low oak console 1.7 long with a television, books and a vase. native: back to a west wall at (x, z), facing east
piece('media', { name: 'TV console', add: 8 }, function (p) {
  pAt(p, () => pFrom(3.46, 5.81, () => {
    BX('blackMetal', 3.53, 0, 5.02, 3.81, 0.1, 6.6, { occ: false });
    RB('oak', 3.67, 0.1, 5.81, 0.34, 0.36, 1.7, 0.008, { cell: 0.25 });
    for (const z of [5.385, 5.81, 6.235]) BX('plinth', 3.838, 0.12, z - 0.002, 3.8415, 0.44, z + 0.002, { occ: false });
    colRect(3.46, 4.96, 3.84, 6.66);
    BX('plastic', 3.6, 0.46, 5.7, 3.74, 0.474, 5.96, { occ: false }); BX('plastic', 3.655, 0.474, 5.8, 3.675, 0.57, 5.86, { occ: false });
    BX('plastic', 3.648, 0.55, 5.215, 3.682, 1.26, 6.445, { cell: 0.3 });
    BX('screen', 3.682, 0.562, 5.227, 3.685, 1.248, 6.433);
    books(3.67, 0.46, 6.37, 0.2, BOOKS);
    LA('pot', 3.66, 0.46, 5.09, [[0.001, 0], [0.05, 0], [0.075, 0.1], [0.05, 0.22], [0.028, 0.27], [0.034, 0.29]], { seg: 16 });
    const R = rng(13);
    for (let i = 0; i < 5; i++) BAR('stem', [3.66, 0.74, 5.09], [3.66 + (R() - 0.3) * 0.2, 1.05 + R() * 0.25, 5.09 + (R() - 0.5) * 0.3], 0.003, { seg: 4 });
    LA('ochre', 3.7, 0.46, 6.58, [[0.001, 0], [0.035, 0], [0.06, 0.04], [0.054, 0.04], [0.032, 0.007], [0.001, 0.007]], { seg: 14 });
  }));
});
