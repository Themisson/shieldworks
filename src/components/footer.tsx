"use client";

import { Text, useLocale } from "@/i18n/locale-provider";
import Link from "@/components/localized-link";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Logo } from "@/components/logo";
import { brand, navItems } from "@/data/site";

export function Footer() {
  const { locale } = useLocale();
  return (
    <footer className="site-footer border-t border-graphite-100 bg-white">
      <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.45fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-7 text-graphite-600">
            <Text>{"Site profissional de"}</Text> <Text>{brand.owner}</Text>
            <Text>
              {
                ", voltado a engenharia computacional, pesquisa aplicada, segurança operacional, sistemas institucionais e assessoria acadêmica."
              }
            </Text>
          </p>
          <p className="mt-4 max-w-md text-xs leading-5 text-graphite-500">
            <Text>
              {
                "As soluções e demonstrações apresentadas neste site integram uma iniciativa profissional pessoal e não representam, por si, sistemas oficiais de qualquer órgão público."
              }
            </Text>
          </p>
          <div className="mt-6">
            <ProfessionalLinks compact />
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-graphite-900">
            <Text>{"Navegação"}</Text>
          </h2>
          <nav
            className="mt-4"
            aria-label={
              locale === "en" ? "Footer navigation" : "Navegação do rodapé"
            }
          >
            <ul className="space-y-2.5 text-sm text-graphite-600">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-petroleum-800"
                  >
                    <Text>{item.label}</Text>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-graphite-900">
            <Text>{"Contato profissional"}</Text>
          </h2>
          <p className="mt-4 text-sm leading-7 text-graphite-600">
            <Text>
              {
                "Use o formulário de contato para demandas técnicas, acadêmicas ou institucionais."
              }
            </Text>
          </p>
          <Link
            href="/contato"
            className="mt-4 inline-flex text-sm font-semibold text-petroleum-800 transition-colors hover:text-petroleum-600"
          >
            <Text>{"Solicitar contato"}</Text>
          </Link>
          <div className="mt-5">
            <a
              href="/feed.xml"
              className="mr-5 text-sm font-medium text-petroleum-800"
            >
              <Text>{"RSS"}</Text>
            </a>
            <Link
              href="/privacidade"
              className="text-sm font-medium text-graphite-500 transition-colors hover:text-petroleum-800"
            >
              <Text>{"Privacidade"}</Text>
            </Link>
          </div>
        </div>
      </div>
      <div className="section-shell footer-bottom border-t border-graphite-100 py-5 font-mono text-[11px] tracking-wide text-graphite-500">
        © {new Date().getFullYear()}{" "}
        <Text>{"ShieldWorks. Todos os direitos reservados."}</Text>
      </div>
    </footer>
  );
}
