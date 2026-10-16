import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Workers Free friendly setup:
 * - Prerendered pages are served from Workers Static Assets (read-only cache).
 * - Cache interception answers those requests without booting the Next.js server,
 *   keeping CPU per request far below the Free plan's 10 ms limit.
 * Content updates arrive by rebuilding: Sanity webhook → Cloudflare deploy hook.
 * See docs/DEPLOY.md.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
