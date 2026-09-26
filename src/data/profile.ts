/**
 * About-page catalogue. Every item restates facts already present in the project;
 * the `source` notes where each one comes from. The knowledge map is deliberately
 * not chronological: no dates or order are claimed beyond the sourced years.
 * Station details are one line each, so the whole map fits one screen.
 */
type Pair = { pt: string; en: string };

export const careerLines = {
  operation: { pt: "Operação e segurança", en: "Operations and safety" },
  engineering: { pt: "Engenharia e pesquisa", en: "Engineering and research" },
  computing: { pt: "Computação e sistemas", en: "Computing and systems" },
  teaching: { pt: "Ensino", en: "Teaching" },
} satisfies Record<string, Pair>;

export type CareerLine = keyof typeof careerLines;

export const careerStations: {
  line: CareerLine | "shieldworks";
  title: Pair;
  detail: Pair;
  source: string;
}[] = [
  {
    line: "operation",
    title: { pt: "Carreira institucional", en: "Institutional career" },
    detail: {
      pt: "Tenente-Coronel do CBMAL, com experiência operacional, administrativa e acadêmica.",
      en: "Lieutenant Colonel at CBMAL, with operational, administrative and academic experience.",
    },
    source: "Biografia; posto confirmado pelo proprietário em 26/09/2026",
  },
  {
    line: "operation",
    title: { pt: "Segurança operacional", en: "Operational safety" },
    detail: {
      pt: "Prevenção, análise de risco, monitoramento e resposta operacional.",
      en: "Prevention, risk analysis, monitoring and operational response.",
    },
    source: "featuredSolutions / Segurança Operacional (site.ts)",
  },
  {
    line: "engineering",
    title: { pt: "Engenharia de petróleo", en: "Petroleum engineering" },
    detail: {
      pt: "Formação de base em engenharia de petróleo.",
      en: "Background in petroleum engineering.",
    },
    source: "Biografia (v2-messages.ts)",
  },
  {
    line: "engineering",
    title: { pt: "Mestrado e doutorado", en: "Master's and doctorate" },
    detail: {
      pt: "Engenharia Civil, área de concentração Estruturas; tese de doutorado de 2019 (UFAL).",
      en: "Civil Engineering, concentration in Structures; 2019 doctoral thesis (UFAL).",
    },
    source: "Formação confirmada pelo proprietário em 26/09/2026; publications.ts (tese-2019-apb)",
  },
  {
    line: "engineering",
    title: { pt: "Geomecânica salina e poços", en: "Salt geomechanics and wells" },
    detail: {
      pt: "Evaporitos, anulares confinados e leak-off test; publicações em 2024 e 2025.",
      en: "Evaporites, trapped annuli and leak-off tests; papers in 2024 and 2025.",
    },
    source: "research.ts; publications.ts (mrc-2024-apb, ijrmms-2025-lot)",
  },
  {
    line: "computing",
    title: { pt: "Computação científica", en: "Scientific computing" },
    detail: {
      pt: "Códigos próprios em C++ e Python, ABAQUS; BEM, FEM, MPM e FVM.",
      en: "In-house C++ and Python codes, ABAQUS; BEM, FEM, MPM and FVM.",
    },
    source: "Síntese profissional; biografia",
  },
  {
    line: "computing",
    title: {
      pt: "Sistemas e produtos digitais",
      en: "Systems and digital products",
    },
    detail: {
      pt: "Sistemas institucionais; MDFolio, AcadImprove, Sursum e Gabarita.",
      en: "Institutional systems; MDFolio, AcadImprove, Sursum and Gabarita.",
    },
    source: "Síntese profissional; projects.ts",
  },
  {
    line: "teaching",
    title: { pt: "Ensino e metodologia", en: "Teaching and methodology" },
    detail: {
      pt: "TCC e Metodologia Científica nos cursos do CBMAL desde 2019.",
      en: "Final projects and Scientific Methodology in CBMAL courses since 2019.",
    },
    source: "Frentes de atuação (translations.ts)",
  },
  {
    line: "shieldworks",
    title: { pt: "ShieldWorks", en: "ShieldWorks" },
    detail: {
      pt: "A iniciativa em que essas linhas se encontram e viram aplicação.",
      en: "The initiative where these lines meet and become practice.",
    },
    source: "Landing (posicionamento da ShieldWorks)",
  },
];

/** Same order as the hub axes: 01 left, 02 top, 03 right, 04 bottom. */
export const convergingAreas: { title: Pair; branches: Pair[] }[] = [
  {
    title: { pt: "Engenharia", en: "Engineering" },
    branches: [
      { pt: "Modelagem numérica computacional", en: "Computational numerical modelling" },
      { pt: "Tensões, deformações e comportamento de materiais", en: "Stresses, strains and material behaviour" },
      { pt: "Validação de modelos numéricos", en: "Validation of numerical models" },
    ],
  },
  {
    title: { pt: "Pesquisa", en: "Research" },
    branches: [
      { pt: "Geomecânica salina e fluência de evaporitos", en: "Salt geomechanics and evaporite creep" },
      { pt: "Engenharia de poços", en: "Well engineering" },
      { pt: "Métodos numéricos: BEM, FEM, MPM e FVM", en: "Numerical methods: BEM, FEM, MPM and FVM" },
    ],
  },
  {
    title: { pt: "Tecnologia", en: "Technology" },
    branches: [
      { pt: "C++ e Python", en: "C++ and Python" },
      { pt: "Sistemas web e automação documental", en: "Web systems and document automation" },
      { pt: "Indicadores e apoio à gestão institucional", en: "Indicators and institutional management support" },
    ],
  },
  {
    title: { pt: "Segurança", en: "Safety" },
    branches: [
      { pt: "Segurança operacional", en: "Operational safety" },
      { pt: "Análise de risco e prevenção", en: "Risk analysis and prevention" },
      { pt: "Monitoramento e resposta operacional", en: "Monitoring and operational response" },
    ],
  },
];

export const researchProcess: Pair[] = [
  { pt: "Problema físico", en: "Physical problem" },
  { pt: "Modelagem", en: "Modelling" },
  { pt: "Discretização", en: "Discretization" },
  { pt: "Simulação", en: "Simulation" },
  { pt: "Validação", en: "Validation" },
  { pt: "Publicação", en: "Publication" },
];

/** Working principles, phrased from the approach already published on the landing. */
export const workPrinciples: { title: Pair; detail: Pair }[] = [
  {
    title: { pt: "Método", en: "Method" },
    detail: {
      pt: "O escopo começa pelo contexto, pelas restrições e pelo resultado esperado.",
      en: "Scope begins with context, constraints and the expected outcome.",
    },
  },
  {
    title: { pt: "Rigor técnico", en: "Technical rigour" },
    detail: {
      pt: "Hipóteses, métodos e evidências explícitos em cada etapa.",
      en: "Explicit hypotheses, methods and evidence at every stage.",
    },
  },
  {
    title: { pt: "Documentação", en: "Documentation" },
    detail: {
      pt: "Entrega clara e rastreável, que outra pessoa consegue verificar.",
      en: "Clear, traceable delivery that someone else can verify.",
    },
  },
  {
    title: { pt: "Validação", en: "Validation" },
    detail: {
      pt: "Modelos e sistemas conferidos antes de apoiar uma decisão.",
      en: "Models and systems checked before they support a decision.",
    },
  },
  {
    title: { pt: "Aplicação prática", en: "Practical application" },
    detail: {
      pt: "Conhecimento colocado em uso em problemas reais.",
      en: "Knowledge put to use on real problems.",
    },
  },
];
