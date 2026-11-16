// Builds one flat from src/ and flats/<name>.json into:
//   dist/<name>/<file>.html   page body for web publishing (three.js from the CDN)
//   dist/<name>/preview.html  the same page inside a plain document, for local checks (walktest, shot)
//   dist/<name>/flat.js       the flat's data with the worked-out values, for tools/compare.html
//   ../<file>.html            offline file with three.js inlined (or the path given as a second argument)
// The furniture is NOT copied into the pages: every page loads the pieces from the shared folder ../furniture
// through furniture/index.js (which lists _parts.js and one file per piece), by a path relative to where the page is
// written. So a page needs that folder in place, and a changed or NEW piece shows in every flat without a rebuild (a new
// file needs tools/furniture-index.mjs, which this build also runs). The publish page (dist/<name>/<file>.html) refers to
// furniture/index.js: publish it with the whole folder in the artifact's files.
// <file> is the data file's "file", else the name. The data is checked first; problems are reported by field.
// Usage: node tools/build.mjs <name> [offline-output.html]        (no name: lists the flats)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { furnitureIndex, FURN_DIR } from './furniture-index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => readFileSync(join(root, 'src', f), 'utf8');
const name = process.argv[2];
if (!name) {
  console.log('usage: node tools/build.mjs <name> [offline.html]\nflats:', readdirSync(join(root, 'flats')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).join(', '));
  process.exit(1);
}
const dataPath = join(root, 'flats', name + '.json');
if (!existsSync(dataPath)) { console.error('no such flat: ' + dataPath); process.exit(1); }
let flat;
try { flat = JSON.parse(readFileSync(dataPath, 'utf8')); } catch (e) { console.error('flats/' + name + '.json is not valid JSON: ' + e.message); process.exit(1); }

