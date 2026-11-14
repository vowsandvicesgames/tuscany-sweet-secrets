export const THUMBNAIL_WIDTH = 800;
export const THUMBNAIL_QUALITY = 78;

export function thumbnailDimensions(width: number, height: number) {
  const outputWidth = Math.min(THUMBNAIL_WIDTH, width);
  return { width: outputWidth, height: Math.max(1, Math.round(height * outputWidth / width)) };
}