import {
  BarChart3,
  BookOpenCheck,
  Building2,
  Cpu,
  FileBadge2,
  FlaskConical,
  GraduationCap,
  LineChart,
  MonitorCog,
  ShieldCheck
} from "lucide-react";

export const brand = {
  name: "ShieldWorks",
  tagline: "Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
  owner: "Themisson dos Santos Vasconcelos",
  lattes: "[Inserir link do Currículo Lattes]",
  orcid: "[Inserir ORCID]",
  scholar: "[Inserir Google Scholar]",
  resume: "[Inserir currículo resumido em PDF]"
};

export const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Sistemas", href: "/sistemas" },
  { label: "Pesquisa", href: "/pesquisa" },
  { label: "Assessoria Acadêmica", href: "/assessoria-academica" },
  { label: "Contato", href: "/contato" }
];

export const authorityAreas = [
  "Engenharia",
  "Pesquisa aplicada",
  "Segurança operacional",
  "Desenvolvimento tecnológico",
  "Ensino e metodologia científica"
];

export const practiceAreas = [
  {
    title: "Engenharia Computacional",
    description: "Modelagem, simulação numérica, automação de cálculos técnicos e validação de modelos.",
    icon: Cpu
  },
  {
    title: "Geomecânica e Petróleo",
    description: "Estudos aplicados à geomecânica salina, engenharia de poços e comportamento de rochas.",
    icon: FlaskConical
  },
  {
    title: "Segurança Operacional",
    description: "Diagnóstico, prevenção, resposta operacional, gestão de riscos e apoio tecnológico.",
    icon: ShieldCheck
  },
  {
    title: "Sistemas Institucionais",
    description: "Plataformas para gestão acadêmica, documentos, indicadores e rotinas administrativas.",
    icon: Building2
  },
  {
    title: "Pesquisa Aplicada",
    description: "Conexão entre rigor científico, métodos computacionais e problemas técnicos reais.",
    icon: LineChart
  },
  {
    title: "Assessoria Acadêmica e Científica",
    description: "Apoio consultivo para projetos, TCCs, artigos, relatórios, dados e bancas.",
    icon: GraduationCap
  }
];

export const featuredSolutions = [
  "Simulação numérica e modelagem computacional",
  "Desenvolvimento de sistemas web institucionais",
  "Gestão acadêmica, documentos e certificados",
  "Segurança operacional e gestão de riscos",
  "Apoio metodológico e produção científica",
  "Capacitação técnica futura"
];

export const digitalProjects = [
  {
    title: "Sistema de Gestão Acadêmica",
    description: "Plataforma para gestão de cursos, turmas, instrutores, discentes, matrículas, certificados, documentos e relatórios.",
    icon: GraduationCap
  },
  {
    title: "Painel de Avaliação de Usuários",
    description: "Ferramenta para coleta, análise e visualização de avaliações, feedbacks e indicadores de satisfação.",
    icon: BarChart3
  },
  {
    title: "Gerador de Certificados e Documentos",
    description: "Solução para emissão padronizada de certificados, atas, declarações e relatórios.",
    icon: FileBadge2
  },
  {
    title: "Dashboard de Indicadores",
    description: "Painéis para acompanhamento de dados acadêmicos, administrativos ou operacionais.",
    icon: LineChart
  },
  {
    title: "Plataforma de Treinamentos",
    description: "Ambiente futuro para cursos, trilhas de capacitação e conteúdos técnicos.",
    icon: BookOpenCheck
  },
  {
    title: "Sistemas personalizados",
    description: "Projetos digitais sob medida para instituições, ensino, automação documental e decisão.",
    icon: MonitorCog
  }
];

export const researchAreas = [
  "Geomecânica Salina",
  "Fluência de rochas evaporíticas",
  "Engenharia de poços",
  "Leak-off test",
  "Métodos numéricos",
  "BEM, FEM, MPM e FVM",
  "Simulação computacional",
  "Segurança operacional",
  "Tecnologia aplicada à gestão institucional"
];

export const academicServices = [
  "Orientação metodológica",
  "Estruturação de projetos de pesquisa",
  "Apoio à elaboração de TCC",
  "Organização de artigos científicos",
  "Revisão técnica e metodológica",
  "Adequação às normas ABNT",
  "Análise e apresentação de dados",
  "Preparação para bancas",
  "Apoio à submissão de artigos"
];

export const interestOptions = [
  "Engenharia computacional",
  "Sistemas institucionais",
  "Assessoria acadêmica",
  "Pesquisa aplicada",
  "Segurança operacional",
  "Cursos e treinamentos",
  "Outro"
];
