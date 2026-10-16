import type { ProjectCard as ProjectCardType } from "@/sanity/types";
import { CardShell, ProjectCard, cardVariants } from "./project-card";
import { SampleMockup, sampleProjects } from "./sample-mockups";

const grid = "mb-20 grid gap-y-20 sm:grid-cols-[1.5fr_1fr] sm:gap-x-4 desk:gap-x-8 desk:gap-y-28";

export function ProjectGrid({ projects }: { projects: ProjectCardType[] }) {
  return (
    <div className={grid}>
      {projects.map((p, i) => (
        <ProjectCard key={p._id} project={p} index={i} />
      ))}
    </div>
  );
}

/** Shown while no project is public yet: the design's sample mockups, clearly labelled. */
export function SampleProjectGrid() {
  return (
    <>
      <p className="mb-12 inline-block border border-line-dark px-3 py-2.5 font-mono text-[0.58rem] text-muted-dark sm:-mt-12 sm:ml-[25%]">
        PORTFOLIO PLACEHOLDERS — 실제 프로젝트 콘텐츠로 교체 예정
      </p>
      <div className={grid}>
        {sampleProjects.map((p, i) => {
          const v = cardVariants[i % cardVariants.length];
          return (
            <CardShell
              key={p.title}
              href="/#contact"
              index={i}
              title={p.title}
              overview={p.overview}
              tags={[p.category, "Sample"]}
              aspect={v.aspect}
              className={v.className}
              media={<SampleMockup type={p.visual} />}
            />
          );
        })}
      </div>
    </>
  );
}
