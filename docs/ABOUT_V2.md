# Página Sobre — V2

Redesenho solicitado pelo proprietário em 26/09/2026. Rota `/sobre` e `/en/sobre`,
Server Component em `src/app/[locale]/sobre/page.tsx`, estilos em `src/styles/about.css`.

## Estado anterior

Hero V1 (`page-hero`, `SectionTitle`) com grade `lg:0.95fr/1.05fr`: o retrato ocupava a
primeira coluna inteira, com `min-h-[520px]`, `fill`, `sizes="42vw"` e uma faixa escura de
legenda — 648×622 px em 1440 e a primeira tela inteira em 390. A síntese profissional era
uma grade de cartões com ícones e as frentes de atuação, três `CardShell` + `CTA` V1.
O retrato dominava porque a altura mínima fixa e a coluna larga não dependiam do conteúdo.

## Nova estrutura

Deck de oito telas, como a landing (`ScreenDeck`): cada tema ocupa uma tela, encaixa ao
rolar ou ao clicar nas âncoras e entra como slide. Medido: todas cabem de 1280×590 a
2560×1440 em PT e EN; no mobile as telas crescem com o conteúdo.

| # | Tela (id) | Conteúdo | Visual |
|---|---|---|---|
| 1 | Origem (`origem`) | frase, contexto curto, âncoras internas | cena `aboutConvergence` |
| 2 | Quem sou | retrato 4:5, nome, papéis, biografia, perfis, ressalva institucional | — |
| 3 | Trajetória | mapa de quatro linhas e nove estações de uma linha | cena `career` / trilho mobile |
| 4 | Áreas | engenharia, pesquisa, tecnologia, segurança com ramificações | cena `aboutAreas` |
| 5 | Pesquisa aplicada | processo em seis etapas | cena `researchProcess` |
| 6 | Produção científica | linhas de pesquisa, três publicações, CTAs | — |
| 7 | Princípios | método, rigor, documentação, validação, aplicação | tipografia |
| 8 | Hoje | frase de fechamento, projetos e contato | — |

## Fotografia

Mesma imagem (`public/image-themisson.jpeg`), agora na seção 2. `aspect-ratio: 4/5`,
sem legenda sobreposta nem sombra. Larguras: 176 px (<48rem, centralizada), 208 px
(48–64rem), 240 px (64–80rem) e 280 px a partir de 80rem — nunca cresce além disso.
Em desktops baixos, para a tela caber: 208 px até 800 px de altura e 176 px até 608 px.
`sizes` acompanha essas larguras, então o navegador baixa uma variante pequena.

## Conteúdo e fatos

Os textos vêm do conteúdo existente; o catálogo `src/data/profile.ts` registra a fonte de
cada estação e eixo. Confirmado pelo proprietário em 26/09/2026: posto de Tenente-Coronel
do CBMAL e "Mestrado e Doutorado em Engenharia Civil, área de concentração Estruturas". Não há cronologia comprovada para formação e carreira, por isso a
trajetória é um mapa de conexões, não uma linha do tempo: só aparecem anos documentados
(tese e docência em 2019, publicações de 2024 e 2025). Pendências do proprietário estão
em [PAGE_REVIEW_V2.md](PAGE_REVIEW_V2.md).

## SVGs e movimento

`src/components/illustrations/about-artwork.tsx`, registrados no mesmo sistema de cenas
(`EngineeringScene` + `SceneFrame`): convergência (malha com cargas e apoios, formação
salina com poço e curva conceitual de fluência, código e dados, barreiras de segurança),
rede de quatro eixos, processo de pesquisa em seis etapas e mapa de conhecimento.

- Entrada: linhas do mapa desenhadas progressivamente e estações surgindo em sequência,
  apenas quando a seção entra na viewport (IntersectionObserver).
- Sequência: cada parte numerada é destacada por vez, com a régua do item de texto.
- Hover/foco nos itens numerados (estações, eixos, etapas) destaca a parte da cena;
  funciona sem JavaScript. Fluxos pontilhados pausam fora da viewport e na aba oculta.
- `researchProcess` tem layout horizontal e um vertical 3×2 para telas <48rem. O mapa de
  trajetória some no mobile; as mesmas estações viram um trilho vertical legível.

Reduced motion: sem entrada, sequência, fluxo ou transições; desenhos completos e estáticos,
controle de pausa oculto. Sem JavaScript: conteúdo e desenhos completos.

## Testes

`e2e/about.spec.ts`: dimensões do retrato em 1440/768/390, primeira tela sem retrato
dominante, h1 único, cenas visíveis por largura, troca mapa→trilho, ligação estação↔parte,
links principais, ausência de overflow e estado final com reduced motion. `layout.spec`
cobre `/sobre` nas 13 resoluções e axe em PT e EN. Capturas: `docs/validation/about-*.png`.
