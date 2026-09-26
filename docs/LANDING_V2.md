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
- Snap `y proximity` com largura >=768, altura >=600 e movimento permitido.
- Desktop >=1024×600 com hover/ponteiro fino pode usar `y mandatory` se **todas** as
  seções couberem na altura útil, incluindo conteúdo, padding e link de avanço.
  Medido: cabe em 1366×650, 1280×720, 1440×790, 1536×730 e maiores (área útil real
  de laptops comuns com a barra do navegador).
- Em alturas ≤900px e ≤672px, listas e ilustrações ficam um pouco mais densas; telas
  altas mantêm o ritmo amplo. Nenhum texto é ocultado; só os símbolos decorativos dos
  cards de projeto (`aria-hidden`) somem em telas baixas, pois a cena já os representa.
- `ScreenDeck` mede via ResizeObserver, após fontes e resize; se conteúdo/zoom exceder
  a tela, volta a proximity. Não há listener de scroll/wheel/touch nem preventDefault.
- Mobile, altura <600 ou reduced motion: sem snap. `scroll-snap-stop:normal` deixa
  saltar tópicos. Footer tem snap-align end; Home/End continuam alcançando os extremos.
- Cada seção oferece âncora nativa para a seguinte, posicionada no padding inferior
  reservado da própria seção (não cobre conteúdo); a última volta ao início. Scroll
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

`EngineeringScene` (Server Component) reúne 13 desenhos, dos quais 12 diferentes estão
na landing: convergência, abordagem, soluções, pesquisa, publicação, produtos, cases,
editorial, conhecimento, trajetória, RSS e contato; `numerical` atende páginas internas.
`scene-artwork.tsx` contém geometrias originais e primitivas leves de formação salina,
poço revestido, malha graduada (dois paths), gráfico, documento, janela e escudo.
Traço fino sobre a superfície da seção, sem painel; a paleta segue o tema da seção.
O hero amplia o intervalo salino numa malha refinada junto ao poço e segue para análise
e integridade. SVG inline e CSS; nenhuma biblioteca de animação nem raster gerado.

Dentro dos desenhos só há numerais. Os rótulos ficam em HTML: legenda da figura ou a
lista numerada da própria seção (passos, soluções, linhas de pesquisa, projetos, cases,
credenciais, links do ecossistema). Hover ou foco num item numerado destaca a parte de
mesmo número (CSS `:has()`, funciona sem JS). Com a cena visível, uma sequência destaca
parte por parte, acende a régua do item correspondente e repousa no desenho completo;
ponteiro/foco do leitor suspende a sequência. Cenas fora da tela desenham-se ao entrar.
`SceneFrame` controla observer, aba oculta, pausa individual e reduced motion; sem JS
ou com reduced motion o desenho aparece completo e estático.

O movimento é discreto: fluxo pontilhado, destaque sequencial, desenho de entrada e
pequena varredura. A geometria estática e as legendas explicam tudo sem animação.
Nenhum número de dashboard ou resultado científico fictício é apresentado. As cenas
dos produtos representam apenas recursos confirmados, não interfaces operacionais.

Links da lista de soluções: engenharia e segurança → `/solucoes`, pesquisa → `/pesquisa`,
sistemas → `/sistemas`, assessoria → `/assessoria-academica` (revisão de 26/09/2026).
