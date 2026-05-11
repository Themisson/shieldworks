import type { MetadataRoute } from "next";

const routes = ["", "/sobre", "/solucoes", "/sistemas", "/pesquisa", "/assessoria-academica", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://shieldworks.com.br${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
