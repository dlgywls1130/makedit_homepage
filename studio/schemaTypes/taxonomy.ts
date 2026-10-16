import { defineField, defineType } from "sanity";

/** Reusable 담당 업무 (e.g. UI Design, Frontend, Backend API). */
export const service = defineType({
  name: "service",
  title: "담당 업무",
  type: "document",
  fields: [defineField({ name: "title", title: "이름", type: "string", validation: (r) => r.required().max(40) })],
});