// ---- checks ----
const errors = [], warn = [];
const err = (path, msg) => errors.push(path + ': ' + msg);
const num = (v) => typeof v === 'number' && Number.isFinite(v);
const rect = (path, r) => { if (!Array.isArray(r) || r.length !== 4 || !r.every(num) || !(r[0] < r[2]) || !(r[1] < r[3])) err(path, 'needs [x0, z0, x1, z1] with x0 < x1 and z0 < z1, got ' + JSON.stringify(r)); };
const MATS = new Set([...src('20-mats.js').matchAll(/\bmk(?:Raw)?\('(\w+)'/g)].map((m) => m[1]));
// the shared furniture folder: _parts.js first, then the pieces by file name; each piece file calls piece('name', ...)
// (checked and listed in furniture/index.js by tools/furniture-index.mjs; the pages load only that index)
const furn = furnitureIndex(FURN_DIR);
if (furn.errors.length) { console.error('furniture:\n  ' + furn.errors.join('\n  ')); process.exit(1); }
const FURN = furn.files, PIECES = new Set(furn.pieces.keys());
const mat = (path, m) => { if (typeof m !== 'string' || !MATS.has(m)) err(path, 'unknown material ' + JSON.stringify(m)); };
if (!flat.title || typeof flat.title.ka !== 'string' || typeof flat.title.en !== 'string') err('title', 'needs { "ka", "en", "rooms" }');
if (!Array.isArray(flat.start) || flat.start.length !== 3 || !flat.start.every(num)) err('start', 'needs [x, z, yaw in degrees]');
if (!Array.isArray(flat.rooms) || !flat.rooms.length) err('rooms', 'needs at least one room');
if (!Array.isArray(flat.walls) || !flat.walls.length) err('walls', 'needs the wall runs');
const ids = new Set();
(flat.rooms || []).forEach((r, i) => {
  const p = 'rooms[' + i + ']' + (r.id ? ' (' + r.id + ')' : '');
  if (typeof r.id !== 'string' || ids.has(r.id)) err(p + '.id', 'needs a unique id'); ids.add(r.id);
  for (const k of ['ka', 'en']) if (typeof r[k] !== 'string') err(p + '.' + k, 'needs a name');
  if (!num(r.area) || r.area <= 0) err(p + '.area', 'needs the area in m²');
  if (r.poly !== undefined && (!Array.isArray(r.poly) || r.poly.length < 3 || !r.poly.every((v) => Array.isArray(v) && v.length === 2 && v.every(num)))) err(p + '.poly', 'needs at least three [x, z] points');
  if (r.poly && r.rects === undefined) r.rects = [];
  if (!Array.isArray(r.rects) || (!r.rects.length && !r.poly)) err(p + '.rects', 'needs rectangles'); else r.rects.forEach((q, k) => rect(p + '.rects[' + k + ']', q));
  if (!Array.isArray(r.label) || r.label.length !== 2 || !r.label.every(num)) err(p + '.label', 'needs [x, z]');
  if (r.floor) { mat(p + '.floor.mat', r.floor.mat); if (r.floor.uv && !['plank', 'plankX', 'tile', 'slab'].includes(r.floor.uv)) err(p + '.floor.uv', 'plank, plankX, tile or slab'); }
  if (r.walls) mat(p + '.walls', r.walls);
});
(flat.walls || []).forEach((w, i) => rect('walls[' + i + ']', w));
(flat.slants || []).forEach((w, i) => { if (!Array.isArray(w.a) || !Array.isArray(w.b) || ![...w.a, ...w.b, w.t].every(num) || w.a.length !== 2 || w.b.length !== 2 || !(w.t > 0)) err('slants[' + i + ']', 'needs { a: [x, z], b: [x, z], t }'); if (w.mat) mat('slants[' + i + '].mat', w.mat); if (w.in) mat('slants[' + i + '].in', w.in);
  const L = Math.hypot(w.b[0] - w.a[0], w.b[1] - w.a[1]);
  (w.ops || []).forEach((o, k) => { const at = 'slants[' + i + '].ops[' + k + ']';
    if (!['door', 'fixed'].includes(o.kind)) err(at + '.kind', 'is "door" or "fixed"');
    if (!(num(o.from) && num(o.to) && o.from >= 0 && o.to > o.from && o.to <= L + 1e-6)) err(at, 'needs 0 <= from < to <= ' + L.toFixed(2) + ' (metres along a -> b)');
    if (o.kind === 'door' && !o.id) err(at + '.id', 'a door needs an id'); }); });
(flat.shafts || []).forEach((s, i) => { rect('shafts[' + i + '].rect', s.rect); if (s.dark) rect('shafts[' + i + '].dark', s.dark); });
const oids = new Set();
(flat.openings || []).forEach((o, i) => {
  const p = 'openings[' + i + ']' + (o.id ? ' (' + o.id + ')' : '');
  if (typeof o.id !== 'string' || oids.has(o.id)) err(p + '.id', 'needs a unique id'); oids.add(o.id);
  if (!['x', 'z'].includes(o.axis)) err(p + '.axis', '"x" (opening runs along X) or "z"');
  if (!Array.isArray(o.at) || o.at.length !== 2 || !o.at.every(num) || !(o.at[0] < o.at[1])) err(p + '.at', 'needs the two faces of its wall [t0, t1], t0 < t1');
  if (!num(o.a) || !num(o.b) || !(o.a < o.b)) err(p + '.a/b', 'needs a < b along the wall');
  if (!['entry', 'door', 'window', 'slide', 'fixed', 'gap'].includes(o.kind)) err(p + '.kind', 'entry, door, window, slide, fixed or gap');
  if (o.kind === 'door') {
    if (!['plain', 'glazed'].includes(o.leaf)) err(p + '.leaf', 'plain or glazed');
    if (!['a', 'b'].includes(o.hinge)) err(p + '.hinge', '"a" or "b": the end the leaf hangs on');
    if (o.into !== 1 && o.into !== -1) err(p + '.into', '1 or -1: the side of the wall the leaf opens to (+X/+Z or -X/-Z)');
  }
});
(flat.furniture || []).forEach((f, i) => {
  const p = 'furniture[' + i + '] (' + f.t + ')';
  if (!PIECES.has(f.t)) err(p + '.t', 'no such piece; there are: ' + [...PIECES].join(', '));
  for (const k of ['mat', 'pot']) if (f[k] !== undefined) mat(p + '.' + k, f[k]);
  if (f.mats) f.mats.forEach((m, k) => mat(p + '.mats[' + k + ']', m));
  if (f.rect) rect(p + '.rect', f.rect);
  else if (!['curtain', 'curtainTrack', 'box'].includes(f.t) && (!num(f.x) || !num(f.z))) err(p, 'needs x and z');
});
(flat.switches || []).forEach((s, i) => { if (!Array.isArray(s) || s.length !== 3 || !s.every(num)) err('switches[' + i + ']', 'needs [x, z, turn in degrees]'); });
(flat.rails || []).forEach((r, i) => { if (!Array.isArray(r.pts) || r.pts.length < 2) err('rails[' + i + '].pts', 'needs at least two [x, z] points'); });
if (!flat.ref) warn.push('ref: missing, so tools/compare.html cannot lay the render under the model');
if (errors.length) { console.error('flats/' + name + '.json:\n  ' + errors.join('\n  ')); process.exit(1); }

// ---- worked-out values ----
const all = flat.walls.concat((flat.shafts || []).map((s) => s.rect), flat.rooms.flatMap((r) => r.rects),
  flat.rooms.flatMap((r) => (r.poly || []).map(([x, z]) => [x, z, x, z])),
  (flat.slants || []).flatMap((w) => [w.a, w.b].map(([x, z]) => [x - w.t / 2, z - w.t / 2, x + w.t / 2, z + w.t / 2])));
const r3 = (v) => Math.round(v * 1000) / 1000;
flat.bounds = [Math.min(...all.map((r) => r[0])), Math.min(...all.map((r) => r[1])), Math.max(...all.map((r) => r[2])), Math.max(...all.map((r) => r[3]))].map(r3);
const [bx0, bz0, bx1, bz1] = flat.bounds;
flat.map = flat.map || { x0: r3(bx0 - 0.2), z0: r3(bz0 - 0.2), w: r3(bx1 - bx0 + 0.4), d: r3(bz1 - bz0 + 0.4) };
const decimals = (v) => { const s = String(v); return s.includes('.') ? s.length - s.indexOf('.') - 1 : 0; };
flat.digits = Math.max(1, ...flat.rooms.map((r) => decimals(r.area)));
flat.total = flat.total || +flat.rooms.reduce((s, r) => s + r.area, 0).toFixed(flat.digits);
const long = 354, landscape = flat.map.w > flat.map.d, short = Math.round(long * Math.min(flat.map.w, flat.map.d) / Math.max(flat.map.w, flat.map.d));
const [mw, mh] = landscape ? [long, short] : [short, long];
const fill = {
  TITLE: 'Flat ' + flat.total.toFixed(flat.digits) + ' m² Walkthrough', KA: flat.title.ka, EN: flat.title.en, AREA: flat.total.toFixed(flat.digits),
  ROOMS_TEXT: flat.title.rooms || flat.rooms.length + ' rooms', MAP_W: mw, MAP_H: mh, MAP_CSS_W: Math.round(mw / 2), MAP_CSS_H: Math.round(mh / 2),
  MAP_PHONE_W: Math.round(mw * 131 / 354), MAP_PHONE_H: Math.round(mh * 131 / 354),
};

function polyArea(P) { let a = 0; for (let i = 0; P && i < P.length; i++) { const [x0, z0] = P[i], [x1, z1] = P[(i + 1) % P.length]; a += x0 * z1 - x1 * z0; } return Math.abs(a) / 2; }
// room areas from the rectangles against the given figures (a text check; rectangles that run over piers count them too)
console.log('room          given   rects   diff');
for (const r of flat.rooms) {
  const a = r.rects.reduce((s, q) => s + (q[2] - q[0]) * (q[3] - q[1]), 0) + polyArea(r.poly);
  console.log(r.id.padEnd(12), String(r.area).padStart(6), a.toFixed(2).padStart(7), ((a / r.area - 1) * 100).toFixed(2).padStart(6) + ' %');
}
for (const w of warn) console.log('note: ' + w);

// ---- pages ----
const file = flat.file || name, out = join(root, 'dist', name);
const standalonePath = process.argv[3] || join(root, '..', file + '.html');
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js';
const END = '<' + '/script>';
// The engine and the furniture files are classic scripts that share the page's global scope, in this order:
// the flat's data and the engine's first half, the furniture folder, the engine's second half.
const CORE = ['10-util.js', '20-mats.js', '30-plan.js', '40-furn.js'], REST = ['50-bake.js', '55-town.js', '60-app.js'];
let head = src('00-head.html');
const esc = (v) => String(v).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]);
for (const [k, v] of Object.entries(fill)) head = head.split('{{' + k + '}}').join(esc(v));
if (/\{\{\w+\}\}/.test(head)) throw new Error('00-head.html has a placeholder build.mjs does not fill: ' + head.match(/\{\{\w+\}\}/)[0]);
const js1 = "'use strict';\nconst FLAT = " + JSON.stringify(flat) + ';\n' + CORE.map(src).join('\n') + '\n';
const js2 = "'use strict';\n" + REST.map(src).join('\n') + '\n';
const check = (code, file) => {
  try { new vm.Script(code, { filename: file }); } catch (e) { console.error(file + ': ' + e.message); process.exit(1); }
  if (code.toLowerCase().includes('<' + '/script')) throw new Error('script terminator inside ' + file);
};
check(js1, 'engine part 1'); check(js2, 'engine part 2');
mkdirSync(out, { recursive: true });
// app.js: the whole program in one file (data, engine, furniture), for reading and syntax checks only; no page uses it
writeFileSync(join(out, 'app.js'), js1 + FURN.map((f) => readFileSync(join(FURN_DIR, f), 'utf8').replace(/^'use strict';\n/, '')).join('\n') + js2.replace(/^'use strict';\n/, ''));
writeFileSync(join(out, 'flat.js'), 'window.FLATDATA = ' + JSON.stringify(flat) + ';\n');
// script tags: the engine inline, the furniture by path from the page's folder
const slash = (p) => p.split('\\').join('/');
const scripts = (furnRel) => '<script>\n' + js1 + END + '\n'
  + '<script src="' + slash(join(furnRel, 'index.js')) + '">' + END + '\n'
  + '<script>\n' + js2 + END + '\n';

