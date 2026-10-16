// Shared by the client form (instant feedback) and the API route (authoritative check).

export const projectTypes = [
  "Website",
  "Web Application",
  "App Development",
  "E-commerce",
  "Frontend Development",
  "Backend Development",
  "Maintenance / Improvement",
  "Other",
] as const;

export const budgetOptions = [
  "미정",
  "1,000만 원 미만",
  "1,000만 ~ 3,000만 원",
  "3,000만 ~ 5,000만 원",
  "5,000만 원 이상",
] as const;

export const timelineOptions = ["미정", "1개월 이내", "1 ~ 3개월", "3 ~ 6개월", "6개월 이상"] as const;

export type ContactInput = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
  /** Honeypot. Real users never see or fill this. */
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const LIMITS = { name: 50, company: 100, email: 254, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseContact(raw: unknown): ContactInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: str(r.name),
    company: str(r.company),
    email: str(r.email),
    projectType: str(r.projectType),
    budget: str(r.budget),
    timeline: str(r.timeline),
    message: str(r.message),
    consent: r.consent === true || r.consent === "on" || r.consent === "true",
    website: str(r.website),
  };
}

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!v.name) e.name = "이름을 입력해 주세요.";
  else if (v.name.length > LIMITS.name) e.name = `이름은 ${LIMITS.name}자 이내로 입력해 주세요.`;

  if (!v.company) e.company = "회사명을 입력해 주세요. 개인인 경우 '개인'으로 입력해 주세요.";
  else if (v.company.length > LIMITS.company) e.company = `회사명은 ${LIMITS.company}자 이내로 입력해 주세요.`;

  if (!v.email) e.email = "이메일을 입력해 주세요.";
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) e.email = "올바른 이메일 형식이 아닙니다.";

  if (!(projectTypes as readonly string[]).includes(v.projectType)) e.projectType = "프로젝트 유형을 선택해 주세요.";
  if (v.budget && !(budgetOptions as readonly string[]).includes(v.budget)) e.budget = "올바른 예산 범위를 선택해 주세요.";
  if (v.timeline && !(timelineOptions as readonly string[]).includes(v.timeline))
    e.timeline = "올바른 일정을 선택해 주세요.";

  if (v.message.length < 10) e.message = "프로젝트 내용을 10자 이상 입력해 주세요.";
  else if (v.message.length > LIMITS.message) e.message = `${LIMITS.message}자 이내로 입력해 주세요.`;

  if (!v.consent) e.consent = "개인정보 수집 및 이용에 동의해 주세요.";
  return e;
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: ContactErrors }
  | { ok: false; reason: "unavailable" | "failed"; message: string };
