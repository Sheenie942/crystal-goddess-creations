/**
 * Product video map — add videos to any product by its Square product ID.
 *
 * How to find a product's Square ID:
 *   Open the product page on this site — the URL will be /products/<ID>
 *   e.g. /products/ABC123XYZ → the ID is ABC123XYZ
 *
 * Supported video URL formats:
 *   YouTube  — https://www.youtube.com/watch?v=VIDEO_ID
 *              https://youtu.be/VIDEO_ID
 *   Vimeo    — https://vimeo.com/VIDEO_ID
 *   Direct   — https://example.com/video.mp4  (hosted .mp4 file)
 *
 * Example:
 *   "ABC123XYZ": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
 */
export const PRODUCT_VIDEOS: Record<string, string> = {
  // Paste entries here, one per product:
  // "<Square product ID>": "<video URL>",
};

/** Returns a normalised embed URL, or null if not recognised / not set. */
export function getEmbedUrl(productId: string): string | null {
  const raw = PRODUCT_VIDEOS[productId];
  if (!raw) return null;

  // YouTube watch URL
  const ytWatch = raw.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}?rel=0`;

  // YouTube short URL
  const ytShort = raw.match(/youtu\.be\/([\w-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}?rel=0`;

  // Vimeo
  const vimeo = raw.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Direct video file — return as-is (rendered with <video> tag)
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(raw)) return raw;

  return null;
}

/** True if the URL is a direct video file (not an iframe embed). */
export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}
