import { pad, services } from "@/lib/site";
import { Arrow, Section, SectionIntro, TextLink } from "../ui/primitives";

export function Services() {
  return (
    <Section id="services" aria-labelledby="services-title" className="bg-sand">
      <SectionIntro
        id="services-title"
        eyebrow="02 / Services"
        title={
          <>
            FROM IDEA TO
            <br />
            IMPLEMENTATION.
          </>
        }
        copy="One technology partner, from interface to infrastructure."
      />
      <div className="mb-12 border-t border-ink">
        {services.map((s, i) => (
          <article
            key={s.title}
            className="grid grid-cols-[2rem_1fr_1rem] items-center gap-4 border-b border-[#a5a39c] py-6 transition-[padding,background-color] duration-250 sm:min-h-[7.5rem] sm:grid-cols-[5rem_1.2fr_1fr_2rem] sm:py-0 sm:hover:bg-paper sm:hover:px-4"
          >
            <span className="font-mono text-[0.65rem] text-muted">{pad(i + 1)}</span>
            <h3 className="text-[clamp(1.4rem,2.4vw,2.7rem)] font-bold tracking-[-0.045em]">{s.title}</h3>
            <p className="col-span-2 col-start-2 max-w-[30rem] text-[0.78rem] leading-[1.7] text-[#5e5c57] sm:col-span-1 sm:col-start-3 sm:row-start-1">
              {s.body}
            </p>
            <Arrow className="col-start-3 row-start-1 sm:col-start-4" />
          </article>
        ))}
      </div>
      <TextLink href="/#contact">프로젝트에 대해 이야기하기</TextLink>
    </Section>
  );
}
