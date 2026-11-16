// ---------- 20-mats.js : procedural textures and materials ----------
const MAT = {}, TEX = {};
let ANISO = 4;

// Baked light arrives as three per-vertex colours: A daylight, B lamps that are always on, C evening lamps.
const UNI = {
  uBA: { value: new T.Vector3(1, 1, 1) },
  uBB: { value: new T.Vector3(1, 1, 1) },
  uBC: { value: new T.Vector3(0, 0, 0) },
  uSpec: { value: 0.3 },
};
let LFB = '', LFM = '';
function patchChunks() {
  const a = 'vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );';
  const b = 'iblIrradiance += getIBLIrradiance( geometryNormal );';
  const c = 'radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );';
  const s1 = T.ShaderChunk.lights_fragment_begin, s2 = T.ShaderChunk.lights_fragment_maps;
  if (!s1.includes(a) || !s2.includes(b) || !s2.includes(c)) throw new Error('this page needs three.js r159 (shader chunks differ)');
  LFB = s1.replace(a, 'vec3 irradiance = getAmbientLightIrradiance( ambientLightColor ) + vBake;');
  // The environment map only adds reflections, dimmed where the baked light says the place is dark.
  LFM = s2.replace(b, '').replace(c, 'radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness ) * clamp( dot( vBake, vec3( uSpec ) ), 0.0, 1.0 );');
}
function bakePatch(m) {
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uBA = UNI.uBA; sh.uniforms.uBB = UNI.uBB; sh.uniforms.uBC = UNI.uBC; sh.uniforms.uSpec = UNI.uSpec;
    sh.vertexShader = 'attribute vec3 bakeA;\nattribute vec3 bakeB;\nattribute vec3 bakeC;\nuniform vec3 uBA;\nuniform vec3 uBB;\nuniform vec3 uBC;\nvarying vec3 vBake;\n' +
      sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n\tvBake = bakeA * uBA + bakeB * uBB + bakeC * uBC;');
    sh.fragmentShader = 'varying vec3 vBake;\nuniform float uSpec;\n' +
      sh.fragmentShader.replace('#include <lights_fragment_begin>', LFB).replace('#include <lights_fragment_maps>', LFM);
  };
  m.customProgramCacheKey = () => 'bake';
}

