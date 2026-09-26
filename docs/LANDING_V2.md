# Landing implementada

`Landing` é Server Component com 12 seções: início, abordagem, soluções, pesquisa,
publicação, projetos, cases, conteúdo, conhecimento, sobre, atualizações e contato.
As fontes são os catálogos existentes, quatro projetos auditados e seis notas migradas.
Não há depoimentos, clientes, métricas ou resultados de pesquisa inventados.

A narrativa conecta formação/poço, discretização, software, dados e decisão. SVGs são
esquemáticos, sem escala ou dados de solver. O destaque científico é a publicação de
2025 já presente no baseline; seus metadados incompletos não foram preenchidos por hipótese.

## Comportamento

- A partir de 768 px, seções usam `min-height:calc(100dvh - var(--header-height))`.
- Em mobile, apenas o hero mantém essa altura mínima; demais seções crescem naturalmente.
- Não existe `height:100vh` rígido nem recorte de conteúdo.
- Snap `y proximity` só com largura >=1280, altura >=704 e movimento permitido.
- O indicador aparece com largura >=1760, altura >=704 e ponteiro fino/hover.
- Seção ativa é observada na faixa central da viewport; links têm `aria-current=location`.
- Âncoras usam scroll-padding e scroll-margin para o header sticky de 72 px.
- Teclas de rolagem não são interceptadas. Reduced motion remove snap e scroll suave.
- Sem JS, os textos e os SVGs finais continuam completos; a navegação do footer permanece.

O menu usa `dialog` nativo, foco cíclico e Escape. Feedback permanece flutuante em
desktop; em mobile está no fluxo após o footer para não cobrir texto.

## Movimento

`EngineeringScene` reúne seis desenhos contextuais: convergência, geomecânica,
discretização, sistemas, barreiras e conhecimento. Usa SVG inline e CSS; nenhuma
biblioteca de animação. IntersectionObserver inicia/pausa; aba oculta também pausa.
O controle de pausa é independente por cena e mantém o estado ao sair da viewport.
Animações só existem depois de montar o observer: ausência de JS mostra estado estático.
`prefers-reduced-motion` desativa animações/transições e deixa as curvas completas.
