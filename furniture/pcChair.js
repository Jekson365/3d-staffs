'use strict';
// Office swivel chair (gorgia.ge BM-00195991): 0.66 across the five-star base, 0.62 wide at the arms, 1.20 high, seat 0.48.
// Beige faux-leather high back and seat, beige plastic star base on casters, black gas lift. native: the sitter faces south.
// Values: `mat` the upholstery (default beige), `frame` the base and arms (default beige).
piece('pcChair', { name: 'pc chair', add: 34 }, function (p) {
  const U = p.mat || 'beige', Fr = p.frame || 'beige';
  pAt(p, () => {
    // five-star base with casters
    for (let k = 0; k < 5; k++) {
      const a = k * 2 * PI / 5 + PI / 2, x = Math.cos(a) * 0.3, z = Math.sin(a) * 0.3;
      BAR(Fr, [0, 0.1, 0], [x, 0.075, z], 0.022, { occ: false });
      B(Fr, x, 0.055, z, 0.04, 0.03, 0.04, { occ: false });
      CY(Fr, x, 0.0, z, 0.03, 0.03, 0.025, { rx: PI / 2, seg: 10, occ: false });
      SP(Fr, x, 0.03, z, 0.03, { occ: false });
    }
    CY(Fr, 0, 0.07, 0, 0.05, 0.06, 0.06, { seg: 12, occ: false });
    CY('blackMetal', 0, 0.12, 0, 0.025, 0.025, 0.24, { seg: 10, occ: false });
    CY(Fr, 0, 0.12, 0, 0.035, 0.035, 0.12, { seg: 10, occ: false });
    B('plastic', 0, 0.36, 0.02, 0.24, 0.05, 0.26, { occ: false });
    BAR('blackMetal', [0.1, 0.37, 0.05], [0.24, 0.35, 0.1], 0.008, { occ: false });
    // seat: padded cushion with a waterfall front
    RB(U, 0, 0.4, 0.03, 0.5, 0.09, 0.48, 0.04, { cell: 0.15 });
    PIL(U, 0, 0.485, 0.03, 0.48, 0.05, 0.44, { flange: 0.008, lump: 0.01, seed: 5 });
    // high back, leaning back a little, with a sewn head panel
    place(0, 0, -0.2, 0, () => {
      RB(U, 0, 0.5, 0, 0.48, 0.7, 0.09, 0.04, { rx: -0.14, cell: 0.15, occ: false });
      RB(U, 0, 0.98, -0.07, 0.465, 0.21, 0.1, 0.035, { rx: -0.14, cell: 0.15, occ: false });
    });
    // arms: post from the seat, padded rest
    for (const sx of [-1, 1]) {
      B(Fr, sx * 0.285, 0.38, 0.12, 0.045, 0.27, 0.06, { occ: false });
      B(Fr, sx * 0.285, 0.38, -0.06, 0.045, 0.04, 0.3, { occ: false });
      RB(U, sx * 0.285, 0.65, 0.04, 0.07, 0.045, 0.3, 0.02, { occ: false });
    }
    colCircle(0, 0, 0.33);
  });
});
