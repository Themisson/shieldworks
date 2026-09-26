# ShieldWorks 2.0 — arquitetura implementada

Next.js 16.3.3 App Router, React 19.2.6, TypeScript, Tailwind e CSS de domínio.
Node 22.12+ ou 24; Node 22 é o ambiente do CI e Docker. Dependências foram corrigidas
por advisories concretos, descritos em SECURITY.md. Não há banco, CMS ou autenticação.

## Módulos

| Camada | Fonte | Responsabilidade |
|---|---|---|
| Rotas | `src/app/[locale]` | páginas PT/EN, metadata, geração estática |
| Entrada PT | `src/proxy.ts` | rewrite das URLs existentes para `/pt`, mantendo URL pública |
| Domínio | `src/data` | identidade, serviços, sistemas, cases, publicações e projetos |
| Editorial | `content/articles/{pt,en}` + `src/lib/editorial.ts` | Markdown validado, publicação, filtros e relacionados |
| Geometria | `src/styles/tokens.css`, `v2.css` | gutter único, medidas locais e grids fluidos |
| Narrativa | `src/components/landing` | do problema físico à decisão documentada |
| Ilustração | `src/components/illustrations` | 17 cenas server-side (12 na landing, 4 na Sobre), partes numeradas ligadas ao texto, movimento opcional |
| Deck de telas | `src/components/layout/screen-deck.tsx` | encaixe medido e slides na landing e na Sobre |
| Tema | `src/lib/theme.ts`, `src/components/theme-toggle.tsx` | claro/escuro sem flash ([ADR 0009](adr/0009-theme.md)) |
| Perfil | `src/data/profile.ts` + `src/app/[locale]/sobre` | estações, eixos e princípios da Sobre com a fonte de cada fato ([ABOUT_V2](ABOUT_V2.md)) |
| SEO | `src/lib/page-metadata.ts`, `src/app/{sitemap,robots,og,feed.xml}` | canonical, hreflang, imagens e distribuição |
| Comunicação | `src/app/api`, `src/lib/{api-request,email,form-validation,rate-limit}` | contato/feedback, Resend e proteção |

Server Components são padrão. Clientes são limitados a navegação/modal, idioma,
formulários, feedback, observação de seções e controle das cenas. `Text` usa o idioma
inicial vindo da rota, inclusive no SSR; não há substituição de nós do DOM.

## Rotas públicas

Mantidas: `/`, `/sobre`, `/solucoes`, `/sistemas`, `/pesquisa`, `/assessoria-academica`,
`/contato`, `/privacidade`, `/whatsapp`. A mesma árvore tem equivalentes em `/en`.

Novas: `/projetos` e quatro detalhes; `/conteudo` e seis notas; `/cases` e dois detalhes;
`/pesquisa/{geomecanica,metodos-numericos,engenharia-de-pocos,projetos,publicacoes}`
e seis detalhes de publicação; `/feed.xml` e `/og?title=...`.

`/insights` e seus slugs têm redirects 308 para `/conteudo`, incluindo prefixos PT/EN.
Aliases diretos `/pt` têm canonical sem prefixo e não entram no sitemap. Redirecionar
esses aliases no proxy causaria ciclo ao processar o rewrite; ver ADR 0008.

Páginas de conteúdo individual são estáticas no build. A listagem `/conteudo` é SSR
para filtros GET. API e OG são dinâmicos; RSS/sitemap são gerados no build. Agendamento
editorial exige novo build na data prevista, não existe scheduler ativo.

## Preservação

`content/baseline-inventory.json` registra os dados do commit inicial `c0fc08a`.
Testes comparam formação/links/serviços/sistemas/cases/publicações; outro teste compara
cada parágrafo, slug e data dos seis insights com os arquivos Markdown. A home V1 e
`insights.ts` permanecem como referência histórica, fora da apresentação principal.
`Reveal` é um wrapper de compatibilidade que sempre mostra conteúdo.

O bloco público de subdomínios futuros saiu de `/sistemas` e está preservado em
DEPLOYMENT.md: planejamento de infraestrutura não é uma capacidade disponível.

## Execução

Vercel permanece compatível. `output: standalone` também gera servidor Node/Docker;
`outputFileTracingIncludes` inclui Markdown usado pelo SSR. `scripts/start.mjs`
copia assets para standalone e inicia o servidor local. Nenhuma infraestrutura externa
foi alterada. Limites reais e evolução futura estão em DEPLOYMENT.md e SECURITY.md.
