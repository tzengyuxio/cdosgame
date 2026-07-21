// Pre-intake triage for raw/media/_hold (see docs/media-triage.md).
// Sits in front of process_media.mjs: identifies which entries each scan belongs to,
// renames to the inbox convention, and moves resolved files into _inbox.
//
//   node scripts/triage_media.mjs                 # PLAN  — scan+reconcile, print, zero side effects
//   node scripts/triage_media.mjs --write         # APPLY — write sidecars, rename, move to _inbox
//   node scripts/triage_media.mjs worklist        # emit JSON of files needing a vision read (for the AI)
//   node scripts/triage_media.mjs show <hash>
//   node scripts/triage_media.mjs set <hash> --cdg cdg-1783 --kind ad --source scan [--caption …]
//   node scripts/triage_media.mjs set <hash> --add teams/狂徒創作群 --kind photo --source scan
//   node scripts/triage_media.mjs mark --from pending-vision --to skip
//
// This script never reads images — Node has no vision. It scans, hashes, reconciles
// filenames against sidecars, re-queries the registry, and renames/moves. Identifying
// an unlabelled scan is the AI's job: take `worklist`, read those images, then either
// `set` the fields or write the sidecar JSON directly (natural for long OCR text).
//
// One image can serve several entries — a magazine page covering three games, or an ad
// that also belongs on a dev-team page with a different kind/caption. That is `targets[]`:
// one sidecar (one OCR, one hash) fanning out to N inbox files. See docs/media-triage.md.
// Re-runs are always safe and idempotent.
import { readdirSync, existsSync, mkdirSync, renameSync, copyFileSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, basename, relative } from "node:path";
import { createHash } from "node:crypto";
import { MEDIA_KINDS } from "../schema/game.schema.mjs";
import { COMPANY_MEDIA_KINDS, PERSON_MEDIA_KINDS, TEAM_MEDIA_KINDS } from "../schema/media.schema.mjs";

// Renames here consume irreplaceable scans: abort rather than clobber.
const die = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

const HOLD = "raw/media/_hold";
const INBOX = "raw/media/_inbox";
const SIDECAR_DIR = "derived/media-ocr";
const SOURCE_DIRS = "data/media-source-dirs.json";   // _hold 資料夾名 → 來源資訊
const SOURCE_CODES = "data/media-sources.json";      // source code → 名稱／URL（站台共用權威表）
const REGISTRY = "data/id-registry.json";
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"]);
const KINDS = { games: MEDIA_KINDS, companies: COMPANY_MEDIA_KINDS, people: PERSON_MEDIA_KINDS, teams: TEAM_MEDIA_KINDS };
// kinds that never repeat within one entry keep a bare name (no -NN)
const SINGLETON = new Set(["box-front", "box-back", "box-spine", "title", "manual-cover", "disc", "floppy", "package", "logo", "portrait"]);

const argv = process.argv.slice(2);
const WRITE = argv.includes("--write");
const cmd = argv.find((a) => !a.startsWith("-")) || "scan";
const flag = (name) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : undefined; };

const sha12 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 12);
const sidecarPath = (h) => join(SIDECAR_DIR, `${h}.json`);
const readSidecar = (h) => (existsSync(sidecarPath(h)) ? JSON.parse(readFileSync(sidecarPath(h), "utf8")) : null);
const writeSidecar = (s) => { mkdirSync(SIDECAR_DIR, { recursive: true }); writeFileSync(sidecarPath(s.sha256), JSON.stringify(s, null, 2) + "\n"); };

