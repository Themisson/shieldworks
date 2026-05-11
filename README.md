# ShieldWorks

Site profissional de Themisson dos Santos Vasconcelos, construído com Next.js, TypeScript e TailwindCSS.

## Objetivo

O projeto funciona como portfólio profissional, vitrine de serviços, página de autoridade técnica e acadêmica, base futura para sistemas/SaaS/cursos/produtos digitais e ponto de contato para clientes, instituições, alunos, pesquisadores e interessados em consultoria.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Lucide React
- SEO básico, sitemap, robots e manifest PWA inicial

## Rodar localmente

```bash
npm install
npm run dev
npm run build
npm run start
```

Após `npm run dev`, acesse `http://localhost:3000`.

## Estrutura principal

```text
src/app
  page.tsx
  sobre/page.tsx
  solucoes/page.tsx
  sistemas/page.tsx
  pesquisa/page.tsx
  assessoria-academica/page.tsx
  contato/page.tsx
src/components
src/data
docs
public
```

## Variáveis e links futuros

Use `.env.example` como referência. Não versione `.env`.

Placeholders preparados:

- Currículo Lattes
- ORCID
- Google Scholar
- LinkedIn
- GitHub
- URL pública do site

## Formulários

Os formulários de contato e feedback já enviam dados para rotas internas:

- `POST /api/contact`
- `POST /api/feedback`

As rotas fazem validação básica e retornam resposta JSON. O formulário de contato está preparado para envio por e-mail via Resend quando `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` estiverem configuradas no ambiente. Não versionar `.env.local`.

## Como adicionar um novo Insight

Nesta fase, a seção Insights usa conteúdo local versionado no código. O site não possui CMS, painel administrativo, login ou banco de dados para publicações.

Para adicionar uma nova publicação:

1. Abra `src/data/insights.ts`.
2. Adicione um novo objeto no array `insights` com:
   - `slug`
   - `title`
   - `description`
   - `date`
   - `category`
   - `tags`
   - `published`
   - `content`
3. Use `published: true` para exibir o conteúdo no site e no sitemap.
4. Rode:

```bash
npm run build
```

5. Publique um novo deploy.

## Analytics

O projeto está preparado com Vercel Analytics usando o pacote oficial `@vercel/analytics`. A coleta deve permanecer restrita a métricas de uso e desempenho, sem envio de dados sensíveis dos formulários.

## GitHub

Se a GitHub CLI estiver autenticada:

```bash
gh auth login
gh repo create shieldworks --public --source=. --remote=origin --push
```

Fluxo manual alternativo:

```bash
git init
git add .
git commit -m "Initial ShieldWorks website"
git branch -M main
git remote add origin https://github.com/USUARIO_GITHUB/shieldworks.git
git push -u origin main
```

O repositório pode ser público se não houver dados sensíveis. Caso sejam adicionados documentos pessoais, currículo detalhado, credenciais, chaves, bases de dados ou arquivos institucionais restritos, use repositório privado.

## Deploy

Documentação:

- `docs/deploy-vercel.md`
- `docs/deploy-digitalocean.md`
- `docs/dominio-e-publicacao.md`
- `docs/estrutura-do-site.md`

## Segurança

- Não versionar `.env`.
- Não incluir senhas, tokens, credenciais ou arquivos pessoais sem revisão.
- Não publicar documentos institucionais restritos.
- Manter links acadêmicos como placeholders até validação.

## Observação institucional

As soluções, sistemas e demonstrações apresentados neste site integram uma iniciativa profissional pessoal. Elas não devem ser interpretadas como sistemas oficiais do CBMAL ou de qualquer órgão público sem contratação, autorização ou publicação institucional específica.
