export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  published: boolean;
  content: string[];
};

export const insights: Insight[] = [
  {
    slug: "modelagem-numerica-com-abaqus",
    title: "Modelagem numérica com ABAQUS em problemas geomecânicos",
    description:
      "Uma visão aplicada sobre o uso de simulação computacional em problemas de engenharia, geomecânica e validação numérica.",
    date: "2026-05-11",
    category: "Engenharia Computacional",
    tags: ["ABAQUS", "Geomecânica", "Simulação Numérica"],
    published: true,
    content: [
      "A modelagem numérica computacional permite representar, analisar e validar problemas de engenharia que envolvem tensões, deformações, não linearidades e comportamento de materiais.",
      "No contexto da geomecânica, ferramentas como o ABAQUS podem apoiar estudos de estabilidade, comportamento de rochas, validação de modelos e comparação com soluções analíticas ou códigos próprios.",
      "Na ShieldWorks, esse eixo se conecta ao desenvolvimento de rotinas em C++ e Python, ao pós-processamento de resultados e à organização de relatórios técnicos."
    ]
  },
  {
    slug: "sistemas-academicos-e-gestao-institucional",
    title: "Sistemas acadêmicos e gestão institucional",
    description:
      "Reflexões sobre automação documental, gestão de cursos, indicadores e apoio digital à administração acadêmica.",
    date: "2026-05-11",
    category: "Sistemas Institucionais",
    tags: ["Gestão Acadêmica", "Sistemas", "Automação"],
    published: true,
    content: [
      "A gestão acadêmica envolve processos que dependem de organização, rastreabilidade, padronização documental e controle de informações.",
      "Sistemas digitais podem apoiar a gestão de cursos, turmas, instrutores, discentes, certificados, documentos e indicadores.",
      "O desenvolvimento dessas soluções deve considerar clareza de fluxos, segurança da informação, facilidade de uso e aderência às rotinas institucionais."
    ]
  },
  {
    slug: "metodologia-cientifica-e-producao-academica",
    title: "Metodologia científica e produção acadêmica",
    description:
      "Notas sobre estruturação de projetos, TCCs, artigos científicos, relatórios técnicos e preparação para bancas.",
    date: "2026-05-11",
    category: "Assessoria Acadêmica",
    tags: ["TCC", "Artigos", "Metodologia"],
    published: true,
    content: [
      "A produção acadêmica exige organização lógica, clareza metodológica e coerência entre problema, objetivos, justificativa, referencial teórico e método.",
      "Projetos, TCCs, artigos e relatórios técnicos precisam apresentar uma linha argumentativa consistente, respeitando a autoria e as normas da instituição.",
      "A assessoria acadêmica deve ter caráter consultivo, orientativo e revisional, contribuindo para que o autor desenvolva seu trabalho com rigor e integridade."
    ]
  }
];

export function getPublishedInsights() {
  return insights
    .filter((insight) => insight.published)
    .sort((first, second) => second.date.localeCompare(first.date));
}

export function getRecentInsights(limit = 3) {
  return getPublishedInsights().slice(0, limit);
}

export function getInsightBySlug(slug: string) {
  return getPublishedInsights().find((insight) => insight.slug === slug);
}
