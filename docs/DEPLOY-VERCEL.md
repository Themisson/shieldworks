# Deploy na Vercel — ShieldWorks

## Fluxo de deploy

1. Fazer commit no GitHub.
2. Fazer push para o repositório.
3. A Vercel detecta a alteração.
4. A Vercel executa o build.
5. O site é publicado.

## Variáveis na Vercel

Configure as variáveis em:

```text
Project → Settings → Environment Variables
```

Variáveis necessárias:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Configuração atual recomendada enquanto o domínio não estiver validado na Resend:

```env
CONTACT_TO_EMAIL=themisson@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Configuração definitiva após validação do domínio na Resend:

```env
CONTACT_TO_EMAIL=themisson@gmail.com
CONTACT_FROM_EMAIL=contato@shieldworks.com.br
```

## Redeploy

Após alterar variáveis de ambiente, faça redeploy do projeto. Mudanças em variáveis na Vercel não atualizam automaticamente um deploy já publicado.

## Domínio

- Domínio principal: https://www.shieldworks.com.br/
- Cloudflare gerencia DNS.
- Vercel hospeda o site.

## Checklist pós-deploy

- Testar home.
- Testar `/insights`.
- Testar um insight individual.
- Testar formulário de contato.
- Testar feedback.
- Testar `/sitemap.xml`.
- Testar `/robots.txt`.
- Testar layout mobile.
