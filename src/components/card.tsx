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
          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function statusClassName(status?: string) {
  if (status === "Em desenvolvimento") {
    return "border-petroleum-100 bg-petroleum-50 text-petroleum-900";
  }

  if (status === "Sob demanda") {
    return "border-slate-300 bg-slate-900 text-white";
  }

  if (status === "Futuro módulo") {
    return "border-slate-200 bg-white text-slate-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
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
      className={`group flex h-full flex-col rounded-lg border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-petroleum-500 hover:shadow-md sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100 transition-colors group-hover:bg-petroleum-900 group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}
        {status || kicker ? (
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${status ? statusClassName(status) : "border-slate-200 bg-slate-50 text-slate-500"}`}>
            {status ?? kicker}
          </span>
        ) : null}
      </div>
      <h2 className="text-base font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {statusDescription ? (
        <p className="mt-4 rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2.5 text-xs leading-5 text-slate-600">
          {statusDescription}
        </p>
      ) : null}
      <TagList tags={tags} />
      {children ? <div className="mt-5">{children}</div> : null}
      {actionLabel ? (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-petroleum-900">
          {actionLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
  icon: Icon
}: {
  title: string;
  description?: string;
  items: string[];
  icon?: LucideIcon;
}) {
  return (
    <CardShell
      title={title}
      description={description ?? "Frente estruturada para entregas técnicas, documentação clara e evolução conforme a demanda."}
      icon={Icon}
    >
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2.5 text-sm leading-5 text-slate-700"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-700" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function CompactCard({ title, icon: Icon }: { title: string; icon?: LucideIcon }) {
  return (
    <article className="group flex h-full items-start gap-3 rounded-lg border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-petroleum-500 hover:shadow-md">
      {Icon ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-petroleum-50 text-petroleum-700 ring-1 ring-petroleum-100 transition-colors group-hover:bg-petroleum-900 group-hover:text-white">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="text-sm font-semibold leading-6 tracking-tight text-slate-900">{title}</h2>
    </article>
  );
}
