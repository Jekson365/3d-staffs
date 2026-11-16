// ---------- 60-app.js : scene, daylight, the plan view, walking, the HUD ----------
const EYE = 1.62, RAD = 0.2, FOV_WALK = 68, FOV_PLAN = 26;
// Everything below that depends on the flat comes from FLAT (its data file) or from BOUNDS, the box around it.
const [BX0, BZ0, BX1, BZ1] = FLAT.bounds;
const MIDX = (BX0 + BX1) / 2, MIDZ = (BZ0 + BZ1) / 2;   // camera target, centre of the town
const REST = Object.fromEntries(FLAT.openings.concat((FLAT.slants || []).flatMap((s) => s.ops || [])).filter((o) => o.rest).map((o) => [o.id, o.rest]));   // how far each door stands open in the render
const START = FLAT.start;                             // [x, z, yaw in degrees]: where a walk starts, inside the entrance
// Afternoon sun from the south-west, 36 degrees up: it reaches the living room floor and crosses the bedroom.
const TOSUN = (() => { const el = 36 * DEG, az = 27 * DEG; return [-Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)]; })();
const LIGHT = { sunCol: [1.0, 0.9, 0.74], sunI: 13, skyZ: [3.2, 4.6, 7.0], skyH: [6.4, 6.9, 7.3], ground: [2.4, 2.2, 1.9], gain: 1.6 };
const BACK = new T.Color(0x24262a);                    // behind everything while walking; never seen unless two surfaces part by a hair
const LOOKS = [
  { A: [1, 1, 1], B: [2.2, 2.2, 2.2], C: [0, 0, 0], exp: 1.0, sun: 1, eve: [0.8, 0.8, 0.78], glowB: 0.45, glowC: 0 },              // day
  { A: [0.03, 0.04, 0.07], B: [2.5, 2.2, 1.8], C: [1.5, 1.32, 1.05], exp: 1.0, sun: 0, eve: [2.6, 2.2, 1.6], glowB: 0.8, glowC: 0.7 },    // evening
];
const MAPR = FLAT.map;                                // what the key plan shows: { x0, z0, w, d }, from build.mjs
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

