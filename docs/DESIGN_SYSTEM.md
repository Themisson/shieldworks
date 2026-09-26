# Sistema visual implementado

Fontes: Outfit para composição e leitura; IBM Plex Mono para índices, legendas e código.
`next/font` hospeda os arquivos na aplicação com `display: swap`. O build ainda precisa
obter as fontes na primeira execução; não há chamadas do navegador ao Google Fonts.

## Tokens

`src/styles/tokens.css` é a fonte da V2. `--page-gutter` =
`clamp(1rem, .5rem + 1vw, 2rem)`: 16 px em mobile, cerca de 22 px em 1440, 32 px
em 2560. Header, footer e todas as páginas usam `.section-shell` sem max-width global.
`PageContainer` é o wrapper equivalente para novos componentes.

| Família | Tokens / uso |
|---|---|
| Medida | `--reading-measure:65ch`, `--wide-reading-measure:72ch`, `--form-measure:48rem` |
| Geometria | header 4.5rem; espaço de seção `clamp(3rem,7dvh,7rem)`; gap `clamp(1.5rem,4vw,5rem)` |
| Landing | espaço próprio `clamp(1.5rem,4dvh,4rem)`; uma altura mínima útil por seção; avanço nativo |
| Superfícies | papel `#f6f8f7`, branco e petróleo `#102e36`/`#09232b` |
| Informação | tinta `#142f36`, secundária `#4e6368`, sinal `#1c6b59`, verde claro `#9ee4b9`, âmbar `#e6bd60` |
| Forma | raios .25rem/.75rem; sombra apenas para elementos flutuantes |
| Tipo | display, seção e lead fluidos; altura da viewport também limita títulos grandes |
| Movimento | 160ms para resposta; 450ms destaque de cena; passo de 2,6s; easing no arquivo |
| Camadas | header 50, indicador 40, dialog 70; dialog nativo usa top layer |

Composição larga, leitura com medida local. Grids usam `minmax(0,...)`; filhos têm
`min-width:0`, incluindo artigos e BibTeX. Tabelas, equações e código podem rolar
localmente sem ampliar o documento. Não usar `overflow-x:hidden` para encobrir defeitos.

Compatibilidade: a paleta Tailwind V1 permanece nos componentes de conteúdo preservados.
Não é um segundo sistema de geometria: `.section-shell` e os tokens V2 governam a página.
Cards foram simplificados; gradientes principais e hover com elevação foram retirados.
Evoluções devem convergir estilos de componente para tokens, sem alterar dados.

Foco global usa contorno visível; em superfícies escuras, âmbar. Contraste é coberto por
axe nas páginas de entrada, pesquisa, projeto, artigo, contato e sobre em inglês.

## Ilustrações

`src/styles/scenes.css`: traço de 1–2px sem escala (`non-scaling-stroke`), preenchimento
branco/petróleo conforme a seção, verde para método/sistema e âmbar para fluxo/atenção.
Tokens `--art-ink|mute|soft|accent|warm|fill|tint|text`; `.dark-section` redefine todos.
Sem texto no SVG além de numerais; legenda HTML em `.scene-legend`. Alturas por variante:
hero `min(50dvh,32rem)`, standard `min(46dvh,28rem)`, compacta `clamp(7rem,21dvh,13rem)`.
Parte ativa: opacidade 1 e traço em verde; demais recuam para .36. Item numerado ativo
acende `border-top` com `--focus-accent`. Variante `wide` (`min(40dvh,21rem)`, alinhada à
esquerda) para mapa e processo; `narrowViewBox` troca o layout abaixo de 48rem. Linhas do
mapa: âmbar operação, verde engenharia/pesquisa, tinta computação, cinza-verde ensino.
