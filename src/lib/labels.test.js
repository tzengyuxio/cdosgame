import { test } from 'node:test';
import assert from 'node:assert/strict';
import { vendorLabel } from './labels.js';

test('vendorLabel shows 製作／發行 only when they differ', () => {
  // foreign developer + Taiwan publisher(s)
  assert.equal(vendorLabel({ developer: 'Sierra', publisher_tw: ['松崗'] }), 'Sierra／松崗');
  // multiple Taiwan publishers are all listed, joined by 、
  assert.equal(
    vendorLabel({ developer: 'KOEI', publisher_tw: ['第三波', '歐風', '新世界'] }),
    'KOEI／第三波、歐風、新世界',
  );
  // Taiwan self-made: developer only, or developer == sole publisher → single name
  assert.equal(vendorLabel({ developer: '大宇', publisher_tw: [] }), '大宇');
  assert.equal(vendorLabel({ developer: '大宇', publisher_tw: ['大宇'] }), '大宇');
  // developer also self-publishes but there is another publisher → drop the dup dev
  assert.equal(vendorLabel({ developer: '大宇', publisher_tw: ['大宇', '精訊'] }), '大宇／精訊');
  // publisher(s) only, no developer
  assert.equal(vendorLabel({ developer: null, publisher_tw: ['智冠', '華義'] }), '智冠、華義');
  // nothing known
  assert.equal(vendorLabel({ developer: null, publisher_tw: [] }), '—');
});
