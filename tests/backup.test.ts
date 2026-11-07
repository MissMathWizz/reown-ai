import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBackup } from '../lib/backup';

const item = {
  id: 'chair', title: 'Chair', brand: '', category: 'Furniture',
  condition: 'Good', notes: '', status: 'Keep',
  photos: [{ id: 'front', name: 'front.png', src: 'data:image/png;base64,AA==' }]
};

test('a backup round trip preserves metadata and photograph bytes', () => {
  assert.deepEqual(parseBackup(JSON.stringify({ version: 1, items: [item] })), [item]);
});

test('restore rejects duplicate photo IDs and external image references', () => {
  for (const photos of [[...item.photos, ...item.photos], [{ ...item.photos[0], src: 'https://example.org/image' }]]) {
    assert.throws(() => parseBackup(JSON.stringify({ version: 1, items: [{ ...item, photos }] })));
  }
});