const rgb = (c, a) => (a === undefined ? 'rgb(' : 'rgba(') + Math.round(clamp(c[0], 0, 255)) + ',' + Math.round(clamp(c[1], 0, 255)) + ',' + Math.round(clamp(c[2], 0, 255)) + (a === undefined ? ')' : ',' + a + ')');
function tex(w, h, draw, o) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d', { willReadFrequently: true }), w, h);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = (o && o.clamp) ? T.ClampToEdgeWrapping : T.RepeatWrapping;
  t.anisotropy = ANISO;
  if (o && o.rep) t.repeat.set(o.rep[0], o.rep[1]);
  return t;
}
function grainNoise(g, w, h, amt, R) {
  const im = g.getImageData(0, 0, w, h), d = im.data;
  for (let i = 0; i < d.length; i += 4) { const n = (R() - 0.5) * amt; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(im, 0, 0);
}
function blotches(g, w, h, n, R, rMin, rMax, a) {
  for (let i = 0; i < n; i++) {
    const x = R() * w, y = R() * h, r = rMin + R() * (rMax - rMin), dark = R() < 0.5;
    for (const ox of [-w, 0, w]) for (const oy of [-h, 0, h]) {
      if (x + ox + r < 0 || x + ox - r > w || y + oy + r < 0 || y + oy - r > h) continue;
      const gr = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
      gr.addColorStop(0, dark ? 'rgba(0,0,0,' + a + ')' : 'rgba(255,255,255,' + a + ')');
      gr.addColorStop(1, dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(x + ox - r, y + oy - r, r * 2, r * 2);
    }
  }
}

// ---- wood ----
function drawBoard(g, seed, x, y, w, len, col) {
  const r = rng(seed);
  g.save(); g.beginPath(); g.rect(x, y, w, len); g.clip();
  g.fillStyle = rgb(col); g.fillRect(x, y, w, len);
  const n = Math.round(w / 2.6);
  for (let k = 0; k < n; k++) {
    const gx = x + r() * w, a = 0.035 + r() * 0.075;
    g.strokeStyle = r() < 0.68 ? 'rgba(62,46,32,' + a + ')' : 'rgba(255,248,236,' + a + ')';
    g.lineWidth = 0.5 + r() * 1.3;
    const amp = r() * 2.2, ph = r() * TAU, fr = (0.6 + r() * 1.8) * TAU / len;
    g.beginPath();
    for (let t = -8; t <= len + 8; t += 14) { const xx = gx + Math.sin(ph + t * fr) * amp; if (t === -8) g.moveTo(xx, y + t); else g.lineTo(xx, y + t); }
    g.stroke();
  }
  if (r() < 0.3) {
    const kx = x + w * (0.25 + r() * 0.5), ky = y + len * (0.1 + r() * 0.8);
    for (let q = 3; q > 0; q--) { g.strokeStyle = 'rgba(70,50,35,' + (0.05 + 0.04 * q) + ')'; g.lineWidth = 1; g.beginPath(); g.ellipse(kx, ky, q * 2.4, q * 4.6, 0, 0, TAU); g.stroke(); }
    g.fillStyle = 'rgba(60,42,30,0.35)'; g.beginPath(); g.ellipse(kx, ky, 1.7, 3, 0, 0, TAU); g.fill();
  }
  g.fillStyle = 'rgba(28,20,14,0.55)'; g.fillRect(x, y, 1, len); g.fillRect(x, y, w, 1.2);
  g.fillStyle = 'rgba(255,255,255,0.09)'; g.fillRect(x + 1, y, 1, len);
  g.restore();
}
// Floor boards: 12 planks of 0.2 m across 2.4 m, running 3.6 m along the canvas height.
function texPlanks() {
  return tex(1024, 1024, (g, W, H) => {
    const R = rng(11), cols = 12, pw = W / cols, base = [189, 179, 165];
    g.fillStyle = rgb(base); g.fillRect(0, 0, W, H);
    for (let c = 0; c < cols; c++) {
      const n = 2 + (R() < 0.55 ? 1 : 0), lens = [];
      let sum = 0;
      for (let i = 0; i < n; i++) { const l = 0.7 + R(); lens.push(l); sum += l; }
      let y = R() * H;
      for (let i = 0; i < n; i++) {
        const len = (lens[i] / sum) * H, tone = 1 + (R() - 0.5) * 0.2, hue = (R() - 0.5) * 0.05, seed = (R() * 1e9) | 0;
        const col = [base[0] * tone * (1 + hue), base[1] * tone, base[2] * tone * (1 - hue)];
        drawBoard(g, seed, c * pw, y, pw, len, col);
        if (y + len > H) drawBoard(g, seed, c * pw, y - H, pw, len, col);
        y = (y + len) % H;
      }
    }
  });
}
// Neutral straight grain, 1 m square, tinted by the material colour.
function texGrain() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(5);
    g.fillStyle = 'rgb(233,225,215)'; g.fillRect(0, 0, W, H);
    for (let k = 0; k < 560; k++) {
      const x = R() * W, a = 0.03 + R() * 0.09;
      g.strokeStyle = R() < 0.72 ? 'rgba(70,50,34,' + a + ')' : 'rgba(255,255,255,' + a + ')';
      g.lineWidth = 0.5 + R() * 1.6;
      const amp = R() * 5, ph = R() * TAU, fr = Math.round(1 + R() * 2) * TAU / H;
      g.beginPath();
      for (let y = 0; y <= H; y += 16) { const xx = x + Math.sin(ph + y * fr) * amp; if (!y) g.moveTo(xx, y); else g.lineTo(xx, y); }
      g.stroke();
    }
  });
}
// Table top: five glued staves per 0.5 m with clearly different tones, grain along the canvas width.
function texStaves() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(23), tones = [1.0, 0.8, 0.93, 0.74, 0.88], sh = H / 5;
    for (let s = 0; s < 5; s++) {
      const t = tones[s];
      g.fillStyle = rgb([236 * t, 226 * t, 212 * t]); g.fillRect(0, s * sh, W, sh);
      for (let k = 0; k < 44; k++) {
        const y = s * sh + R() * sh, a = 0.04 + R() * 0.1;
        g.strokeStyle = R() < 0.75 ? 'rgba(70,48,30,' + a + ')' : 'rgba(255,255,255,' + a + ')';
        g.lineWidth = 0.5 + R() * 1.4;
        const amp = R() * 2.5, ph = R() * TAU, fr = Math.round(1 + R() * 2) * TAU / W;
        g.beginPath();
        for (let x = 0; x <= W; x += 16) { const yy = y + Math.sin(ph + x * fr) * amp; if (!x) g.moveTo(x, yy); else g.lineTo(x, yy); }
        g.stroke();
      }
      g.fillStyle = 'rgba(40,28,18,0.4)'; g.fillRect(0, s * sh, W, 1);
    }
  });
}

