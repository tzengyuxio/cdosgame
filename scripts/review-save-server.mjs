// Tiny dev helper for the /review dashboard: persists the reviewer's
// publish/feedback marks to data/review-state.json. Run alongside `npm run dev`:
//   node scripts/review-save-server.mjs
// The /review page POSTs marks here (Astro's own dev middleware can't read POST
// bodies reliably, so this standalone Node server handles it). Read-only tooling
// then reads data/review-state.json to know what to publish / fix.
import { createServer } from 'node:http';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE = fileURLToPath(new URL('../data/review-state.json', import.meta.url));
const PORT = 4399;
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
};

createServer((req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      writeFileSync(FILE, body);
      res.writeHead(200, CORS); res.end('ok');
      console.log(new Date().toLocaleTimeString(), '→ saved', body.length, 'bytes');
    });
    return;
  }
  if (req.method === 'GET' && req.url === '/load') {
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    return res.end(existsSync(FILE) ? readFileSync(FILE) : '{}');
  }
  res.writeHead(404, CORS); res.end();
}).listen(PORT, () => console.log(`review save-server → http://localhost:${PORT}  (writes ${FILE})`));
