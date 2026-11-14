import { describe, expect, it } from 'bun:test';
import { THUMBNAIL_QUALITY, thumbnailDimensions } from './blog-thumbnail';

describe('blog thumbnails', () => {
  it('limits width to 800 pixels and preserves aspect ratio', () => {
    expect(thumbnailDimensions(1920, 1080)).toEqual({ width: 800, height: 450 });
  });
  it('does not enlarge smaller covers', () => {
    expect(thumbnailDimensions(400, 300)).toEqual({ width: 400, height: 300 });
  });
  it('encodes at quality 78', () => {
    expect(THUMBNAIL_QUALITY).toBe(78);
  });
});