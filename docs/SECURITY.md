# Segurança

APIs preservam validação de payload, honeypot, rate limit e escape HTML de e-mail.
Testes nunca enviam e-mail real. Limite em memória é por instância, não global em Vercel;
uma proteção distribuída dependerá de serviço futuro. IP só é confiável atrás do proxy
de hospedagem configurado; não tratar cabeçalho enviado pelo cliente como autenticação.

Baseline Next 16.2.6 apresenta advisory crítico em Windows. Correção selecionada:
Next 16.3.3 e eslint-config-next correspondente. PostCSS 8.5.28 e Vitest 4.1.11
selecionados por advisories; não por disponibilidade de versão nova.
https://github.com/advisories/GHSA-p293-qw3h-jr36
https://github.com/advisories/GHSA-82fw-gwwq-j7x9

CSP retira unsafe-eval em produção; unsafe-inline permanece para scripts de hidratação
Next e JSON-LD. Nonces exigiriam renderização dinâmica e revisão específica, não
foram simulados. Frames, base-uri e form-action continuam restritos ao próprio site.

Conteúdo editorial não executa JSX, scripts ou HTML arbitrário. URLs perigosas não
são renderizadas; KaTeX sem trust e expansão limitada. JSON-LD escapa `<`.
CMS/admin, autenticação, uploads e newsletter por e-mail não estão ativados.

Credenciais ficam fora do Git. Docker não copia .env e testes usam interceptação HTTP.
