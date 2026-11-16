'use strict';
// wall-hung walnut unit 0.77 wide with a vessel basin, mirror and light bar. native: back to a north wall, facing south. zone
piece('vanity', { name: 'Basin' }, function (p) {
  pAt(p, () => {
    B('walnut', 0, 0.36, 0.255, 0.77, 0.44, 0.51);
    BX('plinth', -0.385, 0.577, 0.508, 0.385, 0.583, 0.513, { occ: false });
    BX('blackMetal', -0.155, 0.7, 0.51, 0.155, 0.712, 0.53, { occ: false }); BX('blackMetal', -0.155, 0.48, 0.51, 0.155, 0.492, 0.53, { occ: false });
    const vz = 0.29, vt = 0.93;
    rim('ceramic', 0, vt, vz, 0.62, 0.42, 0.56, 0.36, 0.05);
    basin('ceramic', 0, vt, vz, 0.56, 0.36, 0.11, 0.05, { free: true });
    BX('ceramic', -0.31, 0.8, vz - 0.21, 0.31, vt - 0.001, vz - 0.192, { occ: false }); BX('ceramic', -0.31, 0.8, vz + 0.192, 0.31, vt - 0.001, vz + 0.21, { occ: false });
    BX('ceramic', -0.31, 0.8, vz - 0.192, -0.292, vt - 0.001, vz + 0.192, { occ: false }); BX('ceramic', 0.292, 0.8, vz - 0.192, 0.31, vt - 0.001, vz + 0.192, { occ: false });
    CY('chrome', 0, vt - 0.109, vz, 0.022, 0.022, 0.004, { seg: 12, free: true });
    CY('chrome', 0, 0.8, 0.045, 0.022, 0.026, 0.03, { seg: 12 });                                // tall tap behind it
    TU('chrome', [[0, 0.82, 0.045], [0, 1.07, 0.045], [0, 1.11, 0.085], [0, 1.09, 0.155], [0, 1.05, 0.165]], 0.011, { seg: 8, n: 24 });
    B('chrome', 0.05, 0.83, 0.045, 0.07, 0.012, 0.016, { ry: 0.5 });
    BX('blackMetal', -0.36, 1.15, 0, 0.36, 1.97, 0.012, { occ: false });                           // mirror frame and light bar
    BX('lampCool', -0.27, 2.0, 0.01, 0.27, 2.028, 0.045);
    CY('ceramic', -0.3, 0.8, 0.43, 0.03, 0.035, 0.1, { seg: 12 }); CY('chrome', -0.3, 0.9, 0.43, 0.012, 0.012, 0.03, { seg: 8 });   // soap pump
    colRect(-0.4, 0, 0.4, 0.54);
    pMirror({ kind: 'rect', w: 0.7, h: 0.8, p: [0, 1.56, 0.0135], n: [0, 0, 1] }, p.zone);
    pLamp(0, 1.97, 0.15, 0.28, COOL, 1, { glow: 0.5 });
  });
});
