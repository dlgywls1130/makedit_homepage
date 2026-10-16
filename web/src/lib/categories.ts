// Fixed project categories used by the Works filter tabs.
// Keep in sync with studio/schemaTypes/project.ts (category options).
export const projectCategories = [
  { value: "homepage", label: "홈페이지" },
  { value: "corporate", label: "회사·기업" },
  { value: "ecommerce", label: "쇼핑몰" },
  { value: "app", label: "앱" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["value"];

export function categoryLabel(value: string | null | undefined) {
  return projectCategories.find((c) => c.value === value)?.label ?? null;
}

export function isProjectCategory(value: string | null | undefined): value is ProjectCategory {
  return projectCategories.some((c) => c.value === value);
}
