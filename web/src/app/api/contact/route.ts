import { parseContact, validateContact, type ContactInput, type ContactResponse } from "@/lib/contact";

const MAX_BODY_BYTES = 20_000;

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Receives inquiries and forwards them by email through Resend.
 * Without delivery credentials it returns 503 so the form never shows a false success.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, reason: "failed", message: "요청 내용이 너무 깁니다." }, 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, reason: "failed", message: "요청 형식이 올바르지 않습니다." }, 400);
  }

  const input = parseContact(parsed);
  // Honeypot filled → silently accept without sending, so bots learn nothing.
  if (input.website) return json({ ok: true }, 200);

  const errors = validateContact(input);
  if (Object.keys(errors).length) return json({ ok: false, reason: "invalid", errors }, 422);

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return json(
      {
        ok: false,
        reason: "unavailable",
        message: "현재 온라인 문의 접수 시스템을 준비 중이라 문의를 전송할 수 없습니다.",
      },
      503,
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: input.email,
        subject: `[Makedit 문의] ${input.projectType} — ${[input.company, input.name].filter(Boolean).join(" ")}`,
        text: formatEmail(input),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
      return json({ ok: false, reason: "failed", message: "문의를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." }, 502);
    }
  } catch (error) {
    console.error("[contact] Delivery failed", error);
    return json({ ok: false, reason: "failed", message: "문의를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." }, 502);
  }

  return json({ ok: true }, 200);
}

function formatEmail(v: ContactInput) {
  return [
    `이름: ${v.name}`,
    `회사명: ${v.company || "-"}`,
    `이메일: ${v.email}`,
    `프로젝트 유형: ${v.projectType}`,
    `예상 예산: ${v.budget || "-"}`,
    `희망 일정: ${v.timeline || "-"}`,
    `개인정보 수집·이용 동의: ${v.consent ? "동의" : "미동의"}`,
    "",
    "프로젝트 상세 설명:",
    v.message,
  ].join("\n");
}
