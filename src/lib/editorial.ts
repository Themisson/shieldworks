import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Locale } from "@/i18n/translations";

const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T12:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, "Invalid calendar date");
const internalImage = z
  .string()
  .regex(/^\/(?!\/)[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|svg)$/);
export const articleSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    locale: z.enum(["pt", "en"]),
    title: z.string().min(5),
    subtitle: z.string().optional(),
    description: z.string().min(10),
    summary: z.string().min(10),
    author: z.string().min(3),
    category: z.string().min(2),
    tags: z.array(z.string().min(1)).min(1),
    publishedAt: date,
    updatedAt: date,
    published: z.boolean(),
    type: z.enum(["article", "note", "update", "case"]),
    cover: internalImage.optional(),
    references: z
      .array(
        z.object({
          title: z.string().min(1),
          href: z
            .string()
            .url()
            .refine((value) => /^https?:\/\//.test(value)),
        }),
      )
      .default([]),
    related: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  })
  .strict()
  .refine(
    (item) => item.updatedAt >= item.publishedAt,
    "updatedAt precedes publishedAt",
  );

export type Article = z.infer<typeof articleSchema> & {
  body: string;
  readingMinutes: number;
};

export function parseArticle(source: string): Article {
  const match = source
    .replace(/^\uFEFF/, "")
    .match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Expected JSON front matter delimited by ---");
  const metadata = articleSchema.parse(JSON.parse(match[1]));
  const body = match[2].trim();
  if (!body) throw new Error(`Empty article: ${metadata.slug}`);
  if (/^#\s/m.test(body))
    throw new Error(`Use ## for article headings: ${metadata.slug}`);
  return {
    ...metadata,
    body,
    readingMinutes: Math.max(1, Math.ceil(body.split(/\s+/).length / 220)),
  };
}

export function loadArticles(locale: Locale): Article[] {
  const directory = path.join(process.cwd(), "content", "articles", locale);
  if (!fs.existsSync(directory)) return [];
  const articles = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const article = parseArticle(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      if (article.locale !== locale || file !== `${article.slug}.md`)
        throw new Error(`Article filename/locale mismatch: ${file}`);
      return article;
    });
  const ids = new Set<string>();
  for (const article of articles) {
    if (ids.has(article.slug))
      throw new Error(`Duplicate slug: ${article.slug}`);
    ids.add(article.slug);
  }
  return articles.sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
}

export function getArticles(
  locale: Locale = "pt",
  now = new Date(),
): Article[] {
  const today = now.toISOString().slice(0, 10);
  return loadArticles(locale).filter(
    (article) => article.published && article.publishedAt <= today,
  );
}

export function getArticle(slug: string, locale: Locale = "pt") {
  return getArticles(locale).find((article) => article.slug === slug);
}
export function getRelatedArticles(article: Article) {
  const all = getArticles(article.locale).filter(
    (item) => item.slug !== article.slug,
  );
  return [
    ...all.filter((item) => article.related.includes(item.slug)),
    ...all.filter(
      (item) =>
        !article.related.includes(item.slug) &&
        item.tags.some((tag) => article.tags.includes(tag)),
    ),
  ].slice(0, 3);
}

export function safeContentUrl(url: string) {
  if (
    /^\/(?!\/)/.test(url) ||
    url.startsWith("#") ||
    /^(https?:|mailto:)/i.test(url)
  )
    return url;
  return "";
}
