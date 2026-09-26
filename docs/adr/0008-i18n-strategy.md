# ADR 0008 — Idioma na renderização

Status: aceita. Data: 2026-09-26.

Contexto: tradução por TreeWalker deixa metadata PT e interfere na propriedade React
dos nós. Decisão: português em URLs atuais; inglês em /en, renderizado no servidor.
Links alternativos só para equivalentes traduzidos, com canonical próprio e hreflang.
Sem detecção/redirecionamento automático que mude a URL indexada por browser language.
APIs, assets, feed e metadata globais não recebem prefixo arbitrário.
Conteúdo sem tradução tem idioma PT explícito; não inventar versão EN para SEO.

Implementação: `[locale]` com pt/en e proxy para preservar URLs PT sem prefixo.
Aliases `/pt` permanecem com canonical público sem prefixo; redirecioná-los no proxy
criaria ciclo com o rewrite. Sitemap não inclui aliases. Seis notas receberam versões
EN próprias. Metadados e navegação são localizados; não há idioma salvo no localStorage.
