'use strict';
// native: on an east wall at (x, z), facing west
piece('towelLadder', { name: 'Towel ladder' }, function (p) {
  pAt(p, () => {
    const xl = -0.032;
    for (const z of [-0.23, 0.23]) BAR('chrome', [xl, 0.78, z], [xl, 1.58, z], 0.011, { seg: 8 });
    for (let i = 0; i < 7; i++) BAR('chrome', [xl, 0.84 + i * 0.115, -0.23], [xl, 0.84 + i * 0.115, 0.23], 0.008, { seg: 6 });
    RB('towel', xl - 0.016, 1.06, 0, 0.036, 0.46, 0.36, 0.014, { occ: false });
  });
});
