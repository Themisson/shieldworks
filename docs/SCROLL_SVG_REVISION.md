# Revisão de navegação vertical e SVGs

Solicitação do proprietário após a primeira entrega `2e44565`, em 26/09/2026.
Implementação local na mesma branch `feat/shieldworks-v2`; publicada com a V2 em
26/09/2026 ([DEPLOYMENT](DEPLOYMENT.md)).
Código: `138f98e`. Check e 27 E2E finais aprovados (54,7 s).

## 1. O que foi analisado

Geometria das 12 seções, snap existente, CSS global, observer, movimento e SVGs.
Revisitadas as decisões de MDFolio (ADR 0013), AcadImprove (ADR 0029) e Sursum
(LANDING). O comportamento foi adaptado à quantidade real de conteúdo da ShieldWorks.

## 2. O que foi alterado

Cada seção tem `min-height:calc(100dvh - var(--header-height))`, `scroll-snap-align:start`
e uma âncora nativa de avanço. A última volta ao início. O conteúdo pode crescer.

| Contexto | Comportamento |
|---|---|
| Desktop >=1280×800, hover/ponteiro fino | mandatory somente se todas as seções cabem na área útil |
| Desktop com conteúdo alto, ou altura 704–799 | proximity |
| Tablet >=768px e altura >=704px | proximity |
| Mobile/altura <704px | sem snap |
| Reduced motion | sem snap, scroll suave ou animação |
| Sem JavaScript | conteúdo/SVG estático; proximity nos tamanhos elegíveis |

`LandingSnap` usa ResizeObserver e mudança de media queries/fontes. Não escuta scroll,
wheel ou touch, não captura teclado e não usa preventDefault. `scroll-snap-stop:normal`
permite saltar tópicos. Footer com snap-align end mantém End acessível. Se uma seção
crescer, mandatory é retirado automaticamente e todo seu conteúdo continua alcançável.

O hero foi redesenhado em SVG próprio: formação salina/poço revestido → malha triangular
→ código/análise → integridade. As demais seções têm 11 desenhos distintos de abordagem,
soluções, pesquisa, publicação, produtos, cases, editorial, rede, trajetória, RSS e contato.
Cenas compactas possuem composição horizontal própria, sem reduzir um desenho inteiro
a uma miniatura no centro do painel. Duas variantes adicionais atendem às páginas internas.

Movimento: fluxo pontilhado, desenho de curvas/checks, respiração do campo/rede e
varredura discreta. Pausa individual, pausa fora da viewport/aba oculta e estado estático
completo em reduced motion/sem JS. Sem raster gerado nem biblioteca de animação.
As figuras são conceituais; nenhum valor de solver, recurso futuro ou resultado foi inventado.

## 3. Por que foi alterado

Conduzir a leitura entre tópicos com mais clareza e presença visual. Mandatory global
sem medir o conteúdo poderia incomodar em zoom/telas baixas. O critério geométrico
preserva o encaixe perceptível em desktop e a liberdade nas demais situações.
A nova ilustração conecta disciplinas e entregas reais, com linguagem própria.

## 4. Arquivos afetados

- `src/components/landing/{landing,landing-snap,section-advance,section-indicator,sections}`
- `src/components/illustrations/{engineering-scene,scene-artwork}`
- `src/styles/{tokens,v2,scenes}.css`
- `e2e/{layout,landing-journey}.spec.ts`, `scripts/inspect-local.mjs`
- ADRs 0003/0004, LANDING_V2, DESIGN_SYSTEM, ARCHITECTURE, TESTING e evidências

## 5–6. Testes e resultados

`npm run check` aprovado: lint, 29 unitários, i18n (272 mensagens/176 aliases) e build.
Playwright ampliado para 27 cenários, com a matriz original de 13 resoluções e axe.
Novos cenários verificam 12 cenas únicas, altura mínima, snap-align/stop, todos os
avanços, roda do mouse, PageDown, Home/End, conteúdo alto, mudança de viewport/motion,
limpeza do snap ao sair da home, pausa, estado estático e IDs únicos dos SVGs.
Build Docker Node22 e smoke PT/EN/Markdown/RSS repetidos; sem e-mail real.

Medição confirmou uma seção na área útil de 1440×900, 1707×898, 1920×1080 e
2560×1440. Desktop mais baixo e mobile podem exigir seções maiores; isso é permitido
e não provoca recorte. Capturas finais em `docs/validation`, completas em `test-results`.

## 7. Limites

Validação de navegador usa Chromium. Safari/Firefox, leitores de tela reais e sensibilidade
ao movimento por pessoas continuam como avaliações futuras. A medição sintética local
não promete comportamento/performance em todos os dispositivos. `min-height` não garante
altura exata quando conteúdo/zoom exige crescimento: essa é uma proteção intencional.

## 8. Próxima fase

Proprietário avalia a rolagem e os SVGs em `http://127.0.0.1:3100`. Nenhuma alteração
de conteúdo, URLs, APIs, infraestrutura ou publicação faz parte desta revisão.

