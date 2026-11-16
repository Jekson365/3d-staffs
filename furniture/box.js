'use strict';
// plain box: mat, b [x0, y0, z0, x1, y1, z1], occ, col (true: walk collider)
piece('box', { name: 'Box' }, function (p) {
  const b = p.b;
  BX(p.mat, b[0], b[1], b[2], b[3], b[4], b[5], { occ: p.occ, cell: p.cell });
  if (p.col) COL.push({ k: 0, x0: b[0], z0: b[2], x1: b[3], z1: b[5] });
});
