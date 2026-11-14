import { THUMBNAIL_QUALITY, THUMBNAIL_WIDTH } from './blog-thumbnail';

export async function createBlogThumbnail(coverUrl: string, storageUrl: string): Promise<Uint8Array> {
  const source = new URL(coverUrl);
  const trusted = new URL(storageUrl);
  const prefix = '/storage/v1/object/public/email-assets/';
  if (source.protocol !== 'https:' || source.origin !== trusted.origin || !source.pathname.startsWith(prefix)) {
    throw new Error('Thumbnail source must be a mirrored cover');
  }
  source.pathname = source.pathname.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  source.search = new URLSearchParams({ width: String(THUMBNAIL_WIDTH), quality: String(THUMBNAIL_QUALITY), resize: 'contain' }).toString();
  const response = await fetch(source, { headers: { Accept: 'image/webp' }, redirect: 'error' });
  if (!response.ok || !response.headers.get('content-type')?.includes('image/webp')) {
    throw new Error(`Thumbnail transformation failed (${response.status})`);
  }
  return new Uint8Array(await response.arrayBuffer());
}