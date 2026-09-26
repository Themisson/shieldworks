import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import {
  getArticles,
  parseArticle,
  safeContentUrl,
  getRelatedArticles,
} from "@/lib/editorial";
import { insights } from "@/data/insights";
import { ArticleBody } from "@/components/editorial/markdown";
import { buildFeed } from "@/lib/feed";
import { localizedPath } from "@/i18n/routing";
import { bibtex } from "@/lib/publication-format";
import { featuredPublications } from "@/data/publications";

describe("editorial content and retention", () => {
  it("preserves every original paragraph, slug, date and description", () => {
    const articles = getArticles("pt");
    expect(articles).toHaveLength(insights.length);
    for (const original of insights) {
      const article = articles.find((item) => item.slug === original.slug)!;
      expect(article.title).toBe(original.title);
      expect(article.description).toBe(original.description);
      expect(article.publishedAt).toBe(original.date);
      for (const paragraph of original.content)
        expect(article.body).toContain(paragraph);
    }
  });
  it("has genuine English equivalents for all published notes", () => {
    const pt = getArticles("pt"),
      en = getArticles("en");
    expect(en.map((item) => item.slug).sort()).toEqual(
      pt.map((item) => item.slug).sort(),
    );
    for (const item of en)
      expect(item.body).not.toBe(
        pt.find((article) => article.slug === item.slug)?.body,
      );
  });
  it("filters scheduled items by date and validates dates and front matter", () => {
    expect(getArticles("pt", new Date("2026-05-10"))).toHaveLength(0);
    expect(() => parseArticle("not front matter")).toThrow();
    const item = getArticles()[0];
    const meta = { ...item, publishedAt: "2026-02-30" };
    delete (meta as Partial<typeof meta>).body;
    delete (meta as Partial<typeof meta>).readingMinutes;
    expect(() =>
      parseArticle(`---\n${JSON.stringify(meta)}\n---\nbody`),
    ).toThrow();
  });
  it("renders math, GFM, code and footnotes while dropping unsafe content", () => {
    const html = renderToStaticMarkup(
      createElement(ArticleBody, {
        body: "## Example\n\n$x^2$\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n```python\nprint(1)\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert%281%29)\n\nA note[^1].\n\n[^1]: Reference.",
      }),
    );
    expect(html).toContain("katex");
    expect(html).toContain("<table>");
    expect(html).toContain("hljs");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain("footnote");
  });
  it("escapes feed text and preserves canonical URLs", () => {
    const feed = buildFeed([{ ...getArticles()[0], title: "A < B & C" }]);
    expect(feed).toContain("A &lt; B &amp; C");
    expect(feed).toContain("https://www.shieldworks.com.br/conteudo/");
    expect(feed).not.toContain("/pt/");
    expect(localizedPath("/pesquisa", "en")).toBe("/en/pesquisa");
    expect(localizedPath("/en/pesquisa", "pt")).toBe("/pesquisa");
    expect(localizedPath("/feed.xml", "en")).toBe("/feed.xml");
  });
  it("keeps related content distinct and protects links", () => {
    const article = getArticles()[0];
    expect(
      getRelatedArticles(article).every((item) => item.slug !== article.slug),
    ).toBe(true);
    for (const url of [
      "javascript:alert(1)",
      "data:text/html,test",
      "//evil.test",
    ])
      expect(safeContentUrl(url)).toBe("");
  });
  it("uses publication kinds and no invented DOI in BibTeX", () => {
    expect(
      bibtex(featuredPublications.find((item) => item.kind === "tese")!),
    ).toContain("@phdthesis");
    expect(
      bibtex(featuredPublications.find((item) => item.kind === "congresso")!),
    ).toContain("booktitle");
    expect(bibtex(featuredPublications[0])).not.toContain("doi =");
  });
});
