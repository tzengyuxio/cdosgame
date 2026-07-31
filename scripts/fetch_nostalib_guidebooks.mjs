#!/usr/bin/env node

// Fetch nostalib (懷舊圖書館) guidebook indexes and map each guidebook to a
// cdosgame game id. Output is an interchange table meant to be shared with
// nostalib, so keep the columns stable.
//
//   node scripts/fetch_nostalib_guidebooks.mjs              # 第三波 (twp) only
//   node scripts/fetch_nostalib_guidebooks.mjs --series koei,spp
//   node scripts/fetch_nostalib_guidebooks.mjs --all        # every publisher listed on /guidebooks/
//   node scripts/fetch_nostalib_guidebooks.mjs --offline    # reuse raw/nostalib/*.html
//
// Manual decisions live in data/nostalib-guidebook-overrides.tsv
// (source_id <TAB> cdg ids, semicolon separated or "none" <TAB> note) and always
// win over the automatic match.

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const SITE = "https://nostalib.simagame.me";
const rawDir = path.join(repoRoot, "raw", "nostalib");
const overridesPath = path.join(repoRoot, "data", "nostalib-guidebook-overrides.tsv");
const outPath = path.join(repoRoot, "derived", "nostalib-guidebooks.tsv");

const argv = process.argv.slice(2);
const offline = argv.includes("--offline");
const seriesArg = argv[argv.indexOf("--series") + 1];
const wantAll = argv.includes("--all");

async function loadPage(name, url) {
  const cachePath = path.join(rawDir, `${name}.html`);
  if (offline) return fs.readFileSync(cachePath, "utf8");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  const html = await res.text();
  fs.mkdirSync(rawDir, { recursive: true });
  fs.writeFileSync(cachePath, html);
  return html;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// The site ships minified HTML with unquoted attributes.
function parseSeriesList(html) {
  const slugs = new Set();
  for (const m of html.matchAll(/href=\/guidebooks\/([a-z0-9-]+)\//g)) slugs.add(m[1]);
  return [...slugs].sort();
}

function parseGuidebooks(html, series) {
  const re = new RegExp(
    `guidebooks/${series}/([a-z0-9-]+)/?[ >][\\s\\S]{0,400}?alt=["']?(.*?) 封面`,
    "g",
  );
  const books = new Map();
  for (const m of html.matchAll(re)) {
    if (!books.has(m[1])) books.set(m[1], decodeEntities(m[2]).trim());
  }
  return [...books.entries()]
    .map(([no, title]) => ({ no, title }))
    .sort((a, b) => a.no.localeCompare(b.no));
}

const TITLE_SUFFIXES = [
  "完全教戰攻略集",
  "完全攻略指南",
  "完全攻略集",
  "超級攻略集",
  "徹底攻略本",
  "戰術應用集",
  "攻略設定集",
  "攻略合集",
  "攻略秘笈",
  "攻略指南",
  "攻略集",
  "攻略本",
];

function stripSuffix(title) {
  for (const suffix of TITLE_SUFFIXES) {
    if (title.endsWith(suffix)) return title.slice(0, -suffix.length).trim();
  }
  return title.trim();
}

const NUMERALS = [
  ["Ⅰ", "1"], ["Ⅱ", "2"], ["Ⅲ", "3"], ["Ⅳ", "4"], ["Ⅴ", "5"],
  ["Ⅵ", "6"], ["Ⅶ", "7"], ["Ⅷ", "8"], ["Ⅸ", "9"],
  ["壹", "1"], ["貳", "2"], ["參", "3"], ["肆", "4"], ["伍", "5"],
];
const ROMAN = [
  ["VIII", "8"], ["VII", "7"], ["III", "3"], ["IX", "9"],
  ["VI", "6"], ["IV", "4"], ["II", "2"], ["V", "5"], ["I", "1"],
];

function normalize(s) {
  let out = s.toUpperCase();
  for (const [from, to] of NUMERALS) out = out.split(from).join(to);
  for (const [from, to] of ROMAN) out = out.replace(new RegExp(`${from}(?![A-Z])`, "g"), to);
  return out.replace(/[\s　～~：:・．.\-—/（）()]/g, "");
}

function readFrontmatter(text) {
  const end = text.indexOf("\n---", 4);
  return end === -1 ? "" : text.slice(4, end);
}

function buildCatalog() {
  const dir = path.join(repoRoot, "content", "games");
  const index = new Map();
  const titles = new Map();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".md")) continue;
    const fm = readFrontmatter(fs.readFileSync(path.join(dir, file), "utf8"));
    const id = file.slice(0, -3);
    const title = (fm.match(/^title_zh: (.*)$/m)?.[1] ?? "").trim().replace(/^"|"$/g, "");
    titles.set(id, title);
    const names = [title];
    const aliases = fm.match(/^title_aliases:\n((?:- .*\n)+)/m);
    if (aliases) {
      for (const line of aliases[1].trimEnd().split("\n")) {
        names.push(line.slice(2).trim().replace(/^"|"$/g, ""));
      }
    }
    for (const name of names) {
      if (!name) continue;
      const key = normalize(name);
      if (!index.has(key)) index.set(key, new Set());
      index.get(key).add(id);
    }
  }
  return { index, titles };
}

function loadOverrides() {
  if (!fs.existsSync(overridesPath)) return new Map();
  const overrides = new Map();
  for (const line of fs.readFileSync(overridesPath, "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    const [sourceId, ids = "", note = ""] = line.split("\t");
    overrides.set(sourceId.trim(), {
      ids: ids.trim() === "none" || !ids.trim() ? [] : ids.trim().split(";"),
      note: note.trim(),
    });
  }
  return overrides;
}

let seriesSlugs = ["twp"];
if (seriesArg && !seriesArg.startsWith("--")) seriesSlugs = seriesArg.split(",");
if (wantAll) seriesSlugs = parseSeriesList(await loadPage("guidebooks", `${SITE}/guidebooks/`));

const { index, titles } = buildCatalog();
const overrides = loadOverrides();
const rows = [];
const counts = {};
let bookCount = 0;

for (const series of seriesSlugs) {
  const html = await loadPage(`guidebooks-${series}`, `${SITE}/guidebooks/${series}/`);
  const books = parseGuidebooks(html, series);
  bookCount += books.length;

  for (const book of books) {
    const sourceId = `${series}/${book.no}`;
    const override = overrides.get(sourceId);
    let ids = [];
    let match = "none";
    let note = "";

    if (override) {
      ids = override.ids;
      note = override.note;
      match = ids.length === 0 ? "none" : ids.length > 1 ? "multi" : "manual";
    } else {
      const hit = index.get(normalize(stripSuffix(book.title)));
      if (hit) {
        ids = [...hit].sort();
        match = ids.length > 1 ? "multi" : "exact";
      }
    }

    counts[match] = (counts[match] ?? 0) + 1;
    const url = `${SITE}/guidebooks/${series}/${book.no}`;
    if (ids.length === 0) {
      rows.push([sourceId, series, book.title, url, "", "", "none", note]);
    } else {
      for (const id of ids) {
        rows.push([sourceId, series, book.title, url, id, titles.get(id) ?? "", match, note]);
      }
    }
  }
}

const header = [
  "source_id",
  "series",
  "guidebook_title",
  "guidebook_url",
  "cdg_id",
  "cdg_title",
  "match",
  "note",
];
fs.writeFileSync(outPath, `${[header, ...rows].map((cols) => cols.join("\t")).join("\n")}\n`);

console.log(`${bookCount} guidebooks (${seriesSlugs.join(", ")}) -> ${outPath}`);
console.log(counts);
