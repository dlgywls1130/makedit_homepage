import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle, cn, gutter } from "@/components/ui/primitives";
import { DemoNotice } from "@/components/work/demo-notice";
import { ProjectFilter } from "@/components/work/project-filter";
import { ProjectGrid } from "@/components/work/project-grid";
import { getAllProjects } from "@/sanity/content";
import { demoMode } from "@/sanity/demo";

export const metadata: Metadata = {
  title: "Work",
  description: "메이케딧이 만들고 개선한 홈페이지, 기업 사이트, 쇼핑몰, 앱 프로젝트.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work" },
};

export default async function WorkPage() {
  const projects = await getAllProjects();

  return (
    <div className={cn("min-h-svh bg-ink pt-36 pb-24 text-paper sm:pt-44 sm:pb-36", gutter)}>
      <PageTitle
        light
        eyebrow="Work"
        title="ALL WORKS."
        copy="Digital products, business systems, and experiences built to solve real problems."
      />
      {demoMode && <DemoNotice />}
      {projects.length ? (
        <Suspense fallback={<ProjectGrid projects={projects} />}>
          <ProjectFilter projects={projects} />
        </Suspense>
      ) : (
        <div className="border-y border-line-dark py-16 text-center">
          <p className="text-lg font-bold">공개된 프로젝트를 준비하고 있습니다.</p>
          <p className="mt-2 text-[0.8rem] text-muted-dark">프로젝트가 등록되면 이곳에 표시됩니다.</p>
        </div>
      )}
    </div>
  );
}
