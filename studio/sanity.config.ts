import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "hyet2w9s";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
// The Next.js site used for draft previews (Presentation tool).
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL || "https://makedit.co.kr";

const SINGLETONS = new Set(["siteSettings"]);

export default defineConfig({
  name: "makedit",
  title: "Makedit CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { initial: previewOrigin, previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        locations: {
          project: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: doc?.slug
                ? [
                    { title: doc.title ?? "프로젝트", href: `/work/${doc.slug}` },
                    { title: "Work 목록", href: "/work" },
                  ]
                : [],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Singletons cannot be created again from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
