# ShieldWorks — orientação para agentes

Leia [AGENTS.md](AGENTS.md), [ARCHITECTURE.md](docs/ARCHITECTURE.md) e ADRs relevantes.
Este arquivo acompanha o código atual; o texto V1 foi preservado em docs/legacy/CLAUDE.md.

Next App Router com `src/app/[locale]`; PT mantém URLs e EN usa `/en`. Proxy reescreve
para `/pt`, sem redirecionar aliases e causar ciclos. LocaleProvider recebe idioma SSR.
Não usar TreeWalker, WeakMap de textos ou preferência local para trocar conteúdo indexado.

Catálogos em `src/data`; editorial em Markdown `content/articles/{pt,en}`, com JSON
front matter validado. `insights.ts` é referência de preservação, não fonte para novos
artigos. HTML/JSX de autoria não é executado. Figuras e referências exigem fonte.

Gutter único de tokens.css, sem max-width global. Limite apenas medidas de leitura.
SVGs próprios, IntersectionObserver, pausa e reduced motion. Conteúdo SSR sempre visível.

Contato **e feedback** enviam Resend quando configurados; ambos validam e limitam pedidos.
Não há armazenamento de mensagens no banco. Não usar credenciais reais em testes.
Vercel Analytics é montado na Vercel; eventos existentes estão em src/lib/analytics.ts.

Comandos: npm ci; npm run dev; npm run check; npm run typecheck; npm run check:content;
npm run test:e2e após build. Docker opcional em DEPLOYMENT.md. Pare standalone antes de
rebuild no Windows. Generated reports não são código e ficam fora do lint/Git.

Implementação e revisão ficam locais na branch da tarefa. Não publicar nem alterar
infraestrutura externa. Não inventar fatos, DOI, funcionalidades, métricas ou prova social.
