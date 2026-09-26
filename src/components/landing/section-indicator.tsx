"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";

type Sections = readonly (readonly [string, string, string])[];

/** Screen-deck position: which topic is on screen, as native anchors. */
export function SectionIndicator({ sections }: { sections: Sections }) {
  const [active, setActive] = useState(sections[0]?.[0] ?? "");
  const { locale } = useLocale();
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const nodes = sections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);
  return (
    <nav
      className="section-indicator"
      aria-label={locale === "en" ? "Page sections" : "Seções da página"}
    >
      <ol>
        {sections.map(([id, pt, en], i) => (
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
