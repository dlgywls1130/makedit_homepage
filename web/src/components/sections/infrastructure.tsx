import { capabilities } from "@/lib/site";
import { Section, SectionIntro, cn } from "../ui/primitives";

const columns = [
  { key: "frontend", label: "01 / User-facing layer", title: "FRONTEND", items: capabilities.frontend, dark: false },
  { key: "backend", label: "02 / Application layer", title: "BACKEND", items: capabilities.backend, dark: true },
] as const;

function Column({ col }: { col: (typeof columns)[number] }) {
  return (
    <div className={cn("flex min-h-[27rem] flex-col p-8 sm:min-h-0", col.dark && "bg-ink text-paper")}>
      <span className={cn("font-mono text-[0.58rem] uppercase", col.dark ? "text-muted-dark" : "text-muted")}>{col.label}</span>
      <h3 className="mt-auto mb-8 text-[clamp(3rem,6vw,6rem)] font-bold tracking-[-0.07em]">{col.title}</h3>
      <ul>
        {col.items.map((item) => {
          const kotlin = item === "Kotlin";
          return (
            <li
              key={item}
              className={cn(
                "flex justify-between border-t py-3 after:text-[0.45rem] after:content-['●']",
                col.dark ? "border-line-dark" : "border-line",
                kotlin ? "text-base font-extrabold text-accent after:text-accent" : "text-[0.72rem] after:text-[#aaa]",
              )}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Infrastructure() {
  return (
    <Section aria-labelledby="infra-title" className="bg-paper">
      <SectionIntro
        id="infra-title"
        eyebrow="04 / Capabilities"
        title={
          <>
            FROM INTERFACE
            <br />
            TO <span className="text-accent">INFRASTRUCTURE.</span>
          </>
        }
        copy="Good digital products need more than a good interface."
      />
      <div className="grid border border-ink sm:min-h-[34rem] sm:grid-cols-[1fr_0.55fr_1fr]">
        <Column col={columns[0]} />
        <div
          aria-hidden
          className="flex min-h-36 flex-row items-center justify-center gap-4 bg-accent p-4 font-mono text-[0.5rem] sm:min-h-0 sm:flex-col sm:gap-0"
        >
          <span>REQUEST</span>
          <i className="h-px w-[18%] bg-ink sm:h-1/4 sm:w-px" />
          <b className="py-4 font-sans text-[2rem]">↔</b>
          <i className="h-px w-[18%] bg-ink sm:h-1/4 sm:w-px" />
          <span>RESPONSE</span>
          <small className="mt-12 hidden text-center sm:block">WORKING DIGITAL SYSTEM</small>
        </div>
        <Column col={columns[1]} />
      </div>
      <p className="mt-10 ml-auto max-w-[43rem] text-[0.9rem] leading-[1.8] text-muted">
        사용자가 마주하는 인터페이스부터 애플리케이션 로직, API와 데이터 시스템까지 하나의 흐름으로 연결합니다. 기술은
        각 프로젝트의 실제 범위와 요구사항에 맞게 선택합니다.
      </p>
    </Section>
  );
}
