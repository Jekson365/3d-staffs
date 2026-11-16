'use strict';
// sliding-door wardrobe filling a recess: rect, face 'w'|'e'|'n'|'s' (the side its doors are on)
piece('closet', { name: 'Built-in wardrobe' }, function (p) {
  const [x0, z0, x1, z1] = p.rect, f = p.face || 'w', L = f === 'w' || f === 'e' ? z1 - z0 : x1 - x0, N = { occ: false, cell: 0.35 }, h = L / 2;
  const fb = (mat, u0, u1, y0, y1, t0, t1, o) => {               // u along the doors from the north or west end, t in from the front
    if (f === 'w') BX(mat, x0 + t0, y0, z0 + u0, x0 + t1, y1, z0 + u1, o);
    else if (f === 'e') BX(mat, x1 - t1, y0, z0 + u0, x1 - t0, y1, z0 + u1, o);
    else if (f === 'n') BX(mat, x0 + u0, y0, z0 + t0, x0 + u1, y1, z0 + t1, o);
    else BX(mat, x0 + u0, y0, z1 - t1, x0 + u1, y1, z1 - t0, o);
  };
  fb('walnut', 0, h + 0.01, 0.04, H - 0.04, 0.01, 0.04, N); fb('walnut', h - 0.01, L, 0.04, H - 0.04, 0.04, 0.07, N);
  fb('alu', 0, L, 0, 0.04, 0, 0.08, { occ: false }); fb('alu', 0, L, H - 0.04, H, 0, 0.08, { occ: false });
  fb('blackMetal', h - 0.075, h - 0.057, 0.9, 1.3, 0.002, 0.01, { occ: false }); fb('blackMetal', h + 0.06, h + 0.078, 0.9, 1.3, 0.032, 0.04, { occ: false });
  occBox(x0, 0, z0, x1, H, z1, albOf('walnut'));
  into(CAPS, () => quadGrid('capWood', x0, H + 0.001, z0, [0, 0, 1], [1, 0, 0], [0, z1 - z0], [0, x1 - x0], (x, y, z) => [x * 2, z]));
  COL.push({ k: 0, x0, z0, x1, z1 });
});
