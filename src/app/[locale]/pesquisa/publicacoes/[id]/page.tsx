import { notFound } from "next/navigation";
import Link from "next/link";
import { featuredPublications } from "@/data/publications";
import { researchLines } from "@/data/research";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata, jsonLd } from "@/lib/page-metadata";
import { citation, bibtex, kindLabel } from "@/lib/publication-format";
import { canonicalUrl } from "@/lib/seo";
import { localizedPath } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = { params: Promise<{ locale: string; id: string }> };
export function generateStaticParams() {
  return featuredPublications.map((item) => ({ id: item.id }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  const { id } = await params;
  const publication = featuredPublications.find((item) => item.id === id);
  if (!publication) return {};
  return pageMetadata(
    `/pesquisa/publicacoes/${id}`,
    publication.title,
    `${publication.authors}. ${publication.venue}, ${publication.year}.`,
    locale,
  );
}
export default async function PublicationPage({ params }: Props) {
  const locale = await routeLocale(params);
  const { id } = await params;
  const publication = featuredPublications.find((item) => item.id === id);
  if (!publication) notFound();
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const lines = researchLines.filter((line) =>
    (line.publications as readonly string[]).includes(id),
  );
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
          {
            label: String(publication.year),
            href: `/pesquisa/publicacoes/${id}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type":
              publication.kind === "tese" ? "Thesis" : "ScholarlyArticle",
            name: publication.title,
            headline: publication.title,
            datePublished: String(publication.year),
            url: canonicalUrl(
              localizedPath(`/pesquisa/publicacoes/${id}`, locale),
            ),
            sameAs: publication.href,
            author: publication.authors
              .split(",")
              .map((name) => ({ "@type": "Person", name: name.trim() })),
            isPartOf: {
              "@type":
                publication.kind === "congresso"
                  ? "CreativeWork"
                  : "Periodical",
              name: publication.venue,
            },
            ...(publication.doi ? { identifier: publication.doi } : {}),
          }),
        }}
      />
      <header className="internal-hero">
        <p className="technical-label">
          {publication.year} / {kindLabel(publication.kind, locale)}
        </p>
        <h1 className="publication-detail-title">{publication.title}</h1>
        <p className="detail-description">{publication.authors}</p>
        <p className="mt-4">{publication.venue}</p>
      </header>
      <div className="internal-grid">
        <div>
          <section className="internal-section">
            <h2>{t("Citação", "Citation")}</h2>
            <p className="reading-copy">{citation(publication)}</p>
          </section>
          <section className="internal-section">
            <h2>BibTeX</h2>
            <p className="reading-copy mb-4">
              {t(
                "Registro com os metadados disponíveis. Confira os dados completos na fonte antes de uma submissão.",
                "Record containing available metadata. Check complete information at the source before submission.",
              )}
            </p>
            <pre className="bibtex" tabIndex={0}>
              <code>{bibtex(publication)}</code>
            </pre>
          </section>
          {publication.abstract && (
            <section className="internal-section">
              <h2>{t("Resumo", "Abstract")}</h2>
              <p className="reading-copy">{publication.abstract}</p>
            </section>
          )}
        </div>
        <aside className="detail-aside">
          <a
            className="sw-button"
            href={publication.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("Consultar fonte acadêmica", "View academic source")} ↗
          </a>
          {publication.doi && <p>DOI: {publication.doi}</p>}
          <h2 className="text-xl">
            {t("Linhas relacionadas", "Related research lines")}
          </h2>
          {lines.map((line) => (
            <Link
              className="block"
              key={line.slug}
              href={localizedPath(`/pesquisa/${line.slug}`, locale)}
            >
              {line.title[locale]} ↗
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
