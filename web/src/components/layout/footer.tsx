import Link from "next/link";
import { getSiteSettings } from "@/sanity/content";
import { nav, site } from "@/lib/site";
import { Arrow, gutter, cn } from "../ui/primitives";
import { Wordmark } from "./header";

/** Business details come from the Sanity "사이트 설정" document; nothing is invented here. */
export async function Footer() {
  const s = await getSiteSettings();
  const year = new Date().getFullYear();
  const business = [
    s.companyName && `상호 ${s.companyName}`,
    s.representative && `대표 ${s.representative}`,
    s.businessNumber && `사업자등록번호 ${s.businessNumber}`,
    s.address,
    s.phone,
  ].filter(Boolean);

  return (
    <footer className={cn("border-t border-line-dark bg-ink pb-8 text-paper", gutter)}>
      <div className="grid min-h-96 content-around items-center gap-8 sm:content-normal sm:min-h-[27rem] sm:grid-cols-[1fr_auto] desk:grid-cols-[1fr_2fr_auto]">
        <Link href="/" className="mt-12 self-start sm:col-span-full desk:col-span-1" aria-label="Makedit 홈">
          <Wordmark />
        </Link>
        <p className="text-[clamp(2.4rem,5vw,5.5rem)] leading-[0.9] font-bold tracking-[-0.07em] sm:col-start-1 desk:col-start-2">
          MAKE WHAT MATTERS.
          <br />
          EDIT WHAT DOESN&apos;T.
        </p>
        <Link
          href="/#contact"
          aria-label="프로젝트 문의하기"
          className="group grid size-18 place-items-center rounded-full border border-[#5c5a55] text-[1.4rem] transition-colors duration-250 hover:border-accent hover:bg-accent hover:text-ink sm:size-24"
        >
          <Arrow />
        </Link>
      </div>

      <div className="grid gap-8 border-t border-line-dark pt-6 text-[0.58rem] text-muted-dark desk:grid-cols-[1.5fr_1fr_2fr]">
        <div className="max-w-[26rem] space-y-3 leading-normal">
          <p>{site.summary}</p>
          {business.length > 0 && <p>{business.join(" · ")}</p>}
        </div>
        <nav aria-label="푸터 메뉴" className="flex flex-wrap gap-8 desk:justify-between desk:gap-4">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="uppercase hover:text-paper">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-8 desk:justify-between desk:gap-4">
          {s.email ? (
            <a href={`mailto:${s.email}`} className="hover:text-paper">
              {s.email}
            </a>
          ) : (
            <span>이메일 등록 예정</span>
          )}
          <Link href="/privacy" className="hover:text-paper">
            PRIVACY
          </Link>
          <span>© {year} MAKEDIT</span>
        </div>
      </div>
    </footer>
  );
}
