import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { THUMBNAIL_QUALITY, thumbnailDimensions } from './blog-thumbnail';

describe('blog thumbnails', () => {
  it('limits width to 800 pixels and preserves aspect ratio', () => {
    assert.deepEqual(thumbnailDimensions(1920, 1080), { width: 800, height: 450 });
  });
  it('does not enlarge smaller covers', () => {
    assert.deepEqual(thumbnailDimensions(400, 300), { width: 400, height: 300 });
  });
  it('encodes at quality 78', () => {
    assert.equal(THUMBNAIL_QUALITY, 78);
  });
});