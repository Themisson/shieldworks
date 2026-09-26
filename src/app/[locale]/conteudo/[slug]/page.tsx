import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticles, getArticle, getRelatedArticles } from "@/lib/editorial";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata, jsonLd } from "@/lib/page-metadata";
import { canonicalUrl, SITE_URL } from "@/lib/seo";
import { localizedPath } from "@/i18n/routing";
import { ArticleBody } from "@/components/editorial/markdown";
import { ArticleList } from "@/components/editorial/article-list";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return [...getArticles("pt"), ...getArticles("en")].map((article) => ({
    locale: article.locale,
    slug: article.slug,
  }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const article = getArticle(slug, locale);
  if (!article) return {};
  const metadata = pageMetadata(
    `/conteudo/${slug}`,
    article.title,
    article.description,
    locale,
    !!getArticle(slug, locale === "pt" ? "en" : "pt"),
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const article = getArticle(slug, locale);
  if (!article) notFound();
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const related = getRelatedArticles(article);
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("Conteúdo", "Content"), href: "/conteudo" },
          { label: article.title, href: `/conteudo/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            inLanguage: locale === "en" ? "en" : "pt-BR",
            author: {
              "@type": "Person",
              name: article.author,
              url: canonicalUrl(localizedPath("/sobre", locale)),
            },
            publisher: {
              "@type": "Organization",
              name: "ShieldWorks",
              url: SITE_URL,
            },
            image: canonicalUrl(article.cover ?? "/og-image.png"),
            mainEntityOfPage: canonicalUrl(
              localizedPath(`/conteudo/${slug}`, locale),
            ),
          }),
        }}
      />
      <article>
        <header className="internal-hero">
          <p className="technical-label">
            {article.category} / {t("NOTA TÉCNICA", "TECHNICAL NOTE")}
          </p>
          <h1>{article.title}</h1>
          {article.subtitle && <p>{article.subtitle}</p>}
          <p className="detail-description">{article.description}</p>
          <p className="technical-label mt-5">
            {article.author} /{" "}
            <time dateTime={article.publishedAt}>{article.publishedAt}</time> /{" "}
            {article.readingMinutes} min {t("de leitura", "read")}
          </p>
        </header>
        <div className="internal-grid">
          <div>
            <ArticleBody body={article.body} />
            {article.references.length > 0 && (
              <section className="internal-section">
                <h2>{t("Referências", "References")}</h2>
                <ol className="detail-list">
                  {article.references.map((reference) => (
                    <li key={reference.href}>
                      <a className="underline" href={reference.href}>
                        {reference.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
          <aside className="detail-aside">
            <h2 className="text-xl">{t("Nesta nota", "In this note")}</h2>
            <p>{article.summary}</p>
            <ul className="flex flex-wrap gap-2 text-sm">
              {article.tags.map((tag) => (
                <li key={tag} className="border border-[var(--line)] px-2 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="text-sm">
              {t("Atualização", "Updated")}:{" "}
              <time dateTime={article.updatedAt}>{article.updatedAt}</time>
            </p>
            <Link href={localizedPath("/contato", locale)}>
              {t("Conversar sobre este tema", "Discuss this topic")} ↗
            </Link>
          </aside>
        </div>
      </article>
      {related.length > 0 && (
        <section className="internal-section">
          <h2>{t("Leituras relacionadas", "Related reading")}</h2>
          <ArticleList articles={related} />
        </section>
      )}
    </div>
  );
}
