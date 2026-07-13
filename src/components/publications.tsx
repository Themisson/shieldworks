import { ExternalLink } from "lucide-react";
import type { Publication } from "@/data/publications";
import { publicationProfiles } from "@/data/publications";
import { ButtonLink } from "@/components/button-link";

const kindLabels: Record<Publication["kind"], string> = {
  artigo: "Artigo",
  tese: "Tese",
  congresso: "Congresso",
  periodico: "Periódico"
};

type PublicationsListProps = {
  items: Publication[];
  showProfiles?: boolean;
};

export function PublicationsList({ items, showProfiles = true }: PublicationsListProps) {
  return (
    <div>
      <ul className="divide-y divide-graphite-100 overflow-hidden rounded-2xl border border-graphite-100/80 bg-white shadow-card">
        {items.map((pub) => (
          <li key={pub.id}>
            <a
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 px-5 py-5 transition duration-200 hover:bg-petroleum-50/40 focus:outline-none focus-visible:bg-petroleum-50/50 sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-graphite-100 bg-graphite-50 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-graphite-600">
                    {pub.year}
                  </span>
                  <span className="rounded-md border border-petroleum-100 bg-petroleum-50 px-2 py-0.5 text-[11px] font-medium text-petroleum-800">
                    {kindLabels[pub.kind]}
                  </span>
                  {pub.highlight ? (
                    <span className="rounded-md border border-safety-100 bg-safety-50 px-2 py-0.5 text-[11px] font-medium text-safety-700">
                      Destaque
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-6 tracking-tight text-graphite-900 transition-colors group-hover:text-petroleum-800 sm:text-[0.95rem]">
                  {pub.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-graphite-500">{pub.authors}</p>
                <p className="mt-1 text-xs leading-5 text-graphite-600">{pub.venue}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-petroleum-800 opacity-80 transition group-hover:opacity-100">
                Ver no Scholar
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {showProfiles ? (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonLink href={publicationProfiles.lattes} variant="secondary">
            Currículo Lattes
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={publicationProfiles.orcid} variant="secondary">
            ORCID
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={publicationProfiles.scholar} variant="secondary">
            Google Acadêmico
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
