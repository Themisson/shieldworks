import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { researchLines } from "@/data/research";
import { caseStudies } from "@/data/cases";
import { featuredPublications } from "@/data/publications";
import sitemapDates from "@/data/sitemap-dates.json";
import { getArticles } from "@/lib/editorial";
import { localizedPath } from "@/i18n/routing";
import { canonicalUrl } from "@/lib/seo";

const staticRoutes = ["/", "/sobre", "/solucoes", "/sistemas", "/projetos", "/pesquisa", "/pesquisa/publicacoes", "/pesquisa/projetos", "/assessoria-academica", "/contato", "/privacidade", "/conteudo", "/cases"];

// Dates come from scripts/update-sitemap-dates.mjs (last content commit per route group).
const dates: Record<string, string> = sitemapDates;
function routeLastModified(route: string): string {
  const date = dates[route] ?? dates[`${route.slice(0, route.lastIndexOf("/"))}/*`];
  if (!date) throw new Error(`No sitemap date for ${route}; add it to scripts/update-sitemap-dates.mjs`);
  return date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...projects.map(item => `/projetos/${item.slug}`), ...researchLines.map(item => `/pesquisa/${item.slug}`), ...featuredPublications.map(item => `/pesquisa/publicacoes/${item.id}`), ...caseStudies.map(item => `/cases/${item.id}`)];
  return (["pt", "en"] as const).flatMap(locale => [
    ...routes.map(route => ({ url: canonicalUrl(localizedPath(route, locale)), lastModified: routeLastModified(route), changeFrequency: "monthly" as const, priority: route === "/" ? 1 : 0.8, alternates: { languages: { "pt-BR": canonicalUrl(route), en: canonicalUrl(localizedPath(route, "en")) } } })),
    ...getArticles(locale).map(article => { const route = `/conteudo/${article.slug}`; return { url: canonicalUrl(localizedPath(route, locale)), lastModified: article.updatedAt, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: { "pt-BR": canonicalUrl(route), en: canonicalUrl(localizedPath(route,"en")) } } }; })
  ]);
}
