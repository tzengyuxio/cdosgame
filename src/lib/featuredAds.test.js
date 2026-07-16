import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickFeaturedAds } from './featuredAds.js';

const groups = [
  { id: 'g1', u: '/games/g1', t: '遊戲一', ads: [{ img: 'g1-a.webp' }, { img: 'g1-b.webp' }] },
  { id: 'g2', u: '/games/g2', t: '遊戲二', ads: [{ img: 'g2-a.webp' }] },
  { id: 'g3', u: '/games/g3', t: '遊戲三', ads: [{ img: 'g3-a.webp' }] },
];

test('pickFeaturedAds limits results and includes each game at most once', () => {
  const picked = pickFeaturedAds(groups, 2, () => 0);

  assert.equal(picked.length, 2);
  assert.equal(new Set(picked.map(item => item.id)).size, 2);
});

test('pickFeaturedAds can select every ad belonging to one game', () => {
  const oneGame = [groups[0]];

  assert.equal(pickFeaturedAds(oneGame, 1, () => 0)[0].img, 'g1-a.webp');
  assert.equal(pickFeaturedAds(oneGame, 1, () => 0.999)[0].img, 'g1-b.webp');
});

test('pickFeaturedAds includes every eligible game when below the limit', () => {
  const picked = pickFeaturedAds(groups.slice(0, 2), 16, () => 0.5);

  assert.deepEqual(new Set(picked.map(item => item.id)), new Set(['g1', 'g2']));
});

test('pickFeaturedAds ignores groups without ads and handles empty input', () => {
  assert.deepEqual(pickFeaturedAds([], 16, () => 0), []);
  assert.deepEqual(pickFeaturedAds([{ id: 'empty', ads: [] }], 16, () => 0), []);
});