// ---- tile and stone ----
function texTerrazzo() {   // 1.2 m: four 0.6 m tiles
  return tex(512, 512, (g, W, H) => {
    const R = rng(31);
    g.fillStyle = 'rgb(236,234,229)'; g.fillRect(0, 0, W, H);
    const chips = [[150, 150, 152], [188, 184, 176], [96, 98, 102], [206, 190, 168], [222, 222, 224]];
    for (let i = 0; i < 2600; i++) {
      const c = chips[(R() * chips.length) | 0], x = R() * W, y = R() * H, s = 0.8 + R() * R() * 4.2;
      g.fillStyle = rgb(c, 0.35 + R() * 0.5);
      g.beginPath(); g.ellipse(x, y, s, s * (0.5 + R() * 0.6), R() * PI, 0, TAU); g.fill();
    }
    g.fillStyle = 'rgba(150,148,142,0.75)';
    for (const p of [0, W / 2]) { g.fillRect(p, 0, 1.5, H); g.fillRect(0, p, W, 1.5); }
  });
}
function texWallTile() {   // 0.6 m: two 0.6 x 0.3 m glazed tiles stacked
  return tex(256, 256, (g, W, H) => {
    g.fillStyle = 'rgb(240,241,240)'; g.fillRect(0, 0, W, H);
    for (let t = 0; t < 2; t++) {
      const gr = g.createLinearGradient(0, t * H / 2, W, (t + 1) * H / 2);
      gr.addColorStop(0, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(210,214,216,0.25)');
      g.fillStyle = gr; g.fillRect(0, t * H / 2, W, H / 2);
    }
    g.fillStyle = 'rgb(196,198,198)';
    g.fillRect(0, 0, W, 1.5); g.fillRect(0, H / 2, W, 1.5); g.fillRect(0, 0, 1.5, H);
  });
}
function texConcrete() {   // 1.2 m: four 0.6 m slabs
  return tex(512, 512, (g, W, H) => {
    const R = rng(41);
    g.fillStyle = 'rgb(134,136,138)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 46, R, 30, 120, 0.07);
    blotches(g, W, H, 160, R, 3, 14, 0.06);
    grainNoise(g, W, H, 18, R);
    g.fillStyle = 'rgba(48,48,52,0.85)';
    for (const p of [0, W / 2]) { g.fillRect(p, 0, 2.5, H); g.fillRect(0, p, W, 2.5); }
  });
}
function texStone() {      // 1.5 m of dark honed slate with pale veins
  return tex(512, 512, (g, W, H) => {
    const R = rng(53);
    g.fillStyle = 'rgb(52,56,64)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 40, R, 40, 150, 0.1);
    for (let v = 0; v < 15; v++) {
      let x = R() * W, y = R() * H, a = R() * TAU;
      g.strokeStyle = 'rgba(214,220,228,' + (0.12 + R() * 0.3) + ')';
      g.lineWidth = 0.6 + R() * 1.5;
      g.beginPath(); g.moveTo(x, y);
      for (let s = 0; s < 26; s++) { a += (R() - 0.5) * 0.7; x += Math.cos(a) * 14; y += Math.sin(a) * 14; g.lineTo(x, y); }
      g.stroke();
    }
    grainNoise(g, W, H, 10, R);
  });
}

// ---- textiles ----
function texFabric() {     // 0.25 m of plain weave, near white so the material colour sets the hue
  return tex(256, 256, (g, W, H) => {
    const R = rng(61);
    g.fillStyle = 'rgb(228,228,228)'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < W; i += 2) {
      g.fillStyle = 'rgba(0,0,0,' + (0.04 + R() * 0.07) + ')'; g.fillRect(i, 0, 1, H);
      g.fillStyle = 'rgba(0,0,0,' + (0.04 + R() * 0.07) + ')'; g.fillRect(0, i, W, 1);
    }
    grainNoise(g, W, H, 26, R);
  });
}
// 0.4 m of chenille: heathered patches of light and dark pile, short curly tufts, a faint diagonal weave.
// Near white, so the material colour sets the hue.
function texChenille() {
  return tex(512, 512, (g, W, H) => {
    const R = rng(83);
    g.fillStyle = 'rgb(214,214,214)'; g.fillRect(0, 0, W, H);
    blotches(g, W, H, 90, R, 10, 40, 0.07);          // the marbled look of crushed pile
    blotches(g, W, H, 320, R, 3, 10, 0.07);
    g.lineCap = 'round';
    for (let i = 0; i < 9000; i++) {                  // tufts: short bent strokes, light where the pile catches the light
      const x = R() * W, y = R() * H, a = R() * TAU, l = 2 + R() * 6, b = (R() - 0.5) * 1.6, light = R() < 0.55;
      g.strokeStyle = light ? 'rgba(255,255,255,' + (0.1 + R() * 0.25) + ')' : 'rgba(40,40,40,' + (0.06 + R() * 0.16) + ')';
      g.lineWidth = 0.7 + R() * 1.1;
      for (const ox of [-W, 0, W]) for (const oy of [-H, 0, H]) {
        if (x + ox < -10 || x + ox > W + 10 || y + oy < -10 || y + oy > H + 10) continue;
        g.beginPath(); g.moveTo(x + ox, y + oy);
        g.quadraticCurveTo(x + ox + Math.cos(a + b) * l * 0.6, y + oy + Math.sin(a + b) * l * 0.6, x + ox + Math.cos(a) * l, y + oy + Math.sin(a) * l);
        g.stroke();
      }
    }
    g.fillStyle = 'rgba(0,0,0,0.035)';               // weave: rows 2 px apart
    for (let y = 0; y < H; y += 2) g.fillRect(0, y, W, 1);
    grainNoise(g, W, H, 22, R);
  });
}
function texStripe() {     // 0.4 m: woven throw, grey stripes on off-white
  return tex(256, 256, (g, W, H) => {
    const R = rng(67);
    g.fillStyle = 'rgb(226,224,220)'; g.fillRect(0, 0, W, H);
    for (let s = 0; s < 8; s++) { g.fillStyle = s % 2 ? 'rgb(128,130,134)' : 'rgb(172,174,176)'; g.fillRect(0, s * 32 + 6, W, s % 2 ? 9 : 4); }
    grainNoise(g, W, H, 22, R);
  });
}
function texRugTri() {     // 0.3 m repeat: triangle lattice
  return tex(256, 256, (g, W, H) => {
    const R = rng(71);
    g.fillStyle = 'rgb(84,84,88)'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgb(168,166,160)'; g.lineWidth = 5;
    g.beginPath();
    for (const y of [0, H / 2, H]) { g.moveTo(0, y); g.lineTo(W, y); }
    for (let k = -2; k <= 2; k++) {
      const x = k * W / 2;
      g.moveTo(x, 0); g.lineTo(x + W / 2, H / 2); g.lineTo(x, H);
      g.moveTo(x + W / 2, 0); g.lineTo(x, H / 2); g.lineTo(x + W / 2, H);
    }
    g.stroke();
    grainNoise(g, W, H, 30, R);
  });
}
function texPlaid() {      // whole round rug, plaid laid on the diagonal
  return tex(512, 512, (g, W, H) => {
    const R = rng(73);
    g.fillStyle = 'rgb(150,150,152)'; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H / 2); g.rotate(PI / 4);
    const L = W * 0.75, step = 52;
    for (let pass = 0; pass < 2; pass++) {
      g.rotate(pass * PI / 2);
      for (let p = -L; p < L; p += step) {
        g.fillStyle = 'rgba(52,54,58,0.42)'; g.fillRect(p, -L, 24, 2 * L);
        g.fillStyle = 'rgba(236,236,232,0.5)'; g.fillRect(p + 34, -L, 6, 2 * L);
        g.fillStyle = 'rgba(30,30,34,0.5)'; g.fillRect(p + 10, -L, 2, 2 * L);
      }
    }
    g.restore();
    grainNoise(g, W, H, 26, R);
  }, { clamp: true });
}
function texWicker() {     // 0.1 m basket weave
  return tex(128, 128, (g, W, H) => {
    g.fillStyle = 'rgb(214,206,190)'; g.fillRect(0, 0, W, H);
    for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) {
      const over = (i + j) % 2 === 0;
      g.fillStyle = over ? 'rgb(240,234,220)' : 'rgb(186,176,158)';
      if (over) g.fillRect(i * 16 + 1, j * 16 + 4, 14, 8); else g.fillRect(i * 16 + 4, j * 16 + 1, 8, 14);
    }
  });
}

