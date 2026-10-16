import { makeEdit } from "@/lib/site";
import { Section, SectionIntro, cn } from "../ui/primitives";

export function MakeEdit() {
  return (
    <Section id="about" aria-labelledby="make-edit-title" className="bg-paper">
      <SectionIntro
        id="make-edit-title"
        eyebrow="01 / Make + Edit"
        title={
          <>
            BUILD SOMETHING NEW.
            <br />
            MAKE SOMETHING <span className="text-accent">BETTER.</span>
          </>
        }
      />
      <div className="grid border-y border-ink sm:grid-cols-2">
        {makeEdit.map((p) => {
          const edit = p.key === "edit";
          return (
            <article
              key={p.key}
              className={cn(
                "flex min-h-[32rem] flex-col p-[1.2rem] sm:min-h-[39rem] sm:p-6",
                edit ? "bg-ink text-paper" : "border-b border-ink sm:border-r sm:border-b-0",
              )}
            >
              <div className="font-mono text-[0.65rem]">{p.index}</div>
              <h3
                className={cn(
                  "mt-12 mb-auto text-[clamp(5rem,11vw,11rem)] leading-[0.8] font-bold tracking-[-0.09em]",
                  edit && "text-accent",
                )}
              >
                {p.word}
              </h3>
              <div className="grid gap-8 border-t border-current pt-5 desk:grid-cols-2">
                <h4 className="text-[1.05rem] font-bold">{p.lead}</h4>
                <p className={cn("text-[0.82rem] leading-[1.7]", edit ? "text-[#aaa8a2]" : "text-muted")}>{p.body}</p>
                <ul className="text-[0.65rem] tracking-[0.08em] uppercase desk:col-start-2">
                  {p.items.map((item) => (
                    <li key={item} className="border-t border-[rgba(127,127,127,0.45)] py-2.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
