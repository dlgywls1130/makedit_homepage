import Link from "next/link";
import type { ProjectCard as ProjectCardType } from "@/sanity/types";
import { cn } from "../ui/primitives";
import { SanityImage } from "../ui/sanity-image";

type Props = {
  project: ProjectCardType;
  aspect?: number;
  sizes?: string;
  className?: string;
};

export function ProjectCard({ project, aspect = 4 / 3, sizes = "(min-width: 768px) 50vw, 100vw", className }: Props) {
  const meta = [project.category?.title, project.services?.slice(0, 3).join(", ")].filter(Boolean).join(" — ");

  return (
    <article className={cn("group", className)}>
      <Link href={`/work/${project.slug}`} className="block">
        <div className="overflow-hidden">
          <SanityImage
            image={project.thumbnail}
            aspect={aspect}
            sizes={sizes}
            fallbackAlt={`${project.title} 대표 이미지`}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-ink pt-4">
          <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
            {project.title}
          </h3>
          {project.year && <span className="shrink-0 font-mono text-sm text-muted">{project.year}</span>}
        </div>
        {meta && <p className="mt-2 font-mono text-xs tracking-wide text-muted uppercase">{meta}</p>}
        {project.excerpt && <p className="mt-3 max-w-xl leading-relaxed text-muted">{project.excerpt}</p>}
      </Link>
    </article>
  );
}
