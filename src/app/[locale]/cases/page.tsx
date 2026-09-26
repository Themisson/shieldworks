import Link from "next/link";
import { caseStudies } from "@/data/cases";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { localizedPath } from "@/i18n/routing";
import { translate } from "@/i18n/translations";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/cases",
    locale === "en" ? "Documented case studies" : "Cases documentados",
    locale === "en"
      ? "Problem, method and delivery in research and institutional systems."
      : "Problema, método e entrega em pesquisa e sistemas institucionais.",
    locale,
  );
}
export default async function Cases({ params }: Props) {
  const locale = await routeLocale(params);
  return (
    <div className="section-shell internal-page">
      <header className="internal-hero">
        <p className="technical-label">SHIELDWORKS / CASES</p>
        <h1>
          {locale === "en"
            ? "Problem, method and delivery."
            : "Problema, método e entrega."}
        </h1>
      </header>
      <div className="case-grid">
        {caseStudies.map((study) => (
          <article key={study.id}>
            <p className="technical-label">{study.year}</p>
            <h2 className="text-3xl font-medium my-4">
              <Link href={localizedPath(`/cases/${study.id}`, locale)}>
                {translate(study.title, locale)} ↗
              </Link>
            </h2>
            <p>{translate(study.summary, locale)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
