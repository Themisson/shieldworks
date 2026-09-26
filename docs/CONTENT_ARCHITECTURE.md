# Arquitetura de conteúdo

| Conteúdo | Fonte atual | Destino público |
|---|---|---|
| Formação e atuação | site.ts, ProfileHighlights e página sobre | `/sobre` |
| Serviços/capacidades | site.ts e blocos preservados de soluções | `/solucoes` |
| Sistemas institucionais | digitalProjects, com estágios originais | `/sistemas` |
| Produtos | projects.ts, fontes nos checkouts locais | `/projetos` |
| Linhas científicas | research.ts, relações com referências existentes | `/pesquisa` |
| Publicações | publications.ts, seis registros curados | `/pesquisa/publicacoes` |
| Cases | cases.ts, dois registros completos | `/cases` |
| Notas/artigos | Markdown PT/EN | `/conteudo` |
| Comunicação | formulário e links profissionais preservados | `/contato`, `/whatsapp` |

Catálogos e conteúdo não dependem da home. Uma nova composição deve reutilizar essas
fontes, sem duplicar afirmações ou alterar estágios. Nome público é ShieldWorks;
“Lab” não foi adotado como renomeação definitiva.

O front matter editorial aceita título, subtítulo, slug, descrição, resumo, autor,
categoria, tags, datas, tipo, capa, referências, relacionados e overrides opcionais
de SEO. Cada idioma é um documento. Veja EDITORIAL_SYSTEM.md para o contrato e exemplos.

A preservação compara dados com o baseline e mantém os parágrafos das seis notas.
Navegação antiga Insights é deprecada em favor de Conteúdo, com redirects permanentes.
Não houve exclusão de produção científica, cases, links de contato ou capacidades.

Futuro: separar repositório editorial de sua implementação de armazenamento permite
CMS sem refazer leitores. Admin, uploads, assinaturas, agendamento automático e banco
não existem nesta versão; dependem de autenticação, revisão de segurança e autorização.
