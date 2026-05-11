import type { Metadata } from "next";
import { InsightCard } from "@/components/insight-card";
import { SectionTitle } from "@/components/section-title";
import { getPublishedInsights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Publicações técnicas e reflexões sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica.",
  openGraph: {
    title: "Insights | ShieldWorks",
    description:
      "Publicações técnicas e reflexões sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica.",
    url: "https://www.shieldworks.com.br/insights"
  }
};

export default function InsightsPage() {
  const publishedInsights = getPublishedInsights();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Insights"
          title="Conteúdo técnico, acadêmico e institucional."
          description="Conteúdos técnicos, reflexões e atualizações sobre engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e produção acadêmica."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {publishedInsights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}
