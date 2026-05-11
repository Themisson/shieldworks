# Deploy na DigitalOcean

## Uso recomendado

DigitalOcean é indicada para sistemas futuros, APIs, bancos de dados, containers, workers e aplicações que precisem de maior controle operacional.

## Opções

### App Platform

1. Envie o projeto ao GitHub.
2. Acesse DigitalOcean > App Platform.
3. Crie uma nova aplicação a partir do repositório.
4. Configure:
   - Build command: `npm run build`
   - Run command: `npm run start`
   - Porta: `3000`
5. Configure variáveis de ambiente.
6. Publique.

### Droplet

1. Crie um Droplet Ubuntu.
2. Instale Node.js LTS, Git e Nginx.
3. Clone o repositório.
4. Rode:

```bash
npm install
npm run build
npm run start
```

5. Use PM2 ou systemd para manter a aplicação ativa.
6. Configure Nginx como proxy reverso.
7. Configure HTTPS com Certbot.

## Sistemas futuros

Sugestão de separação:

- Site principal na Vercel: `shieldworks.com.br`
- Aplicações na DigitalOcean: `app.shieldworks.com.br`
- Demonstrações: `demo.shieldworks.com.br`
- Monitoramento: `monitor.shieldworks.com.br`
- Academia/cursos: `academy.shieldworks.com.br`

## Segurança

- Configure firewall.
- Restrinja portas públicas.
- Use variáveis de ambiente.
- Não armazene credenciais no repositório.
- Faça backups de bancos de dados.
