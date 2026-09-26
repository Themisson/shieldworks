# ADR 0003 — Narrativa em seções

Status: aceita. Data: 2026-09-26.

Decisão: seções semânticas com id e min-height: calc(100dvh - var(--header-height)).
Conteúdo sempre pode crescer. Snap y proximity apenas em desktops altos, desligado
no mobile, altura baixa e reduced motion. Nenhum interceptador de teclado/scroll.
Indicador usa IntersectionObserver e aria-current; âncoras descontam header.
Rejeitado: mandatory do MDFolio, porque o hub possui conteúdo de extensão variável.
