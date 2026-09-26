// Preserve all baseline paragraphs and publication dates verbatim in Markdown.
import fs from "node:fs";
import { insights } from "../src/data/insights.ts";
const directory = "content/articles/pt";
fs.mkdirSync(directory,{recursive:true});
for(const item of insights) {
  const metadata = {
    slug:item.slug, title:item.title, description:item.description, summary:item.description,
    author:"Themisson dos Santos Vasconcelos", category:item.category, tags:item.tags,
    publishedAt:item.date, updatedAt:item.date, published:item.published, type:"note",
    locale:"pt", references:[], related:[], cover:"/og-image.png"
  };
  fs.writeFileSync(`${directory}/${item.slug}.md`, `---\n${JSON.stringify(metadata,null,2)}\n---\n\n${item.content.join("\n\n")}\n`);
}
console.log(`Preserved ${insights.length} insights in Markdown.`);
