'use strict';
// drum table with a globe lamp
piece('nightTable', { name: 'Bedside table', add: 16 }, function (p) {
  pAt(p, () => {
    CY('darkWood', 0, 0, 0, 0.19, 0.19, 0.5, { seg: 28 });
    CY('brass', 0, 0.5, 0, 0.055, 0.06, 0.012, { seg: 16 }); CY('brass', 0, 0.512, 0, 0.008, 0.008, 0.09, { seg: 8 });
    SP('lampOn', 0, 0.68, 0, 0.085, { seg: 16, hseg: 12 });
    colCircle(0, 0, 0.19);
    pLamp(0.03, 0.72, 0, 0.42, WARM, 1, { glow: 0.75 });
  });
});
