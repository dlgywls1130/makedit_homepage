# Makedit 홈페이지 아키텍처

> 기준일 2026-10-16. 요금·한도는 각 서비스 공식 페이지에서 이 날짜에 확인했으며, 바뀔 수 있습니다.

## 1. 전체 구조

```
┌──────────────── Sanity (Content Lake + 이미지 CDN) ───────────────┐
│  Studio (makedit.sanity.studio, 무료 호스팅)                       │
│   └ 프로젝트 / 카테고리 / 담당 업무 / 사이트 설정 편집, 이미지 업로드  │
└──────┬───────────────────────────────┬────────────────────────────┘
       │ GROQ (published, 서버에서만)   │ Webhook (발행·수정·삭제 시)
       ▼                               ▼
┌──────────────────── Next.js 16 (App Router) ─────────────────────┐
│ /, /work, /work/[slug], /privacy  → 정적 생성 + 태그 기반 재검증    │
│ /api/revalidate      → 서명 검증 후 revalidateTag                 │
│ /api/draft-mode/*    → Studio 미리보기(초안) 전용                  │
│ /api/contact         → 검증 → Resend로 이메일 전달                 │
└───────────────────────────────────────────────────────────────────┘
       │ 호스팅: Vercel Pro 또는 Cloudflare Workers(OpenNext)
       ▼
  makedit.co.kr (기존 도메인 유지, DNS만 연결)
```

- **repo 구성**: `web/`(Next.js 사이트), `studio/`(Sanity Studio). 별도 배포 단위이며 서로의 코드를 import하지 않습니다.
- **Kotlin 백엔드 서버 없음**: 서버 기능은 위 4개의 API 라우트뿐이며 모두 서버리스로 동작합니다.

## 2. 렌더링 전략과 이유

| 페이지 | 방식 | 갱신 |
| --- | --- | --- |
| `/`, `/work`, `/privacy` | 빌드 시 정적 생성 (○) | Sanity webhook → `revalidateTag` |
| `/work/[slug]` | 공개 slug는 빌드 시 생성 (●), 이후 추가된 slug는 첫 요청 시 생성 후 캐시 | 동일 |
| `/api/*` | 요청 시 실행 (ƒ) | — |

- 모든 페이지에 SSR을 쓰지 않습니다. 방문자는 항상 캐시된 HTML을 받고, 콘텐츠가 바뀔 때만 다시 생성됩니다.
- 순수 정적 export(`output: 'export'`)는 쓰지 않았습니다. 문의 폼 API, 발행 전 미리보기(draft mode), 재빌드 없는 콘텐츠 갱신이 모두 불가능해지기 때문입니다.
- **Cache Components(`cacheComponents`)는 의도적으로 껐습니다.** Next.js 16 문서상 이 기능은 Node.js 런타임을 요구하고, Cloudflare용 OpenNext는 PPR과의 일부 조합을 아직 지원하지 않습니다. 기존 방식(fetch 캐시 + 태그 재검증 + ISR)은 Vercel과 Cloudflare 모두에서 지원됩니다.
- 조회 오류는 일부러 예외로 던집니다. ISR 중 Sanity 장애가 나면 Next.js가 빈 페이지를 캐시하는 대신 마지막 정상 페이지를 계속 제공합니다. Sanity가 아직 연결되지 않은 경우에만 빈 상태 화면을 렌더링합니다.

## 3. 공개 / 비공개 / 초안

| 상태 | 사이트 노출 | 비고 |
| --- | --- | --- |
| 초안 (발행 전) | ✕ | Sanity 기본 기능. 공개 API로 조회되지 않음 |
| 발행 + `공개 상태 = 공개` | ○ | 목록·상세·sitemap에 포함 |
| 발행 + `공개 상태 = 비공개` | ✕ | 목록·상세·sitemap에서 제외, 직접 URL 접근 시 404 |
| 발행 취소 (Unpublish) | ✕ | 다시 초안 상태가 됨 |

⚠️ **Free 플랜의 데이터셋은 public만 가능합니다.** *발행된* 문서는 project ID를 아는 사람이 API로 조회할 수 있습니다(비공개 상태 포함). 고객 정보처럼 민감한 프로젝트는 비공개 설정 대신 **발행 취소**로 초안에 두거나, private 데이터셋이 가능한 Growth 플랜을 쓰세요. Studio 필드 설명에도 같은 안내를 넣었습니다.

