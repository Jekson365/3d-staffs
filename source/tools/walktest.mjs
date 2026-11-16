// Drives a flat's page the way a visitor would and prints what happened: click-to-enter, keys, collisions, doors.
// The route comes from the flat's data: every hinged door and every sliding door is walked through, and a flood fill
// over free floor checks that every room can be reached from the entrance. Ends with RESULT: PASS or RESULT: FAIL.
//   node tools/walktest.mjs <name>            (or a path to a preview page)
//   node tools/walktest.mjs <name> touch      phone run: tap, thumbs, pinch
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const arg = process.argv[2];
if (!arg) { console.log('usage: node tools/walktest.mjs <name> [touch]'); process.exit(1); }
const page = arg.endsWith('.html') ? arg : 'dist/' + arg + '/preview.html';
const port = 9300 + Math.floor(Math.random() * 600), profile = resolve(tmpdir(), 'walk-profile-' + port);
const chrome = spawn(process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + profile,
  '--no-first-run', '--no-default-browser-check', '--allow-file-access-from-files', '--hide-scrollbars', '--window-size=1400,900', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 80 && !target; i++) {
  await sleep(150);
  try { target = (await (await fetch('http://127.0.0.1:' + port + '/json/list')).json()).find((t) => t.type === 'page'); } catch (e) { /* starting */ }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let seq = 0;
const pending = new Map(), fails = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result); return; }
  if (m.method === 'Runtime.exceptionThrown') { const t = (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || '').slice(0, 2000); console.log('[exception]', t); fails.push('exception: ' + t.split('\n')[0]); }
};
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
const VK = { ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, ShiftLeft: 16 };
const key = (type, code) => send('Input.dispatchKeyEvent', { type, code, key: code.startsWith('Key') ? code[3].toLowerCase() : code, windowsVirtualKeyCode: code.startsWith('Key') ? code.charCodeAt(3) : VK[code] || 0 });
const hold = async (code, ms) => { await key('rawKeyDown', code); await sleep(ms); await key('keyUp', code); await sleep(150); };
const tap = async (code, wait) => { await key('rawKeyDown', code); await key('keyUp', code); await sleep(wait); };
const where = async () => JSON.parse(await ev('JSON.stringify({ mode: __flat.S.mode, x: +__flat.S.x.toFixed(2), z: +__flat.S.z.toFixed(2), yaw: +(__flat.S.yaw * 180 / Math.PI).toFixed(0), room: __flat.room(__flat.S.x, __flat.S.z), doors: __flat.doors.map(d => d.id + ":" + d.t.toFixed(2)).join(" ") })'));
const click = async (x, y) => {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
};
const screenOf = async (x, z) => JSON.parse(await ev('(() => { const v = new THREE.Vector3(' + x + ', 0, ' + z + ').project(__flat.camera); const r = document.getElementById("view").getBoundingClientRect(); return JSON.stringify([r.left + (v.x * 0.5 + 0.5) * r.width, r.top + (-v.y * 0.5 + 0.5) * r.height]); })()'));
const log = async (label, extra) => { const w = await where(); console.log(label.padEnd(15), JSON.stringify(w), extra || ''); return w; };
const check = (ok, what) => { if (!ok) fails.push(what); return ok ? 'ok' : 'FAIL'; };
const touch = (type, pts) => send('Input.dispatchTouchEvent', { type, touchPoints: pts.map((p, i) => ({ x: p[0], y: p[1], id: p[2] === undefined ? i : p[2] })) });

