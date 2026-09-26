# Acessibilidade

Estrutura: html lang por rota, skip link traduzido, header/nav/main/footer, um h1 por
página, links com aria-current e foco global visível. SVGs informativos têm alternativa
conceitual; adornos são aria-hidden. Nenhuma informação depende do movimento.

Menu mobile: dialog nativo, fundo inerte, foco inicial, ciclo Tab/Shift+Tab, Escape e
retorno ao acionador. Feedback: aria-modal, título/descrição, fundo inerte, foco cíclico,
Escape, retorno ao botão e rolagem interna em viewport baixa. Não se usa outline:none
sem alternativa visível. Formulários mantêm labels, honeypot fora do foco, mensagens
aria-live e erros associados a cada campo.

Reduced motion: estado final das curvas, sem animações, transições, snap ou rolagem
suave. Sem JS: conteúdo SSR e SVG estático disponíveis, footer oferece rotas; formulários
e modais interativos precisam de JS e não simulam envio.

Targets principais de navegação/ações têm 44–48px. Indicador discreto tem 24×28px,
aparece apenas quando existe gutter suficiente. Medidas tipográficas e grids crescem
sem cortar conteúdo. Código/tabelas/equações possuem rolagem local.

Validação automatizada: axe WCAG 2 A/AA, 2.1 AA e 2.2 AA em 390 e 1440, além de
testes de teclado, foco, menu, feedback, seção ativa, snap/reduced motion, texto a 150%
e viewport de 1024×500. A matriz geométrica cobre as 13 resoluções solicitadas.

Limite: axe não substitui avaliação com leitor de tela ou pessoas com deficiência;
não se declara certificação WCAG. A revisão local registrou e corrigiu contraste do
ano editorial/CTA lateral, overflow do BibTeX e foco do menu. Evidências em TESTING.md.
