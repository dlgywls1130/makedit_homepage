"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { parseContact, projectTypes, validateContact, type ContactErrors, type ContactResponse } from "@/lib/contact";
import { Arrow, cn } from "../ui/primitives";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string };

const field =
  "w-full rounded-none border-0 border-b border-[#56544f] bg-transparent px-0 pt-2.5 pb-3.5 text-[0.82rem] text-paper outline-none placeholder:text-[#8a8882] focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-[#b9aefb]";

export function ContactForm({ fallbackEmail }: { fallbackEmail: string | null }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  function focusFirstError(errs: ContactErrors) {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const input = parseContact(Object.fromEntries(new FormData(e.currentTarget)));
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
        message:
          body && !body.ok && "message" in body ? body.message : "문의를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } catch {
      setStatus({ state: "error", message: "네트워크 오류로 문의를 전송하지 못했습니다. 연결 상태를 확인한 뒤 다시 시도해 주세요." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="border border-[#56544f] p-8">
        <p className="text-2xl font-bold tracking-[-0.03em]">문의가 접수되었습니다.</p>
        <p className="mt-3 text-[0.82rem] text-muted-dark">내용을 확인한 뒤 입력하신 이메일로 회신드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 text-[0.75rem] font-bold uppercase underline underline-offset-4 hover:text-accent"
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";
  const a11y = (name: keyof ContactErrors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-error`) : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="relative">
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        <Field id={id("name")} label="Name *" error={errors.name}>
          <input id={id("name")} name="name" autoComplete="name" maxLength={50} placeholder="성함" className={field} {...a11y("name")} />
        </Field>
        <Field id={id("company")} label="Company or organization" error={errors.company}>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            maxLength={100}
            placeholder="회사 또는 조직명"
            className={field}
            {...a11y("company")}
          />
        </Field>
        <Field id={id("email")} label="Email *" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="name@company.com"
            className={field}
            {...a11y("email")}
          />
        </Field>
        <Field id={id("projectType")} label="Project type *" error={errors.projectType}>
          <select id={id("projectType")} name="projectType" defaultValue="" className={cn(field, "[color-scheme:dark]")} {...a11y("projectType")}>
            <option value="" disabled>
              선택해 주세요
            </option>
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id={id("budget")} label="Estimated budget" optional error={errors.budget}>
          <input id={id("budget")} name="budget" maxLength={100} placeholder="예상 예산" className={field} {...a11y("budget")} />
        </Field>
        <Field id={id("timeline")} label="Expected timeline" optional error={errors.timeline}>
          <input id={id("timeline")} name="timeline" maxLength={100} placeholder="예상 일정" className={field} {...a11y("timeline")} />
        </Field>
      </div>

      <div className="mt-10">
        <Field id={id("message")} label="Project description *" error={errors.message}>
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            maxLength={5000}
            placeholder="만들거나 개선하려는 서비스, 현재의 과제와 필요한 도움을 알려주세요."
            className={cn(field, "resize-y leading-[1.6]")}
            {...a11y("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, filled by naive bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 grid items-center gap-2.5 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="flex cursor-pointer items-center gap-2.5">
            <input type="checkbox" name="consent" className="size-4 shrink-0 accent-accent" {...a11y("consent")} />
            <span className="text-[0.68rem] text-muted-dark">
              프로젝트 문의를 위한 개인정보 수집 및 이용에 동의합니다. *{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
                개인정보처리방침
              </Link>
            </span>
          </label>
          {errors.consent && <ErrorText id={id("consent-error")}>{errors.consent}</ErrorText>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="group mt-4 flex min-h-16 w-full items-center justify-between bg-accent px-5 text-[0.75rem] font-bold text-ink transition-colors duration-250 hover:bg-paper disabled:cursor-wait disabled:opacity-60 sm:mt-0 sm:min-w-56"
        >
          {submitting ? "전송 중…" : "문의 보내기"} <Arrow />
        </button>
      </div>

      <div aria-live="polite">
        {status.state === "error" && (
          <p role="alert" className="mt-8 border border-[#56544f] p-4 text-[0.72rem] leading-[1.6] text-[#c4c1ba]">
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
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="flex justify-between text-[0.6rem] tracking-[0.08em] uppercase">
        {label}
        {optional && <em className="text-muted-dark not-italic">Optional</em>}
      </label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-[0.65rem] text-[#b9aefb]">
      {children}
    </p>
  );
}
