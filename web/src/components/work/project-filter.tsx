"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isProjectCategory, projectCategories } from "@/lib/categories";
import type { ProjectCard } from "@/sanity/types";
import { Arrow, cn } from "../ui/primitives";
import { ProjectGrid } from "./project-grid";

type Props = {
  projects: ProjectCard[];
  /** Show at most this many cards (home page). */
  limit?: number;
};

/**
 * Category tabs (전체 / 홈페이지 / 회사·기업 / 쇼핑몰 / 앱).
 * Filtering runs in the browser so pages stay static; the choice is kept in `?type=`
 * so a filtered list can be shared or opened from another page.
 */
export function ProjectFilter({ projects, limit }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get("type");
  const active = isProjectCategory(raw) ? raw : null;

  const filtered = active ? projects.filter((p) => p.category === active) : projects;
  const visible = limit ? filtered.slice(0, limit) : filtered;
  const tabs = [
    { value: null, label: "전체", count: projects.length },
    ...projectCategories.map((c) => ({ ...c, count: projects.filter((p) => p.category === c.value).length })),
  ];

  function select(value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set("type", value);
    else next.delete("type");
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <>
      <div role="group" aria-label="프로젝트 분류" className="mb-12 flex flex-wrap gap-2 border-b border-line-dark pb-6 sm:mb-16">
        {tabs.map((t) => {
          const selected = active === t.value;
          return (
            <button
              key={t.value ?? "all"}
              type="button"
              aria-pressed={selected}
              onClick={() => select(t.value)}
              className={cn(
                "inline-flex h-10 items-center gap-2 border px-4 text-[0.75rem] font-bold transition-colors",
                selected ? "border-accent bg-accent text-ink" : "border-line-dark text-paper hover:border-paper",
              )}
            >
              {t.label}
              <span className={cn("font-mono text-[0.6rem]", selected ? "text-ink/70" : "text-muted-dark")}>{t.count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length}개 프로젝트
      </p>

      {visible.length ? (
        <ProjectGrid projects={visible} />
      ) : (
        <div className="border border-line-dark px-6 py-16 text-center">
          <p className="text-lg font-bold">이 분야의 공개 프로젝트를 준비하고 있습니다.</p>
          <p className="mt-2 text-[0.8rem] text-muted-dark">비슷한 프로젝트를 계획 중이라면 먼저 이야기를 나눠보세요.</p>
          <Link href="/#contact" className="group mt-8 inline-flex items-center gap-3 border-b pb-1 text-[0.75rem] font-bold uppercase">
            프로젝트 문의하기 <Arrow />
          </Link>
        </div>
      )}

      {limit && filtered.length > limit && (
        <p className="mt-10 text-[0.72rem] text-muted-dark">
          {filtered.length - limit}개 프로젝트가 더 있습니다.{" "}
          <Link href={`/work${active ? `?type=${active}` : ""}`} className="text-paper underline underline-offset-4 hover:text-accent">
            모두 보기
          </Link>
        </p>
      )}
    </>
  );
}
