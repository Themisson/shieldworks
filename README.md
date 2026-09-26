# ShieldWorks 2.0

Engenharia, pesquisa e software aplicados a problemas reais. Hub profissional e
científico de Themisson dos Santos Vasconcelos: soluções, produtos, publicações,
cases e conteúdo técnico. Implementação local para revisão, sem publicação nesta tarefa.

## Rodar no notebook

Node 22.12+ ou 24, npm e Git. Nenhuma variável de ambiente é necessária para visualizar.

```bash
npm ci
npm run dev
```

Acesse http://localhost:3000. Para testar produção local, pare o dev e execute:

```bash
npm run build
npm run start
```

Se 3000 estiver ocupada, use `npm run dev -- --hostname 127.0.0.1 --port 3100`
ou `npm run start -- --port 3100` e acesse http://127.0.0.1:3100.

O servidor usa standalone. Pare-o antes de um novo build no Windows.
Resend só envia mensagens se as três variáveis de `.env.example` forem configuradas.
Deixe-as vazias durante a avaliação; nunca envie teste a terceiros.

Docker é opcional: `docker compose up --build`. Porta padrão 3000; se ocupada, use
`$env:SHIELDWORKS_PORT='3300'` no PowerShell antes do comando. Instruções completas,
imagem de produção e ciclo dos volumes: [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Verificar

```bash
npm run check
npm run typecheck
npm run check:content
npx playwright install chromium
npm run test:e2e
```

E2E usa porta 3200, build de produção, 13 resoluções, axe, teclado, idiomas e formulários
interceptados. `npm run test:e2e:report` abre o relatório. Não testa e-mail real.

## Organização

```text
src/app/[locale]/     páginas e metadata PT/EN
src/app/api/          contato e feedback preservados
src/components/      layout, editorial, landing e SVGs próprios
src/styles/          tokens e geometria full-width
src/data/            fatos profissionais, soluções, projetos, cases e publicações
content/articles/    notas Markdown PT/EN
src/lib/editorial.ts  parsing validado e consultas
e2e/                 Playwright e axe
docs/                arquitetura, ADRs, auditoria e validação
```

Português preserva URLs existentes; inglês usa `/en`. `/insights` redireciona para
`/conteudo`. Catálogos de projetos, cases e pesquisa têm detalhes próprios. RSS:
`/feed.xml`. Não existem CMS/admin, banco editorial ou newsletter por e-mail ativos.

## Documentação

- [Auditoria inicial](docs/AUDIT_V2.md) e [arquitetura](docs/ARCHITECTURE.md)
- [Sistema visual](docs/DESIGN_SYSTEM.md) e [landing](docs/LANDING_V2.md)
- [Conteúdo](docs/CONTENT_ARCHITECTURE.md) e [edição](docs/EDITORIAL_SYSTEM.md)
- [Pesquisa](docs/RESEARCH_ARCHITECTURE.md) e [projetos](docs/PROJECTS_ARCHITECTURE.md)
- [SEO](docs/SEO.md), [acessibilidade](docs/ACCESSIBILITY.md), [segurança](docs/SECURITY.md)
- [Testes](docs/TESTING.md), [registro de fases](docs/IMPLEMENTATION_V2.md), [validação](docs/VALIDATION_V2.md)
- [Operação local e futuro](docs/DEPLOYMENT.md), [ADRs](docs/adr)

Orientações de agentes em [AGENTS.md](AGENTS.md). Documentos V1 estão preservados
como histórico; prevalecem os documentos V2 acima. Não fazer merge/main, push, tag,
release, deploy, DNS ou migração sem aprovação explícita do proprietário.
