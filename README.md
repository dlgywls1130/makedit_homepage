# Makedit — makedit.co.kr

**MAKE WHAT MATTERS. EDIT WHAT DOESN'T.**

메이케딧 공식 홈페이지. Next.js 16 + TypeScript + Tailwind CSS 4, Sanity CMS로 포트폴리오를 관리합니다.
설계 근거와 배포 비교는 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)를 참고하세요.

```
web/      Next.js 사이트 (App Router)
studio/   Sanity Studio (CMS 관리자 화면)
docs/     아키텍처 문서
```

## 로컬 실행

```bash
cd web && cp .env.example .env.local && npm install && npm run dev
```

Sanity를 연결하지 않아도 사이트는 동작합니다. 이 경우 프로젝트 영역에는 빈 상태 화면이 표시됩니다.

## Sanity 연결 (최초 1회)

1. https://www.sanity.io/manage 에서 프로젝트를 만들고 project ID를 확인합니다. 데이터셋 이름은 `production`으로 합니다.
2. `studio/.env.example`을 `studio/.env`로 복사하고 project ID를 입력합니다.
3. Studio 실행·배포
   ```bash
   cd studio && npm install && npm run dev      # http://localhost:3333
   npm run deploy                                # https://makedit.sanity.studio
   ```
4. manage → **API → CORS origins**에 `http://localhost:3000`, `https://makedit.co.kr`을 추가합니다. Presentation 미리보기를 쓰려면 "Allow credentials"를 체크합니다.
5. manage → **API → Tokens**에서 *Viewer* 토큰을 만들어 `web/.env.local`의 `SANITY_API_READ_TOKEN`에 넣습니다. 이 토큰은 미리보기에만 사용합니다.
6. manage → **API → Webhooks**에 webhook을 추가합니다.
   - URL: `https://makedit.co.kr/api/revalidate`
   - Dataset: `production` · Trigger: Create / Update / Delete
   - Filter: `_type in ["project","service","siteSettings"]`
   - Projection: `{_type}`
   - Secret: 임의의 긴 문자열. `SANITY_REVALIDATE_SECRET`과 같은 값을 씁니다.
7. Studio에서 **사이트 설정**에 실제 사업자 정보를 입력하고, 담당 업무·프로젝트를 등록합니다. 프로젝트 카테고리는 고정 4종(홈페이지·회사·기업·쇼핑몰·앱)에서 고릅니다.

## 문의 폼

`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`을 설정하기 전에는 폼이 "접수 시스템 준비 중" 오류를 표시합니다(성공 메시지를 꾸며내지 않습니다).
Resend에서 makedit.co.kr 도메인을 인증(DNS 레코드 추가)한 뒤 값을 넣으세요.

## 스크립트

| 위치 | 명령 | 설명 |
| --- | --- | --- |
| web | `npm run dev` / `build` / `lint` | 개발 서버 / 프로덕션 빌드 / ESLint |
| studio | `npm run dev` / `deploy` / `typecheck` | Studio 로컬 실행 / 배포 / 타입 검사 |
