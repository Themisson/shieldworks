"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navItems } from "@/data/site";
import { LanguageToggle } from "@/i18n/locale-provider";

const desktopNavItems = navItems.filter(({ href }) =>
  ["/sobre", "/solucoes", "/sistemas", "/pesquisa", "/insights"].includes(href)
);

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
      ? `rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 ${
          isActive
            ? "bg-petroleum-50 text-petroleum-900"
            : "text-graphite-700 hover:bg-graphite-50 hover:text-graphite-900"
        }`
      : `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-petroleum-300 focus-visible:ring-offset-2 ${
          isActive
            ? "bg-petroleum-50 text-petroleum-900"
            : "text-graphite-600 hover:bg-graphite-50 hover:text-graphite-900"
        }`;

  return (
    <Link href={href} className={className} aria-current={isActive ? "page" : undefined} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 border-b transition duration-300 ${
        scrolled
          ? "border-graphite-100/90 bg-white/85 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="section-shell flex min-h-[68px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegação principal">
          {desktopNavItems.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <Link
            href="/contato"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-safety-500 px-4 py-2.5 text-sm font-semibold text-graphite-900 shadow-sm transition duration-200 ease-out hover:bg-safety-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-safety-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Falar sobre um projeto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-graphite-100 bg-white text-graphite-800 shadow-sm transition hover:bg-graphite-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 lg:hidden"
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
          className="fixed inset-0 top-[69px] z-40 bg-graphite-900/25 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
        >
          <nav
            id="mobile-navigation"
            className="ml-auto h-[calc(100dvh-69px)] w-full max-w-sm border-l border-graphite-100 bg-white p-5 shadow-lift"
            aria-label="Navegação mobile"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-graphite-100 pb-4">
              <span className="text-sm font-semibold text-graphite-900">Menu</span>
              <LanguageToggle />
            </div>
            <div className="mt-4 grid gap-1">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} pathname={pathname} variant="mobile" onClick={closeMenu} />
              ))}
            </div>
            <div className="mt-6 grid gap-3 border-t border-graphite-100 pt-5">
              <Link
                href="/sistemas"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-graphite-100 px-4 py-2 text-sm font-medium text-graphite-700 transition-colors hover:bg-graphite-50 hover:text-graphite-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100"
                onClick={closeMenu}
              >
                Acessar sistemas
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contato"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-petroleum-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-petroleum-800 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 active:scale-[0.98]"
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
