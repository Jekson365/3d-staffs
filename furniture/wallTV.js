'use strict';
// flat television with a warm halo behind it. native: on an east wall at (x, z), facing west
piece('wallTV', { name: 'Wall TV', add: 28 }, function (p) {
  pAt(p, () => pFrom(3.34, 6.05, () => {
    BX('plastic', 3.305, 0.93, 5.495, 3.34, 1.57, 6.605, { cell: 0.3 });
    BX('screen', 3.301, 0.942, 5.507, 3.305, 1.558, 6.593);
    put('halo', new T.PlaneGeometry(2.1, 1.5), xf(3.3375, 1.25, 6.05, -PI / 2), { uv: 'keep' });
    pLamp(3.2, 1.25, 6.05, 0.2, WARM, 1, { glow: 0 });
  }));
});
