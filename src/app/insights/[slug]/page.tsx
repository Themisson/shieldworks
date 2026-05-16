import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/data/site";
import { getInsightBySlug, getPublishedInsights } from "@/data/insights";
import { SITE_URL, canonicalUrl } from "@/lib/seo";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T12:00:00Z`));
}

export function generateStaticParams() {
  return getPublishedInsights().map((insight) => ({
    slug: insight.slug
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return {};
  }

  const path = `/insights/${insight.slug}`;
  const url = canonicalUrl(path);

  return {
    title: {
      absolute: `${insight.title} | ShieldWorks`
    },
    description: insight.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.description,
      url,
      siteName: "ShieldWorks",
      publishedTime: insight.date,
      authors: [brand.owner],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.description,
      images: ["/og-image.png"]
    }
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const url = canonicalUrl(`/insights/${insight.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    author: {
      "@type": "Person",
      name: brand.owner
    },
    publisher: {
      "@type": "Organization",
      name: "ShieldWorks",
      url: SITE_URL
    },
    url
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Insights", item: canonicalUrl("/insights") },
      { "@type": "ListItem", position: 2, name: insight.title, item: url }
    ]
  };

  return (
    <section className="bg-white py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm font-semibold text-petroleum-900 transition-colors hover:text-petroleum-700 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para Insights
        </Link>
        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-petroleum-100 bg-petroleum-50 px-2.5 py-1 text-xs font-medium text-petroleum-900">
              {insight.category}
            </span>
            <time className="text-xs font-medium text-slate-500" dateTime={insight.date}>
              {formatDate(insight.date)}
            </time>
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{insight.title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{insight.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-6 text-base leading-8 text-slate-700">
          {insight.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  );
}
