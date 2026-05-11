# Como adicionar um novo Insight

1. Abrir:

```text
src/data/insights.ts
```

2. Adicionar novo objeto com a estrutura:

```ts
{
  slug: "novo-slug",
  title: "Título",
  description: "Descrição curta",
  date: "AAAA-MM-DD",
  category: "Categoria",
  tags: ["Tag 1", "Tag 2"],
  published: true,
  content: [
    "Parágrafo 1.",
    "Parágrafo 2."
  ]
}
```

3. Cuidados:

- Use `slug` em minúsculas.
- Não use acentos no `slug`.
- Use hífens no lugar de espaços.
- Mantenha a descrição curta.
- Não invente dados, métricas, publicações ou informações acadêmicas não confirmadas.
- Mantenha linguagem técnica, profissional e institucional.
- Use `published: false` para rascunhos, se a lógica do projeto suportar.

4. Rodar:

```bash
npm run build
```

5. Fazer commit e deploy.

6. Verificar se o novo insight entrou no sitemap:

```text
https://www.shieldworks.com.br/sitemap.xml
```
