import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  className?: string;
};

const variants = {
  primary:
    "bg-safety-500 text-graphite-900 shadow-sm hover:bg-safety-600 hover:shadow-md focus-visible:ring-safety-200 active:scale-[0.98]",
  secondary:
    "border border-petroleum-200 bg-white text-petroleum-900 shadow-sm hover:border-petroleum-400 hover:bg-petroleum-50 focus-visible:ring-petroleum-100 active:scale-[0.98]",
  ghost:
    "text-petroleum-800 hover:bg-petroleum-50 focus-visible:ring-petroleum-100 active:scale-[0.98]",
  inverse:
    "border border-white/20 bg-white text-petroleum-950 shadow-sm hover:bg-safety-50 focus-visible:ring-white/40 active:scale-[0.98]"
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 ease-out focus:outline-none focus-visible:ring-4";
  const classNames = `${base} ${variants[variant]} ${className}`.trim();
  const isInternalHref = href.startsWith("/") || href.startsWith("#");
  const isExternalHref =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (!isInternalHref && !isExternalHref) {
    return (
      <span className={`${classNames} cursor-not-allowed opacity-70`} aria-disabled="true" title={href}>
        {children}
      </span>
    );
  }

  if (isExternalHref) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
