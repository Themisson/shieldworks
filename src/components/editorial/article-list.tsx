import Link from "next/link";
import type { Article } from "@/lib/editorial";
import { localizedPath } from "@/i18n/routing";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="article-list">
      {articles.map((article, i) => (
        <article key={article.slug}>
          <span className="ledger-number">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="technical-label">
              <time dateTime={article.publishedAt}>
                {new Intl.DateTimeFormat(
                  article.locale === "en" ? "en-US" : "pt-BR",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC",
                  },
                ).format(new Date(`${article.publishedAt}T12:00:00Z`))}
              </time>{" "}
              / {article.category}
            </p>
            <h3>
              <Link
                href={localizedPath(
                  `/conteudo/${article.slug}`,
                  article.locale,
                )}
              >
                {article.title}
                <span aria-hidden="true">↗</span>
              </Link>
            </h3>
            <p>{article.description}</p>
            <span className="article-time">
              {article.readingMinutes} min{" "}
              {article.locale === "en" ? "read" : "de leitura"}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
