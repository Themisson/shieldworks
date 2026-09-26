import type { Locale } from "@/i18n/translations";

export function SectionAdvance({
  to,
  pt,
  en,
  locale,
  last = false,
}: {
  to: string;
  pt: string;
  en: string;
  locale: Locale;
  last?: boolean;
}) {
  return (
    <div className="section-shell section-advance">
      <a
        href={`#${to}`}
        aria-label={`${locale === "en" ? (last ? "Back to" : "Next section:") : last ? "Voltar para" : "Próxima seção:"} ${locale === "en" ? en : pt}`}
      >
        <span>{locale === "en" ? en : pt}</span>
        <span aria-hidden="true">{last ? "↑" : "↓"}</span>
      </a>
    </div>
  );
}
