import { capabilities } from "@/lib/site";
import { Container, SectionLabel, cn } from "../ui/primitives";

const columns = [
  { key: "frontend", label: "Interface", sub: "Frontend", items: capabilities.frontend },
  { key: "backend", label: "Infrastructure", sub: "Backend", items: capabilities.backend },
] as const;

export function Infrastructure() {
  return (
    <section aria-labelledby="infra-title" className="mt-24 bg-ink py-24 text-paper md:mt-40 md:py-36">
      <Container>
        <SectionLabel index="04" dark>
          Capability
        </SectionLabel>
        <h2 id="infra-title" className="mt-6 max-w-5xl font-display text-display font-extrabold tracking-[-0.04em] uppercase">
          From interface
          <br />
          <span className="text-muted-dark">to</span> infrastructure.
        </h2>
        <p className="mt-8 max-w-xl leading-relaxed text-muted-dark">
          사용자가 보는 화면부터 그 화면을 움직이는 API와 데이터까지. 메이케딧은 프론트엔드와 백엔드를 함께
          다룰 수 있어, 화면과 서버 사이에서 생기는 문제를 한 팀 안에서 해결합니다.
        </p>

        <div className="mt-16 grid gap-px bg-line-dark md:mt-24 md:grid-cols-2">
          {columns.map((col, ci) => (
            <div key={col.key} className={cn("bg-ink py-8 md:py-10", ci === 0 ? "md:pr-12" : "md:pl-12")}>
              <div className="flex items-baseline justify-between border-b border-line-dark pb-4">
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{col.label}</h3>
                <span className="font-mono text-xs tracking-[0.14em] text-muted-dark uppercase">{col.sub}</span>
              </div>
              <ul className="mt-2">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line-dark py-4 text-lg md:text-xl"
                  >
                    <span className={item === "Kotlin" ? "font-bold text-accent" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs leading-relaxed text-muted-dark">
          * 기술은 프로젝트의 요구사항과 운영 환경에 맞춰 선택합니다. 모든 프로젝트에 위 기술을 일괄 적용하지는
          않습니다.
        </p>
      </Container>
    </section>
  );
}
