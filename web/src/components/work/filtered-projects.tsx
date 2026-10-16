"use client";

import { useMemo, useState } from "react";
import type { Category, ProjectCard } from "@/sanity/types";
import { cn } from "../ui/primitives";
import { ProjectGrid } from "./project-grid";

/** Client-side category filter. Rendered only once there are enough projects to need it. */
export function FilteredProjects({ projects, categories }: { projects: ProjectCard[]; categories: Category[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = useMemo(
    () => (active ? projects.filter((p) => p.category?.slug === active) : projects),
    [active, projects],
  );

  const options: { slug: string | null; title: string; count: number }[] = [
    { slug: null, title: "All", count: projects.length },
    ...categories.map((c) => ({ ...c, count: projects.filter((p) => p.category?.slug === c.slug).length })),
  ];

  return (
    <>
      <div role="group" aria-label="카테고리 필터" className="mb-14 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.slug ?? "all"}
            type="button"
            aria-pressed={active === o.slug}
            onClick={() => setActive(o.slug)}
            className={cn(
              "border px-4 py-2 text-[0.72rem] font-bold tracking-[0.06em] uppercase transition-colors",
              active === o.slug ? "border-accent bg-accent text-ink" : "border-line-dark hover:border-paper",
            )}
          >
            {o.title} <span className="ml-1 font-mono text-xs opacity-60">{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length}개 프로젝트 표시 중
      </p>
      <ProjectGrid projects={visible} />
    </>
  );
}
