'use strict';
// HAGERNAS solid pine dining set (gorgia.ge BM-00217948): table 1.20 x 0.75, 0.74 high, with four chairs
// (0.40 wide, 0.45 deep, seat 0.45, back 0.83), two on each long side. Whole set about 1.20 x 1.55.
// native: long side along X, chairs north and south facing the table. Values: `mat` the wood (default oak), `chairs` 0 table only.
piece('hagernas', { name: 'HAGERNAS', add: 36 }, function (p) {
  const M = p.mat || 'oak', W = 1.2, D = 0.75, TH = 0.74, hw = W / 2, hd = D / 2;
  const chair = (x, z, ry) => place(x, 0, z, ry, () => {   // the sitter faces +Z
    const L = 0.035, sx = 0.18, sz = 0.18;
    for (const lx of [-sx, sx]) {
      B(M, lx, 0, sz, L, 0.43, L, { occ: false });                                  // front legs
      B(M, lx, 0, -sz, L, 0.83, L, { rx: -0.05, occ: false });                       // back legs run up into the back
      B(M, lx, 0.12, 0, 0.025, 0.035, 2 * sz, { occ: false });                       // side stretchers
    }
    B(M, 0, 0.12, sz, 2 * sx, 0.03, 0.025, { occ: false });
    RB(M, 0, 0.43, 0.005, 0.41, 0.025, 0.42, 0.006, { occ: false });               // seat
    B(M, 0, 0.395, 0, 2 * sx, 0.04, 2 * sz, { occ: false });                       // seat rails
    B(M, 0, 0.72, -sz - 0.035, 2 * sx + 0.03, 0.09, 0.022, { rx: -0.05, occ: false }); // top rail
    B(M, 0, 0.56, -sz - 0.025, 2 * sx, 0.05, 0.02, { rx: -0.05, occ: false });     // middle rail
    colRect(-0.2, -0.22, 0.2, 0.22);
  });
  pAt(p, () => {
    RB(M, 0, TH - 0.035, 0, W, 0.035, D, 0.006, { cell: 0.2 });
    for (const x of [-hw + 0.04, hw - 0.04]) for (const z of [-hd + 0.04, hd - 0.04]) B(M, x, 0, z, 0.06, TH - 0.035, 0.06);
    BX(M, -hw + 0.04, TH - 0.12, -hd + 0.03, hw - 0.04, TH - 0.035, -hd + 0.05, { occ: false });
    BX(M, -hw + 0.04, TH - 0.12, hd - 0.05, hw - 0.04, TH - 0.035, hd - 0.03, { occ: false });
    BX(M, -hw + 0.03, TH - 0.12, -hd + 0.04, -hw + 0.05, TH - 0.035, hd - 0.04, { occ: false });
    BX(M, hw - 0.05, TH - 0.12, -hd + 0.04, hw - 0.03, TH - 0.035, hd - 0.04, { occ: false });
    colRect(-hw, -hd, hw, hd);
    if (p.chairs !== 0) {
      chair(-0.28, -hd - 0.08, 0); chair(0.28, -hd - 0.08, 0);
      chair(-0.28, hd + 0.08, PI); chair(0.28, hd + 0.08, PI);
    }
  });
});
