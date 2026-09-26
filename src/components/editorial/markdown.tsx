import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { safeContentUrl } from "@/lib/editorial";

/** Server-only Markdown pipeline: no raw HTML, JSX, or executable author content. */
export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="article-body">
      <Markdown
        skipHtml
        urlTransform={safeContentUrl}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          [rehypeKatex, { trust: false, maxExpand: 1000, strict: "warn" }],
          [rehypeHighlight, { detect: false }],
        ]}
        components={{
          p: ({ children, node }) => {
            const image =
              node?.children.length === 1 ? node.children[0] : undefined;
            if (image?.type === "element" && image.tagName === "img")
              return (
                <figure className="article-figure">
                  {children}
                  {image.properties.title && (
                    <figcaption>{String(image.properties.title)}</figcaption>
                  )}
                </figure>
              );
            return <p>{children}</p>;
          },
          h1: ({ children }) => <h2>{children}</h2>,
          table: ({ children }) => (
            <div className="table-scroll" tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
          img: ({ src, alt }) =>
            typeof src === "string" &&
            src.startsWith("/") &&
            !src.startsWith("//") ? (
              <Image
                src={src}
                alt={alt || ""}
                width={1200}
                height={700}
                className="article-image"
              />
            ) : null,
          a: ({ href, children }) => (
            <a
              href={href}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}
