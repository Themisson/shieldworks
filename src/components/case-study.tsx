import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import type { CaseStudy } from "@/data/cases";
import { ButtonLink } from "@/components/button-link";

const typeLabels: Record<CaseStudy["type"], string> = {
  pesquisa: "Pesquisa aplicada",
  sistema: "Sistema digital",
  consultoria: "Consultoria técnica"
};

type CaseStudyCardProps = {
  study: CaseStudy;
  compact?: boolean;
};

export function CaseStudyCard({ study, compact = false }: CaseStudyCardProps) {
  if (compact) {
    return (
      <article className="group flex h-full flex-col rounded-2xl border border-graphite-100/80 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-petroleum-200 hover:shadow-lift">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-petroleum-100 bg-petroleum-50 px-2.5 py-1 text-xs font-medium text-petroleum-800">
            {typeLabels[study.type]}
          </span>
          <span className="font-mono text-[11px] tracking-wide text-graphite-500">{study.year}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-graphite-900">{study.title}</h3>
        <p className="mt-2 text-sm leading-6 text-graphite-600">{study.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-graphite-100 bg-graphite-50 px-2.5 py-1 text-xs font-medium text-graphite-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/pesquisa#caso-${study.id}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-petroleum-800 transition-colors hover:text-petroleum-600"
        >
          Ver o case
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </article>
    );
  }

  return (
    <article
      id={`caso-${study.id}`}
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-graphite-100/80 bg-white shadow-card"
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative border-b border-graphite-100 bg-gradient-to-br from-petroleum-950 via-petroleum-900 to-petroleum-800 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(500px 260px at 10% 0%, rgba(47,143,131,0.28), transparent 60%)"
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-safety-100">
                <FlaskConical className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                {typeLabels[study.type]}
              </span>
              <span className="font-mono text-[11px] tracking-wide text-petroleum-100/80">{study.year}</span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-petroleum-100/80">
              {study.domain}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.65rem] sm:leading-snug">
              {study.title}
            </h3>
            <p className="mt-4 max-w-[42ch] text-sm leading-7 text-petroleum-100/90">{study.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-petroleum-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-6">
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-graphite-900">Contexto</h4>
              <p className="mt-2 text-sm leading-7 text-graphite-600">{study.context}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-graphite-900">Problema</h4>
              <p className="mt-2 text-sm leading-7 text-graphite-600">{study.problem}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-tight text-graphite-900">Método</h4>
              <ol className="mt-3 grid gap-3">
                {study.method.map((step, index) => (
                  <li
                    key={step.label}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-graphite-100 bg-graphite-50/70 p-3.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-petroleum-900 font-mono text-[11px] font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-graphite-900">{step.label}</p>
                      <p className="mt-1 text-sm leading-6 text-graphite-600">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-tight text-graphite-900">Entregas</h4>
              <ul className="mt-3 grid gap-2">
                {study.delivery.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-graphite-700">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-600"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-petroleum-100 bg-petroleum-50/80 p-4">
              <h4 className="text-sm font-semibold tracking-tight text-petroleum-900">Impacto</h4>
              <p className="mt-2 text-sm leading-7 text-petroleum-900/90">{study.impact}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pesquisa">
                Ver linha de pesquisa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contato" variant="secondary">
                Discutir um case semelhante
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
