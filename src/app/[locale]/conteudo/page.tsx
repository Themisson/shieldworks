import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { getArticles } from "@/lib/editorial";
import { ArticleList } from "@/components/editorial/article-list";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; type?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/conteudo",
    locale === "en" ? "Content" : "Conteúdo",
    locale === "en"
      ? "Articles and technical notes connecting research, engineering, software and safety."
      : "Artigos e notas técnicas conectando pesquisa, engenharia, software e segurança.",
    locale,
  );
}
export default async function ContentPage({ params, searchParams }: Props) {
  const locale = await routeLocale(params);
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const filters = await searchParams;
  const all = getArticles(locale);
  const categories = [...new Set(all.map((item) => item.category))];
  const articles = all.filter(
    (item) =>
      (!filters.category || item.category === filters.category) &&
      (!filters.type || item.type === filters.type),
  );
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("Conteúdo", "Content"), href: "/conteudo" }]}
      />
      <header className="internal-hero">
        <p className="technical-label">
          SHIELDWORKS / {t("CADERNO TÉCNICO", "TECHNICAL NOTEBOOK")}
        </p>
        <h1>
          {t(
            "Método, conhecimento e aplicação.",
            "Method, knowledge and application.",
          )}
        </h1>
        <p className="detail-description">
          {t(
            "Artigos, notas técnicas, atualizações e cases. A coleção atual reúne as seis notas publicadas na primeira versão da ShieldWorks.",
            "Articles, technical notes, updates and case studies. The current collection contains the six notes published in the first version of ShieldWorks.",
          )}
        </p>
      </header>
      <div className="internal-grid">
        <div>
          <form
            method="get"
            className="content-filters flex flex-wrap items-end gap-4 mb-8"
          >
            <div>
              <label htmlFor="category" className="label">
                {t("Categoria", "Category")}
              </label>
              <select
                id="category"
                name="category"
                className="field"
                defaultValue={filters.category ?? ""}
              >
                <option value="">{t("Todas", "All")}</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type" className="label">
                {t("Formato", "Format")}
              </label>
              <select
                id="type"
                name="type"
                className="field"
                defaultValue={filters.type ?? ""}
              >
                <option value="">{t("Todos", "All")}</option>
                {[
                  ["article", "Artigos", "Articles"],
                  ["note", "Notas técnicas", "Technical notes"],
                  ["update", "Atualizações", "Updates"],
                  ["case", "Cases", "Case studies"],
                ].map(([value, pt, en]) => (
                  <option key={value} value={value}>
                    {t(pt, en)}
                  </option>
                ))}
              </select>
            </div>
            <button className="sw-button" type="submit">
              {t("Filtrar", "Filter")}
            </button>
          </form>
          {articles.length ? (
            <>
              <h2 className="sr-only">
                {t("Notas publicadas", "Published notes")}
              </h2>
              <ArticleList articles={articles} />
            </>
          ) : (
            <p role="status">
              {t(
                "Nenhum conteúdo publicado para este filtro.",
                "No published content matches this filter.",
              )}
            </p>
          )}
        </div>
        <aside className="detail-aside">
          <h2 className="text-xl">
            {t("Acompanhe as publicações", "Follow publications")}
          </h2>
          <p>
            {t(
              "O RSS permite receber novas notas no seu leitor, sem criar conta.",
              "RSS brings new notes to your reader without creating an account.",
            )}
          </p>
          <a href="/feed.xml">RSS ↗</a>
        </aside>
      </div>
    </div>
  );
}
