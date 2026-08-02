// Stage chiuinan screenshots into raw/media/_inbox for published entries that
// still have no `title` image (see docs/media-triage.md).
//
//   node scripts/stage_chiuinan_shots.mjs           # PLAN  — list what would be fetched
//   node scripts/stage_chiuinan_shots.mjs --write   # APPLY — download into _inbox
//   …  --limit 50                                   # cap the number of entries
//
// Per entry: the first screenshot (natural sort) becomes `title`, the next three
// become `screenshot-01…03`. Filenames carry the entry title as a `__~` annotation
// so a mis-assigned image is obvious by eye; process_media drops that field.
//
// Images are cached in raw/chiuinan/img/ (gitignored provenance dir) before being
// copied into the inbox, because the intro folders also hold page decorations —
// anything under MIN_W×MIN_H is dropped and the next candidate takes its slot.
// Idempotent: cached downloads and existing inbox files are left alone.
import { readFileSync, readdirSync, existsSync, mkdirSync, statSync, unlinkSync, copyFileSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import yaml from "js-yaml";

const FM = /^---\n([\s\S]*?)\n---/;
const GAMES = "content/games";
const INBOX = "raw/media/_inbox";
// Screenshots are staged one step earlier than titles: the title wave goes in first
// (it is what most entries lack), screenshots wait here until that wave is reviewed.
const HOLD = "raw/media/_hold/chiuinan-screenshots";
const SHOTS = "derived/chiuinan-screenshots.json";
const CACHE = "raw/chiuinan/img";
const RAW_PREFIX = "https://raw.githubusercontent.com/chiuinan/chiuinan.github.io/master/game/game/";
const MAX_SCREENSHOTS = 3;
const CANDIDATES = 8;          // pool per entry, before the size filter
const MIN_W = 200, MIN_H = 140;  // below this it's a page decoration, not a screenshot

const WRITE = process.argv.includes("--write");
const limitAt = process.argv.indexOf("--limit");
const LIMIT = limitAt >= 0 ? Number(process.argv[limitAt + 1]) : Infinity;

const natkey = (s) => s.split(/(\d+)/).map((t) => (/^\d+$/.test(t) ? t.padStart(8, "0") : t)).join("");
// https://chiuinan.github.io/game/game/intro/ch/c41/discch2.htm → intro/ch/c41/discch2
const introPath = (url) => (url.match(/(intro\/[a-z]+\/[a-z]?\d+\/[^/]+)\.htm/) || [])[1] || null;
// filename fields are `__`-separated; keep the annotation on one field and path-safe
const safe = (s) => s.replace(/[/\\]/g, "／").replace(/_{2,}/g, "_").trim();

const byIntro = new Map();
for (const g of JSON.parse(readFileSync(SHOTS, "utf8"))) byIntro.set(g.intro_path, g.screenshots);

const jobs = [];
const stats = { published: 0, needTitle: 0, noRef: 0, noShots: 0, staged: 0 };

for (const f of readdirSync(GAMES).sort()) {
  if (!f.endsWith(".md")) continue;
  const m = FM.exec(readFileSync(join(GAMES, f), "utf8"));
  if (!m) continue;
  const fm = yaml.load(m[1]);
  if (!fm?.published) continue;
  stats.published++;
  if ((fm.media || []).some((x) => x.kind === "title")) continue;
  stats.needTitle++;

  const ip = introPath(fm.references?.chiuinan || "");
  if (!ip) { stats.noRef++; continue; }
  const shots = (byIntro.get(ip) || []).slice().sort((a, b) => natkey(a).localeCompare(natkey(b)));
  if (!shots.length) { stats.noShots++; continue; }
  if (stats.staged >= LIMIT) continue;
  stats.staged++;

  jobs.push({ id: fm.id, title: safe(fm.title_zh), urls: shots.slice(0, CANDIDATES) });
}

console.log(`published: ${stats.published}  無 title: ${stats.needTitle}  ` +
  `(無 chiuinan ref: ${stats.noRef}, ref 但無圖: ${stats.noShots})`);
console.log(`可補 ${stats.staged} 款（每款候選 ≤${CANDIDATES} 張，篩尺寸後取 ≤${1 + MAX_SCREENSHOTS} 張）`);

if (!WRITE) {
  for (const j of jobs.slice(0, 10)) console.log(`  ${j.id} ${j.title} — 候選 ${j.urls.length}`);
  if (jobs.length > 10) console.log(`  … 其餘 ${jobs.length - 10} 款`);
  console.log("\n(PLAN 模式；加 --write 實際下載)");
  process.exit(0);
}

// Fetch into the provenance cache; returns the local path, or null if unusable.
function fetchCached(url) {
  const dest = join(CACHE, url.startsWith(RAW_PREFIX) ? url.slice(RAW_PREFIX.length) : encodeURIComponent(url));
  if (!existsSync(dest) || statSync(dest).size === 0) {
    mkdirSync(dirname(dest), { recursive: true });
    const code = execFileSync("curl", ["-sL", "--max-time", "30", "-o", dest, "-w", "%{http_code}", url], { encoding: "utf8" }).trim();
    if (code !== "200" || !existsSync(dest) || statSync(dest).size === 0) {
      if (existsSync(dest)) unlinkSync(dest);
      return null;
    }
  }
  try {
    const [w, h] = execFileSync("magick", ["identify", "-format", "%w %h", dest], { encoding: "utf8" }).trim().split(/\s+/).map(Number);
    return w >= MIN_W && h >= MIN_H ? dest : null;
  } catch {
    return null;
  }
}

mkdirSync(INBOX, { recursive: true });
mkdirSync(HOLD, { recursive: true });
let entries = 0, files = 0, skippedSmall = 0, empty = 0;
for (const j of jobs) {
  const picked = [];
  for (const url of j.urls) {
    if (picked.length >= 1 + MAX_SCREENSHOTS) break;
    const p = fetchCached(url);
    if (p) picked.push(p); else skippedSmall++;
  }
  if (!picked.length) { empty++; console.log(`  ✗ ${j.id} ${j.title}：候選全部不合用`); continue; }
  entries++;
  picked.forEach((src, i) => {
    const kind = i === 0 ? "title" : `screenshot-0${i}`;
    const dest = join(i === 0 ? INBOX : HOLD, `${j.id}__${kind}__chiuinan__~${j.title}${extname(src)}`);
    if (!existsSync(dest)) { copyFileSync(src, dest); files++; }
  });
}
console.log(`落地：${entries} 款 / ${files} 張（濾掉小圖或抓不到 ${skippedSmall} 張、${empty} 款無可用圖）`);
console.log(`  title → ${INBOX}\n  screenshot → ${HOLD}`);
