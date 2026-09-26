import type { Article } from "@/lib/editorial";
import { canonicalUrl } from "@/lib/seo";
import { localizedPath } from "@/i18n/routing";

export function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
export function buildFeed(articles: Article[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>ShieldWorks — Conteúdo</title><link>${canonicalUrl("/conteudo")}</link><description>Engenharia, pesquisa, software e segurança aplicada.</description><language>pt-BR</language><atom:link href="${canonicalUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>${articles
    .map((article) => {
      const url = xmlEscape(
        canonicalUrl(
          localizedPath(`/conteudo/${article.slug}`, article.locale),
        ),
      );
      return `<item><title>${xmlEscape(article.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xmlEscape(article.description)}</description><pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate><category>${xmlEscape(article.category)}</category></item>`;
    })
    .join("")}</channel></rss>`;
}
