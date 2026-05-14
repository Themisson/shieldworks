import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/data/insights";
import { canonicalUrl } from "@/lib/seo";

const staticRoutes = ["/", "/sobre", "/solucoes", "/sistemas", "/pesquisa", "/assessoria-academica", "/contato", "/privacidade", "/insights"];

export default function sitemap(): MetadataRoute.Sitemap {
  const insightRoutes = getPublishedInsights().map((insight) => `/insights/${insight.slug}`);
  const routes = [...staticRoutes, ...insightRoutes];

  return routes.map((route) => ({
    url: canonicalUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" || route.startsWith("/insights") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/insights") ? 0.85 : 0.8
  }));
}
