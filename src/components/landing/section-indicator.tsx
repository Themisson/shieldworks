"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";

export const landingSections = [
  ["inicio", "Início", "Home"],
  ["shieldworks", "Abordagem", "Approach"],
  ["solucoes", "Soluções", "Solutions"],
  ["pesquisa", "Pesquisa", "Research"],
  ["publicacao", "Publicação", "Publication"],
  ["projetos", "Projetos", "Projects"],
  ["cases", "Cases", "Case studies"],
  ["conteudo", "Conteúdo", "Content"],
  ["conhecimento", "Conhecimento", "Knowledge"],
  ["sobre", "Sobre", "About"],
  ["atualizacoes", "Atualizações", "Updates"],
  ["contato", "Contato", "Contact"],
] as const;

export function SectionIndicator() {
  const [active, setActive] = useState("inicio");
  const { locale } = useLocale();
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const sections = landingSections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      className="section-indicator"
      aria-label={locale === "en" ? "Page sections" : "Seções da página"}
    >
      <ol>
        {landingSections.map(([id, pt, en], i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span className="indicator-name">
                {String(i + 1).padStart(2, "0")} / {locale === "en" ? en : pt}
              </span>
              <span className="indicator-mark" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
