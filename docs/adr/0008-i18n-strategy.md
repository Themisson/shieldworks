# ADR 0008 — Idioma na renderização

Status: aceita. Data: 2026-09-26.

Contexto: tradução por TreeWalker deixa metadata PT e interfere na propriedade React
dos nós. Decisão: português em URLs atuais; inglês em /en, renderizado no servidor.
Links alternativos só para equivalentes traduzidos, com canonical próprio e hreflang.
Sem detecção/redirecionamento automático que mude a URL indexada por browser language.
APIs, assets, feed e metadata globais não recebem prefixo arbitrário.
Conteúdo sem tradução tem idioma PT explícito; não inventar versão EN para SEO.
