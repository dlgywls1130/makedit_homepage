// Brand + marketing copy. Portfolio content lives in Sanity, never here.

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://makedit.co.kr").replace(/\/$/, "");

export const site = {
  name: "Makedit",
  nameKo: "메이케딧",
  tagline: "MAKE WHAT MATTERS. EDIT WHAT DOESN'T.",
  description:
    "메이케딧은 기업 웹사이트, 웹 애플리케이션, 이커머스, 프론트엔드·백엔드 개발로 새로운 디지털 서비스를 만들고 기존 서비스를 개선하는 개발 에이전시입니다.",
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
] as const;

export const services = [
  {
    title: "Web Development",
    ko: "웹사이트 개발",
    body: "브랜드와 비즈니스 목표에 맞춘 기업 웹사이트를 기획부터 배포까지 제작합니다.",
  },
  {
    title: "Web Applications",
    ko: "웹 애플리케이션",
    body: "업무 도구, 고객 서비스, 관리자 화면처럼 실제로 쓰이는 기능 중심의 웹 서비스를 개발합니다.",
  },
  {
    title: "Frontend Development",
    ko: "프론트엔드 개발",
    body: "React·Next.js 기반으로 반응형 화면과 재사용 가능한 컴포넌트 구조를 구현합니다.",
  },
  {
    title: "Backend Development",
    ko: "백엔드 개발",
    body: "Kotlin·Java 기반 API, 데이터베이스 연동, 비즈니스 로직을 설계하고 구현합니다.",
  },
  {
    title: "E-commerce",
    ko: "이커머스",
    body: "상품·주문 흐름과 구매 경험을 고려해 쇼핑몰을 구축하거나 개선합니다.",
  },
  {
    title: "App Development",
    ko: "앱 개발",
    body: "서비스 성격과 운영 방식에 맞는 방식으로 모바일 앱을 개발합니다.",
  },
  {
    title: "Maintenance & Improvement",
    ko: "유지보수 · 개선",
    body: "운영 중인 서비스의 오류 수정, 기능 추가, UI 개선, 성능 개선을 지속적으로 지원합니다.",
  },
] as const;

export const capabilities = {
  frontend: ["React", "Next.js", "TypeScript", "Responsive UI", "Component Architecture"],
  backend: ["Kotlin", "Java", "REST API", "Database Integration", "Business Logic", "System Integration"],
} as const;

export const values = [
  {
    title: "Business First",
    body: "기술 선택보다 먼저 서비스가 해결해야 할 문제와 비즈니스 목표를 확인합니다. 필요한 기능과 그렇지 않은 기능을 함께 구분합니다.",
  },
  {
    title: "Design to Development",
    body: "디자인 의도가 구현 과정에서 사라지지 않도록, 화면 설계와 개발을 하나의 흐름으로 다룹니다.",
  },
  {
    title: "Practical Engineering",
    body: "프로젝트 규모와 운영 환경에 맞는 기술을 선택합니다. 유지보수할 수 있는 구조를 과도한 복잡함보다 우선합니다.",
  },
  {
    title: "Continuous Improvement",
    body: "출시 이후의 운영과 개선까지 고려합니다. 사용 데이터와 피드백을 바탕으로 다음 개선을 함께 정합니다.",
  },
] as const;

export const processSteps = [
  { title: "Discover", body: "비즈니스 목표, 사용자, 현재 서비스의 문제를 파악합니다." },
  { title: "Define", body: "범위·우선순위·일정을 정하고 필요한 기능을 구체화합니다." },
  { title: "Design & Build", body: "화면을 설계하고 프론트엔드와 백엔드를 구현합니다." },
  { title: "Validate", body: "기기·브라우저·기능 테스트로 실제 사용 환경에서 검증합니다." },
  { title: "Launch & Improve", body: "배포 이후 운영 상황을 확인하고 개선을 이어갑니다." },
] as const;

export const audiences = [
  "신규 웹사이트를 제작하려는 기업",
  "기존 웹사이트를 리뉴얼하려는 기업",
  "프론트엔드 개발 지원이 필요한 팀",
  "백엔드 및 API 개발이 필요한 기업",
  "쇼핑몰 개선이 필요한 사업자",
  "유지보수 및 기능 개선이 필요한 조직",
] as const;
