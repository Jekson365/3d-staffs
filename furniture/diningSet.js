'use strict';
// oak table w x d (1.48 x 0.745) laid for a meal, two chairs on each long side; ends 'w', 'e', 'we' or '': chairs at the ends
piece('diningSet', { name: 'Dining table', add: 12, values: { w: 1.48, d: 0.745, ends: '' } }, function (p) {
  //                (with a plate each unless endPlates is false). native: long side along X
  const w = p.w || 1.48, d = p.d || 0.745, ty = 0.75, hw = w / 2, hd = d / 2, ends = p.ends === undefined ? 'w' : p.ends;
  pAt(p, () => {
    RB('oakStave', 0, ty - 0.04, 0, w, 0.04, d, 0.008, { cell: 0.2 });
    for (const x of [-hw + 0.21, hw - 0.21]) {
      BAR('blackMetal', [x, 0, -hd + 0.08], [x, ty - 0.04, -hd + 0.17], 0.016, { seg: 8 }); BAR('blackMetal', [x, 0, hd - 0.08], [x, ty - 0.04, hd - 0.17], 0.016, { seg: 8 });
      BX('blackMetal', x - 0.016, ty - 0.07, -hd + 0.15, x + 0.016, ty - 0.04, hd - 0.15, { occ: false });
    }
    colRect(-hw, -hd, hw, hd);
    BX('linen', -0.25, ty, -hd - 0.042, -0.01, ty + 0.003, hd + 0.042, { occ: false, cell: 0.2 });   // runner
    BX('linen', -0.25, ty - 0.14, -hd - 0.045, -0.01, ty + 0.003, -hd - 0.042, { occ: false }); BX('linen', -0.25, ty - 0.14, hd + 0.042, -0.01, ty + 0.003, hd + 0.045, { occ: false });
    const plates = [[-hw + 0.29, -0.2], [hw - 0.27, -0.2], [-hw + 0.29, 0.2], [hw - 0.27, 0.2]];
    if (p.endPlates !== false) { if (ends.includes('w')) plates.push([-hw + 0.13, 0]); if (ends.includes('e')) plates.push([hw - 0.13, 0]); }
    for (const [x, z] of plates) LA('ceramic', x, ty, z, [[0.001, 0], [0.07, 0], [0.125, 0.016], [0.118, 0.016], [0.07, 0.006], [0.001, 0.006]], { seg: 20 });
    place(-0.15, ty + 0.003, 0, 0, () => {                         // jug of yellow flowers
      LA('teal', 0, 0, 0, [[0.001, 0], [0.045, 0], [0.066, 0.07], [0.05, 0.15], [0.03, 0.19], [0.036, 0.2]], { seg: 16 });
      const R = rng(19);
      for (let i = 0; i < 9; i++) {
        const a = R() * TAU, r = 0.03 + R() * 0.09, h = 0.3 + R() * 0.12, x = Math.cos(a) * r, z = Math.sin(a) * r;
        BAR('leafA', [0, 0.18, 0], [x, h, z], 0.0025, { seg: 4 });
        SP('yellow', x, h, z, 0.024, { seg: 8, hseg: 6, sy: 0.7 });
      }
    });
    LA('bottle', 0.05, ty, -0.09, [[0.001, 0], [0.037, 0], [0.037, 0.19], [0.014, 0.25], [0.014, 0.31], [0.001, 0.31]], { seg: 14 });
    wineGlass(0.17, ty, -0.05, true); wineGlass(0.21, ty, 0.11, true); wineGlass(0.32, ty, 0.06, false);
    diningChair(-0.17 * w, -hd - 0.16, 0.06); diningChair(0.27 * w, -hd - 0.17, -0.05);
    diningChair(-0.21 * w, hd + 0.195, PI + 0.08); diningChair(0.32 * w, hd + 0.185, PI - 0.04);
    if (ends.includes('w')) diningChair(-hw - 0.29, -0.0175, PI / 2 + 0.05);
    if (ends.includes('e')) diningChair(hw + 0.29, 0.02, -PI / 2 - 0.04);
  });
});
