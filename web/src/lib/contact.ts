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

const LIMITS = { name: 50, company: 100, email: 254, budget: 100, timeline: 100, message: 5000 } as const;
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

  if (v.company.length > LIMITS.company) e.company = `회사명은 ${LIMITS.company}자 이내로 입력해 주세요.`;

  if (!v.email) e.email = "이메일을 입력해 주세요.";
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) e.email = "올바른 이메일 형식을 입력해 주세요.";

  if (!(projectTypes as readonly string[]).includes(v.projectType)) e.projectType = "프로젝트 유형을 선택해 주세요.";
  if (v.budget.length > LIMITS.budget) e.budget = `${LIMITS.budget}자 이내로 입력해 주세요.`;
  if (v.timeline.length > LIMITS.timeline) e.timeline = `${LIMITS.timeline}자 이내로 입력해 주세요.`;

  if (!v.message) e.message = "프로젝트에 대해 간단히 알려주세요.";
  else if (v.message.length < 10) e.message = "프로젝트 내용을 10자 이상 입력해 주세요.";
  else if (v.message.length > LIMITS.message) e.message = `${LIMITS.message}자 이내로 입력해 주세요.`;

  if (!v.consent) e.consent = "개인정보 수집 및 이용에 동의해 주세요.";
  return e;
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: ContactErrors }
  | { ok: false; reason: "unavailable" | "failed"; message: string };
