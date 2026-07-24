#!/usr/bin/env node
// scan_cull_candidates.mjs — flag likely-cull unpublished entries with cheap signals.
//
// Reads every content/games/*.md with `published: false`, tags each with the
// rejection signals it hits (edu / post2000 / foreign-no-tw / dup), and writes
// derived/cull-candidates.tsv for human batch-triage. Reads nothing else into
// the main line — the TSV is the summary to review.
//
// Signals are HIGH-PRECISION-first: prefer under-flagging over false kills.
// Buckets 3/4 (foreign-no-tw, dup) are advisory only — verify per-item before
// rejecting (譯名用錯 / 撞號掛錯碼 traps). See docs/superpowers/specs/
// 2026-07-24-cull-unpublished-triage-design.md.

import fs from "node:fs";
import path from "node:path";

const CONTENT = "content/games";
const INTRO_TSV = "derived/chiuinan-intro-links.tsv";
const OUT = "derived/cull-candidates.tsv";

// Chinese-speaking developer regions where Taiwan足跡 is plausible without a
// publisher_tw. Anything else + empty publisher_tw + no chiuinan intro = 純外文.
const CJK_REGIONS = new Set(["TW", "HK", "CN", "MO"]);

// Representative TW publishers whose post-2000 titles stay in scope regardless
// of year. 智冠 deliberately excluded — 代理鑑別力低 (see memory).
const KEEP_PUBLISHERS = ["大宇", "第三波", "光譜", "弘煜", "松崗", "軟體世界", "智慧型開發"];

// Edutainment / tool-software title keywords (bucket 1, high precision).
const EDU_RE = /(學習|教學|教材|百科|字典|辭典|打字|測驗|認字|識字|會話|發音|家教|補習|函授|注音|拼音|升學|聯考|模擬考|title\s*=)/;

// --- frontmatter parsing (flat, good enough for these fields) ---------------
function parse(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = m[1];
  const body = (m[2] || "").trim();
  const scalar = (k) => {
    const r = fm.match(new RegExp("^" + k + ":\\s*(.*)$", "m"));
    return r ? r[1].trim() : "";
  };
  // first list item of a block sequence, or [] inline
  const listFirst = (k) => {
    const inline = fm.match(new RegExp("^" + k + ":\\s*(\\[.*\\])\\s*$", "m"));
    if (inline) return inline[1] === "[]" ? "" : inline[1];
    const idx = fm.indexOf("\n" + k + ":");
    if (idx < 0 && !fm.startsWith(k + ":")) return "";
    const after = fm.slice(fm.indexOf(k + ":") + k.length + 1);
    const line = after.split("\n").find((l) => l.trim().startsWith("- "));
    return line ? line.trim().replace(/^-\s*/, "") : "";
  };
  return { fm, body, scalar, listFirst };
}

const isNull = (v) => v === "" || v === "null";

// --- load chiuinan intro catalog_ids ---------------------------------------
const introIds = new Set();
if (fs.existsSync(INTRO_TSV)) {
  const lines = fs.readFileSync(INTRO_TSV, "utf8").split("\n").slice(1);
  for (const l of lines) {
    const cid = l.split("\t")[0]?.trim();
    if (cid) introIds.add(cid);
  }
}

// --- pass 1: index published normalized titles (for dup signal) ------------
const norm = (s) =>
  (s || "")
    .replace(/[（）()【】\[\]：:・·…—\-\s　,，。.、'"'"!！?？]/g, "")
    .toLowerCase();

const publishedTitles = new Map(); // normTitle -> id
const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".md"));
for (const f of files) {
  const md = fs.readFileSync(path.join(CONTENT, f), "utf8");
  if (!/^published:\s*true/m.test(md)) continue;
  const p = parse(md);
  if (!p) continue;
  const t = norm(p.scalar("title_zh"));
  if (t) publishedTitles.set(t, p.scalar("id"));
}

// --- pass 2: scan unpublished ----------------------------------------------
const rows = [];
const tally = { edu: 0, post2000: 0, "foreign-no-tw": 0, dup: 0, none: 0, total: 0 };

for (const f of files) {
  const md = fs.readFileSync(path.join(CONTENT, f), "utf8");
  if (!/^published:\s*false/m.test(md)) continue;
  const p = parse(md);
  if (!p) continue;
  tally.total++;

  const id = p.scalar("id");
  const title = p.scalar("title_zh");
  const year = p.scalar("year");
  const dev = p.scalar("developer");
  const region = p.scalar("developer_region");
  const cid = p.scalar("catalog_id");
  const pub = p.listFirst("publisher_tw");

  const signals = [];

  // bucket 1: edutainment / tool keyword in title
  if (EDU_RE.test(title)) signals.push("edu");

  // bucket 2: post-2000 without a keeper publisher
  if (!isNull(year) && Number(year) > 2002) {
    const kept = !isNull(pub) && KEEP_PUBLISHERS.some((k) => pub.includes(k));
    if (!kept) signals.push("post2000");
  }

  // bucket 3: 純外文無台灣足跡 (advisory — verify 譯名)
  if (
    !isNull(region) &&
    !CJK_REGIONS.has(region) &&
    isNull(pub) &&
    !(cid && introIds.has(cid))
  ) {
    signals.push("foreign-no-tw");
  }

  // bucket 4: exact normalized-title collision with a published entry (advisory)
  const nt = norm(title);
  if (nt && publishedTitles.has(nt)) {
    signals.push(`dup:${publishedTitles.get(nt)}`);
  }

  for (const s of signals) {
    const key = s.startsWith("dup:") ? "dup" : s;
    if (key in tally) tally[key]++;
  }
  if (signals.length === 0) tally.none++;

  rows.push([id, title, year || "", dev || "", region || "", pub || "", signals.join("|")]);
}

// sort: entries with most signals first, then by id
rows.sort((a, b) => {
  const sa = a[6] ? a[6].split("|").length : 0;
  const sb = b[6] ? b[6].split("|").length : 0;
  return sb - sa || a[0].localeCompare(b[0]);
});

const header = ["id", "title", "year", "developer", "region", "publisher_tw", "signals"].join("\t");
fs.writeFileSync(OUT, header + "\n" + rows.map((r) => r.join("\t")).join("\n") + "\n");

// --- summary to stdout ------------------------------------------------------
console.log(`scanned unpublished: ${tally.total}`);
console.log(`  edu           : ${tally.edu}`);
console.log(`  post2000      : ${tally.post2000}`);
console.log(`  foreign-no-tw : ${tally["foreign-no-tw"]} (advisory, verify 譯名)`);
console.log(`  dup           : ${tally.dup} (advisory, verify 撞號)`);
console.log(`  no signal     : ${tally.none}`);
console.log(`\nchiuinan intro ids loaded: ${introIds.size}`);
console.log(`published titles indexed : ${publishedTitles.size}`);
console.log(`wrote ${OUT} (${rows.length} rows)`);
