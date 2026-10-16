import { pad, processSteps } from "@/lib/site";
import { Section, SectionIntro } from "../ui/primitives";

export function Process() {
  return (
    <Section id="process" aria-labelledby="process-title" className="bg-ink text-paper">
      <SectionIntro
        id="process-title"
        light
        eyebrow="06 / Process"
        title={
          <>
            FROM FIRST CONVERSATION
            <br />
            TO LAUNCH.
          </>
        }
      />
      <ol className="grid border-t border-[#4b4944] sm:grid-cols-2 desk:grid-cols-5">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="relative border-b border-[#4b4944] py-8 before:absolute before:-top-[0.28rem] before:left-0 before:size-[0.55rem] before:rounded-full before:bg-accent sm:min-h-64 sm:py-6 sm:pr-5 desk:min-h-[22rem]"
          >
            <span className="font-mono text-[0.6rem] text-accent">{pad(i + 1)}</span>
            <h3 className="mt-12 mb-4 text-[1.6rem] font-bold tracking-[-0.04em] sm:mt-24">{step.title}</h3>
            <p className="pr-6 text-[0.72rem] leading-[1.7] text-muted-dark">{step.body}</p>
            <i aria-hidden className="mt-8 block h-px w-8 bg-[#66645f]" />
          </li>
        ))}
      </ol>
    </Section>
  );
}
