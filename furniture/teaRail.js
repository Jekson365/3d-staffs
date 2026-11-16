'use strict';
// rail with a tea towel on a cabinet front. native: front faces south, (x, z) on it
piece('teaRail', { name: 'Tea towel' }, function (p) {
  pAt(p, () => {
    BX('steel', -0.205, 0.8, 0, 0.205, 0.812, 0.024, { occ: false });
    RB('stripe', -0.045, 0.5, 0.03, 0.2, 0.318, 0.012, 0.005, { occ: false }); RB('stripe', -0.045, 0.62, 0.008, 0.2, 0.196, 0.008, 0.003, { occ: false });
  });
});
