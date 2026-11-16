'use strict';
// y: the worktop
piece('fruitBowl', { name: 'Fruit bowl' }, function (p) {
  place(p.x, p.y || 0.9, p.z, 0, () => {
    LA('ochre', 0, 0, 0, [[0.001, 0], [0.07, 0], [0.15, 0.07], [0.142, 0.07], [0.066, 0.01], [0.001, 0.01]], { seg: 20 });
    for (const [x, z, m] of [[0.04, 0.02, 'yellow'], [-0.05, 0.03, 'yellow'], [0, -0.055, 'yellow'], [0.01, 0.01, 'leafC'], [-0.03, -0.02, 'yellow']]) SP(m, x, 0.045 + (m === 'leafC' ? 0.045 : 0), z, 0.034, { sy: 0.9 });
  });
});
