'use strict';
// three-seat sofa 2.52 x 1.11. native: the sitter faces south (back to the north)
piece('sofa', { name: 'Sofa', add: 1 }, function (p) {
  pAt(p, () => {
    for (const [x, z] of [[-1.16, -0.45], [1.16, -0.45], [-1.16, 0.45], [1.16, 0.45]]) CY('blackMetal', x, 0, z, 0.022, 0.018, 0.08, { seg: 8 });
    RB('sofa', 0, 0.08, 0, 2.52, 0.3, 1.11, 0.04, { cell: 0.3 });
    RB('sofa', 0, 0.38, -0.43, 2.52, 0.42, 0.25, 0.06, { cell: 0.3 });
    for (const s of [-1, 1]) RB('sofa', s * 1.13, 0.38, 0.07, 0.26, 0.24, 0.97, 0.06, { cell: 0.3 });
    for (const x of [-0.67, 0, 0.67]) { RB('sofa', x, 0.38, 0.12, 0.655, 0.14, 0.8, 0.05, { cell: 0.25 }); RB('sofa', x, 0.5, -0.25, 0.64, 0.36, 0.16, 0.07, { rx: -0.16, occ: false }); }
    RB('cushion', 0.4, 0.55, -0.12, 0.42, 0.4, 0.13, 0.06, { rx: -0.42, ry: 0.15, occ: false });
    RB('cushion', 0.84, 0.53, 0.12, 0.44, 0.13, 0.42, 0.06, { ry: 0.5, rz: 0.1, occ: false });
    RB('cushion', -0.86, 0.55, -0.1, 0.48, 0.4, 0.14, 0.06, { rx: -0.5, ry: -0.3, occ: false });
    RB('beige', 0.36, 0.515, 0.2, 0.5, 0.022, 0.72, 0.01, { occ: false, cell: 0.2 });           // throw spilling over the seat front
    RB('beige', 0.36, 0.03, 0.572, 0.5, 0.5, 0.022, 0.01, { occ: false, cell: 0.2 }); RB('beige', 0.34, 0, 0.66, 0.52, 0.03, 0.2, 0.012, { occ: false, ry: 0.1 });
    B('paper', -0.3, 0.522, 0.2, 0.2, 0.006, 0.27, { ry: 0.3, rz: 0.03 }); B('paper', -0.11, 0.522, 0.26, 0.2, 0.006, 0.27, { ry: 0.3, rz: -0.03 });   // open magazine
    colRect(-1.26, -0.555, 1.26, 0.555);
  });
});
