'use strict';
// runs along X only
piece('curtain', { name: 'Curtain' }, function (p) { curtain(p.x0, p.x1, p.z, p.y0 === undefined ? 0.02 : p.y0, p.y1 === undefined ? 2.66 : p.y1); });
