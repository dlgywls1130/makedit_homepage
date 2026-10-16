import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectCard as ProjectCardType } from "@/sanity/types";
import { pad } from "@/lib/site";
import { Arrow, cn } from "../ui/primitives";
import { SanityImage } from "../ui/sanity-image";

/** Asymmetric rhythm from the design: wide → tall → small (offset right). */
export const cardVariants = [
  { className: "", aspect: 16 / 10, sizes: "(min-width: 640px) 60vw, 100vw" },
  { className: "", aspect: 4 / 5, sizes: "(min-width: 640px) 40vw, 100vw" },
  { className: "sm:col-start-1 sm:w-[72%] sm:justify-self-end", aspect: 1, sizes: "(min-width: 640px) 43vw, 100vw" },
] as const;

type CardShellProps = {
  href: string;
  index: number;
  title: string;
  overview: string | null;
  tags: (string | number | null | undefined)[];
  media: ReactNode;
  aspect: number;
  className?: string;
};

/** Shared card layout for CMS projects and design samples. */
export function CardShell({ href, index, title, overview, tags, media, aspect, className }: CardShellProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="overflow-hidden bg-[#292826]" style={{ aspectRatio: aspect }}>
        {media}
      </div>
      <div className="mt-4 grid grid-cols-[2rem_1fr_1rem] gap-4 border-t border-[#5a5852] pt-4 sm:grid-cols-[3rem_1fr_auto_1rem]">
        <span className="font-mono text-[0.6rem] text-muted-dark">{pad(index + 1)}</span>
        <div>
          <h3 className="mb-2.5 text-[1.25rem] font-bold tracking-[-0.03em] transition-colors group-hover:text-accent">{title}</h3>
          {overview && <p className="max-w-[31rem] text-[0.72rem] leading-[1.6] text-muted-dark">{overview}</p>}
        </div>
        <div className="col-start-2 flex gap-2 text-left sm:col-start-auto sm:flex-col sm:text-right">
          {tags.filter(Boolean).map((t) => (
            <b key={String(t)} className="text-[0.58rem] font-medium tracking-[0.08em] uppercase">
              {t}
            </b>
          ))}
        </div>
        <Arrow className="col-start-3 row-start-1 sm:col-start-4" />
      </div>
    </Link>
  );
}

export function ProjectCard({ project, index }: { project: ProjectCardType; index: number }) {
  const v = cardVariants[index % cardVariants.length];
  return (
    <CardShell
      href={`/work/${project.slug}`}
      index={index}
      title={project.title}
      overview={project.excerpt}
      tags={[project.category?.title, project.year]}
      aspect={v.aspect}
      className={v.className}
      media={
        <SanityImage
          image={project.thumbnail}
          aspect={v.aspect}
          sizes={v.sizes}
          fallbackAlt={`${project.title} 대표 이미지`}
          className="size-full transition-transform duration-600 group-hover:scale-[1.025]"
        />
      }
    />
  );
}
