// Intake for the curated media library (see docs/media.md §5). Agent-oriented:
// one self-sufficient command, fail-fast, idempotent.
//
//   node scripts/process_media.mjs            # PLAN  — parse+validate inbox, print
//                                             #         planned media[]; zero side effects
//   node scripts/process_media.mjs --write    # APPLY — validate ALL first (abort on any
//                                             #         error, no side effects), then convert
//                                             #         WebP+thumb → public/, merge media[] into
//                                             #         each .md (dedupe by src), archive
//                                             #         originals → raw/ (+manifest), clear inbox
//
// Inbox filename convention (raw/media/_inbox/):
//   games   — flat  <cdg-id>__<kind>[-NN]__<source>[__caption][__cover].<ext>
//             or    <cdg-id>/<kind>[-NN]__<source>[__caption][__cover].<ext>
//   公司／人物 — companies/<公司名>/<kind>…  ·  people/<人名>/<kind>…
//
// Idempotent: re-runs are safe — empty inbox is a no-op, WebP conversion skips
// existing outputs, and media[] entries are deduped by `src`. Conversion never
// fails on an existing output (magick overwrites), and PLAN never touches files,
// so a plan→write sequence can't consume its own inputs.
import { readdirSync, existsSync, mkdirSync, renameSync, statSync, appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { MEDIA_KINDS } from "../schema/game.schema.mjs";
import { COMPANY_MEDIA_KINDS, PERSON_MEDIA_KINDS } from "../schema/media.schema.mjs";

const INBOX = "raw/media/_inbox";
const MAX_PIXELS = 1_000_000;  // cap full image area to ~1 MP (only shrink, never enlarge)
const LOSSLESS_KINDS = new Set(["title", "screenshot", "logo"]);
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"]);
const KINDS = { games: MEDIA_KINDS, companies: COMPANY_MEDIA_KINDS, people: PERSON_MEDIA_KINDS };
const MD_DIR = { games: "content/games", companies: "content/companies", people: "content/people" };
// frontmatter keys a new `media:` block is inserted before (first match wins)
const ANCHORS = ["images:", "references:", "external_links:", "footnotes:", "localization_basis:"];

const WRITE = process.argv.includes("--write");

const normId = (s) => {
  const m = String(s).match(/(\d{3,})/);
  return m ? `cdg-${m[1].padStart(4, "0")}` : null;
};

// → { coll, slug, rawKind, kind, source, caption, cover } | null
function parse(file, coll, slug) {
  let fields = basename(file, extname(file)).split("__").map((x) => x.trim()).filter(Boolean);
  if (!slug) { slug = coll === "games" ? normId(fields[0]) : fields[0]; fields = fields.slice(1); }
  const cover = fields.includes("cover");
  fields = fields.filter((x) => x !== "cover");
  const rawKind = fields[0] || "";
  const kind = rawKind.replace(/-\d+$/, "");
  const source = fields[1] || "";
  const caption = fields.slice(2).join(" ");
  if (!slug || !KINDS[coll].includes(kind)) return null;
  return { coll, slug, rawKind, kind, source, caption, cover };
}

function webp(input, output, lossless) {
  const resize = ["-resize", `${MAX_PIXELS}@>`];
  const args = lossless ? [input, ...resize, "-define", "webp:lossless=true", output] : [input, ...resize, "-quality", "82", output];
  execFileSync("magick", args);
}
const thumb = (input, output) => execFileSync("magick", [input, "-resize", "360x>", "-quality", "75", output]);

// YAML scalar: quote only when the value could otherwise be misparsed.
const yamlStr = (s) => (/[:#[\]{}&*!|>'"%@`,]/.test(s) || /^[\s>-]/.test(s)) ? JSON.stringify(s) : s;
const itemYaml = (m) => {
  const L = [`- src: ${m.src}`, `  kind: ${m.kind}`, `  source: ${m.source}`];
  if (m.caption) L.push(`  caption: ${yamlStr(m.caption)}`);
  if (m.cover) L.push(`  cover: true`);
  return L;
};

// Merge items into the entity's frontmatter media[] (dedupe by src). Returns #added.
function writeMediaBlock(mdPath, items) {
  const lines = readFileSync(mdPath, "utf8").split("\n");
  if (lines[0] !== "---") throw new Error(`${mdPath}: no frontmatter`);
  const fmEnd = lines.indexOf("---", 1);
  if (fmEnd < 0) throw new Error(`${mdPath}: unterminated frontmatter`);
  const rel = lines.slice(1, fmEnd).findIndex((l) => l === "media:");
  const mediaAt = rel >= 0 ? rel + 1 : -1;
  if (mediaAt >= 0) {
    let j = mediaAt + 1;                                   // end of media block = next top-level key
    while (j < fmEnd && !/^[A-Za-z_][\w-]*:/.test(lines[j])) j++;
    const have = new Set();
    for (let k = mediaAt + 1; k < j; k++) {
      const m = lines[k].match(/^- src:\s*(\S+)/);
      if (m) have.add(m[1]);
    }
    const fresh = items.filter((it) => !have.has(it.src));
    if (fresh.length) { lines.splice(j, 0, ...fresh.flatMap(itemYaml)); writeFileSync(mdPath, lines.join("\n")); }
    return fresh.length;
  }
  let at = lines.slice(1, fmEnd).findIndex((l) => ANCHORS.some((a) => l.startsWith(a)));
  at = at >= 0 ? at + 1 : fmEnd;
  lines.splice(at, 0, "media:", ...items.flatMap(itemYaml));
  writeFileSync(mdPath, lines.join("\n"));
  return items.length;
}

if (!existsSync(INBOX)) { console.log(`(無 inbox：${INBOX})`); process.exit(0); }

// collect jobs: games (flat / cdg-folder) + companies/<slug>/ + people/<slug>/
const jobs = [];
const imgsIn = (dir) => readdirSync(dir).filter((f) => IMG_EXT.has(extname(f).toLowerCase()));
for (const ent of readdirSync(INBOX)) {
  if (ent.startsWith(".") || ent === "_done") continue;
  const p = join(INBOX, ent);
  if (ent === "companies" || ent === "people") {
    if (!statSync(p).isDirectory()) continue;
    for (const sub of readdirSync(p)) {
      if (sub.startsWith(".")) continue;
      const sp = join(p, sub);
      if (statSync(sp).isDirectory()) for (const f of imgsIn(sp)) jobs.push({ file: join(sp, f), name: f, coll: ent, slug: sub });
      else if (IMG_EXT.has(extname(sub).toLowerCase())) jobs.push({ file: sp, name: sub, coll: ent, slug: null });  // flat: slug from filename
    }
  } else if (statSync(p).isDirectory()) {
    for (const f of imgsIn(p)) jobs.push({ file: join(p, f), name: f, coll: "games", slug: normId(ent) });
  } else if (IMG_EXT.has(extname(ent).toLowerCase())) {
    jobs.push({ file: p, name: ent, coll: "games", slug: null });
  }
}

// validate ALL before any side effect
const valid = [];
const errors = [];
for (const job of jobs) {
  const meta = parse(job.name, job.coll, job.slug);
  if (!meta) { errors.push(`${job.name}：無法解析（id／kind 不合法）`); continue; }
  if (!meta.source) { errors.push(`${job.name}：缺 source`); continue; }
  const mdPath = join(MD_DIR[meta.coll], `${meta.slug}.md`);
  if (!existsSync(mdPath)) { errors.push(`${job.name}：找不到對應條目 ${mdPath}`); continue; }
  valid.push({ ...job, meta, mdPath, src: `${meta.rawKind}.webp` });
}

// group by entity for reporting / batched md write
const byEntity = {};
for (const v of valid) (byEntity[`${v.meta.coll}/${v.meta.slug}`] ||= []).push(v);

if (errors.length) {
  console.error(`✗ ${errors.length} 個檔有問題：`);
  for (const e of errors) console.error(`  - ${e}`);
}

if (!WRITE) {
  // PLAN: report only, no side effects
  console.log(`\n# DRY-RUN（${valid.length} 張可處理；加 --write 才實際執行）\n`);
  for (const [key, vs] of Object.entries(byEntity)) {
    console.log(`# ${key} → ${vs[0].mdPath} 的 media:`);
    console.log("media:");
    for (const v of vs) for (const l of itemYaml({ ...v.meta, src: v.src })) console.log(l);
    if (key.startsWith("companies/") && vs.some((v) => v.meta.kind === "ad"))
      console.log(`  # 多款代理廣告記得補 games: [cdg-XXXX]`);
    console.log("");
  }
  process.exit(errors.length ? 1 : 0);
}

// WRITE: abort entirely if anything failed validation (no partial state)
if (errors.length) { console.error("\n✗ 有錯誤，已中止，未變更任何檔案。修正 inbox 後重跑。"); process.exit(1); }

// 1) convert (skip existing) → public/
for (const v of valid) {
  const outDir = join("public/media", v.meta.coll, v.meta.slug);
  const thumbDir = join(outDir, "thumb");
  mkdirSync(thumbDir, { recursive: true });
  const outFull = join(outDir, v.src);
  const outThumb = join(thumbDir, v.src);
  if (!existsSync(outFull)) webp(v.file, outFull, LOSSLESS_KINDS.has(v.meta.kind));
  if (!existsSync(outThumb)) thumb(v.file, outThumb);
}
// 2) merge media[] into each .md (dedupe by src)
let added = 0;
for (const [, vs] of Object.entries(byEntity)) {
  added += writeMediaBlock(vs[0].mdPath, vs.map((v) => ({ ...v.meta, src: v.src })));
}
// 3) archive originals + manifest, clearing the inbox (do last so failures keep inputs)
for (const v of valid) {
  const archDir = join("raw/media", v.meta.coll, v.meta.slug);
  mkdirSync(archDir, { recursive: true });
  renameSync(v.file, join(archDir, v.name));
  appendFileSync(join(archDir, "manifest.jsonl"), JSON.stringify({ src: v.src, ...v.meta, original: v.name }) + "\n");
}

console.log(`✓ 轉換 ${valid.length} 張、media[] 新增 ${added} 筆、原圖已歸檔、inbox 已清。`);
for (const [key, vs] of Object.entries(byEntity)) console.log(`  ${key}: ${vs.map((v) => v.src).join(", ")}`);
