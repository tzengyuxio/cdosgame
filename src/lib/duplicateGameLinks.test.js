import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractGameLinks,
  findDuplicateGameLinks,
  normalizeUrlForDuplicateCheck,
} from './duplicateGameLinks.js';

test('extractGameLinks collects reference and external link URLs with paths', () => {
  const links = extractGameLinks({
    id: 'cdg-0001',
    title_zh: 'Test Game',
    references: {
      omega: 'https://omega.idv.tw/kdb120/viewthread.php?threadid=1',
      chiuinan: 'https://chiuinan.github.io/game/game/intro/ch/c12/test.htm',
      cited: {
        review: 'https://example.com/review',
        interview: { label: 'Interview', url: 'https://example.com/interview' },
      },
    },
    external_links: {
      Patch: 'https://example.com/patch',
    },
  });

  assert.deepEqual(links.map((link) => link.path), [
    'references.omega',
    'references.chiuinan',
    'references.cited.review',
    'references.cited.interview',
    'external_links.Patch',
  ]);
});

test('normalizeUrlForDuplicateCheck ignores trailing slash and fragment', () => {
  assert.equal(
    normalizeUrlForDuplicateCheck('https://example.com/path/#section'),
    'https://example.com/path',
  );
  assert.equal(
    normalizeUrlForDuplicateCheck('https://example.com/path/'),
    'https://example.com/path',
  );
});

test('findDuplicateGameLinks reports duplicated URLs inside the same game', () => {
  const duplicates = findDuplicateGameLinks([
    {
      id: 'cdg-0001',
      title_zh: 'Test Game',
      references: {
        omega: 'https://example.com/source',
        cited: {
          same: { label: 'Same Source', url: 'https://example.com/source/' },
        },
      },
      external_links: {
        Mirror: 'https://example.com/source#copy',
      },
    },
    {
      id: 'cdg-0002',
      title_zh: 'Other Game',
      references: {
        omega: 'https://example.com/source',
      },
    },
  ]);

  assert.equal(duplicates.length, 1);
  assert.equal(duplicates[0].gameId, 'cdg-0001');
  assert.equal(duplicates[0].title, 'Test Game');
  assert.equal(duplicates[0].normalizedUrl, 'https://example.com/source');
  assert.deepEqual(duplicates[0].occurrences.map((item) => item.path), [
    'references.omega',
    'references.cited.same',
    'external_links.Mirror',
  ]);
});
