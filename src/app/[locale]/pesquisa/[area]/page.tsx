import { notFound } from "next/navigation";
import Link from "next/link";
import { researchLines } from "@/data/research";
import { featuredPublications } from "@/data/publications";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { localizedPath } from "@/i18n/routing";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { translate } from "@/i18n/translations";

type Props = { params: Promise<{ locale: string; area: string }> };
export function generateStaticParams() {
  return researchLines.map((line) => ({ area: line.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  const { area } = await params;
  const line = researchLines.find((item) => item.slug === area);
  if (!line) return {};
  return pageMetadata(
    `/pesquisa/${area}`,
    line.title[locale],
    line.summary[locale],
    locale,
  );
}
export default async function ResearchLine({ params }: Props) {
  const locale = await routeLocale(params);
  const { area } = await params;
  const line = researchLines.find((item) => item.slug === area);
  if (!line) notFound();
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const publications = featuredPublications.filter((item) =>
    (line.publications as readonly string[]).includes(item.id),
  );
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("Pesquisa", "Research"), href: "/pesquisa" },
          { label: line.title[locale], href: `/pesquisa/${area}` },
        ]}
      />
      <header className="internal-hero">
        <p className="technical-label">
          {line.number} / {t("LINHA DE PESQUISA", "RESEARCH LINE")}
        </p>
        <h1>{line.title[locale]}</h1>
        <p className="detail-description">{line.summary[locale]}</p>
      </header>
      <div className="internal-grid">
        <div>
          <EngineeringScene
            kind={area === "metodos-numericos" ? "numerical" : "research"}
            locale={locale}
          />
          <section className="internal-section">
            <h2>{t("Temas e métodos", "Topics and methods")}</h2>
            <ul className="detail-list">
              {line.topics.map((topic) => (
                <li key={topic}>{translate(topic, locale)}</li>
              ))}
            </ul>
          </section>
          <section className="internal-section">
            <h2>{t("Publicações relacionadas", "Related publications")}</h2>
            <ul className="detail-list">
              {publications.map((publication) => (
                <li key={publication.id}>
                  <p className="technical-label">
                    {publication.year} / {publication.venue}
                  </p>
                  <Link
                    className="block text-xl"
                    href={localizedPath(
                      `/pesquisa/publicacoes/${publication.id}`,
                      locale,
                    )}
                  >
                    {publication.title} ↗
                  </Link>
                  <p className="text-sm">{publication.authors}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="detail-aside">
          <h2 className="text-xl">
            {t(
              "Da investigação à aplicação",
              "From investigation to application",
            )}
          </h2>
          <p>
            {t(
              "As linhas organizam temas e publicações já documentados. A representação gráfica é conceitual e não apresenta resultados quantitativos.",
              "These lines organize documented topics and publications. The graphic is conceptual and does not present quantitative results.",
            )}
          </p>
          <Link href={localizedPath("/pesquisa/projetos", locale)}>
            {t("Ver projetos de pesquisa", "Explore research projects")} ↗
          </Link>
          <Link className="block" href={localizedPath("/contato", locale)}>
            {t(
              "Discutir uma demanda de pesquisa",
              "Discuss a research request",
            )}{" "}
            ↗
          </Link>
        </aside>
      </div>
    </div>
  );
}
