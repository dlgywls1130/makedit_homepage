# 배포 가이드 — Cloudflare Workers (Free)

> 기준일 2026-10-16. 로컬에서 `opennextjs-cloudflare build` + `wrangler dev`로 동작을 확인했습니다.
> 실제 Cloudflare 계정 배포는 아직 하지 않았습니다.

## 구조

```
GitHub (main 브랜치 push) ──► Cloudflare Workers Builds ──► makedit-web Worker ──► makedit.co.kr
Sanity 발행 ── webhook ──► Deploy Hook URL ──┘ (재빌드 1~2분)
```

- 프로젝트 페이지는 **빌드할 때 모두 정적으로 생성**되고, Workers Static Assets에서 제공됩니다.
  (`open-next.config.ts`의 static assets cache + cache interception)
- 요청마다 Next.js 서버를 띄우지 않으므로 Free 플랜의 **요청당 CPU 10ms 제한**을 넘지 않도록 설계했습니다.
- 콘텐츠가 바뀌면 Sanity webhook이 **Deploy Hook**을 호출해 사이트 전체를 다시 빌드합니다.
  이 방식에서는 `/api/revalidate`가 쓰이지 않습니다(Vercel로 옮길 때를 위해 남겨 둔 경로입니다).

### 측정값 (로컬 빌드)

| 항목 | 값 | Free 한도 |
| --- | --- | --- |
| Worker 크기 (gzip) | 2.41 MiB | 3 MiB |
| 정적 파일 수 | 155개 | 20,000개 |

여유가 약 0.6 MiB라 의존성을 많이 추가하면 한도를 넘을 수 있습니다. 넘으면 Workers Paid($5/월)로 올립니다.

### Free 플랜에서 주의할 점

| 항목 | 내용 |
| --- | --- |
| 요청 수 | 하루 100,000건 |
| CPU | 요청당 10ms. 정적 페이지는 문제없지만, **Studio 미리보기(draft mode)**는 매번 렌더링하므로 제한을 넘어 실패할 수 있습니다. 실패하면 Paid로 올리거나 미리보기는 Studio 안에서만 사용합니다. |
| 문의 API | 검증 후 Resend 호출만 하므로 CPU 사용은 적습니다. |

## 1. Cloudflare에 Worker 연결 (최초 1회)

1. Cloudflare 대시보드 → **Workers & Pages → Create → Import a repository**
2. GitHub `dlgywls1130/makedit_homepage` 선택
3. 빌드 설정
   - **Root directory**: `web`
   - **Build command**: `npx opennextjs-cloudflare build`
   - **Deploy command**: `npx wrangler deploy`
4. **Build variables** (빌드 시점에 필요, 비밀 아님)
   - `NEXT_PUBLIC_SITE_URL` = `https://makedit.co.kr`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = (Sanity project ID)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2025-10-01`
   - `NEXT_PUBLIC_SANITY_STUDIO_URL` = `https://makedit.sanity.studio`
5. Worker → **Settings → Variables and Secrets** (실행 시점, **Secret**으로 저장)
   - `SANITY_API_READ_TOKEN`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`

> Sanity를 연결하기 전에도 배포는 됩니다. 프로젝트 영역은 "준비 중" 안내로 표시됩니다.

## 2. 도메인 연결

1. Cloudflare 대시보드 → **Add a domain** → `makedit.co.kr` (Free 플랜)
2. Cloudflare가 보여주는 **네임서버 2개**를 도메인 구매처 관리 화면에 입력
   - ⚠️ 이미 회사 메일(MX 레코드)이 있다면, 네임서버를 바꾸기 전에 Cloudflare DNS에 기존 레코드가 모두 들어왔는지 확인하세요.
3. 네임서버가 반영되면 Worker → **Settings → Domains & Routes → Add Custom Domain**에서 `makedit.co.kr`, `www.makedit.co.kr`를 추가합니다.
4. HTTPS 인증서는 자동으로 발급됩니다.

## 3. CMS 발행 → 자동 재배포

1. Worker → **Settings → Builds → Deploy Hooks → Create**, 브랜치 `main` → URL 복사
2. Sanity manage → **API → Webhooks → Create**
   - URL: 1번에서 복사한 Deploy Hook URL
   - Dataset `production`, Trigger: Create / Update / Delete
   - Filter: `_type in ["project","service","siteSettings"]`
   - HTTP method: POST
3. Studio에서 프로젝트를 발행하고 1~2분 뒤 사이트에 반영되는지 확인합니다.

Deploy Hook URL은 그 자체가 인증 정보입니다. 외부에 공개하지 마세요.

## 로컬에서 Cloudflare 환경으로 확인하기

```bash
cd web && npm run preview
```
