import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Full-bleed gutter used across the design (3.5vw, 1.2rem on phones). */
export const gutter = "px-[1.2rem] sm:px-[3.5vw]";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("w-full", gutter, className)} {...props} />;
}

/** Standard section padding (9rem desktop / 6rem phone). */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn(gutter, "py-24 sm:py-36", className)} {...props} />;
}

/** ↗ glyph that nudges up-right when its parent link/button is hovered. */
export function Arrow({ down, className }: { down?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex not-italic transition-transform duration-250",
        down
          ? "rotate-135 group-hover:translate-y-[0.2rem]"
          : "group-hover:translate-x-[0.2rem] group-hover:-translate-y-[0.2rem]",
        className,
      )}
    >
      ↗
    </span>
  );
}

export const eyebrowClass = "text-[0.62rem] font-bold tracking-[0.14em] uppercase";

/** Eyebrow + oversized headline on a 1fr / 3fr grid. */
export function SectionIntro({
  eyebrow,
  title,
  copy,
  light,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  light?: boolean;
  id?: string;
}) {
  return (
    <header className={cn("mb-16 grid items-start sm:mb-24 desk:grid-cols-[1fr_3fr]", light && "text-paper")}>
      <p className={cn(eyebrowClass, "mt-2 mb-12 desk:mb-0")}>{eyebrow}</p>
      <h2
        id={id}
        className="text-[clamp(2.2rem,10.5vw,4rem)] leading-[0.88] font-extrabold tracking-[-0.075em] sm:text-section desk:col-start-2"
      >
        {title}
      </h2>
      {copy && (
        <p
          className={cn(
            "mt-8 max-w-[33rem] text-[0.9rem] leading-[1.55] sm:text-[1.05rem] desk:col-start-2",
            light ? "text-muted-dark" : "text-muted",
          )}
        >
          {copy}
        </p>
      )}
    </header>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "accent" | "ghost" | "dark"; down?: boolean };

export function ButtonLink({ variant = "accent", down, className, children, ...props }: ButtonProps) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-14 items-center justify-between gap-10 border px-5 text-[0.77rem] font-bold transition-colors duration-250",
        variant === "accent" && "border-accent bg-accent text-ink hover:border-paper hover:bg-paper",
        variant === "ghost" && "border-[#484741] hover:bg-paper hover:text-ink",
        variant === "dark" && "border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-ink",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow down={down} />
    </Link>
  );
}

export function TextLink({ light, className, children, ...props }: ComponentProps<typeof Link> & { light?: boolean }) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-12 border-b pb-2.5 text-[0.75rem] font-bold tracking-[0.06em] uppercase",
        light && "text-paper",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/** Page-level heading for sub pages (sits below the fixed header). */
export function PageTitle({ eyebrow, title, copy, light }: { eyebrow: string; title: ReactNode; copy?: ReactNode; light?: boolean }) {
  return (
    <header className={cn("mb-16 grid items-start sm:mb-24 desk:grid-cols-[1fr_3fr]", light && "text-paper")}>
      <p className={cn(eyebrowClass, "mt-2 mb-12 desk:mb-0")}>{eyebrow}</p>
      <h1 className="text-[clamp(2.2rem,10.5vw,4rem)] leading-[0.88] font-extrabold tracking-[-0.075em] sm:text-section desk:col-start-2">
        {title}
      </h1>
      {copy && (
        <div className={cn("mt-8 max-w-[33rem] text-[0.9rem] leading-[1.55] sm:text-[1.05rem] desk:col-start-2", light ? "text-muted-dark" : "text-muted")}>
          {copy}
        </div>
      )}
    </header>
  );
}
