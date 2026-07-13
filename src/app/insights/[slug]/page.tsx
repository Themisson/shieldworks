import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/data/site";
import { getInsightBySlug, getPublishedInsights } from "@/data/insights";
import { Reveal } from "@/components/reveal";
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
    <section className="page-hero">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="section-shell relative py-14 sm:py-16 lg:py-20">
        <article className="mx-auto max-w-3xl">
          <Reveal immediate>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-petroleum-800 transition-colors hover:text-petroleum-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar para Insights
            </Link>
          </Reveal>

          <Reveal delay={40}>
            <div className="panel-muted mt-8 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-lg border border-petroleum-100 bg-white px-2.5 py-1 text-xs font-medium text-petroleum-800">
                  {insight.category}
                </span>
                <time
                  className="font-mono text-[11px] font-medium tracking-wide text-graphite-500"
                  dateTime={insight.date}
                >
                  {formatDate(insight.date)}
                </time>
              </div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
                {insight.title}
              </h1>
              <p className="mt-4 text-base leading-8 text-graphite-600">{insight.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-lg border border-graphite-100 bg-white px-2.5 py-1 text-xs font-medium text-graphite-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 space-y-6 text-base leading-8 text-graphite-700">
            {insight.content.map((paragraph, index) => (
              <Reveal key={paragraph} delay={Math.min(index, 4) * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
