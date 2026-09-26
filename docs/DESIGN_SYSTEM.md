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
| Superfícies | papel `#f6f8f7`, branco e petróleo `#102e36`/`#09232b` |
| Informação | tinta `#142f36`, secundária `#4e6368`, sinal `#1c6b59`, verde claro `#9ee4b9`, âmbar `#e6bd60` |
| Forma | raios .25rem/.75rem; sombra apenas para elementos flutuantes |
| Tipo | display, seção e lead fluidos; altura da viewport também limita títulos grandes |
| Movimento | 160ms para resposta; 12s para cenas; easing documentado no arquivo |
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
