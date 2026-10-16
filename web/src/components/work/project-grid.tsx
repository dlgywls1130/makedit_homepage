import type { ProjectCard as ProjectCardType } from "@/sanity/types";
import { ProjectCard } from "./project-card";

// Repeating asymmetric rhythm: wide → narrow (offset down) → centered medium.
const layout = [
  { className: "md:col-span-7", aspect: 4 / 3, sizes: "(min-width: 768px) 58vw, 100vw" },
  { className: "md:col-span-5 md:mt-32", aspect: 4 / 5, sizes: "(min-width: 768px) 42vw, 100vw" },
  { className: "md:col-span-8 md:col-start-3", aspect: 16 / 9, sizes: "(min-width: 768px) 66vw, 100vw" },
] as const;

export function ProjectGrid({ projects }: { projects: ProjectCardType[] }) {
  return (
    <div className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-28">
      {projects.map((p, i) => {
        const l = layout[i % layout.length];
        return <ProjectCard key={p._id} project={p} aspect={l.aspect} sizes={l.sizes} className={l.className} />;
      })}
    </div>
  );
}

export function EmptyProjects() {
  return (
    <div className="border-b border-line py-16 text-center">
      <p className="font-display text-2xl font-bold tracking-tight">공개된 프로젝트를 준비하고 있습니다.</p>
      <p className="mt-2 text-muted">프로젝트가 등록되면 이곳에 표시됩니다.</p>
    </div>
  );
}
