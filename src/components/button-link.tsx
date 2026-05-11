import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-petroleum-700 text-white hover:bg-petroleum-900 focus:ring-petroleum-100",
  secondary: "border border-petroleum-700 bg-white text-petroleum-900 hover:bg-petroleum-50 focus:ring-petroleum-100",
  ghost: "text-petroleum-900 hover:bg-petroleum-50 focus:ring-petroleum-100"
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 ${variants[variant]}`;
  const isInternalHref = href.startsWith("/") || href.startsWith("#");
  const isExternalHref = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (!isInternalHref && !isExternalHref) {
    return (
      <span className={`${className} cursor-not-allowed opacity-70`} aria-disabled="true" title={href}>
        {children}
      </span>
    );
  }

  if (isExternalHref) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      {children}
    </Link>
  );
}
