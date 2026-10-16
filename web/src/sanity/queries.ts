import { defineQuery } from "next-sanity";

/**
 * Visibility rule shared by every public query.
 * `status == "public"` hides projects switched to 비공개 in the Studio.
 * Unpublished drafts never reach the "published" perspective at all.
 */
const VISIBLE = `_type == "project" && status == "public" && defined(slug.current)`;
const ORDER = `order(featured desc, coalesce(sortOrder, 1000) asc, year desc, _createdAt desc)`;

const IMAGE = `{ _key, alt, caption, crop, hotspot, asset->{ _id, url, metadata { lqip, dimensions } } }`;

const CARD = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  year,
  category,
  "services": services[]->title,
  thumbnail ${IMAGE}
`;

export const allProjectsQuery = defineQuery(`*[${VISIBLE}] | ${ORDER} { ${CARD} }`);

export const projectSlugsQuery = defineQuery(`*[${VISIBLE}].slug.current`);

export const sitemapQuery = defineQuery(
  `*[${VISIBLE}] { "slug": slug.current, _updatedAt }`,
);

// In draft preview ($preview) an editor may open a project that is still 비공개.
export const projectDetailQuery = defineQuery(`{
  "project": *[_type == "project" && slug.current == $slug && ($preview || status == "public")][0] {
    ${CARD},
    client,
    technologies,
    gallery[] ${IMAGE},
    description,
    background,
    challenge,
    approach,
    outcome,
    externalUrl,
    seoTitle,
    seoDescription,
    publishedAt,
    _updatedAt
  },
  "all": *[${VISIBLE}] | ${ORDER} { title, "slug": slug.current }
}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0] {
  companyName, representative, businessNumber, address, email, phone, privacyOfficer
}`);
