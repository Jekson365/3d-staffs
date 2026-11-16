'use strict';
// washing machine 0.6 wide. native: back to a north wall, facing south
piece('washer', { name: 'Washing machine', add: 26 }, function (p) {
  pAt(p, () => {
    BX('fridge', -0.3, 0.02, 0.02, 0.3, 0.85, 0.54, { cell: 0.3 });
    BX('plastic', -0.28, 0.72, 0.54, 0.28, 0.83, 0.544, { occ: false });
    CY('steel', 0, 0.43, 0.548, 0.19, 0.19, 0.02, { seg: 28, rx: PI / 2 });
    CY('screen', 0, 0.43, 0.556, 0.15, 0.15, 0.008, { seg: 28, rx: PI / 2 });
    colRect(-0.31, 0, 0.31, 0.56);
  });
});
