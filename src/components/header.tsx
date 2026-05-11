"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navItems } from "@/data/site";
import { LanguageToggle } from "@/i18n/locale-provider";

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, label, pathname, onClick, variant = "desktop" }: NavLinkProps) {
  const isActive = isActivePath(pathname, href);
  const className =
    variant === "mobile"
      ? `rounded-xl px-3.5 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-petroleum-100 ${
          isActive
            ? "bg-slate-100 text-slate-950"
            : "text-graphite-700 hover:bg-petroleum-50 hover:text-petroleum-900"
        }`
      : `rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-petroleum-300 focus:ring-offset-2 ${
          isActive
            ? "bg-slate-100 text-slate-950"
            : "text-graphite-600 hover:bg-slate-50 hover:text-slate-950"
        }`;

  return (
    <Link href={href} className={className} aria-current={isActive ? "page" : undefined} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-graphite-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}
        </nav>
        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageToggle />
          <Link
            href="/sistemas"
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium text-graphite-600 transition-colors hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-petroleum-300 focus:ring-offset-2"
          >
            Acessar sistemas
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/contato"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-petroleum-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-petroleum-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-petroleum-300 focus:ring-offset-2"
          >
            Contato
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-graphite-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-petroleum-100 lg:hidden"
          aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      {isOpen ? (
        <div
          className="fixed inset-0 top-[73px] z-40 bg-graphite-900/20 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
        >
          <nav
            id="mobile-navigation"
            className="ml-auto h-[calc(100vh-73px)] w-full max-w-sm border-l border-slate-200 bg-white p-5 shadow-soft"
            aria-label="Navegação mobile"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-sm font-semibold text-graphite-900">Menu</span>
              <LanguageToggle />
            </div>
            <div className="mt-4 grid gap-1">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} variant="mobile" onClick={closeMenu} />
              ))}
            </div>
            <div className="mt-6 grid gap-3 border-t border-slate-200 pt-5">
              <Link
                href="/sistemas"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-graphite-700 transition-colors hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
                onClick={closeMenu}
              >
                Acessar sistemas
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contato"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-petroleum-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-petroleum-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-petroleum-100"
                onClick={closeMenu}
              >
                Contato
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
