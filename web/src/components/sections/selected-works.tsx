import { Suspense } from "react";
import type { ProjectCard } from "@/sanity/types";
import { Section, SectionIntro, TextLink } from "../ui/primitives";
import { DemoNotice } from "../work/demo-notice";
import { ProjectFilter } from "../work/project-filter";
import { ProjectGrid } from "../work/project-grid";

const HOME_LIMIT = 6;

export function SelectedWorks({ projects, demo }: { projects: ProjectCard[]; demo?: boolean }) {
  return (
    <Section id="work" aria-labelledby="work-title" className="bg-ink text-paper">
      <SectionIntro
        id="work-title"
        light
        eyebrow="03 / Selected Works"
        title="SELECTED WORKS."
        copy="Digital products, business systems, and experiences built to solve real problems."
      />
      {demo && <DemoNotice />}
      {projects.length ? (
        // useSearchParams needs a Suspense boundary on a static page; the fallback is the unfiltered list.
        <Suspense fallback={<ProjectGrid projects={projects.slice(0, HOME_LIMIT)} />}>
          <ProjectFilter projects={projects} limit={HOME_LIMIT} />
        </Suspense>
      ) : (
        <div className="border-y border-line-dark py-16 text-center">
          <p className="text-lg font-bold">공개된 프로젝트를 준비하고 있습니다.</p>
          <p className="mt-2 text-[0.8rem] text-muted-dark">프로젝트가 등록되면 이곳에 표시됩니다.</p>
        </div>
      )}
      <TextLink href="/work" light className="mt-16">
        View all projects
      </TextLink>
    </Section>
  );
}
