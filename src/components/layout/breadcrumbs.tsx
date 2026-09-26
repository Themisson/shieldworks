import Link from "next/link";
import type { Locale } from "@/i18n/translations";
import { localizedPath } from "@/i18n/routing";
import { canonicalUrl } from "@/lib/seo";
import { jsonLd } from "@/lib/page-metadata";

export function Breadcrumbs({
  items,
  locale,
}: {
  items: { label: string; href: string }[];
  locale: Locale;
}) {
  const all = [
    { label: locale === "en" ? "Home" : "Início", href: "/" },
    ...items,
  ];
  return (
    <>
      <nav
        className="breadcrumbs"
        aria-label={locale === "en" ? "Breadcrumbs" : "Caminho de navegação"}
      >
        <ol className="flex flex-wrap gap-2">
          {all.map((item, i) => (
            <li key={item.href}>
              {i > 0 && <span aria-hidden="true"> / </span>}
              {i === all.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={localizedPath(item.href, locale)}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.label,
              item: canonicalUrl(localizedPath(item.href, locale)),
            })),
          }),
        }}
      />
    </>
  );
}
