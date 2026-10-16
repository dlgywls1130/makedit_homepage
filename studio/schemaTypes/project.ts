import { defineArrayMember, defineField, defineType } from "sanity";

const thisYear = new Date().getFullYear();

const CATEGORY_LABELS: Record<string, string> = { homepage: "홈페이지", corporate: "회사·기업", ecommerce: "쇼핑몰", app: "앱" };

export const project = defineType({
  name: "project",
  title: "프로젝트",
  type: "document",
  groups: [
    { name: "overview", title: "기본 정보", default: true },
    { name: "story", title: "상세 내용" },
    { name: "media", title: "이미지" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "노출 설정" },
  ],
  fields: [
    // ── 기본 정보 ──────────────────────────────
    defineField({
      name: "title",
      title: "프로젝트명",
      type: "string",
      group: "overview",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "URL 슬러그",
      type: "slug",
      group: "overview",
      description: "makedit.co.kr/work/<슬러그> 주소가 됩니다. 영문 소문자·숫자·하이픈 권장. 발행 후 변경하면 기존 링크가 끊깁니다.",
      options: { source: "title", maxLength: 64 },
      // Sanity's slug type rejects duplicates within the same document type by default.
      validation: (r) =>
        r.required().custom((slug) =>
          !slug?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)
            ? true
            : "영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.",
        ),
    }),
    defineField({
      name: "excerpt",
      title: "짧은 소개",
      type: "text",
      rows: 3,
      group: "overview",
      description: "목록과 상세 상단에 표시되는 1~2문장 소개.",
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "string",
      group: "overview",
      description: "사이트 Works 필터 탭(홈페이지 · 회사·기업 · 쇼핑몰 · 앱)에 사용됩니다.",
      // Keep in sync with web/src/lib/categories.ts
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "홈페이지", value: "homepage" },
          { title: "회사·기업", value: "corporate" },
          { title: "쇼핑몰", value: "ecommerce" },
          { title: "앱", value: "app" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "연도",
      type: "number",
      group: "overview",
      initialValue: thisYear,
      validation: (r) => r.required().integer().min(2000).max(thisYear + 1),
    }),
    defineField({
      name: "client",
      title: "고객사명",
      type: "string",
      group: "overview",
      description: "⚠️ 고객사가 공개를 허락한 경우에만 입력하세요. 비워두면 표시되지 않습니다.",
    }),
    defineField({
      name: "services",
      title: "담당 업무",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: "technologies",
      title: "기술 스택",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "예: Next.js, TypeScript, Kotlin, PostgreSQL. 실제로 사용한 기술만 입력하세요.",
    }),
    defineField({ name: "externalUrl", title: "외부 링크", type: "url", group: "overview", description: "운영 중인 사이트 주소(선택)." }),

    // ── 상세 내용 ──────────────────────────────
    defineField({ name: "background", title: "프로젝트 배경", type: "text", rows: 4, group: "story" }),
    defineField({ name: "challenge", title: "해결 과제", type: "text", rows: 4, group: "story" }),
    defineField({ name: "approach", title: "수행 내용", type: "text", rows: 6, group: "story" }),
    defineField({ name: "outcome", title: "구현 결과", type: "text", rows: 4, group: "story" }),
    defineField({
      name: "description",
      title: "상세 설명",
      type: "array",
      group: "story",
      description: "자유 형식 본문. 소제목, 목록, 링크, 이미지를 넣을 수 있습니다.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "본문", value: "normal" },
            { title: "소제목", value: "h2" },
            { title: "작은 소제목", value: "h3" },
            { title: "인용", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "링크",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (r) => r.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "imageWithAlt" }),
      ],
    }),

    // ── 이미지 ─────────────────────────────────
    defineField({
      name: "thumbnail",
      title: "대표 이미지",
      type: "imageWithAlt",
      group: "media",
      description: "권장: 가로 2400px 이상, 16:9 또는 4:3. 목록·상세·공유 이미지에 사용됩니다. 핫스팟으로 잘릴 때의 중심을 지정하세요.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "상세 이미지 (주요 화면)",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: { layout: "grid" },
    }),

    // ── SEO ────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO 제목",
      type: "string",
      group: "seo",
      description: "비워두면 프로젝트명을 사용합니다.",
      validation: (r) => r.max(60).warning("60자 이내를 권장합니다."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO 설명",
      type: "text",
      rows: 3,
      group: "seo",
      description: "비워두면 짧은 소개를 사용합니다.",
      validation: (r) => r.max(160).warning("160자 이내를 권장합니다."),
    }),

    // ── 노출 설정 ──────────────────────────────
    defineField({
      name: "status",
      title: "공개 상태",
      type: "string",
      group: "settings",
      initialValue: "hidden",
      options: {
        layout: "radio",
        list: [
          { title: "공개 — 홈페이지에 표시", value: "public" },
          { title: "비공개 — 홈페이지에서 숨김", value: "hidden" },
        ],
      },
      description:
        "비공개는 사이트 목록·상세에서 숨깁니다. 단, Free 플랜의 공개 데이터셋에서는 발행된 문서가 API로 조회될 수 있으므로, 민감한 프로젝트는 '발행 취소(Unpublish)'로 초안 상태로 되돌리세요.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "상단 고정",
      type: "boolean",
      group: "settings",
      description: "켜면 Works 목록 맨 앞에 표시됩니다(홈은 최대 6개).",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "정렬 순서",
      type: "number",
      group: "settings",
      description: "작은 숫자가 먼저 표시됩니다. 같으면 연도 최신순.",
      initialValue: 100,
      validation: (r) => r.integer(),
    }),
    defineField({
      name: "publishedAt",
      title: "발행 일시",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: "정렬 순서", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }, { field: "year", direction: "desc" }] },
    { title: "연도 최신순", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", year: "year", category: "category", status: "status", featured: "featured", media: "thumbnail" },
    prepare: ({ title, year, category, status, featured, media }) => ({
      title: `${featured ? "★ " : ""}${title ?? "(제목 없음)"}`,
      subtitle: [status === "public" ? "공개" : "비공개", CATEGORY_LABELS[category as string], year].filter(Boolean).join(" · "),
      media,
    }),
  },
});
