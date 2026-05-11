# Variáveis de Ambiente — ShieldWorks

| Variável | Obrigatória | Uso | Exemplo seguro |
|---|---|---|---|
| `RESEND_API_KEY` | Sim | Chave da Resend para envio de e-mails | `re_xxxxxxxxx` |
| `CONTACT_TO_EMAIL` | Sim | E-mail de destino do formulário | `themisson@gmail.com` |
| `CONTACT_FROM_EMAIL` | Sim | Remetente autorizado na Resend | `onboarding@resend.dev` |

## Orientações

- `RESEND_API_KEY` deve ser criada na Resend.
- Nunca versione a chave real.
- Nunca coloque `RESEND_API_KEY` em código, README público ou documentação com valor real.
- `CONTACT_TO_EMAIL` pode ser Gmail.
- `CONTACT_FROM_EMAIL` não deve ser Gmail.
- Para teste, use `onboarding@resend.dev`.
- Para produção, use `contato@shieldworks.com.br` somente após verificar o domínio na Resend.
- Toda alteração de variável na Vercel exige redeploy para entrar em vigor.

## Configuração local sugerida

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=themisson@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

## Configuração futura de produção

Após validar o domínio `shieldworks.com.br` na Resend:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=themisson@gmail.com
CONTACT_FROM_EMAIL=contato@shieldworks.com.br
```
