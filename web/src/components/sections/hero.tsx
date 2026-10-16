import { site } from "@/lib/site";
import { ButtonLink, gutter, cn } from "../ui/primitives";

/** Decorative product-UI graphic from the design. Numbers are illustrative, not metrics. */
function InterfaceVisual() {
  const bars = [20, 37, 32, 58, 52, 72, 88];
  return (
    <div
      aria-hidden
      className="order-first min-h-64 border border-[#383732] bg-coal shadow-[2rem_2rem_0_rgba(139,120,246,0.08)] sm:order-none sm:min-h-[18.5rem] sm:[transform:perspective(1000px)_rotateY(-3deg)]"
    >
      <div className="flex h-[2.2rem] items-center justify-between border-b border-[#383732] px-3 text-[0.5rem] tracking-[0.12em] text-[#85837d]">
        <span>MAKEDIT / SYSTEM 01</span>
        <span className="text-accent">LIVE</span>
      </div>
      <div className="grid min-h-[13.5rem] grid-cols-[3rem_1fr]">
        <div className="flex flex-col items-center gap-4 border-r border-[#383732] pt-[1.1rem]">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={cn("size-[0.7rem] border", i === 0 ? "border-accent bg-accent" : "border-[#6e6c65]")} />
          ))}
        </div>
        <div className="px-[1.4rem] py-[1.2rem]">
          <div className="flex items-end justify-between text-[0.5rem] text-[#77756f]">
            <span>PRODUCT OVERVIEW</span>
            <b className="text-[2.7rem] tracking-[-0.08em] text-paper">24</b>
          </div>
          <div className="flex h-[5.5rem] items-end gap-[3%] border-b border-[#44433f]">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} className={cn("flex-1", i === 3 ? "bg-accent" : "bg-[#353430]")} />
            ))}
          </div>
          <div className="grid grid-cols-3 pt-4 text-[0.6rem]">
            {[
              ["STATUS", "ACTIVE"],
              ["BUILD", "01.24"],
              ["HEALTH", "STABLE"],
            ].map(([k, v]) => (
              <span key={k} className="flex flex-col gap-1.5">
                <small className="text-[0.45rem] text-[#66645f]">{k}</small>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#383732] px-4 py-3 font-mono text-[0.58rem] text-[#77756f]">
        &lt;system&gt; interface → logic → data &lt;/system&gt;
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "flex flex-col overflow-hidden bg-ink pt-24 pb-6 text-paper sm:min-h-svh sm:pt-[7.5rem] sm:pb-8 desk:pt-[7.5rem]",
        gutter,
      )}
    >
      <div className="flex justify-between text-[0.62rem] font-semibold tracking-[0.15em] text-[#a5a39c] uppercase">
        <span>{site.kicker}</span>
        <span className="hidden sm:inline">{site.location}</span>
      </div>

      <div className="mt-20 mb-12 sm:mt-auto sm:mb-10">
        <h1
          id="hero-title"
          className="text-[clamp(3.25rem,16vw,5.5rem)] leading-[0.84] font-extrabold tracking-[-0.085em] sm:text-hero motion-safe:animate-rise"
        >
          MAKE WHAT <span className="text-accent">MATTERS.</span>
          <br />
          EDIT WHAT <span className="text-transparent [-webkit-text-stroke:1px_var(--color-paper)]">DOESN&apos;T.</span>
        </h1>
      </div>

      <div className="grid items-end gap-12 sm:grid-cols-2 desk:grid-cols-[0.78fr_1.22fr] desk:gap-[8vw]">
        <div className="max-w-[34rem]">
          <p className="mb-4 text-[0.95rem] leading-normal sm:text-[clamp(1rem,1.3vw,1.25rem)]">
            From new digital products to better existing systems, Makedit turns complex ideas into practical digital
            experiences.
          </p>
          <p lang="ko" className="text-[0.88rem] text-[#96948e]">
            새로운 서비스를 만들고, 기존의 경험을 더 나은 방향으로 개선합니다.
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink href="/#contact">프로젝트 문의하기</ButtonLink>
            <ButtonLink href="/#work" variant="ghost" down>
              프로젝트 보기
            </ButtonLink>
          </div>
        </div>
        <InterfaceVisual />
      </div>

      <div aria-hidden className="mt-12 flex items-center gap-4 text-[0.5rem] tracking-[0.15em] text-[#77756f] sm:mt-8">
        <span>SCROLL TO EXPLORE</span>
        <i className="h-px flex-1 bg-[#4a4944]" />
      </div>
    </section>
  );
}
