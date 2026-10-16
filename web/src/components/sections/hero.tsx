import Link from "next/link";
import type { ProjectCard } from "@/sanity/types";
import { ButtonLink, Container } from "../ui/primitives";
import { SanityImage } from "../ui/sanity-image";

export function Hero({ projects }: { projects: ProjectCard[] }) {
  const lead = projects.find((p) => p.thumbnail);

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="pt-12 md:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          <span>
            Make <span className="text-accent">+</span> Edit
          </span>
          <span className="hidden sm:block">Web · App · E-commerce · Frontend · Backend</span>
        </div>

        <h1
          id="hero-title"
          className="mt-10 font-display text-hero font-extrabold tracking-[-0.05em] uppercase md:mt-16"
        >
          <span className="block motion-safe:animate-rise">Make what matters.</span>
          <span className="block motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            Edit what{" "}
            <span className="relative inline-block">
              doesn&apos;t.
              <span
                aria-hidden
                className="absolute inset-x-[-0.04em] top-[52%] h-[0.075em] origin-left bg-accent motion-safe:animate-strike"
              />
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-lg leading-relaxed font-medium md:text-xl">
              From new digital products to better existing systems, Makedit turns complex ideas into practical
              digital experiences.
            </p>
            <p className="mt-4 text-muted">새로운 서비스를 만들고, 기존의 경험을 더 나은 방향으로 개선합니다.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3 md:col-span-6 md:col-start-7 md:justify-end lg:col-span-5 lg:col-start-8">
            <ButtonLink href="/#contact">프로젝트 문의하기</ButtonLink>
            <ButtonLink href="/work" variant="outline">
              프로젝트 보기
            </ButtonLink>
          </div>
        </div>
      </Container>

      {lead ? (
        <Container className="mt-16 md:mt-24">
          <Link href={`/work/${lead.slug}`} className="group grid gap-4 md:grid-cols-12 md:gap-6">
            <div className="overflow-hidden md:col-span-9">
              <SanityImage
                image={lead.thumbnail}
                aspect={16 / 9}
                sizes="(min-width: 768px) 75vw, 100vw"
                preload
                fallbackAlt={`${lead.title} 대표 이미지`}
                className="transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col justify-end gap-2 border-t border-ink pt-4 md:col-span-3">
              <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">Featured project</p>
              <p className="font-display text-2xl font-bold tracking-tight group-hover:text-accent">{lead.title}</p>
              <p className="font-mono text-xs text-muted">
                {[lead.category?.title, lead.year].filter(Boolean).join(" · ")}
              </p>
            </div>
          </Link>
        </Container>
      ) : null}
    </section>
  );
}
