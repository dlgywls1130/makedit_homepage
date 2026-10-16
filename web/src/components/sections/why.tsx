import { values } from "@/lib/site";
import { Container, SectionLabel } from "../ui/primitives";

export function Why() {
  return (
    <section aria-labelledby="why-title" className="mt-24 md:mt-40">
      <Container className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel index="05">Why Makedit</SectionLabel>
          <h2 id="why-title" className="mt-6 font-display text-display font-extrabold tracking-[-0.04em]">
            How we
            <br />
            work.
          </h2>
        </div>
        <dl className="grid gap-x-10 md:col-span-8 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.title} className={`border-t border-ink py-8 ${i % 2 === 1 ? "md:mt-20" : ""}`}>
              <dt>
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 block font-display text-3xl font-bold tracking-tight">{v.title}</span>
              </dt>
              <dd className="mt-4 leading-relaxed text-muted">{v.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
