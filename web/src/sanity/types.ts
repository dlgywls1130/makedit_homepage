import type { PortableTextBlock } from "next-sanity";

// Shapes returned by the GROQ projections in ./queries.ts.
// Keep these in sync with studio/schemaTypes.

export type SanityImage = {
  _key?: string;
  alt: string | null;
  caption?: string | null;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
    };
  };
};

export type Category = { title: string; slug: string };

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  year: number | null;
  category: Category | null;
  services: string[] | null;
  thumbnail: SanityImage | null;
};

export type ProjectDetail = ProjectCard & {
  client: string | null;
  technologies: string[] | null;
  gallery: SanityImage[] | null;
  description: PortableTextBlock[] | null;
  background: string | null;
  challenge: string | null;
  approach: string | null;
  outcome: string | null;
  externalUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  _updatedAt: string;
};

export type ProjectLink = { title: string; slug: string };

export type SiteSettings = {
  companyName: string | null;
  representative: string | null;
  businessNumber: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  privacyOfficer: string | null;
};
