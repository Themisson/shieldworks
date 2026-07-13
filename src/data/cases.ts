export type CaseStep = {
  label: string;
  detail: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  domain: string;
  year: string;
  type: "pesquisa" | "sistema" | "consultoria";
  summary: string;
  context: string;
  problem: string;
  method: CaseStep[];
  delivery: string[];
  impact: string;
  tags: string[];
  /** When true, shown as featured model case on the home page */
  featured?: boolean;
};

/**
 * Cases técnicos documentados.
 * O case modelo usa a linha de pesquisa real em geomecânica de poços
 * (APB / evaporitos / modelagem termomecânica), sem inventar clientes.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "apb-evaporitos-termomecanica",
    title: "Modelagem termomecânica de pressão em anulares confinados com evaporitos",
    domain: "Engenharia de poços · Geomecânica salina",
    year: "2019–2025",
    type: "pesquisa",
    featured: true,
    summary:
      "Investigação aplicada do crescimento de pressão em anulares confinados (APB) em poços verticais com camadas de evaporitos, unindo modelagem termomecânica, validação e publicação científica.",
    context:
      "Em poços de petróleo que atravessam evaporitos, o confinamento de fluidos em anulares pode gerar aumentos de pressão associados a variações térmicas e ao comportamento das rochas salinas. Entender esse fenômeno é relevante para integridade de poço e segurança operacional.",
    problem:
      "Como representar, de forma confiável e documentada, o acoplamento termomecânico em anulares confinados na presença de evaporitos, de modo a apoiar análise técnica e decisão de engenharia?",
    method: [
      {
        label: "Formulação",
        detail:
          "Modelo 1D axisimétrico multicamadas para descrever resposta termomecânica do sistema poço–anular–formação."
      },
      {
        label: "Simulação",
        detail:
          "Implementação e análise numérica com ferramentas de engenharia computacional, incluindo validação de hipóteses e consistência de resultados."
      },
      {
        label: "Validação e publicação",
        detail:
          "Consolidação em tese e artigos em periódicos e congressos, com rastreabilidade metodológica e revisão por pares."
      }
    ],
    delivery: [
      "Modelo termomecânico documentado para análise de APB em poços verticais com evaporitos",
      "Resultados e interpretações orientados à integridade de poço e comportamento de evaporitos",
      "Produção científica associada (tese e artigos em periódicos indexados)"
    ],
    impact:
      "A linha de trabalho resultou em tese de doutorado e publicações em veículos como Mechanics Research Communications e International Journal of Rock Mechanics and Mining Sciences, reforçando a base técnica da atuação em geomecânica e engenharia computacional.",
    tags: ["APB", "Evaporitos", "Termomecânica", "Poços", "Simulação numérica"]
  }
];

export function getFeaturedCase() {
  return caseStudies.find((item) => item.featured) ?? caseStudies[0];
}

export function getCaseStudies() {
  return caseStudies;
}
