'use strict';
// grey bench 1.16 long with a clock, cushion, basket and shoes. native: back to a south wall at (x, z), facing north
piece('bench', { name: 'Hall bench', add: 20 }, function (p) {
  pAt(p, () => pFrom(1.99, 9.42, () => {
    BX('greyWood', 1.41, 0.4, 9.05, 2.57, 0.45, 9.42, { cell: 0.25 });
    BX('greyWood', 1.45, 0, 9.08, 1.5, 0.4, 9.4, { occ: false }); BX('greyWood', 2.48, 0, 9.08, 2.53, 0.4, 9.4, { occ: false });
    BX('greyWood', 1.5, 0.12, 9.1, 2.48, 0.15, 9.38, { occ: false });
    colRect(1.41, 9.05, 2.57, 9.42);
    place(2.37, 0.45, 9.3, 0.25, () => {
      CY('teal', 0, 0.045, 0, 0.075, 0.075, 0.06, { rx: PI / 2, seg: 24 });
      CY('paper', 0, 0.0735, -0.031, 0.062, 0.062, 0.003, { rx: PI / 2, seg: 24 });
      B('charcoal', 0.012, 0.074, -0.034, 0.03, 0.005, 0.002, { rz: 0.5 }); B('charcoal', 0, 0.075, -0.034, 0.005, 0.045, 0.002);
    });
    RB('beige', 1.72, 0.45, 9.24, 0.4, 0.06, 0.28, 0.02, { occ: false }); RB('cushion', 1.72, 0.51, 9.24, 0.38, 0.05, 0.26, 0.02, { occ: false });
    LA('wicker', 1.95, 0.15, 9.24, [[0.001, 0], [0.13, 0], [0.16, 0.2], [0.15, 0.2], [0.125, 0.01], [0.001, 0.01]], { seg: 20, uv: 'box' });
    for (const [x, z, r] of [[1.78, 8.83, 0.2], [1.92, 8.86, -0.15]]) { RB('shoe', x, 0, z, 0.1, 0.07, 0.27, 0.03, { ry: r, occ: false }); RB('rubber', x, 0, z, 0.104, 0.02, 0.274, 0.008, { ry: r, occ: false }); }
  }));
});
