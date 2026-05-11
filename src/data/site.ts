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
  tagline: "Engenharia, Pesquisa, Seguranca e Tecnologia Aplicada",
  owner: "Themisson dos Santos Vasconcelos",
  lattes: "[Inserir link do Curriculo Lattes]",
  orcid: "[Inserir ORCID]",
  scholar: "[Inserir Google Scholar]",
  resume: "[Inserir curriculo resumido em PDF]"
};

export const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Solucoes", href: "/solucoes" },
  { label: "Sistemas", href: "/sistemas" },
  { label: "Pesquisa", href: "/pesquisa" },
  { label: "Assessoria Academica", href: "/assessoria-academica" },
  { label: "Contato", href: "/contato" }
];

export const authorityAreas = [
  "Engenharia",
  "Pesquisa aplicada",
  "Seguranca operacional",
  "Desenvolvimento tecnologico",
  "Ensino e metodologia cientifica"
];

export const practiceAreas = [
  {
    title: "Engenharia Computacional",
    description: "Modelagem, simulacao numerica, automacao de calculos tecnicos e validacao de modelos.",
    icon: Cpu
  },
  {
    title: "Geomecanica e Petroleo",
    description: "Estudos aplicados a geomecanica salina, engenharia de pocos e comportamento de rochas.",
    icon: FlaskConical
  },
  {
    title: "Seguranca Operacional",
    description: "Diagnostico, prevencao, resposta operacional, gestao de riscos e apoio tecnologico.",
    icon: ShieldCheck
  },
  {
    title: "Sistemas Institucionais",
    description: "Plataformas para gestao academica, documentos, indicadores e rotinas administrativas.",
    icon: Building2
  },
  {
    title: "Pesquisa Aplicada",
    description: "Conexao entre rigor cientifico, metodos computacionais e problemas tecnicos reais.",
    icon: LineChart
  },
  {
    title: "Assessoria Academica e Cientifica",
    description: "Apoio consultivo para projetos, TCCs, artigos, relatorios, dados e bancas.",
    icon: GraduationCap
  }
];

export const featuredSolutions = [
  "Simulacao numerica e modelagem computacional",
  "Desenvolvimento de sistemas web institucionais",
  "Gestao academica, documentos e certificados",
  "Seguranca operacional e gestao de riscos",
  "Apoio metodologico e producao cientifica",
  "Capacitacao tecnica futura"
];

export const digitalProjects = [
  {
    title: "Sistema de Gestao Academica",
    description: "Plataforma para gestao de cursos, turmas, instrutores, discentes, matriculas, certificados, documentos e relatorios.",
    icon: GraduationCap
  },
  {
    title: "Painel de Avaliacao de Usuarios",
    description: "Ferramenta para coleta, analise e visualizacao de avaliacoes, feedbacks e indicadores de satisfacao.",
    icon: BarChart3
  },
  {
    title: "Gerador de Certificados e Documentos",
    description: "Solucao para emissao padronizada de certificados, atas, declaracoes e relatorios.",
    icon: FileBadge2
  },
  {
    title: "Dashboard de Indicadores",
    description: "Paineis para acompanhamento de dados academicos, administrativos ou operacionais.",
    icon: LineChart
  },
  {
    title: "Plataforma de Treinamentos",
    description: "Ambiente futuro para cursos, trilhas de capacitacao e conteudos tecnicos.",
    icon: BookOpenCheck
  },
  {
    title: "Sistemas personalizados",
    description: "Projetos digitais sob medida para instituicoes, ensino, automacao documental e decisao.",
    icon: MonitorCog
  }
];

export const researchAreas = [
  "Geomecanica Salina",
  "Fluencia de rochas evaporiticas",
  "Engenharia de pocos",
  "Leak-off test",
  "Metodos numericos",
  "BEM, FEM, MPM e FVM",
  "Simulacao computacional",
  "Seguranca operacional",
  "Tecnologia aplicada a gestao institucional"
];

export const academicServices = [
  "Orientacao metodologica",
  "Estruturacao de projetos de pesquisa",
  "Apoio a elaboracao de TCC",
  "Organizacao de artigos cientificos",
  "Revisao tecnica e metodologica",
  "Adequacao as normas ABNT",
  "Analise e apresentacao de dados",
  "Preparacao para bancas",
  "Apoio a submissao de artigos"
];

export const interestOptions = [
  "Engenharia computacional",
  "Sistemas institucionais",
  "Assessoria academica",
  "Pesquisa aplicada",
  "Seguranca operacional",
  "Cursos e treinamentos",
  "Outro"
];
