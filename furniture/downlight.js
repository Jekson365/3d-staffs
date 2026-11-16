'use strict';
// recessed spot: I, col, ch
piece('downlight', {}, function (p) { downlight(p.x, p.z, p.I || 0.75, colOf(p.col), p.ch || 2); });
