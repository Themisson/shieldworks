# ADR 0007 — Catálogo de projetos

Status: aceita. Data: 2026-09-26.

Decisão: catálogo tipado para MDFolio, AcadImprove, Sursum e Gabarita com proveniência
do checkout analisado, recursos demonstráveis e estágio explícito. Projetos genéricos
existentes permanecem acessíveis em /sistemas. Link de domínio planejado não implica
produto público confirmado. Não transformar protótipo em produto lançado.

Revisão 2026-10-15: o catálogo passa a sete registros com Sentinela, ObraVisão e NaEscala,
descritos a partir dos checkouts locais (README, CLAUDE/AGENTS, roteiros e progresso), com
estágio copiado da documentação de origem. Cada card mostra a marca da aplicação (o favicon
do próprio repositório, inline em `project-marks.tsx`, seguindo `data-theme`) e, quando o
subdomínio respondeu HTTP 200 na data da revisão, um link "Abrir aplicação" separado do link
interno. A resposta HTTP comprova disponibilidade naquele dia, não certifica operação contínua.
