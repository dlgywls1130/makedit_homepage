import type { Metadata } from "next";
import { PageTitle, gutter, cn } from "@/components/ui/primitives";
import { FilteredProjects } from "@/components/work/filtered-projects";
import { ProjectGrid, SampleProjectGrid } from "@/components/work/project-grid";
import { getAllProjects } from "@/sanity/content";
import type { Category } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Work",
  description: "메이케딧이 만들고 개선한 웹사이트, 웹 애플리케이션, 이커머스 프로젝트.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
};

/** Below this many projects a filter only adds noise. */
const FILTER_THRESHOLD = 6;

export default async function WorkPage() {
  const projects = await getAllProjects();
  const categories = [
    ...new Map(projects.flatMap((p) => (p.category ? [[p.category.slug, p.category]] : [])) as [string, Category][]).values(),
  ];
  const showFilter = projects.length >= FILTER_THRESHOLD && categories.length > 1;

  return (
    <div className={cn("min-h-svh bg-ink pt-36 pb-24 text-paper sm:pt-44 sm:pb-36", gutter)}>
      <PageTitle
        light
        eyebrow={`Work${projects.length ? ` / ${projects.length}` : ""}`}
        title="ALL WORKS."
        copy="Digital products, business systems, and experiences built to solve real problems."
      />
      {projects.length === 0 ? (
        <SampleProjectGrid />
      ) : showFilter ? (
        <FilteredProjects projects={projects} categories={categories} />
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
}
