'use strict';
// free-standing walnut wardrobe 2.4 high: rect, face 'n'|'s'|'e'|'w'
piece('wardrobe', { name: 'Wardrobe', add: 18, values: { face: 's', w: 1.2, d: 0.6 } }, function (p) {
  const [x0, z0, x1, z1] = p.rect, f = p.face || 's', N = { occ: false }, ht = 2.4;
  BX('walnut', x0, 0.04, z0, x1, ht, z1, { cell: 0.35 });
  BX('plinth', x0 + 0.02, 0, z0 + 0.02, x1 - 0.02, 0.04, z1 - 0.02, N);
  if (f === 'e' || f === 'w') {
    const zm = (z0 + z1) / 2, xa = f === 'e' ? x1 : x0 - 0.004, xh = f === 'e' ? x1 : x0 - 0.01;
    BX('plinth', xa, 0.06, zm - 0.003, xa + 0.004, ht - 0.02, zm + 0.003, N);
    BX('blackMetal', xh, 0.9, zm - 0.12, xh + 0.01, 1.3, zm - 0.1, N); BX('blackMetal', xh, 0.9, zm + 0.1, xh + 0.01, 1.3, zm + 0.12, N);
  } else {
    const xm = (x0 + x1) / 2, za = f === 's' ? z1 : z0 - 0.004, zh = f === 's' ? z1 : z0 - 0.01;
    BX('plinth', xm - 0.003, 0.06, za, xm + 0.003, ht - 0.02, za + 0.004, N);
    BX('blackMetal', xm - 0.12, 0.9, zh, xm - 0.1, 1.3, zh + 0.01, N); BX('blackMetal', xm + 0.1, 0.9, zh, xm + 0.12, 1.3, zh + 0.01, N);
  }
  COL.push({ k: 0, x0, z0, x1, z1 });
});
