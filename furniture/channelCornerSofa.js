'use strict';
// L-shaped corner sofa 2.55 wide, 0.92 deep (1.60 at the chaise), 0.86 high (gorgia.ge BM-00157269): teal velvet,
// channel-tufted seat and back, flared rolled arms, a lower rolled back over the chaise, two throw pillows, chrome legs.
// native: the sitter faces south, the chaise is at the west end. Values: `mat` the fabric (default teal),
// `chaise` 1 west (default) / -1 east, `pillows` 0 leaves the throw pillows out.
piece('channelCornerSofa', { name: 'Corner sofa (channel)', add: 33 }, function (p) {
  const F = p.mat || 'teal', s = p.chaise === -1 ? -1 : 1;
  const W = 2.55, D = 0.92, ARM = 0.15, LEG = 0.09, BASE = 0.3, SEAT = 0.46, CH = 0.95, CD = 1.6;
  const z0 = -D / 2, z1 = D / 2, zc = z0 + CD, BK = 0.2;
  const xL = -W / 2 + ARM, xS = xL + CH, xR = W / 2 - ARM;           // chaise from xL to xS, main seat from xS to xR
  const X = (x) => s * x;                                             // mirror for an east chaise
  const channels = (xa, xb, w) => { const n = Math.max(1, Math.round((xb - xa) / w)), cw = (xb - xa) / n; return Array.from({ length: n }, (_, i) => xa + cw * (i + 0.5)).map((c) => [c, cw]); };
  pAt(p, () => {
    for (const [x, z] of [[-W / 2 + 0.08, z0 + 0.08], [W / 2 - 0.08, z0 + 0.08], [W / 2 - 0.08, z1 - 0.08], [xS - 0.08, zc - 0.08], [xL + 0.08, zc - 0.08]])
      CY('chrome', X(x), 0, z, 0.022, 0.016, LEG, { seg: 10, occ: false });
    // plinths
    RB(F, X((xS + W / 2) / 2), LEG, 0, W / 2 - xS, BASE - LEG, D, 0.03, { cell: 0.25 });
    RB(F, X((-W / 2 + xS) / 2), LEG, (z0 + zc) / 2, xS + W / 2, BASE - LEG, CD, 0.03, { cell: 0.25 });
    // main seat: channels running front to back, piping along the front
    for (const [c, cw] of channels(xS, xR, 0.15)) PIL(F, X(c), (BASE + SEAT) / 2, (z0 + BK + z1) / 2, cw - 0.006, SEAT - BASE, z1 - z0 - BK, { lower: 0.4, flange: 0.012, seed: 40 + Math.round(c * 50), lump: 0.02 });
    RB(F, X((xS + xR) / 2), BASE + 0.02, z1 - 0.012, xR - xS, 0.025, 0.03, 0.012, { occ: false });
    // chaise block: one box cushion with a quilted top
    RB(F, X((xL + xS) / 2), BASE - 0.01, (z0 + BK + zc) / 2, CH - 0.01, SEAT - BASE - 0.03, zc - z0 - BK - 0.01, 0.04, { cell: 0.2 });
    PIL(F, X((xL + xS) / 2), SEAT - 0.02, (z0 + BK + zc) / 2, CH - 0.04, 0.06, zc - z0 - BK - 0.04, { flange: 0.015, seed: 7, lump: 0.015 });
    // backs: tall channelled back behind the main seat, lower rolled back over the chaise
    RB(F, X((xS + xR) / 2), BASE, z0 + 0.07, xR - xS, 0.5, 0.14, 0.04, { cell: 0.25 });
    for (const [c, cw] of channels(xS, xR, 0.13)) RB(F, X(c), BASE + 0.02, z0 + 0.15, cw - 0.01, 0.84 - BASE, 0.12, 0.05, { cell: 0.2, occ: false });
    RB(F, X((xL + xS) / 2), BASE, z0 + 0.08, CH, 0.3, 0.16, 0.04, { cell: 0.25 });
    for (const [c, cw] of channels(xL, xS, 0.13)) CY(F, X(c), 0.6, z0 + 0.12, 0.085, 0.085, cw - 0.006, { rz: PI / 2, seg: 14 });
    // flared rolled arms
    for (const ax of [-W / 2 + ARM / 2, W / 2 - ARM / 2]) {
      const zb = ax < 0 ? zc : z1, zm = (z0 + zb) / 2, ln = zb - z0;
      RB(F, X(ax), LEG, zm, ARM, 0.5, ln, 0.04, { cell: 0.2 });
      RB(F, X(ax + (ax < 0 ? -0.015 : 0.015)), 0.44, zm, ARM + 0.04, 0.2, ln + 0.01, 0.08, { cell: 0.2 });
    }
    // throw pillows, darker petrol shade is the same fabric
    if (p.pillows !== 0) {
      PIL(F, X(xS + 0.25), 0.62, z0 + 0.32, 0.44, 0.14, 0.44, { rx: PI / 2 - 0.4, ry: -0.35 * s, rz: 0.12, flange: 0.02, seed: 81 });
      PIL(F, X(xR - 0.25), 0.62, z0 + 0.32, 0.44, 0.14, 0.44, { rx: PI / 2 - 0.4, ry: 0.4 * s, rz: -0.15, flange: 0.02, seed: 82 });
    }
    colRect(-W / 2, z0, W / 2, z1);
    colRect(Math.min(X(-W / 2), X(xS)), z1, Math.max(X(-W / 2), X(xS)), zc);
  });
});
