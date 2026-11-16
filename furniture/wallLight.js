'use strict';
// native: on an east wall, facing west; (x, z) on the wall face
piece('wallLight', { name: 'Wall light' }, function (p) {
  pAt(p, () => {
    BX('alu', -0.04, 1.92, -0.06, 0, 2.08, 0.06, { occ: false });
    BX('lampEve', -0.036, 1.914, -0.05, -0.004, 1.92, 0.05); BX('lampEve', -0.036, 2.08, -0.05, -0.004, 2.086, 0.05);
    pLamp(-0.15, 1.9, 0, 0.7, SOFT, 2, { glow: 0.45 });
  });
});
