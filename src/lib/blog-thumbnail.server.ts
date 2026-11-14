import { PhotonImage, SamplingFilter, resize } from '@cf-wasm/photon';
import encode, { init } from '@jsquash/webp/encode.js';
import webpWasm from '@jsquash/webp/codec/enc/webp_enc.wasm?module';
import { THUMBNAIL_QUALITY, thumbnailDimensions } from './blog-thumbnail';

let encoderReady: Promise<unknown> | undefined;

export async function createBlogThumbnail(bytes: Uint8Array): Promise<Uint8Array> {
  if (bytes.byteLength > 20 * 1024 * 1024) throw new Error('Cover image exceeds thumbnail processing limit');
  const image = PhotonImage.new_from_byteslice(bytes);
  let output: PhotonImage | undefined;
  try {
    const { width, height } = thumbnailDimensions(image.get_width(), image.get_height());
    output = resize(image, width, height, SamplingFilter.Lanczos3);
    encoderReady ??= init({ instantiateWasm: (imports: WebAssembly.Imports, receive: (instance: WebAssembly.Instance) => void) => {
      const instance = new WebAssembly.Instance(webpWasm, imports);
      receive(instance);
      return instance.exports;
    } });
    await encoderReady;
    const data = { data: new Uint8ClampedArray(output.get_raw_pixels()), width, height, colorSpace: 'srgb' as const };
    return new Uint8Array(await encode(data, { quality: THUMBNAIL_QUALITY }));
  } finally {
    output?.free();
    image.free();
  }
}