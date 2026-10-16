"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader backed by Sanity's image CDN.
 * Rescales the requested width while keeping the crop ratio encoded by `urlFor()`.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;

  const url = new URL(src);
  const baseW = Number(url.searchParams.get("w"));
  const baseH = Number(url.searchParams.get("h"));

  url.searchParams.set("w", String(width));
  if (baseW && baseH) url.searchParams.set("h", String(Math.round((width * baseH) / baseW)));
  url.searchParams.set("q", String(quality || 80));
  url.searchParams.set("auto", "format");
  return url.toString();
}
