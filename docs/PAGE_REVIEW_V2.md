# Revisão página a página — V2

Publicado em produção em 26/09/2026; as pendências abaixo seguem valendo.
Revisão de 26/09/2026 sobre o working tree da branch `feat/shieldworks-v2`: leitura do
código, Playwright em PT/EN a 390 e 1440 px e axe. P1 = corrigir antes de novas features;
P2 = próxima fase; P3 = refinamento. "Feito" indica o que entrou nesta entrega.

## Corrigido nesta entrega

- `/sobre` redesenhada ([ABOUT_V2.md](ABOUT_V2.md)); retrato deixou de dominar a página.
- Landing: "Pesquisa Aplicada" e "Sistemas Institucionais" apontavam para `/solucoes`;
  agora `/pesquisa` e `/sistemas`. Texto EN do RSS informa que o feed está em português.
- Contraste: botão "Conhecer projetos" em `/sistemas` (2,55:1) e idioma atual no menu
  mobile (2,24:1). Botão de feedback ganhou contorno sobre seções escuras.
- Títulos: `/cases/[slug]` repetia o título (h1 + h3); `/conteudo` saltava de h1 para h3.
- EN: tipos de publicação saíam crus ("artigo", "tese"); rótulo do WhatsApp sem tradução.
- `/projetos/[slug]`: links "Repositório" retornavam 404 público (repositórios privados);
  ocultos até serem publicados (`repositoryPublic` em `projects.ts`), inclusive no JSON-LD.
- 404 global: fontes do site e texto bilíngue (atende também URLs `/en`).
- Next 16.3.3 → 16.3.6. axe ampliado para `/sobre`, `/sistemas`, case, `/conteudo` e
  publicações em EN.

## Pendências por página

| Página | Prioridade | Pendência | Esforço |
|---|---|---|---|
| `/pesquisa` | P1 | página mais V1 do site (cards, `CaseStudyCard`, lista externa de publicações); migrar para `internal-hero` + ledgers, ligar linhas à cena, publicações internas, um bloco de perfis | 1–1,5 d |
| `/solucoes` | P1 | V1; 4 passos sem numeração ligada à cena de 3 partes; "Capacitação Técnica" futura com itens marcados como disponíveis; "Drones e monitoramento" sem fonte | 0,5–1 d |
| `/sistemas` | P2 | card principal com ~450 px vazios; descrições duplicadas; "Solicitar demonstração" em sistema em desenvolvimento; catálogo paralelo a `projects.ts` | 1 d |
| `/assessoria-academica` | P2 | V1; h1 e lead repetidos; serviços sobrepostos; nota ética no fim; 12 h2 seguidos | 0,5–1 d |
| `/contato` | P2 | V1; cópia repetida; sem botão de WhatsApp em texto; nota do formulário sem link para privacidade | 1 d |
| `/privacidade` | P1 | sem link para contato; controlador não identificado; texto condicional ("pode utilizar"); não informa rate limit por IP nem ausência de banco | 2–3 h + revisão jurídica do proprietário |
| `/cases`, `/cases/[slug]` | P2 | lista sem lead/método; card V1 com área vazia; botões iguais para case de pesquisa e de sistema; sem links às publicações citadas | 0,5 d |
| `/pesquisa/[area]` | P2 | mesma cena para geomecânica e poços; siglas sem expansão; sem links a case e notas | 0,5 d |
| `/pesquisa/publicacoes/[id]` | P2 | JSON-LD trata a tese como periódico e "et al." como pessoa; BibTeX escapa `_` e `&` na URL | 2 h |
| `/pesquisa/projetos` | P2 | um único card sob título plural; duplica `/cases` | decidir: fundir ou remover |
| `/conteudo` | P2 | filtros por tipo sempre vazios (todas as notas são `note`); `summary` = `description` em todas; datas ISO cruas no detalhe | 0,5 d |
| `/insights*` | P3 | rotas inalcançáveis (redirects 308); remover ou documentar | 1 h |
| Landing | P2 | 12 seções com redundância (conhecimento, atualizações); proposta de 9; EN perde mandatory em 1366×650 pela quebra de um título; tom "conectamos" | decisão + 0,5 d |
| Shell | P2 | header desktop sem Sistemas/Assessoria; `/cases` sem link no menu; header e footer com listas diferentes; ressalva institucional repetida; CTA com oito rótulos diferentes | 1 d |
| Formulários/API | P1 (EN) | mensagens de validação e resposta só em português | 0,5–1 d |
| RSS | P2 | feed apenas em PT; criar feed EN | 2–3 h |

Migração visual restante (V1 → V2): cerca de 6–8 dias, começando pelos componentes
compartilhados (`CTA`, `ButtonLink`, `ProfessionalLinks`, formulários, footer), que removem
a maior parte das classes V1 de várias rotas de uma vez.

## Decisões do proprietário

1. ~~Posto~~: Tenente-Coronel confirmado (26/09/2026).
2. ~~Grau~~: "Mestrado e Doutorado em Engenharia Civil, área de concentração Estruturas"
   (26/09/2026); aplicado na Sobre, na landing e no catálogo.
3. Repositórios dos produtos: publicar ou manter privados (links seguem ocultos).
4. Landing com 12 ou 9 seções; voz impessoal/singular em vez de "conectamos".
5. Texto de privacidade: identificação do controlador e canal LGPD.
6. Itens de `/solucoes` e `/sistemas` sem fonte ("Drones e monitoramento", demonstrações).
