import type { Metadata } from "next";
import type { Locale } from "@/i18n/translations";
import { localizedPath } from "@/i18n/routing";
import { canonicalUrl } from "@/lib/seo";

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  locale: Locale,
  bilingual = true,
): Metadata {
  const url = canonicalUrl(localizedPath(path, locale));
  const image = canonicalUrl(`/og?title=${encodeURIComponent(title)}`);
  return {
    title: { absolute: `${title} | ShieldWorks` },
    description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": canonicalUrl("/feed.xml") },
      ...(bilingual
        ? {
            languages: {
              "pt-BR": canonicalUrl(path),
              en: canonicalUrl(localizedPath(path, "en")),
              "x-default": canonicalUrl(path),
            },
          }
        : {}),
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === "en" ? "en_US" : "pt_BR",
      siteName: "ShieldWorks",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
