'use strict';
// floating shelf under a round mirror, with a vase of twigs and a bowl. native: on a west wall, facing east. zone
piece('mirrorShelf', { name: 'Mirror and shelf' }, function (p) {
  pAt(p, () => {
    BX('oak', 0, 0.905, -0.4, 0.18, 0.945, 0.4, { cell: 0.25 });
    colRect(0, -0.4, 0.12, 0.4);
    CY('blackMetal', 0, 1.494, 0, 0.3, 0.3, 0.012, { seg: 40, rz: PI / 2 });
    pMirror({ kind: 'disc', r: 0.285, p: [0.0075, 1.5, 0], n: [1, 0, 0] }, p.zone);
    LA('potWhite', 0.09, 0.945, -0.25, [[0.001, 0], [0.04, 0], [0.06, 0.08], [0.035, 0.17], [0.03, 0.2]], { seg: 14 });
    const R = rng(7);
    for (let i = 0; i < 6; i++) BAR('stem', [0.09, 1.13, -0.25], [0.09 + (R() - 0.3) * 0.16, 1.42 + R() * 0.16, -0.25 + (R() - 0.5) * 0.24], 0.003, { seg: 4 });
    LA('ochre', 0.09, 0.945, 0.21, [[0.001, 0], [0.07, 0], [0.085, 0.02], [0.078, 0.02], [0.066, 0.006], [0.001, 0.006]], { seg: 16 });
  });
});
