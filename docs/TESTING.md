# Testes e inspeção local

Baseline `c0fc08a`: npm ci e check original passaram (16 testes, 272 mensagens, 23
páginas). Capturas em 390/1440 foram feitas antes de alterações. Vulnerabilidades e
problemas prévios estão em AUDIT_V2.md, sem atribuição à V2.

## Comandos

```bash
npm ci
npm run check
npm run check:content
npm run typecheck
npx playwright install chromium
npm run test:e2e
npm run inspect:local
npm audit
```

`check` executa lint, unitários, i18n e build. O build deve preceder E2E. Playwright
inicia seu próprio standalone em 127.0.0.1:3200, sem reusar servidor desconhecido;
dois workers, retries só no CI. `npm run test:e2e:report` abre relatório local.
Artefatos gerados não entram no Git/lint. Não adicionar skip para contornar regressões.

Primeira entrega: 29 testes unitários em sete arquivos e 24 E2E. A revisão de snap/SVG
adiciona três cenários de jornada: 12 cenas únicas, encaixe/avanço em cada tópico, roda
do mouse/PageDown, mandatory condicionado à altura real, conteúdo alto, tablet/mobile,
reduced motion, limpeza ao sair da landing e pausa das cenas. A revisão de cenas leves
adiciona dois (29 E2E): mandatory e uma seção por tela em 1366×650, 1280×720, 1440×790 e
1536×730 sem conteúdo fora da seção nem sob o avanço; ligação item↔parte por hover, foco
e sem JavaScript; sequência com régua do item; entrada só fora da tela; SVG só com
numerais. `e2e/about.spec.ts` adiciona três (32 E2E): retrato controlado, cenas e trilho
por largura, ligação estação↔parte, links e reduced motion. axe cobre também `/sobre`,
`/sistemas`, detalhe de case, `/conteudo` e publicações em EN. `inspect:local` usa
servidor próprio em 3400, captura 12 seções/dez internas e registra métricas sintéticas
em docs/validation; encerra o servidor ao terminar. Execute após E2E, que recria test-results.

Unitários preservam validação, API/rate-limit/escape existentes. Novos contratos cobrem
corpo de requisição em streaming, JSON front matter, datas, publicação/rascunhos,
Markdown seguro, math/code/tabelas, RSS, relacionados, BibTeX, rotas e inventário de conteúdo.

E2E visita 13 páginas em cada resolução: 360×800, 390×844, 430×932, 768×1024,
1024×768, 1280×720, 1366×768, 1440×900, 1536×864, 1600×900, 1707×898,
1920×1080, 2560×1440. Verifica status, h1, erros, overflow, gutter e seções sem recorte.
Gera capturas da home, artigo, projeto e contato em cada largura. Outros cenários cobrem
axe, foco, navegação, canonical/SSR PT/EN, redirects, RSS/sitemap/OG, 404, filtro,
formulário com API interceptada, teclado, snap, indicador, pausa e ausência de JS.

Nenhum teste envia e-mail real. E2E intercepta `/api/contact`; testes das APIs mockam
o provedor. Docker dev começa sem credenciais. Não usar env de produção no CI.

Capturas completas ficam em `test-results`. Pranchas e registro da inspeção humana
estão em `docs/validation` e VALIDATION_V2.md. A cobertura principal usa Chromium;
Safari/Firefox e leitores de tela reais são uma expansão futura, sem falsa alegação.

Docker foi validado em desenvolvimento e standalone de produção com smoke HTTP, PT/EN,
Markdown em runtime e RSS. Comandos operacionais em DEPLOYMENT.md.

Deck, Sobre em telas e tema (26/09/2026): 39 E2E e 33 unitários. `deck.spec` cobre
mandatory e telas que cabem em 1280×590 (home, Sobre PT/EN), âncoras exatas a 1440×790,
1280×590 e 390×740 e o ciclo armado→entrada→retorno por cima do slide. `theme.spec`
cobre sistema, troca, persistência, limpeza da chave, rótulos EN, aplicação durante
`loading` (sem flash) e axe no escuro. `theme.test.ts` executa o script de início.

Cabeçalhos (26/09/2026): 40 E2E. Um teste confirma na CSP apenas as origens de analytics
que o proxy de produção injeta (Cloudflare Web Analytics) e a ausência de unsafe-eval.
