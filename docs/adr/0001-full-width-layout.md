# ADR 0001 — Estrutura full-width

Status: aceita para implementação local. Data: 2026-09-26.

Contexto: .section-shell limita toda a aplicação a 1280px. Em telas largas isso
desperdiça espaço e confunde geometria estrutural com legibilidade.
Decisão: viewport → gutter → composição. Sem max-w-6xl/7xl estruturais.
Texto, formulário, código e figura podem ter medidas próprias; grids usam minmax(0,…).
Consequência: testar alinhamento e overflow em 360–2560px. Referências: MDFolio ADR0010,
AcadImprove ADR0029, Sursum layout.css. Nenhuma identidade visual será copiada.