## Segunda revisão

Solicitação do proprietário em 26/09/2026, após `2bdfe1b`: SVGs mais leves e iterativos
em imagem e animação, e a sensação clara de "agora estou vendo outro tópico" a cada
rolagem, com `min-height`, sem cortar, sobrepor ou bloquear conteúdo. Local, sem publicação.

### 1. O que foi analisado

As 12 cenas eram painéis escuros com texto de 7–10 px dentro do SVG, 937 elementos
SVG na home e a arte inteira no bundle cliente. Medindo a área útil real de navegadores
(1366×650, 1280×720, 1440×790, 1536×730), 5–10 seções passavam da tela e o snap caía
para proximity ou nenhum: o encaixe só acontecia em ≥1920×950. A principal causa era a
altura dos painéis empilhados sob o texto e o link de avanço ocupando uma linha própria.

### 2. O que foi alterado

- Cenas: traço fino sobre a superfície da seção, sem painel; tokens `--art-*` por tema.
  Nenhuma palavra no SVG, só numerais; rótulos em legenda HTML ou na lista numerada da
  seção. Malhas com dois paths. `safety`, sem uso, foi retirada; 13 cenas no total.
- Interação: hover/foco em item numerado destaca a parte de mesmo número (CSS `:has()`,
  sem JS). Sequência iterativa parte a parte, com repouso no desenho completo, régua do
  item acesa em sincronia e suspensão enquanto o leitor aponta ou foca um item.
- Movimento: entrada desenhada só para cenas que começam fora da tela; fluxo e varredura
  pausados fora da viewport, na aba oculta ou pelo controle; reduced motion estático.
- Arquitetura: `EngineeringScene` Server Component + `SceneFrame` cliente mínimo.
- Rolagem: avanço no padding inferior reservado; densidade moderada só em alturas
  ≤900px e ≤672px; mandatory em ≥1024×600 com ponteiro fino quando tudo cabe (medido).

### 3. Por que foi alterado

Traço leve e texto HTML legível reduzem peso visual e técnico e tornam os desenhos
explicativos em qualquer largura. A ligação parte↔item transforma a figura em leitura
guiada sem esconder conteúdo. Cenas mais baixas permitem que cada tópico ocupe uma tela
nos laptops mais comuns, que é onde o encaixe perceptível faltava.

### 4. Arquivos afetados

- `src/components/illustrations/{engineering-scene,scene-artwork,scene-frame}.tsx`
- `src/components/landing/{landing,landing-snap}.tsx` e quatro páginas internas com cena
- `src/styles/{scenes,v2}.css`, `e2e/landing-journey.spec.ts`
- ADRs 0003/0004, LANDING_V2, DESIGN_SYSTEM, ACCESSIBILITY, ARCHITECTURE, TESTING,
  VALIDATION_V2, IMPLEMENTATION_V2 e `docs/validation`

### 5–6. Testes e resultados

`npm run check` aprovado: lint, 29 unitários, i18n e build. Playwright: 29 cenários
aprovados (dois novos), incluindo a matriz de 13 resoluções, axe e ausência de JS. Novos
cenários cobrem mandatory e uma seção por tela nos quatro tamanhos de laptop, sem
conteúdo fora da seção nem sob o avanço; ligação por hover, foco e sem JS; sequência;
entrada; e SVG apenas com numerais.

Comparação local dos builds de produção (Chromium, mediana de três cargas, 1440×900):

| Métrica | Antes (`2bdfe1b`) | Depois |
|---|---|---|
| Elementos SVG nas cenas | 937 | 342 |
| Elementos DOM da página | 1.649 | 1.076 |
| Textos dentro dos SVGs | 83 | 42 (só numerais) |
| JS transferido | 198.712 bytes | 182.252 bytes |
| HTML transferido | 24.755 bytes | 32.744 bytes |
| Layout (CDP) | 75 ms | 66 ms |

O HTML cresce porque a árvore SVG do Server Component também segue no payload RSC; o
saldo de transferência HTML+JS ainda é cerca de 8,5 KB menor. Recalcular estilos subiu
de 21 para 26 ms pelos seletores `:has()`. Encaixe mandatory medido em 1366×650,
1280×720, 1440×790, 1536×730, 1440×900, 1920×950 e 2560×1300; em 1366×620 e 1280×600
algumas seções crescem e o snap fica em proximity, como previsto.

### 7. Limites

Somente Chromium foi exercitado. `:has()` exige navegadores de 2023 em diante; sem ele,
o desenho e o texto continuam completos, apenas sem o destaque ao apontar. Altura de
fonte/zoom maiores fazem seções crescerem e retiram mandatory de propósito. Numerais
das cenas compactas ficam pequenos em telas muito baixas; o significado está no texto.

### 8. Próxima fase

Proprietário avalia rolagem, legibilidade e ritmo das animações em navegador real.
Ajustes finos possíveis: intervalo da sequência (2,6 s) e densidade em alturas baixas.
