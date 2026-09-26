export type Project = {
  slug: string;
  name: string;
  category: { pt: string; en: string };
  summary: { pt: string; en: string };
  problem: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  technologies: string[];
  stage: { pt: string; en: string };
  href?: string;
  repository: string;
  source: string;
};

export const projects: Project[] = [
  {
    slug: "mdfolio", name: "MDFolio",
    category: { pt: "Publicação técnica", en: "Technical publishing" },
    summary: { pt: "Markdown e JSON como ferramentas de leitura, edição e publicação técnica.", en: "Markdown and JSON tools for reading, editing and technical publishing." },
    problem: { pt: "Transformar fontes estruturadas em documentos legíveis, sem separar leitura e edição.", en: "Turn structured sources into readable documents while keeping reading and editing together." },
    features: { pt: ["Viewer de Markdown com índice", "Editor estruturado de JSON", "Exportação de documentos"], en: ["Markdown viewer with outline", "Structured JSON editor", "Document export"] },
    technologies: ["Next.js", "TypeScript", "Markdown", "Docker"],
    stage: { pt: "Aplicação publicada", en: "Published application" },
    href: "https://mdfolio.shieldworks.com.br", repository: "https://github.com/Themisson/mdfolio",
    source: "Themisson/mdfolio @ 046ef4a — AGENTS.md, DESIGN_DIRECTION.md e LandingPage.tsx (2026-09-26)"
  },
  {
    slug: "acadimprove", name: "AcadImprove",
    category: { pt: "Qualidade do ensino", en: "Teaching quality" },
    summary: { pt: "Avaliação, diagnóstico e acompanhamento de ações de melhoria do ensino.", en: "Evaluation, diagnosis and follow-up of actions to improve teaching." },
    problem: { pt: "Converter feedback educacional em evidências e planos de melhoria, com proteção do anonimato.", en: "Turn educational feedback into evidence and improvement plans while protecting anonymity." },
    features: { pt: ["Avaliação de disciplinas e docentes", "Autoavaliação de instrutores", "Relatórios pedagógicos e ações de melhoria"], en: ["Course and teacher evaluation", "Instructor self-evaluation", "Educational reports and improvement actions"] },
    technologies: ["React", "TypeScript", "Django", "PostgreSQL"],
    stage: { pt: "Em desenvolvimento", en: "In development" },
    repository: "https://github.com/Themisson/acadimprove",
    source: "Themisson/acadimprove @ 447cdb3 — README.md, AGENTS.md, ADR 0029 (2026-09-26); domínio descrito como planejado"
  },
  {
    slug: "sursum", name: "Sursum",
    category: { pt: "Música e organização", en: "Music and organization" },
    summary: { pt: "Repertório litúrgico, cifras, transposição e cadernos para a celebração.", en: "Liturgical repertoires, chord sheets, transposition and songbooks for celebrations." },
    problem: { pt: "Organizar a música da celebração: da escolha do repertório ao material da equipe.", en: "Organize music for a celebration, from repertoire selection to team materials." },
    features: { pt: ["Catálogo e repertórios por momento", "Transposição de cifras", "Caderno PDF e modo palco"], en: ["Catalog and repertoires by liturgical moment", "Chord transposition", "PDF songbooks and stage mode"] },
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    stage: { pt: "Aplicação publicada", en: "Published application" },
    href: "https://sursum.shieldworks.com.br", repository: "https://github.com/Themisson/sursum",
    source: "Themisson/sursum @ 40c1013 — CLAUDE.md, LANDING.md e componentes reais (2026-09-26)"
  },
  {
    slug: "gabarita", name: "Gabarita",
    category: { pt: "Avaliação e leitura óptica", en: "Assessment and optical reading" },
    summary: { pt: "Correção de provas por leitura óptica, revisão humana e histórico acadêmico.", en: "Optical exam grading, human review and academic records." },
    problem: { pt: "Organizar cartões-resposta, correção e homologação com rastreabilidade.", en: "Organize answer sheets, grading and approval with traceability." },
    features: { pt: ["Cartões-resposta personalizados com QR", "Leitura por foto e revisão de ambiguidades", "Relatórios e trilha de auditoria"], en: ["Personalized answer sheets with QR codes", "Photo reading and ambiguity review", "Reports and audit trail"] },
    technologies: ["Django", "React", "OpenCV", "PostgreSQL"],
    stage: { pt: "Publicado · piloto em evolução", en: "Published · evolving pilot" },
    repository: "https://github.com/Themisson/gabarita",
    source: "Themisson/gabarita — README.md local consultado em 2026-09-26; validação OMR em mais aparelhos ainda pendente"
  }
];
