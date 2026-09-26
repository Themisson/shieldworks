import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata, jsonLd } from "@/lib/page-metadata";
import { canonicalUrl } from "@/lib/seo";
import { localizedPath } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return pageMetadata(
    `/projetos/${slug}`,
    project.name,
    project.summary[locale],
    locale,
  );
}
export default async function ProjectPage({ params }: Props) {
  const locale = await routeLocale(params);
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("Projetos", "Projects"), href: "/projetos" },
          { label: project.name, href: `/projetos/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary[locale],
            url: canonicalUrl(localizedPath(`/projetos/${slug}`, locale)),
            creator: {
              "@type": "Person",
              name: "Themisson dos Santos Vasconcelos",
            },
            sameAs: [
              ...(project.href ? [project.href] : []),
              ...(project.repositoryPublic ? [project.repository] : []),
            ],
          }),
        }}
      />
      <header className="internal-hero">
        <p className="technical-label">
          {project.category[locale]} / {project.stage[locale]}
        </p>
        <h1>{project.name}</h1>
        <p className="detail-description">{project.summary[locale]}</p>
      </header>
      <div className="internal-grid">
        <div>
          <EngineeringScene kind="software" locale={locale} />
          <section className="internal-section">
            <h2>{t("O problema", "The problem")}</h2>
            <p className="detail-description">{project.problem[locale]}</p>
          </section>
          <section className="internal-section">
            <h2>{t("O que a solução oferece", "What the solution offers")}</h2>
            <ul className="detail-list">
              {project.features[locale].map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="detail-aside">
          <p className="technical-label">{t("TECNOLOGIAS", "TECHNOLOGIES")}</p>
          <p>{project.technologies.join(" / ")}</p>
          <h2 className="text-xl">
            {t("Estágio documentado", "Documented stage")}
          </h2>
          <p>{project.stage[locale]}</p>
          {project.href ? (
            <a
              className="block"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Acessar aplicação", "Open application")} ↗
            </a>
          ) : (
            <p>
              {t(
                "Converse sobre uma demonstração.",
                "Ask about a demonstration.",
              )}
            </p>
          )}
          {project.repositoryPublic && (
            <a
              className="block"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Repositório", "Repository")} ↗
            </a>
          )}
          <Link className="sw-button" href={localizedPath("/contato", locale)}>
            {t("Conversar sobre uma solução", "Discuss a solution")}
          </Link>
          <details>
            <summary>
              {t(
                "Fonte dos recursos apresentados",
                "Source of the presented features",
              )}
            </summary>
            <p className="text-sm break-words">{project.source}</p>
          </details>
        </aside>
      </div>
    </div>
  );
}
