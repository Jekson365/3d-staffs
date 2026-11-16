// ---------- 55-town.js : the streets, houses and trees below the balcony ----------
// Everything lies south of the block, where the windows look. The far ring of hills and towers is the painted
// panorama; this fills the 230 m in front of it with things that shift as you walk.
const TOWN_R = 232;

function makeTown(groundY, toSun) {
  const R = rng(4242), cx = MIDX, cz = MIDZ;
  const houses = [], trees = [], streets = [];
  // ---- layout: four rows of houses with streets between them ----
  const rows = [46, 94, 143, 192];
  for (let i = 0; i < rows.length; i++) {
    let x = cx - 214 + R() * 12;
    while (x < cx + 205) {
      const w = 20 + R() * 26, d = 12.5 + R() * 3.5, tall = i >= 2 && R() < 0.24;
      const h = tall ? 34 + R() * 16 : [9, 12, 15, 18][i] + Math.round(R() * [2, 3, 4, 5][i]) * 3;
      houses.push({ x0: x, x1: x + w, z0: rows[i] - d / 2, z1: rows[i] + d / 2, h, tint: (R() * 6) | 0 });
      x += w + 9 + R() * 15;
    }
  }
  for (const z of [26, 70, 118, 167]) streets.push({ a: [cx - TOWN_R, z], b: [cx + TOWN_R, z], w: 7 });
  for (const x of [cx - 138, cx - 52, cx + 44, cx + 131]) streets.push({ a: [x, 26], b: [x, cz + TOWN_R], w: 6 });
  const onStreet = (x, z, m) => streets.some((s) => (s.a[1] === s.b[1] ? Math.abs(z - s.a[1]) < s.w / 2 + m : Math.abs(x - s.a[0]) < s.w / 2 + m && z > 22));
  const inHouse = (x, z, m) => houses.some((b) => x > b.x0 - m && x < b.x1 + m && z > b.z0 - m && z < b.z1 + m);
  for (let i = 0; i < 520 && trees.length < 230; i++) {
    const x = cx + (R() - 0.5) * 420, z = 12 + R() * 205, r = 2.2 + R() * 2.3;
    if (onStreet(x, z, r * 0.6) || inHouse(x, z, r) || (Math.abs(x - cx) < 9 && z < 17)) continue;
    trees.push({ x, z, r, h: 4 + R() * 4.5, tone: R() });
  }

  // ---- ground picture drawn from the same layout ----
  const groundTex = tex(2048, 2048, (g, W, Hh) => {
    const k = W / (2 * TOWN_R), X = (x) => (x - cx + TOWN_R) * k, Z = (z) => (z - cz + TOWN_R) * k, Rg = rng(99);
    g.fillStyle = 'rgb(112,128,98)'; g.fillRect(0, 0, W, Hh);
    blotches(g, W, Hh, 260, Rg, 20, 90, 0.08);
    for (let i = 0; i < 2600; i++) { g.fillStyle = Rg() < 0.5 ? 'rgba(70,98,62,0.35)' : 'rgba(150,160,112,0.3)'; g.beginPath(); g.arc(Rg() * W, Rg() * Hh, 1 + Rg() * 3, 0, TAU); g.fill(); }
    // paved yards around the houses
    for (const b of houses) { g.fillStyle = 'rgba(176,170,158,0.55)'; g.fillRect(X(b.x0 - 3), Z(b.z0 - 3), (b.x1 - b.x0 + 6) * k, (b.z1 - b.z0 + 6) * k); }
    // the yard of this block: paths and a round sand playground
    g.strokeStyle = 'rgb(196,186,166)'; g.lineWidth = 1.6 * k; g.lineCap = 'round';
    g.beginPath(); g.moveTo(X(cx - 40), Z(14)); g.quadraticCurveTo(X(cx - 6), Z(21), X(cx + 34), Z(15)); g.moveTo(X(cx + 2), Z(11)); g.lineTo(X(cx + 4), Z(22.5)); g.stroke();
    g.fillStyle = 'rgb(206,190,150)'; g.beginPath(); g.arc(X(cx + 17), Z(18.5), 3.2 * k, 0, TAU); g.fill();
    g.fillStyle = 'rgb(196,84,60)'; g.fillRect(X(cx + 16), Z(17.6), 1.1 * k, 1.1 * k); g.fillStyle = 'rgb(70,120,170)'; g.fillRect(X(cx + 18.2), Z(19), 1.3 * k, 0.5 * k);
    // streets with pavements, centre dashes and parked cars
    const carCols = ['rgb(214,214,216)', 'rgb(52,54,60)', 'rgb(150,36,34)', 'rgb(40,70,120)', 'rgb(232,230,224)', 'rgb(110,112,116)', 'rgb(188,170,120)'];
    for (const s of streets) {
      const horiz = s.a[1] === s.b[1], len = horiz ? s.b[0] - s.a[0] : s.b[1] - s.a[1];
      const rect = (off0, off1, col) => { g.fillStyle = col; if (horiz) g.fillRect(X(s.a[0]), Z(s.a[1] + off0), len * k, (off1 - off0) * k); else g.fillRect(X(s.a[0] + off0), Z(s.a[1]), (off1 - off0) * k, len * k); };
      rect(-s.w / 2 - 1.8, s.w / 2 + 1.8, 'rgb(184,180,170)');
      rect(-s.w / 2, s.w / 2, 'rgb(104,106,108)');
      g.fillStyle = 'rgba(236,234,224,0.8)';
      for (let t = 2; t < len; t += 7) { if (horiz) g.fillRect(X(s.a[0] + t), Z(s.a[1] - 0.08), 3 * k, 0.16 * k); else g.fillRect(X(s.a[0] - 0.08), Z(s.a[1] + t), 0.16 * k, 3 * k); }
      for (const side of [-1, 1]) for (let t = 4; t < len - 6; t += 5.6) {
        if (Rg() < 0.45) continue;
        const o = side * (s.w / 2 - 1.15);
        g.fillStyle = carCols[(Rg() * carCols.length) | 0];
        if (horiz) g.fillRect(X(s.a[0] + t), Z(s.a[1] + o - 0.9), 4.3 * k, 1.8 * k); else g.fillRect(X(s.a[0] + o - 0.9), Z(s.a[1] + t), 1.8 * k, 4.3 * k);
        g.fillStyle = 'rgba(20,26,34,0.55)';
        if (horiz) g.fillRect(X(s.a[0] + t + 1.1), Z(s.a[1] + o - 0.75), 2.0 * k, 1.5 * k); else g.fillRect(X(s.a[0] + o - 0.75), Z(s.a[1] + t + 1.1), 1.5 * k, 2.0 * k);
      }
    }
    // shadows fall away from the sun
    const sl = 1 / Math.tan(Math.asin(toSun[1])), sh = Math.hypot(toSun[0], toSun[2]), sx = -toSun[0] / sh * sl, sz = -toSun[2] / sh * sl;
    g.fillStyle = 'rgba(18,26,30,0.36)';
    for (const b of houses) {
      const dx = sx * b.h, dz = sz * b.h, P = [[b.x0, b.z0], [b.x1, b.z0], [b.x1, b.z1], [b.x0, b.z1]], Q = P.map((p) => [p[0] + dx, p[1] + dz]);
      for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; g.beginPath(); g.moveTo(X(P[i][0]), Z(P[i][1])); g.lineTo(X(P[j][0]), Z(P[j][1])); g.lineTo(X(Q[j][0]), Z(Q[j][1])); g.lineTo(X(Q[i][0]), Z(Q[i][1])); g.closePath(); g.fill(); }
      g.fillRect(X(b.x0 + dx), Z(b.z0 + dz), (b.x1 - b.x0) * k, (b.z1 - b.z0) * k);
    }
    for (const t of trees) { g.beginPath(); g.ellipse(X(t.x + sx * t.h * 0.7), Z(t.z + sz * t.h * 0.7), t.r * 1.1 * k, t.r * 0.9 * k, 0, 0, TAU); g.fill(); }
  }, { clamp: true });

  // ---- house fronts: eight by eight window bays, repeated ----
  const facade = (night) => tex(256, 256, (g, W, Hh) => {
    const Rf = rng(night ? 7 : 6);
    g.fillStyle = night ? 'rgb(44,46,58)' : 'rgb(255,255,255)'; g.fillRect(0, 0, W, Hh);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) {
      const lit = night && Rf() < 0.34;
      g.fillStyle = lit ? (Rf() < 0.75 ? 'rgb(255,214,150)' : 'rgb(214,230,255)') : (night ? 'rgb(16,18,26)' : 'rgb(86,104,128)');
      g.fillRect(i * 32 + 8, j * 32 + 7, 16, 17);
      if (!night) { g.fillStyle = 'rgba(255,255,255,0.28)'; g.fillRect(i * 32 + 8, j * 32 + 7, 16, 5); }
    }
  });
  const fronts = [facade(false), facade(true)];
  const tints = ['rgb(232,226,214)', 'rgb(214,210,204)', 'rgb(240,236,228)', 'rgb(206,188,172)', 'rgb(220,216,224)', 'rgb(190,196,202)'].map((c) => new T.Color(c));
  const pos = [], uv = [], col = [], idx = [];
  const quad = (p, uvs, c, shade) => {
    const base = pos.length / 3;
    for (let i = 0; i < 4; i++) { pos.push(p[i][0], p[i][1], p[i][2]); uv.push(uvs[i][0], uvs[i][1]); col.push(c.r * shade[0], c.g * shade[1], c.b * shade[2]); }
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  for (const b of houses) {
    const c = tints[b.tint], y0 = groundY, y1 = groundY + b.h, w = (b.x1 - b.x0) / 3.2 / 8, d = (b.z1 - b.z0) / 3.2 / 8, fl = b.h / 3 / 8, o = R();
    const wall = (ax, az, bx, bz, n, shade) => quad([[ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az]], [[o, 0], [o + n, 0], [o + n, fl], [o, fl]], c, shade);
    wall(b.x1, b.z0, b.x0, b.z0, w, [0.6, 0.64, 0.72]);         // north front, in shade: the one the flat looks at
    wall(b.x0, b.z1, b.x1, b.z1, w, [1.0, 0.98, 0.94]);         // south, in the sun
    wall(b.x0, b.z0, b.x0, b.z1, d, [0.88, 0.86, 0.84]);        // west
    wall(b.x1, b.z1, b.x1, b.z0, d, [0.66, 0.69, 0.76]);        // east
    const pl = [0.008, 0.008];
    quad([[b.x0, y1, b.z1], [b.x1, y1, b.z1], [b.x1, y1, b.z0], [b.x0, y1, b.z0]], [pl, pl, pl, pl], c, [0.8, 0.79, 0.77]);
    quad([[b.x0 + 1.5, y1 + 0.02, b.z1 - 1.5], [b.x1 - 1.5, y1 + 0.02, b.z1 - 1.5], [b.x1 - 1.5, y1 + 0.02, b.z0 + 1.5], [b.x0 + 1.5, y1 + 0.02, b.z0 + 1.5]], [pl, pl, pl, pl], c, [0.56, 0.56, 0.57]);   // roof felt inside the parapet
  }
  const hg = new T.BufferGeometry();
  hg.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  hg.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  hg.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  hg.setIndex(idx);
  const houseMat = new T.MeshBasicMaterial({ map: fronts[0], vertexColors: true, toneMapped: false, transparent: true });
  const houseMesh = new T.Mesh(hg, houseMat);
  houseMesh.renderOrder = -2;

  // ---- trees: low blobs, lighter on the sunny side ----
  const tp = [], tc = [], ico = [new T.IcosahedronGeometry(1, 1), new T.IcosahedronGeometry(1, 0)], v = new T.Vector3(), cA = new T.Color('rgb(58,98,50)'), cB = new T.Color('rgb(104,134,62)'), cc = new T.Color();
  for (const t of trees) {
    const near = t.z < 80, g = ico[near ? 0 : 1], P = g.attributes.position;
    cc.copy(cA).lerp(cB, t.tone);
    // near trees are a clump of three blobs, far ones a single one
    const blobs = near ? [[0, 0, 0, 1], [0.62, -0.16, 0.2, 0.66], [-0.45, 0.1, -0.5, 0.6]] : [[0, 0, 0, 1]];
    for (const [bx, by, bz, bs] of blobs) {
      for (let i = 0; i < P.count; i++) {
        v.fromBufferAttribute(P, i);
        const lit = 0.5 + 0.5 * clamp(0.5 + 0.6 * (v.x * toSun[0] + v.y * toSun[1] + v.z * toSun[2]), 0, 1);
        tp.push(t.x + (bx + v.x * bs) * t.r, groundY + t.h + (by + v.y * bs * 0.82) * t.r, t.z + (bz + v.z * bs) * t.r);
        tc.push(cc.r * lit, cc.g * lit, cc.b * lit);
      }
    }
  }
  const tg = new T.BufferGeometry();
  tg.setAttribute('position', new T.Float32BufferAttribute(tp, 3));
  tg.setAttribute('color', new T.Float32BufferAttribute(tc, 3));
  const treeMat = new T.MeshBasicMaterial({ vertexColors: true, toneMapped: false, transparent: true });
  const treeMesh = new T.Mesh(tg, treeMat);
  treeMesh.renderOrder = -1.5;

  return {
    groundTex, meshes: [houseMesh, treeMesh], mats: [houseMat, treeMat], textures: [groundTex, fronts[0], fronts[1]],
    night(on) { houseMat.map = fronts[on ? 1 : 0]; houseMat.color.setScalar(on ? 0.75 : 1); treeMat.color.setScalar(on ? 0.1 : 1); },
  };
}
