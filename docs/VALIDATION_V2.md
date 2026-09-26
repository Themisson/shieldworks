# Entrega e validação local — ShieldWorks 2.0

Data: 26/09/2026. Branch `feat/shieldworks-v2`. Commit inicial `c0fc08a`;
código final validado em `a435d0a`, seguido pelo commit de documentação/evidências.
O SHA da entrega completa é o HEAD dessa branch (`git rev-parse HEAD`).
`main` e `origin/main` continuam em `c0fc08a`. Nenhum push, merge, tag, release,
deploy, configuração Vercel, DNS, migração ou envio real de e-mail foi realizado.

## Resultado

A base existente evoluiu para um hub com landing de 12 seções, composição full-width,
gutter único, seis cenas SVG próprias, navegação compacta, projetos/produtos, linhas
de pesquisa, publicações, cases e plataforma editorial Markdown. PT/EN são renderizados
no servidor, com URL determinística e metadata localizada. A identidade usa linguagem
de instrumentação, modelos e documentação técnica; não foram copiados os visuais das referências.

Auditoria A–M, baseline e comparação com MDFolio, AcadImprove e Sursum estão em
[AUDIT_V2.md](AUDIT_V2.md). Cada fase registra análise, mudanças, motivo, arquivos,
testes, resultado, débitos e próxima etapa em [IMPLEMENTATION_V2.md](IMPLEMENTATION_V2.md).
Oito ADRs e os documentos de arquitetura/design/editorial/operação descrevem o código real.

## Arquitetura e conteúdo

- Next 16.3.3 / React 19.2.6, App Router, Server Components, Node 22/24; Vercel compatível.
- `src/app/[locale]`: páginas PT/EN; proxy mantém português sem prefixo. `/pt` é alias
  com canonical sem prefixo, fora do sitemap; não há tradução por manipulação do DOM.
- `src/styles`: tokens, gutter `clamp(1rem,.5rem + 1vw,2rem)`, grids fluidos e medidas
  locais; header/footer/internas seguem a mesma geometria.
- Landing: `min-height`, sem corte; snap proximity condicionado a desktop/altura/motion;
  indicador por IntersectionObserver; SVG estático sem JS, pausa fora de vista e controle manual.
- `content/articles/{pt,en}`: seis notas preservadas e seis traduções, front matter
  validado, Markdown sem execução de JSX/HTML, GFM, KaTeX, código, figuras e referências.
- Formulários/APIs: validações, Resend, honeypot, rate limit, analytics e escape HTML
  preservados; limite de corpo agora verifica bytes reais do stream.

Inventário automatizado mantém formação, perfis, serviços, seis capacidades de sistemas,
seis publicações e dois cases. Cada nota portuguesa preserva slug, data, descrição e
parágrafos originais. Assets antigos e documentos históricos não foram descartados.
O planejamento de subdomínios foi movido da interface para DEPLOYMENT.md com justificativa.
Não foram inventados DOI, resultados, clientes, certificações, depoimentos ou métricas comerciais.

## Rotas e compatibilidade

| Grupo | Destinos |
|---|---|
| Mantidos/refatorados | `/`, `/sobre`, `/solucoes`, `/sistemas`, `/pesquisa`, `/assessoria-academica`, `/contato`, `/privacidade`, `/whatsapp` |
| Projetos | `/projetos`, `/projetos/{mdfolio,acadimprove,sursum,gabarita}` |
| Pesquisa | `/pesquisa/{geomecanica,metodos-numericos,engenharia-de-pocos,projetos,publicacoes}` |
| Publicações | `/pesquisa/publicacoes/[id]`: seis registros existentes, citação/BibTeX e fonte acadêmica |
| Editorial | `/conteudo`, `/conteudo/[slug]`: seis notas, filtros GET e relacionados |
| Cases | `/cases`, `/cases/{apb-evaporitos-termomecanica,sistema-gestao-academica}` |
| Idioma | equivalentes de apresentação em `/en/...`; alternância preserva a página |
| Distribuição | `/feed.xml`, `/og?title=...`, sitemap/robots/manifest |
| Redirects 308 | `/insights` → `/conteudo` e respectivos slugs, incluindo versões `/en` e `/pt`; host canônico original preservado |

SEO inclui canonical, hreflang, OG/Twitter por página, breadcrumbs e JSON-LD de
Organization/Person/WebSite, Article, publicações e projetos. Sitemap tem 68 URLs
canônicas verificadas; RSS tem seis notas PT. Datas editoriais vêm do conteúdo.
AcadImprove e Gabarita não recebem URL pública inferida. Admin/CMS e assinatura por
e-mail não estão ativos: a interface oferece RSS e explica a disponibilidade real.

## Verificações finais

| Verificação | Resultado |
|---|---|
| `npm ci` | instalação limpa concluída; lockfile preservado |
| `npm run lint` | aprovado |
| `npm run test` | 29 testes / 7 arquivos aprovados, incluindo os 16 originais |
| `npm run check:i18n` | 272 mensagens, 176 aliases e sete chaves obrigatórias aprovados |
| `npm run build` | aprovado; 93 páginas geradas, standalone e proxy |
| `npm run check` | pipeline agregado aprovado |
| `npm run typecheck` | aprovado |
| `npm run check:content` | oito testes editoriais aprovados |
| `npm run test:e2e` | 24 testes Chromium aprovados em 55,8 s; nenhum skip |
| `npm audit` | zero vulnerabilidades reportadas em 26/09/2026 |
| `npm run inspect:local` | capturas e medições locais concluídas; log do servidor sem erro |
| Docker production | build Node 22 aprovado; usuário uid=1000; sete destinos HTTP 200, PT/EN, Markdown, publicação, RSS e OG |
| Docker Compose dev | build/up aprovados; home PT/EN, artigo e RSS HTTP 200; containers da tarefa encerrados |

