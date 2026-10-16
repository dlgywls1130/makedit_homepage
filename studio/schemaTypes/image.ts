import { defineField, defineType } from "sanity";

/** Image with required alt text (accessibility + SEO) and optional caption. */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "이미지",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "대체 텍스트",
      type: "string",
      description: "이미지 내용을 설명하는 문장. 화면 낭독기와 검색엔진이 사용합니다.",
      validation: (r) => r.required().max(160),
    }),
    defineField({ name: "caption", title: "캡션", type: "string", description: "이미지 아래에 표시됩니다(선택)." }),
  ],
});
