'use strict';
piece('curtainTrack', { name: 'Curtain track' }, function (p) { into(CEIL, () => BX('trim', p.x0, 2.66, p.z - 0.03, p.x1, H, p.z + 0.03)); });
