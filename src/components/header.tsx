import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/logo";
import { navItems } from "@/data/site";
import { LanguageToggle } from "@/i18n/locale-provider";

export function Header() {
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
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-graphite-100 px-4 py-2 lg:hidden" aria-label="Menu mobile">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-md px-3 py-2 text-sm font-medium text-graphite-700">
            {item.label}
          </Link>
        ))}
        <LanguageToggle />
      </nav>
    </header>
  );
}
