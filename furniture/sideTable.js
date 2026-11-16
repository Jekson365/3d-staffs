'use strict';
// tripod table with a wicker tray
piece('sideTable', { name: 'Side table', add: 7 }, function (p) {
  pAt(p, () => {
    CY('plastic', 0, 0.47, 0, 0.22, 0.22, 0.03, { seg: 30 });
    for (let i = 0; i < 3; i++) { const a = i * TAU / 3 - PI / 2; BAR('oak', [Math.cos(a) * 0.27, 0, Math.sin(a) * 0.27], [Math.cos(a) * 0.1, 0.47, Math.sin(a) * 0.1], 0.013, { r2: 0.017, seg: 8 }); }
    LA('wicker', 0, 0.5, 0, [[0.001, 0], [0.12, 0], [0.135, 0.03], [0.125, 0.03], [0.115, 0.008], [0.001, 0.008]], { seg: 20, uv: 'box' });
    colCircle(0, 0, 0.22);
  });
});
