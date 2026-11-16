// ---------- 40-furn.js : the furniture registry ----------
// The pieces themselves live in the shared folder furniture/ at the top of the project, one file per piece, and every
// flat page loads them from there (furniture/_parts.js first, then the rest). A piece file calls
//   piece('name', { name: 'Panel label', add: position in the Add list, values: { its Add defaults } }, function (p) { ... });
// FLAT.furniture lists the pieces of a flat: { "t": piece name, "x", "z", "r": turn in degrees, ...its own values }.
const PIECES = {}, PIECE_INFO = {};
function piece(t, info, fn) { PIECES[t] = fn; PIECE_INFO[t] = info || {}; }

// Every piece of furniture gets batches of its own, so the Furniture panel can move, turn or take away one piece while
// the page runs, and the "Empty" button can hide them all. Built-in ceiling lights (FIXED) stay with the shell.
// A piece's lamps, looking glasses and colliders go into LAMPS, MIRRORS and COL as usual, marked furn and listed on its
// record; its light stand-ins are kept on the record only, so OCC holds the shell's.
const FIXED = { downlight: 1, ceilingLamp: 1 };
const PIECE_RECS = [];
// Builds piece p into rec (a new record if none): rec.map, rec.ceil, rec.caps hold its batches.
function buildPiece(p, rec) {
  const fn = PIECES[p.t];
  if (!fn) throw new Error('no piece called "' + p.t + '" (flats/FORMAT.md lists them)');
  rec = Object.assign(rec || {}, { p, map: new Map(), ceil: new Map(), caps: new Map() });
  const l0 = LAMPS.length, m0 = MIRRORS.length, c0 = COL.length, o0 = OCC.box.length, a0 = OCC.alb.length, save = TARGET, saveM = CUR;
  OCC_SETS.add(rec.map);
  REMAP.set(CEIL, rec.ceil); REMAP.set(CAPS, rec.caps); TARGET = rec.map; CUR = new T.Matrix4();
  try { fn(p); } finally { TARGET = save; CUR = saveM; REMAP.clear(); OCC_SETS.delete(rec.map); }
  rec.lamps = LAMPS.slice(l0); rec.mirrors = MIRRORS.slice(m0); rec.cols = COL.slice(c0);
  rec.occBox = OCC.box.splice(o0); rec.occAlb = OCC.alb.splice(a0);
  for (const a of [rec.lamps, rec.mirrors, rec.cols]) for (const q of a) q.furn = true;
  return rec;
}
function buildFurniture() {
  (FLAT.furniture || []).forEach((p, i) => {
    if (!PIECES[p.t]) throw new Error('furniture[' + i + ']: no piece called "' + p.t + '" (flats/FORMAT.md lists them)');
    if (FIXED[p.t] || p.fixed) PIECES[p.t](p);
    else PIECE_RECS.push(buildPiece(p));
  });
}
