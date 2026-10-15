"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";

type Sections = readonly (readonly [string, string, string])[];

/**
 * Screen-deck position, as native anchors on the right edge. The current
 * section is the first one (in page order) crossing a band at 40% of the
 * viewport height; past the last section (footer) the last one stays marked.
 * Without IntersectionObserver the first section is marked and the links
 * still work.
 */
export function SectionIndicator({ sections }: { sections: Sections }) {
  const [active, setActive] = useState(sections[0]?.[0] ?? "");
  const { locale } = useLocale();
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const order = sections.map(([id]) => id);
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        const found = order.find((id) => inBand.has(id));
        if (found) setActive(found);
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );
    for (const id of order) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
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
