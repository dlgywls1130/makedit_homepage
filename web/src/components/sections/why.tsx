import { pad, values } from "@/lib/site";
import { Section, SectionIntro } from "../ui/primitives";

export function Why() {
  return (
    <Section aria-labelledby="why-title" className="bg-stone">
      <SectionIntro
        id="why-title"
        eyebrow="05 / Why Makedit"
        title={
          <>
            THOUGHTFUL DESIGN.
            <br />
            SOLID ENGINEERING.
          </>
        }
      />
      <div className="grid border-y border-ink sm:grid-cols-2 desk:grid-cols-4">
        {values.map((v, i) => (
          <article
            key={v.title}
            className="flex min-h-64 flex-col border-b border-ink p-6 last:border-b-0 sm:min-h-[22rem] sm:nth-[odd]:border-r sm:nth-[-n+2]:border-b sm:nth-[n+3]:border-b-0 desk:border-r desk:border-b-0 desk:last:border-r-0 desk:nth-[-n+2]:border-b-0"
          >
            <span className="font-mono text-[0.65rem] text-muted">{pad(i + 1)}</span>
            <h3 className="mt-auto mb-4 text-[clamp(1.4rem,2vw,2rem)] font-bold tracking-[-0.05em]">{v.title}</h3>
            <p className="text-[0.77rem] leading-[1.7] text-[#5b5954]">{v.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