// ---- pictures and small things ----
function texHob() {
  return tex(256, 256, (g, W, H) => {
    g.fillStyle = 'rgb(12,12,14)'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgb(96,98,102)'; g.lineWidth = 2;
    for (const [x, y, r] of [[78, 70, 44], [182, 74, 34], [76, 186, 34], [182, 186, 44]]) {
      g.beginPath(); g.arc(x, y, r, 0, TAU); g.stroke();
      g.beginPath(); g.arc(x, y, r * 0.55, 0, TAU); g.stroke();
    }
    g.strokeStyle = 'rgb(60,62,66)'; g.strokeRect(4, 4, W - 8, H - 8);
  }, { clamp: true });
}
function texArt(kind) {
  return tex(384, 512, (g, W, H) => {
    const R = rng(90 + kind);
    g.fillStyle = 'rgb(236,231,220)'; g.fillRect(0, 0, W, H);
    if (kind === 1) {      // arcs and a sun
      g.fillStyle = 'rgb(202,150,74)'; g.beginPath(); g.arc(W * 0.64, H * 0.3, 62, 0, TAU); g.fill();
      for (const [c, y, a] of [['rgb(44,92,98)', 0.62, 150], ['rgb(52,56,62)', 0.78, 190], ['rgb(160,176,172)', 0.94, 230]]) {
        g.fillStyle = c; g.beginPath(); g.ellipse(W * 0.5, H * (y + 0.35), W * 0.9, a, 0, 0, TAU); g.fill();
      }
      g.strokeStyle = 'rgba(40,40,44,0.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(W * 0.16, H * 0.1); g.lineTo(W * 0.16, H * 0.52); g.stroke();
    } else if (kind === 2) {   // stacked washes
      const bands = ['rgb(198,206,204)', 'rgb(126,150,154)', 'rgb(56,92,100)', 'rgb(214,170,108)', 'rgb(64,60,60)'];
      let y = H * 0.18;
      for (const c of bands) {
        const h = H * (0.08 + R() * 0.12);
        g.fillStyle = c; g.beginPath(); g.moveTo(0, y + R() * 10);
        for (let x = 0; x <= W; x += 24) g.lineTo(x, y + Math.sin(x * 0.02 + R()) * 5 + R() * 4);
        g.lineTo(W, y + h); g.lineTo(0, y + h); g.closePath(); g.fill();
        y += h;
      }
    } else {               // leaf study
      g.strokeStyle = 'rgb(58,84,62)'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(W * 0.5, H * 0.92); g.quadraticCurveTo(W * 0.46, H * 0.5, W * 0.52, H * 0.1); g.stroke();
      for (let i = 0; i < 9; i++) {
        const t = 0.16 + i * 0.085, s = i % 2 ? 1 : -1, len = 60 + (1 - Math.abs(t - 0.5) * 2) * 70;
        g.fillStyle = i % 3 ? 'rgb(74,108,76)' : 'rgb(118,144,98)';
        g.save(); g.translate(W * 0.5, H * (1 - t)); g.rotate(s * (0.9 - t * 0.3)); g.beginPath(); g.ellipse(0, -len / 2, 15, len / 2, 0, 0, TAU); g.fill(); g.restore();
      }
    }
    grainNoise(g, W, H, 14, R);
  }, { clamp: true });
}
function texGlow() {
  return tex(128, 128, (g, W, H) => {
    const gr = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(255,255,255,0.55)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.14)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }, { clamp: true });
}

