# Domínio e Publicação

## Registro de domínio no Registro.br

1. Acesse `https://registro.br`.
2. Pesquise o domínio desejado.
3. Crie ou acesse sua conta.
4. Informe os dados do titular.
5. Conclua o pagamento.
6. Após a liberação, configure os servidores DNS conforme a plataforma de hospedagem.

## Sugestões de domínio

- `shieldworks.com.br`
- `shieldworkstec.com.br`
- `shieldworksengenharia.com.br`
- `themissonvasconcelos.com.br`

## Domínio principal e subdomínios

O domínio principal representa o site institucional, por exemplo:

- `shieldworks.com.br`

Subdomínios organizam aplicações futuras sem misturar o site principal com sistemas:

- `app.shieldworks.com.br`
- `demo.shieldworks.com.br`
- `monitor.shieldworks.com.br`
- `academy.shieldworks.com.br`

## DNS básico

Configurações comuns:

- Registro `A`: aponta o domínio para um endereço IP.
- Registro `CNAME`: aponta um subdomínio para outro host, comum em Vercel, Render e serviços SaaS.
- Registro `MX`: configura e-mail profissional.
- Registro `TXT`: valida domínio, SPF, DKIM, DMARC e integrações.

Exemplo para Vercel:

- `shieldworks.com.br` com registro `A` para o IP indicado pela Vercel.
- `www.shieldworks.com.br` com `CNAME` para `cname.vercel-dns.com`.

Sempre confirme os valores atuais no painel da plataforma antes de salvar no DNS.

## E-mails profissionais

Sugestões:

- `contato@shieldworks.com.br`
- `projetos@shieldworks.com.br`
- `academico@shieldworks.com.br`
- `suporte@shieldworks.com.br`

Opções:

- Zoho Mail
- Google Workspace
- Microsoft 365

## Recomendações

- Use Vercel para o site principal.
- Use DigitalOcean para sistemas próprios com backend, banco de dados ou serviços persistentes.
- Use Render como alternativa simples para APIs, workers ou aplicações pequenas.
- Ative HTTPS.
- Configure SPF, DKIM e DMARC no e-mail profissional.
