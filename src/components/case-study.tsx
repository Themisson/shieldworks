import { Text } from "@/i18n/locale-provider";
import Link from "@/components/localized-link";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import type { CaseStudy } from "@/data/cases";
import { ButtonLink } from "@/components/button-link";

const typeLabels: Record<CaseStudy["type"], string> = {
  pesquisa: "Pesquisa aplicada",
  sistema: "Sistema digital",
  consultoria: "Consultoria técnica",
};

type CaseStudyCardProps = {
  /** On the case page the h1 already carries the title. */
  standalone?: boolean;
  study: CaseStudy;
  compact?: boolean;
};

export function CaseStudyCard({
  study,
  compact = false,
  standalone = false,
}: CaseStudyCardProps) {
  const Subheading = standalone ? "h2" : "h4";
  if (compact) {
    return (
      <article className="group flex h-full flex-col rounded-2xl border border-graphite-100/80 bg-white p-6 transition-colors hover:border-petroleum-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg border border-petroleum-100 bg-petroleum-50 px-2.5 py-1 text-xs font-medium text-petroleum-800">
            <Text>{typeLabels[study.type]}</Text>
          </span>
          <span className="font-mono text-[11px] tracking-wide text-graphite-500">
            <Text>{study.year}</Text>
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-graphite-900">
          <Text>{study.title}</Text>
        </h3>
        <p className="mt-2 text-sm leading-6 text-graphite-600">
          <Text>{study.summary}</Text>
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-graphite-100 bg-graphite-50 px-2.5 py-1 text-xs font-medium text-graphite-600"
            >
              <Text>{tag}</Text>
            </span>
          ))}
        </div>
        <Link
          href={`/cases/${study.id}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-petroleum-800 transition-colors hover:text-petroleum-600"
        >
          <Text>{"Ver o case"}</Text>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </article>
    );
  }

  return (
    <article
      id={`caso-${study.id}`}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-graphite-100/80 bg-white"
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative border-b border-graphite-100 bg-petroleum-950 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-safety-100">
                <FlaskConical
                  className="h-3.5 w-3.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <Text>{typeLabels[study.type]}</Text>
              </span>
              <span className="font-mono text-[11px] tracking-wide text-petroleum-100/80">
                <Text>{study.year}</Text>
              </span>
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-petroleum-100/80">
              <Text>{study.domain}</Text>
            </p>
            {!standalone && (
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.65rem] sm:leading-snug">
                <Text>{study.title}</Text>
              </h3>
            )}
            <p className="mt-4 max-w-[42ch] text-sm leading-7 text-petroleum-100/90">
              <Text>{study.summary}</Text>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-petroleum-100"
                >
                  <Text>{tag}</Text>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-6">
            <div>
              <Subheading className="text-sm font-semibold tracking-tight text-graphite-900">
                <Text>{"Contexto"}</Text>
              </Subheading>
              <p className="mt-2 text-sm leading-7 text-graphite-600">
                <Text>{study.context}</Text>
              </p>
            </div>
            <div>
              <Subheading className="text-sm font-semibold tracking-tight text-graphite-900">
                <Text>{"Problema"}</Text>
              </Subheading>
              <p className="mt-2 text-sm leading-7 text-graphite-600">
                <Text>{study.problem}</Text>
              </p>
            </div>

            <div>
              <Subheading className="text-sm font-semibold tracking-tight text-graphite-900">
                <Text>{"Método"}</Text>
              </Subheading>
              <ol className="mt-3 grid gap-3">
                {study.method.map((step, index) => (
                  <li
                    key={step.label}
                    className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-graphite-100 bg-graphite-50/70 p-3.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-petroleum-900 font-mono text-[11px] font-semibold text-white">
                      <Text>{String(index + 1).padStart(2, "0")}</Text>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-graphite-900">
                        <Text>{step.label}</Text>
                      </p>
                      <p className="mt-1 text-sm leading-6 text-graphite-600">
                        <Text>{step.detail}</Text>
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Subheading className="text-sm font-semibold tracking-tight text-graphite-900">
                <Text>{"Entregas"}</Text>
              </Subheading>
              <ul className="mt-3 grid gap-2">
                {study.delivery.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-graphite-700"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-600"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span>
                      <Text>{item}</Text>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-petroleum-100 bg-petroleum-50/80 p-4">
              <Subheading className="text-sm font-semibold tracking-tight text-petroleum-900">
                <Text>{"Impacto"}</Text>
              </Subheading>
              <p className="mt-2 text-sm leading-7 text-petroleum-900/90">
                <Text>{study.impact}</Text>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pesquisa">
                <Text>{"Ver linha de pesquisa"}</Text>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contato" variant="secondary">
                <Text>{"Discutir um case semelhante"}</Text>
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
