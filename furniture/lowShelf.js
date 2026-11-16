'use strict';
// oak cabinet 0.9 high: rect; books and a bowl on top
piece('lowShelf', { name: 'Low cabinet', add: 19, values: { w: 1.2, d: 0.4 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, alongZ = z1 - z0 >= x1 - x0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  BX('oak', x0, 0, z0, x1, 0.9, z1, { cell: 0.25 });
  COL.push({ k: 0, x0, z0, x1, z1 });
  books(alongZ ? cx : x0 + 0.23, 0.9, alongZ ? z0 + 0.23 : cz, 0.3, BOOKS);
  LA('ochre', alongZ ? cx : x1 - 0.3, 0.9, alongZ ? z1 - 0.3 : cz, [[0.001, 0], [0.035, 0], [0.06, 0.04], [0.054, 0.04], [0.032, 0.007], [0.001, 0.007]], { seg: 14 });
});
