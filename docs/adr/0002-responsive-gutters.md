# ADR 0002 — Um gutter

Status: aceita. Data: 2026-09-26.

Decisão: --page-gutter: clamp(1rem, 0.5rem + 1vw, 2rem).
Header/footer/landing/internas compartilham a mesma faixa. Não aplicar gutter duas vezes.
O indicador só aparece onde há espaço reservado e ponteiro preciso.
Alternativa rejeitada: aumentar max-width global, que apenas adia o problema.
