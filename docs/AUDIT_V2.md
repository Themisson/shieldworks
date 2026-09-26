# Auditoria inicial — ShieldWorks 2.0

Data: 2026-09-26. Antes de qualquer edição de código.

## A. Git

`origin`: https://github.com/Themisson/shieldworks.git. `main`, SHA inicial `c0fc08a`.
Status limpo; nenhum arquivo não rastreado. Fetch executado; HEAD...origin/main = 0/0.
Histórico de 20 commits inspecionado. Branch de implementação: `feat/shieldworks-v2`.

## B. Ambiente

Windows; Node 24.18.0; npm 12.0.2; Git 2.54.0; Docker 29.8.0; Compose 5.5.1.
Daemon Docker acessível. CI original: Node 22; sem engines. Lockfile: Next 16.2.6,
React/React DOM 19.2.6, Vitest 3.2.7. Tailwind 3.4.17, TypeScript 5.7.2.

## C. Baseline

`npm ci`: sucesso, 443 pacotes. `npm run check`: lint, 16 testes (4 arquivos),
check:i18n (272 mensagens), build (23 páginas) passaram. Dev em 127.0.0.1:3100.
Inspeção real de capturas Playwright 1440×900 e 390×844; overflow 0 em ambas.
Nenhum POST real executado. Produção consultada somente para leitura.

Débitos anteriores: Turbopack seleciona lockfile em C:/Users/themi; 12 alertas npm
(2 baixos, 3 moderados, 6 altos, 1 crítico); scripts de esbuild/sharp/unrs-resolver
bloqueados pelo npm 12, mas checks funcionais passaram. Next vulnerável em Windows:
https://github.com/advisories/GHSA-p293-qw3h-jr36 (corrigido em 16.3.3).

## D. Arquitetura existente

Next App Router, dados estáticos TypeScript, sem banco ou CMS. Rotas: /, /sobre,
/solucoes, /sistemas, /pesquisa, /insights, /insights/[slug] (6),
/assessoria-academica, /contato, /privacidade, /whatsapp; APIs contact e feedback.
Assets: retratos, hero WebP, icon/favicon, OG PNG. Tailwind com petróleo, grafite,
sinal e segurança; .section-shell usa max-w-7xl. Header sticky, footer,
cards, CTA, Reveal, modal de feedback e formulários compartilhados.

PT/EN: dicionário com chaves e TreeWalker no DOM, localStorage e detecção do navegador;
metadata permanece PT. SEO: canonical www, OG, Twitter, Person/Organization/WebSite,
Article e breadcrumbs; sitemap usa data atual para tudo. Resend via fetch nas DUAS
APIs (CLAUDE.md antigo descrevia feedback incorretamente). Validação, honeypot,
escape HTML, limite de 8/min em memória e verificação parcial de tamanho de body.
CSP contém unsafe-inline/unsafe-eval; analytics Vercel e eventos existentes.

## E. Referências e diferenças

Checkouts locais: MDFolio 046ef4a, AcadImprove 447cdb3, Sursum 40c1013.
AGENTS, CLAUDE quando existente (MDFolio não possui CLAUDE.md), documentação de design,
ADRs de layout/motion, containers, landing, tokens, testes E2E, CI e Docker lidos.

| Referência | Evidência | Princípio adaptado |
| --- | --- | --- |
| MDFolio | ADR 0010/0013; LandingScreens; tokens; landing E2E | gutter único, medida de leitura, observer, indicador |
| AcadImprove | ADR 0029/0026; PageContainer/LandingSection; layout E2E | faixa full-width, min-height, grid fluido, fallback sem JS |
| Sursum | DESIGN/LANDING; layout/tokens; StoryScene/HeroStory; layout E2E | ilustração contextual, pausa, conteúdo real, composição editorial |

Não importar o snap mandatory do MDFolio, autenticação/banco dos SaaS, nem suas
paletas/ilustrações. Sursum usa gutter até 64px e não usa snap; ShieldWorks adotará
gutter menor e proximity condicionado à viewport. Node/CI e Docker diferem por projeto.

## F–H. Inventário de preservação

| Parte | Classificação | Ação |
| --- | --- | --- |
| site.ts, cases.ts, publications.ts | PRESERVAR | fontes existentes; ampliar sem remover |
| 6 insights e URLs | PRESERVAR/REFATORAR | migrar para Markdown, compatibilidade por redirect |
| formação, Sobre, retrato, links | PRESERVAR | adaptar composição e tradução |
| serviços, assessoria, sistemas e estágios | PRESERVAR/REFATORAR | mesma informação em estrutura larga |
| APIs, formulários, Resend, honeypot, analytics | PRESERVAR/REFATORAR | revisar robustez; testes sem envio |
| tokens, shell, header/footer, cards, CTA | REFATORAR | geometria e identidade V2 |
| home/hero raster | SUBSTITUIR | SVG original; manter asset histórico |
| TreeWalker e reveal invisível sem JS | DEPRECAR | renderização React e fallback visível |
| SEO/sitemap/robots/privacidade | PRESERVAR/REFATORAR | adicionar rotas, datas honestas e idiomas |
| unitários e CI | PRESERVAR/AMPLIAR | E2E, axe, conteúdo, Docker |
| projetos, linhas científicas, RSS, editorial | NOVO | somente dados com fontes |

## I–K. Proposta e fases

Hub engenharia/pesquisa/software/segurança. Caderno de engenharia e instrumentação
como linguagem própria: petróleo profundo, grafite, sinal técnico, geometria de
malhas/poço/dados. Novas rotas de projetos, pesquisa, publicações, cases, conteúdo,
feed; Markdown seguro no servidor, matemática e código; inglês em URL própria,
português sem prefixo para preservar indexação. Newsletter sem backend não simula sucesso.

Ordem: documentação/inventário → segurança/ambiente → tokens/layout → navegação →
landing/SVG/motion → soluções/projetos/pesquisa → editorial → internas/i18n →
SEO/RSS/OG → testes/visual → Docker/operação → validação final.
Segurança antecipada por advisory crítico. Atualizar os documentos conforme a implementação.

## L–M. Riscos e impedimentos

Riscos: tradução técnica, redirects/indexação, viewport baixa/zoom, contraste,
medida em ultrawide, fontes baixadas no build, CSP ampla, limite não distribuído,
metadata científica incompleta. Não há bloqueio para trabalho local.
Credenciais reais não lidas; apenas .env.example. Newsletter/CMS/VPS dependem de
futuras decisões externas e não serão ativados. Browser integrado indisponível;
Playwright local usado para verificação real. Não fazer deploy.
