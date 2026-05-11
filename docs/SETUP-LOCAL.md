# Setup Local — ShieldWorks

## Pré-requisitos

- Node.js em versão compatível com o projeto.
- npm.
- Git.
- Acesso ao repositório GitHub.
- Opcionalmente Vercel CLI.

## Passo a passo

1. Clonar o repositório:

```bash
git clone URL_DO_REPOSITORIO
cd shieldworks
```

2. Instalar dependências:

```bash
npm install
```

3. Criar `.env.local`:

```bash
cp .env.example .env.local
```

No Windows PowerShell, se preferir:

```powershell
Copy-Item .env.example .env.local
```

Também é possível criar o arquivo manualmente.

4. Configurar variáveis:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=themisson@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

5. Rodar localmente:

```bash
npm run dev
```

6. Acessar:

```text
http://localhost:3000
```

7. Validar:

```bash
npm run lint
npm run build
```

## Problemas comuns

- Erro de variável ausente: confira se `.env.local` existe e contém `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL`.
- Erro da Resend por domínio não verificado: use `onboarding@resend.dev` para teste ou valide `shieldworks.com.br` na Resend antes de usar `contato@shieldworks.com.br`.
- Erro por usar Gmail como remetente: `CONTACT_FROM_EMAIL` não deve ser Gmail; Gmail pode ser usado como destinatário em `CONTACT_TO_EMAIL`.
- Erro de hydration causado por extensão do navegador: teste em janela anônima sem extensões, especialmente LanguageTool, Grammarly ou tradutores automáticos.
- Variáveis alteradas na Vercel sem efeito: depois de editar variáveis de ambiente na Vercel, faça redeploy.
