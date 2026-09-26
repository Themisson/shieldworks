"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/localized-link";
import { Logo } from "@/components/logo";
import { LanguageToggle, useLocale } from "@/i18n/locale-provider";
import { stripLocale } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  ["/", "Início", "Home"],
  ["/solucoes", "Soluções", "Solutions"],
  ["/projetos", "Projetos", "Projects"],
  ["/pesquisa", "Pesquisa", "Research"],
  ["/conteudo", "Conteúdo", "Content"],
  ["/sobre", "Sobre", "About"],
] as const;

export function Header() {
  const { locale } = useLocale();
  const pathname = stripLocale(usePathname());
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const text = (pt: string, en: string) => (locale === "en" ? en : pt);
  const close = () => {
    dialog.current?.close();
  };
  const items = navigation.map(([href, pt, en]) => (
    <Link
      key={href}
      href={href}
      aria-current={
        (
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`)
        )
          ? "page"
          : undefined
      }
      onClick={close}
    >
      {text(pt, en)}
    </Link>
  ));
  return (
    <header className="site-header">
      <div className="section-shell header-row">
        <Logo />
        <nav
          className="desktop-navigation"
          aria-label={text("Navegação principal", "Main navigation")}
        >
          {items}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href="/contato"
            className="header-contact"
            onClick={() =>
              trackEvent("nav_contact_click", { source: "header_desktop" })
            }
          >
            {text("Vamos conversar", "Let's talk")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <button
          ref={trigger}
          type="button"
          className="menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={text("Abrir menu de navegação", "Open navigation menu")}
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          {" "}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label={text("Navegação mobile", "Mobile navigation")}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const links = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button:not([disabled]), a[href]",
            ),
          );
          const first = links[0],
            last = links[links.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-menu-head">
          <span>ShieldWorks</span>
          <button
            type="button"
            autoFocus
            onClick={close}
            aria-label={text(
              "Fechar menu de navegação",
              "Close navigation menu",
            )}
          >
            ×
          </button>
        </div>
        <nav aria-label={text("Navegação mobile", "Mobile navigation")}>
          {items}
          <Link
            href="/contato"
            onClick={() => {
              trackEvent("nav_contact_click", { source: "header_mobile" });
              close();
            }}
          >
            {text("Contato", "Contact")}
          </Link>
          <Link href="/sistemas" onClick={close}>
            {text("Sistemas institucionais", "Institutional systems")}
          </Link>
          <Link href="/assessoria-academica" onClick={close}>
            {text("Assessoria acadêmica", "Academic advisory")}
          </Link>
        </nav>
        <LanguageToggle />
      </dialog>
    </header>
  );
}
