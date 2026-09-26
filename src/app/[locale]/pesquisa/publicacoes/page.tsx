import Link from "next/link";
import { getFeaturedPublications } from "@/data/publications";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { localizedPath } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/pesquisa/publicacoes",
    locale === "en" ? "Scientific publications" : "Publicações científicas",
    locale === "en"
      ? "Selected publications on salt geomechanics, wells and thermomechanical modeling."
      : "Publicações selecionadas em geomecânica salina, poços e modelagem termomecânica.",
    locale,
  );
}
export default async function PublicationsPage({ params }: Props) {
  const locale = await routeLocale(params);
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("Pesquisa", "Research"), href: "/pesquisa" },
          {
            label: t("Publicações", "Publications"),
            href: "/pesquisa/publicacoes",
          },
        ]}
      />
      <header className="internal-hero">
        <p className="technical-label">
          SHIELDWORKS / {t("PRODUÇÃO CIENTÍFICA", "SCIENTIFIC OUTPUT")}
        </p>
        <h1>
          {t(
            "Conhecimento documentado e compartilhado.",
            "Knowledge documented and shared.",
          )}
        </h1>
        <p className="detail-description">
          {t(
            "Seleção curada de artigos, tese e trabalhos de congresso. Metadados provenientes do catálogo já existente; a produção completa permanece nos perfis acadêmicos.",
            "A curated selection of articles, a thesis and conference papers. Metadata comes from the existing catalog; complete output remains available on academic profiles.",
          )}
        </p>
      </header>
      <div className="internal-grid">
        <ol className="publication-ledger detail-list">
          {getFeaturedPublications().map((publication) => (
            <li key={publication.id}>
              <p className="technical-label">
                {publication.year} / {publication.kind}
              </p>
              <h2 className="text-2xl font-medium my-3">
                <Link
                  href={localizedPath(
                    `/pesquisa/publicacoes/${publication.id}`,
                    locale,
                  )}
                >
                  {publication.title} ↗
                </Link>
              </h2>
              <p>{publication.authors}</p>
              <p>{publication.venue}</p>
            </li>
          ))}
        </ol>
        <aside className="detail-aside">
          <h2 className="text-xl">
            {t("Perfis acadêmicos", "Academic profiles")}
          </h2>
          <ProfessionalLinks />
          <p>
            {t(
              "Não foram acrescentados DOI, páginas ou resumos sem fonte confirmada.",
              "No DOI, page numbers or abstracts have been added without a confirmed source.",
            )}
          </p>
        </aside>
      </div>
    </div>
  );
}