const reset = ':root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}';
const open = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>' + reset + '</style>\n';
const split = head.indexOf('<div class="app"');
if (split < 0) throw new Error('00-head.html must contain <div class="app"');
const shell = (scripts) => open + head.slice(0, split) + '</head>\n<body>\n' + head.slice(split) + scripts + '</body>\n</html>\n';

const page = head + '<script src="' + CDN + '">' + END + '\n' + scripts('furniture');
writeFileSync(join(out, file + '.html'), page);
writeFileSync(join(out, 'preview.html'), shell('<script src="../../vendor/three.min.js">' + END + '\n' + scripts(relative(out, FURN_DIR))));

// Offline file: three.js inlined, the furniture from the shared folder.
const three = readFileSync(join(root, 'vendor', 'three.min.js'), 'utf8').split(END).join('<\\/script>');
const standalone = shell('<script>\n/* three.js r159, MIT License, https://threejs.org */\n' + three + '\n' + END + '\n' + scripts(relative(dirname(standalonePath), FURN_DIR)));
writeFileSync(standalonePath, standalone);
console.log('built ' + name + ': dist/' + name + '/' + file + '.html (' + page.length + ' bytes), offline ' + standalonePath
  + '\nfurniture: ' + slash(relative(dirname(standalonePath), FURN_DIR)) + '/index.js from the offline page (' + FURN.length + ' files in ' + FURN_DIR + ')');
