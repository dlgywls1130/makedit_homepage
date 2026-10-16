import type { ProjectCard as ProjectCardType } from "@/sanity/types";
import { ProjectCard } from "./project-card";

export function ProjectGrid({ projects }: { projects: ProjectCardType[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 desk:grid-cols-3 desk:gap-x-8 desk:gap-y-20">
      {projects.map((p) => (
        <li key={p._id}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}
