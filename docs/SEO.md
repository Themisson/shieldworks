# SEO implementado

Host canônico preservado: `https://www.shieldworks.com.br`. A variável pública antiga
de URL não era consumida e saiu do exemplo; a fonte é `src/lib/seo.ts`.

Todas as rotas de apresentação usam metadata localizada: título, descrição, canonical,
OpenGraph e Twitter. Alternativas PT-BR/EN/x-default só para equivalentes. Artigos
checados têm seis pares PT/EN; o sitemap publica URLs canônicas, não aliases `/pt` nem
redirecionamentos `/insights`. Datas lastModified dos artigos vêm do conteúdo, não do build.
Rotas sem data documental não recebem data inventada.

JSON-LD: WebSite, Person e Organization globais; BreadcrumbList nas novas áreas;
Article com datas/autor/idioma; ScholarlyArticle/Thesis para publicações; CreativeWork
para projetos. Serialização de objetos dinâmicos escapa `<`. Sem ratings/clientes falsos.

`/og?title=...` usa ImageResponse em 1200×630, título limitado a 180 caracteres e
cache de um dia. Metadata fornece uma imagem por título; uma capa/override editorial
pode substituir essa imagem. O asset OG original permanece como fallback do Article.

`/feed.xml`: RSS 2.0, seis notas PT, título/link/data/descrição escapados, cache de uma
hora e autodiscovery em metadata. Ainda não existe feed EN separado. RSS não exige cadastro.
`robots.txt` e manifest preservados. 404 não é indexável.

Redirects 308 preservam `/insights` e `/insights/:slug`, inclusive `/en` e `/pt`.
O redirecionamento do host sem www permanece. Nenhum redirect de idioma por navegador.

Não foram enviados sitemap, releases, deploys ou solicitações de indexação externas.
Antes da publicação autorizada: conferir URLs/idiomas no preview real da Vercel e usar
Search Console se o proprietário desejar. Não há promessa de ranking ou auditoria externa.
