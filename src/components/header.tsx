"use client";

import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navItems } from "@/data/site";
import { LanguageToggle } from "@/i18n/locale-provider";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-graphite-600 transition hover:bg-graphite-50 hover:text-petroleum-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle />
          <Link
            href="/sistemas"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-graphite-600 transition hover:bg-graphite-50"
          >
            Acessar sistemas
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/contato"
            className="inline-flex min-h-10 items-center rounded-md bg-petroleum-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petroleum-900"
          >
            Entrar em contato
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-graphite-100 bg-white text-graphite-800 shadow-sm transition hover:bg-graphite-50 focus:outline-none focus:ring-4 focus:ring-petroleum-100 lg:hidden"
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>
      <div
        className={`fixed inset-0 top-[73px] z-40 bg-graphite-900/20 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeMenu}
      >
        <nav
          id="mobile-navigation"
          className={`ml-auto h-[calc(100vh-73px)] w-full max-w-sm border-l border-graphite-100 bg-white p-5 shadow-soft transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Menu mobile"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-graphite-100 pb-4">
            <span className="text-sm font-semibold text-graphite-900">Navegação</span>
            <LanguageToggle />
          </div>
          <div className="mt-4 grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-graphite-700 transition hover:bg-petroleum-50 hover:text-petroleum-900 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-3 border-t border-graphite-100 pt-5">
            <Link
              href="/sistemas"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-graphite-100 px-4 py-2 text-sm font-semibold text-graphite-700 transition hover:bg-graphite-50 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
              onClick={closeMenu}
            >
              Acessar sistemas
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contato"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-petroleum-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petroleum-900 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
              onClick={closeMenu}
            >
              Entrar em contato
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
