# ADR 0004 — SVG e movimento

Status: aceita. Data: 2026-09-26.

Decisão: cenas próprias, científicas e explicitamente esquemáticas. CSS com transform,
opacity e dashoffset. IntersectionObserver pausa fora da viewport; aba oculta também.
Movimento contínuo oferece pausa e nunca é necessário para entender o desenho.
Reduced motion e ausência de JS mostram o estado final. Sem scroll listeners por frame.

Revisão solicitada pelo proprietário em 26/09/2026: substituir a primeira composição
por uma narrativa SVG mais legível; cada uma das 12 seções possui sua própria cena
contextual. Geologia/poço, malha, sistemas, barreiras e documentação se conectam no hero;
as cenas seguintes explicam abordagem, soluções, pesquisa, publicação, produtos, cases,
editorial, conhecimento, trajetória, distribuição e contato. Os movimentos mostram
relações e fluxos, sem fabricar dados/resultados nem alegar funcionalidades futuras.

## Segunda revisão — cenas leves e interativas (26/09/2026)

Pedido do proprietário: SVGs mais leves e iterativos. As 13 cenas (12 na landing e
`numerical` nas internas; `safety` não tinha uso e foi retirada) passam a traço fino
sobre a própria superfície da seção, sem painel escuro. Tokens `--art-*` mudam com
`.dark-section`; `vector-effect:non-scaling-stroke` mantém o traço leve em qualquer escala.

Decisão de arquitetura: `EngineeringScene` é Server Component; a arte não vai para o
bundle. `SceneFrame` (cliente) só alterna atributos: observer, aba oculta, reduced motion,
pausa, entrada e passo. Malhas são dois paths (arestas e nós), não dezenas de elementos.

Nenhuma palavra dentro do SVG: só numerais `01…0n`. Rótulos ficam em HTML legível:
legenda da figura ou a lista numerada que a seção já possui (`legend={false}`).
Cada parte numerada (`data-part`) liga-se ao item de mesmo número (`data-focus`):
hover/foco destaca a parte via CSS `:has()`, inclusive sem JavaScript.

Movimento: cenas que começam fora da tela se desenham ao entrar (uma vez); a cena
visível na carga nunca é ocultada. Com a cena visível e em execução, uma sequência
destaca parte por parte a cada 2,6 s, acende a régua do item correspondente e termina
num tempo de repouso com o desenho completo. Ponteiro ou foco em item numerado da
mesma seção suspende a sequência (eventos de ponteiro/foco, nunca de scroll). Fluxos
pontilhados e a varredura do Gabarita seguem pausados fora da viewport. Reduced motion
e ausência de JS mostram o desenho completo e estático.

## Extensão — Sobre (26/09/2026)

Quatro cenas da Sobre (`about-artwork.tsx`) usam o mesmo `SceneFrame`. Duas extensões:
`narrowViewBox` permite um segundo SVG com layout próprio para telas <48rem (em vez de
reduzir o desenho até ficar ilegível) e `.scene-scope` liga texto numerado a cenas fora
da landing. As regras de destaque cobrem até nove partes. O mapa de trajetória não é
cronológico: a posição não representa datas não documentadas.
