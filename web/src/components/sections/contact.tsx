import { getSiteSettings } from "@/sanity/content";
import { Section, SectionIntro } from "../ui/primitives";
import { ContactForm } from "./contact-form";

export async function Contact() {
  const { email } = await getSiteSettings();

  return (
    <Section id="contact" aria-labelledby="contact-title" className="bg-coal text-paper">
      <SectionIntro
        id="contact-title"
        light
        eyebrow="08 / Start a project"
        title={
          <>
            HAVE A PROJECT
            <br />
            IN <span className="text-accent">MIND?</span>
          </>
        }
        copy="Tell us what you are building, improving, or trying to solve."
      />
      <div className="grid gap-[8vw] border-t border-[#45443f] pt-12 desk:grid-cols-[1fr_2fr]">
        <div className="grid sm:grid-cols-2 desk:block">
          <p className="max-w-[22rem] text-[0.86rem] leading-[1.8] text-[#aaa8a2]">
            새로 만드는 프로젝트도, 이미 운영 중인 서비스를 개선하는 일도 좋습니다. 현재 상황과 필요한 도움을 알려주세요.
          </p>
          <dl className="mt-8 sm:mt-0 desk:mt-20">
            <dt className="mb-2.5 text-[0.52rem] tracking-[0.13em] text-muted-dark">GENERAL INQUIRIES</dt>
            <dd className="mb-8 text-[0.72rem]">
              {email ? (
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              ) : (
                <span className="text-muted-dark">이메일 등록 예정</span>
              )}
            </dd>
            <dt className="mb-2.5 text-[0.52rem] tracking-[0.13em] text-muted-dark">RESPONSE</dt>
            <dd className="text-[0.72rem]">연락 가능한 정보와 함께 회신드릴게요.</dd>
          </dl>
        </div>
        <ContactForm fallbackEmail={email} />
      </div>
    </Section>
  );
}
