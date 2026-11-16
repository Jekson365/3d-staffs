'use strict';
// Two-and-a-half-seat shell sofa 1.72 x 0.82, 0.80 high: channel-tufted back that curves round into low flared arms,
// one long seat cushion, tapered pale-wood legs (after a JYSK photo). native: the sitter faces south.
// Values: `mat` the fabric (default terracotta), `legs` the leg material (default oak).
piece('shellSofa', { name: 'Shell sofa', add: 3 }, function (p) {
  const F = p.mat || 'terracotta', L = p.legs || 'oak';
  const LEG = 0.18, SEAT = 0.40, BACK = 0.80, ARM = 0.62;   // heights
  const AX = 0.745, BZ = -0.32, RC = 0.27, FRONT = 0.33;    // flute centreline: arm x, back z, corner radius, arm front z
  pAt(p, () => {
    for (const [x, z] of [[-0.7, -0.29], [0.7, -0.29], [-0.7, 0.29], [0.7, 0.29]]) CY(L, x, 0, z, 0.024, 0.015, LEG, { seg: 12, rx: -z * 0.25, rz: x * 0.07 });   // splayed outwards
    RB(F, 0, LEG, 0.02, 1.68, SEAT - LEG + 0.02, 0.78, 0.07, { cell: 0.3 });           // base under the cushion
    RB(F, 0, SEAT - 0.01, 0.07, 2 * (AX - 0.07), 0.13, 0.66, 0.06, { cell: 0.25, occ: false }); // seat cushion
    // The U-shaped shell: walk its centreline (back, two quarter turns, arms) and stand a rounded flute every ~0.12 m.
    // An outer skin follows the same line so the outside reads smooth; the grooves only show inside.
    const cx = AX - RC, cz = BZ + RC, arc = PI / 2 * RC, side = FRONT - cz;
    const half = cx + arc + side, n = Math.round(half / 0.12), step = half / n;
    const at = (s) => {                                   // s from the middle of the back outwards (x >= 0 side)
      if (s <= cx) return { x: s, z: BZ, a: 0, top: BACK };
      if (s <= cx + arc) { const t = (s - cx) / RC; return { x: cx + Math.sin(t) * RC, z: cz - Math.cos(t) * RC, a: t, top: lerp(BACK, ARM + 0.05, sstep(0, PI / 2, t)) }; }
      const u = (s - cx - arc) / side;
      return { x: AX, z: cz + u * side, a: PI / 2, top: ARM + 0.05 - u * 0.05 };
    };
    for (const sx of [-1, 1]) {
      for (let i = 0; i < n; i++) {
        const q = at((i + 0.5) * step), ry = -sx * q.a;
        const ox = Math.sin(q.a) * 0.035, oz = -Math.cos(q.a) * 0.035;   // outwards from the seat
        const lean = q.a < 0.01 ? -0.1 : 0;
        RB(F, sx * q.x, SEAT - 0.04, q.z, step * 1.0, q.top - SEAT - 0.01, 0.16, 0.042, { ry, rx: lean, cell: 0.2, occ: false });
        // smooth outer skin; its top tucks under the rolled edge below
        RB(F, sx * (q.x + ox), LEG + 0.02, q.z + oz, step * 1.3, q.top - LEG - 0.08, 0.12, 0.03, { ry, rx: lean, cell: 0.2, occ: false });
      }
      // flared arm front: a round end cap where the shell meets the seat front
      RB(F, sx * AX, LEG + 0.02, FRONT + 0.02, 0.19, ARM - LEG - 0.03, 0.1, 0.05, { cell: 0.2, occ: false });
    }
    // one rolled top edge over the whole U, so the channels run into a smooth roll as on the real sofa
    const RR = 0.08, roll = [];
    for (let i = 0; i <= 40; i++) {
      const s = (i / 40) * 2 * half - half, q = at(Math.abs(s)), sg = s < 0 ? -1 : 1;
      roll.push([sg * q.x, q.top - RR, q.z - (q.a < 0.01 ? 0.02 : 0)]);
    }
    TU(F, roll, RR, { n: 120, seg: 14, occ: false });
    for (const sx of [-1, 1]) { const q = at(half); SP(F, sx * q.x, q.top - RR, q.z, RR, { occ: false }); }
    // light stand-ins for the bake: back, arms, base (kept inside the visible shapes)
    pOcc(-0.6, SEAT + 0.04, -0.4, 0.6, BACK - 0.08, -0.29, albOf(F));
    for (const sx of [-1, 1]) pOcc(sx * 0.745 - 0.055, LEG + 0.05, -0.05, sx * 0.745 + 0.055, ARM - 0.06, 0.3, albOf(F));
    colRect(-0.86, -0.41, 0.86, 0.41);
  });
});