// ---- the world outside ----
// Panorama strip for a cylinder of radius 220 m that spans 21 m below to 45 m above eye level.
const PANO = { R: 220, lo: -21, hi: 45 };
function texPanorama(night) {
  return tex(4096, 512, (g, W, H) => {
    const R = rng(77), span = PANO.hi - PANO.lo, yOf = (m) => H * (PANO.hi - m) / span, pxm = W / (TAU * PANO.R);
    g.clearRect(0, 0, W, H);
    const ridge = (base, amp, col, seed, freq) => {
      const r = rng(seed), ph = [r() * TAU, r() * TAU, r() * TAU, r() * TAU];
      g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) {
        const a = (x / W) * TAU;
        const h = base + amp * (0.5 * Math.sin(a * freq + ph[0]) + 0.28 * Math.sin(a * freq * 2 + ph[1]) + 0.14 * Math.sin(a * freq * 5 + ph[2]) + 0.08 * Math.sin(a * freq * 11 + ph[3]));
        g.lineTo(x, yOf(h));
      }
      g.lineTo(W, H); g.closePath(); g.fill();
    };
    ridge(17, 11, night ? 'rgb(30,36,52)' : 'rgb(158,176,196)', 3, 2);
    ridge(9, 9, night ? 'rgb(24,30,42)' : 'rgb(128,150,150)', 4, 3);
    // a lattice TV mast on the ridge, the way one stands above Tbilisi
    const tx = W * 0.71, tb = yOf(14), tt = yOf(40);
    g.strokeStyle = night ? 'rgb(120,90,90)' : 'rgb(196,150,140)'; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(tx - 7, tb); g.lineTo(tx, tt); g.lineTo(tx + 7, tb); g.moveTo(tx - 4, yOf(25)); g.lineTo(tx + 4, yOf(25)); g.moveTo(tx - 2, yOf(33)); g.lineTo(tx + 2, yOf(33)); g.stroke();
    if (night) { g.fillStyle = 'rgb(255,70,60)'; g.fillRect(tx - 1, tt - 1, 2, 2); g.fillRect(tx - 1, yOf(33), 2, 2); }
    ridge(3.5, 5, night ? 'rgb(18,24,30)' : 'rgb(98,122,104)', 5, 4);
    // town
    const wallCols = [[214, 206, 194], [196, 190, 184], [226, 220, 210], [186, 172, 160], [204, 196, 200], [168, 172, 178]];
    for (let i = 0; i < 230; i++) {
      const x = R() * W, w = (9 + R() * 16) * pxm, top = -12 + R() * R() * 34, c = wallCols[(R() * wallCols.length) | 0], k = night ? 0.13 : 0.86 + R() * 0.14;
      const y0 = yOf(top), y1 = yOf(PANO.lo);
      for (const ox of [0, -W, W]) {
        if (x + ox + w < 0 || x + ox > W) continue;
        g.fillStyle = rgb([c[0] * k, c[1] * k, c[2] * k * (night ? 1.3 : 1)]); g.fillRect(x + ox, y0, w, y1 - y0);
        g.fillStyle = night ? 'rgba(0,0,0,0.35)' : 'rgba(40,50,70,0.16)'; g.fillRect(x + ox + w * 0.62, y0, w * 0.38, y1 - y0);
      }
      const r2 = rng(1000 + i);
      for (let wy = y0 + 5; wy < y1 - 6; wy += 11) for (let wx = 3; wx < w - 3; wx += 5) {
        const lit = night && r2() < 0.3;
        g.fillStyle = lit ? (r2() < 0.7 ? 'rgb(255,214,140)' : 'rgb(206,226,255)') : (night ? 'rgb(10,12,18)' : 'rgba(58,72,92,0.55)');
        for (const ox of [0, -W, W]) g.fillRect(x + ox + wx, wy, 2.4, 5);
      }
    }
    // trees along the street below
    for (let i = 0; i < 700; i++) {
      const x = R() * W, y = yOf(-13 - R() * 7), s = 5 + R() * 9;
      g.fillStyle = night ? 'rgb(12,20,16)' : rgb([54 + R() * 30, 92 + R() * 36, 50 + R() * 20]);
      g.beginPath(); g.ellipse(x, y, s * 1.2, s, 0, 0, TAU); g.fill();
    }
    // haze near the horizon
    const hz = g.createLinearGradient(0, yOf(26), 0, yOf(-8));
    hz.addColorStop(0, 'rgba(210,224,236,0)'); hz.addColorStop(1, night ? 'rgba(30,36,60,0.2)' : 'rgba(214,226,236,0.3)');
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = hz; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
  }, { clamp: false });
}
function drawSky(g, W, H, night) {
  const gr = g.createLinearGradient(0, 0, 0, H);
  if (night) {
    gr.addColorStop(0, 'rgb(10,16,38)'); gr.addColorStop(0.36, 'rgb(22,34,72)'); gr.addColorStop(0.47, 'rgb(96,74,104)');
    gr.addColorStop(0.5, 'rgb(214,128,86)'); gr.addColorStop(0.52, 'rgb(60,56,74)'); gr.addColorStop(1, 'rgb(16,18,26)');
  } else {
    gr.addColorStop(0, 'rgb(52,112,198)'); gr.addColorStop(0.3, 'rgb(104,160,224)'); gr.addColorStop(0.46, 'rgb(182,212,238)');
    gr.addColorStop(0.5, 'rgb(222,234,242)'); gr.addColorStop(0.52, 'rgb(170,186,190)'); gr.addColorStop(1, 'rgb(120,134,128)');
  }
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
}

