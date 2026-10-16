// Public Sanity configuration. These values are safe in the browser bundle:
// they identify the project but grant no write or draft access.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "";

/** False until a Sanity project is connected. Pages render empty states instead of failing. */
export const isSanityConfigured = /^[a-z0-9]+$/.test(projectId);
