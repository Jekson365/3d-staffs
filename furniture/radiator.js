'use strict';
// panel radiator 0.8 long. native: on a south wall at (x, z), facing north
piece('radiator', { name: 'Radiator', add: 27 }, function (p) {
  pAt(p, () => pFrom(0.95, 9.42, () => {
    BX('trim', 0.55, 0.16, 9.335, 1.35, 0.7, 9.4, { occ: false, cell: 0.3 });
    for (let i = 0; i < 16; i++) BX('trim', 0.556 + i * 0.05, 0.17, 9.325, 0.59 + i * 0.05, 0.69, 9.336, { occ: false });
    for (const x of [0.6, 1.3]) BAR('chrome', [x, 0, 9.37], [x, 0.16, 9.37], 0.008, { seg: 6 });
  }));
});
