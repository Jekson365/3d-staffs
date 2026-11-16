'use strict';
// round plaid rug, radius 0.78
piece('roundRug', { name: 'Round rug', add: 10 }, function (p) {
  LA('rugPlaid', p.x, 0, p.z, [[0.78, 0], [0.78, 0.01], [0.66, 0.01], [0.54, 0.01], [0.42, 0.01], [0.3, 0.01], [0.18, 0.01], [0.08, 0.01], [0.001, 0.01]], { seg: 48, uv: 'box', uvScale: 1 / 1.56, uo: 0.5, vo: 0.5 });
});
