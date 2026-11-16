'use strict';
// outdoor air-conditioning unit 0.8 x 0.3 x 0.56 on two feet. native: back to a north wall at (x, z), its fan facing south
piece('acUnit', { name: 'Air conditioner', add: 32 }, function (p) {
  pAt(p, () => {
    BX('blackMetal', -0.36, 0, 0.03, -0.3, 0.06, 0.29); BX('blackMetal', 0.3, 0, 0.03, 0.36, 0.06, 0.29);
    RB('doorWhite', 0, 0.06, 0.16, 0.8, 0.56, 0.28, 0.015);
    put('charcoal', new T.CircleGeometry(0.2, 28), xf(-0.11, 0.34, 0.301), { uv: 'keep' });
    for (const r of [0.08, 0.14, 0.2]) put('blackMetal', new T.RingGeometry(r - 0.008, r, 28), xf(-0.11, 0.34, 0.303), { uv: 'keep' });
    BX('charcoal', 0.2, 0.12, 0.29, 0.34, 0.56, 0.302);
    colRect(-0.42, 0, 0.42, 0.32);
  });
});
