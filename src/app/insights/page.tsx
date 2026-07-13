import type { Metadata } from "next";
import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { getPublishedInsights } from "@/data/insights";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Publicações técnicas e reflexões sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica.",
  alternates: {
    canonical: canonicalUrl("/insights")
  },
  openGraph: {
    title: "Insights | ShieldWorks",
    description:
      "Publicações técnicas e reflexões sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica.",
    url: canonicalUrl("/insights")
  }
};

export default function InsightsPage() {
  const publishedInsights = getPublishedInsights();

  return (
    <section className="page-hero">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="section-shell relative py-14 sm:py-16 lg:py-20">
        <Reveal immediate>
          <SectionTitle
            title="Conteúdo técnico, acadêmico e institucional."
            description="Conteúdos técnicos, reflexões e atualizações sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publishedInsights.map((insight, index) => (
            <Reveal key={insight.slug} delay={(index % 3) * 70}>
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
