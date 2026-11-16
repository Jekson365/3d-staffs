'use strict';
// seed, h, n, leaf, stems, ratio, mats, pot, potR, potH, y
piece('plantLeafy', { name: 'Leafy plant', add: 22, values: { seed: 3, h: 1.4, n: 16, leaf: 0.3, mats: ['leafA', 'leafA', 'leafD'], pot: 'pot', potR: 0.17, potH: 0.34 } }, function (p) { plantLeafy(p.x, p.z, p); });
