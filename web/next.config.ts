import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

// Studio origin allowed to embed the site in an iframe (Sanity Presentation tool preview).
const studioOrigin = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
  ? new URL(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL).origin
  : "";

const nextConfig: NextConfig = {
  // Cache Components is intentionally disabled: the classic fetch-cache + ISR model
  // is supported by both Vercel and Cloudflare (OpenNext). See docs/ARCHITECTURE.md.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Sanity's image CDN resizes/converts images, so no host-side image optimization
    // (and its per-transformation billing) is needed.
    loader: "custom",
    loaderFile: "./src/sanity/image-loader.ts",
    qualities: [80],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self'${studioOrigin ? ` ${studioOrigin}` : ""}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// Exposes Cloudflare bindings to `next dev` (no effect on production builds).
initOpenNextCloudflareForDev();
