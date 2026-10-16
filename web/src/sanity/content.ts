import "server-only";

import { cache } from "react";
import { sanityFetch } from "./fetch";
import { demoMode, demoProjects } from "./demo";
import {
  allProjectsQuery,
  projectDetailQuery,
  projectSlugsQuery,
  siteSettingsQuery,
  sitemapQuery,
} from "./queries";
import type { ProjectCard, ProjectDetail, ProjectLink, SiteSettings } from "./types";

const emptySettings: SiteSettings = {
  companyName: null,
  representative: null,
  businessNumber: null,
  address: null,
  email: null,
  phone: null,
  privacyOfficer: null,
};

export function getAllProjects(): Promise<ProjectCard[]> {
  if (demoMode) return Promise.resolve(demoProjects);
  return sanityFetch<ProjectCard[]>({ query: allProjectsQuery, fallback: [] });
}

export function getProjectSlugs(): Promise<string[]> {
  if (demoMode) return Promise.resolve(demoProjects.map((p) => p.slug));
  return sanityFetch<string[]>({ query: projectSlugsQuery, fallback: [], allowDraft: false });
}

export function getSitemapProjects() {
  return sanityFetch<{ slug: string; _updatedAt: string }[]>({
    query: sitemapQuery,
    fallback: [],
    allowDraft: false,
  });
}

/** Deduplicated per request: generateMetadata and the page share one fetch. */
export const getProject = cache(async (slug: string) => {
  const data = demoMode
    ? { project: demoProjects.find((p) => p.slug === slug) ?? null, all: demoProjects }
    : await sanityFetch<{ project: ProjectDetail | null; all: ProjectLink[] }>({
    query: projectDetailQuery,
    params: { slug },
    fallback: { project: null, all: [] },
  });
  if (!data.project) return null;

  const others = data.all.filter((p) => p.slug !== slug);
  const index = data.all.findIndex((p) => p.slug === slug);
  // Wrap around so the last project still links somewhere.
  const next = others.length
    ? index >= 0
      ? data.all[(index + 1) % data.all.length]
      : others[0]
    : null;

  return { project: data.project, next: next && next.slug !== slug ? next : null };
});

export const getSiteSettings = cache(async () => {
  const data = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    fallback: emptySettings,
  });
  return { ...emptySettings, ...data };
});
