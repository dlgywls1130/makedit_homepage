import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10", className)} {...props} />;
}

/** "01 — Services" style index used at the top of every section. */
export function SectionLabel({
  index,
  children,
  dark,
  className,
}: {
  index: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs tracking-[0.14em] uppercase",
        dark ? "text-muted-dark" : "text-muted",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span aria-hidden className={cn("h-px w-8", dark ? "bg-line-dark" : "bg-line")} />
      <span>{children}</span>
    </p>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={cn("size-[0.9em] shrink-0", className)} fill="none">
      <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "solid" | "outline" | "inverse" };

export function ButtonLink({ variant = "solid", className, children, ...props }: ButtonProps) {
  return (
    <Link
      className={cn(
        "group inline-flex h-12 items-center gap-3 border px-6 text-sm font-semibold tracking-tight transition-colors duration-200",
        variant === "solid" && "border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-ink",
        variant === "outline" && "border-ink text-ink hover:bg-ink hover:text-paper",
        variant === "inverse" && "border-paper bg-paper text-ink hover:border-accent hover:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
