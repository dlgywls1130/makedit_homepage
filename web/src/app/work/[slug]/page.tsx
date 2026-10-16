import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Container, SectionLabel } from "@/components/ui/primitives";
import { SanityImage } from "@/components/ui/sanity-image";
import { RichText } from "@/components/work/rich-text";
import { getProject, getProjectSlugs } from "@/sanity/content";
import { imageUrl } from "@/sanity/image";

// Published slugs are prerendered at build; slugs added later render on first request and are cached.
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return { title: "Not found", robots: { index: false } };

  const { project } = data;
  const title = project.seoTitle || project.title;
  const description = project.seoDescription || project.excerpt || undefined;
  const ogImage = project.thumbnail ? imageUrl(project.thumbnail, 1200, 1200 / 630) : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: project.thumbnail?.alt ?? project.title }] } : {}),
    },
  };
}

const storySections = [
  { key: "background", label: "Background", ko: "프로젝트 배경" },
  { key: "challenge", label: "Challenge", ko: "해결 과제" },
  { key: "approach", label: "Approach", ko: "수행 내용" },
  { key: "outcome", label: "Outcome", ko: "구현 결과" },
] as const;

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  const { project, next } = data;
  const gallery = project.gallery?.filter((img) => img?.asset) ?? [];

  const meta: [string, React.ReactNode][] = [
    ...(project.client ? ([["Client", project.client]] as [string, string][]) : []),
    ["Category", project.category?.title ?? "—"],
    ["Year", project.year ?? "—"],
    ["Services", project.services?.length ? project.services.join(", ") : "—"],
  ];

  return (
    <article>
      <Container className="pt-12 md:pt-20">
        <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-muted uppercase hover:text-ink">
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span> All work
        </Link>

        <header className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <SectionLabel index={String(project.year ?? "")}>{project.category?.title ?? "Project"}</SectionLabel>
            <h1 className="mt-6 font-display text-display font-extrabold tracking-[-0.045em]">{project.title}</h1>
            {project.excerpt && <p className="mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl">{project.excerpt}</p>}
          </div>
          <dl className="self-end border-t border-ink text-sm md:col-span-4">
            {meta.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3">
                <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
            {project.technologies?.length ? (
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3">
                <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">Stack</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <li key={t} className="border border-line px-2 py-0.5 font-mono text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
            {project.externalUrl && (
              <div className="py-4">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold hover:text-accent"
                >
                  사이트 방문 <Arrow />
                  <span className="sr-only">(새 창)</span>
                </a>
              </div>
            )}
          </dl>
        </header>
      </Container>

      <Container className="mt-14 md:mt-20">
        <SanityImage
          image={project.thumbnail}
          aspect={16 / 9}
          sizes="(min-width: 1440px) 1360px, 100vw"
          preload
          fallbackAlt={`${project.title} 대표 이미지`}
        />
      </Container>

      <Container className="mt-20 md:mt-32">
        {storySections.map(({ key, label, ko }) =>
          project[key] ? (
            <section key={key} className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <h2 className="md:col-span-4">
                <span className="block font-mono text-xs tracking-[0.14em] text-accent uppercase">{label}</span>
                <span className="mt-2 block text-xl font-bold">{ko}</span>
              </h2>
              <p className="text-lg leading-[1.85] whitespace-pre-line md:col-span-7 md:col-start-6">{project[key]}</p>
            </section>
          ) : null,
        )}

        {project.description?.length ? (
          <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
            <h2 className="md:col-span-4">
              <span className="block font-mono text-xs tracking-[0.14em] text-accent uppercase">Details</span>
              <span className="mt-2 block text-xl font-bold">프로젝트 상세</span>
            </h2>
            <div className="text-lg md:col-span-7 md:col-start-6">
              <RichText value={project.description} />
            </div>
          </section>
        ) : null}
      </Container>

      {gallery.length > 0 && (
        <Container className="mt-16 md:mt-24">
          <h2 className="sr-only">주요 화면</h2>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {gallery.map((img, i) => {
              // Every third image spans full width to keep the rhythm editorial, not grid-like.
              const wide = i % 3 === 0;
              return (
                <figure key={img._key ?? i} className={wide ? "md:col-span-2" : undefined}>
                  <SanityImage
                    image={img}
                    aspect={wide ? 16 / 9 : 4 / 5}
                    sizes={wide ? "(min-width: 1440px) 1360px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    fallbackAlt={`${project.title} 화면 ${i + 1}`}
                  />
                  {img.caption && <figcaption className="mt-3 font-mono text-xs text-muted">{img.caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        </Container>
      )}

      {next && (
        <Container className="mt-24 md:mt-40">
          <Link href={`/work/${next.slug}`} className="group block border-y border-ink py-10 md:py-14">
            <span className="font-mono text-xs tracking-[0.14em] text-muted uppercase">Next project</span>
            <span className="mt-4 flex items-center justify-between gap-6 font-display text-display font-extrabold tracking-[-0.045em] transition-colors group-hover:text-accent">
              {next.title}
              <Arrow className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </Container>
      )}

      <Container className="py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <p className="font-display text-title font-bold tracking-tight md:col-span-7">
            비슷한 프로젝트를 계획하고 있다면,
            <br />
            <span className="text-muted">이야기를 나눠보세요.</span>
          </p>
          <div className="md:col-span-5 md:text-right">
            <ButtonLink href="/#contact">프로젝트 문의하기</ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  );
}
