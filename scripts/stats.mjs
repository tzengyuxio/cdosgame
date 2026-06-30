// Repository statistics — content pages, media images, completeness gaps.
//
// Usage:
//   npm run stats                 # all sections
//   npm run stats -- --content    # content-page overview only
//   npm run stats -- --images     # media image stats only
//   npm run stats -- --completeness   # missing-field gaps only
//   npm run stats -- --include-raw    # (with --images) also tally raw/ images: block
//
// Media files for games live under public/media/games/<id>/ ; other collections
// use public/media/<coll>/<filename-without-md>/ (mirrors scripts/validate_content.mjs).
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import yaml from "js-yaml";

const FM = /^---\n([\s\S]*?)\n---/;

const COLLECTIONS = [
  { dir: "content/games", coll: "games", idIsSlug: true },
  { dir: "content/companies", coll: "companies", idIsSlug: false },
  { dir: "content/series", coll: "series", idIsSlug: false },
  { dir: "content/teams", coll: "teams", idIsSlug: false },
  { dir: "content/people", coll: "people", idIsSlug: false },
  { dir: "content/topics", coll: "topics", idIsSlug: false },
];

// Sub-keys under the legacy `images:` block; values are raw/ paths (str or str[]).
const RAW_IMAGE_KEYS = ["chiuinan", "fandom", "rwv_cover", "offlinelist"];

const MB = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
const pct = (n, d) => (d ? ((n / d) * 100).toFixed(1) : "0.0") + "%";
const sizeOf = (p) => {
  try {
    return statSync(p).size;
  } catch {
    return null;
  }
};

// Read every .md in a collection dir, return [{ file, slug, fm, body }].
function loadCollection({ dir, idIsSlug }) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const text = readFileSync(join(dir, f), "utf8");
      const m = text.match(FM);
      const fm = m ? yaml.load(m[1]) ?? {} : {};
      const body = m ? text.slice(m[0].length).trim() : text.trim();
      const slug = idIsSlug ? fm.id ?? basename(f, ".md") : basename(f, ".md");
      return { file: f, slug, fm, body };
    });
}

function sectionContent() {
  console.log("=== 內容頁總覽 ===");
  const rows = [];
  let totalFiles = 0;
  for (const c of COLLECTIONS) {
    const items = loadCollection(c);
    if (!items.length) continue;
    totalFiles += items.length;
    const hasPub = items.some((i) => typeof i.fm.published === "boolean");
    const pub = items.filter((i) => i.fm.published === true).length;
    rows.push({
      coll: c.coll,
      files: items.length,
      published: hasPub ? pub : "—",
      draft: hasPub ? items.length - pub : "—",
    });
  }
  const w = (s, n) => String(s).padEnd(n);
  console.log(`  ${w("collection", 12)}${w("檔案", 8)}${w("已發佈", 8)}草稿`);
  for (const r of rows) console.log(`  ${w(r.coll, 12)}${w(r.files, 8)}${w(r.published, 8)}${r.draft}`);
  console.log(`  ${w("合計", 12)}${totalFiles}`);
  console.log("");
}

// Tally media[] images for published games. Returns the report object.
function tallyMedia() {
  const games = loadCollection(COLLECTIONS[0]).filter((g) => g.fm.published === true);
  let withImg = 0,
    total = 0,
    bytes = 0,
    missing = 0;
  const counts = [];
  const byKind = {};
  for (const g of games) {
    const media = Array.isArray(g.fm.media) ? g.fm.media : [];
    let n = 0;
    for (const it of media) {
      if (!it || !it.src) continue;
      n++;
      total++;
      const kind = it.kind || "(未標)";
      byKind[kind] = (byKind[kind] || 0) + 1;
      const sz = sizeOf(join("public/media/games", g.slug, it.src));
      if (sz === null) missing++;
      else bytes += sz;
    }
    if (n > 0) {
      withImg++;
      counts.push(n);
    }
  }
  return { pub: games.length, withImg, total, bytes, missing, counts, byKind };
}

