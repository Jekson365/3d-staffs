'use strict';
// native: on a west wall at (x, z), facing east
piece('entryPhone', { name: 'Entry phone' }, function (p) {
  pAt(p, () => { BX('switch', 0, 1.36, -0.05, 0.022, 1.56, 0.05, { occ: false }); BX('plastic', 0.022, 1.44, -0.03, 0.024, 1.54, 0.03, { occ: false }); });
});
