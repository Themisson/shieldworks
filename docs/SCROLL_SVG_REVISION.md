# Revisão de navegação vertical e SVGs

Solicitação do proprietário após a primeira entrega `2e44565`, em 26/09/2026.
Implementação local na mesma branch `feat/shieldworks-v2`, sem publicação.
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