// Tally legacy images: block (raw/ paths) for published games.
function tallyRaw() {
  const games = loadCollection(COLLECTIONS[0]).filter((g) => g.fm.published === true);
  let withImg = 0,
    total = 0,
    bytes = 0,
    missing = 0;
  const bySrc = {};
  for (const g of games) {
    const images = g.fm.images;
    if (!images || typeof images !== "object") continue;
    let n = 0;
    for (const key of RAW_IMAGE_KEYS) {
      const v = images[key];
      if (v == null) continue;
      for (const rel of Array.isArray(v) ? v : [v]) {
        if (typeof rel !== "string" || !rel) continue;
        n++;
        total++;
        bySrc[key] = bySrc[key] || { count: 0, bytes: 0, missing: 0 };
        bySrc[key].count++;
        const sz = sizeOf(rel);
        if (sz === null) {
          missing++;
          bySrc[key].missing++;
        } else {
          bytes += sz;
          bySrc[key].bytes += sz;
        }
      }
    }
    if (n > 0) withImg++;
  }
  return { withImg, total, bytes, missing, bySrc };
}

function sectionImages(includeRaw) {
  const r = tallyMedia();
  console.log("=== 圖片統計（media，已版控）===");
  console.log(`  已發佈遊戲:        ${r.pub}`);
  console.log(`  有圖片的遊戲:      ${r.withImg} (${pct(r.withImg, r.pub)})`);
  console.log(`  圖片總張數:        ${r.total}${r.missing ? `（缺檔 ${r.missing}）` : ""}`);
  console.log(`  有圖遊戲平均張數:  ${r.withImg ? (r.total / r.withImg).toFixed(2) : "0"}`);
  console.log(`  圖片總容量:        ${MB(r.bytes)}`);
  const dist = {};
  r.counts.forEach((c) => (dist[c] = (dist[c] || 0) + 1));
  console.log(`  張數分布(張:款):   ${Object.entries(dist).map(([k, v]) => `${k}:${v}`).join("  ")}`);
  console.log(`  分類(kind):        ${Object.entries(r.byKind).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join("  ")}`);
  if (includeRaw) {
    const rr = tallyRaw();
    console.log("");
    console.log("  --- 含 raw/（gitignored，未版控）---");
    console.log(`  raw 圖片張數:      ${rr.total}${rr.missing ? `（缺檔 ${rr.missing}）` : ""}`);
    console.log(`  raw 圖片容量:      ${MB(rr.bytes)}`);
    for (const [k, v] of Object.entries(rr.bySrc).sort((a, b) => b[1].count - a[1].count))
      console.log(`    ${k.padEnd(12)} ${String(v.count).padStart(5)} 張  ${MB(v.bytes).padStart(10)}${v.missing ? `  缺 ${v.missing}` : ""}`);
    console.log(`  合計(media+raw):   ${r.total + rr.total} 張  ${MB(r.bytes + rr.bytes)}`);
  }
  console.log("");
}

function sectionCompleteness() {
  const games = loadCollection(COLLECTIONS[0]).filter((g) => g.fm.published === true);
  const n = games.length;
  const isEmptyArr = (v) => !Array.isArray(v) || v.length === 0;
  const gaps = {
    "無 year": games.filter((g) => g.fm.year == null).length,
    "無 developer": games.filter((g) => g.fm.developer == null).length,
    "無 publisher_tw": games.filter((g) => isEmptyArr(g.fm.publisher_tw)).length,
    "無 genre": games.filter((g) => g.fm.genre == null).length,
    "無正文": games.filter((g) => g.body.length === 0).length,
  };
  console.log("=== 完整度／缺料（已發佈遊戲）===");
  console.log(`  基數: ${n} 款`);
  for (const [k, v] of Object.entries(gaps)) console.log(`  ${k.padEnd(16)} ${String(v).padStart(5)} (${pct(v, n)})`);
  console.log("");
}

const args = new Set(process.argv.slice(2));
const includeRaw = args.has("--include-raw");
const wantAll = !["--content", "--images", "--completeness"].some((f) => args.has(f));

if (wantAll || args.has("--content")) sectionContent();
if (wantAll || args.has("--images")) sectionImages(includeRaw);
if (wantAll || args.has("--completeness")) sectionCompleteness();
