import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickFeaturedMedia } from './featuredMedia.js';

const groups = [
  { id: 'g1', t: '遊戲一', items: ['ad-01.webp', 'ad-02.webp'] },
  { id: 'g2', t: '遊戲二', items: ['ad-01.webp'] },
  { id: 'g3', t: '遊戲三', items: ['ad-01.webp'] },
];

test('pickFeaturedMedia limits results and includes each game at most once', () => {
  const picked = pickFeaturedMedia(groups, 2, () => 0);

  assert.equal(picked.length, 2);
  assert.equal(new Set(picked.map(item => item.id)).size, 2);
});

test('pickFeaturedMedia can select every image belonging to one game', () => {
  const oneGame = [groups[0]];

  assert.equal(pickFeaturedMedia(oneGame, 1, () => 0)[0].src, 'ad-01.webp');
  assert.equal(pickFeaturedMedia(oneGame, 1, () => 0.999)[0].src, 'ad-02.webp');
});

test('pickFeaturedMedia keeps the group fields and drops items', () => {
  const [picked] = pickFeaturedMedia([groups[1]], 1, () => 0);

  assert.deepEqual(picked, { id: 'g2', t: '遊戲二', src: 'ad-01.webp' });
});

test('pickFeaturedMedia includes every eligible game when below the limit', () => {
  const picked = pickFeaturedMedia(groups.slice(0, 2), 16, () => 0.5);

  assert.deepEqual(new Set(picked.map(item => item.id)), new Set(['g1', 'g2']));
});

test('pickFeaturedMedia ignores groups without images and handles empty input', () => {
  assert.deepEqual(pickFeaturedMedia([], 16, () => 0), []);
  assert.deepEqual(pickFeaturedMedia([{ id: 'empty', items: [] }], 16, () => 0), []);
});
