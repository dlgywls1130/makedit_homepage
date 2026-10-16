import { defineField, defineType } from "sanity";

/** Singleton: business details shown in the footer and privacy policy. Leave unknown values empty. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "상호", type: "string" }),
    defineField({ name: "representative", title: "대표자", type: "string" }),
    defineField({ name: "businessNumber", title: "사업자등록번호", type: "string" }),
    defineField({ name: "address", title: "사업장 주소", type: "string" }),
    defineField({ name: "email", title: "대표 이메일", type: "string", validation: (r) => r.email() }),
    defineField({ name: "phone", title: "대표 전화", type: "string" }),
    defineField({ name: "privacyOfficer", title: "개인정보 보호책임자", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "사이트 설정" }) },
});
