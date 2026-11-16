'use strict';
// round table 0.6 across with a cup
piece('bistroTable', { name: 'Bistro table', add: 13 }, function (p) {
  pAt(p, () => {
    CY('plastic', 0, 0.7, 0, 0.3, 0.3, 0.025, { seg: 32 });
    CY('blackMetal', 0, 0.02, 0, 0.025, 0.025, 0.68, { seg: 10 }); CY('blackMetal', 0, 0, 0, 0.2, 0.22, 0.02, { seg: 24 });
    LA('ceramic', 0.08, 0.725, 0.05, [[0.001, 0], [0.04, 0], [0.045, 0.09], [0.04, 0.09], [0.035, 0.008], [0.001, 0.008]], { seg: 14 });
    colCircle(0, 0, 0.3);
  });
});
