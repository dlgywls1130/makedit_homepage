import type { StructureResolver } from "sanity/structure";

// Every list/listItem needs an explicit ASCII `id`: Sanity derives ids from titles,
// which fails for Korean titles ("`id` is required for lists").
export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("콘텐츠")
    .items([
      S.listItem()
        .id("projects")
        .title("프로젝트")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .id("projects-all")
            .title("프로젝트")
            .defaultOrdering([
              { field: "sortOrder", direction: "asc" },
              { field: "year", direction: "desc" },
            ]),
        ),
      S.listItem()
        .id("projects-public")
        .title("공개 중인 프로젝트")
        .child(
          S.documentList()
            .id("projects-public-list")
            .title("공개 중")
            .schemaType("project")
            .filter('_type == "project" && status == "public"'),
        ),
      S.listItem()
        .id("projects-hidden")
        .title("비공개 프로젝트")
        .child(
          S.documentList()
            .id("projects-hidden-list")
            .title("비공개")
            .schemaType("project")
            .filter('_type == "project" && status != "public"'),
        ),
      S.divider(),
      S.documentTypeListItem("service").id("services").title("담당 업무"),
      S.divider(),
      S.listItem()
        .id("siteSettings")
        .title("사이트 설정")
        .child(S.document().id("siteSettings-editor").schemaType("siteSettings").documentId("siteSettings")),
    ]);
