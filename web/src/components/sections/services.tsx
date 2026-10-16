import { services } from "@/lib/site";
import { Container, SectionLabel } from "../ui/primitives";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mt-24 md:mt-40">
      <Container className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <SectionLabel index="02">Services</SectionLabel>
            <h2 id="services-title" className="mt-6 font-display text-display font-extrabold tracking-[-0.04em]">
              What we
              <br />
              build.
            </h2>
            <p className="mt-6 max-w-xs text-muted">
              웹사이트 제작부터 백엔드 개발, 운영 중인 서비스의 개선까지. 프로젝트에 필요한 범위만큼 함께합니다.
            </p>
          </div>
        </div>

        <ol className="border-t border-ink md:col-span-8">
          {services.map((s, i) => (
            <li
              key={s.title}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-line py-7 md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-8 md:py-9"
            >
              <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {s.title}
                <span className="mt-1 block font-sans text-sm font-medium tracking-normal text-muted">{s.ko}</span>
              </h3>
              <p className="col-start-2 leading-relaxed text-muted md:col-start-3">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