function lin(hex) { const c = new T.Color(hex); return [c.r, c.g, c.b]; }
// o.rough / o.metal / o.env make a glossy (standard) material; without them it is a cheap matte one.
function mk(name, o) {
  o = o || {};
  MKO[name] = o;
  const color = o.color === undefined ? 0xffffff : o.color;
  const glossy = o.rough !== undefined || o.metal !== undefined || o.env !== undefined;
  let m;
  if (glossy) {
    m = new T.MeshStandardMaterial({ color, roughness: o.rough === undefined ? 0.5 : o.rough, metalness: o.metal || 0 });
    m.envMapIntensity = o.env === undefined ? 0.5 : o.env;
  } else m = new T.MeshLambertMaterial({ color });
  if (o.map) m.map = o.map;
  if (o.side) m.side = o.side;
  m.dithering = true;
  m.shadowSide = T.DoubleSide;
  const c = lin(color), k = o.texAlb || 1;
  m.userData = { bake: true, cast: o.cast !== false, recv: o.recv !== false, fine: !!o.fine, two: !!o.two, alb: o.alb || [c[0] * k, c[1] * k, c[2] * k], env: glossy ? m.envMapIntensity : 0 };
  bakePatch(m);
  MAT[name] = m;
  return m;
}
// ---- finishes the viewer can pick for floors and walls (the Finishes panel) ----
// size: metres one copy of the texture covers. Every room's floor and every room group's walls get a material of their own
// (SURF lists them, filled by buildPlan), so a change touches one room only. 'design' puts back what the flat was built with.
const FINISHES = {
  floor: [
    { id: 'design', en: 'As designed' },
    { id: 'oak', en: 'Oak boards', tex: 'planks', size: [2.4, 3.6], color: 0xffffff, rough: 0.46 },
    { id: 'darkOak', en: 'Dark oak', tex: 'planks', size: [2.4, 3.6], color: 0x9c9186, rough: 0.46 },
    { id: 'paleOak', en: 'Pale oak', tex: 'planks', size: [2.4, 3.6], color: 0xd6cdc2, rough: 0.5 },
    { id: 'greyOak', en: 'Grey oak', tex: 'planks', size: [2.4, 3.6], color: 0xbcb8b4, rough: 0.5 },
    { id: 'terrazzo', en: 'Terrazzo', tex: 'terrazzo', size: [1.2, 1.2], color: 0xffffff, rough: 0.3 },
    { id: 'tiles', en: 'Ceramic tiles', tex: 'wallTile', size: [0.6, 0.6], color: 0xffffff, rough: 0.25 },
    { id: 'slate', en: 'Slate', tex: 'stone', size: [1.5, 1.5], color: 0xffffff, rough: 0.35 },
    { id: 'concrete', en: 'Polished concrete', tex: 'concrete', size: [1.2, 1.2], color: 0xd2d2d4, rough: 0.4 },
  ],
  wall: [
    { id: 'design', en: 'As designed' },
    { id: 'white', en: 'White paint', color: 0xefece5 },
    { id: 'greige', en: 'Warm grey', color: 0xd8d1c5 },
    { id: 'sage', en: 'Sage green', color: 0xbcc6ae },
    { id: 'blue', en: 'Pale blue', color: 0xbccad6 },
    { id: 'clay', en: 'Clay', color: 0xd6aa90 },
    { id: 'charcoal', en: 'Charcoal', color: 0x5d6064 },
    { id: 'tiles', en: 'Ceramic tiles', tex: 'wallTile', size: [0.6, 0.6], color: 0xffffff, rough: 0.22 },
    { id: 'concrete', en: 'Concrete', tex: 'concrete', size: [1.2, 1.2], color: 0xdcdcdc, rough: 0.8 },
  ],
};
const FIN_TEX = { planks: () => TEX.planks || (TEX.planks = texPlanks()), terrazzo: texTerrazzo, wallTile: texWallTile, stone: texStone, concrete: texConcrete };
const SURF = { floor: [], wall: [] };   // { key: material name, base, uvm: [u, v] metres per texture unit, rooms, label }
const MKO = {};
// A material of its own, made like `base`, for one room's floor or one group's walls.
function mkLike(key, base) {
  if (!MAT[key]) mk(key, MKO[base] || {});
  return key;
}
function applyFinish(s, id) {
  const m = MAT[s.key], kind = SURF.floor.includes(s) ? 'floor' : 'wall', f = FINISHES[kind].find((q) => q.id === id) || FINISHES[kind][0];
  if (!s.orig) s.orig = { map: m.map, color: m.color.getHex(), rough: m.roughness };
  let map = s.orig.map, color = s.orig.color, rough = s.orig.rough;
  if (f.id !== 'design') {
    color = f.color; rough = f.rough === undefined ? 0.6 : f.rough; map = null;
    if (f.tex) {
      const k = 'fin:' + f.id + ':' + s.uvm.join('x');
      if (!TEX[k]) {
        TEX['fin:' + f.tex] = TEX['fin:' + f.tex] || FIN_TEX[f.tex]();
        const t = TEX[k] = TEX['fin:' + f.tex].clone();
        t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(s.uvm[0] / f.size[0], s.uvm[1] / f.size[1]); t.needsUpdate = true;
      }
      map = TEX[k];
    }
  }
  if (m.map !== map) m.needsUpdate = true;
  m.map = map; m.color.setHex(color);
  if (m.roughness !== undefined && rough !== undefined) m.roughness = rough;
  s.now = f.id;
}

