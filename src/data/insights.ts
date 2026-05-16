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
  },
  {
    slug: "seguranca-operacional-e-gestao-de-riscos",
    title: "Segurança operacional e gestão de riscos",
    description:
      "Como a tecnologia e os métodos de análise de risco podem apoiar a prevenção, o monitoramento e a resposta operacional em ambientes de alto risco.",
    date: "2026-05-12",
    category: "Segurança Operacional",
    tags: ["Riscos", "Prevenção", "Operações"],
    published: true,
    content: [
      "A segurança operacional envolve a antecipação sistemática de falhas, a identificação de vulnerabilidades e a estruturação de respostas eficazes diante de cenários adversos.",
      "Ferramentas digitais podem ampliar a capacidade de monitoramento, organizar indicadores de risco, apoiar a tomada de decisão em tempo real e documentar ocorrências com rastreabilidade.",
      "A integração entre engenharia, tecnologia e gestão institucional permite construir ambientes mais seguros e organizações mais resilientes, com protocolos claros, treinamentos atualizados e suporte técnico especializado."
    ]
  },
  {
    slug: "desenvolvimento-de-sistemas-institucionais",
    title: "Desenvolvimento de sistemas institucionais",
    description:
      "Reflexões sobre o processo de construção de plataformas digitais para gestão acadêmica, automação documental e apoio à tomada de decisão.",
    date: "2026-05-13",
    category: "Sistemas Institucionais",
    tags: ["Gestão Acadêmica", "Automação", "Documentos"],
    published: true,
    content: [
      "Sistemas institucionais bem projetados reduzem retrabalho, aumentam a rastreabilidade e permitem que equipes foquem no que realmente importa: ensinar, pesquisar e tomar decisões informadas.",
      "O desenvolvimento começa pelo mapeamento dos fluxos reais da instituição — quem faz o quê, quando, com quais documentos e quais aprovações são necessárias. Tecnologia sem esse mapeamento resolve o problema errado.",
      "Plataformas de gestão acadêmica, emissão de certificados, controle de cursos e geração de relatórios são exemplos de sistemas que, quando bem construídos, eliminam centenas de horas de trabalho manual por ano."
    ]
  },
  {
    slug: "geomecanica-salina-e-engenharia-de-pocos",
    title: "Geomecânica salina e engenharia de poços",
    description:
      "Uma introdução aos desafios mecânicos do ambiente salino, com foco em fluência de rochas evaporíticas e sua influência na integridade de poços.",
    date: "2026-05-14",
    category: "Engenharia Computacional",
    tags: ["Geomecânica", "Poços", "Simulação"],
    published: true,
    content: [
      "Rochas evaporíticas, como o sal-gema, apresentam comportamento viscoplástico que se manifesta como fluência: deformação contínua ao longo do tempo mesmo sob tensão constante. Esse fenômeno impõe desafios únicos ao projeto e operação de poços em ambientes de pré-sal.",
      "A modelagem desse comportamento exige métodos numéricos capazes de capturar não linearidades temporais, como o Método dos Elementos Finitos com leis constitutivas de fluência. A calibração dos parâmetros com dados experimentais é etapa crítica para a confiabilidade dos resultados.",
      "Compreender a interação entre o carregamento geomecânico, as propriedades do sal e o revestimento do poço é fundamental para garantir a integridade estrutural ao longo da vida útil da instalação — tema que conecta pesquisa aplicada e decisão de engenharia."
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
