'use strict';
// solid low block (a balcony pier, say): rect, h (1.05), mat (facade)
piece('block', { name: 'Block' }, function (p) {
  const [x0, z0, x1, z1] = p.rect;
  BX(p.mat || 'facade', x0, 0, z0, x1, p.h || 1.05, z1, { cell: 0.25 });
  COL.push({ k: 0, x0, z0, x1, z1 });
});
