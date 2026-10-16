"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav } from "@/lib/site";
import { Arrow, Container, cn } from "../ui/primitives";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  // Links close the menu themselves; Escape closes it too. Body scroll is locked while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        본문 바로가기
      </a>
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-extrabold tracking-[-0.04em]" aria-label="Makedit 홈">
          MAKE<span className="text-muted">DIT</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-accent",
                    pathname.startsWith("/work") && item.href === "/work" && "underline decoration-accent underline-offset-8",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/#contact"
          className="hidden h-10 items-center gap-2 bg-ink px-4 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-ink md:inline-flex"
        >
          프로젝트 문의 <Arrow />
        </Link>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-ink transition-transform duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-6 bg-ink transition-transform duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-paper md:hidden"
      >
        <Container className="flex h-full flex-col py-8">
          <nav aria-label="모바일 메뉴">
            <ul className="divide-y divide-line border-y border-line">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-5">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="font-display text-4xl font-bold tracking-tight">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-auto flex h-14 items-center justify-between bg-ink px-5 font-semibold text-paper"
          >
            프로젝트 문의하기 <Arrow />
          </Link>
        </Container>
      </div>
    </header>
  );
}
