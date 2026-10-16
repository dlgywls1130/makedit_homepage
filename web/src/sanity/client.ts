import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, studioUrl } from "./env";

/**
 * Published-content client. `useCdn: false` because Next.js caches the responses itself
 * and webhook-triggered revalidation must not read a stale CDN copy.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
      stega: { enabled: false, studioUrl },
    })
  : null;
