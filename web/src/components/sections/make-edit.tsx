import { Container, SectionLabel, cn } from "../ui/primitives";

const halves = [
  {
    word: "Make",
    lead: "새로운 것을 만듭니다.",
    body: "아이디어와 비즈니스 목표를 실제로 동작하는 디지털 제품으로 만듭니다.",
    items: ["기업 웹사이트", "웹 애플리케이션", "쇼핑몰", "모바일 앱", "디지털 제품 MVP"],
    dark: false,
  },
  {
    word: "Edit",
    lead: "이미 있는 것을 더 낫게 고칩니다.",
    body: "운영 중인 서비스의 구조와 경험을 점검하고, 필요한 부분부터 개선합니다.",
    items: ["사이트 리뉴얼", "UI · UX 개선", "성능 · 접근성 개선", "기능 추가", "레거시 시스템 현대화"],
    dark: true,
  },
] as const;

export function MakeEdit() {
  return (
    <section aria-labelledby="make-edit-title" className="mt-24 md:mt-40">
      <Container>
        <SectionLabel index="01">Make / Edit</SectionLabel>
        <h2 id="make-edit-title" className="sr-only">
          Make와 Edit
        </h2>
      </Container>

      <div className="relative mt-8 grid md:grid-cols-2">
        {halves.map((h) => (
          <div key={h.word} className={cn(h.dark ? "bg-ink text-paper" : "border-y border-line")}>
            <div className={cn("px-5 py-14 md:px-10 md:py-20", h.dark ? "md:pl-16 xl:pr-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]" : "md:pr-16 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]")}>
              <p className="font-display text-[clamp(4.5rem,13vw,13rem)] leading-[0.8] font-extrabold tracking-[-0.06em] uppercase">
                {h.word}
              </p>
              <p className="mt-10 text-2xl font-bold tracking-tight md:text-3xl">{h.lead}</p>
              <p className={cn("mt-3 max-w-md", h.dark ? "text-muted-dark" : "text-muted")}>{h.body}</p>
              <ul className={cn("mt-10 border-t", h.dark ? "border-line-dark" : "border-line")}>
                {h.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-center justify-between border-b py-3 text-sm md:text-base",
                      h.dark ? "border-line-dark" : "border-line",
                    )}
                  >
                    {item}
                    <span aria-hidden className="font-mono text-xs text-accent">
                      {h.dark ? "↺" : "+"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center bg-accent font-display text-3xl font-bold text-ink md:grid"
        >
          +
        </span>
      </div>
    </section>
  );
}
