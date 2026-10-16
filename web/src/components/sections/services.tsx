import Link from "next/link";
import { pad, services } from "@/lib/site";
import { Arrow, Section, SectionIntro } from "../ui/primitives";

/**
 * Capability index: static information cells (no arrows/hover, so nothing looks clickable),
 * plus one explicit CTA cell that completes the 4 × 2 grid.
 */
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
      <ul className="grid gap-px border border-[#a5a39c] bg-[#a5a39c] sm:grid-cols-2 desk:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.title} className="flex min-h-56 flex-col bg-sand p-6 sm:min-h-72">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[0.65rem] text-accent-dark">{pad(i + 1)}</span>
              <span aria-hidden className="h-px w-8 bg-ink/30" />
            </div>
            <h3 className="mt-8 text-[clamp(1.4rem,1.9vw,1.9rem)] leading-[1.05] font-bold tracking-[-0.045em]">
              {s.title}
            </h3>
            <p className="mt-auto pt-8 text-[0.78rem] leading-[1.7] text-[#5e5c57]">{s.body}</p>
          </li>
        ))}
        <li className="bg-ink text-paper">
          <Link
            href="/#contact"
            className="group flex h-full min-h-56 flex-col justify-between p-6 transition-colors duration-250 hover:bg-accent hover:text-ink sm:min-h-72"
          >
            <span className="font-mono text-[0.65rem] text-accent group-hover:text-ink">+</span>
            <span className="text-[clamp(1.4rem,1.9vw,1.9rem)] leading-[1.05] font-bold tracking-[-0.045em]">
              어떤 서비스가
              <br />
              필요한지 모르겠다면
            </span>
            <span className="flex items-center justify-between text-[0.75rem] font-bold tracking-[0.06em] uppercase">
              프로젝트에 대해 이야기하기 <Arrow />
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
