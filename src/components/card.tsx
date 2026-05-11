import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function ServiceCard({ title, description, icon: Icon }: CardProps) {
  return (
    <article className="rounded-lg border border-graphite-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      {Icon ? (
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-petroleum-50 text-petroleum-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="text-lg font-semibold text-graphite-900">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-graphite-600">{description}</p>
    </article>
  );
}

export function SystemCard({ title, description, icon: Icon }: CardProps) {
  return (
    <article className="rounded-lg border border-graphite-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-graphite-50 text-petroleum-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
        <div>
          <h2 className="text-base font-semibold text-graphite-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-graphite-600">{description}</p>
        </div>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-petroleum-900">
        Preparado para evolucao
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </article>
  );
}
