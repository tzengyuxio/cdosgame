// Emit dist/sitemap.xml — a single <urlset> holding every URL.
//
// @astrojs/sitemap always writes an index (sitemap-index.xml) plus numbered
// children, even for one child. Google Search Console reports 0 "discovered
// pages" for an index file (it holds no page URLs), and repeated attempts to
// submit sitemap-0.xml directly kept failing to fetch. A plain top-level
// sitemap.xml sidesteps both, and is what robots.txt now points at. The
// generated index/children are left in place so the URL already submitted to
// GSC keeps working.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('../dist/', import.meta.url);
const parts = readdirSync(dir)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

if (!parts.length) throw new Error('flatten_sitemap: no dist/sitemap-N.xml found');

const urls = parts.flatMap((f) =>
  readFileSync(new URL(f, dir), 'utf8').match(/<url>[\s\S]*?<\/url>/g) || []);

if (!urls.length) throw new Error('flatten_sitemap: no <url> entries found');

const head = readFileSync(new URL(parts[0], dir), 'utf8')
  .match(/^<\?xml[\s\S]*?<urlset[^>]*>/)[0];
writeFileSync(new URL('sitemap.xml', dir), `${head}${urls.join('')}</urlset>`);
console.log(`flatten_sitemap: ${urls.length} urls from ${parts.join(', ')} → dist/sitemap.xml`);
