'use strict';
// framed print on a wall: mat (art1..art3), y its centre, w, h; native: faces south
piece('art', { name: 'Picture', add: 29, values: { mat: 'art1', y: 1.5, w: 0.7, h: 0.5 } }, function (p) { art(p.mat, p.x, p.y, p.z, p.w, p.h, dg(p.r)); });