Baseline separado: `c0fc08a` passou lint/16 testes/i18n/build antes das mudanças.
Advisories existentes motivaram correções pontuais de Next/PostCSS/Vitest e transitivas,
sem atualização indiscriminada. O aviso npm 12 sobre postinstall bloqueado de resolver
não impediu instalação, build ou testes; Node 22/Docker também foi validado.
CI foi atualizado para qualidade, Playwright e build Docker, sem etapa de publicação;
não foi executado remotamente porque a branch não foi enviada.

E2E cobre 13 páginas em cada uma das resoluções: 360×800, 390×844, 430×932,
768×1024, 1024×768, 1280×720, 1366×768, 1440×900, 1536×864, 1600×900,
1707×898, 1920×1080 e 2560×1440. Verifica overflow, gutter, h1, erros, crescimento
das seções, menus, foco/Escape, âncoras, teclado, indicador, snap, reduced motion,
SVG sem JS/fora de vista, PT/EN, aliases/redirects, todas as URLs do sitemap,
404, filtros, formulário interceptado e evento de contato sem dados pessoais.
Também verifica texto a 150% e viewport baixa. API real de e-mail não foi chamada.

## Inspeção visual e acessibilidade

Capturas reais do Chromium foram abertas e inspecionadas: hero em todas as larguras,
12 seções, páginas de projeto/artigo/contato, pesquisa/publicação e Sobre. Verificados
alinhamentos, recortes, medidas, contraste, retrato, SVGs, menu, foco e footer.
E2E mantém home/artigo/projeto/contato completos em cada resolução; o inspector
captura dez páginas internas em 390/1440. Artefatos completos ficam em `test-results`
e o relatório em `playwright-report`, regeneráveis e fora do Git.

- [Mobile/tablet: cinco viewports](validation/viewports-mobile-tablet.png)
- [Desktop: oito viewports](validation/viewports-desktop.png)
- [Narrativa: 12 seções](validation/landing-desktop.png)
- [Medições e recursos](validation/performance-local.json)

Axe WCAG 2 A/AA, 2.1 AA e 2.2 AA retornou zero violações nas seis páginas cobertas
em 390/1440. Teclado, foco, modais, lang, skip link e motion têm testes de comportamento.
Isso não equivale a certificação WCAG nem substitui testes com leitores de tela reais.
Problemas encontrados e corrigidos: BibTeX ampliando grid mobile, contraste do ano/CTA,
ciclo de foco, feedback sobre texto em mobile e chamada local indevida de analytics.

## Performance local

Chromium headless, standalone no notebook, contextos novos, sem throttling de CPU/rede;
uma execução de inspeção, não Lighthouse nem dados de campo. SVG leve, fontes hospedadas
pela aplicação e conteúdo principal SSR. Analytics Vercel monta somente em ambiente Vercel.

| Viewport | LCP/FCP | CLS | JS transferido | Recursos transferidos |
|---|---|---|---|---|
| 390×844 | 136 ms | 0 | 184.135 bytes | 297.871 bytes |
| 1440×900 | 180 ms | 0 | 186.104 bytes | 321.799 bytes |

Tempo bloqueante além de 50 ms em tarefas longas: 20/25 ms, respectivamente. Os valores
não são promessa de desempenho em rede móvel, INP ou Core Web Vitals de produção.
Não há listener de scroll por frame nem biblioteca pesada de animação.

## Avaliar no notebook

Nenhuma credencial é necessária. A porta 3000 estava ocupada por um serviço alheio à
tarefa, que não foi interrompido. Use uma porta livre, por exemplo:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3100
# ou preview do build já validado:
npm run start -- --hostname 127.0.0.1 --port 3100
```

Acesse `http://127.0.0.1:3100`, `/en`, `/projetos`, `/pesquisa` e `/conteudo`.
Pare o standalone antes de reconstruir no Windows. Docker é opcional; fluxos completos
e portas 3300/3301 em [DEPLOYMENT.md](DEPLOYMENT.md). Volumes de desenvolvimento foram
preservados; os containers de teste estão parados. Deixe Resend vazio durante avaliação.

## Limites e próxima fase

- Revisão editorial das traduções e apresentação pelo proprietário antes de publicação.
- Safari/Firefox, leitor de tela real, CI remoto e preview Vercel ainda não executados.
- Rate limit permanece por instância; CSP ainda usa inline para hidratação/JSON-LD.
- Fontes exigem acesso à origem no primeiro build; RSS separado EN não implementado.
- Newsletter por e-mail, CMS/admin, banco, uploads, analytics próprio e VPS são futuros
  documentados, sem infraestrutura provisionada ou sucesso de envio fictício.
- DOI/metadados não presentes nas fontes continuam ausentes; confirmar antes de acrescentar.

Próxima fase: avaliação local pelo proprietário e ajustes solicitados. Qualquer publicação
ou alteração externa exige autorização explícita. A implementação desta tarefa termina aqui.
