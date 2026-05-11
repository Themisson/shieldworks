# ShieldWorks — Continuidade do Desenvolvimento

## Estado atual do projeto

- O site está publicado em https://www.shieldworks.com.br/.
- O projeto usa Next.js, TypeScript e TailwindCSS.
- O deploy é feito pela Vercel.
- O domínio é gerenciado pelo Cloudflare.
- O formulário de contato usa Resend.
- O e-mail de destino do formulário é `themisson@gmail.com`.
- O remetente temporário funcional é `onboarding@resend.dev`.
- O remetente definitivo planejado é `contato@shieldworks.com.br`, após validação do domínio `shieldworks.com.br` na Resend.
- O site possui páginas institucionais, pesquisa, sistemas, assessoria acadêmica, contato, privacidade e Insights.
- A seção Insights usa conteúdo local, sem CMS, SaaS, banco de dados ou painel administrativo neste momento.

## Stack técnica

- Next.js
- TypeScript
- TailwindCSS
- Vercel
- Cloudflare
- Resend
- Vercel Analytics
- Estrutura local de dados para Insights

## Principais diretórios

- `src/app/`: rotas do App Router, páginas públicas, sitemap, robots e APIs.
- `src/components/`: componentes reutilizáveis de interface.
- `src/data/`: dados locais do site, navegação, links profissionais e Insights.
- `src/app/api/contact/`: rota server-side do formulário de contato.
- `public/`: assets públicos, favicon, manifest, ícones e imagem Open Graph.
- `docs/`: documentação interna de setup, deploy, continuidade e manutenção.

## Funcionalidades existentes

- Páginas principais: Início, Sobre, Soluções, Sistemas, Pesquisa, Assessoria Acadêmica, Contato e Privacidade.
- Menu responsivo com hamburger no mobile.
- Estado ativo no menu com `aria-current`.
- Formulário de contato com validação e envio via Resend.
- Feedback flutuante em modal.
- Componente `ProfessionalLinks` para Lattes, ORCID, Google Acadêmico, GitHub e LinkedIn.
- Página `/insights`.
- Páginas dinâmicas de Insights em `/insights/[slug]`.
- `sitemap.xml` dinâmico incluindo Insights publicados.
- `robots.txt` permitindo indexação.
- Política de privacidade.
- SEO básico com metadata, Open Graph, Twitter card e JSON-LD.
- Vercel Analytics.

## Próximas prioridades

1. Validar o domínio `shieldworks.com.br` na Resend.
2. Trocar `CONTACT_FROM_EMAIL` para `contato@shieldworks.com.br`.
3. Testar o formulário após a troca.
4. Enviar sitemap no Google Search Console.
5. Solicitar indexação das páginas principais.
6. Manter Insights atualizados.
7. Avaliar CMS ou SaaS apenas futuramente, se houver necessidade real.

## Comandos principais

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Observações importantes

- Nunca versionar `.env.local`.
- Nunca expor `RESEND_API_KEY`.
- Não usar e-mail Gmail como remetente na Resend.
- Gmail deve ser usado apenas como destinatário.
- Manter linguagem institucional, profissional e pessoal.
- Não apresentar o site como página oficial do CBMAL.
