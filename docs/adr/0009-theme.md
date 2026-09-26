# ADR 0009 — Tema claro e escuro

Status: aceita. Data: 2026-09-26.

Contexto: o proprietário pediu a escolha de tema já presente nos outros produtos.
Referência principal: AcadImprove (ADR 0026 daquele projeto), por ser a decisão mais
recente e a mais testada; MDFolio e Sursum confirmaram o uso de `data-theme` e de um
script antes da primeira pintura. Gabarita ainda não tem tema.

Decisão:

- `data-theme="light|dark"` no `<html>`. Sem escolha salva, vale `prefers-color-scheme`,
  acompanhado ao vivo. Escolher o tema igual ao do sistema apaga a chave, então o site
  volta a seguir o sistema. Chave única: `shieldworks:theme` em `localStorage`.
- Script mínimo e constante no `<head>` (`THEME_INIT_SCRIPT` em `src/lib/theme.ts`):
  aplica o tema com o documento ainda em `loading`, sem flash; só lê a própria chave.
  A CSP já permite scripts inline (exigência do Next); não há cookie, então as páginas
  seguem estáticas.
- Sem JavaScript, o bloco escuro também vale sob `@media (prefers-color-scheme: dark)`
  para `:root:not([data-theme])`.
- Um botão no header, em todas as larguras e fora do menu mobile, nomeia a ação
  ("Ativar tema escuro" / "Switch to dark theme"). Os dois ícones são renderizados e o
  CSS mostra o correto a partir de `data-theme`, então a hidratação não troca o ícone.
  A troca explícita faz uma transição de cor de 350 ms, desligada em reduced motion.
- Tokens: `src/styles/tokens.css` define as duas paletas, incluindo `--button-*`,
  `--warm` e `--night-line`. A paleta Tailwind V1 (graphite, petroleum, safety, white)
  passou a ler variáveis `--c-*`: no escuro as escalas são espelhadas, de modo que as
  páginas ainda V1 continuam legíveis (painéis escuros viram claros e vice-versa).
- `viewport.themeColor` por esquema e atualização da meta `theme-color` na troca.

Consequências: preferência apenas visual, não altera conteúdo, URL ou SEO. axe cobre o
tema escuro em oito rotas e duas larguras; teste unitário cobre o script de início.
Páginas V1 no escuro são legíveis, mas a coerência visual completa depende da migração
listada em PAGE_REVIEW_V2.
