'use strict';
// drum shade on a stem, lit day and evening
piece('floorLamp', { name: 'Floor lamp', add: 9 }, function (p) {
  pAt(p, () => {
    CY('blackMetal', 0, 0, 0, 0.15, 0.16, 0.02, { seg: 24 }); BAR('blackMetal', [0, 0.02, 0], [0, 1.36, 0], 0.011, { seg: 8 });
    CY('lampOn', 0, 1.3, 0, 0.15, 0.19, 0.27, { seg: 28, open: true, occ: false }); CY('lampOn', 0, 1.3, 0, 0.19, 0.19, 0.002, { seg: 28, occ: false });
    colCircle(0, 0, 0.16);
    pLamp(0, 1.42, 0, 0.85, WARM, 1, { glow: 0.9 });
  });
});
