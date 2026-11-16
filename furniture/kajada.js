'use strict';
// Painted chest (gorgia.ge BM-00170661): 0.90 wide, 0.45 deep, 0.95 high. Two panelled doors over one drawer,
// moulded top, plinth with a shaped apron and splayed feet, brass knobs and pulls. native: the front faces south.
// Values: `mat` the paint (default cabinet), `metal` the handles (default brass).
piece('kajada', { name: 'კაჟადა', add: 35 }, function (p) {
  const M = p.mat || 'cabinet', H = p.metal || 'brass';
  const W = 0.9, D = 0.45, f = D / 2 - 0.02;   // f: carcass front face
  pAt(p, () => {
    // feet and shaped apron (two steps stand in for the curve)
    for (const sx of [-1, 1]) B(M, sx * (W / 2 - 0.05), 0, 0, 0.07, 0.14, D - 0.06, { occ: false });
    B(M, 0, 0.1, f - 0.01, W - 0.1, 0.04, 0.03, { occ: false });
    B(M, 0, 0.07, f - 0.01, W - 0.3, 0.03, 0.03, { occ: false });
    // plinth band, carcass, top
    RB(M, 0, 0.14, 0, W + 0.02, 0.035, D - 0.01, 0.008, { cell: 0.2 });
    B(M, 0, 0.175, -0.01, W - 0.02, 0.73, D - 0.06);
    RB(M, 0, 0.9, 0, W + 0.04, 0.04, D + 0.01, 0.012, { cell: 0.2 });
    RB(M, 0, 0.88, 0, W, 0.02, D - 0.03, 0.006, { occ: false });
    // drawer with an inset line and two knobs
    B(M, 0, 0.18, f, W - 0.04, 0.17, 0.02, { occ: false });
    B(M, 0, 0.21, f + 0.011, W - 0.1, 0.11, 0.004, { occ: false });
    RB(M, 0, 0.35, 0.005, W + 0.01, 0.022, D - 0.02, 0.006, { occ: false });
    for (const sx of [-1, 1]) SP(H, sx * 0.3, 0.265, f + 0.025, 0.017, { occ: false });
    // two doors, each with two raised panels, and bar pulls in the middle
    for (const sx of [-1, 1]) {
      const cx = sx * (W / 4 - 0.005);
      B(M, cx, 0.38, f, W / 2 - 0.03, 0.49, 0.02, { occ: false });
      for (const px of [-0.1, 0.1]) {
        RB(M, cx + px, 0.43, f + 0.012, 0.17, 0.39, 0.012, 0.012, { occ: false });
        B(M, cx + px, 0.45, f + 0.019, 0.13, 0.35, 0.002, { occ: false });
      }
      CY(H, sx * 0.03, 0.68, f + 0.03, 0.006, 0.006, 0.07, { seg: 8, occ: false });
      SP(H, sx * 0.03, 0.75, f + 0.03, 0.01, { occ: false });
    }
    colRect(-W / 2 - 0.02, -D / 2, W / 2 + 0.02, D / 2);
  });
});
