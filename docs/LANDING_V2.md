# Landing implementada

`Landing` é Server Component com 12 seções: início, abordagem, soluções, pesquisa,
publicação, projetos, cases, conteúdo, conhecimento, sobre, atualizações e contato.
As fontes são os catálogos existentes, quatro projetos auditados e seis notas migradas.
Não há depoimentos, clientes, métricas ou resultados de pesquisa inventados.

A narrativa conecta formação/poço, discretização, software, dados e decisão. SVGs são
esquemáticos, sem escala ou dados de solver. O destaque científico é a publicação de
2025 já presente no baseline; seus metadados incompletos não foram preenchidos por hipótese.

## Comportamento

- Todas as seções usam `min-height:calc(100dvh - var(--header-height))`, inclusive mobile.
- A altura é mínima, não rígida: em mobile/tablet ou desktop baixo, conteúdo cresce naturalmente.
- Não existe `height:100vh` rígido nem recorte de conteúdo.
- Snap `y proximity` com largura >=768, altura >=704 e movimento permitido.
- Desktop >=1280×800 com hover/ponteiro fino pode usar `y mandatory` se **todas** as
  seções couberem na altura útil, incluindo conteúdo, padding e link de avanço.
- `LandingSnap` mede via ResizeObserver, após fontes e resize; se conteúdo/zoom exceder
  a tela, volta a proximity. Não há listener de scroll/wheel/touch nem preventDefault.
- Mobile, altura <704 ou reduced motion: sem snap. `scroll-snap-stop:normal` deixa
  saltar tópicos. Footer tem snap-align end; Home/End continuam alcançando os extremos.
- Cada seção oferece âncora nativa para a seguinte; a última volta ao início. Scroll
  suave é CSS, nunca uma animação JavaScript que disputa o controle com o usuário.
- O indicador aparece com largura >=1760, altura >=704 e ponteiro fino/hover.
- Seção ativa é observada na faixa central da viewport; links têm `aria-current=location`.
- Scroll-padding do snap é exatamente o header sticky de 72 px; evita uma fatia da
  seção anterior na tela. As âncoras fora desse modo usam o respiro global existente.
- Teclas de rolagem não são interceptadas. Reduced motion remove snap e scroll suave.
- Sem JS, os textos e os SVGs finais continuam completos; a navegação do footer permanece.

O menu usa `dialog` nativo, foco cíclico e Escape. Feedback permanece flutuante em
desktop; em mobile está no fluxo após o footer para não cobrir texto.

## Movimento

`EngineeringScene` reúne 14 desenhos contextuais, dos quais 12 diferentes estão na
landing: convergência, abordagem, soluções, pesquisa, publicação, produtos, cases,
editorial, conhecimento, trajetória, RSS e contato. Numérico e segurança complementam
as páginas internas. `scene-artwork.tsx` contém geometrias originais e primitivas de
formação salina, poço revestido, malha triangular, painel, documento e barreiras.
O hero conecta essas disciplinas numa cena legível, sem raster gerado. Usa SVG inline e CSS; nenhuma
biblioteca de animação. IntersectionObserver inicia/pausa; aba oculta também pausa.
O controle de pausa é independente por cena e mantém o estado ao sair da viewport.
Animações só existem depois de montar o observer: ausência de JS mostra estado estático.
`prefers-reduced-motion` desativa animações/transições e deixa as curvas completas.

O movimento é discreto: fluxo pontilhado, desenho de curvas, respiração de campos e
pequena varredura geométrica. Labels e geometria estáticos explicam tudo sem animação.
Nenhum número de dashboard ou resultado científico fictício é apresentado. As cenas
dos produtos representam apenas recursos confirmados, não interfaces operacionais.
