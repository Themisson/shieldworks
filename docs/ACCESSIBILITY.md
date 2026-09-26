# Acessibilidade

Estrutura: html lang por rota, skip link traduzido, header/nav/main/footer, um h1 por
página, links com aria-current e foco global visível. SVGs informativos têm alternativa
conceitual; adornos são aria-hidden. Nenhuma informação depende do movimento.
Cenas não têm palavras no SVG: numerais correspondem a legenda HTML ou lista numerada.
O destaque parte↔item responde a hover e foco de teclado; não depende só de cor
(a parte ativa também muda de opacidade) nem de JavaScript.

Menu mobile: dialog nativo, fundo inerte, foco inicial, ciclo Tab/Shift+Tab, Escape e
retorno ao acionador. Feedback: aria-modal, título/descrição, fundo inerte, foco cíclico,
Escape, retorno ao botão e rolagem interna em viewport baixa. Não se usa outline:none
sem alternativa visível. Formulários mantêm labels, honeypot fora do foco, mensagens
aria-live e erros associados a cada campo.

Reduced motion: estado final das curvas, sem animações, transições, snap ou rolagem
suave. Sem JS: conteúdo SSR e SVG estático disponíveis, footer oferece rotas; formulários
e modais interativos precisam de JS e não simulam envio.

Targets principais de navegação/ações têm 44–48px. Com ponteiro fino, o avanço de seção
tem 36px e o controle de pausa 32px (acima dos 24px do WCAG 2.2 AA); em ponteiro grosso
ambos voltam a 44px. Indicador discreto tem 24×28px,
aparece apenas quando existe gutter suficiente. Medidas tipográficas e grids crescem
sem cortar conteúdo. Código/tabelas/equações possuem rolagem local.

Validação automatizada: axe WCAG 2 A/AA, 2.1 AA e 2.2 AA em 390 e 1440, além de
testes de teclado, foco, menu, feedback, seção ativa, snap/reduced motion, texto a 150%
e viewport de 1024×500. A matriz geométrica cobre as 13 resoluções solicitadas.

Limite: axe não substitui avaliação com leitor de tela ou pessoas com deficiência;
não se declara certificação WCAG. A revisão local registrou e corrigiu contraste do
ano editorial/CTA lateral, overflow do BibTeX e foco do menu. Evidências em TESTING.md.

Tema: botão no header com nome de ação ("Ativar tema escuro"), alvo de 40–44 px, foco
visível; preferência do sistema respeitada até haver escolha. axe (WCAG 2.2 AA) sem
violações no tema escuro em oito rotas a 390 e 1440. Slides não ocultam conteúdo
visível e não existem com reduced motion; âncoras enquadram a seção sob o header.
