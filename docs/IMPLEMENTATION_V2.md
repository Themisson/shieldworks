# Registro da implementação ShieldWorks 2.0

Branch: `feat/shieldworks-v2`. Início: `c0fc08a`. Trabalho local, sem publicação.
Auditoria A–M foi apresentada antes de editar arquivos. Referências locais estudadas
antes das decisões: MDFolio 046ef4a, AcadImprove 447cdb3 e Sursum 40c1013.

## Fases e evidência

| Fase | Analisado e alterado | Motivo / arquivos | Testes e resultado | Débito / próxima etapa |
|---|---|---|---|---|
| 0 — auditoria | Git, ambiente, produção, código, CI e referências; sem edição | AUDIT_V2.md; baseline limpo e alinhado a origin/main | npm ci/check original: 16 testes, i18n/build aprovados; browser 390/1440 | advisories reais corrigidos na etapa seguinte |
| 1 — arquitetura | contratos, classificação de conteúdo e oito decisões | AGENTS, ARCHITECTURE, DESIGN_V2 e ADRs; documentação precedeu alterações estruturais | revisão cruzada com repositórios/arquitetura existente | docs de entrega atualizados após implementar |
| 2 — tokens/layout | limites estruturais e gutters | tokens.css, v2.css, globals.css, PageContainer; viewport → gutter → composição | 13 resoluções verificam header/main/footer e ausência de overflow | paleta Tailwind V1 mantida nos dados/componentes compatíveis |
| 3 — navegação | header/footer, PT/EN, menu e feedback | header/footer/locale-provider; sticky e dialog acessível | teclado/foco/Escape, aria-current e navegação passam | interação dos modais exige JS; footer funciona sem JS |
| 4 — landing | comunicação/dados existentes em 12 seções | Landing, home, indicator; fortalecer engenharia/pesquisa/software sem prova social fictícia | 12 seções, recorte/âncoras/snap e todas as larguras passam | revisão editorial pelo proprietário antes de publicação |
| 5 — SVG/motion | geometria própria, campos e fluxos conceituais | EngineeringScene; seis cenas leves, observer e pausa | reduced motion, pausa, fora da viewport e sem JS passam | nenhuma figura é resultado científico |
| 6 — soluções | todas as capacidades anteriores e método de entrega | solucoes/page; problema → abordagem → entrega → resultado, SVG numérico | preservação do catálogo e layout passam | capacitação continua explicitamente futura |
| 7 — projetos | README/componentes reais dos quatro checkouts | projects.ts, catálogo e detalhes; estágio/fonte/URLs sem inferência | páginas e navegação PT/EN passam | AcadImprove/Gabarita sem URL pública confirmada; contato/repositório |
| 8 — pesquisa | seis publicações, métodos e case científico | research.ts, linhas, publicações/detalhes/projetos; relações e BibTeX | inventário, formatos e rotas passam | DOI/resumos ausentes não foram fabricados |
| 9 — editorial | insights.ts e seis parágrafos/conjuntos existentes | 12 Markdown PT/EN, parser, renderer, filtros e relacionados | parsing, datas, segurança, math/code/tabelas/figuras e preservação passam | CMS/admin e agendamento automático não implementados |
| 10 — internas | sobre, sistemas, assessoria, contato e privacidade | geometria compartilhada; dados/validações preservados; retrato sem blur/glass | 13 páginas × 13 viewports, um h1 e gutter passam | infra futura movida para docs, com conteúdo preservado |
| 11 — i18n | TreeWalker e metadata PT na V1 | [locale], proxy, Text, links; idiomas determinísticos SSR | 272 mensagens + 176 aliases, SSR/links/canonical EN e layout EN passam | aliases /pt não redirecionam para evitar ciclo de rewrite |
| 12 — SEO/distribuição | canonical, structured data, sitemap, OG | metadata helper, RSS, OG, sitemap, breadcrumbs e redirects 308 | todas as URLs do sitemap, RSS6, OG e redirects passam | RSS EN e revisão Search Console futura |
| 13 — qualidade | testes originais + problemas encontrados | Playwright/axe, inventário, APIs; bugs corrigidos antes de continuar | 29 unitários, 24 E2E; sem skip; contraste, foco e analytics passam | sem avaliação de campo, Safari/Firefox ou certificação WCAG |
| 14 — operação | notebook/Docker/CI/Resend/Vercel | Dockerfile/compose/.dockerignore/start/CI/env e DEPLOYMENT | Node22 Docker build, dev PT/EN/conteúdo/RSS e produção HTTP aprovados | porta3000 ocupada; teste isolado em3300/3301, sem interromper terceiros |
| 15 — entrega | inspeção real, medidas, instalação limpa e Git | VALIDATION_V2, pranchas e histórico semântico | suíte completa e smoke local; evidência final em VALIDATION_V2 | proprietário avalia localmente; deploy permanece fora da tarefa |

## Correções encontradas durante execução

Atualização pontual de Next/PostCSS/Vitest e transitivas eliminou os advisories reportados
pelo npm audit. Não houve atualização indiscriminada. Raiz Turbopack passou a ser o repo.
APIs agora limitam bytes reais do stream além de Content-Length.

Testes revelaram overflow do BibTeX em mobile (min-width do grid), contraste do ano/CTA
lateral, foco no ciclo do menu e chamadas locais inválidas de Vercel Analytics. Tudo foi
corrigido e reproduzido. Foco de feedback agora isola o fundo. Inspeção encontrou o botão
flutuante cobrindo texto mobile; ele passou ao fluxo da página nessas larguras.

Canonical sem barra final na raiz e snap serializado como `y` são comportamentos do
Next/Chromium; expectativas foram corrigidas com evidência, sem remover cobertura.
Lint foi configurado para excluir relatórios gerados do Playwright, sem ignorar código.
Windows bloqueou rebuild com standalone aberto; encerrados apenas os processos da tarefa.

## Preservação e futuro

Formação, fatos, perfis, serviços, seis sistemas, seis publicações e dois cases são
comparados com o inventário de `c0fc08a`. Seis notas mantêm slug/data/descrição/parágrafos.
Documentos operacionais V1 não foram apagados: estão sinalizados como históricos.

Newsletter funcional, admin/CMS, banco, infraestrutura VPS e analytics próprio ficam
documentados como futuro. A interface não coleta inscrições nem declara envio fictício.
Próxima fase recomendada: revisão do proprietário em ambiente local e seleção de ajustes
editoriais/visuais; qualquer publicação posterior exige aprovação explícita.
