'use strict';
// flush dish of radius s
piece('ceilingLamp', {}, function (p) { ceilingLamp(p.x, p.z, p.s || 0.16, p.I || 1, colOf(p.col), p.ch || 1); });
