'use strict';
// Modular three-seat sofa with a loose ottoman, 2.81 wide, 0.82 deep (1.43 with the ottoman), 0.85 high
// (gorgia.ge MLM-110293, BM-00227947): slim track arms, a box cushion under each flanged pillow-top seat, three big
// flanged back pillows leaning on a low frame, two throw pillows, near-black block legs. native: the sitter faces south.
// Values: `mat` the fabric (default chenille), `legs` (default ebony), `ottoman` 1 in front of the east seat
// (default), -1 the west seat, 0 none; `pillows` 0 leaves the two throw pillows out.
piece('modularSofa', { name: 'Modular sofa', add: 4 }, function (p) {
  const F = p.mat || 'chenille', L = p.legs || 'ebony', side = p.ottoman === undefined ? 1 : p.ottoman;
  const W = 2.81, D = 0.82, ARM = 0.15, ARMH = 0.62, LEG = 0.11, BASE = 0.30, BOX = 0.375;
  const SW = (W - 2 * ARM) / 3, z0 = -D / 2, z1 = D / 2, OD = 0.6;
  const legs = (xa, xb, za, zb) => { for (const x of [xa + 0.06, xb - 0.06]) for (const z of [za + 0.06, zb - 0.06]) B(L, x, 0, z, 0.055, LEG + 0.01, 0.055); };
  // one seat: frame, box cushion with a sewn welt, pillow top whose flange laps over the front
  const seat = (cx, za, zb, seed) => {
    RB(F, cx, LEG, (za + zb) / 2, SW - 0.008, BASE - LEG, zb - za, 0.03, { cell: 0.2 });
    RB(F, cx, BASE, (za + 0.12 + zb) / 2, SW - 0.012, BOX - BASE, zb - za - 0.12, 0.03, { cell: 0.2 });
    RB(F, cx, BOX - 0.006, (za + 0.12 + zb) / 2, SW - 0.004, 0.009, zb - za - 0.112, 0.004, { occ: false });
    PIL(F, cx, BOX + 0.035, (za + 0.1 + zb) / 2 - 0.005, SW - 0.045, 0.125, zb - za - 0.15, { lower: 0.32, flange: 0.024, seed, lump: 0.035 });
  };
  pAt(p, () => {
    const mods = [[-W / 2, -W / 2 + ARM + SW], [-SW / 2, SW / 2], [W / 2 - ARM - SW, W / 2]];
    mods.forEach(([xa, xb]) => legs(xa, xb, z0, z1));
    for (const sx of [-1, 1]) RB(F, sx * (W / 2 - ARM / 2), LEG, 0, ARM, ARMH - LEG, D, 0.05, { k: 3, cell: 0.15 });
    for (let k = 0; k < 3; k++) {
      const cx = (k - 1) * SW;
      // low back frame per module; the back pillows hide it from the front
      RB(F, cx, BASE, z0 + 0.08, SW - 0.008, 0.40, 0.16, 0.04, { cell: 0.2 });
      seat(cx, z0, z1, 11 + k);
      PIL(F, cx, 0.625, -0.175, SW - 0.03, 0.2, 0.42, { rx: PI / 2 - 0.2, lower: 0.42, flange: 0.024, seed: 21 + k, lump: 0.06 });
    }
    if (p.pillows !== 0) {
      PIL(F, -1.13, 0.64, -0.1, 0.44, 0.15, 0.44, { rx: PI / 2 - 0.42, ry: 0.55, rz: -0.18, flange: 0.02, seed: 31 });
      PIL(F, 1.13, 0.64, -0.1, 0.44, 0.15, 0.44, { rx: PI / 2 - 0.42, ry: -0.55, rz: 0.18, flange: 0.02, seed: 32 });
    }
    colRect(-W / 2, z0, W / 2, z1);
    if (side) {
      const cx = side * SW, za = z1 + 0.01, zb = za + OD;
      legs(cx - SW / 2, cx + SW / 2, za, zb);
      RB(F, cx, LEG, (za + zb) / 2, SW - 0.008, BASE - LEG, OD, 0.03, { cell: 0.2 });
      RB(F, cx, BASE, (za + zb) / 2, SW - 0.012, BOX - BASE, OD - 0.004, 0.03, { cell: 0.2 });
      RB(F, cx, BOX - 0.006, (za + zb) / 2, SW - 0.004, 0.009, OD + 0.004, 0.004, { occ: false });
      PIL(F, cx, BOX + 0.035, (za + zb) / 2, SW - 0.045, 0.125, OD - 0.04, { lower: 0.32, flange: 0.024, seed: 15, lump: 0.035 });
      colRect(cx - SW / 2, za, cx + SW / 2, zb);
    }
  });
});