function mkRaw(name, m, alb) {
  m.userData = { bake: false, cast: false, recv: false, alb: alb || [0.5, 0.5, 0.5], env: m.envMapIntensity || 0 };
  MAT[name] = m;
  return m;
}

function initMaterials(maxAniso) {
  ANISO = Math.min(8, maxAniso || 1);
  patchChunks();
  const planks = TEX.planks = texPlanks(), grain = TEX.grain = texGrain(), fabric = texFabric();
  fabric.repeat.set(4, 4);
  const D = T.DoubleSide;

  // shell
  mk('wall', { color: 0xefece5, fine: true });
  mk('wallTile', { map: texWallTile(), rough: 0.22, env: 0.45, fine: true, alb: [0.84, 0.85, 0.84] });
  mk('splash', { map: texWallTile(), rough: 0.22, env: 0.45, alb: [0.84, 0.85, 0.84] });
  mk('ceil', { color: 0xf8f7f3, fine: true, cast: false });
  mk('floorLiv', { map: planks, rough: 0.46, env: 0.34, fine: true, alb: [0.48, 0.43, 0.36], cast: false });
  mk('floorHall', { map: planks, color: 0x9c9186, rough: 0.46, env: 0.34, fine: true, alb: [0.17, 0.14, 0.11], cast: false });
  mk('floorBed', { map: planks, color: 0xd6cdc2, rough: 0.5, env: 0.3, fine: true, alb: [0.32, 0.27, 0.21], cast: false });
  mk('floorBath', { map: texTerrazzo(), rough: 0.3, env: 0.4, fine: true, alb: [0.78, 0.77, 0.73], cast: false });
  mk('floorBalc', { map: texConcrete(), color: 0xb2b2b4, fine: true, alb: [0.11, 0.11, 0.115], cast: false });
  mk('facade', { color: 0xe4e0d8, fine: true });
  mk('skirt', { color: 0xf5f4f0 });
  mk('trim', { color: 0xf3f2ef, rough: 0.42, env: 0.3 });           // door linings, window frames
  mk('doorWhite', { color: 0xf1efea, rough: 0.48, env: 0.25 });
  mk('doorEntry', { map: grain, color: 0x6b4f3c, rough: 0.5, env: 0.3, texAlb: 0.8 });
  mk('alu', { color: 0x33363a, rough: 0.4, metal: 0.7, env: 0.6 });  // anthracite aluminium of the balcony glazing
  mk('aluLight', { color: 0xb9bcc0, rough: 0.38, metal: 0.9, env: 0.8 });
  mk('switch', { color: 0xfbfbf9, rough: 0.4, env: 0.3 });

  // wood
  mk('oak', { map: grain, color: 0xe6c89f, rough: 0.55, env: 0.25, texAlb: 0.8 });
  mk('oakStave', { map: texStaves(), color: 0xe9cda6, rough: 0.5, env: 0.3, texAlb: 0.66 });
  mk('walnut', { map: grain, color: 0x6a4f3d, rough: 0.5, env: 0.3, texAlb: 0.8 });
  mk('greyWood', { map: grain, color: 0x94826f, rough: 0.7, env: 0.15, texAlb: 0.8 });
  mk('darkWood', { map: grain, color: 0x3a2e28, rough: 0.5, env: 0.3, texAlb: 0.8 });
  MAT.oakStave.map.repeat.set(2, 2);

  // kitchen and bathroom
  mk('cabinet', { color: 0xf2f1ed, rough: 0.42, env: 0.25 });
  mk('plinth', { color: 0x2a2a2c });
  mk('stone', { map: texStone(), rough: 0.16, env: 0.7, alb: [0.05, 0.055, 0.065] });
  MAT.stone.map.repeat.set(1 / 1.5, 1 / 1.5);
  mk('steel', { color: 0xcfd2d6, rough: 0.3, metal: 1, env: 0.9 });
  mk('fridge', { color: 0x8795a3, rough: 0.34, metal: 0.85, env: 0.8 });
  mk('chrome', { color: 0xffffff, rough: 0.07, metal: 1, env: 1.1 });
  mk('ceramic', { color: 0xfbfbfa, rough: 0.1, env: 0.55 });
  mk('hob', { map: texHob(), rough: 0.08, env: 0.9, alb: [0.02, 0.02, 0.02] });
  mk('blackMetal', { color: 0x1d1d1f, rough: 0.42, metal: 0.6, env: 0.5 });
  mk('brass', { color: 0xc9a25a, rough: 0.3, metal: 1, env: 0.8 });

  // upholstery and textiles
  mk('sofa', { map: fabric, color: 0x6c7078, texAlb: 0.78 });
  mk('cushion', { map: fabric, color: 0xb9c7d6, texAlb: 0.78 });
  mk('terracotta', { map: fabric, color: 0xa65c4a, texAlb: 0.78 });
  mk('beige', { map: fabric, color: 0xe6d6bd, texAlb: 0.78 });
  const chen = texChenille();
  chen.repeat.set(1 / 0.4, 1 / 0.4);
  mk('chenille', { map: chen, color: 0xb9b7b3, texAlb: 0.8 });       // light warm grey chenille (modularSofa)
  mk('ebony', { map: grain, color: 0x2b2624, rough: 0.55, env: 0.2, texAlb: 0.8 });   // near-black stained legs
  mk('linen', { map: fabric, color: 0xfcfaf5, texAlb: 0.78 });
  mk('duvet', { map: fabric, color: 0xd6d4d0, texAlb: 0.78 });
  mk('stripe', { map: texStripe(), alb: [0.55, 0.55, 0.55] });
  MAT.stripe.map.repeat.set(2.5, 2.5);
  mk('skyblue', { map: fabric, color: 0xaed2f2, texAlb: 0.78 });
  mk('towel', { map: fabric, color: 0x9dbcc0, texAlb: 0.78 });
  mk('rugTri', { map: texRugTri(), alb: [0.1, 0.1, 0.11], cast: false });
  MAT.rugTri.map.repeat.set(1 / 0.3, 1 / 0.3);
  mk('rugPlaid', { map: texPlaid(), alb: [0.26, 0.26, 0.27], cast: false });
  mk('curtain', { color: 0xffffff, side: D, two: true });
  mk('rubber', { color: 0x2a2a2e });

  // plants
  mk('leafA', { color: 0x4a7a3e, side: D, two: true });
  mk('leafB', { color: 0x7a9a3e, side: D, two: true });
  mk('leafC', { color: 0x9cbd3c, side: D, two: true });
  mk('leafD', { color: 0x6f8f6a, side: D, two: true });
  mk('stem', { color: 0x5c4630 });
  mk('pot', { color: 0x2e2e31, rough: 0.6, env: 0.2 });
  mk('potWhite', { color: 0xecebe6, rough: 0.5, env: 0.25 });
  mk('potTerra', { color: 0xb86f4f });
  mk('soil', { color: 0x2b2118 });

  // odds and ends
  mk('wicker', { map: texWicker(), color: 0xd9b27a, texAlb: 0.75 });
  mk('wickerWhite', { map: texWicker(), color: 0xffffff, texAlb: 0.75 });
  MAT.wicker.map.repeat.set(10, 10);
  mk('plastic', { color: 0x19191b, rough: 0.36, env: 0.5 });        // chair shells, TV bodies
  mk('screen', { color: 0x05060a, rough: 0.06, env: 1.0 });
  mk('paper', { color: 0xf6f4ef });
  mk('teal', { color: 0x1f6068 });
  mk('ochre', { color: 0xc9983a });
  mk('charcoal', { color: 0x2e2f35 });
  mk('yellow', { color: 0xf3d132 });
  mk('wine', { color: 0x5c0f1e, rough: 0.1, env: 0.8 });
  mk('bottle', { color: 0x1c3324, rough: 0.08, env: 1.0 });
  mk('shoe', { color: 0xdddcda });
  mk('art1', { map: texArt(1), alb: [0.5, 0.48, 0.42] });
  mk('art2', { map: texArt(2), alb: [0.4, 0.44, 0.44] });
  mk('art3', { map: texArt(3), alb: [0.6, 0.6, 0.54] });

  // not baked: glass, mirrors, glowing things
  const glass = new T.MeshStandardMaterial({ color: 0xdff1f0, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.16, depthWrite: false });
  glass.envMapIntensity = 1.1;
  mkRaw('glass', glass);
  const glassTeal = new T.MeshStandardMaterial({ color: 0x8fd0cc, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.3, depthWrite: false, side: D });
  glassTeal.envMapIntensity = 1.0;
  mkRaw('glassTeal', glassTeal);
  const mirror = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.02, metalness: 1 });
  mirror.envMapIntensity = 1.0;
  mkRaw('mirror', mirror);
  mkRaw('lampOn', new T.MeshBasicMaterial({ color: new T.Color(2.6, 1.9, 1.05) }));    // warm shades that glow day and evening
  mkRaw('lampCool', new T.MeshBasicMaterial({ color: new T.Color(2.4, 2.25, 1.9) }));   // bathroom and hall ceiling lights
  mkRaw('lampEve', new T.MeshBasicMaterial({ color: new T.Color(0.8, 0.8, 0.78) }));    // evening lights, switched by the app
  mkRaw('cap', new T.MeshBasicMaterial({ color: 0xf4f2ec }));                           // cut wall tops in the plan view
  mkRaw('capWood', new T.MeshBasicMaterial({ map: grain, color: 0x5a4334 }));           // top of the hall wardrobe, seen only from above
  mkRaw('capDark', new T.MeshBasicMaterial({ color: 0x141416 }));                       // the two riser shafts, as the render draws them
  mkRaw('capRing', new T.MeshBasicMaterial({ color: 0x8e8e90 }));
  TEX.glow = texGlow();
  // warm light washing the wall behind the bedroom television
  mkRaw('halo', new T.MeshBasicMaterial({ map: TEX.glow, color: new T.Color(1.0, 0.6, 0.28), transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false }));
}
