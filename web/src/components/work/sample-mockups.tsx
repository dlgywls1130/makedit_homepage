// Illustrative UI mockups from the design, shown only while the CMS has no public projects.
// They are decorative (aria-hidden) and every card is labelled "Sample".

export type SampleVisual = "workspace" | "commerce" | "control";

export const sampleProjects: { title: string; category: string; overview: string; visual: SampleVisual }[] = [
  {
    title: "Operations Workspace",
    category: "Enterprise System",
    overview: "복잡한 업무 흐름과 데이터를 하나의 명확한 인터페이스로 연결하는 운영 시스템 콘셉트.",
    visual: "workspace",
  },
  {
    title: "Commerce Reframed",
    category: "E-commerce",
    overview: "상품 탐색부터 구매까지 불필요한 단계를 덜어낸 스토어프런트 경험.",
    visual: "commerce",
  },
  {
    title: "Service Control",
    category: "Web Application",
    overview: "실시간 상태와 핵심 지표를 빠르게 파악할 수 있는 서비스 관리 도구.",
    visual: "control",
  },
];

const base = "size-full transition-transform duration-600 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.025]";

export function SampleMockup({ type }: { type: SampleVisual }) {
  if (type === "commerce") {
    return (
      <div aria-hidden className={`${base} relative bg-[#d6d0c4] p-[5%] text-[#191919]`}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[0.35rem] rounded-full bg-[#807a70]" />
          ))}
        </div>
        <div className="flex justify-between border-b py-[3%] text-[0.45rem] font-bold">
          FORM / FUNCTION <span>SHOP &nbsp; EDITORIAL &nbsp; CART (0)</span>
        </div>
        <div className="relative grid h-[70%] place-items-center">
          <div className="h-[65%] w-[48%] -rotate-8 rounded-[50%_50%_42%_42%] bg-[#292929] shadow-[inset_-1.5rem_-1rem_0_#3b3b3b]" />
          <p className="absolute top-[5%] left-[2%] text-[clamp(.7rem,1.2vw,1.2rem)] font-bold">
            OBJECT
            <br />
            NO. 001
          </p>
        </div>
        <div className="flex justify-between border-t pt-[4%] text-[0.48rem]">
          <b>MADE FOR DAILY USE.</b>
          <span>VIEW OBJECT ↗</span>
        </div>
      </div>
    );
  }

  if (type === "control") {
    return (
      <div aria-hidden className={`${base} bg-[#27262b] p-[8%] text-white`}>
        <div className="border-b border-[#48464c] pb-[5%] font-mono text-[0.5rem] text-[#8f8d93]">SYSTEM STATUS / 14:28</div>
        <div className="mx-auto my-[12%] grid aspect-square w-[46%] rotate-45 place-items-center rounded-full border-[1.3rem] border-[#45434b] border-t-accent border-r-accent">
          <span className="-rotate-45 text-[clamp(1.5rem,3.5vw,3.5rem)] font-bold tracking-[-0.08em]">
            87<small className="text-[0.5em] text-accent">%</small>
          </span>
        </div>
        {[
          ["SERVICES", "12 ACTIVE"],
          ["RESPONSE", "128 MS"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-t border-[#48464c] py-[4%] text-[0.45rem]">
            <span>{k}</span>
            <b className="text-accent">{v}</b>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden className={`${base} grid grid-cols-[22%_1fr] bg-[#dddcd6] p-[7%] text-[#171717]`}>
      <div className="flex flex-col gap-[10%] bg-[#171717] p-[12%] text-[clamp(.35rem,.6vw,.65rem)] text-white">
        <b className="mb-[15%] text-2xl text-accent">M/</b>
        <span>OVERVIEW</span>
        <span>PROJECTS</span>
        <span>REPORTS</span>
        <span>TEAM</span>
      </div>
      <div className="overflow-hidden bg-[#f6f5f1] p-[6%]">
        <div className="mb-[12%] flex justify-between text-[0.5rem] text-[#777]">
          <span>OPERATIONS / OVERVIEW</span>
          <i className="bg-accent p-1 not-italic text-white">MJ</i>
        </div>
        <strong className="text-[clamp(1rem,2.4vw,2.6rem)] tracking-[-0.06em]">Good morning.</strong>
        <div className="mt-[8%] grid grid-cols-2 gap-[3%]">
          <div className="flex flex-col border border-[#ccc] p-[8%]">
            <small className="text-[0.42rem]">OPEN PROJECTS</small>
            <b className="my-2 text-[clamp(1.3rem,3vw,3rem)]">12</b>
            <em className="text-[0.38rem] text-[#666]">+ 3 this month</em>
          </div>
          <div className="flex flex-col border border-[#ccc] p-[8%]">
            <small className="text-[0.42rem]">COMPLETION</small>
            <b className="my-2 text-[clamp(1.3rem,3vw,3rem)]">84%</b>
            <span className="flex h-7 items-end gap-[5%]">
              {[40, 65, 50, 85, 40].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} className="w-[15%] bg-accent" />
              ))}
            </span>
          </div>
          <div className="col-span-2 flex flex-col border border-[#ccc] p-[4%]">
            <small className="text-[0.42rem]">RECENT ACTIVITY</small>
            {[
              ["Platform redesign", "IN REVIEW"],
              ["API integration", "BUILDING"],
              ["Product launch", "COMPLETE"],
            ].map(([t, s]) => (
              <p key={t} className="mt-1 grid grid-cols-[1rem_1fr_auto] border-t border-[#ccc] pt-1 text-[0.42rem]">
                <i className="size-[0.35rem] self-center rounded-full bg-accent" />
                {t} <b className="text-[0.35rem]">{s}</b>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
