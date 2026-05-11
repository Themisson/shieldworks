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
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-petroleum-100 bg-petroleum-50 px-2.5 py-1 text-xs font-medium text-petroleum-900">
          {insight.category}
        </span>
        <time className="text-xs font-medium text-slate-500" dateTime={insight.date}>
          {formatDate(insight.date)}
        </time>
      </div>
      <h2 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">{insight.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{insight.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {insight.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-petroleum-900 transition-colors hover:text-petroleum-700 focus:outline-none focus:ring-4 focus:ring-petroleum-100"
      >
        Ler conteúdo
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
