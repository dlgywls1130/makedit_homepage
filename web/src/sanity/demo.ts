import "server-only";

import type { ProjectDetail } from "./types";
import { isSanityConfigured } from "./env";

/**
 * Sample projects for previewing the Works flow locally before Sanity is connected.
 * Never used in production builds, and never used once a Sanity project ID is set.
 */
export const demoMode = !isSanityConfigured && process.env.NODE_ENV === "development";

type Seed = Pick<ProjectDetail, "slug" | "title" | "category" | "excerpt" | "sample"> & { services: string[]; technologies: string[] };

const seeds: Seed[] = [
  { slug: "sample-brand-site", title: "Brand Website", category: "homepage", sample: "commerce", excerpt: "브랜드 메시지를 중심으로 구성한 반응형 홈페이지 샘플.", services: ["UI Design", "Frontend"], technologies: ["Next.js", "TypeScript"] },
  { slug: "sample-landing", title: "Campaign Landing", category: "homepage", sample: "control", excerpt: "캠페인 전환을 위한 단일 페이지 랜딩 샘플.", services: ["Frontend"], technologies: ["Next.js"] },
  { slug: "sample-corporate", title: "Corporate Website", category: "corporate", sample: "workspace", excerpt: "회사 소개, 사업 영역, 채용 정보를 담은 기업 사이트 샘플.", services: ["UI Design", "Frontend", "CMS"], technologies: ["Next.js", "Sanity"] },
  { slug: "sample-operations", title: "Operations Workspace", category: "corporate", sample: "workspace", excerpt: "업무 흐름과 데이터를 하나의 인터페이스로 연결하는 사내 시스템 샘플.", services: ["Frontend", "Backend API"], technologies: ["React", "Kotlin", "PostgreSQL"] },
  { slug: "sample-commerce", title: "Commerce Reframed", category: "ecommerce", sample: "commerce", excerpt: "상품 탐색부터 구매까지 단계를 줄인 쇼핑몰 샘플.", services: ["UX Improvement", "Frontend"], technologies: ["Next.js", "TypeScript"] },
  { slug: "sample-store-renewal", title: "Store Renewal", category: "ecommerce", sample: "commerce", excerpt: "기존 쇼핑몰의 상세·장바구니 경험을 개선한 리뉴얼 샘플.", services: ["Redesign", "Frontend"], technologies: ["React"] },
  { slug: "sample-service-app", title: "Service Control", category: "app", sample: "control", excerpt: "서비스 상태와 핵심 지표를 확인하는 관리 앱 샘플.", services: ["App UI", "Backend API"], technologies: ["Kotlin", "REST API"] },
  { slug: "sample-booking-app", title: "Booking App", category: "app", sample: "control", excerpt: "예약과 알림 흐름을 단순하게 정리한 모바일 앱 샘플.", services: ["App UI", "Backend API"], technologies: ["Kotlin", "Java"] },
];

export const demoProjects: ProjectDetail[] = seeds.map((s, i) => ({
  _id: `demo-${i}`,
  _updatedAt: new Date(0).toISOString(),
  year: null,
  thumbnail: null,
  client: null,
  gallery: null,
  description: null,
  background: "로컬 미리보기용 샘플 데이터입니다. Sanity를 연결하면 실제 프로젝트 내용으로 대체됩니다.",
  challenge: "프로젝트별 해결 과제가 이 영역에 표시됩니다.",
  approach: "수행 내용(기획, 디자인, 개발 범위)이 이 영역에 표시됩니다.",
  outcome: "구현 결과가 이 영역에 표시됩니다.",
  externalUrl: null,
  seoTitle: null,
  seoDescription: null,
  publishedAt: null,
  ...s,
}));
