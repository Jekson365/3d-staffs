'use strict';
// square pot with a round bush; seed
piece('planter', { name: 'Planter', add: 24, values: { seed: 21 } }, function (p) {
  pAt(p, () => {
    BX('pot', -0.2, 0, -0.2, 0.2, 0.38, 0.2, { cell: 0.2 });
    BX('soil', -0.18, 0.36, -0.18, 0.18, 0.37, 0.18, { occ: false });
    colRect(-0.2, -0.2, 0.2, 0.2);
    bush(0, 0.34, 0, 0.31, p.seed || 21);
  });
});
