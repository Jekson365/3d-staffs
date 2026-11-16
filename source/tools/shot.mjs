// Headless-Chrome screenshots of a page after it signals readiness.
//   node shot.mjs <page.html> <outPrefix> <width> <height> [js ...]
// Waits for window.__ready (up to 90 s), then for each js expression: evaluate it (awaited), wait two frames,
// save <outPrefix>-<n>.png. Console messages and exceptions are echoed.
// SCHEME=light|dark in the environment emulates the colour scheme (headless Chrome reports dark by default).
// MOBILE=1 emulates a phone: touch input, device pixel ratio 2. STRICT=1 opens the file the way a double-click does (no file-access flag).
import { spawn } from 'node:child_process';
import { writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const [page, outPrefix, w = '1400', h = '900', ...scripts] = process.argv.slice(2);
const port = 9300 + Math.floor(Math.random() * 600);
const profile = resolve(tmpdir(), 'shot-profile-' + port);
const chrome = spawn(process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
  ...(process.env.STRICT ? [] : ['--allow-file-access-from-files']), '--hide-scrollbars', '--enable-webgl', '--ignore-gpu-blocklist', '--window-size=' + w + ',' + h, 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 80 && !target; i++) {
  await sleep(150);
  try { target = (await (await fetch('http://127.0.0.1:' + port + '/json/list')).json()).find((t) => t.type === 'page'); } catch (e) { /* starting */ }
}
if (!target) { chrome.kill(); throw new Error('chrome did not start'); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let seq = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); if (m.error) p.reject(new Error(m.error.message)); else p.resolve(m.result); return; }
  if (m.method === 'Runtime.consoleAPICalled') console.log('[console.' + m.params.type + ']', m.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 3000));
  if (m.method === 'Runtime.exceptionThrown') console.log('[exception]', (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text || '').slice(0, 3000));
};
const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error('eval failed: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
  return r.result.value;
};
try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: process.env.MOBILE ? 2 : 1, mobile: !!process.env.MOBILE });
  if (process.env.MOBILE) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  if (process.env.SCHEME) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: process.env.SCHEME }] });
  const t0 = Date.now();
  const [pagePath, pageHash] = page.split('#');
  await send('Page.navigate', { url: pathToFileURL(resolve(pagePath)).href + (pageHash ? '#' + pageHash : '') });
  let ready = false;
  while (!ready && Date.now() - t0 < 90000) { await sleep(250); ready = await evaluate('!!window.__ready').catch(() => false); }
  console.log('ready:', ready, 'after', Date.now() - t0, 'ms');
  mkdirSync(dirname(resolve(outPrefix)), { recursive: true });
  const list = scripts.length ? scripts : ['0'];
  for (let i = 0; i < list.length; i++) {
    const v = await evaluate('(async () => { const r = await (' + list[i] + '); await new Promise((q) => requestAnimationFrame(() => requestAnimationFrame(q))); return r; })()').catch((e) => 'ERR ' + e.message);
    if (v !== undefined && v !== null && v !== 0) console.log('js', i, '->', typeof v === 'string' ? v.slice(0, 3000) : JSON.stringify(v).slice(0, 3000));
    const png = await send('Page.captureScreenshot', { format: 'png' });
    const out = outPrefix + '-' + i + '.png';
    writeFileSync(out, Buffer.from(png.data, 'base64'));
    console.log('saved', out);
  }
} finally {
  try { await send('Browser.close'); } catch (e) { /* closed */ }
  await sleep(400);
  chrome.kill();
  try { rmSync(profile, { recursive: true, force: true }); } catch (e) { /* locked */ }
}
