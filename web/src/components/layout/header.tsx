"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav } from "@/lib/site";
import { Arrow, cn, gutter } from "../ui/primitives";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-[1.05rem] font-black tracking-[-0.07em]", className)}>
      MAKE<span className="text-accent">EDIT</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  // Only the home page starts with the dark hero behind a transparent header.
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 grid h-[4.5rem] grid-cols-[1fr_auto] items-center transition-[background-color,color,border-color] duration-300 desk:h-[5.25rem] desk:grid-cols-[1fr_auto_1fr]",
        gutter,
        solid && !open ? "border-b border-line bg-paper/95 text-ink backdrop-blur-md" : "border-b border-transparent text-paper",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        본문 바로가기
      </a>
      <Link href="/" aria-label="Makedit 홈" className="w-max">
        <Wordmark />
      </Link>

      <nav aria-label="주요 메뉴" className="hidden desk:flex desk:gap-9">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative text-[0.7rem] font-bold tracking-[0.12em] uppercase after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-250 hover:after:origin-left hover:after:scale-x-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/#contact"
        className="group hidden items-center gap-4 justify-self-end text-[0.72rem] font-bold tracking-[0.05em] desk:flex"
      >
        프로젝트 문의 <Arrow />
      </Link>

      <button
        type="button"
        className="flex size-10 flex-col justify-center gap-1.5 p-2 desk:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden className={cn("h-px w-full bg-current transition-transform", open && "translate-y-[3.5px] rotate-45")} />
        <span aria-hidden className={cn("h-px w-full bg-current transition-transform", open && "-translate-y-[3.5px] -rotate-45")} />
      </button>

      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 top-[4.5rem] bottom-0 flex flex-col justify-between bg-ink py-12 text-paper transition-opacity duration-250 desk:hidden",
          gutter,
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav aria-label="모바일 메뉴" className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-dark py-2.5 text-[clamp(2.5rem,9vw,5rem)] font-bold tracking-[-0.06em] uppercase"
            >
              <small className="inline-block w-8 align-middle font-mono text-[0.55rem] tracking-normal text-accent">0{i + 1}</small>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-[0.7rem] leading-normal text-muted-dark">Web & application development partner</p>
      </div>
    </header>
  );
}