async function boot() {
  const canvas = $('view'), app = $('app');
  const setStage = (txt, f) => { $('stage').textContent = txt; $('bar').style.width = Math.round(f * 100) + '%'; };
  const paint = () => new Promise((r) => { let done = false; const go = () => { if (!done) { done = true; r(); } }; requestAnimationFrame(() => setTimeout(go, 0)); setTimeout(go, 150); });
  const coarse = matchMedia('(pointer: coarse)').matches, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); }
  catch (err) { setStage('This page needs WebGL, and this browser or device has it switched off.', 0); return; }
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(FOV_PLAN, 1, 0.06, 1600);
  scene.add(camera);

  // S: everything that changes while the page runs
  const S = {
    mode: 'plan', fly: null, x: START[0], z: START[1], yaw: START[2] * DEG, pitch: 0, vx: 0, vz: 0, bob: 0,
    theta: 0, phi: 0, dist: 24, userView: false, eve: 0, eveWant: 0, locked: false, noLock: false, touch: coarse,
    room: null, dirty: 3, pr: Math.min(window.devicePixelRatio || 1, coarse ? 2 : 1.5), ready: false,
  };

  // ---- build ----
  await paint();
  initMaterials(renderer.capabilities.getMaxAnisotropy());
  buildPlan();
  setStage('Moving the furniture in…', 0.12);
  await paint();
  // furniture moved, turned, added or taken away in this browser (the Furniture panel), kept per flat
  const FURN_KEY = 'flat3d:' + FLAT.name + ':furniture', DESIGN = JSON.stringify(FLAT.furniture || []);
  const BASE = (() => { let h = 2166136261; for (let i = 0; i < DESIGN.length; i++) h = Math.imul(h ^ DESIGN.charCodeAt(i), 16777619); return (h >>> 0).toString(36); })();
  try {
    const s = JSON.parse(localStorage.getItem(FURN_KEY) || 'null');
    if (s && s.base === BASE && Array.isArray(s.list) && s.list.every((p) => p && PIECES[p.t])) FLAT.furniture = s.list;
  } catch (err) { /* nothing kept, or storage is off */ }
  buildFurniture();
  const world = new T.Group(), ceilGroup = new T.Group(), capGroup = new T.Group();
  scene.add(world);
  buildMeshes(STATIC, world);
  buildMeshes(CEIL, ceilGroup);
  buildMeshes(CAPS, capGroup);
  world.add(ceilGroup, capGroup);
  // furniture, kept apart so the "Empty" button can hide it (its ceiling parts and plan caps follow their own groups);
  // each piece has its own three groups (rec.g), so it can be moved on its own
  const furnGroup = new T.Group(), furnCeil = new T.Group(), furnCaps = new T.Group();
  world.add(furnGroup); ceilGroup.add(furnCeil); capGroup.add(furnCaps);
  const meshPiece = (rec) => {
    rec.g = [new T.Group(), new T.Group(), new T.Group()];
    buildMeshes(rec.map, rec.g[0]); buildMeshes(rec.ceil, rec.g[1]); buildMeshes(rec.caps, rec.g[2]);
    rec.map = rec.ceil = rec.caps = null;
    furnGroup.add(rec.g[0]); furnCeil.add(rec.g[1]); furnCaps.add(rec.g[2]);
    for (const g of rec.g) { g.traverse((o) => { if (o.isMesh) o.userData.rec = rec; }); g.updateMatrixWorld(true); }
  };
  for (const rec of PIECE_RECS) meshPiece(rec);
  const isFurn = (o) => { for (let p = o; p; p = p.parent) if (p === furnGroup || p === furnCeil || p === furnCaps) return true; return false; };

  const poseDoor = (d) => {
    if (d.type === 'swing') {
      const yaw = d.yaw0 + d.swing * d.t, c = Math.cos(yaw), s = Math.sin(yaw);
      d.group.position.set(d.hx, 0, d.hz);
      d.group.rotation.y = yaw;
      d.col = { k: 2, x: d.hx + c * d.w / 2, z: d.hz - s * d.w / 2, hx: d.w / 2, hz: 0.03, c, s };
    } else {
      if (d.axis === 'z') {                              // a pane sliding along Z: its frame is turned so local +x runs south
        const z = d.hz + d.slide * d.t;
        d.group.position.set(d.hx, 0, z); d.group.rotation.y = -PI / 2;
        d.col = { k: 0, x0: d.hx - 0.03, z0: z, x1: d.hx + 0.03, z1: z + d.w };
      } else {
        const x = d.hx + d.slide * d.t;
        d.group.position.set(x, 0, d.hz);
        d.col = { k: 0, x0: x, z0: d.hz - 0.03, x1: x + d.w, z1: d.hz + 0.03 };
      }
    }
  };
  for (const d of DOORS) {
    d.group = new T.Group();
    buildMeshes(d.map, d.group);
    world.add(d.group);
    d.rest = REST[d.id] || 0;
    d.t = d.want = d.rest;
    poseDoor(d);
  }
  world.updateMatrixWorld(true);

  // ---- sun, with one shadow map that is only redrawn when a door moves ----
  const sun = new T.DirectionalLight(new T.Color(LIGHT.sunCol[0], LIGHT.sunCol[1], LIGHT.sunCol[2]), LIGHT.sunI);
  sun.position.set(MIDX + TOSUN[0] * 40, 1.3 + TOSUN[1] * 40, MIDZ + TOSUN[2] * 40);
  sun.target.position.set(MIDX, 1.3, MIDZ);
  sun.castShadow = true;
  const bigMap = renderer.capabilities.maxTextureSize >= 8192 && !coarse;
  sun.shadow.mapSize.set(bigMap ? 4096 : 2048, bigMap ? 4096 : 2048);
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);
  {
    const cam = sun.shadow.camera, v = new T.Vector3();
    sun.updateMatrixWorld(); sun.target.updateMatrixWorld();
    cam.position.copy(sun.position); cam.lookAt(sun.target.position); cam.updateMatrixWorld();
    const inv = cam.matrixWorld.clone().invert();
    let l = 1e9, r = -1e9, b = 1e9, t = -1e9, n = 1e9, f = -1e9;
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? BX1 + 0.2 : BX0 - 0.2, i & 2 ? 3.1 : -0.35, i & 4 ? BZ1 + 0.23 : BZ0 - 0.2).applyMatrix4(inv);
      l = Math.min(l, v.x); r = Math.max(r, v.x); b = Math.min(b, v.y); t = Math.max(t, v.y); n = Math.min(n, -v.z); f = Math.max(f, -v.z);
    }
    cam.left = l - 0.1; cam.right = r + 0.1; cam.bottom = b - 0.1; cam.top = t + 0.1; cam.near = n - 0.5; cam.far = f + 0.5;
    cam.updateProjectionMatrix();
  }
  // the floor above: never drawn, but it keeps the sun out
  const unseen = new T.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  unseen.shadowSide = T.DoubleSide;                   // its top face must count, or sunlight creeps in under its underside
  for (const [x0, z0, x1, z1] of PLAN.roof) {
    const m = new T.Mesh(new T.BoxGeometry(x1 - x0, 0.3, z1 - z0), unseen);
    m.position.set((x0 + x1) / 2, H + 0.15, (z0 + z1) / 2);
    m.castShadow = true;
    m.userData.noPick = true;
    world.add(m);
  }

  // ---- the town outside: sky, a ring of hills and houses, the streets below ----
  const ext = new T.Group();
  const flat = (o) => new T.MeshBasicMaterial(Object.assign({ fog: false, toneMapped: false, depthWrite: false, transparent: true }, o));
  const clouds = (g, W, Hh) => {
    const R = rng(5);
    for (let i = 0; i < 30; i++) {
      const x = R() * W, y = Hh * (0.2 + R() * 0.26), rx = 40 + R() * 120, ry = 5 + R() * 13;
      for (const ox of [-W, 0, W]) {
        const gr = g.createRadialGradient(0, 0, 0, 0, 0, 1);
        gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
        g.save(); g.translate(x + ox, y); g.scale(rx, ry); g.fillStyle = gr; g.beginPath(); g.arc(0, 0, 1, 0, TAU); g.fill(); g.restore();
      }
    }
  };
  const stars = (g, W, Hh) => { const R = rng(8); for (let i = 0; i < 380; i++) { g.fillStyle = 'rgba(255,255,255,' + (0.2 + R() * 0.55) + ')'; const s = 0.6 + R() * 0.7; g.fillRect(R() * W, R() * Hh * 0.42, s, s); } };
  const skyTex = [false, true].map((night) => tex(night ? 2048 : 1024, night ? 1024 : 512, (g, W, Hh) => { drawSky(g, W, Hh, night); if (night) stars(g, W, Hh); else clouds(g, W, Hh); }, { clamp: true }));
  const panoTex = [texPanorama(false), texPanorama(true)];
  for (const t of panoTex) t.wrapT = T.ClampToEdgeWrapping;   // the ring repeats sideways only
  const sky = new T.Mesh(new T.SphereGeometry(900, 40, 20), flat({ map: skyTex[0], side: T.BackSide }));
  sky.position.set(MIDX, EYE, MIDZ); sky.renderOrder = -5;
  const pano = new T.Mesh(new T.CylinderGeometry(PANO.R, PANO.R, PANO.hi - PANO.lo, 96, 1, true), flat({ map: panoTex[0], side: T.BackSide }));
  pano.position.set(MIDX, EYE + (PANO.hi + PANO.lo) / 2, MIDZ); pano.renderOrder = -3;
  const town = makeTown(EYE + PANO.lo, TOSUN);
  const ground = new T.Mesh(new T.CircleGeometry(TOWN_R, 64).rotateX(-PI / 2), flat({ map: town.groundTex }));
  ground.position.set(MIDX, EYE + PANO.lo, MIDZ); ground.renderOrder = -4;
  const sunDisc = new T.Sprite(new T.SpriteMaterial({ map: TEX.glow, color: new T.Color(1, 0.94, 0.8), blending: T.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
  sunDisc.position.set(MIDX + TOSUN[0] * 850, EYE + TOSUN[1] * 850, MIDZ + TOSUN[2] * 850); sunDisc.scale.setScalar(420); sunDisc.renderOrder = -4.5;
  ext.add(sky, ground, pano, sunDisc, town.meshes[0], town.meshes[1]);
  scene.add(ext);
  const hazes = [new T.Color(0xc6d3df), new T.Color(0x1c2233)];
  scene.fog = new T.Fog(hazes[0], 90, 560);              // only reaches the town; the rooms are far too near to haze

  // ---- reflections: a small picture of a room with bright glazing to the south, or of lamplight ----
  const pm = new T.PMREMGenerator(renderer);
  const envOf = (night) => {
    const t = tex(256, 128, (g, W, Hh) => {
      const gr = g.createLinearGradient(0, 0, 0, Hh);
      if (night) { gr.addColorStop(0, 'rgb(58,50,42)'); gr.addColorStop(0.45, 'rgb(82,68,54)'); gr.addColorStop(0.56, 'rgb(46,38,31)'); gr.addColorStop(1, 'rgb(24,20,16)'); }
      else { gr.addColorStop(0, 'rgb(216,214,208)'); gr.addColorStop(0.45, 'rgb(178,174,166)'); gr.addColorStop(0.56, 'rgb(122,110,96)'); gr.addColorStop(1, 'rgb(88,74,60)'); }
      g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
      if (night) { g.fillStyle = 'rgb(255,206,140)'; for (const [u, v, r] of [[0.3, 0.42, 5], [0.55, 0.36, 6], [0.9, 0.44, 5], [0.72, 0.3, 4]]) { g.beginPath(); g.arc(u * W, v * Hh, r, 0, TAU); g.fill(); } }
      else { g.fillStyle = 'rgb(255,255,255)'; g.fillRect(0.69 * W, 0.2 * Hh, 0.12 * W, 0.32 * Hh); g.fillStyle = 'rgb(236,242,250)'; g.fillRect(0.88 * W, 0.26 * Hh, 0.04 * W, 0.2 * Hh); }
    }, { clamp: true });
    t.mapping = T.EquirectangularReflectionMapping;
    const out = pm.fromEquirectangular(t).texture;
    t.dispose();
    return out;
  };
  const envs = [envOf(false), envOf(true)];
  pm.dispose();
  scene.environment = envs[0];

  // ---- looking glasses: each shows the room as seen from behind the glass, drawn only while it can be seen ----
  const mirrors = [];
  let mirrorsOk = true;
  const hdr = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
  const makeMirror = (M) => {
    {
      const rt = new T.WebGLRenderTarget(512, 512, { type: hdr ? T.HalfFloatType : T.UnsignedByteType, samples: renderer.capabilities.isWebGL2 ? 4 : 0 });
      const texM = new T.Matrix4();
      const mat = new T.ShaderMaterial({
        uniforms: { tMap: { value: rt.texture }, texM: { value: texM }, tint: { value: new T.Color(0.9, 0.93, 0.94) } },
        vertexShader: 'uniform mat4 texM;\nvarying vec4 vP;\nvoid main() {\n\tvP = texM * modelMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
        fragmentShader: 'uniform sampler2D tMap;\nuniform vec3 tint;\nvarying vec4 vP;\nvoid main() {\n\tgl_FragColor = vec4( texture2DProj( tMap, vP ).rgb * tint, 1.0 );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}',
      });
      const mesh = new T.Mesh(M.kind === 'disc' ? new T.CircleGeometry(M.r, 48) : new T.PlaneGeometry(M.w, M.h), mat);
      const n = new T.Vector3(M.n[0], M.n[1], M.n[2]);
      mesh.position.set(M.p[0], M.p[1], M.p[2]);
      mesh.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), n);
      world.add(mesh);
      const m = { M, furn: !!M.furn, zone: M.zone, mesh, rt, texM, n, p: mesh.position.clone(), cam: new T.PerspectiveCamera(), drawn: false };
      mirrors.push(m);
      return m;
    }
  };
  try { for (const M of MIRRORS) makeMirror(M); } catch (err) { mirrorsOk = false; for (const m of mirrors) world.remove(m.mesh); mirrors.length = 0; }
  const _mv = new T.Vector3(), _mt = new T.Vector3(), _mr = new T.Matrix4(), _mpl = new T.Plane(), _mq = new T.Vector4(), _mc = new T.Vector4(), _fr = new T.Frustum(), _pm = new T.Matrix4();
  const drawMirrors = (force) => {
    if (!mirrors.length) return;
    camera.updateMatrixWorld();
    _fr.setFromProjectionMatrix(_pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    for (const m of mirrors) {
      if (m.off) continue;
      const z = m.zone, eye = camera.position;
      if (!force && m.drawn && (eye.x < z[0] || eye.x > z[2] || eye.z < z[1] || eye.z > z[3] || eye.y > H)) continue;
      _mv.subVectors(m.p, eye);
      if (_mv.dot(m.n) > -0.02) continue;                 // the eye is behind the glass
      if (!force && m.drawn && !_fr.intersectsObject(m.mesh)) continue;
      _mv.reflect(m.n).negate().add(m.p);                 // the eye, mirrored
      _mr.extractRotation(camera.matrixWorld);
      _mt.set(0, 0, -1).applyMatrix4(_mr).add(eye);
      _mt.subVectors(m.p, _mt).reflect(m.n).negate().add(m.p);
      const c = m.cam;
      c.position.copy(_mv);
      c.up.set(0, 1, 0).applyMatrix4(_mr).reflect(m.n);
      c.lookAt(_mt);
      c.far = camera.far;
      c.updateMatrixWorld();
      c.projectionMatrix.copy(camera.projectionMatrix);
      m.texM.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1).multiply(c.projectionMatrix).multiply(c.matrixWorldInverse);
      // push the near plane onto the glass so nothing behind the wall gets into the picture
      _mpl.setFromNormalAndCoplanarPoint(m.n, m.p).applyMatrix4(c.matrixWorldInverse);
      _mc.set(_mpl.normal.x, _mpl.normal.y, _mpl.normal.z, _mpl.constant);
      const e = c.projectionMatrix.elements;
      _mq.set((Math.sign(_mc.x) + e[8]) / e[0], (Math.sign(_mc.y) + e[9]) / e[5], -1, (1 + e[10]) / e[14]);
      _mc.multiplyScalar(2 / _mc.dot(_mq));
      e[2] = _mc.x; e[6] = _mc.y; e[10] = _mc.z + 1 - 0.003; e[14] = _mc.w;
      m.mesh.visible = false;
      renderer.setRenderTarget(m.rt);
      renderer.render(scene, c);
      renderer.setRenderTarget(null);
      m.mesh.visible = true;
      m.drawn = true;
    }
  };

  // ---- soft glow around every lamp ----
  const glows = [];
  const makeGlow = (L) => {
    if (!(L.glow > 0)) return null;
    const s = new T.Sprite(new T.SpriteMaterial({ map: TEX.glow, color: new T.Color(L.col[0], L.col[1], L.col[2]), blending: T.AdditiveBlending, depthWrite: false, fog: false, opacity: 0 }));
    s.position.set(L.p[0], L.p[1], L.p[2]);
    s.scale.setScalar(L.glow);
    s.userData.ch = L.ch;
    s.userData.high = L.p[1] > 2.1;
    s.userData.furn = !!L.furn;
    s.userData.L = L;
    glows.push(s);
    scene.add(s);
    return s;
  };
  for (const L of LAMPS) makeGlow(L);

  // ---- the light bake ----
  setStage('Working out the light…', 0.2);
  await paint();
  const baked = [];
  world.traverse((o) => { if (o.isMesh && o.material.userData && o.material.userData.bake) baked.push(o); });
  // bakes the light onto `baked` meshes with the given stand-ins and lamps (also used again for the emptied flat)
  const bakeInto = (baked, occ, lamps, onProg) => new Promise((resolve) => {
    let n = 0;
    for (const m of baked) n += m.geometry.attributes.position.count;
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), flg = new Uint8Array(n), v = new T.Vector3(), nm = new T.Matrix3();
    let o = 0;
    for (const m of baked) {
      const P = m.geometry.attributes.position, N = m.geometry.attributes.normal, f = m.userData.flg, ud = m.material.userData, add = (ud.fine ? 1 : 0) | (ud.two ? 4 : 0);
      nm.getNormalMatrix(m.matrixWorld);
      for (let i = 0; i < P.count; i++, o++) {
        v.fromBufferAttribute(P, i).applyMatrix4(m.matrixWorld);
        pos[o * 3] = v.x; pos[o * 3 + 1] = v.y; pos[o * 3 + 2] = v.z;
        v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize();
        nor[o * 3] = v.x; nor[o * 3 + 1] = v.y; nor[o * 3 + 2] = v.z;
        flg[o] = (f[i] || 0) | add;
      }
    }
    const input = {
      boxes: occ.box, alb: occ.alb, pos, nor, flg,
      sun: { dir: TOSUN, col: LIGHT.sunCol.map((c) => c * LIGHT.sunI) }, skyZ: LIGHT.skyZ, skyH: LIGHT.skyH, ground: LIGHT.ground,
      indoor: ROOMS.filter((r) => !r.outdoor).flatMap((r) => r.poly ? r.rects.concat(polyStrips(r.poly, 0.1)) : r.rects),
      open: OPEN.filter((o) => o.glass).map((o) => {   // each glazed opening, as a light source facing into the room
        const mid = (o.at[0] + o.at[1]) / 2, out = o.inner === o.at[0] ? 1 : -1, hu = (o.b - o.a) / 2, hv = (o.head - o.sill) / 2, c = (o.a + o.b) / 2;
        const nu = Math.max(3, Math.round(hu * 8.5)), nv = Math.round(hv * 9);
        return o.axis === 'x'
          ? { c: [c, o.sill + hv, mid], n: [0, 0, -out], u: [hu, 0, 0], v: [0, hv, 0], nu, nv, T: 0.82 }
          : { c: [mid, o.sill + hv, c], n: [-out, 0, 0], u: [0, 0, hu], v: [0, hv, 0], nu, nv, T: 0.82 };
      }).concat(SLANT_OPEN),
      grid: [BX0 - 1.5, BZ0 - 1.5, Math.ceil((BX1 - BX0 + 3) / 0.5 - 1e-6), Math.ceil((BZ1 - BZ0 + 3) / 0.5 - 1e-6)],
      patchBox: [BX0 + 0.05, BX1 - 0.05, BZ0 + 0.05, BZ1 + 0.08],
      lamps: lamps.map((L) => ({ p: L.p, I: L.I, col: L.col, ch: L.ch, down: L.down, r2: Math.min(64, L.I / 0.006) })),
      probe: { x0: BX0 + 0.4, y0: 0.3, z0: BZ0 + 0.4, dx: 0.52, dy: 0.7, dz: 0.5, nx: Math.ceil((BX1 - BX0 - 0.8) / 0.52) + 1, ny: 4, nz: Math.ceil((BZ1 - BZ0 - 0.8) / 0.5) + 1 }, patch: 0.5, tail: 1.5, gain: LIGHT.gain,
    };
    // Evens out the light on walls, floors and ceilings: each vertex moves halfway to the mean of its neighbours, twice.
    const soften = (m) => {
      const g = m.geometry, ix = g.index.array, c = g.attributes.position.count, nb = new Array(c);
      for (let i = 0; i < c; i++) nb[i] = [];
      for (let t = 0; t < ix.length; t += 3) for (let e = 0; e < 3; e++) { const a = ix[t + e], b = ix[t + (e + 1) % 3]; if (!nb[a].includes(b)) nb[a].push(b); if (!nb[b].includes(a)) nb[b].push(a); }
      const A = g.attributes.bakeA.array, B = g.attributes.bakeB.array, C = g.attributes.bakeC.array, lit = new Uint8Array(c);
      for (let i = 0; i < c * 3; i++) if (A[i] + B[i] + C[i] > 0) lit[(i / 3) | 0] = 1;
      for (const arr of [A, B, C]) for (let it = 0; it < 2; it++) {
        const src = arr.slice();
        for (let i = 0; i < c; i++) {
          if (!lit[i]) continue;
          let r = 0, gg = 0, b = 0, k = 0;
          for (const j of nb[i]) if (lit[j]) { r += src[j * 3]; gg += src[j * 3 + 1]; b += src[j * 3 + 2]; k++; }
          if (k) { arr[i * 3] = 0.5 * src[i * 3] + 0.5 * r / k; arr[i * 3 + 1] = 0.5 * src[i * 3 + 1] + 0.5 * gg / k; arr[i * 3 + 2] = 0.5 * src[i * 3 + 2] + 0.5 * b / k; }
        }
      }
    };
    runBake(input, onProg, (out, stats, how) => {
      let k = 0;
      for (const m of baked) {
        const c = m.geometry.attributes.position.count;
        for (const ch of ['A', 'B', 'C']) { const a = m.geometry.attributes['bake' + ch]; a.array.set(out[ch].subarray(k * 3, (k + c) * 3)); a.needsUpdate = true; }
        if (m.material.userData.fine) soften(m);
        k += c;
      }
      resolve({ how, vertices: n, solids: occ.box.length / 6, ms: Math.max(...stats.map((s) => s.ms)), rays: stats.reduce((a, s) => a + s.rays, 0), patches: stats[0].patches, buried: stats.reduce((a, s) => a + s.buried, 0) });
    });
  });
  // the shell's light stand-ins and those of every piece of furniture
  const occAll = () => {
    const box = OCC.box.slice(), alb = OCC.alb.slice();
    for (const r of PIECE_RECS) if (r.p) { for (const v of r.occBox) box.push(v); for (const v of r.occAlb) alb.push(v); }
    return { box: new Float32Array(box), alb: new Float32Array(alb) };
  };
  const bakeStats = await bakeInto(baked, occAll(), LAMPS, (p) => setStage('Working out the light…', 0.2 + 0.8 * p));

  // ---- day and evening ----
  const applyLook = () => {
    const a = LOOKS[0], b = LOOKS[1], e = S.eve, mix = (p, q) => p + (q - p) * e;
    UNI.uBA.value.set(mix(a.A[0], b.A[0]), mix(a.A[1], b.A[1]), mix(a.A[2], b.A[2]));
    UNI.uBB.value.set(mix(a.B[0], b.B[0]), mix(a.B[1], b.B[1]), mix(a.B[2], b.B[2]));
    UNI.uBC.value.set(mix(a.C[0], b.C[0]), mix(a.C[1], b.C[1]), mix(a.C[2], b.C[2]));
    renderer.toneMappingExposure = mix(a.exp, b.exp);
    sun.intensity = LIGHT.sunI * mix(a.sun, b.sun);
    MAT.lampEve.color.setRGB(mix(a.eve[0], b.eve[0]), mix(a.eve[1], b.eve[1]), mix(a.eve[2], b.eve[2]));
    for (const s of glows) s.material.opacity = s.userData.ch === 2 ? mix(a.glowC, b.glowC) : mix(a.glowB, b.glowB);
    const night = e > 0.5 ? 1 : 0;
    sky.material.map = skyTex[night]; pano.material.map = panoTex[night]; scene.environment = envs[night];
    sunDisc.visible = !night;
    ground.material.color.setScalar(night ? 0.16 : 1);
    town.night(night);
    scene.fog.color.copy(hazes[night]);
    S.dirty = 3;
  };

  // ---- theme ----
  let stageCol = new T.Color(0xe9e6de), markCol = '#d4551a', inkCol = '#1e2327';
  const readTheme = () => {
    const cs = getComputedStyle(document.documentElement);
    try { stageCol = new T.Color(cs.getPropertyValue('--stage').trim() || '#e9e6de'); } catch (err) { /* keep the last colour */ }
    markCol = cs.getPropertyValue('--mark').trim() || markCol;
    inkCol = cs.getPropertyValue('--ink').trim() || inkCol;
    scene.background = S.mode === 'walk' ? BACK : stageCol;
  };

  // ---- cameras ----
  const _up = new T.Vector3(), _tgt = new T.Vector3(), _m = new T.Matrix4(), _eu = new T.Euler(0, 0, 0, 'YXZ'), _v = new T.Vector3();
  const fitDist = () => Math.max(BZ1 - BZ0 + 1.68, (BX1 - BX0 + 1.75) / camera.aspect) / (2 * Math.tan(FOV_PLAN * DEG / 2));
  const planPose = (pos, quat) => {
    const sp = Math.sin(S.phi), cp = Math.cos(S.phi), st = Math.sin(S.theta), ct = Math.cos(S.theta);
    pos.set(MIDX + S.dist * sp * st, 0.9 + S.dist * cp, MIDZ + S.dist * sp * ct);
    _up.set(-st * cp, sp, -ct * cp);                    // keeps north at the top when looking straight down
    quat.setFromRotationMatrix(_m.lookAt(pos, _tgt.set(MIDX, 0.9, MIDZ), _up));
  };
  const walkPose = (pos, quat) => { pos.set(S.x, EYE + S.bob, S.z); quat.setFromEuler(_eu.set(S.pitch, S.yaw, 0, 'YXZ')); };

  // ---- standing room: colliders, rooms, free spots ----
  const hit = (c, x, z, r) => {
    if (c.k === 0) { const dx = x - clamp(x, c.x0, c.x1), dz = z - clamp(z, c.z0, c.z1); return dx * dx + dz * dz < r * r; }
    if (c.k === 1) { const dx = x - c.x, dz = z - c.z, rr = r + c.r; return dx * dx + dz * dz < rr * rr; }
    const dx = x - c.x, dz = z - c.z, lx = dx * c.c - dz * c.s, lz = dx * c.s + dz * c.c, ex = lx - clamp(lx, -c.hx, c.hx), ez = lz - clamp(lz, -c.hz, c.hz);
    return ex * ex + ez * ez < r * r;
  };
  const blockedAt = (x, z, r) => {
    for (const c of COL) if (!(S.empty && c.furn) && hit(c, x, z, r)) return true;
    for (const d of DOORS) if (hit(d.col, x, z, r)) return true;
    return false;
  };
  const roomAt = (x, z) => { for (const R of ROOMS) if (roomHas(R, x, z)) return R; return null; };
  const inFlat = (x, z) => x > BX0 + 0.1 && x < BX1 - 0.1 && z > BZ0 + 0.1 && z < BZ1 - 0.07;
  // Moves the point out of one collider; returns true if it had to.
  const pushOut = (p, c) => {
    if (c.k === 1) {
      const dx = p.x - c.x, dz = p.z - c.z, rr = RAD + c.r, d2 = dx * dx + dz * dz;
      if (d2 >= rr * rr) return false;
      const d = Math.sqrt(d2) || 1e-6;
      p.x = c.x + dx / d * rr; p.z = c.z + dz / d * rr;
      return true;
    }
    const rot = c.k === 2, ox = rot ? c.x : 0, oz = rot ? c.z : 0;
    let lx = p.x - ox, lz = p.z - oz, x0 = c.x0, x1 = c.x1, z0 = c.z0, z1 = c.z1;
    if (rot) { const dx = lx, dz = lz; lx = dx * c.c - dz * c.s; lz = dx * c.s + dz * c.c; x0 = -c.hx; x1 = c.hx; z0 = -c.hz; z1 = c.hz; }
    const ex = lx - clamp(lx, x0, x1), ez = lz - clamp(lz, z0, z1), d2 = ex * ex + ez * ez;
    if (d2 >= RAD * RAD) return false;
    if (d2 > 1e-12) { const d = Math.sqrt(d2), k = (RAD - d) / d; lx += ex * k; lz += ez * k; }
    else {                                              // centre inside: leave by the nearest side
      const a = lx - x0, b = x1 - lx, e = lz - z0, f = z1 - lz, m = Math.min(a, b, e, f);
      if (m === a) lx = x0 - RAD; else if (m === b) lx = x1 + RAD; else if (m === e) lz = z0 - RAD; else lz = z1 + RAD;
    }
    if (rot) { p.x = ox + lx * c.c + lz * c.s; p.z = oz - lx * c.s + lz * c.c; } else { p.x = lx; p.z = lz; }
    return true;
  };
  const settle = (p) => {
    for (let it = 0; it < 4; it++) {
      let moved = false;
      for (const c of COL) if (!(S.empty && c.furn) && pushOut(p, c)) moved = true;
      for (const d of DOORS) if (pushOut(p, d.col)) moved = true;
      if (!moved) break;
    }
    p.x = clamp(p.x, BX0 + 0.3, BX1 - 0.3); p.z = clamp(p.z, BZ0 + 0.3, BZ1 - 0.3);
  };
  const freeAt = (x, z) => inFlat(x, z) && !!roomAt(x, z) && !blockedAt(x, z, RAD + 0.04);
  const standNear = (x, z) => {
    if (freeAt(x, z)) return [x, z];
    for (let r = 0.12; r <= 1.33; r += 0.12) for (let i = 0; i < 16; i++) { const a = i * TAU / 16, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r; if (freeAt(px, pz)) return [px, pz]; }
    return null;
  };
  // Looks along the longest clear line from a spot, so you arrive facing the room, not a wall.
  const openYaw = (x, z) => {
    let best = -1, yaw = PI;
    for (let i = 0; i < 32; i++) {
      const a = i * TAU / 32, dx = -Math.sin(a), dz = -Math.cos(a);
      let d = 0;
      while (d < 9 && inFlat(x + dx * (d + 0.15), z + dz * (d + 0.15)) && !blockedAt(x + dx * (d + 0.15), z + dz * (d + 0.15), 0.1)) d += 0.15;
      if (d > best + 1e-6) { best = d; yaw = a; }
    }
    return yaw;
  };

  // ---- HUD pieces ----
  const tags = ROOMS.map((R) => {
    const el = document.createElement('div');
    el.className = 'tag';
    const b = document.createElement('b'); b.textContent = R.ka;
    const n = document.createElement('span'); n.className = 'num'; n.textContent = R.area.toFixed(FLAT.digits) + ' მ²';
    el.append(b, n);
    $('tags').append(el);
    return { el, R };
  });
  const placeTags = () => {
    const w = app.clientWidth, h = app.clientHeight, show = S.mode !== 'walk';
    for (const t of tags) {
      _v.set(t.R.label[0], 1.2, t.R.label[1]).project(camera);
      const on = show && _v.z < 1 && Math.abs(_v.x) < 1.05 && Math.abs(_v.y) < 1.05;
      t.el.hidden = !on;
      if (on) t.el.style.transform = 'translate(-50%, -50%) translate(' + ((_v.x * 0.5 + 0.5) * w).toFixed(1) + 'px,' + ((-_v.y * 0.5 + 0.5) * h).toFixed(1) + 'px)';
    }
  };
  const mapCv = $('map'), mapCtx = mapCv.getContext('2d'), mapImg = document.createElement('canvas');
  mapImg.width = mapCv.width; mapImg.height = mapCv.height;
  const ortho = new T.OrthographicCamera(-MAPR.w / 2, MAPR.w / 2, MAPR.d / 2, -MAPR.d / 2, 1, 80);
  ortho.position.set(MAPR.x0 + MAPR.w / 2, 40, MAPR.z0 + MAPR.d / 2);
  ortho.up.set(0, 0, -1);
  ortho.lookAt(MAPR.x0 + MAPR.w / 2, 0, MAPR.z0 + MAPR.d / 2);
  scene.add(ortho);
  // The key plan is a small top-down picture of the model itself, taken once.
  const captureMap = () => {
    const size = renderer.getSize(new T.Vector2()), pr = renderer.getPixelRatio(), keep = [ext.visible, ceilGroup.visible, scene.background];
    ext.visible = false; ceilGroup.visible = false; scene.background = stageCol; ring.visible = false;
    for (const s of glows) s.visible = false;
    renderer.setPixelRatio(1); renderer.setSize(mapImg.width, mapImg.height, false);
    renderer.render(scene, ortho);
    mapImg.getContext('2d').drawImage(canvas, 0, 0, mapImg.width, mapImg.height);
    renderer.setPixelRatio(pr); renderer.setSize(size.x, size.y, false);
    ext.visible = keep[0]; ceilGroup.visible = keep[1]; scene.background = keep[2];
    for (const s of glows) s.visible = (!s.userData.high || ceilGroup.visible) && !(S.empty && s.userData.furn);
    S.dirty = 3;
  };
  const drawMap = () => {
    const g = mapCtx, w = mapCv.width, h = mapCv.height, px = (S.x - MAPR.x0) / MAPR.w * w, py = (S.z - MAPR.z0) / MAPR.d * h, a = Math.atan2(-Math.cos(S.yaw), -Math.sin(S.yaw));
    g.clearRect(0, 0, w, h);
    g.drawImage(mapImg, 0, 0);
    g.fillStyle = markCol; g.globalAlpha = 0.28;
    g.beginPath(); g.moveTo(px, py); g.arc(px, py, 46, a - 0.6, a + 0.6); g.closePath(); g.fill();
    g.globalAlpha = 1;
    g.beginPath(); g.arc(px, py, 7, 0, TAU); g.fill();
    g.lineWidth = 2.5; g.strokeStyle = '#fff'; g.stroke();
  };
  let hintTimer = 0;
  const hint = (text, ms) => {
    const el = $('hint');
    clearTimeout(hintTimer);
    if (!text) { el.classList.add('off'); return; }
    el.textContent = text; el.hidden = false; el.classList.remove('off');
    if (ms) hintTimer = setTimeout(() => el.classList.add('off'), ms);
  };
  const planHint = () => hint(S.touch ? 'Tap a spot on the floor to stand there. Drag to turn the plan, pinch to zoom.' : 'Click a spot on the floor to stand there. Drag to turn the plan, scroll to zoom.', 0);
  const walkHint = () => hint(S.touch ? 'Left thumb walks, right thumb looks. The Plan button takes you back up.' : 'W A S D to walk. Drag to look around, or click to hold the mouse. M takes you back to the plan.', 9000);
  const showRoom = (R) => {
    if (R === S.room) return;
    S.room = R;
    if (R) { $('roomKa').textContent = R.ka; $('roomEn').textContent = R.en; $('roomArea').textContent = R.area.toFixed(FLAT.digits) + ' მ²'; }
  };
  const syncUI = () => {
    const walking = S.mode === 'walk' || (S.mode === 'fly' && S.fly.to === 'walk');
    $('bMode').firstChild.textContent = walking ? 'Plan ' : 'Walk in ';
    $('room').hidden = !walking; $('mapBox').hidden = !walking;
    canvas.classList.toggle('walk', walking);
    app.classList.toggle('touch', S.touch);
    scene.background = S.mode === 'walk' ? BACK : stageCol;
    $('dot').hidden = !(S.locked && S.mode === 'walk');
    $('bEve').setAttribute('aria-pressed', S.eveWant ? 'true' : 'false');
    if (walking) { $('scaleBar').style.width = Math.max(4, mapCv.clientWidth / MAPR.w - 2).toFixed(1) + 'px'; drawMap(); }
  };

  // ---- the ring that shows where a click would put you ----
  const ring = new T.Mesh(new T.RingGeometry(0.17, 0.23, 40).rotateX(-PI / 2), new T.MeshBasicMaterial({ color: 0xd4551a, transparent: true, opacity: 0.95, depthTest: false, toneMapped: false, fog: false }));
  ring.renderOrder = 10; ring.visible = false;
  scene.add(ring);
  const floorAt = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    _v.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1, 0.5).unproject(camera);
    const o = camera.position, dx = _v.x - o.x, dy = _v.y - o.y, dz = _v.z - o.z;
    if (dy > -1e-6) return null;
    const t = -o.y / dy;
    return standNear(o.x + dx * t, o.z + dz * t);
  };

  // ---- moving between the plan and the floor ----
  const goWalk = (x, z, yaw, instant) => {
    S.x = x; S.z = z; S.yaw = yaw === undefined ? openYaw(x, z) : yaw; S.pitch = 0; S.vx = S.vz = 0; S.bob = 0;
    const f = { to: 'walk', t: 0, dur: instant || reduced ? 0.001 : 1.7, p0: camera.position.clone(), q0: camera.quaternion.clone(), f0: camera.fov, p1: new T.Vector3(), q1: new T.Quaternion(), f1: FOV_WALK };
    walkPose(f.p1, f.q1);
    S.fly = f; S.mode = 'fly'; ring.visible = false;
    showRoom(roomAt(x, z));
    hint('', 0); syncUI(); S.dirty = 3;
  };
  const goPlan = (instant) => {
    if (document.pointerLockElement === canvas && document.exitPointerLock) document.exitPointerLock();
    const f = { to: 'plan', t: 0, dur: instant || reduced ? 0.001 : 1.5, p0: camera.position.clone(), q0: camera.quaternion.clone(), f0: camera.fov, p1: new T.Vector3(), q1: new T.Quaternion(), f1: FOV_PLAN };
    planPose(f.p1, f.q1);
    S.fly = f; S.mode = 'fly';
    hint('', 0); syncUI(); S.dirty = 3;
  };
  const toggleMode = () => {
    if (S.mode === 'plan') { const s = standNear(S.x, S.z) || START; goWalk(s[0], s[1], S.walked ? S.yaw : START[2] * DEG); }
    else if (S.mode === 'walk') goPlan();
  };
  const toggleEve = () => { S.eveWant = S.eveWant ? 0 : 1; syncUI(); S.dirty = 3; };

  // ---- input ----
  const K = {}, stick = { id: 0, bx: 0, by: 0, x: 0, y: 0 }, pts = new Map();
  let pinch = 0;
  const lockMouse = () => {
    if (S.noLock || !canvas.requestPointerLock) return;
    try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => { S.noLock = true; }); } catch (err) { S.noLock = true; }
  };
  canvas.addEventListener('pointerdown', (e) => {
    if (!S.ready) return;
    canvas.focus({ preventScroll: true });
    if (e.pointerType === 'touch' && !S.touch) { S.touch = true; app.classList.add('touch'); }
    const p = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0, role: 'look', type: e.pointerType };
    if (S.edit && (S.mode === 'plan' || S.mode === 'walk') && !pts.size) {
      const h = pickAt(e.clientX, e.clientY);
      if (h) { select(h.rec); p.role = 'drag'; drag = { rec: h.rec, y: h.point.y, f0: floorPoint(e.clientX, e.clientY, h.point.y), dx: 0, dz: 0 }; canvas.style.cursor = 'grabbing'; }
    }
    if (p.role === 'look' && S.mode === 'walk' && e.pointerType === 'touch' && !stick.id && e.clientX < app.clientWidth * 0.45) {
      p.role = 'stick'; stick.id = e.pointerId; stick.bx = e.clientX; stick.by = e.clientY;
      const r = app.getBoundingClientRect(), el = $('stick');
      el.style.left = (e.clientX - r.left) + 'px'; el.style.top = (e.clientY - r.top) + 'px'; el.hidden = false;
      $('knob').style.transform = '';
    }
    pts.set(e.pointerId, p);
    pinch = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* not capturable */ }
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId);
    if (!p) {
      if (S.edit && e.pointerType === 'mouse' && S.ready && (S.mode === 'plan' || S.mode === 'walk')) {
        const now = performance.now();
        if (now - (S.hoverT || 0) > 60) { S.hoverT = now; canvas.style.cursor = pickAt(e.clientX, e.clientY) ? 'grab' : ''; }
        return;
      }
      if (S.mode === 'plan' && e.pointerType === 'mouse' && S.ready) {
        const s = floorAt(e.clientX, e.clientY);
        ring.visible = !!s;
        if (s) ring.position.set(s[0], 0.03, s[1]);
        canvas.style.cursor = s ? 'pointer' : '';
        S.dirty = 3;
      }
      return;
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY; p.moved += Math.abs(dx) + Math.abs(dy);
    if (p.role === 'drag') {
      const f = floorPoint(e.clientX, e.clientY, drag.y);
      if (f && drag.f0) { drag.dx = f[0] - drag.f0[0]; drag.dz = f[1] - drag.f0[1]; shiftPiece(drag.rec, drag.dx, drag.dz); }
      return;
    }
    if (p.role === 'stick') {
      const ox = clamp(p.x - stick.bx, -46, 46), oy = clamp(p.y - stick.by, -46, 46);
      stick.x = ox / 46; stick.y = -oy / 46;
      $('knob').style.transform = 'translate(' + ox + 'px,' + oy + 'px)';
    } else if (S.mode === 'plan') {
      if (pts.size >= 2) {
        const a = [...pts.values()], d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
        if (pinch) S.dist = clamp(S.dist * pinch / Math.max(d, 1), 7, 48);
        pinch = d;
      } else { S.theta -= dx * 0.006; S.phi = clamp(S.phi - dy * 0.006, 0, 0.95); }
      S.userView = true; ring.visible = false;
    } else if (S.mode === 'walk' && !S.locked) {
      const k = p.type === 'touch' ? 0.0052 : 0.0036;
      S.yaw += dx * k; S.pitch = clamp(S.pitch + dy * k, -1.45, 1.45);
    }
    S.dirty = 3;
  });
  const lift = (e) => {
    const p = pts.get(e.pointerId);
    if (!p) return;
    pts.delete(e.pointerId);
    pinch = 0;
    if (p.role === 'stick') { stick.id = 0; stick.x = stick.y = 0; $('stick').hidden = true; return; }
    if (p.role === 'drag') {
      const d = drag;
      drag = null; canvas.style.cursor = 'grab';
      if (!d || !d.rec.p) return;
      if (e.type === 'pointerup' && p.moved > 4 && Math.abs(d.dx) + Math.abs(d.dz) > 0.005) setPiece(d.rec, movedP(d.rec.p, d.dx, d.dz));
      else { shiftPiece(d.rec, 0, 0); for (const m of mirrors) if (d.rec.mirrors.includes(m.M)) m.off = S.empty; }
      return;
    }
    if (e.type !== 'pointerup' || p.moved > 8 || performance.now() - p.t > 500) return;
    if (S.edit) { select(null); return; }
    if (S.mode === 'plan') { const s = floorAt(e.clientX, e.clientY); if (s) goWalk(s[0], s[1]); }
    else if (S.mode === 'walk' && p.type === 'mouse') lockMouse();
  };
  canvas.addEventListener('pointerup', lift);
  canvas.addEventListener('pointercancel', lift);
  canvas.addEventListener('pointerleave', () => { if (!pts.size && ring.visible) { ring.visible = false; S.dirty = 3; } });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (S.mode !== 'plan') return;
    S.dist = clamp(S.dist * Math.exp(clamp(e.deltaY, -240, 240) * 0.0012), 7, 48);
    S.userView = true; S.dirty = 3;
  }, { passive: false });
  document.addEventListener('pointerlockchange', () => {
    S.locked = document.pointerLockElement === canvas;
    if (S.locked) hint('Esc lets the mouse go.', 4000);
    syncUI(); S.dirty = 3;
  });
  document.addEventListener('pointerlockerror', () => { S.noLock = true; });
  document.addEventListener('mousemove', (e) => {
    if (!S.locked || S.mode !== 'walk') return;
    S.yaw -= e.movementX * 0.0022; S.pitch = clamp(S.pitch - e.movementY * 0.0022, -1.45, 1.45);
  });
  const MOVE = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight']);
  window.addEventListener('keydown', (e) => {
    if (S.ready && S.edit && (e.ctrlKey || e.metaKey) && !e.altKey && e.code === 'KeyZ') { e.preventDefault(); undoLast(); return; }
    if (!S.ready || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = e.target && e.target.tagName;
    if (tag === 'SELECT') { if (e.code === 'Escape') { if (e.target.closest('#edit')) toggleEdit(); else toggleFin(); canvas.focus({ preventScroll: true }); } return; }   // the Finishes lists keep their keys
    if (MOVE.has(e.code)) { K[e.code] = true; if (e.code.startsWith('Arrow') && tag !== 'BUTTON') e.preventDefault(); return; }
    if (e.repeat) return;
    if (e.code === 'KeyM') toggleMode();
    else if (e.code === 'KeyL') toggleEve();
    else if (e.code === 'KeyF') fullscreen();
    else if (e.code === 'KeyH' || e.code === 'Slash') toggleHelp();
    else if (e.code === 'KeyX') setEmpty(!S.empty);
    else if (e.code === 'KeyT') toggleFin();
    else if (e.code === 'KeyG') toggleEdit();
    else if (S.edit && sel && e.code === 'KeyR') turnSel(e.shiftKey ? 1 : -1);
    else if (S.edit && sel && (e.code === 'Delete' || e.code === 'Backspace')) { e.preventDefault(); removeSel(); }
    else if (e.code === 'Escape' && !$('help').hidden) toggleHelp();
    else if (e.code === 'Escape' && S.edit && sel) select(null);
    else if (e.code === 'Escape' && S.edit) toggleEdit();
    else if (e.code === 'Escape' && !$('fin').hidden) toggleFin();
  });
  window.addEventListener('keyup', (e) => { K[e.code] = false; });
  window.addEventListener('blur', () => { for (const k in K) K[k] = false; });
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (app.requestFullscreen) { const r = app.requestFullscreen(); if (r && r.catch) r.catch(() => {}); }
  };
  const toggleHelp = () => { const el = $('help'); el.hidden = !el.hidden; $('bHelp').setAttribute('aria-pressed', el.hidden ? 'false' : 'true'); if (!el.hidden && !$('fin').hidden) toggleFin(); if (!el.hidden && S.edit) toggleEdit(); };

  // ---- empty rooms: the furniture goes, the shell stays with its edges drawn in green ----
  // The first time, the light is baked again without the furniture's stand-ins and lamps; both bakes are kept and swapped.
  S.empty = false;
  let emptyPrep = null, emptyBusy = false;
  const prepEmpty = async () => {
    const meshes = baked.filter((m) => !isFurn(m)), CH = ['A', 'B', 'C'];
    const grab = () => meshes.map((m) => CH.map((c) => m.geometry.attributes['bake' + c].array.slice()));
    const keep = grab();
    await bakeInto(meshes, { box: new Float32Array(OCC.box), alb: new Float32Array(OCC.alb) }, LAMPS.filter((L) => !L.furn), (p) => hint('Clearing the rooms… ' + Math.round(p * 100) + ' %', 0));
    const empty = grab();
    // the frame: every wall face outlined at the floor, under the ceiling and on the wall tops, with its corners;
    // every opening outlined on both faces of its wall
    const v = [], ln = (q, r) => v.push(q[0], q[1], q[2], r[0], r[1], r[2]), y0 = 0.004, y1 = H - 0.004, yc = H + 0.006;
    for (const [ax, az, bx, bz] of FRAME) {
      for (const y of [y0, y1, yc]) ln([ax, y, az], [bx, y, bz]);
      ln([ax, y0, az], [ax, y1, az]); ln([bx, y0, bz], [bx, y1, bz]);
    }
    for (const o of OPEN) for (const t of o.at) {
      const q = (u, y) => (o.axis === 'x' ? [u, y, t] : [t, y, u]), lo = Math.max(o.sill, y0);
      ln(q(o.a, lo), q(o.b, lo)); ln(q(o.a, o.head), q(o.b, o.head)); ln(q(o.a, lo), q(o.a, o.head)); ln(q(o.b, lo), q(o.b, o.head));
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(v, 3));
    const frame = new T.LineSegments(g, new T.LineBasicMaterial({ color: 0x1fbf4f, toneMapped: false, fog: false }));
    frame.visible = false; frame.raycast = () => {};
    world.add(frame);
    const mats = new Set(), lines = [frame];
    world.traverse((o) => { if (o.isMesh && !isFurn(o) && !o.material.isShaderMaterial) mats.add(o.material); });
    emptyPrep = { meshes, keep, empty, lines, mats: [...mats], grab };
    hint('', 0);
  };
  const setEmpty = async (on) => {
    on = !!on;
    if (on && S.edit) { clearAll(); return; }
    while (relight.busy) await new Promise((r) => setTimeout(r, 100));   // one bake at a time
    if (on && !emptyPrep) {
      if (emptyBusy) return;
      emptyBusy = true; $('bEmpty').disabled = true;
      try { await prepEmpty(); } finally { emptyBusy = false; $('bEmpty').disabled = false; }
    }
    S.empty = on;
    furnGroup.visible = furnCeil.visible = furnCaps.visible = !on;
    for (const m of mirrors) if (m.furn) { m.off = on; m.mesh.visible = !on; }
    for (const g of glows) g.visible = (!g.userData.high || ceilGroup.visible) && !(on && g.userData.furn);
    const E = emptyPrep;
    if (E) {
      E.meshes.forEach((m, i) => ['A', 'B', 'C'].forEach((c, j) => { const a = m.geometry.attributes['bake' + c]; a.array.set((on ? E.empty : E.keep)[i][j]); a.needsUpdate = true; }));
      for (const l of E.lines) l.visible = on;
      for (const m of E.mats) { m.polygonOffset = on; m.polygonOffsetFactor = 1; m.polygonOffsetUnits = 1; }
    }
    $('bEmpty').setAttribute('aria-pressed', on ? 'true' : 'false');
    renderer.shadowMap.needsUpdate = true;
    captureMap(); syncUI(); S.dirty = 3;
  };

  // ---- finishes: a floor for every room and walls for every group of rooms, kept per flat in this browser ----
  const FIN_KEY = 'flat3d:' + FLAT.name + ':finishes', ALL_SURF = SURF.floor.concat(SURF.wall);
  let finSaved = {};
  try { finSaved = JSON.parse(localStorage.getItem(FIN_KEY) || '{}') || {}; } catch (err) { finSaved = {}; }
  const saveFin = () => {
    const o = {};
    for (const s of ALL_SURF) if (s.now && s.now !== 'design') o[s.key] = s.now;
    try { localStorage.setItem(FIN_KEY, JSON.stringify(o)); } catch (err) { /* private window: the choice lasts this visit only */ }
  };
  const setFinish = (key, id) => {
    const s = ALL_SURF.find((q) => q.key === key);
    if (!s) return false;
    applyFinish(s, id);
    markFin(s);
    saveFin(); captureMap(); S.dirty = 3;
    return s.now;
  };
  // A swatch: a piece of the texture about 1.2 m across (or of the colour alone), tinted by the finish colour.
  const swatch = (map, color, size) => {
    const c = document.createElement('canvas'), g = c.getContext('2d');
    c.width = c.height = 64;
    const im = map && map.image;
    if (im && im.width) {
      const fx = size ? Math.min(1, 1.2 / size[0]) : 0.5, fz = size ? Math.min(1, 1.2 / size[1]) : 0.5;
      g.drawImage(im, 0, 0, im.width * fx, im.height * fz, 0, 0, 64, 64);
      g.globalCompositeOperation = 'multiply';
    }
    g.fillStyle = '#' + new T.Color(color).getHexString();
    g.fillRect(0, 0, 64, 64);
    return c.toDataURL();
  };
  const finKind = (s) => (SURF.floor.includes(s) ? 'floor' : 'wall');
  const markFin = (s) => {
    const row = document.querySelector('#fin [data-key="' + s.key + '"]');
    if (!row) return;
    for (const b of row.querySelectorAll('button')) b.setAttribute('aria-pressed', b.dataset.id === (s.now || 'design') ? 'true' : 'false');
    const f = FINISHES[finKind(s)].find((q) => q.id === (s.now || 'design'));
    row.parentNode.querySelector('.fin-now').textContent = f ? f.en : '';
  };
  for (const kind of ['floor', 'wall']) {
    const list = $(kind === 'floor' ? 'finFloor' : 'finWall');
    for (const s of SURF[kind]) {
      const box = document.createElement('div'), head = document.createElement('div'), sub = document.createElement('span'), now = document.createElement('span'), row = document.createElement('div');
      box.className = 'fin-item'; head.className = 'fin-head'; now.className = 'fin-now'; row.className = 'fin-sw';
      head.append(s.rooms.map((q) => q.ka + ' ' + q.area.toFixed(FLAT.digits) + ' მ²').join(' + '));
      sub.textContent = s.rooms.map((q) => q.en).join(', ');
      row.dataset.key = s.key;
      row.setAttribute('role', 'group'); row.setAttribute('aria-label', sub.textContent);
      const m = MAT[s.key];
      for (const f of FINISHES[kind]) {
        const b = document.createElement('button'), img = document.createElement('img');
        b.type = 'button'; b.dataset.id = f.id; b.title = f.en; b.setAttribute('aria-label', f.en);
        img.alt = ''; img.src = f.id === 'design' ? swatch(m.map, m.color.getHex(), null) : swatch(f.tex ? (TEX['fin:' + f.tex] = TEX['fin:' + f.tex] || FIN_TEX[f.tex]()) : null, f.color, f.size);
        b.append(img);
        b.addEventListener('click', () => setFinish(s.key, f.id));
        row.append(b);
      }
      box.append(head, sub, now, row); list.append(box);
      if (finSaved[s.key]) applyFinish(s, finSaved[s.key]);
      markFin(s);
    }
  }
  $('finReset').addEventListener('click', () => { for (const s of ALL_SURF) setFinish(s.key, 'design'); });
  const toggleFin = () => {
    const el = $('fin');
    el.hidden = !el.hidden;
    $('bFin').setAttribute('aria-pressed', el.hidden ? 'false' : 'true');
    if (!el.hidden && !$('help').hidden) toggleHelp();
    if (!el.hidden && S.edit) toggleEdit();
  };

  const press = (id, fn) => $(id).addEventListener('click', (e) => { fn(); e.currentTarget.blur(); canvas.focus({ preventScroll: true }); });
  press('bMode', toggleMode); press('bEve', toggleEve); press('bHelp', toggleHelp); press('bFull', fullscreen);
  press('bEmpty', () => setEmpty(!S.empty)); press('bFin', toggleFin); press('bEdit', () => toggleEdit());
  if (document.fullscreenEnabled && app.requestFullscreen) $('bFull').hidden = false;

  // ---- furniture: pick a piece, drag it, turn it, take it away or add one; kept per flat in this browser ----
  // A changed piece is built again from its data; the light is baked again a moment after the last change.
  S.edit = false;
  // labels and the Add list come from the piece files in furniture/ (piece('t', { name, add, values }, ...))
  const NAMES = Object.fromEntries(Object.entries(PIECE_INFO).filter(([, i]) => i.name).map(([t, i]) => [t, i.name]));
  // what the Add list offers, in the order of each piece's add: piece, its values; w x d for pieces that fill a rectangle
  const ADD = Object.entries(PIECE_INFO).filter(([, i]) => i.add).sort((a, b) => a[1].add - b[1].add).map(([t, i]) => (i.values ? [t, i.values] : [t]));
  const NO_TURN = { bath: 1, box: 1, curtain: 1, curtainTrack: 1 };
  const r2 = (v) => Math.round(v * 100) / 100;
  const copyP = (p) => JSON.parse(JSON.stringify(p));
  const pivotOf = (p) => (p.rect ? [(p.rect[0] + p.rect[2]) / 2, (p.rect[1] + p.rect[3]) / 2] : p.b ? [(p.b[0] + p.b[3]) / 2, (p.b[2] + p.b[5]) / 2]
    : p.x !== undefined ? [p.x, p.z] : [((p.x0 || 0) + (p.x1 || 0)) / 2, p.z || 0]);
  const movedP = (p, dx, dz) => {
    const q = copyP(p);
    if (q.rect) q.rect = [r2(q.rect[0] + dx), r2(q.rect[1] + dz), r2(q.rect[2] + dx), r2(q.rect[3] + dz)];
    if (q.b) { q.b[0] = r2(q.b[0] + dx); q.b[3] = r2(q.b[3] + dx); q.b[2] = r2(q.b[2] + dz); q.b[5] = r2(q.b[5] + dz); }
    if (q.x0 !== undefined) { q.x0 = r2(q.x0 + dx); q.x1 = r2(q.x1 + dx); }
    if (q.x !== undefined) q.x = r2(q.x + dx);
    if (q.z !== undefined) q.z = r2(q.z + dz);
    delete q.zone;                                       // a looking glass works its zone out again from the room it is in
    return q;
  };
  // dir 1 turns anticlockwise seen from above, -1 clockwise: 15 degrees, or a quarter for pieces that fill a rectangle
  const turnedP = (p, dir) => {
    const q = copyP(p);
    delete q.zone;
    if (!q.rect) { let r = (q.r || 0) + dir * 15; r = ((r % 360) + 540) % 360 - 180; q.r = r === -180 ? 180 : r; return q; }
    const [x0, z0, x1, z1] = q.rect, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, w = x1 - x0, d = z1 - z0;
    const alongX = q.face ? q.face === 's' || q.face === 'n' : w >= d;
    const rot = (x, z) => { const dx = x - cx, dz = z - cz; return dir > 0 ? [cx + dz, cz - dx] : [cx - dz, cz + dx]; };
    q.rect = [r2(cx - d / 2), r2(cz - w / 2), r2(cx + d / 2), r2(cz + w / 2)];
    if (q.face) q.face = (dir > 0 ? { s: 'e', e: 'n', n: 'w', w: 's' } : { s: 'w', w: 'n', n: 'e', e: 's' })[q.face];
    // places along a kitchen run are measured from its west or north end
    const at = (u) => (alongX ? [x0 + u, cz] : [cx, z0 + u]), back = ([x, z]) => (alongX ? z - q.rect[1] : x - q.rect[0]);
    for (const k of ['sink', 'hob']) if (q[k] !== undefined) q[k] = r2(back(rot(...at(q[k]))));
    if (q.fronts) { const a = back(rot(...at(q.fronts[0]))), b = back(rot(...at(q.fronts[1]))); q.fronts = [r2(Math.min(a, b)), r2(Math.max(a, b))]; }
    return q;
  };

  // taking a piece apart, and putting it together again from its data
  const avgLight = (rec) => {
    const s = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let n = 0;
    if (rec && rec.g) for (const g of rec.g) g.traverse((o) => {
      if (!o.isMesh || !o.geometry.attributes.bakeA) return;
      const A = o.geometry.attributes.bakeA.array, B = o.geometry.attributes.bakeB.array, C = o.geometry.attributes.bakeC.array;
      for (let i = 0; i < A.length; i += 3) for (let j = 0; j < 3; j++) { s[j] += A[i + j]; s[3 + j] += B[i + j]; s[6 + j] += C[i + j]; }
      n += A.length / 3;
    });
    return n ? s.map((v) => v / n) : null;
  };
  let lightGuess = null;                                // the furniture's mean light, for a piece that is new until the next bake
  const takeApart = (rec) => {
    if (!rec.g) return;
    for (const g of rec.g) { g.parent && g.parent.remove(g); g.traverse((o) => { if (o.isMesh) o.geometry.dispose(); }); }
    rec.g = null;
    const out = (arr, gone) => { for (let i = arr.length - 1; i >= 0; i--) if (gone.includes(arr[i])) arr.splice(i, 1); };
    out(COL, rec.cols); out(LAMPS, rec.lamps); out(MIRRORS, rec.mirrors);
    for (let i = glows.length - 1; i >= 0; i--) if (rec.lamps.includes(glows[i].userData.L)) { scene.remove(glows[i]); glows[i].material.dispose(); glows.splice(i, 1); }
    for (let i = mirrors.length - 1; i >= 0; i--) if (rec.mirrors.includes(mirrors[i].M)) { world.remove(mirrors[i].mesh); mirrors[i].rt.dispose(); mirrors.splice(i, 1); }
    rec.cols = rec.lamps = rec.mirrors = []; rec.occBox = rec.occAlb = [];
  };
  const putTogether = (rec, light) => {
    buildPiece(rec.p, rec);
    meshPiece(rec);
    for (const L of rec.lamps) makeGlow(L);
    if (mirrorsOk) for (const M of rec.mirrors) makeMirror(M);
    resize();                                            // sizes the new looking glasses
    const l = light || lightGuess || [0.9, 0.9, 0.9, 0, 0, 0, 0, 0, 0];
    for (const g of rec.g) g.traverse((o) => {
      if (!o.isMesh || !o.geometry.attributes.bakeA) return;
      ['A', 'B', 'C'].forEach((c, k) => { const a = o.geometry.attributes['bake' + c].array; for (let i = 0; i < a.length; i += 3) { a[i] = l[k * 3]; a[i + 1] = l[k * 3 + 1]; a[i + 2] = l[k * 3 + 2]; } });
    });
    applyLook();
  };

  // the light bake, again: a moment after the last change, one at a time
  const relight = { busy: false, again: false, timer: 0, gen: 0 };
  const bakeAgain = () => {
    clearTimeout(relight.timer);
    if (relight.busy) { relight.again = true; return; }
    relight.pending = true;
    relight.timer = setTimeout(async () => {
      relight.pending = false; relight.busy = true; relight.again = false; $('bEmpty').disabled = true;
      const meshes = [];
      world.traverse((o) => { if (o.isMesh && o.material.userData && o.material.userData.bake) meshes.push(o); });
      try { await bakeInto(meshes, occAll(), LAMPS, (p) => { if (S.edit) $('edBusy').textContent = 'Working out the light… ' + Math.round(p * 100) + ' %'; }); }
      finally { relight.busy = false; $('bEmpty').disabled = false; }
      if (emptyPrep) emptyPrep.keep = emptyPrep.grab();
      relight.gen++;
      $('edBusy').textContent = '';
      lightGuess = null;
      renderer.shadowMap.needsUpdate = true; captureMap(); S.dirty = 3;
      if (relight.again) bakeAgain();
    }, 300);
  };

  const saveFurn = () => {
    FLAT.furniture = FLAT.furniture.filter((p) => FIXED[p.t] || p.fixed).concat(PIECE_RECS.filter((r) => r.p).map((r) => r.p));
    try { localStorage.setItem(FURN_KEY, JSON.stringify({ base: BASE, list: FLAT.furniture })); } catch (err) { /* private window: this visit only */ }
  };
  // sets a piece to p (null takes it away); every change goes through here so it can be undone
  const undo = [];
  const setPiece = (rec, p, noUndo) => {
    if (!noUndo) { undo.push({ rec, p: rec.p }); if (undo.length > 200) undo.shift(); }
    const light = avgLight(rec);
    if (!lightGuess) lightGuess = avgLight(PIECE_RECS.find((r) => r.g && r !== rec));
    takeApart(rec);
    rec.p = p;
    if (p) putTogether(rec, light);
    if (sel === rec && !p) select(null); else if (sel === rec) select(rec);
    saveFurn(); syncEdit();
    renderer.shadowMap.needsUpdate = true; S.dirty = 3;
    bakeAgain();
  };
  const undoLast = () => {
    const u = undo.pop();
    if (!u) { hint('Nothing to undo.', 1800); return; }
    if (u.batch) { for (const b of u.batch) setPiece(b.rec, b.p, true); select(null); return; }
    setPiece(u.rec, u.p, true);
    if (u.p) select(u.rec);
  };
  // every piece out at once; one undo brings them all back
  const clearAll = () => {
    const batch = [];
    for (const rec of PIECE_RECS) if (rec.p) { batch.push({ rec, p: rec.p }); setPiece(rec, null, true); }
    if (batch.length) undo.push({ batch });
    select(null);
    hint(batch.length ? 'All the furniture is out. Add pieces from the pictures; Ctrl+Z brings everything back.' : 'The rooms are already empty.', 5000);
  };
  const addPiece = (t, vals) => {
    let x = S.x, z = S.z;
    if (S.mode === 'walk') { x -= Math.sin(S.yaw) * 1.4; z -= Math.cos(S.yaw) * 1.4; }
    else {                                               // under the middle of the view
      const r = canvas.getBoundingClientRect(), f = floorPoint(r.left + r.width / 2, r.top + r.height / 2, 0);
      if (f) { x = f[0]; z = f[1]; }
    }
    // the nearest spot with clear floor about 0.6 m all round, so a new piece does not land in a wall or another piece
    const clear = (px, pz) => inFlat(px, pz) && !!roomAt(px, pz) && !blockedAt(px, pz, 0.6);
    if (!clear(x, z)) {
      let found = null;
      for (let r = 0.15; r <= 4 && !found; r += 0.15) for (let i = 0; i < 24 && !found; i++) { const a = i * TAU / 24; if (clear(x + Math.cos(a) * r, z + Math.sin(a) * r)) found = [x + Math.cos(a) * r, z + Math.sin(a) * r]; }
      if (found) [x, z] = found;
    }
    x = r2(clamp(x, BX0 + 0.5, BX1 - 0.5)); z = r2(clamp(z, BZ0 + 0.5, BZ1 - 0.5));
    const v = Object.assign({}, vals || {}), p = { t };
    if (v.w !== undefined && v.d !== undefined && (t === 'rug' || t === 'wardrobe' || t === 'lowShelf' || t === 'block')) {
      p.rect = [r2(x - v.w / 2), r2(z - v.d / 2), r2(x + v.w / 2), r2(z + v.d / 2)];
      delete v.w; delete v.d;
    } else { p.x = x; p.z = z; p.r = 0; }
    Object.assign(p, v);
    const rec = { p: null, g: null };
    PIECE_RECS.push(rec);
    setPiece(rec, p);
    // now that its size is known: the nearest place where its whole footprint is on clear floor
    const b = new T.Box3().setFromObject(rec.g[0]);
    if (!b.isEmpty()) {
      const hx = (b.max.x - b.min.x) / 2, hz = (b.max.z - b.min.z) / 2, cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2;
      const others = COL.filter((c) => !rec.cols.includes(c));
      const nx = Math.ceil(hx / 0.04), nz = Math.ceil(hz / 0.04);   // samples 8 cm apart or closer, finer than any wall
      const fits = (ox, oz) => {
        for (let i = 0; i <= nx; i++) for (let j = 0; j <= nz; j++) {
          const px = ox - hx + 2 * hx * i / nx, pz = oz - hz + 2 * hz * j / nz;
          if (!inFlat(px, pz) || !roomAt(px, pz)) return false;
          for (const c of others) if (hit(c, px, pz, 0.02)) return false;
        }
        return true;
      };
      let off = null;
      if (!fits(cx, cz)) for (let r = 0.1; r <= 4 && !off; r += 0.1) for (let i = 0; i < 32 && !off; i++) { const a = i * TAU / 32, dx = Math.cos(a) * r, dz = Math.sin(a) * r; if (fits(cx + dx, cz + dz)) off = [dx, dz]; }
      if (off) setPiece(rec, movedP(rec.p, off[0], off[1]), true);
      else if (!fits(cx, cz)) hint('No clear spot big enough nearby: drag it where it should go.', 3000);
    }
    select(rec);
    return rec;
  };
  const resetFurn = () => {
    for (const rec of PIECE_RECS) takeApart(rec);
    PIECE_RECS.length = 0; undo.length = 0; select(null);
    FLAT.furniture = JSON.parse(DESIGN);
    for (const p of FLAT.furniture) if (!(FIXED[p.t] || p.fixed)) { const rec = { p: null, g: null }; PIECE_RECS.push(rec); rec.p = p; putTogether(rec, null); }
    try { localStorage.removeItem(FURN_KEY); } catch (err) { /* storage off */ }
    syncEdit(); renderer.shadowMap.needsUpdate = true; S.dirty = 3;
    bakeAgain();
  };

  // picking: the first thing under the pointer, walls included, so nothing is picked through a wall
  const caster = new T.Raycaster();
  const shown = (o) => { for (let q = o; q; q = q.parent) if (!q.visible) return false; return true; };
  const pickAt = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    caster.setFromCamera(new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    for (const h of caster.intersectObject(world, true)) {
      if (!h.object.isMesh || h.object.userData.noPick || h.object.material.isShaderMaterial || !shown(h.object)) continue;
      return h.object.userData.rec ? { rec: h.object.userData.rec, point: h.point } : null;
    }
    return null;
  };
  // where the pointer meets the level y
  const floorPoint = (cx, cy, y) => {
    const r = canvas.getBoundingClientRect();
    caster.setFromCamera(new T.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
    const o = caster.ray.origin, d = caster.ray.direction;
    if (Math.abs(d.y) < 1e-4) return null;
    const t = (y - o.y) / d.y;
    return t > 0 ? [o.x + d.x * t, o.z + d.z * t] : null;
  };

  // the selected piece: an orange box around it
  let sel = null, drag = null;
  const selBox = new T.Box3Helper(new T.Box3(), new T.Color(0xd4551a));
  selBox.material.depthTest = false; selBox.material.toneMapped = false; selBox.material.fog = false;
  selBox.renderOrder = 11; selBox.visible = false;
  scene.add(selBox);
  const fitBox = () => {
    if (!sel || !sel.g) { selBox.visible = false; return; }
    selBox.box.makeEmpty();
    for (const g of sel.g) if (g.parent && shown(g.parent)) selBox.box.expandByObject(g);
    if (selBox.box.isEmpty()) for (const g of sel.g) selBox.box.expandByObject(g);
    selBox.box.expandByScalar(0.02);
    selBox.visible = S.edit;
    S.dirty = 3;
  };
  const select = (rec) => {
    sel = rec && rec.p ? rec : null;
    fitBox(); syncEdit();
  };
  // while a piece is dragged its groups, glows and glasses are only shifted; it is built again where it is let go
  const shiftPiece = (rec, dx, dz) => {
    for (const g of rec.g) g.position.set(dx, 0, dz);
    for (const s of glows) if (rec.lamps.includes(s.userData.L)) { const L = s.userData.L; s.position.set(L.p[0] + dx, L.p[1], L.p[2] + dz); }
    for (const m of mirrors) if (rec.mirrors.includes(m.M)) { m.mesh.position.set(m.M.p[0] + dx, m.M.p[1], m.M.p[2] + dz); m.p.copy(m.mesh.position); m.off = true; }
    fitBox();
    renderer.shadowMap.needsUpdate = true; S.dirty = 3;
  };
  const turnSel = (dir) => {
    if (!sel) return;
    if (NO_TURN[sel.p.t]) { hint('This piece can only be moved.', 2200); return; }
    setPiece(sel, turnedP(sel.p, dir));
  };
  const removeSel = () => { if (sel) { const r = sel; select(null); setPiece(r, null); hint('Taken away. Ctrl+Z puts it back.', 2500); } };

  const syncEdit = () => {
    $('edSel').hidden = !sel;
    if (sel) {
      $('edName').textContent = NAMES[sel.p.t] || sel.p.t;
      thumbFor(atOrigin(sel.p), $('edImg'));
      const turn = !NO_TURN[sel.p.t];
      $('edL').disabled = $('edR').disabled = !turn;
      $('edWhere').textContent = 'at ' + pivotOf(sel.p).map((v) => v.toFixed(2)).join(', ') + ' m' + (sel.p.rect || !turn ? '' : ', turned ' + (((((sel.p.r || 0) % 360) + 540) % 360 - 180) || 0).toString().replace(/^-180$/, '180') + '°');
    }
    $('edUndo').disabled = !undo.length;
  };
  const toggleEdit = async () => {
    const el = $('edit');
    const on = el.hidden;
    const fromEmpty = on && S.empty;
    if (fromEmpty) await setEmpty(false);
    el.hidden = !on;
    S.edit = on;
    $('bEdit').setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      if (!$('fin').hidden) toggleFin();
      if (!$('help').hidden) toggleHelp();
      if (document.pointerLockElement === canvas && document.exitPointerLock) document.exitPointerLock();
      ring.visible = false;
      drawTiles();
      if (fromEmpty) { clearAll(); return; }
      hint(S.touch ? 'Drag a piece to move it. Tap one to choose it, then turn or remove it here.' : 'Drag a piece to move it. Click one to choose it: R turns it, Delete takes it away, Ctrl+Z undoes.', 6000);
    } else { select(null); canvas.style.cursor = ''; }
    fitBox(); syncEdit(); S.dirty = 3;
  };
  // ---- pictures of pieces: each built on its own far outside the flat, lit by the day sun and a soft made-up light
  // from above, seen from the south-east; a few per frame so the page keeps moving ----
  const THUMB = 144, thumbs = new Map(), thumbWant = [];
  const thumbCam = new T.PerspectiveCamera(28, 1, 0.05, 60), FAR = [BX1 + 60, BZ1 + 60];
  const thumbKey = (p) => JSON.stringify(p);
  const atOrigin = (p) => { const q = copyP(p), c = pivotOf(q); return movedP(q, -c[0], -c[1]); };
  const tilePiece = (t, v) => {
    const p = Object.assign({ t }, v || {});
    if (p.w !== undefined && p.d !== undefined && (t === 'rug' || t === 'wardrobe' || t === 'lowShelf' || t === 'block')) { p.rect = [-p.w / 2, -p.d / 2, p.w / 2, p.d / 2]; delete p.w; delete p.d; }
    else { p.x = 0; p.z = 0; p.r = 0; }
    return p;
  };
  const drawThumbs = (list) => {
    const size = renderer.getSize(new T.Vector2()), pr = renderer.getPixelRatio();
    const keep = { world: world.visible, ext: ext.visible, bg: scene.background, fog: scene.fog, sel: selBox.visible, ring: ring.visible, exp: renderer.toneMappingExposure,
      A: UNI.uBA.value.clone(), B: UNI.uBB.value.clone(), C: UNI.uBC.value.clone(), sun: sun.intensity, env: scene.environment };
    world.visible = ext.visible = selBox.visible = ring.visible = false;
    for (const g of glows) g.visible = false;
    scene.background = new T.Color(0xe9e6e0); scene.fog = null; scene.environment = envs[0];
    const L = LOOKS[0];
    UNI.uBA.value.set(L.A[0], L.A[1], L.A[2]); UNI.uBB.value.set(0, 0, 0); UNI.uBC.value.set(0, 0, 0);
    renderer.toneMappingExposure = L.exp; sun.intensity = LIGHT.sunI * L.sun * 0.55;
    renderer.setPixelRatio(1); renderer.setSize(THUMB, THUMB, false);
    const cv = document.createElement('canvas');
    cv.width = cv.height = THUMB;
    const n = new T.Vector3(), up = new T.Vector3(0.25, 1, 0.35).normalize();
    for (const { p, done } of list) {
      let url = '';
      try {
        const rec = buildPiece(atOrigin(p));
        const out = (arr, gone) => { for (let i = arr.length - 1; i >= 0; i--) if (gone.includes(arr[i])) arr.splice(i, 1); };
        out(COL, rec.cols); out(LAMPS, rec.lamps); out(MIRRORS, rec.mirrors);
        const g = new T.Group();
        buildMeshes(rec.map, g); buildMeshes(rec.ceil, g);
        g.traverse((o) => {
          if (!o.isMesh || !o.geometry.attributes.bakeA) return;
          const N = o.geometry.attributes.normal, A = o.geometry.attributes.bakeA.array;
          for (let i = 0; i < N.count; i++) { n.fromBufferAttribute(N, i); const k = 0.42 + 0.5 * Math.max(0, n.dot(up)) + 0.12 * (n.y * 0.5 + 0.5); A[i * 3] = k; A[i * 3 + 1] = k * 0.98; A[i * 3 + 2] = k * 0.95; }
        });
        g.position.set(FAR[0], 0, FAR[1]);
        scene.add(g); g.updateMatrixWorld(true);
        const box = new T.Box3().setFromObject(g), c = box.getCenter(new T.Vector3()), r = Math.max(0.15, box.getBoundingSphere(new T.Sphere()).radius);
        const dist = r / Math.sin(thumbCam.fov * DEG / 2) * 1.02;
        thumbCam.position.copy(c).add(new T.Vector3(0.62, 0.62, 0.95).normalize().multiplyScalar(dist));
        thumbCam.lookAt(c); thumbCam.near = Math.max(0.02, dist - r * 1.5); thumbCam.far = dist + r * 1.5; thumbCam.updateProjectionMatrix();
        renderer.render(scene, thumbCam);
        cv.getContext('2d').drawImage(canvas, 0, 0, THUMB, THUMB);
        url = cv.toDataURL('image/png');
        scene.remove(g);
        g.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
      } catch (err) { url = ''; }
      thumbs.set(thumbKey(p), url);
      done(url);
    }
    renderer.setPixelRatio(pr); renderer.setSize(size.x, size.y, false);
    world.visible = keep.world; ext.visible = keep.ext; scene.background = keep.bg; scene.fog = keep.fog; selBox.visible = keep.sel; ring.visible = keep.ring;
    scene.environment = keep.env; renderer.toneMappingExposure = keep.exp; sun.intensity = keep.sun;
    UNI.uBA.value.copy(keep.A); UNI.uBB.value.copy(keep.B); UNI.uBC.value.copy(keep.C);
    for (const g of glows) g.visible = (!g.userData.high || ceilGroup.visible) && !(S.empty && g.userData.furn);
    S.dirty = 3;
  };
  const pumpThumbs = () => {
    if (!thumbWant.length) return;
    drawThumbs(thumbWant.splice(0, 4));
    if (thumbWant.length) requestAnimationFrame(pumpThumbs);
  };
  // sets img.src to the picture of piece p, now or when it is drawn
  const thumbFor = (p, img) => {
    const k = thumbKey(p);
    if (thumbs.has(k)) { img.src = thumbs.get(k) || ''; img.hidden = !thumbs.get(k); return; }
    img.hidden = true;
    const w = thumbWant.find((q) => q.k === k), done = (url) => { img.src = url; img.hidden = !url; };
    if (w) { const d0 = w.done; w.done = (u) => { d0(u); done(u); }; return; }
    thumbWant.push({ k, p, done });
    if (thumbWant.length === 1) requestAnimationFrame(pumpThumbs);
  };
  const tiles = [];
  for (const [t, v] of ADD) {
    const b = document.createElement('button'), img = document.createElement('img'), nm = document.createElement('span');
    b.type = 'button'; b.className = 'ed-tile'; b.title = 'Add: ' + (NAMES[t] || t);
    img.alt = ''; img.width = img.height = 72; img.hidden = true; nm.textContent = NAMES[t] || t;
    b.append(img, nm);
    b.addEventListener('click', () => addPiece(t, v));
    $('edAdd').append(b);
    tiles.push({ img, p: tilePiece(t, v) });
  }
  let tilesDrawn = false;
  const drawTiles = () => { if (tilesDrawn) return; tilesDrawn = true; for (const q of tiles) thumbFor(q.p, q.img); };
  $('edL').addEventListener('click', () => turnSel(1));
  $('edR').addEventListener('click', () => turnSel(-1));
  $('edDel').addEventListener('click', removeSel);
  $('edUndo').addEventListener('click', undoLast);
  $('edReset').addEventListener('click', resetFurn);
  $('edClear').addEventListener('click', clearAll);
  $('edCopy').addEventListener('click', () => {
    const txt = '"furniture": [\n' + FLAT.furniture.map((p) => '  ' + JSON.stringify(p)).join(',\n') + '\n]';
    const done = () => hint('The furniture list is copied.', 2000);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => hint('This browser would not copy.', 2500));
    else hint('This browser would not copy.', 2500);
  });

  // ---- per-frame work ----
  const P = { x: 0, z: 0 };
  const walkStep = (dt) => {
    let ix = 0, iz = 0;
    if (K.KeyW || K.ArrowUp) iz += 1;
    if (K.KeyS || K.ArrowDown) iz -= 1;
    if (K.KeyD) ix += 1;
    if (K.KeyA) ix -= 1;
    const turn = (K.ArrowLeft || K.KeyQ ? 1 : 0) - (K.ArrowRight || K.KeyE ? 1 : 0);
    if (turn) S.yaw += turn * dt * 1.9;
    ix += stick.x; iz += stick.y;
    const il = Math.hypot(ix, iz);
    if (il > 1) { ix /= il; iz /= il; }
    const sp = K.ShiftLeft || K.ShiftRight ? 3.0 : 1.55, sy = Math.sin(S.yaw), cy = Math.cos(S.yaw);
    const wx = (-sy * iz + cy * ix) * sp, wz = (-cy * iz - sy * ix) * sp, k = 1 - Math.exp(-dt * (il > 0.01 ? 9 : 13));
    S.vx += (wx - S.vx) * k; S.vz += (wz - S.vz) * k;
    const v = Math.hypot(S.vx, S.vz);
    if (v < 0.004) { S.vx = S.vz = 0; }
    P.x = S.x; P.z = S.z;
    const n = Math.max(1, Math.ceil(v * dt / 0.05));
    for (let i = 0; i < n; i++) { P.x += S.vx * dt / n; P.z += S.vz * dt / n; settle(P); }
    const mx = P.x - S.x, mz = P.z - S.z, went = Math.hypot(mx, mz);
    if (dt > 0 && v > 0.01) { S.vx = lerp(S.vx, mx / dt, 0.5); S.vz = lerp(S.vz, mz / dt, 0.5); }   // walls take the speed out of you
    S.x = P.x; S.z = P.z;
    S.step = (S.step || 0) + went;
    const bobWant = reduced ? 0 : Math.sin(S.step * 4.4) * 0.011 * clamp(went / Math.max(dt, 1e-4) / 1.5, 0, 1);
    S.bob += (bobWant - S.bob) * (1 - Math.exp(-dt * 12));
    if (went > 1e-5) S.walked = true;
    const R = roomAt(S.x, S.z);
    if (R) showRoom(R);
  };
  const stepDoors = (dt) => {
    let moving = false;
    for (const d of DOORS) {
      if (S.mode === 'walk') { const dist = Math.hypot(S.x - d.cx, S.z - d.cz); if (dist < 1.25) d.want = 1; else if (dist > 1.9) d.want = d.rest; }
      else if (S.mode === 'plan') d.want = d.rest;
      const diff = d.want - d.t;
      if (Math.abs(diff) < 0.0015) { if (diff) { d.t = d.want; poseDoor(d); moving = true; } continue; }
      const was = d.t;
      d.t += clamp(diff * (1 - Math.exp(-dt * 7)), -dt * 1.7, dt * 1.7);
      poseDoor(d);
      if (S.mode === 'walk' && hit(d.col, S.x, S.z, RAD + 0.01)) { d.t = was; poseDoor(d); continue; }   // someone is in the way: wait
      moving = true;
    }
    if (moving) { renderer.shadowMap.needsUpdate = true; S.dirty = 3; }
  };
  let slow = 0, fast = 0, acc = 0, accN = 0;
  const tunePixels = (dt) => {                          // keep the walk smooth on small graphics chips
    acc += dt; accN++;
    if (accN < 45) return;
    const avg = acc / accN;
    acc = 0; accN = 0;
    if (avg > 1 / 34) { slow++; fast = 0; } else if (avg < 1 / 55) { fast++; slow = 0; } else { slow = 0; fast = 0; }
    const cap = Math.min(window.devicePixelRatio || 1, coarse ? 2 : 1.5);
    if (slow >= 2 && S.pr > 0.6) { S.pr = Math.max(0.6, S.pr - 0.15); slow = 0; resize(); }
    else if (fast >= 6 && S.pr < cap) { S.pr = Math.min(cap, S.pr + 0.1); fast = 0; resize(); }
  };
  const resize = () => {
    const w = app.clientWidth, h = app.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(S.pr);
    renderer.setSize(w, h, false);
    const mk = Math.min(0.75 * S.pr, 1280 / w);         // mirrors are drawn a little smaller than the view
    for (const m of mirrors) m.rt.setSize(Math.max(64, Math.round(w * mk)), Math.max(64, Math.round(h * mk)));
    camera.aspect = w / h;
    if (!S.userView) S.dist = fitDist();
    camera.updateProjectionMatrix();
    S.dirty = 3;
  };
  const update = (dt) => {
    if (S.eve !== S.eveWant) { S.eve = S.eveWant > S.eve ? Math.min(S.eveWant, S.eve + dt / (reduced ? 0.01 : 1.1)) : Math.max(S.eveWant, S.eve - dt / (reduced ? 0.01 : 1.1)); applyLook(); }
    stepDoors(dt);
    let out = 0;                                        // how much of the town outside to show
    if (S.mode === 'fly') {
      const f = S.fly;
      f.t = Math.min(1, f.t + dt / f.dur);
      const e = easeIO(f.t), turn = f.to === 'walk' ? easeIO(clamp((f.t - 0.22) / 0.78, 0, 1)) : easeIO(clamp(f.t / 0.8, 0, 1));
      camera.position.lerpVectors(f.p0, f.p1, e);
      camera.quaternion.slerpQuaternions(f.q0, f.q1, turn);
      camera.fov = lerp(f.f0, f.f1, e);
      out = f.to === 'walk' ? sstep(0.35, 0.9, f.t) : 1 - sstep(0.1, 0.65, f.t);
      if (f.t >= 1) {
        S.mode = f.to; S.fly = null;
        if (S.mode === 'walk') walkHint(); else planHint();
        syncUI();
      }
      S.dirty = 3;
    } else if (S.mode === 'walk') {
      walkStep(dt);
      walkPose(camera.position, camera.quaternion);
      camera.fov = FOV_WALK;
      out = 1;
      S.dirty = 3;
      tunePixels(dt);
    } else {
      planPose(camera.position, camera.quaternion);
      camera.fov = FOV_PLAN;
    }
    camera.updateProjectionMatrix();
    ext.visible = out > 0.001;
    if (ext.visible) { sky.material.opacity = out; pano.material.opacity = out; ground.material.opacity = out; sunDisc.material.opacity = out; for (const m of town.mats) m.opacity = out; }
    ceilGroup.visible = camera.position.y < H - 0.02;
    for (const s of glows) s.visible = (!s.userData.high || ceilGroup.visible) && !(S.empty && s.userData.furn);
  };
  let last = performance.now();
  const frame = (now) => {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    update(dt);
    if (S.dirty <= 0) return;
    S.dirty--;
    if (S.mode !== 'plan') drawMirrors(false);
    renderer.render(scene, camera);
    placeTags();
    if (S.mode === 'walk') drawMap();
  };

  // ---- go ----
  readTheme();
  applyLook();
  S.dist = fitDist();
  resize();
  new ResizeObserver(resize).observe(app);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { readTheme(); captureMap(); });
  new MutationObserver(() => { readTheme(); captureMap(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  // Warm-up behind the opening sheet: shaders for the screen and for the mirrors, and the large pictures of the
  // town and both skies, are prepared now rather than in the middle of the first steps.
  setStage('Opening the door…', 1);
  await paint();
  renderer.shadowMap.needsUpdate = true;
  ext.visible = true; ceilGroup.visible = true;
  for (const t of [skyTex[0], skyTex[1], panoTex[0], panoTex[1], ...town.textures]) renderer.initTexture(t);
  renderer.compile(scene, camera);
  if (mirrors.length) { renderer.setRenderTarget(mirrors[0].rt); renderer.compile(scene, camera); renderer.setRenderTarget(null); }
  {                                                     // a spot in front of the mirrors, so their shaders are ready
    const m = MIRRORS[0], w = FLAT.warm || (m ? [m.p[0] + m.n[0] * 1.2, m.p[2] + m.n[2] * 1.2] : START);
    camera.position.set(w[0], EYE, w[1]);
  }
  camera.quaternion.setFromEuler(_eu.set(0, 0.6, 0, 'YXZ'));
  camera.fov = FOV_WALK;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);                       // also fills the shadow map
  drawMirrors(true);
  planPose(camera.position, camera.quaternion);
  camera.fov = FOV_PLAN;
  camera.updateProjectionMatrix();
  ext.visible = false; ceilGroup.visible = false;
  renderer.render(scene, camera);
  captureMap();
  S.ready = true;
  syncUI();
  planHint();
  $('veil').classList.add('off');
  setTimeout(() => { $('veil').hidden = true; }, 700);
  requestAnimationFrame(frame);
  if (location.hash === '#walk') goWalk(START[0], START[1], START[2] * DEG, true);

  // hooks for checking the page from scripts
  window.__flat = {
    empty: (on) => setEmpty(on), finish: (key, id) => setFinish(key, id), surfaces: SURF,
    furniture: {
      edit: toggleEdit, pieces: () => PIECE_RECS.filter((r) => r.p), pick: pickAt, select, selected: () => sel,
      move: (rec, dx, dz) => setPiece(rec, movedP(rec.p, dx, dz)), turn: (rec, dir) => setPiece(rec, turnedP(rec.p, dir)), remove: (rec) => setPiece(rec, null),
      add: addPiece, undo: undoLast, clear: clearAll, reset: resetFurn, busy: () => relight.busy || relight.pending, gen: () => relight.gen, ADD,
    },
    S, data: FLAT, stats: bakeStats, doors: DOORS, lamps: LAMPS, renderer, scene, camera, ext, ceilGroup, capGroup,
    plan(theta, phi, dist) { S.mode = 'plan'; S.fly = null; S.theta = theta || 0; S.phi = phi || 0; if (dist) { S.dist = dist; S.userView = true; } syncUI(); S.dirty = 3; },
    walk(x, z, yawDeg, pitchDeg) { S.mode = 'walk'; S.fly = null; S.x = x; S.z = z; S.yaw = (yawDeg || 0) * DEG; S.pitch = (pitchDeg || 0) * DEG; S.vx = S.vz = 0; showRoom(roomAt(x, z)); for (let i = 0; i < 90; i++) stepDoors(0.05); hint('', 0); syncUI(); S.dirty = 3; },
    evening(on) { S.eve = S.eveWant = on ? 1 : 0; applyLook(); syncUI(); },
    free: freeAt, room: (x, z) => { const R = roomAt(x, z); return R && R.id; },
    top() {
      const w = app.clientWidth, h = app.clientHeight, keep = [ortho.left, ortho.right, ext.visible, ceilGroup.visible, ortho.top, ortho.bottom];
      const half = Math.max(MAPR.d, MAPR.w * h / w) / 2;   // the whole key-plan area, whichever side is the limit
      ortho.left = -half * w / h; ortho.right = half * w / h; ortho.top = half; ortho.bottom = -half; ortho.updateProjectionMatrix();
      ext.visible = false; ceilGroup.visible = false; ring.visible = false;
      for (const s of glows) s.visible = false;
      for (const t of tags) t.el.hidden = true;
      scene.background = new T.Color(0xffffff);
      renderer.render(scene, ortho);
      ortho.left = keep[0]; ortho.right = keep[1]; ortho.top = keep[4]; ortho.bottom = keep[5]; ortho.updateProjectionMatrix(); ext.visible = keep[2]; ceilGroup.visible = keep[3];
      S.dirty = 0;
    },
  };
  window.__ready = true;
}

boot().catch((err) => {
  const el = $('stage');
  if (el) el.textContent = 'The model could not be built: ' + (err && err.message ? err.message : err);
  console.error(err);
});
