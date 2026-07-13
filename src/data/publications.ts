import { brand } from "@/data/site";

export type Publication = {
  id: string;
  title: string;
  year: number;
  venue: string;
  kind: "artigo" | "tese" | "congresso" | "periodico";
  authors: string;
  href: string;
  highlight?: boolean;
};

/**
 * Seleção curada da produção científica (fonte: Google Acadêmico / Lattes).
 * Lista completa e atualizada: brand.lattes e brand.scholar.
 */
export const featuredPublications: Publication[] = [
  {
    id: "ijrmms-2025-lot",
    title:
      "Thermomechanical analysis of leak-off test in salt formations: Axisymmetric multilayer modeling for vertical wells",
    year: 2025,
    venue: "International Journal of Rock Mechanics and Mining Sciences",
    kind: "artigo",
    authors: "T. dos Santos Vasconcelos, J.P.L. Santos, E.T.L. Junior",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:Tyk-4Ss8FVUC",
    highlight: true
  },
  {
    id: "mrc-2024-apb",
    title:
      "Analysis of APB in vertical wells with evaporite layers: A 1D axisymmetric multilayer thermomechanical model",
    year: 2024,
    venue: "Mechanics Research Communications",
    kind: "artigo",
    authors: "T. dos Santos Vasconcelos, R. dos Santos Escarpini Filho, E.N. Lages",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:2osOgNQ5qMEC",
    highlight: true
  },
  {
    id: "tese-2019-apb",
    title:
      "Modelagem termomecânica do crescimento de pressão em anulares confinados em poços de petróleo na presença de evaporitos",
    year: 2019,
    venue: "Universidade Federal de Alagoas",
    kind: "tese",
    authors: "T.S. Vasconcelos",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:d1gkVwhDpl0C",
    highlight: true
  },
  {
    id: "cilamce-2024-reaming",
    title: "Local remesh procedure to model reaming in vertical oil wells drilled through salt rocks",
    year: 2024,
    venue: "CILAMCE — Ibero-Latin American Congress on Computational Methods in Engineering",
    kind: "congresso",
    authors: "L.P.R. Almeida, C.N. de Araújo Fernandes, J.P.L. Santos et al.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:zYLM7Y9cAGgC"
  },
  {
    id: "cilamce-2024-fracture",
    title:
      "Predictive characterization of fracture and absorption tests in halite formations: an integrated approach of numerical modeling and field data",
    year: 2024,
    venue: "CILAMCE — Ibero-Latin American Congress on Computational Methods in Engineering",
    kind: "congresso",
    authors: "T. dos Santos Vasconcelos, C.N. de Araújo Fernandes, J.P.L. Santos et al.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:IjCSPb-OGe4C"
  },
  {
    id: "cilamce-2024-creep",
    title: "Modeling of creep closure of salt rocks drilled by directional wells",
    year: 2024,
    venue: "CILAMCE — Ibero-Latin American Congress on Computational Methods in Engineering",
    kind: "congresso",
    authors: "C.M.A. Tenorio, C.N. de Araújo Fernandes, J.P.L. Santos et al.",
    href: "https://scholar.google.com/citations?view_op=view_citation&hl=pt-BR&user=qtuT18cAAAAJ&citation_for_view=qtuT18cAAAAJ:UeHWp8X0CEIC"
  }
];

export const publicationProfiles = {
  lattes: brand.lattes,
  orcid: brand.orcid,
  scholar: brand.scholar
};

export function getFeaturedPublications(limit?: number) {
  const sorted = [...featuredPublications].sort((a, b) => b.year - a.year);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
