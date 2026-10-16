import { getSiteSettings } from "@/sanity/content";
import { Container, SectionLabel } from "../ui/primitives";
import { ContactForm } from "./contact-form";

export async function Contact() {
  const { email } = await getSiteSettings();

  return (
    <section id="contact" aria-labelledby="contact-title" className="mt-24 border-t border-line py-24 md:mt-40 md:py-36">
      <Container className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionLabel index="08">Contact</SectionLabel>
          <h2 id="contact-title" className="mt-6 font-display text-display font-extrabold tracking-[-0.04em]">
            Make it.
            <br />
            <span className="text-muted">Or edit it.</span>
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-muted">
            프로젝트의 목적과 현재 상황을 알려주세요. 내용을 검토한 뒤 진행 방식과 다음 단계를 안내드립니다. 아직
            정리되지 않은 아이디어라도 괜찮습니다.
          </p>
          {email && (
            <p className="mt-8 text-sm">
              <span className="mr-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">Email</span>
              <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4 hover:text-accent">
                {email}
              </a>
            </p>
          )}
        </div>
        <div className="relative md:col-span-7">
          <ContactForm fallbackEmail={email} />
        </div>
      </Container>
    </section>
  );
}
