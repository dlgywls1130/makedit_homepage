import type { Metadata } from "next";
import { Container, PageTitle } from "@/components/ui/primitives";
import { getSiteSettings } from "@/sanity/content";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "메이케딧 개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

/**
 * DRAFT TEMPLATE. Must be reviewed (ideally by a legal professional) before launch.
 * Company details come from Sanity "사이트 설정"; anything unknown is shown as [확인 필요].
 */
export default async function PrivacyPage() {
  const s = await getSiteSettings();
  const tbd = <mark className="bg-accent/25 px-1 text-ink">[확인 필요]</mark>;
  const company = s.companyName ?? "메이케딧(Makedit)";

  return (
    <Container className="pt-36 pb-24 sm:pt-44 sm:pb-36">
      <PageTitle eyebrow="Privacy" title="개인정보처리방침" />

      <div className="max-w-3xl desk:ml-[25%] space-y-12 leading-[1.85] [&_h2]:text-xl [&_h2]:font-bold [&_li]:mt-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <p>
          {company}(이하 &lsquo;회사&rsquo;)는 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고 관련 고충을
          신속하게 처리하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
        </p>

        <section>
          <h2>1. 수집하는 개인정보 항목 및 수집 방법</h2>
          <ul>
            <li>필수: 이름, 회사명, 이메일, 프로젝트 유형, 문의 내용</li>
            <li>선택: 예상 예산, 희망 일정</li>
            <li>수집 방법: 홈페이지 프로젝트 문의 양식</li>
          </ul>
        </section>

        <section>
          <h2>2. 개인정보의 수집 및 이용 목적</h2>
          <p>프로젝트 문의 확인 및 회신, 상담 및 견적 안내.</p>
        </section>

        <section>
          <h2>3. 보유 및 이용 기간</h2>
          <p>문의 처리 완료 후 {tbd} 동안 보관한 뒤 지체 없이 파기합니다. 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.</p>
        </section>

        <section>
          <h2>4. 개인정보 처리의 위탁 및 국외 이전</h2>
          <p>회사는 원활한 문의 처리를 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.</p>
          <ul>
            <li>이메일 발송: Resend, Inc. (미국) — 문의 내용 전달 {tbd}</li>
            <li>웹사이트 호스팅: {tbd}</li>
          </ul>
          <p className="mt-3">국외 이전 항목, 이전 시기·방법, 보유 기간 등 법정 고지 사항: {tbd}</p>
        </section>

        <section>
          <h2>5. 개인정보의 파기</h2>
          <p>보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 복구할 수 없는 방법으로 지체 없이 파기합니다.</p>
        </section>

        <section>
          <h2>6. 정보주체의 권리</h2>
          <p>정보주체는 언제든지 개인정보의 열람, 정정, 삭제, 처리정지를 요구할 수 있으며, 아래 연락처로 요청하실 수 있습니다.</p>
        </section>

        <section>
          <h2>7. 동의를 거부할 권리</h2>
          <p>개인정보 수집·이용에 동의하지 않을 수 있으며, 이 경우 홈페이지를 통한 문의 접수가 제한됩니다.</p>
        </section>

        <section>
          <h2>8. 개인정보 보호책임자</h2>
          <ul>
            <li>성명: {s.privacyOfficer ?? tbd}</li>
            <li>이메일: {s.email ?? tbd}</li>
            <li>전화: {s.phone ?? tbd}</li>
          </ul>
        </section>

        <section>
          <h2>9. 시행일</h2>
          <p>이 개인정보처리방침은 {tbd}부터 적용됩니다.</p>
        </section>
      </div>
    </Container>
  );
}
