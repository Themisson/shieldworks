import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { BadgeCheck, ExternalLink, Github, GraduationCap, Linkedin, MessageCircle, Phone, Search } from "lucide-react";
import { professionalLinks } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  WhatsApp: MessageCircle,
  Lattes: GraduationCap,
  ORCID: BadgeCheck,
  "Google Acadêmico": Search,
  GitHub: Github,
  LinkedIn: Linkedin
};

function ProfileIcon({ label, Icon }: { label: string; Icon: LucideIcon }) {
  if (label !== "WhatsApp") {
    return <Icon className="h-4 w-4" aria-hidden="true" />;
  }

  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center text-petroleum-700" aria-hidden="true">
      <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={2} />
      <Phone className="absolute h-2.5 w-2.5 stroke-white" strokeWidth={3} />
    </span>
  );
}

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
          const isInternal = link.isInternal;
          const className = `group relative inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 ${
            isPlaceholder
              ? "cursor-not-allowed border-graphite-100 bg-graphite-50 text-graphite-400"
              : link.label === "WhatsApp"
                ? "border-petroleum-100 bg-petroleum-50 text-petroleum-900 hover:border-petroleum-400 hover:bg-petroleum-100"
                : "border-graphite-100 bg-white text-graphite-700 shadow-sm hover:border-petroleum-200 hover:bg-petroleum-50 hover:text-petroleum-900"
          }`;
          const content = (
            <>
              <ProfileIcon label={link.label} Icon={Icon} />
              {!compact ? <span>{link.label}</span> : null}
              {!isPlaceholder && !isInternal ? <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" /> : null}
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden max-w-56 -translate-x-1/2 rounded-xl bg-graphite-900 px-3 py-2 text-center text-xs font-medium leading-4 text-white shadow-soft group-hover:block group-focus-visible:block"
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

          if (isInternal) {
            return (
              <Link
                key={link.label}
                href={link.href}
                className={className}
                aria-label={link.tooltip}
                title={link.tooltip}
              >
                {content}
              </Link>
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
