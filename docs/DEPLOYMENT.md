# Ambiente local e publicação futura

Nenhum deploy, push, merge, tag, release, DNS ou configuração de produção foi feito.
Branch de revisão: `feat/shieldworks-v2`. Vercel continua o alvo atual; não houve migração.

## Node no notebook

```powershell
npm ci
npm run dev
# ou, após parar o dev:
npm run build
npm run start
```

Node 22.12+ ou 24. `.nvmrc` aponta a 22. `start` usa standalone e copia public/static.
Pare o servidor standalone antes de reconstruir no Windows: arquivos em uso podem gerar
EBUSY. Playwright sobe e encerra um servidor próprio. Não mate processos desconhecidos.

Fontes são self-hosted por next/font, com acesso à origem necessário no primeiro build.
Analytics Vercel só monta quando `VERCEL=1`, preservando produção e evitando endpoint
inexistente local. Eventos originais de contato/feedback continuam no adaptador existente.

## Docker opcional

```powershell
docker compose up --build
# Se 3000 estiver ocupada, em PowerShell:
$env:SHIELDWORKS_PORT='3300'
docker compose up --build
docker compose stop
```

Compose expõe apenas loopback, faz bind do código e mantém node_modules/.next em volumes
nomeados Linux. WATCHPACK_POLLING auxilia o notebook Windows. Não usa banco nem credenciais
de e-mail. Após mudanças no lockfile, reconstruir dependências no volume com
`docker compose run --rm web npm ci`, então reiniciar. Não executar `down -v` sem avaliar
dados nos volumes. Native npm continua disponível; Docker não é obrigatório.

```powershell
docker build --target production -t shieldworks:v2-local .
docker run --rm --name shieldworks-v2-review -p 127.0.0.1:3301:3000 shieldworks:v2-local
```

Imagem multistage Node 22, usuário não root, standalone com Markdown rastreado, public
e static. `.dockerignore` exclui todos os .env, Git e artefatos. Segredos só em runtime
após autorização; não em build args. As três variáveis Resend são server-only e opcionais
para apresentação. Contato **e feedback** enviam Resend quando configurados; a descrição
antiga de feedback como simples 202 sem envio estava incorreta.

## Revisão Vercel

O CI testa qualidade, E2E e Docker. CI não publica o site. Compatibilidade foi validada
localmente; nenhum preview remoto foi criado. Publicação futura exige autorização do
proprietário, revisão dos domínios/canonical, env existentes e revisão de UX no preview.

## Futuro, não implementado

Planejamento original preservado: `app.shieldworks.com.br`, `demo.shieldworks.com.br`,
`monitor.shieldworks.com.br`, `academy.shieldworks.com.br`. São ideias, não endpoints
implementados ou DNS criado nesta tarefa.

Uma migração posterior poderia usar Cloudflare → VPS → Docker → Next.js, com PostgreSQL
para CMS/assinaturas, object storage, backups criptografados e restauração testada.
Exigiria capacidade, TLS, observabilidade, segredos, atualização, rollback, política de
retenção e custos aprovados. Não provisionar nada a partir deste documento.

Admin futuro deve fornecer autenticação/autorização, rascunhos, agendamento, categorias,
tags, SEO, uploads e newsletter com consentimento, unsubscribe e verificação de endereço.
Não existe `/admin` ou assinatura funcional nesta versão; RSS já funciona e a interface
explica honestamente a ausência de inscrição por e-mail.

Analytics de todo o ecossistema pode evoluir para catálogo de eventos por domínio,
sem coletar mensagens/dados sensíveis. Não foi criado analytics próprio nem instalado
coletor nos outros projetos. Rate limit em memória e CSP inline são limites documentados.
