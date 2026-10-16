import Image from "next/image";
import { imageUrl } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";
import { cn } from "./primitives";

type Props = {
  image: SanityImageType | null | undefined;
  /** width / height. Defaults to the original image ratio. */
  aspect?: number;
  sizes: string;
  preload?: boolean;
  className?: string;
  /** Used when the editor left alt text empty and the image is purely decorative. */
  fallbackAlt?: string;
};

/** Responsive Sanity image with crop/hotspot, LQIP blur and a neutral empty state. */
export function SanityImage({ image, aspect, sizes, preload, className, fallbackAlt = "" }: Props) {
  const ratio = aspect ?? image?.asset?.metadata?.dimensions?.aspectRatio ?? 4 / 3;

  if (!image?.asset?._id) {
    return (
      <div
        aria-hidden
        style={{ aspectRatio: ratio }}
        className={cn("grid place-items-center bg-line/60 font-mono text-xs tracking-widest text-muted uppercase", className)}
      >
        No image
      </div>
    );
  }

  const baseWidth = 1600;
  const lqip = image.asset.metadata?.lqip;

  return (
    <Image
      src={imageUrl(image, baseWidth, ratio)}
      alt={image.alt ?? fallbackAlt}
      width={baseWidth}
      height={Math.round(baseWidth / ratio)}
      sizes={sizes}
      preload={preload}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
      className={cn("h-auto w-full bg-line/60 object-cover", className)}
    />
  );
}
