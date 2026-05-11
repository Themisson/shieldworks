import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ShieldWorks",
    short_name: "ShieldWorks",
    description: "Engenharia, Pesquisa, Seguranca e Tecnologia Aplicada",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14545d",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
