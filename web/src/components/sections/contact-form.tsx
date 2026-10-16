"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  budgetOptions,
  parseContact,
  projectTypes,
  timelineOptions,
  validateContact,
  type ContactErrors,
  type ContactResponse,
} from "@/lib/contact";
import { Arrow, cn } from "../ui/primitives";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const fieldBase =
  "w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-ink focus-visible:outline-none aria-[invalid=true]:border-red-700";

export function ContactForm({ fallbackEmail }: { fallbackEmail: string | null }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  function focusFirstError(errs: ContactErrors) {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const input = parseContact(data);
    const clientErrors = validateContact(input);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      setStatus({ state: "idle" });
      focusFirstError(clientErrors);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && body?.ok) {
        setStatus({ state: "success" });
        formRef.current?.reset();
        return;
      }
      if (body && !body.ok && body.reason === "invalid") {
        setErrors(body.errors);
        setStatus({ state: "idle" });
        focusFirstError(body.errors);
        return;
      }
      setStatus({
        state: "error",
        message: body && !body.ok && "message" in body ? body.message : "문의를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } catch {
      setStatus({ state: "error", message: "네트워크 오류로 문의를 전송하지 못했습니다. 연결 상태를 확인한 뒤 다시 시도해 주세요." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="border-t border-ink pt-10">
        <p className="font-display text-3xl font-bold tracking-tight">문의가 접수되었습니다.</p>
        <p className="mt-3 text-muted">내용을 확인한 뒤 입력하신 이메일로 회신드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 text-sm font-semibold underline underline-offset-4 hover:text-accent"
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";
  const err = (name: keyof ContactErrors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      <Field id={`${uid}-name`} label="이름" required error={errors.name} errorId={`${uid}-name-error`}>
        <input id={`${uid}-name`} name="name" autoComplete="name" maxLength={50} className={fieldBase} {...err("name")} />
      </Field>
      <Field id={`${uid}-company`} label="회사명" required error={errors.company} errorId={`${uid}-company-error`}>
        <input
          id={`${uid}-company`}
          name="company"
          autoComplete="organization"
          maxLength={100}
          className={fieldBase}
          {...err("company")}
        />
      </Field>
      <Field id={`${uid}-email`} label="이메일" required error={errors.email} errorId={`${uid}-email-error`} wide>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          className={fieldBase}
          {...err("email")}
        />
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={errors.projectType ? `${uid}-projectType-error` : undefined}>
        <legend className="text-sm font-semibold">
          프로젝트 유형 <span className="text-accent">*</span>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="projectType" value={t} className="peer sr-only" />
              <span className="inline-block border border-ink/30 px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-ink">
                {t}
              </span>
            </label>
          ))}
        </div>
        {errors.projectType && <ErrorText id={`${uid}-projectType-error`}>{errors.projectType}</ErrorText>}
      </fieldset>

      <Field id={`${uid}-budget`} label="예상 예산" optional error={errors.budget} errorId={`${uid}-budget-error`}>
        <select id={`${uid}-budget`} name="budget" defaultValue="" className={fieldBase} {...err("budget")}>
          <option value="">선택 안 함</option>
          {budgetOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field id={`${uid}-timeline`} label="희망 일정" optional error={errors.timeline} errorId={`${uid}-timeline-error`}>
        <select id={`${uid}-timeline`} name="timeline" defaultValue="" className={fieldBase} {...err("timeline")}>
          <option value="">선택 안 함</option>
          {timelineOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field id={`${uid}-message`} label="프로젝트 상세 설명" required error={errors.message} errorId={`${uid}-message-error`} wide>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          maxLength={5000}
          placeholder="만들고 싶은 서비스, 개선하고 싶은 부분, 참고 사이트 등을 자유롭게 적어 주세요."
          className={cn(fieldBase, "resize-y")}
          {...err("message")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, filled by naive bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-4 shrink-0 accent-ink"
            {...err("consent")}
          />
          <span>
            <span className="font-semibold">[필수]</span> 문의 응대를 위한 개인정보(이름, 회사명, 이메일, 문의 내용) 수집 및
            이용에 동의합니다.{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
              개인정보처리방침
            </Link>
          </span>
        </label>
        {errors.consent && <ErrorText id={`${uid}-consent-error`}>{errors.consent}</ErrorText>}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-14 w-full items-center justify-between bg-ink px-6 font-semibold text-paper transition-colors hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-64"
        >
          {submitting ? "전송 중…" : "문의 보내기"}
          <Arrow />
        </button>
        <div aria-live="polite" className="text-sm">
          {status.state === "error" && (
            <p role="alert" className="border-l-2 border-red-700 pl-3 text-red-800">
              {status.message}
              {fallbackEmail && (
                <>
                  {" "}
                  이메일(
                  <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
                    {fallbackEmail}
                  </a>
                  )로 직접 보내주셔도 됩니다.
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  wide,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  wide?: boolean;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label} {required && <span className="text-accent">*</span>}
        {optional && <span className="font-normal text-muted">(선택)</span>}
      </label>
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-red-800">
      {children}
    </p>
  );
}
