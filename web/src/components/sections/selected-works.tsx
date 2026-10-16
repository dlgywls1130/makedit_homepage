import type { ProjectCard } from "@/sanity/types";
import { Section, SectionIntro, TextLink } from "../ui/primitives";
import { ProjectGrid, SampleProjectGrid } from "../work/project-grid";

export function SelectedWorks({ projects }: { projects: ProjectCard[] }) {
  return (
    <Section id="work" aria-labelledby="work-title" className="bg-ink text-paper">
      <SectionIntro
        id="work-title"
        light
        eyebrow="03 / Selected Works"
        title="SELECTED WORKS."
        copy="Digital products, business systems, and experiences built to solve real problems."
      />
      {projects.length ? <ProjectGrid projects={projects} /> : <SampleProjectGrid />}
      <TextLink href="/work" light>
        View all projects
      </TextLink>
    </Section>
  );
}
