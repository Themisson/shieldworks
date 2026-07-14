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
  /** When true, shown in the home featured cases section */
  featured?: boolean;
};

/**
 * Cases técnicos documentados.
 * Baseados em linhas reais de atuação (pesquisa e sistemas), sem inventar clientes.
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
  },
  {
    id: "sistema-gestao-academica",
    title: "Sistema de gestão acadêmica sob demanda",
    domain: "Sistemas institucionais · Automação documental",
    year: "2024–2026",
    type: "sistema",
    featured: true,
    summary:
      "Desenvolvimento de plataforma digital para organizar cursos, turmas, instrutores, documentos e certificados, com escopo evolutivo e foco em rotinas reais de gestão acadêmica.",
    context:
      "Rotinas acadêmicas e de capacitação costumam depender de planilhas, e-mails e documentos manuais. Isso dificulta rastreabilidade, padronização de certificados e visão consolidada de turmas, instrutores e indicadores.",
    problem:
      "Como estruturar um sistema sob medida que reduza retrabalho documental, organize o ciclo acadêmico e permita evolução por módulos, sem pretender ser produto oficial de órgão público?",
    method: [
      {
        label: "Mapeamento de processos",
        detail:
          "Levantamento de fluxos de cursos, matrículas, emissão documental e necessidades de indicadores para definir escopo por etapas."
      },
      {
        label: "Modelagem e protótipo",
        detail:
          "Definição de entidades (curso, turma, instrutor, discente, documento), protótipos de interface e critérios de aceitação por módulo."
      },
      {
        label: "Implementação evolutiva",
        detail:
          "Desenvolvimento incremental com ênfase em automação documental, consistência de dados e preparação para dashboards e certificados."
      }
    ],
    delivery: [
      "Arquitetura modular para gestão acadêmica e documental",
      "Fluxos para cursos, turmas, instrutores e emissão padronizada de documentos",
      "Base para indicadores e evolução sob demanda (demonstrações não institucionais oficiais)"
    ],
    impact:
      "O case consolida a frente de sistemas da ShieldWorks: transformar rotinas fragmentadas em plataforma documentada, com transparência de estágio (em desenvolvimento/protótipo) e caminho claro para pilotos sob demanda.",
    tags: ["Gestão acadêmica", "Documentos", "Certificados", "Dashboards", "Sob demanda"]
  }
];

export function getFeaturedCase() {
  return caseStudies.find((item) => item.featured) ?? caseStudies[0];
}

export function getFeaturedCases() {
  const featured = caseStudies.filter((item) => item.featured);
  return featured.length ? featured : caseStudies.slice(0, 2);
}

export function getCaseStudies() {
  return caseStudies;
}
