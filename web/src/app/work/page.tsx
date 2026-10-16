import type { Metadata } from "next";
import { Container, SectionLabel } from "@/components/ui/primitives";
import { FilteredProjects } from "@/components/work/filtered-projects";
import { EmptyProjects, ProjectGrid } from "@/components/work/project-grid";
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

  const categories = [...new Map(projects.flatMap((p) => (p.category ? [[p.category.slug, p.category]] : [])) as [string, Category][]).values()];
  const showFilter = projects.length >= FILTER_THRESHOLD && categories.length > 1;

  return (
    <Container className="pt-12 pb-24 md:pt-20 md:pb-40">
      <SectionLabel index="W">Work</SectionLabel>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-10">
        <h1 className="font-display text-hero font-extrabold tracking-[-0.05em] uppercase">
          Work{projects.length > 0 && <sup className="ml-3 align-top font-mono text-lg text-accent">({projects.length})</sup>}
        </h1>
        <p className="max-w-sm text-muted">새로 만든 서비스와 더 낫게 고친 서비스. 공개 가능한 프로젝트를 소개합니다.</p>
      </div>

      <div className="mt-14 md:mt-20">
        {projects.length === 0 ? (
          <EmptyProjects />
        ) : showFilter ? (
          <FilteredProjects projects={projects} categories={categories} />
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </Container>
  );
}
