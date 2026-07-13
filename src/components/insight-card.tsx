import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/data/insights";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(`${date}T12:00:00Z`));
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-graphite-100/80 bg-white p-6 shadow-card transition duration-300 ease-out hover:-translate-y-0.5 hover:border-petroleum-200 hover:shadow-lift">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-lg border border-petroleum-100 bg-petroleum-50 px-2.5 py-1 text-xs font-medium text-petroleum-800">
          {insight.category}
        </span>
        <time className="font-mono text-[11px] font-medium tracking-wide text-graphite-500" dateTime={insight.date}>
          {formatDate(insight.date)}
        </time>
      </div>
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-graphite-900">{insight.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-graphite-600">{insight.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {insight.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-lg border border-graphite-100 bg-graphite-50 px-2.5 py-1 text-xs font-medium text-graphite-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-petroleum-800 transition-colors hover:text-petroleum-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100"
      >
        Ler conteúdo
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
