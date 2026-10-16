import Link from "next/link";
import type { ProjectCard } from "@/sanity/types";
import { Arrow, Container, SectionLabel } from "../ui/primitives";
import { EmptyProjects, ProjectGrid } from "../work/project-grid";

export function SelectedWorks({ projects, total }: { projects: ProjectCard[]; total: number }) {
  return (
    <section id="work" aria-labelledby="work-title" className="mt-24 md:mt-40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-8">
          <div>
            <SectionLabel index="03">Selected Works</SectionLabel>
            <h2 id="work-title" className="mt-6 font-display text-display font-extrabold tracking-[-0.04em]">
              Selected
              <br />
              Works{total > 0 && <sup className="ml-2 align-top font-mono text-base text-accent">({total})</sup>}
            </h2>
          </div>
          {total > projects.length && (
            <Link href="/work" className="group inline-flex items-center gap-2 font-semibold hover:text-accent">
              전체 프로젝트 보기 <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <div className="mt-14 md:mt-20">
          {projects.length ? <ProjectGrid projects={projects} /> : <EmptyProjects />}
        </div>
      </Container>
    </section>
  );
}
