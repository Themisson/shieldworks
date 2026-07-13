import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
  kicker?: string;
  status?: string;
  statusDescription?: string;
  className?: string;
};

type CardShellProps = CardProps & {
  children?: ReactNode;
  actionLabel?: string;
};

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-lg border border-graphite-100 bg-graphite-50 px-2.5 py-1 text-xs font-medium text-graphite-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function statusClassName(status?: string) {
  if (status === "Em desenvolvimento") {
    return "border-petroleum-100 bg-petroleum-50 text-petroleum-800";
  }

  if (status === "Sob demanda") {
    return "border-petroleum-800 bg-petroleum-900 text-white";
  }

  if (status === "Futuro módulo") {
    return "border-graphite-100 bg-white text-graphite-600";
  }

  return "border-graphite-100 bg-graphite-50 text-graphite-600";
}

export function CardShell({
  title,
  description,
  icon: Icon,
  tags,
  kicker,
  status,
  statusDescription,
  children,
  actionLabel,
  className = ""
}: CardShellProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-graphite-100/80 bg-white p-5 shadow-card transition duration-300 ease-out hover:-translate-y-0.5 hover:border-petroleum-200 hover:shadow-lift sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100/80 transition duration-300 group-hover:bg-petroleum-900 group-hover:text-safety-100 group-hover:ring-petroleum-800">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
        ) : null}
        {status || kicker ? (
          <span
            className={`rounded-lg border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide ${status ? statusClassName(status) : "border-graphite-100 bg-graphite-50 text-graphite-500"}`}
          >
            {status ?? kicker}
          </span>
        ) : null}
      </div>
      <h2 className="text-base font-semibold tracking-tight text-graphite-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-graphite-600">{description}</p>
      {statusDescription ? (
        <p className="mt-4 rounded-xl border border-graphite-100 bg-graphite-50/80 px-3 py-2.5 text-xs leading-5 text-graphite-600">
          {statusDescription}
        </p>
      ) : null}
      <TagList tags={tags} />
      {children ? <div className="mt-5">{children}</div> : null}
      {actionLabel ? (
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-petroleum-800">
          {actionLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      ) : null}
    </article>
  );
}

export function ServiceCard(props: CardProps) {
  return <CardShell {...props} />;
}

export function HighlightCard(props: CardProps) {
  return <CardShell {...props} />;
}

export function SystemCard(props: CardProps) {
  return <CardShell {...props} />;
}

export function ListCard({
  title,
  description,
  items,
  icon: Icon,
  className
}: {
  title: string;
  description?: string;
  items: string[];
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <CardShell
      title={title}
      description={
        description ??
        "Frente estruturada para entregas técnicas, documentação clara e evolução conforme a demanda."
      }
      icon={Icon}
      className={className}
    >
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-xl border border-graphite-100/80 bg-graphite-50/70 px-3 py-2.5 text-sm leading-5 text-graphite-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-600" strokeWidth={1.75} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function CompactCard({ title, icon: Icon }: { title: string; icon?: LucideIcon }) {
  return (
    <article className="group flex h-full items-start gap-3 rounded-2xl border border-graphite-100/80 bg-white p-5 shadow-card transition duration-300 ease-out hover:-translate-y-0.5 hover:border-petroleum-200 hover:shadow-lift">
      {Icon ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100 transition duration-300 group-hover:bg-petroleum-900 group-hover:text-white">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="text-sm font-semibold leading-6 tracking-tight text-graphite-900">{title}</h2>
    </article>
  );
}
