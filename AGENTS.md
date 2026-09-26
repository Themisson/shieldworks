# ShieldWorks — contrato de desenvolvimento

Leia `docs/AUDIT_V2.md`, `docs/ARCHITECTURE.md` e as ADRs aplicáveis antes de alterar arquitetura.

- Trabalhar na branch da tarefa. Não publicar, fazer merge, tag, release, alterar DNS ou infraestrutura sem autorização explícita.
- Preservar dados, URLs relevantes, privacidade, analytics e APIs. Nunca enviar e-mails reais em testes.
- Não inventar recursos, clientes, métricas, DOI ou produção científica. Registrar fonte e estágio dos projetos.
- Server Components por padrão. Conteúdo editorial é Markdown de autoria confiável, sem execução de JSX ou HTML arbitrário.
- Estrutura full-width; gutter único; limitar a medida do texto, não a aplicação.
- SVGs autorais e semânticos. Movimento opcional, pausado fora da viewport, com equivalente estático e controle de pausa.
- Sem listeners de scroll por frame. Não ocultar conteúdo se JavaScript estiver ausente.
- PT/EN renderizado pela árvore React. Não substituir nós do DOM.
- Mudanças de arquitetura exigem documentação e ADR. Documentos distinguem implementado de futuro.
- Rodar `npm run check`, `npm run test:e2e` e validar Docker quando tocado. Não silenciar falhas.
- Commits pequenos, Conventional Commits. Nunca versionar segredos, builds, node_modules ou bancos.

Referências estudadas, somente leitura: MDFolio, AcadImprove e Sursum. A identidade da ShieldWorks é própria.
