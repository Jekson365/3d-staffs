'use strict';
// four storage jars in a row southwards from (x, z), on the worktop
piece('jars', { name: 'Jars' }, function (p) {
  pAt(p, () => { for (let i = 0; i < 4; i++) { const z = i * 0.13, m = i % 2 ? 'teal' : 'ceramic', h = 0.12 + (i % 2) * 0.03; CY(m, 0, 0.9, z, 0.048, 0.044, h, { seg: 14 }); CY('oak', 0, 0.9 + h, z, 0.05, 0.05, 0.016, { seg: 14 }); } });
});
