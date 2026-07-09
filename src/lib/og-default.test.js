import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('default OG artwork contains the complete site title and tagline', async () => {
  const svg = await readFile(new URL('../../assets/og-default.svg', import.meta.url), 'utf8');

  assert.match(svg, /viewBox="0 0 1200 630"/);
  assert.match(svg, />中文 DOS 遊戲資料庫</);
  assert.match(svg, />盡可能齊全、重考據的中文 DOS 時代遊戲百科。</);
});
