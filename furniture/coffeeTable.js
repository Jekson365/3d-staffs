'use strict';
// round, dark wood, 0.82 across
piece('coffeeTable', { name: 'Coffee table', add: 6 }, function (p) {
  pAt(p, () => {
    CY('darkWood', 0, 0.37, 0, 0.41, 0.41, 0.035, { seg: 44, occ: false });
    occLocal(xf(0, 0.3875, 0), 0.56, 0.035, 0.56, albOf('darkWood'));
    for (let i = 0; i < 3; i++) { const a = i * TAU / 3 + 0.5; BAR('blackMetal', [Math.cos(a) * 0.34, 0, Math.sin(a) * 0.34], [Math.cos(a) * 0.2, 0.37, Math.sin(a) * 0.2], 0.012, { seg: 8 }); }
    CY('blackMetal', 0, 0.17, 0, 0.27, 0.27, 0.008, { seg: 30 });
    B('plastic', -0.04, 0.405, -0.03, 0.25, 0.008, 0.18, { ry: 0.55 }); B('screen', -0.04, 0.4131, -0.03, 0.23, 0.001, 0.16, { ry: 0.55 });
    CY('yellow', 0.16, 0.405, 0.1, 0.034, 0.034, 0.07, { seg: 12 });
    LA('ceramic', 0.02, 0.405, 0.2, [[0.001, 0], [0.03, 0], [0.04, 0.07], [0.035, 0.07], [0.027, 0.008], [0.001, 0.008]], { seg: 12 });
    colCircle(0, 0, 0.41);
  });
});
