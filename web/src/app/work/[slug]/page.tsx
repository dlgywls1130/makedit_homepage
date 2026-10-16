import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, cn, eyebrowClass, gutter } from "@/components/ui/primitives";
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
      <header className={cn("bg-ink pt-36 pb-16 text-paper sm:pt-44 sm:pb-24", gutter)}>
        <Link href="/work" className="group inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.14em] text-muted-dark uppercase hover:text-paper">
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span> All works
        </Link>
        <div className="mt-12 grid gap-12 desk:grid-cols-[1fr_3fr]">
          <p className={cn(eyebrowClass, "text-muted-dark")}>
            {[project.category?.title, project.year].filter(Boolean).join(" / ") || "Project"}
          </p>
          <div>
            <h1 className="text-[clamp(2.2rem,10.5vw,4rem)] leading-[0.88] font-extrabold tracking-[-0.075em] sm:text-section">
              {project.title}
            </h1>
            {project.excerpt && (
              <p className="mt-8 max-w-[40rem] text-[1rem] leading-[1.55] text-[#c4c1ba] sm:text-[1.15rem]">{project.excerpt}</p>
            )}
          </div>
        </div>

        <dl className="mt-16 grid border-t border-line-dark text-[0.72rem] sm:grid-cols-2 desk:grid-cols-4">
          {meta.map(([k, v]) => (
            <div key={k} className="border-b border-line-dark py-4 sm:pr-6">
              <dt className="mb-2 font-mono text-[0.58rem] tracking-[0.12em] text-muted-dark uppercase">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          {project.technologies?.length ? (
            <div className="border-b border-line-dark py-4 sm:pr-6">
              <dt className="mb-2 font-mono text-[0.58rem] tracking-[0.12em] text-muted-dark uppercase">Stack</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <li key={t} className={cn("border px-2 py-0.5 font-mono text-[0.6rem]", t === "Kotlin" ? "border-accent text-accent" : "border-line-dark")}>
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-12 border-b pb-2.5 text-[0.75rem] font-bold tracking-[0.06em] uppercase"
          >
            Visit site <Arrow />
            <span className="sr-only">(새 창)</span>
          </a>
        )}
      </header>

      <div className={cn("bg-ink pb-16 sm:pb-24", gutter)}>
        <SanityImage
          image={project.thumbnail}
          aspect={16 / 9}
          sizes="100vw"
          preload
          fallbackAlt={`${project.title} 대표 이미지`}
        />
      </div>

      <div className={cn("py-24 sm:py-36", gutter)}>
        {storySections.map(({ key, label, ko }) =>
          project[key] ? (
            <section key={key} className="grid gap-4 border-t border-ink py-10 desk:grid-cols-[1fr_3fr] desk:gap-0 desk:py-14">
              <h2>
                <span className="block font-mono text-[0.6rem] tracking-[0.12em] text-accent-dark uppercase">{label}</span>
                <span className="mt-2 block text-[1.05rem] font-bold">{ko}</span>
              </h2>
              <p className="max-w-[44rem] text-[0.95rem] leading-[1.85] whitespace-pre-line text-[#3d3c39]">{project[key]}</p>
            </section>
          ) : null,
        )}

        {project.description?.length ? (
          <section className="grid gap-4 border-t border-ink py-10 desk:grid-cols-[1fr_3fr] desk:gap-0 desk:py-14">
            <h2>
              <span className="block font-mono text-[0.6rem] tracking-[0.12em] text-accent-dark uppercase">Details</span>
              <span className="mt-2 block text-[1.05rem] font-bold">프로젝트 상세</span>
            </h2>
            <div className="max-w-[44rem] text-[0.95rem] text-[#3d3c39]">
              <RichText value={project.description} />
            </div>
          </section>
        ) : null}

        {gallery.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <h2 className="sr-only">주요 화면</h2>
            <div className="grid gap-4 sm:grid-cols-2 desk:gap-8">
              {gallery.map((img, i) => {
                // Every third image spans full width to keep the rhythm editorial, not grid-like.
                const wide = i % 3 === 0;
                return (
                  <figure key={img._key ?? i} className={wide ? "sm:col-span-2" : undefined}>
                    <SanityImage
                      image={img}
                      aspect={wide ? 16 / 9 : 4 / 5}
                      sizes={wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                      fallbackAlt={`${project.title} 화면 ${i + 1}`}
                    />
                    {img.caption && <figcaption className="mt-3 font-mono text-[0.6rem] text-muted">{img.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {next && (
        <Link href={`/work/${next.slug}`} className={cn("group block bg-sand py-16 sm:py-24", gutter)}>
          <span className={cn(eyebrowClass, "text-muted")}>Next project</span>
          <span className="mt-6 flex items-center justify-between gap-6 text-[clamp(2.4rem,6.5vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.075em] transition-colors group-hover:text-accent-dark">
            {next.title}
            <Arrow />
          </span>
        </Link>
      )}

      <section className={cn("bg-accent py-24 sm:py-36", gutter)}>
        <div className="grid items-end gap-12 desk:grid-cols-[1.6fr_1fr]">
          <p className="text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.08em]">
            HAVE A SIMILAR
            <br />
            PROJECT <span className="text-paper">IN MIND?</span>
          </p>
          <div>
            <p className="mb-8 max-w-[30rem] text-[1.05rem] leading-[1.55]">비슷한 프로젝트를 계획하고 있다면 이야기를 나눠보세요.</p>
            <ButtonLink href="/#contact" variant="dark">
              프로젝트 문의하기
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
