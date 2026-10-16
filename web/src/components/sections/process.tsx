import { processSteps } from "@/lib/site";
import { Container, SectionLabel } from "../ui/primitives";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="mt-24 md:mt-40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">Process</SectionLabel>
            <h2 id="process-title" className="mt-6 font-display text-display font-extrabold tracking-[-0.04em]">
              Five steps.
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            단계마다 결과물을 함께 확인하고 다음 단계로 넘어갑니다. 프로젝트 규모에 따라 단계는 압축되거나 반복됩니다.
          </p>
        </div>

        <ol className="mt-14 grid border-t border-ink md:mt-20 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="group relative border-b border-line py-8 md:border-b-0 md:border-l md:px-6 md:py-10 md:first:border-l-0 md:first:pl-0"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-0.5 w-0 bg-accent transition-[width] duration-500 group-hover:w-full"
              />
              <span className="font-mono text-sm text-muted">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight md:mt-16 lg:text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
