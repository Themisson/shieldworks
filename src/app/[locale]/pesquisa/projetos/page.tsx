import Link from "next/link";
import { caseStudies } from "@/data/cases";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { localizedPath } from "@/i18n/routing";
import { translate } from "@/i18n/translations";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/pesquisa/projetos",
    locale === "en" ? "Research projects" : "Projetos de pesquisa",
    locale === "en"
      ? "Documented applied research in well engineering and salt geomechanics."
      : "Pesquisa aplicada documentada em engenharia de poços e geomecânica salina.",
    locale,
  );
}
export default async function ResearchProjects({ params }: Props) {
  const locale = await routeLocale(params);
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("Pesquisa", "Research"), href: "/pesquisa" },
          { label: t("Projetos", "Projects"), href: "/pesquisa/projetos" },
        ]}
      />
      <header className="internal-hero">
        <p className="technical-label">
          SHIELDWORKS / {t("INVESTIGAÇÃO APLICADA", "APPLIED INVESTIGATION")}
        </p>
        <h1>
          {t(
            "Projetos de pesquisa documentados.",
            "Documented research projects.",
          )}
        </h1>
      </header>
      <div className="case-grid">
        {caseStudies
          .filter((item) => item.type === "pesquisa")
          .map((study) => (
            <article key={study.id}>
              <p className="technical-label">{study.year}</p>
              <h2 className="text-3xl font-medium my-4">
                {translate(study.title, locale)}
              </h2>
              <p>{translate(study.summary, locale)}</p>
              <Link href={localizedPath(`/cases/${study.id}`, locale)}>
                {t(
                  "Ver contexto, método e entrega",
                  "Explore context, method and delivery",
                )}{" "}
                ↗
              </Link>
            </article>
          ))}
      </div>
    </div>
  );
}
