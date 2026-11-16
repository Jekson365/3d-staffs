'use strict';
// flat rectangle on the floor: mat, rect, h (0.012), round (corner radius)
piece('rug', { name: 'Rug', add: 11, values: { mat: 'rugTri', w: 1.6, d: 2.3 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, h = p.h || 0.012;
  if (p.round) RB(p.mat, (x0 + x1) / 2, 0, (z0 + z1) / 2, x1 - x0, h, z1 - z0, p.round, { occ: false, cell: 0.2 });
  else BX(p.mat, x0, 0, z0, x1, h, z1, { occ: false, cell: 0.2 });
});
