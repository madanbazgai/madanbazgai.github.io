import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import profile from "../assets/madmax.jpg";

/**
 * URL of the image shown in link previews. Local images are converted to JPEG (not every
 * network reads AVIF/WebP) and never upscaled; remote URLs are used as-is.
 */
export async function socialImage(image: ImageMetadata | string = profile) {
  if (typeof image === "string") return image;
  return (await getImage({ src: image, format: "jpg", width: Math.min(image.width, 1200) })).src;
}
