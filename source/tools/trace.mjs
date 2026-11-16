// Wall tracer: reads a plan render, turns it so the main glazing faces south, finds the walls (opaque near-white) and the
// outside (transparent), sets the scale from the total floor area, and writes:
//   ref/<name>.png                the turned picture (what the data file's "ref" points at)
//   ref/<name>-original.<ext>     the picture as given
//   dist/shots/trace.png          the turned picture with the walls in red and free-floor rectangles numbered in blue
// It finds walls drawn in white, as in flat 1's render; partitions drawn in other colours have to be added by hand.
//                                 (orange outlines: white things too wide to be walls - baths, basins, beds)
//   flats/<name>.json             a skeleton: ref, walls in metres, free-floor rectangles as "_free" (left alone if the file exists:
//                                 then it goes to flats/<name>.trace.json)
// Usage: node tools/trace.mjs <image> <name> <total m²> [turn: 0|90|180|270, quarter turns anticlockwise]
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join, dirname, extname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const [image, name, areaArg, turnArg] = process.argv.slice(2);
if (!image || !name || !areaArg) { console.log('usage: node tools/trace.mjs <image> <name> <total m²> [turn 0|90|180|270]'); process.exit(1); }
const root = join(dirname(fileURLToPath(import.meta.url)), '..'), area = +areaArg, turn = +(turnArg || 0);
if (!existsSync(image)) { console.error('no such image: ' + image); process.exit(1); }
if (!(area > 0)) { console.error('the total area must be a number of m²'); process.exit(1); }
const ext = extname(image).toLowerCase(), mime = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }[ext];
if (!mime) { console.error('png, webp or jpg please'); process.exit(1); }
copyFileSync(image, join(root, 'ref', name + '-original' + ext));
const dataUrl = 'data:' + mime + ';base64,' + readFileSync(image).toString('base64');

const port = 9300 + Math.floor(Math.random() * 600), profile = resolve(tmpdir(), 'trace-profile-' + port);
const chrome = spawn(process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + profile,
  '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 80 && !target; i++) { await sleep(150); try { target = (await (await fetch('http://127.0.0.1:' + port + '/json/list')).json()).find((t) => t.type === 'page'); } catch (e) { /* starting */ } }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let seq = 0;
const pending = new Map();
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result); } };
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};
try {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: pathToFileURL(join(root, 'tools', 'trace.html')).href });
  for (let i = 0; i < 100 && !(await ev('!!window.__ready').catch(() => false)); i++) await sleep(100);
  const R = JSON.parse(await ev('trace(' + JSON.stringify(dataUrl) + ', ' + turn + ', ' + area + ')'));
  const png = (u) => Buffer.from(u.slice(u.indexOf(',') + 1), 'base64');
  writeFileSync(join(root, 'ref', name + '.png'), png(R.turned));
  mkdirSync(join(root, 'dist', 'shots'), { recursive: true });
  writeFileSync(join(root, 'dist', 'shots', 'trace.png'), png(R.overlay));
  const S = R.S, [ox, oy] = R.origin, m = (v) => Math.round(v * 100) / 100;
  const toM = (r) => [m((r[0] - ox) / S), m((r[1] - oy) / S), m((r[2] - ox) / S), m((r[3] - oy) / S)];
  const walls = R.walls.map(toM), free = R.free.map(toM);
  console.log('picture ' + R.W + ' x ' + R.H + ' px after the turn; flat ' + R.size[0] + ' x ' + R.size[1] + ' px from (' + ox + ', ' + oy + ')');
  console.log('scale ' + S.toFixed(2) + ' px per metre (free floor / ' + area + ' m²): the flat is ' + m(R.size[0] / S) + ' x ' + m(R.size[1] / S) + ' m');
  console.log('\nwalls (metres, x0 z0 x1 z1):');
  const size = (w) => (m(w[2] - w[0]) + ' x ' + m(w[3] - w[1])).padStart(14);
  walls.forEach((w, i) => console.log(String(i).padStart(3), JSON.stringify(w), size(w)));
  console.log('\nfree floor rectangles (numbered as in dist/shots/trace.png):');
  free.forEach((f, i) => console.log(String(i).padStart(3), JSON.stringify(f), ((f[2] - f[0]) * (f[3] - f[1])).toFixed(2).padStart(7) + ' m²'));
  console.log('\nwhite things left out as too wide for walls: ' + R.blobs.length);
  const skeleton = {
    name, file: name, title: { ka: 'ბინა', en: 'TODO', rooms: 'TODO' }, total: area,
    ref: { image: name + '.png', ppm: +S.toFixed(2), origin: [ox, oy], turn },
    start: [0, 0, 180],
    rooms: [], walls, shafts: [], openings: [], rails: [], switches: [], furniture: [],
    _free: free,
  };
  const out = join(root, 'flats', existsSync(join(root, 'flats', name + '.json')) ? name + '.trace.json' : name + '.json');
  writeFileSync(out, JSON.stringify(skeleton, null, 1).replace(/\n\s+(-?[\d.]+|"[^"]*")(,?)(?=\n)/g, ' $1$2').replace(/\[\s+/g, '[').replace(/\s+\]/g, ']') + '\n');
  console.log('wrote ' + out + ', ref/' + name + '.png, dist/shots/trace.png');
} finally {
  try { await Promise.race([send('Browser.close'), sleep(1500)]); } catch (e) { /* closed */ }
  await sleep(300); chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) { /* locked */ }
}
