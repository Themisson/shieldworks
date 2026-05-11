import type { LucideIcon } from "lucide-react";
import { BadgeCheck, ExternalLink, Github, GraduationCap, Linkedin, Search } from "lucide-react";
import { professionalLinks } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  Lattes: GraduationCap,
  ORCID: BadgeCheck,
  "Google Acadêmico": Search,
  GitHub: Github,
  LinkedIn: Linkedin
};

export function ProfessionalLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact ? (
        <p className="mb-3 max-w-2xl text-sm leading-6 text-graphite-600">
          Perfis acadêmicos e profissionais com produção científica, identificação de pesquisador, networking
          institucional e repositórios de desenvolvimento técnico.
        </p>
      ) : null}
      <nav className="flex flex-wrap gap-2" aria-label="Perfis acadêmicos e profissionais">
        {professionalLinks.map((link) => {
          const Icon = iconMap[link.label] || ExternalLink;
          const isPlaceholder = link.isPlaceholder;
          const className = `group relative inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-petroleum-100 ${
            isPlaceholder
              ? "cursor-not-allowed border-graphite-100 bg-graphite-50 text-graphite-400"
              : "border-graphite-100 bg-white text-graphite-700 hover:border-petroleum-100 hover:bg-petroleum-50 hover:text-petroleum-900"
          }`;
          const content = (
            <>
              <Icon className="h-4 w-4" aria-hidden="true" />
              {!compact ? <span>{link.label}</span> : null}
              {!isPlaceholder ? <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" /> : null}
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden max-w-56 -translate-x-1/2 rounded-md bg-graphite-900 px-3 py-2 text-center text-xs font-medium leading-4 text-white shadow-soft group-hover:block group-focus-visible:block"
              >
                {link.tooltip}
              </span>
            </>
          );

          if (isPlaceholder) {
            return (
              <span
                key={link.label}
                className={className}
                aria-label={`${link.tooltip}. Link aguardando atualização.`}
                aria-disabled="true"
                tabIndex={0}
                title={`${link.tooltip} — aguardando atualização`}
              >
                {content}
              </span>
            );
          }

          return (
            <a
              key={link.label}
              href={link.href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.tooltip}
              title={link.tooltip}
            >
              {content}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
