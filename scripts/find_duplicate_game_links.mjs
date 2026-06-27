import { readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import yaml from 'js-yaml';
import { findDuplicateGameLinks } from '../src/lib/duplicateGameLinks.js';

const FM = /^---\n([\s\S]*?)\n---/;

function loadGameFiles(dir) {
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const path = join(dir, file);
      const text = readFileSync(path, 'utf8');
      const match = text.match(FM);
      if (!match) throw new Error(`${path}: missing frontmatter`);
      return {
        file,
        data: yaml.load(match[1]),
      };
    });
}

const dir = process.argv[2] || 'content/games';
const games = loadGameFiles(dir);
const fileById = new Map(games.map(({ file, data }) => [data.id || basename(file, '.md'), file]));
const duplicates = findDuplicateGameLinks(games.map(({ data }) => data));

if (duplicates.length === 0) {
  console.log(`No duplicate game links found in ${dir}.`);
  process.exit(0);
}

console.log(`Found ${duplicates.length} duplicate URL group(s) in ${dir}:\n`);

for (const duplicate of duplicates) {
  const file = fileById.get(duplicate.gameId) || `${duplicate.gameId}.md`;
  console.log(`${file} (${duplicate.gameId} ${duplicate.title || ''})`);
  console.log(`  ${duplicate.normalizedUrl}`);
  for (const occurrence of duplicate.occurrences) {
    console.log(`  - ${occurrence.path}: ${occurrence.url}`);
  }
  console.log('');
}

process.exit(1);