## 4. CMS 데이터 모델

- `project`: 요구사항의 모든 필드 + 상세 콘텐츠(배경 / 해결 과제 / 수행 내용 / 구현 결과 / 본문 / 갤러리 / 외부 링크). 필드는 5개 탭(기본 정보 · 상세 내용 · 이미지 · SEO · 노출 설정)으로 묶었습니다.
  - 명세의 `status`(초안·공개)는 `status`(공개·비공개)로 구현했습니다. 초안은 Sanity의 기본 Draft/Published 기능이 맡습니다.
  - 명세의 `services`(담당 업무)는 재사용할 수 있는 `service` 문서를 참조합니다.
- `category`, `service`: 재사용하는 분류 문서
- `siteSettings`(싱글톤): 상호·대표자·사업자번호·주소·이메일·전화·개인정보 보호책임자. 비워 두면 푸터에 "등록 예정", 개인정보처리방침에 "[확인 필요]"로 표시됩니다.
- `imageWithAlt`: 대체 텍스트(필수)·캡션·핫스팟
- slug: 같은 타입 안에서 중복을 막고(Sanity 기본 기능), 형식을 검증합니다(영문 소문자·숫자·하이픈).
- 정렬: `sortOrder` 오름차순 → 연도 최신순 → 생성일 최신순

## 5. 배포 옵션 비교

| | **Vercel Pro** | **Cloudflare Workers + OpenNext** | Cloudflare Pages 정적 export |
| --- | --- | --- | --- |
| 상업적 사용 | Pro 필요 (Hobby는 비상업 전용) | 무료 플랜에서도 가능 | 가능 |
| 월 비용 | $20/seat | $0 ~ $5 (Workers Paid) | $0 |
| ISR / revalidateTag | 기본 지원 | 지원 (KV/R2 등 바인딩 설정 필요) | ✕ (재빌드 필요) |
| Draft mode 미리보기 | 지원 | 지원 | ✕ |
| 문의 폼 API | 지원 | 지원 | 별도 Functions 필요 |
| Worker 크기 제한 | — | Free 3 MiB / Paid 10 MiB (gzip) | — |
| 운영 난이도 | 가장 낮음 | 중간 (wrangler·바인딩 설정) | 낮지만 기능 제한 |

**권장**: 월 비용을 최소화하려면 **Cloudflare Workers + OpenNext**를 쓰고, 번들이 3 MiB를 넘으면 Workers Paid($5)로 올립니다. 설정 부담을 최소화하려면 **Vercel Pro**가 맞습니다. 코드는 두 환경 모두에 맞춰 작성했습니다(이미지 최적화는 Sanity CDN을 써서 호스트 쪽 이미지 변환 비용이 들지 않음). Cloudflare가 추천하는 `vinext`는 아직 실험 단계라 이번에는 제외했습니다.

## 6. 운영 비용 (예상)

| 항목 | 비용 |
| --- | --- |
| Sanity Free | $0 — 20 seats, 문서 10k, 에셋·대역폭 각 100GB, API 250k/월, CDN 1M/월 |
| 호스팅 | $0~5 (Cloudflare) 또는 $20 (Vercel Pro) |
| Resend (문의 메일) | 무료 플랜 범위에서 시작 가능 — 도입 시 현재 한도를 다시 확인 |
| 도메인 | 보유 중 (갱신비만) |

## 7. 보안

- 브라우저에 노출되는 값: `NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / API_VERSION / STUDIO_URL`. 모두 비밀이 아닙니다.
- 서버 전용 값: `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `RESEND_API_KEY`, `CONTACT_*`. `server-only`로 보호되는 모듈에서만 읽습니다.
- `/api/revalidate`: Sanity webhook 서명을 검증합니다.
- `/api/draft-mode/enable`: Studio가 발급한 단기 secret을 검증합니다(`next-sanity`).
- 문의 폼: 서버에서 다시 검증, 20KB 크기 제한, honeypot 필드. 요청 횟수 제한이나 CAPTCHA(Cloudflare Turnstile 등)는 스팸이 실제로 생기면 추가합니다.
- 응답 헤더: `nosniff`, `Referrer-Policy`, `Permissions-Policy`. `frame-ancestors`는 자기 자신과 Studio 도메인만 허용합니다.
