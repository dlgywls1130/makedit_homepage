import "server-only";

import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { studioUrl } from "./env";

/** Cache tags. The Sanity webhook revalidates these by document `_type`. */
export const CONTENT_TAGS = ["project", "service", "siteSettings"] as const;

const readToken = process.env.SANITY_API_READ_TOKEN;

type FetchOptions<T> = {
  query: string;
  params?: QueryParams;
  /** Returned when Sanity is not connected yet, so pages render empty states. */
  fallback: T;
  /** Set false where request APIs are unavailable (generateStaticParams, sitemap). */
  allowDraft?: boolean;
};

/**
 * Server-only data access for every page.
 * - Published content: cached by Next.js, invalidated on demand by /api/revalidate.
 * - Draft mode (Studio preview): uncached, draft perspective, read token stays on the server.
 *
 * Network/query errors are thrown on purpose: during ISR, Next.js keeps serving the last
 * good page instead of caching an empty one.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
  allowDraft = true,
}: FetchOptions<T>): Promise<T> {
  if (!client) return fallback;

  const isDraft = allowDraft && (await draftMode()).isEnabled;

  if (isDraft && readToken) {
    return client
      .withConfig({
        token: readToken,
        perspective: "drafts",
        stega: { enabled: Boolean(studioUrl), studioUrl },
      })
      .fetch<T>(query, { ...params, preview: true }, { cache: "no-store" });
  }

  const result = await client.fetch<T | null>(
    query,
    { ...params, preview: false },
    { cache: "force-cache", next: { tags: [...CONTENT_TAGS] } },
  );
  return result ?? fallback;
}
