import Link from "next/link";
import { getSiteSettings } from "@/sanity/content";
import { nav, site } from "@/lib/site";
import { ButtonLink, Container } from "../ui/primitives";

/** Business details come from the Sanity "사이트 설정" document. Unknown values stay visibly unset. */
export async function Footer() {
  const s = await getSiteSettings();
  const year = new Date().getFullYear();

  const info: [string, string | null][] = [
    ["상호", s.companyName],
    ["대표", s.representative],
    ["사업자등록번호", s.businessNumber],
    ["주소", s.address],
    ["이메일", s.email],
    ["전화", s.phone],
  ];

  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 border-b border-line-dark pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-title font-bold tracking-tight">
              새로운 서비스를 만들거나,
              <br />
              <span className="text-muted-dark">기존 서비스를 개선할 계획이 있다면.</span>
            </p>
            <ButtonLink href="/#contact" variant="inverse" className="mt-10">
              프로젝트 문의하기
            </ButtonLink>
          </div>

          <nav aria-label="푸터 메뉴" className="md:col-span-2 md:col-start-8">
            <p className="mb-4 font-mono text-xs tracking-[0.14em] text-muted-dark uppercase">Menu</p>
            <ul className="space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="hover:text-accent">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-xs tracking-[0.14em] text-muted-dark uppercase">Company</p>
            <dl className="space-y-2 text-sm">
              {info.map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-muted-dark">{label}</dt>
                  <dd className={value ? "" : "text-muted-dark/60"}>
                    {value ? (
                      label === "이메일" ? (
                        <a href={`mailto:${value}`} className="hover:text-accent">
                          {value}
                        </a>
                      ) : (
                        value
                      )
                    ) : (
                      "등록 예정"
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-12 font-display text-[clamp(4rem,19vw,19rem)] leading-[0.8] font-extrabold tracking-[-0.06em] select-none"
        >
          MAKE<span className="text-muted-dark/40">DIT</span>
        </p>

        <div className="mt-10 flex flex-col justify-between gap-3 font-mono text-xs text-muted-dark md:flex-row">
          <p>{site.tagline}</p>
          <p>
            © {year} {s.companyName ?? "Makedit"}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
