'use strict';
// native: back to a north wall at (x, z), facing south
piece('toilet', { name: 'Toilet' }, function (p) {
  const cer = albOf('ceramic');
  pAt(p, () => {
    RB('ceramic', 0, 0.4, 0.105, 0.38, 0.36, 0.17, 0.03);
    RB('ceramic', 0, 0.76, 0.105, 0.395, 0.022, 0.185, 0.008);
    CY('chrome', 0, 0.782, 0.105, 0.022, 0.022, 0.006, { seg: 14 });
    LA('ceramic', 0, 0, 0.43, [[0.001, 0], [0.12, 0], [0.13, 0.12], [0.185, 0.36], [0.195, 0.4], [0.15, 0.4], [0.12, 0.3], [0.06, 0.25], [0.001, 0.24]], { seg: 24, sz: 1.3 });
    CY('ceramic', 0, 0.4, 0.43, 0.2, 0.2, 0.022, { seg: 28, sz: 1.3 });
    BX('ceramic', -0.1, 0.1, 0.19, 0.1, 0.4, 0.27, { occ: false });
    occLocal(xf(0, 0.2, 0.43), 0.3, 0.4, 0.42, cer);
    colRect(-0.2, 0, 0.2, 0.7);
  });
});
