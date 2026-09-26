# Sistema editorial

`content/articles/{pt,en}/*.md` é a fonte editorial. Front matter JSON entre `---`,
validado por Zod em `src/lib/editorial.ts`: slug, locale, title, subtitle opcional,
description, summary, author, category, tags, publishedAt, updatedAt, published,
type (article/note/update/case), cover, references e related.

JSON evita parser YAML com tags/objetos executáveis e dependência adicional.
Data válida e atualização não anterior à publicação; filename e locale devem bater.
`published:false` e datas futuras ficam fora de páginas, sitemap e RSS. Não usar
uma nova data de publicação na migração dos insights.

O renderer servidor usa react-markdown, GFM, remark-math/KaTeX sem trust e highlight
sem detecção automática. Permite tabelas, código, matemática, figuras locais,
legendas Markdown, referências, links, listas, blockquotes como callouts e footnotes.
Não permite HTML cru ou MDX executável. Conteúdo versionado é confiável, não upload.
Use `##` em headings: o título da matéria é o único h1. Imagens precisam de alt.

Publicar: copiar uma matéria, preencher metadados, revisar autoria/fontes, validar
`npm run check` e E2E; publicar só com aprovação. Tempo de leitura estimado a 220 palavras/min.
Os 6 insights originais são notas breves; não foram expandidos com resultados inventados.

Futuro CMS/admin: implementar um repository que devolve o mesmo Article validado,
com autorização no servidor, revisão, versões, agendamento, uploads restritos e
auditoria. Nenhuma rota admin ou banco foi criado nesta fase.
