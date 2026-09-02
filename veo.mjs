#!/usr/bin/env node
/**
 * Veo shot generator. Submits a prompt, polls the long-running operation,
 * downloads the mp4.
 *
 *   node veo.mjs --name=open1 --tier=lite --secs=8 --prompt="..."
 *   node veo.mjs --name=open1 --tier=fast --file=shots/open1.txt
 *
 * Tiers (720p): lite $0.05/s · fast $0.10/s · standard $0.40/s
 */
import fs from 'node:fs';
import path from 'node:path';

const KEY = fs.readFileSync(path.join(process.env.HOME, '.config/gemini/key'), 'utf8').trim();
const API = 'https://generativelanguage.googleapis.com/v1beta';
const MODELS = {
  lite: 'veo-3.1-lite-generate-preview',
  fast: 'veo-3.1-fast-generate-preview',
  standard: 'veo-3.1-generate-preview',
};
const RATE = { lite: 0.05, fast: 0.10, standard: 0.40 };

const arg = (k, d) => { const a = process.argv.find((s) => s.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const NAME = arg('name', 'shot');
const TIER = arg('tier', 'lite');
const SECS = Number(arg('secs', 8));
const ASPECT = arg('aspect', '16:9');
const RES = arg('res', '720p');
const OUT = arg('out', path.join(import.meta.dirname, 'shots'));
const file = arg('file', null);
const PROMPT = file ? fs.readFileSync(file, 'utf8').trim() : arg('prompt', null);

if (!PROMPT) { console.error('need --prompt= or --file='); process.exit(1); }
if (!MODELS[TIER]) { console.error('tier must be lite|fast|standard'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.error(new Date().toISOString().slice(11, 19), ...a);

// ---- submit ---------------------------------------------------------------
const body = {
  instances: [{ prompt: PROMPT }],
  parameters: { aspectRatio: ASPECT, resolution: RES, durationSeconds: SECS },
};
log(`submitting ${TIER} ${SECS}s "${PROMPT.slice(0, 60)}..."`);
const sub = await fetch(`${API}/models/${MODELS[TIER]}:predictLongRunning`, {
  method: 'POST',
  headers: { 'x-goog-api-key': KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
const subJson = await sub.json();
if (!sub.ok || !subJson.name) {
  console.error('submit failed:', JSON.stringify(subJson).slice(0, 600));
  process.exit(1);
}
log('operation ' + subJson.name);

// ---- poll -----------------------------------------------------------------
const started = Date.now();
let op = null;
for (let i = 0; i < 120; i++) {
  await sleep(10_000);
  const r = await fetch(`${API}/${subJson.name}`, { headers: { 'x-goog-api-key': KEY } });
  op = await r.json();
  if (op.done) break;
  if (i % 3 === 0) log(`waiting… ${((Date.now() - started) / 1000).toFixed(0)}s`);
}
if (!op?.done) { console.error('timed out waiting for the operation'); process.exit(2); }
if (op.error) { console.error('generation error:', JSON.stringify(op.error).slice(0, 600)); process.exit(1); }

// ---- locate the video -----------------------------------------------------
// Field names have moved between Veo revisions; search the response rather
// than assuming one shape.
function findUri(node) {
  if (!node || typeof node !== 'object') return null;
  if (typeof node.uri === 'string') return node.uri;
  if (typeof node.videoUri === 'string') return node.videoUri;
  for (const v of Object.values(node)) { const hit = findUri(v); if (hit) return hit; }
  return null;
}
function findBytes(node) {
  if (!node || typeof node !== 'object') return null;
  if (typeof node.bytesBase64Encoded === 'string') return node.bytesBase64Encoded;
  for (const v of Object.values(node)) { const hit = findBytes(v); if (hit) return hit; }
  return null;
}

const dst = path.join(OUT, `${NAME}.mp4`);
const uri = findUri(op.response);
const b64 = uri ? null : findBytes(op.response);

if (uri) {
  log('downloading ' + uri.slice(0, 80));
  const v = await fetch(uri.includes('key=') ? uri : uri, { headers: { 'x-goog-api-key': KEY } });
  if (!v.ok) {
    console.error('download failed', v.status, (await v.text()).slice(0, 300));
    fs.writeFileSync(path.join(OUT, `${NAME}.operation.json`), JSON.stringify(op, null, 1));
    process.exit(1);
  }
  fs.writeFileSync(dst, Buffer.from(await v.arrayBuffer()));
} else if (b64) {
  fs.writeFileSync(dst, Buffer.from(b64, 'base64'));
} else {
  console.error('no video in response; dumping operation for inspection');
  fs.writeFileSync(path.join(OUT, `${NAME}.operation.json`), JSON.stringify(op, null, 1));
  process.exit(1);
}

const bytes = fs.statSync(dst).size;
console.log(JSON.stringify({
  name: NAME, tier: TIER, seconds: SECS, file: dst, bytes,
  estCostUSD: Number((SECS * RATE[TIER]).toFixed(2)),
  waitSec: Number(((Date.now() - started) / 1000).toFixed(0)),
}));
