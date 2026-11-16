'use strict';
// black dome, evening only; y: its rim
piece('pendant', { name: 'Pendant lamp', add: 30 }, function (p) { pendant(p.x, p.z, p.y || 1.55); });
