# Deploy na Vercel

## Uso recomendado

Vercel é indicada para o site principal da ShieldWorks por ter integração direta com Next.js.

## Passos

1. Envie o projeto para o GitHub.
2. Acesse `https://vercel.com`.
3. Crie um novo projeto.
4. Importe o repositório `shieldworks`.
5. Framework preset: Next.js.
6. Build command: `npm run build`.
7. Output: padrão do Next.js.
8. Configure variáveis de ambiente se necessário.
9. Publique.

## Domínio

Após o deploy:

1. Abra o projeto na Vercel.
2. Vá em Settings > Domains.
3. Adicione `shieldworks.com.br`.
4. Adicione também `www.shieldworks.com.br`, se desejar.
5. Copie os registros DNS indicados pela Vercel para o Registro.br.

## Comandos locais antes do deploy

```bash
npm install
npm run build
```

## Observações

- Não envie `.env`.
- Use variáveis no painel da Vercel para dados sensíveis.
- A cada push na branch principal, a Vercel pode publicar automaticamente.