// ── registry title index ────────────────────────────────────────────────
// Normalize aggressively: a title typed into a filename rarely matches punctuation exactly.
const norm = (s) => String(s || "")
  .replace(/[\s　]/g, "")
  .replace(/[；：，。、．・！？「」『』（）()《》〈〉【】\[\]{}~～\-—_+.,:;!?'"]/g, "")
  .toLowerCase();

// Index content/games/*.md — the authority since FROZEN v0.2.0. Crucially this
// picks up title_aliases: many games are known under a different name in period
// ads than the one we chose as title_zh (中古戰史 → 上古神兵), and the registry
// stores no aliases at all.
function buildTitleIndex() {
  const reg = JSON.parse(readFileSync(REGISTRY, "utf8")).ids;
  const idx = new Map();
  const add = (key, entry) => {
    const k = norm(key);
    if (!k) return;
    if (!idx.has(k)) idx.set(k, []);
    if (!idx.get(k).some((e) => e.cdg === entry.cdg)) idx.get(k).push(entry);
  };
  for (const f of readdirSync("content/games")) {
    if (!f.endsWith(".md")) continue;
    const id = basename(f, ".md");
    if (reg[id]?.status && reg[id].status !== "active") continue;
    const head = readFileSync(join("content/games", f), "utf8").split("\n---", 2)[0];
    const title = head.match(/^title_zh:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
    if (!title) continue;
    const entry = { cdg: id, title, developer: reg[id]?.developer || head.match(/^developer:\s*(.+)$/m)?.[1]?.trim() || null };
    add(title, entry);
    // title_aliases is a YAML list of "- name" lines until the next top-level key
    const aliasBlock = head.match(/^title_aliases:\s*\n((?:\s*-\s*.+\n?)*)/m)?.[1];
    if (aliasBlock) for (const line of aliasBlock.split("\n")) {
      const a = line.match(/^\s*-\s*(.+?)\s*$/)?.[1]?.replace(/^["']|["']$/g, "");
      if (a) add(a, entry);
    }
  }
  return idx;
}

// ── source maps ─────────────────────────────────────────────────────────
const dirMap = existsSync(SOURCE_DIRS) ? JSON.parse(readFileSync(SOURCE_DIRS, "utf8")).dirs || {} : {};
const validCodes = new Set(Object.keys(JSON.parse(readFileSync(SOURCE_CODES, "utf8"))));
function sourceInfo(dir) {
  if (dirMap[dir]) return dirMap[dir];
  // Unknown dir: parse the common 刊名_第NNN期 shape just for display, and flag it.
  const m = dir.match(/^(?:\d+_)?(.+?)[_\s]*(?:第)?(?:No\.)?(\d+)(?:\+\d+)?期?/i);
  return m ? { source: null, publication: m[1].replace(/_/g, ""), issue: Number(m[2]), _inferred: true } : { source: null, _inferred: true };
}
// title_guess is free text an AI wrote; keep filenames tame (drop parenthetical
// notes and path-hostile characters) without touching the sidecar value.
const fsSafe = (t) => String(t || "").replace(/[（(].*?[）)]/g, "").replace(/[/:\\?*|"<>]/g, " ").replace(/\s+/g, " ").trim();
const defaultCaption = (src) => (src.publication && src.issue ? `${src.publication} 第${src.issue}期` : "");

// ── targets ─────────────────────────────────────────────────────────────
// A target is one destination entry: { coll, slug, kind, source, caption }.
const targetKey = (t) => `${t.coll}/${t.slug}`;
const targetComplete = (t) => Boolean(t.slug && t.kind && KINDS[t.coll]?.includes(t.kind) && t.source && validCodes.has(t.source));

function parseTarget(spec) {          // "teams/狂徒創作群" | "cdg-1783"
  if (/^cdg-\d{3,}$/i.test(spec)) return { coll: "games", slug: spec.toLowerCase() };
  const [coll, ...rest] = spec.split("/");
  if (!KINDS[coll] || !rest.length) return null;
  return { coll, slug: rest.join("/") };
}

// ── filename parsing ────────────────────────────────────────────────────
// Structured (already triaged):  cdg-1783__ad-01__boneash__caption
//                                unk__ad__scan__新毀滅巫師   ·   skip__…
// Unstructured (raw scan):       262_P261_新毀滅巫師.jpg  ·  SSC_0030_重裝機甲兵2.jpg
function parseName(name) {
  const stem = basename(name, extname(name));
  const f = stem.split("__").map((x) => x.trim()).filter(Boolean);
  if (/^cdg-\d{3,}$/i.test(f[0] || "")) {
    const kind = (f[1] || "").replace(/-\d+$/, "");
    return { state: "resolved", target: { coll: "games", slug: f[0].toLowerCase(), kind, source: f[2] || "", caption: f.slice(3).join(" ") } };
  }
  if (f[0] === "unk") return { state: "unk", target: null, kind: (f[1] || "").replace(/-\d+$/, ""), source: f[2] || "", title_guess: f.slice(3).join(" ") || null };
  if (f[0] === "skip") return { state: "skip", target: null };
  // Unstructured: a trailing non-numeric segment is usually the user's own title note;
  // a P-prefixed segment is the printed page (only some scanners include one).
  const segs = stem.split(/[_\s]+/).filter(Boolean);
  const page = segs.find((s) => /^p\d+/i.test(s)) || null;
  const tail = segs[segs.length - 1];
  // Reject scanner artefacts: anything starting with a digit or a scanner prefix
  // (SSC_0030, 0001-combined), and page-position words that aren't titles.
  const NOISE = /^(combined|cover|inside|front|back|封面|封底|目錄|扉頁)|(裡|combined)$/i;
  const title_guess = tail && !/^\d/.test(tail) && !/^(ss[a-z]|p\d)/i.test(tail) && !NOISE.test(tail) ? tail : null;
  return { state: "raw", target: null, title_guess, page };
}

// ── seq allocation ──────────────────────────────────────────────────────
// Allocate -NN from what already exists on disk for that entry, plus what this run
// is about to add. This is what stops a hand-numbered ad-01 from silently
// overwriting an existing ad-01 in process_media.
const pending = new Map();
function allocSeq(t) {
  if (SINGLETON.has(t.kind)) return t.kind;
  const dir = join("public/media", t.coll, t.slug);
  const used = new Set();
  if (existsSync(dir)) for (const f of readdirSync(dir)) {
    const m = basename(f, extname(f)).match(new RegExp(`^${t.kind}-(\\d+)$`));
    if (m) used.add(Number(m[1]));
  }
  const key = `${targetKey(t)}/${t.kind}`;
  for (const n of pending.get(key) || []) used.add(n);
  let n = 1;
  while (used.has(n)) n++;
  if (!pending.has(key)) pending.set(key, new Set());
  pending.get(key).add(n);
  return `${t.kind}-${String(n).padStart(2, "0")}`;
}

// Inbox path for one target (games go flat; other collections use <coll>/<slug>/).
function inboxPath(t, ext) {
  const rawKind = allocSeq(t);
  if (t.coll === "games") return [t.slug, rawKind, t.source, t.caption].filter(Boolean).join("__") + ext;
  return join(t.coll, t.slug, [rawKind, t.source, t.caption].filter(Boolean).join("__") + ext);
}

// A target with slug:null means "kind/source known, entry unknown" — it carries
// the ad/press classification for an `unk` so the filename can still say so.
function deriveStatus(s) {
  if (s.status === "skip") return "skip";
  const placed = s.targets.filter((t) => t.slug);
  if (placed.length) return placed.every(targetComplete) ? "resolved" : "needs-kind";
  if (s.candidates.length > 1) return "ambiguous";
  if (s.status === "unk") return "unk";
  return "pending-vision";
}

// ── subcommands that don't scan ─────────────────────────────────────────
if (cmd === "show" || cmd === "set") {
  const hash = argv.find((a) => /^[0-9a-f]{12}$/.test(a));
  if (!hash) { console.error("需要 12 碼 hash"); process.exit(1); }
  // Sidecars are only materialised by `--write`, so `set` right after `worklist`
  // would have nothing to edit — seed from the worklist entry in that case.
  let s = readSidecar(hash);
  if (!s) {
    const wl = join(SIDECAR_DIR, "worklist.json");
    const seed = existsSync(wl) ? JSON.parse(readFileSync(wl, "utf8")).find((w) => w.sha256 === hash) : null;
    if (!seed) { console.error(`找不到 sidecar 也不在 worklist：${hash}`); process.exit(1); }
    s = { sha256: hash, source_dir: seed.source_dir, originals: [basename(seed.file)], status: seed.need,
          targets: seed.targets || [], title_guess: seed.title_guess, page: seed.page,
          candidates: seed.candidates || [], ocr: null, facts: null, enrich: "pending" };
  }
  if (cmd === "show") { console.log(JSON.stringify(s, null, 2)); process.exit(0); }

  const spec = flag("add") || flag("cdg");
  const src = sourceInfo(s.source_dir || "");
  if (spec) {
    const t = parseTarget(spec);
    if (!t) { console.error(`無法解析 target：${spec}`); process.exit(1); }
    const exist = s.targets.find((x) => targetKey(x) === targetKey(t));
    const tgt = exist || { ...t, kind: null, source: src.source || "", caption: defaultCaption(src) };
    if (!exist) s.targets.push(tgt);
    for (const k of ["kind", "source", "caption"]) if (flag(k) !== undefined) tgt[k] = flag(k);
  } else {
    // no target spec → edit the first target in place
    if (!s.targets.length) s.targets.push({ coll: "games", slug: null, kind: null, source: src.source || "", caption: defaultCaption(src) });
    const tgt = s.targets[0];
    for (const k of ["kind", "source", "caption"]) if (flag(k) !== undefined) tgt[k] = flag(k);
  }
  for (const k of ["title_guess", "enrich"]) if (flag(k) !== undefined) s[k] = flag(k);
  if (flag("status")) s.status = flag("status");
  s.status = deriveStatus(s);
  writeSidecar(s);
  console.log(`✓ ${hash} → ${s.status}：${s.targets.map((t) => `${targetKey(t)}(${t.kind || "?"})`).join(" + ") || "—"}`);
  process.exit(0);
}

// ── scan ────────────────────────────────────────────────────────────────
if (!existsSync(HOLD)) { console.log(`(無 _hold：${HOLD})`); process.exit(0); }

const titleIdx = buildTitleIndex();
const files = [];
(function walk(dir) {
  for (const ent of readdirSync(dir)) {
    if (ent.startsWith(".") || ent === "_extra") continue;
    const p = join(dir, ent);
    if (statSync(p).isDirectory()) walk(p);
    else if (IMG_EXT.has(extname(ent).toLowerCase())) files.push(p);
  }
})(HOLD);

// Best-named file first, so it leads its hash group.
const rank = (f) => (/^(__)?cdg-\d/.test(basename(f)) ? 0 : /__/.test(basename(f)) ? 1 : 2);
files.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

// Group by content hash: byte-identical copies are ONE image with N targets.
const unknownDirs = new Set();
const groups = new Map();
for (const file of files) {
  const rel = relative(HOLD, file);
  const dir = rel.includes("/") ? rel.split("/")[0] : "";
  const hash = sha12(file);
  const src = sourceInfo(dir);
  if (dir && src._inferred) unknownDirs.add(dir);
  if (!groups.has(hash)) groups.set(hash, { hash, dir, src, files: [] });
  groups.get(hash).files.push({ file, rel, name: basename(file) });
}

const rows = [];
for (const g of groups.values()) {
  const prev = readSidecar(g.hash) || {};
  const s = {
    sha256: g.hash,
    source_dir: g.dir || null,
    originals: g.files.map((f) => f.name),
    status: prev.status || "pending-vision",
    targets: prev.targets ? [...prev.targets] : [],
    title_guess: prev.title_guess || null,
    page: prev.page || null,
    candidates: prev.candidates || [],
    ocr: prev.ocr || null,
    facts: prev.facts || null,
    enrich: prev.enrich || "pending",
  };

  // Filenames win over the sidecar — they carry the user's manual adjudication.
  // Each file in the group may contribute its own target.
  for (const f of g.files) {
    const fn = parseName(f.name);
    if (fn.state === "skip") s.status = "skip";
    if (fn.state === "unk") {
      s.status = "unk";
      // keep the kind/source the filename carries on a slug-less placeholder
      if (fn.kind && !s.targets.length) s.targets.push({ coll: "games", slug: null, kind: fn.kind, source: fn.source || "", caption: "" });
    }
    if (fn.title_guess) s.title_guess = fn.title_guess;
    if (fn.page) s.page = fn.page;
    if (fn.target) {
      const exist = s.targets.find((t) => targetKey(t) === targetKey(fn.target));
      if (exist) Object.assign(exist, { ...fn.target, caption: fn.target.caption || exist.caption });
      else s.targets.push(fn.target);
    }
  }

  // `unk` self-heals: re-query the registry every run. Free — no image read.
  if (!s.targets.length && s.title_guess && s.status !== "skip") {
    const hits = titleIdx.get(norm(s.title_guess)) || [];
    s.candidates = hits;
    if (hits.length === 1) s.targets.push({ coll: "games", slug: hits[0].cdg, kind: null, source: g.src.source || "", caption: defaultCaption(g.src) });
    else if (!hits.length && s.status === "pending-vision" && s.ocr) s.status = "unk";
  }
  // Fill blanks on targets from the folder prior.
  for (const t of s.targets) {
    if (!t.source) t.source = g.src.source || "";
    if (!t.caption) t.caption = defaultCaption(g.src);
    if (t.source && !validCodes.has(t.source)) t.source = "";
  }

  s.status = deriveStatus(s);
  // Allocate inbox paths ONCE — allocSeq is stateful, so calling it again for the
  // report and then for the move would burn a sequence number each time.
  const paths = s.status === "resolved" ? s.targets.filter((t) => t.slug).map((t) => inboxPath(t, extname(g.files[0].name))) : [];
  rows.push({ ...g, s, paths });
}

// ── report ──────────────────────────────────────────────────────────────
const by = (st) => rows.filter((r) => r.s.status === st);
const buckets = [
  ["resolved", "已識別 → 移入 _inbox"],
  ["needs-kind", "已對到條目，待補 kind／source（需讀圖）"],
  ["ambiguous", "多個候選，待裁決"],
  ["unk", "查無對應（可能是該補建的條目）"],
  ["pending-vision", "尚未讀圖，需 AI 識別"],
  ["skip", "不入庫"],
];

const multi = rows.filter((r) => r.files.length > 1 || r.s.targets.length > 1);
console.log(`\n# _hold triage（${files.length} 檔／${rows.length} 張不重複圖${WRITE ? "" : "；加 --write 才實際執行"}）\n`);
for (const [st, label] of buckets) {
  const rs = by(st);
  if (!rs.length) continue;
  console.log(`## ${label} — ${rs.length}`);
  for (const r of rs) {
    console.log(`  ${r.hash}  ${r.files.map((f) => f.rel).join("  +  ")}`);
    if (st === "resolved") for (const pth of r.paths) console.log(`      → ${pth}`);
    else if (st === "needs-kind") for (const t of r.s.targets.filter((x) => x.slug)) console.log(`      ${targetKey(t)}，缺 ${[!t.kind && "kind", !t.source && "source"].filter(Boolean).join("/")}`);
    else if (st === "ambiguous") console.log(`      候選: ${r.s.candidates.map((c) => `${c.cdg}(${c.title})`).join(" ")}`);
  }
  console.log("");
}
if (multi.length) {
  console.log(`## 一圖多用 — ${multi.length}`);
  for (const r of multi) console.log(`  ${r.hash}  ${r.files.length} 檔 → ${r.s.targets.map(targetKey).join(" + ") || "（targets 未定）"}`);
  console.log("");
}
if (unknownDirs.size) {
  console.log(`## 未登記的來源資料夾 — ${unknownDirs.size}（建議補進 ${SOURCE_DIRS}）`);
  for (const d of unknownDirs) console.log(`  ${d}`);
  console.log("");
}

if (cmd === "worklist") {
  const work = rows
    .filter((r) => ["pending-vision", "needs-kind", "ambiguous"].includes(r.s.status))
    .map((r) => ({
      sha256: r.hash, file: r.files[0].file, files: r.files.map((f) => f.rel), need: r.s.status,
      source_dir: r.s.source_dir, source_hint: r.src, targets: r.s.targets,
      candidates: r.s.candidates, title_guess: r.s.title_guess, page: r.s.page,
    }));
  mkdirSync(SIDECAR_DIR, { recursive: true });
  writeFileSync(join(SIDECAR_DIR, "worklist.json"), JSON.stringify(work, null, 2) + "\n");
  console.log(`✓ worklist（${work.length} 張需讀圖）→ ${join(SIDECAR_DIR, "worklist.json")}`);
  process.exit(0);
}

if (cmd === "sync") {
  // Materialise sidecars without touching any image — lets `set` edit an entry
  // (e.g. add a second target) before anything is moved into _inbox.
  mkdirSync(SIDECAR_DIR, { recursive: true });
  for (const r of rows) writeSidecar(r.s);
  console.log(`✓ ${rows.length} 份 sidecar 已寫入 ${SIDECAR_DIR}（未動任何圖檔）`);
  process.exit(0);
}

if (cmd === "mark") {
  const from = flag("from"), to = flag("to");
  if (!from || !to) { console.error("用法：mark --from <status> --to <status>"); process.exit(1); }
  const hit = by(from);
  if (!WRITE) { console.log(`（DRY-RUN）${hit.length} 張 ${from} → ${to}；加 --write 才實際執行`); process.exit(0); }
  mkdirSync(SIDECAR_DIR, { recursive: true });
  for (const r of hit) { r.s.status = to; writeSidecar(r.s); }
  console.log(`✓ ${hit.length} 張標為 ${to}（下次跑 --write 會加上檔名前綴）`);
  process.exit(0);
}

if (!WRITE) process.exit(0);

// ── apply ───────────────────────────────────────────────────────────────
// Consume source files: the first N files cover the first N targets (a 2-file /
// 2-target group fits exactly); copy when there are more targets than files;
// surplus duplicate files move to _hold/_extra/ — nothing is ever deleted.
mkdirSync(SIDECAR_DIR, { recursive: true });
let moved = 0, renamed = 0, copied = 0, extra = 0;
for (const r of rows) {
  writeSidecar(r.s);
  const ext = extname(r.files[0].name);

  if (r.s.status === "resolved") {
    const placed = r.s.targets.filter((t) => t.slug);
    r.paths.forEach((pth, i) => {
      const dest = join(INBOX, pth);
      mkdirSync(join(dest, ".."), { recursive: true });
      if (existsSync(dest)) die(`目標檔已存在，拒絕覆蓋：${dest}`);
      if (i < r.files.length) { renameSync(r.files[i].file, dest); moved++; }
      else { copyFileSync(r.files[0].file, dest); copied++; }
    });
    for (const f of r.files.slice(placed.length)) {
      const dir = join(HOLD, "_extra");
      mkdirSync(dir, { recursive: true });
      renameSync(f.file, join(dir, f.name));
      extra++;
    }
    continue;
  }

  // Not resolved: just keep the filename prefix in sync with the status.
  const prefix = r.s.status === "skip" ? "skip" : r.s.status === "unk" ? "unk" : null;
  if (!prefix) continue;
  for (const f of r.files) {
    const t = r.s.targets[0];
    // Strip any prefix we previously applied, so a name can be upgraded once the
    // kind/title are known (unk__SSC_0027 → unk__ad__scan__拿破崙戰記).
    const bare = basename(f.name, ext).replace(/^(unk|skip)__/, "");
    const title = prefix === "unk" && t?.kind ? fsSafe(r.s.title_guess) : null;
    // Without a title the composed stem is just unk__<kind>__<source>, which every
    // untitled file in the folder would share — keep `bare` so it stays unique.
    const stem = title
      ? ["unk", t.kind, t.source, title].filter(Boolean).join("__")
      : `${prefix}__${bare}`;
    if (stem + ext === f.name) continue;
    const dest = join(f.file, "..", stem + ext);
    if (existsSync(dest)) die(`改名目標已存在，拒絕覆蓋：${dest}`);
    renameSync(f.file, dest);
    renamed++;
  }
}
console.log(`✓ sidecar ${rows.length} 筆、移入 _inbox ${moved}、複製 ${copied}、改名 ${renamed}${extra ? `、移入 _extra ${extra}` : ""}。`);
if (moved || copied) console.log(`  接著跑：node scripts/process_media.mjs`);
