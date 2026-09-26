# ADR 0003 — Narrativa em seções

Status: aceita. Data: 2026-09-26.

Decisão: seções semânticas com id e min-height: calc(100dvh - var(--header-height)).
Conteúdo sempre pode crescer. Snap y proximity apenas em desktops altos, desligado
no mobile, altura baixa e reduced motion. Nenhum interceptador de teclado/scroll.
Indicador usa IntersectionObserver e aria-current; âncoras descontam header.
Decisão original: mandatory rejeitado inicialmente por conteúdo de extensão variável.

## Revisão solicitada pelo proprietário — 26/09/2026

Todas as seções passam a ter a altura mínima da área útil também em mobile, podendo
crescer. Navegação sequencial usa âncoras nativas, sem capturar wheel, touch ou teclado.
Tablet (>=768px, altura >=704px) usa proximity. Desktop com ponteiro fino (>=1280px,
altura >=800px) pode usar mandatory somente quando ResizeObserver confirma que todas
as seções cabem na área útil. Conteúdo maior, fontes/zoom ou resize retiram mandatory.
Mobile/altura baixa/reduced motion usam rolagem natural, sem snap. Footer recebe alvo
de snap para manter End acessível; scroll-snap-stop permanece normal, nunca always.
O fallback sem JavaScript é proximity nos tamanhos elegíveis. A revisão substitui
a rejeição geral de mandatory; o critério agora é a geometria real, não só a largura.

## Segunda revisão — encaixe em laptops reais (26/09/2026)

Medição com a área útil real dos navegadores (1366×650, 1280×720, 1440×790, 1536×730)
mostrou 5–10 seções acima da tela: o encaixe só ocorria em ≥1920×950. Com cenas mais
baixas, o link de avanço no padding inferior reservado da seção (nunca sobre o conteúdo)
e densidade moderada apenas em alturas ≤900px/≤672px, as 12 seções cabem nesses tamanhos.

O critério geométrico permanece a decisão: mandatory em ≥1024×600 com hover e ponteiro
fino somente se ResizeObserver confirmar que todas as seções cabem; proximity em ≥768×600;
sem snap no mobile, em altura <600px e em reduced motion. `min-height` continua mínimo,
nunca altura fixa: zoom, fonte maior ou conteúdo novo fazem a seção crescer e retiram
mandatory automaticamente.
