#!/usr/bin/env node

// Push the NostaLib guidebook links from derived/nostalib-guidebooks.tsv into the
// matching game entries' external_links. One line per guidebook; the 攻略本 chip
// and the ordering are handled at render time (see CiteSections.astro), so the
// entry only needs the plain link.
//
//   node scripts/apply_guidebook_links.mjs            # dry run
//   node scripts/apply_guidebook_links.mjs --write

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const tablePath = path.join(repoRoot, "derived", "nostalib-guidebooks.tsv");
const gamesDir = path.join(repoRoot, "content", "games");
const write = process.argv.includes("--write");

const rows = fs
  .readFileSync(tablePath, "utf8")
  .split("\n")
  .slice(1)
  .filter(Boolean)
  .map((line) => {
    const [sourceId, series, title, url, cdgId] = line.split("\t");
    return { sourceId, series, title, url, cdgId };
  })
  .filter((r) => r.cdgId);

const byGame = new Map();
for (const row of rows) {
  if (!byGame.has(row.cdgId)) byGame.set(row.cdgId, []);
  byGame.get(row.cdgId).push(row);
}

const label = (row) => `${row.title.replace(/\s+$/, "")} － 懷舊圖書館`;

let changed = 0;
let added = 0;
const missing = [];

for (const [cdgId, books] of [...byGame].sort()) {
  const file = path.join(gamesDir, `${cdgId}.md`);
  if (!fs.existsSync(file)) {
    missing.push(cdgId);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  const fmEnd = text.indexOf("\n---", 4);
  const fm = text.slice(0, fmEnd);
  const rest = text.slice(fmEnd);

  const pending = books.filter((b) => !fm.includes(b.url));
  if (!pending.length) continue;
  const lines = pending.map((b) => `  "${label(b)}": ${b.url}`);

  let nextFm;
  const existing = fm.match(/^external_links:\n((?:[ ]{2}.*\n)*)/m);
  if (existing) {
    // Append after the last entry of the existing block.
    const block = existing[0];
    nextFm = fm.replace(block, `${block}${lines.join("\n")}\n`);
  } else {
    const anchor = fm.match(/^localization_basis:/m);
    const insertAt = anchor ? anchor.index : fm.length + 1;
    const blockText = `external_links:\n${lines.join("\n")}\n`;
    nextFm = anchor
      ? fm.slice(0, insertAt) + blockText + fm.slice(insertAt)
      : `${fm}\n${blockText.trimEnd()}`;
  }

  changed += 1;
  added += pending.length;
  console.log(`${cdgId}  +${pending.length}`);
  for (const line of lines) console.log(line);
  if (write) fs.writeFileSync(file, nextFm + rest);
}

console.log(`\n${write ? "written" : "dry run"}: ${changed} entries, ${added} links`);
if (missing.length) console.log(`missing entry files: ${missing.join(", ")}`);
