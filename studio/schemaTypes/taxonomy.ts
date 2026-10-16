import { defineField, defineType } from "sanity";

/** Reusable project category (e.g. Website, E-commerce). */
export const category = defineType({
  name: "category",
  title: "카테고리",
  type: "document",
  fields: [
    defineField({ name: "title", title: "이름", type: "string", validation: (r) => r.required().max(40) }),
    defineField({
      name: "slug",
      title: "슬러그",
      type: "slug",
      options: { source: "title", maxLength: 48 },
      validation: (r) => r.required(),
    }),
  ],
});

/** Reusable 담당 업무 (e.g. UI Design, Frontend, Backend API). */
export const service = defineType({
  name: "service",
  title: "담당 업무",
  type: "document",
  fields: [defineField({ name: "title", title: "이름", type: "string", validation: (r) => r.required().max(40) })],
});
