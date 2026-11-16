'use strict';
// seed, n, len, wid, mats, pot, potR, potH, y
piece('plantSpiky', { name: 'Spiky plant', add: 23, values: { seed: 4, n: 46, len: 0.62, wid: 0.03, mats: ['leafB', 'leafB', 'leafA'], pot: 'potWhite', potR: 0.15, potH: 0.36 } }, function (p) { plantSpiky(p.x, p.z, p); });
