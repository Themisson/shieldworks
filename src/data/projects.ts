export type Project = {
  slug: string;
  name: string;
  category: { pt: string; en: string };
  summary: { pt: string; en: string };
  problem: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  technologies: string[];
  stage: { pt: string; en: string };
  /** Public address of the running application. Each one answered HTTP 200 on 2026-10-15. */
  href?: string;
  repository: string;
  /** Checked 2026-09-26: the repositories are private (public URL returns 404). */
  repositoryPublic?: boolean;
  /** Where the record was taken from, with the local checkout and date. The mark
   * (favicon) of each product is inlined in src/components/illustrations/project-marks.tsx. */
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
    source: "Themisson/mdfolio @ 046ef4a — AGENTS.md, DESIGN_DIRECTION.md e LandingPage.tsx (2026-09-26); marca de public/icon.svg @ 57217a6, v0.15.2 (2026-10-15)"
  },
  {
    slug: "acadimprove", name: "AcadImprove",
    category: { pt: "Qualidade do ensino", en: "Teaching quality" },
    summary: { pt: "Avaliação, diagnóstico e acompanhamento de ações de melhoria do ensino.", en: "Evaluation, diagnosis and follow-up of actions to improve teaching." },
    problem: { pt: "Converter feedback educacional em evidências e planos de melhoria, com proteção do anonimato.", en: "Turn educational feedback into evidence and improvement plans while protecting anonymity." },
    features: { pt: ["Avaliação de disciplinas e docentes", "Autoavaliação de instrutores", "Relatórios pedagógicos e ações de melhoria"], en: ["Course and teacher evaluation", "Instructor self-evaluation", "Educational reports and improvement actions"] },
    technologies: ["React", "TypeScript", "Django", "PostgreSQL"],
    stage: { pt: "Aplicação publicada", en: "Published application" },
    href: "https://acadimprove.shieldworks.com.br", repository: "https://github.com/Themisson/acadimprove",
    source: "Themisson/acadimprove @ 447cdb3 — README.md, AGENTS.md, ADR 0029 (2026-09-26); CHANGELOG @ dbb47dc: release v1.2.0 no ar em 2026-10-14; marca de frontend/public/brand/favicon.svg (2026-10-15)"
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
    source: "Themisson/sursum @ 40c1013 — CLAUDE.md, LANDING.md e componentes reais (2026-09-26); marca de public/brand/favicon.svg @ a0e5a1b (2026-10-15)"
  },
  {
    slug: "gabarita", name: "Gabarita",
    category: { pt: "Avaliação e leitura óptica", en: "Assessment and optical reading" },
    summary: { pt: "Correção de provas por leitura óptica, revisão humana e histórico acadêmico.", en: "Optical exam grading, human review and academic records." },
    problem: { pt: "Organizar cartões-resposta, correção e homologação com rastreabilidade.", en: "Organize answer sheets, grading and approval with traceability." },
    features: { pt: ["Cartões-resposta personalizados com QR", "Leitura por foto e revisão de ambiguidades", "Relatórios e trilha de auditoria"], en: ["Personalized answer sheets with QR codes", "Photo reading and ambiguity review", "Reports and audit trail"] },
    technologies: ["Django", "React", "OpenCV", "PostgreSQL"],
    stage: { pt: "Publicado · piloto em evolução", en: "Published · evolving pilot" },
    href: "https://gabarita.shieldworks.com.br", repository: "https://github.com/Themisson/gabarita",
    source: "Themisson/gabarita — README.md local consultado em 2026-09-26; validação OMR em mais aparelhos ainda pendente; marca de frontend/public/favicon.svg @ da899b2, v1.39.0 (2026-10-15)"
  },
  {
    slug: "sentinela", name: "Sentinela",
    category: { pt: "Medição de acessos", en: "Access measurement" },
    summary: { pt: "Painel privado que mede os acessos dos sites da ShieldWorks em um só lugar.", en: "Private panel that measures traffic across the ShieldWorks sites in one place." },
    problem: { pt: "Acompanhar os acessos de vários sites hospedados em lugares diferentes, sem depender de um serviço externo para cada um.", en: "Follow the traffic of several sites hosted in different places without relying on an external service for each one." },
    features: { pt: ["Estado de cada site e tabela comparativa dos 30 dias", "Origens, páginas, dispositivos, país e estado dos acessos", "Membros com papéis, atividade e exportação CSV"], en: ["State of each site and a 30-day comparison table", "Sources, pages, devices, country and region of visits", "Members with roles, activity log and CSV export"] },
    technologies: ["TanStack Start", "React", "PostgreSQL", "Docker"],
    stage: { pt: "No ar · aceite com sites reais em curso", en: "Live · acceptance with real sites in progress" },
    href: "https://sentinela.shieldworks.com.br", repository: "https://github.com/Themisson/sentinela",
    source: "Themisson/sentinela @ e527b58 — README.md, CLAUDE.md e docs/plano/PROGRESSO.md (fases 1 a 9; fase 8 no ar com aceite parcial em 2026-10-10); marca de public/favicon.svg (2026-10-15)"
  },
  {
    slug: "obravisao", name: "ObraVisão",
    category: { pt: "Acompanhamento de obras", en: "Construction site tracking" },
    summary: { pt: "Fotos da obra pelo Telegram, classificação proposta pela IA e relatório diário (RDO) em PDF.", en: "Site photos sent through Telegram, AI-proposed classification and a daily site report (RDO) as PDF." },
    problem: { pt: "Fotos espalhadas no celular e relatórios feitos de memória: o registro existe, mas não vira documento auditável sem horas de trabalho manual.", en: "Photos scattered on the phone and reports written from memory: the record exists but does not become an auditable document without hours of manual work." },
    features: { pt: ["Visita pelo chat: fotos, notas e áudios sem aplicativo novo", "A IA propõe a classificação; o profissional confirma, com trilha auditável", "RDO em PDF ao encerrar a visita, painel e relatórios por período e final"], en: ["Site visit through chat: photos, notes and voice messages, no new app", "AI proposes the classification; the professional confirms, with an audit trail", "PDF RDO when the visit closes, panel, period and final reports"] },
    technologies: ["Python", "Next.js", "PostgreSQL", "Docker"],
    stage: { pt: "Publicado · piloto em curso", en: "Published · pilot in progress" },
    href: "https://obravisao.shieldworks.com.br", repository: "https://github.com/Themisson/obravisao",
    source: "Themisson/obravisao @ 2f66793 — README.md, docs/00-VISAO.md e docs/04-ROADMAP.md (F5 no ar e piloto iniciado em 2026-10-12; F6 publicada em obravisao.shieldworks.com.br em 2026-10-12; F20 e F21 entregues em 2026-10-13); marca de web/src/app/icon.svg (2026-10-15)"
  },
  {
    slug: "naescala", name: "NaEscala",
    category: { pt: "Escalas de serviço", en: "Duty rosters" },
    summary: { pt: "Folha de serviço institucional: quem cobre o posto, em qual setor, em qual atividade, no dia certo.", en: "Institutional duty roster: who covers the post, in which sector, in which activity, on the right day." },
    problem: { pt: "Montar e publicar a escala do mês de equipes em turno, com conflitos visíveis e cada instituição com a própria marca.", en: "Build and publish the monthly roster of shift teams, with visible conflicts and each institution keeping its own brand." },
    features: { pt: ["Escala do mês com conflitos recalculados a cada mudança e publicação", "Perfis por instituição e setor, convites por e-mail", "Minha escala com calendário .ics, avisos, folha impressa e relatório de equidade"], en: ["Monthly roster with conflicts recalculated on every change, then published", "Profiles per institution and sector, e-mail invitations", "My roster with .ics calendar, notices, printable sheet and equity report"] },
    technologies: ["Next.js", "TypeScript", "SQLite", "Docker"],
    stage: { pt: "Aplicação publicada", en: "Published application" },
    href: "https://naescala.shieldworks.com.br", repository: "https://github.com/Themisson/naescala",
    source: "Themisson/naescala @ 4c71327 — README.md e CLAUDE.md (fases 0 a 25, v0.3.0 em 2026-10-09; produção na VPS em docs/deploy-naescala-vps.md); marca de public/favicon.svg (2026-10-15)"
  }
];
