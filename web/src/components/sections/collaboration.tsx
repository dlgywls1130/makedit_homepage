import { audiences, pad } from "@/lib/site";
import { ButtonLink, Section, eyebrowClass } from "../ui/primitives";

export function Collaboration() {
  return (
    <Section aria-labelledby="collab-title" className="bg-accent text-ink">
      <p className={eyebrowClass}>07 / Collaboration</p>
      <div className="my-16 grid items-end gap-12 sm:my-24 desk:grid-cols-[1.6fr_1fr] desk:gap-0">
        <h2 id="collab-title" className="text-[clamp(4rem,10vw,10rem)] leading-[0.8] font-extrabold tracking-[-0.09em]">
          LET&apos;S MAKE
          <br />
          IT <span className="text-paper">WORK.</span>
        </h2>
        <div>
          <p className="mb-8 max-w-[30rem] text-[1.05rem] leading-[1.55]">
            Whether you are starting from scratch or improving an existing service, let&apos;s find the right way forward.
          </p>
          <ButtonLink href="/#contact" variant="dark">
            함께 시작하기
          </ButtonLink>
        </div>
      </div>
      <ul className="grid border-t border-ink/60 sm:grid-cols-2">
        {audiences.map((a, i) => (
          <li
            key={a}
            className="border-b border-ink/60 py-5 text-[0.8rem] sm:odd:border-r sm:even:pl-6"
          >
            <span className="inline-block w-12 font-mono text-[0.58rem]">{pad(i + 1)}</span>
            {a}
          </li>
        ))}
      </ul>
    </Section>
  );
}
