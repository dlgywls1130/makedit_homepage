import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder({ projectId: projectId || "unset", dataset });

/**
 * Builds a CDN URL honouring the editor's crop + hotspot at the given aspect ratio.
 * The loader in image-loader.ts later swaps in the responsive width.
 */
export function imageUrl(image: SanityImage, baseWidth: number, aspect?: number) {
  const ratio = aspect ?? image.asset.metadata?.dimensions?.aspectRatio ?? 4 / 3;
  return builder
    .image(image)
    .width(baseWidth)
    .height(Math.round(baseWidth / ratio))
    .fit("crop")
    .url();
}
