import { BadgeCheck, BookOpen, ExternalLink, FileText, Search } from "lucide-react";
import { brand } from "@/data/site";

const links = [
  {
    label: "Acessar Currículo Lattes",
    href: brand.lattes,
    icon: BookOpen,
    active: true
  },
  {
    label: "Acessar perfil ORCID",
    href: brand.orcid,
    icon: BadgeCheck,
    active: true
  },
  {
    label: "Currículo resumido em PDF — em breve",
    href: brand.resume,
    icon: FileText,
    active: false
  },
  {
    label: "Google Scholar — em breve",
    href: brand.scholar,
    icon: Search,
    active: false
  }
];

export function AcademicLinks({ compact = false }: { compact?: boolean }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Perfis acadêmicos">
      {links.map((link) => {
        const Icon = link.icon;
        const className = `group relative inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-petroleum-100 ${
          link.active
            ? "border-graphite-100 bg-white text-graphite-700 hover:border-petroleum-100 hover:bg-petroleum-50 hover:text-petroleum-900"
            : "cursor-not-allowed border-graphite-100 bg-graphite-50 text-graphite-400"
        }`;
        const content = (
          <>
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!compact ? <span>{link.label.replace("Acessar ", "").replace(" — em breve", "")}</span> : null}
            {link.active ? <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" /> : null}
            <span
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden max-w-56 -translate-x-1/2 rounded-md bg-graphite-900 px-3 py-2 text-center text-xs font-medium leading-4 text-white shadow-soft group-hover:block group-focus-visible:block"
            >
              {link.label}
            </span>
          </>
        );

        if (!link.active) {
          return (
            <span key={link.label} className={className} aria-disabled="true" tabIndex={0}>
              {content}
            </span>
          );
        }

        return (
          <a key={link.label} href={link.href} className={className} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            {content}
          </a>
        );
      })}
    </nav>
  );
}
