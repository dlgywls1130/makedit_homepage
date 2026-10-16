import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("콘텐츠")
    .items([
      S.listItem()
        .title("프로젝트")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .title("프로젝트")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }, { field: "year", direction: "desc" }]),
        ),
      S.listItem()
        .title("공개 중인 프로젝트")
        .child(S.documentList().title("공개 중").filter('_type == "project" && status == "public"')),
      S.listItem()
        .title("비공개 프로젝트")
        .child(S.documentList().title("비공개").filter('_type == "project" && status != "public"')),
      S.divider(),
      S.documentTypeListItem("category").title("카테고리"),
      S.documentTypeListItem("service").title("담당 업무"),
      S.divider(),
      S.listItem()
        .title("사이트 설정")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