// Phone run: tap the plan, steer with the left thumb, look with the right, pinch the plan.
const phone = async (big) => {
  await log('start');
  const pt = await screenOf(big.label[0], big.label[1]);
  await touch('touchStart', [pt]); await sleep(60); await touch('touchEnd', []);
  await sleep(2600); const w = await log('tap floor');
  check(w.mode === 'walk' && w.room === big.id, 'tap on the plan did not land in ' + big.id);
  await touch('touchStart', [[80, 600, 1]]);
  for (let i = 1; i <= 6; i++) { await touch('touchMove', [[80, 600 - i * 10, 1]]); await sleep(30); }
  await sleep(1500); const shown = await ev('!document.getElementById("stick").hidden'); const w2 = await log('thumb up 1.5s', 'stick shown: ' + shown);
  check(shown && (w2.x !== w.x || w2.z !== w.z), 'thumb stick did not move the walker');
  await touch('touchStart', [[80, 540, 1], [300, 400, 2]]);
  for (let i = 1; i <= 8; i++) { await touch('touchMove', [[80, 540, 1], [300 - i * 10, 400, 2]]); await sleep(30); }
  const w3 = await log('look 80px'); check(w3.yaw !== w2.yaw, 'right thumb did not turn the view');
  await touch('touchEnd', []); await sleep(400); await log('thumbs up', 'stick shown: ' + await ev('!document.getElementById("stick").hidden'));
  const b = JSON.parse(await ev('(() => { const r = document.getElementById("bMode").getBoundingClientRect(); return JSON.stringify([r.left + r.width / 2, r.top + r.height / 2]); })()'));
  await touch('touchStart', [b]); await sleep(60); await touch('touchEnd', []);
  await sleep(2300); check((await log('Plan button')).mode === 'plan', 'Plan button did not return to the plan');
  const d0 = await ev('__flat.S.dist');
  await touch('touchStart', [[150, 400, 1], [240, 400, 2]]);
  for (let i = 1; i <= 8; i++) { await touch('touchMove', [[150 - i * 6, 400, 1], [240 + i * 6, 400, 2]]); await sleep(30); }
  await touch('touchEnd', []);
  const d1 = await ev('__flat.S.dist');
  console.log('pinch out'.padEnd(15), 'distance', (+d0).toFixed(1), '->', (+d1).toFixed(1)); check(d1 < d0, 'pinch did not zoom');
  await touch('touchStart', [[200, 500, 1]]);
  for (let i = 1; i <= 8; i++) { await touch('touchMove', [[200 + i * 8, 500 - i * 6, 1]]); await sleep(30); }
  await touch('touchEnd', []);
  console.log('drag plan'.padEnd(15), await ev('JSON.stringify({ theta: +__flat.S.theta.toFixed(2), phi: +__flat.S.phi.toFixed(2) })'));
};

// Every room reachable on foot from the start spot: 0.1 m flood fill over free floor, doors held open.
const reach = async (start, ids) => ev(`(() => {
  const keep = __flat.doors.map((d) => d.col);
  for (const d of __flat.doors) d.col = { k: 0, x0: -99, z0: -99, x1: -98.9, z1: -98.9 };
  const B = __flat.data.bounds, st = 0.1, nx = Math.ceil((B[2] - B[0]) / st) + 1, nz = Math.ceil((B[3] - B[1]) / st) + 1, seen = new Uint8Array(nx * nz), q = [], got = {};
  const f = __flat.free, P = (i, j) => [B[0] + i * st, B[1] + j * st];
  // doorways of hinged doors and open gaps count as floor, with 0.25 m either side (thick walls leave no free spot there)
  const thr = __flat.data.openings.filter((o) => o.kind === 'door' || o.kind === 'gap').map((o) => o.axis === 'x' ? [o.a + 0.2, o.at[0] - 0.25, o.b - 0.2, o.at[1] + 0.25] : [o.at[0] - 0.25, o.a + 0.2, o.at[1] + 0.25, o.b - 0.2]);
  // doors in slanted walls: the same, measured along and across the wall
  const sl = (__flat.data.slants || []).flatMap((w) => (w.ops || []).filter((o) => o.kind === 'door').map((o) => { const L = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]); return { a: w.a, u: [(w.b[0] - w.a[0]) / L, (w.b[1] - w.a[1]) / L], u0: o.from + 0.2, u1: o.to - 0.2, h: w.t / 2 + 0.25 }; }));
  const inSl = (x, z) => sl.some((d) => { const dx = x - d.a[0], dz = z - d.a[1], u = dx * d.u[0] + dz * d.u[1], v = -dx * d.u[1] + dz * d.u[0]; return u >= d.u0 && u <= d.u1 && Math.abs(v) <= d.h; });
  const ok = (x, z) => f(x, z) || inSl(x, z) || thr.some((q) => x >= q[0] && x <= q[2] && z >= q[1] && z <= q[3]) || (f(x, z - 0.15) && f(x, z + 0.15)) || (f(x - 0.15, z) && f(x + 0.15, z));   // thresholds belong to no room
  const i0 = Math.round((${start[0]} - B[0]) / st), j0 = Math.round((${start[1]} - B[1]) / st);
  seen[j0 * nx + i0] = 1; q.push([i0, j0]);
  while (q.length) {
    const [i, j] = q.pop(), [x, z] = P(i, j), r = __flat.room(x, z);
    if (r) got[r] = (got[r] || 0) + 1;
    for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const u = i + a, v = j + b;
      if (u < 0 || v < 0 || u >= nx || v >= nz || seen[v * nx + u]) continue;
      seen[v * nx + u] = 1;
      const [px, pz] = P(u, v);
      if (ok(px, pz)) q.push([u, v]);
    }
  }
  __flat.doors.forEach((d, k) => { d.col = keep[k]; });
  return JSON.stringify({ missing: ${JSON.stringify(ids)}.filter((id) => !got[id]), cells: got });
})()`);

