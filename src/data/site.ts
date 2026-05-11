import {
  Activity,
  BarChart3,
  BookOpenCheck,
  Building2,
  Code2,
  Cpu,
  FileBadge2,
  FileText,
  FlaskConical,
  GraduationCap,
  LineChart,
  MonitorCog,
  PanelsTopLeft,
  ShieldCheck
} from "lucide-react";

export type ProfessionalLink = {
  label: string;
  href: string;
  tooltip: string;
  isPlaceholder?: boolean;
};

export const brand = {
  name: "ShieldWorks",
  tagline: "Engenharia, Pesquisa, Segurança e Tecnologia Aplicada",
  owner: "Themisson dos Santos Vasconcelos",
  lattes: "http://lattes.cnpq.br/5757459332162874",
  lattesId: "5757459332162874",
  orcid: "https://orcid.org/0000-0002-1215-3691",
  orcidId: "0000-0002-1215-3691",
  scholar: "https://scholar.google.com/citations?user=qtuT18cAAAAJ&hl=pt-BR",
  linkedin: "https://www.linkedin.com/in/themisson-vasconcelos-8a5b05183"
};

export const githubUrl = "https://github.com/Themisson";

export const professionalLinks: ProfessionalLink[] = [
  {
    label: "Lattes",
    href: brand.lattes,
    tooltip: "Acessar Currículo Lattes"
  },
  {
    label: "ORCID",
    href: brand.orcid,
    tooltip: "Acessar perfil ORCID"
  },
  {
    label: "Google Acadêmico",
    href: brand.scholar,
    tooltip: "Acessar Google Acadêmico"
  },
  {
    label: "GitHub",
    href: githubUrl,
    tooltip: "Acessar GitHub"
  },
  {
    label: "LinkedIn",
    href: brand.linkedin,
    tooltip: "Acessar LinkedIn"
  }
];

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
    description: "Modelagem numérica computacional aplicada à engenharia, com uso de C++, Python, ABAQUS e métodos numéricos para análise de tensões, deformações, comportamento geomecânico, validação de modelos e apoio à tomada de decisão técnica.",
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
  {
    title: "Engenharia Computacional",
    description:
      "Modelagem numérica, simulações em C++, Python e ABAQUS, análise de tensões, deformações e validação de modelos aplicados à engenharia.",
    tags: ["C++", "Python", "ABAQUS", "Simulação"],
    icon: Cpu
  },
  {
    title: "Pesquisa Aplicada",
    description:
      "Estudos em geomecânica salina, engenharia de poços, estruturas e métodos computacionais aplicados a problemas técnicos complexos.",
    tags: ["Geomecânica", "BEM", "FEM", "MPM"],
    icon: FlaskConical
  },
  {
    title: "Sistemas Institucionais",
    description:
      "Desenvolvimento de plataformas digitais para gestão acadêmica, automação documental, indicadores e apoio à tomada de decisão.",
    tags: ["Gestão", "Dashboards", "Documentos"],
    icon: PanelsTopLeft
  },
  {
    title: "Segurança Operacional",
    description:
      "Aplicação de tecnologia, análise de risco, prevenção, monitoramento e soluções digitais voltadas à segurança e resposta operacional.",
    tags: ["Riscos", "Prevenção", "Operações"],
    icon: ShieldCheck
  },
  {
    title: "Assessoria Acadêmica",
    description:
      "Apoio metodológico para projetos, TCCs, artigos científicos, relatórios técnicos, normalização e preparação para bancas.",
    tags: ["TCC", "Artigos", "Metodologia"],
    icon: GraduationCap
  }
];

export const serviceIcons = {
  computationalEngineering: Code2,
  institutionalSystems: PanelsTopLeft,
  operationalSafety: Activity,
  academicAdvisory: FileText,
  technicalTraining: BookOpenCheck
};

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
  "BEM, FEM, MPM, FVM e ABAQUS",
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
