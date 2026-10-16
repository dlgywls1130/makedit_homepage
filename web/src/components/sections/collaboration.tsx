import { audiences } from "@/lib/site";
import { Container, SectionLabel } from "../ui/primitives";

export function Collaboration() {
  return (
    <section aria-labelledby="collab-title" className="mt-24 md:mt-40">
      <Container className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel index="07">Collaboration</SectionLabel>
          <h2 id="collab-title" className="mt-6 text-3xl leading-tight font-bold tracking-tight md:text-5xl">
            이런 고민이 있다면
            <br />
            <span className="text-muted">함께 이야기해 보세요.</span>
          </h2>
        </div>
        <ul className="border-t border-ink md:col-span-7">
          {audiences.map((a, i) => (
            <li
              key={a}
              className="flex items-baseline gap-6 border-b border-line py-5 text-lg font-medium md:py-6 md:text-2xl"
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {a}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