try {
  const isPhone = process.argv[3] === 'touch';
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', isPhone ? { width: 390, height: 780, deviceScaleFactor: 2, mobile: true } : { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
  if (isPhone) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Page.navigate', { url: pathToFileURL(resolve(page)).href });
  for (let i = 0; i < 300 && !(await ev('!!window.__ready').catch(() => false)); i++) await sleep(200);
  await sleep(900);
  const F = JSON.parse(await ev('JSON.stringify(__flat.data)'));
  const area = (r) => (r.rects || []).reduce((s, q) => s + (q[2] - q[0]) * (q[3] - q[1]), 0);
  const big = F.rooms.filter((r) => !r.outdoor).sort((a, b) => area(b) - area(a))[0];
  const roomOf = async (x, z) => ev('__flat.room(' + x + ', ' + z + ')');
  const outdoor = (id) => !!(F.rooms.find((r) => r.id === id) || {}).outdoor;
  if (isPhone) { await phone(big); throw 'done'; }

  await log('start');
  // 1. click the floor of the largest room in the plan
  let pt = await screenOf(big.label[0], big.label[1]);
  await click(pt[0], pt[1]);
  await sleep(300); await log('after click');
  await sleep(2200); let w = await log('landed', 'pointer: ' + await ev('document.pointerLockElement ? "locked" : "free"'));
  check(w.mode === 'walk' && w.room === big.id, 'click on the plan did not land in ' + big.id);
  // 2. walk forward: must stop at a wall or furniture, inside the flat
  await hold('KeyW', 3000); await log('W 3s');
  await hold('KeyW', 3000); w = await log('W 3s more'); check(!!w.room, 'walked out of every room');
  // 3. back to the plan with M, then in again with M: resumes where we were
  await tap('KeyM', 2300); check((await log('M')).mode === 'plan', 'M did not go to the plan');
  await tap('KeyM', 2500); check((await log('M again')).mode === 'walk', 'M did not go back to walking');
  // 4. a click on furniture in the plan picks the nearest free floor, a click outside does nothing
  const thing = (F.furniture || []).find((f) => ['bed', 'sofa', 'cornerSofa', 'diningSet'].includes(f.t));
  if (thing) {
    await tap('KeyM', 2300);
    pt = await screenOf(thing.x, thing.z); await click(pt[0], pt[1]); await sleep(2600);
    w = await log('click on ' + thing.t); check(w.mode === 'walk' && !!w.room, 'click on the ' + thing.t + ' found no floor');
  }
  await tap('KeyM', 2300);
  await click(60, 450); await sleep(600); check((await log('click outside')).mode === 'plan', 'click outside the flat left the plan');
  // 5. every hinged door, walked through from the side it does not open to, keys only
  for (const o of F.openings.filter((q) => q.kind === 'door' || q.kind === 'gap')) {
    const mid = (o.a + o.b) / 2, tm = (o.at[0] + o.at[1]) / 2, s = o.into === 1 ? -1 : o.into === -1 ? 1 : -1;
    let g = 0.9;                                                      // a narrow balcony: start nearer the door
    if (!(await roomOf(...(o.axis === 'x' ? [mid, tm + s * g] : [tm + s * g, mid])))) g = 0.45;
    const [x, z] = o.axis === 'x' ? [mid, tm + s * g] : [tm + s * g, mid], [fx, fz] = o.axis === 'x' ? [mid, tm - s * 0.9] : [tm - s * 0.9, mid];
    const yaw = o.axis === 'x' ? (s > 0 ? 0 : 180) : (s > 0 ? 90 : -90), want = await roomOf(fx, fz);
    await ev('(__flat.walk(' + x + ', ' + z + ', ' + yaw + ', 0), 0)'); await sleep(300);
    await hold('KeyW', 1800); w = await log('door ' + o.id);
    console.log(''.padEnd(15), 'expected ' + want + ': ' + check(w.room === want, 'could not walk through door ' + o.id + ' into ' + want));
  }
  // 5b. doors in slanted walls, the same way: start 0.9 m out on the side the door does not open to
  for (const sw of F.slants || []) for (const o of (sw.ops || []).filter((q) => q.kind === 'door')) {
    const L = Math.hypot(sw.b[0] - sw.a[0], sw.b[1] - sw.a[1]), ux = (sw.b[0] - sw.a[0]) / L, uz = (sw.b[1] - sw.a[1]) / L, m = (o.from + o.to) / 2;
    const mx = sw.a[0] + ux * m, mz = sw.a[1] + uz * m, k = o.into > 0 ? -1 : 1, nx = -uz * k, nz = ux * k;
    const [x, z] = [mx + nx * 0.9, mz + nz * 0.9], [fx, fz] = [mx - nx * 0.9, mz - nz * 0.9], want = await roomOf(fx, fz);
    const yaw = Math.atan2(nx, nz) * 180 / Math.PI;           // facing -n: yaw 0 looks north, 90 west
    await ev('(__flat.walk(' + x + ', ' + z + ', ' + yaw + ', 0), 0)'); await sleep(300);
    await hold('KeyW', 1800); w = await log('door ' + o.id);
    console.log(''.padEnd(15), 'expected ' + want + ': ' + check(w.room === want, 'could not walk through door ' + o.id + ' into ' + want));
  }
  // 6. sliding doors: from the room side through to the balcony, then keep pushing against the rail
  for (const o of F.openings.filter((q) => q.kind === 'slide')) {
    const four = (o.panes || (o.b - o.a > 2.6 ? 4 : 2)) === 4, q = (o.b - o.a) / 4 + 0.03;   // aim at the part that opens
    const mid = four ? (o.a + o.b) / 2 : o.fixed === 'a' ? o.b - q : o.a + q, tm = (o.at[0] + o.at[1]) / 2;
    const r0 = o.axis === 'x' ? await roomOf(mid, o.at[0] - 0.3) : await roomOf(o.at[0] - 0.3, mid);
    const s = r0 && !outdoor(r0) ? -1 : 1;                           // the room side
    const [x, z] = o.axis === 'x' ? [mid, tm + s * 0.9] : [tm + s * 0.9, mid], [fx, fz] = o.axis === 'x' ? [mid, tm - s * 0.9] : [tm - s * 0.9, mid];
    const yaw = o.axis === 'x' ? (s > 0 ? 0 : 180) : (s > 0 ? 90 : -90), want = await roomOf(fx, fz);
    await ev('(__flat.walk(' + x + ', ' + z + ', ' + yaw + ', 0), 0)'); await sleep(300);
    await hold('KeyW', 2500); w = await log('slide ' + o.id);
    console.log(''.padEnd(15), 'expected ' + want + ': ' + check(w.room === want, 'could not walk through ' + o.id + ' to ' + want));
    await hold('KeyW', 2000); w = await log('at the rail'); check(w.room === want, 'walked off the balcony past the rail');
  }
  // 7. every room can be reached from the entrance
  const R = JSON.parse(await reach(F.start, F.rooms.map((r) => r.id)));
  console.log('reachable'.padEnd(15), (R.missing.length ? 'missing: ' + R.missing.join(', ') + ' ' : '') + JSON.stringify(R.cells), check(!R.missing.length, 'rooms not reachable: ' + R.missing.join(', ')));
  // 8. strafe, turn with the arrow keys, run
  await ev('(__flat.walk(' + big.label[0] + ', ' + big.label[1] + ', 0, 0), 0)'); await sleep(200);
  w = await where(); await hold('KeyD', 600); const w1 = await log('D 0.6s'); check(w1.x !== w.x || w1.z !== w.z, 'D did not strafe');
  await hold('ArrowLeft', 500); const w2 = await log('turn left'); check(w2.yaw !== w1.yaw, 'arrow key did not turn');
  await key('rawKeyDown', 'ShiftLeft'); await hold('KeyW', 1000); await key('keyUp', 'ShiftLeft'); await log('run 1s');
  // 9. evening with L
  await tap('KeyL', 1500); const eve = await ev('__flat.S.eve'); console.log('L -> evening '.padEnd(15), eve, check(eve === 1, 'L did not switch to the evening'));
  console.log('render info'.padEnd(15), await ev('JSON.stringify(Object.assign({}, __flat.renderer.info.render, { geometries: __flat.renderer.info.memory.geometries, textures: __flat.renderer.info.memory.textures, pr: __flat.S.pr }))'));
  console.log('bake'.padEnd(15), await ev('JSON.stringify(__flat.stats)'));
  console.log('frame time'.padEnd(15), await ev('new Promise((res) => { let n = 0, t0 = performance.now(), worst = 0, last = t0; const f = (t) => { worst = Math.max(worst, t - last); last = t; if (++n < 120) requestAnimationFrame(f); else res(((t - t0) / 120).toFixed(2) + " ms avg, worst " + worst.toFixed(1)); }; requestAnimationFrame(f); })'));
} catch (e) {
  if (e !== 'done') { fails.push('test error: ' + e.message); console.log(e); }
} finally {
  console.log(fails.length ? 'RESULT: FAIL\n  ' + fails.join('\n  ') : 'RESULT: PASS');
  try { await Promise.race([send('Browser.close'), sleep(1500)]); } catch (e) { /* closed */ }
  await sleep(400);
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) { /* locked */ }
}
