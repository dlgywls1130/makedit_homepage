// Brand + marketing copy (from the Figma Make design). Portfolio content lives in Sanity, never here.

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://makedit.co.kr").replace(/\/$/, "");

export const site = {
  name: "Makedit",
  nameKo: "메이케딧",
  tagline: "MAKE WHAT MATTERS. EDIT WHAT DOESN'T.",
  kicker: "Web & Application Development Partner",
  location: "Seoul / KR",
  summary: "Makedit creates new digital products and makes existing ones better — from interface to infrastructure.",
  description:
    "메이케딧은 기업 웹사이트, 웹 애플리케이션, 이커머스, 프론트엔드·백엔드 개발로 새로운 디지털 서비스를 만들고 기존 서비스를 개선하는 개발 에이전시입니다.",
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export const makeEdit = [
  {
    key: "make",
    index: "M / 01",
    word: "MAKE",
    lead: "From idea to implementation.",
    body: "실제 비즈니스의 필요를 지원하는 웹사이트, 웹 애플리케이션과 디지털 제품을 설계하고 개발합니다.",
    items: ["New Products", "Web Development", "Application Development", "Digital Experiences"],
  },
  {
    key: "edit",
    index: "E / 02",
    word: "EDIT",
    lead: "Improve what already exists.",
    body: "기존 서비스를 현대화하고, 사용성을 개선하며, 인터페이스를 다듬어 디지털 제품이 더 잘 작동하게 만듭니다.",
    items: ["Redesign", "Legacy Modernization", "UX Improvement", "Performance Optimization"],
  },
] as const;

export const services = [
  { title: "Web Development", body: "기업 웹사이트, 랜딩 페이지, 맞춤형 웹사이트와 반응형 웹 경험을 설계하고 개발합니다." },
  { title: "Web Applications", body: "비즈니스 애플리케이션, 내부 시스템, 관리 도구, 대시보드와 업무 중심 애플리케이션을 구축합니다." },
  { title: "Frontend Development", body: "반응형 인터페이스, 인터랙티브 UI, 컴포넌트 아키텍처와 디자인 시스템을 구현합니다." },
  { title: "Backend Development", body: "Kotlin과 Java 기반 서버 애플리케이션, API, 데이터베이스와 비즈니스 로직을 개발합니다." },
  { title: "E-commerce", body: "온라인 스토어, 쇼핑몰 커스터마이징과 구매 경험을 비즈니스에 맞게 개선합니다." },
  { title: "App Development", body: "프로젝트 요구사항에 맞는 디지털 애플리케이션과 필요한 시스템 연동을 구현합니다." },
  { title: "Maintenance & Improvement", body: "기존 서비스의 기능 개선, 버그 수정, UI 개선과 기술 현대화를 지속적으로 지원합니다." },
] as const;

export const capabilities = {
  frontend: ["React", "Next.js", "TypeScript", "Responsive UI", "Component Architecture"],
  backend: ["Kotlin", "Java", "REST APIs", "Database Integration", "Business Logic"],
} as const;

export const values = [
  { title: "Business First", body: "기술적 선택은 비즈니스 목표와 실제 사용자의 필요에서 시작합니다." },
  { title: "Design to Development", body: "시각적 콘셉트와 디자인 시스템을 일관된 반응형 인터페이스로 구현합니다." },
  { title: "Practical Engineering", body: "요구사항에 적합하고 유지보수 가능한 현실적인 해법을 만듭니다." },
  { title: "Continuous Improvement", body: "출시 이후에도 반복적인 개선과 유지보수를 통해 제품의 완성도를 높입니다." },
] as const;

export const processSteps = [
  { title: "Discover", body: "비즈니스, 프로젝트 목표, 범위와 요구사항을 이해합니다." },
  { title: "Define", body: "구조와 기술 방향, 우선순위, 실행 계획을 명확히 합니다." },
  { title: "Design & Build", body: "적합한 워크플로로 인터페이스와 필요한 기능을 구현합니다." },
  { title: "Validate", body: "기능, 반응형 동작, 일관성과 품질을 함께 검토합니다." },
  { title: "Launch & Improve", body: "합의한 범위에 따라 배포, 인계, 유지보수와 후속 개선을 지원합니다." },
] as const;

export const audiences = [
  "새로운 웹사이트 또는 디지털 제품을 계획하는 비즈니스",
  "프론트엔드 구현 지원이 필요한 팀",
  "기존 시스템을 현대화하려는 기업",
  "스토어프런트 경험을 개선하려는 이커머스 비즈니스",
  "백엔드 또는 API 개발이 필요한 팀",
  "지속적인 기술 지원을 찾는 조직",
] as const;

export const pad = (n: number) => String(n).padStart(2, "0");
