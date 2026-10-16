import Link from "next/link";
import { categoryLabel } from "@/lib/categories";
import type { ProjectCard as ProjectCardType, SanityImage as SanityImageType } from "@/sanity/types";
import { Arrow } from "../ui/primitives";
import { SanityImage } from "../ui/sanity-image";
import { SampleMockup, type SampleVisual } from "./sample-mockups";

/** Thumbnail, demo mockup, or a neutral placeholder — always at the given ratio. */
export function ProjectMedia({
  image,
  sample,
  title,
  aspect,
  sizes,
  preload,
}: {
  image: SanityImageType | null;
  sample?: SampleVisual;
  title: string;
  aspect: number;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className="overflow-hidden bg-[#292826]" style={{ aspectRatio: aspect }}>
      {image ? (
        <SanityImage
          image={image}
          aspect={aspect}
          sizes={sizes}
          preload={preload}
          fallbackAlt={`${title} 대표 이미지`}
          className="size-full transition-transform duration-600 group-hover:scale-[1.03]"
        />
      ) : sample ? (
        <SampleMockup type={sample} />
      ) : (
        <div aria-hidden className="grid size-full place-items-center font-mono text-[0.6rem] tracking-[0.14em] text-muted-dark">
          NO IMAGE
        </div>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectCardType }) {
  const category = categoryLabel(project.category);
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col">
      <ProjectMedia
        image={project.thumbnail}
        sample={project.sample}
        title={project.title}
        aspect={4 / 3}
        sizes="(min-width: 901px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="mt-4 flex items-center justify-between border-t border-[#5a5852] pt-4 text-[0.58rem] font-medium tracking-[0.08em] text-muted-dark uppercase">
        <span>{category ?? "Project"}</span>
        <span>{project.sample ? "Sample" : project.year}</span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h3 className="text-[1.25rem] font-bold tracking-[-0.03em] transition-colors group-hover:text-accent">{project.title}</h3>
        <Arrow className="mt-1" />
      </div>
      {project.excerpt && (
        <p className="mt-2 line-clamp-2 max-w-[31rem] text-[0.72rem] leading-[1.6] text-muted-dark">{project.excerpt}</p>
      )}
    </Link>
  );
}
