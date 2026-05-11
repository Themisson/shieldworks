import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/data/insights";

const staticRoutes = ["/", "/sobre", "/solucoes", "/sistemas", "/pesquisa", "/assessoria-academica", "/contato", "/privacidade", "/insights"];
const siteUrl = "https://www.shieldworks.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const insightRoutes = getPublishedInsights().map((insight) => `/insights/${insight.slug}`);
  const routes = [...staticRoutes, ...insightRoutes];

  return routes.map((route) => ({
    url: route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" || route.startsWith("/insights") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/insights") ? 0.85 : 0.8
  }));
}
