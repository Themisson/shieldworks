import Link from "next/link";
import { projects } from "@/data/projects";
import { routeLocale } from "@/lib/route-locale";
import { pageMetadata } from "@/lib/page-metadata";
import { localizedPath } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProjectCard } from "@/components/project-card";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/projetos",
    locale === "en" ? "Projects and products" : "Projetos e produtos",
    locale === "en"
      ? "ShieldWorks software portfolio: technical publishing, education, music, assessment, access measurement, construction tracking and duty rosters."
      : "Portfólio de software ShieldWorks: publicação técnica, ensino, música, avaliação, medição de acessos, acompanhamento de obras e escalas de serviço.",
    locale,
  );
}
export default async function ProjectsPage({ params }: Props) {
  const locale = await routeLocale(params);
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  return (
    <div className="section-shell internal-page">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("Projetos", "Projects"), href: "/projetos" }]}
      />
      <header className="internal-hero">
        <p className="technical-label">SHIELDWORKS / SOFTWARE</p>
        <h1>
          {t(
            "Conhecimento que se torna software.",
            "Knowledge becomes software.",
          )}
        </h1>
        <p className="detail-description">
          {t(
            "Produtos e projetos próprios com escopo, recursos e estágio documentados. Cada solução parte de um contexto real.",
            "Our own products and projects with documented scope, features and stage. Each solution starts from a real context.",
          )}
        </p>
      </header>
      <div className="project-grid project-catalog">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            index={i}
            heading="h2"
            source="projects"
            category
          />
        ))}
      </div>
      <section className="internal-section">
        <h2>{t("Sistemas sob demanda", "Custom institutional systems")}</h2>
        <p className="detail-description">
          {t(
            "A frente institucional também reúne projetos de gestão acadêmica, documentos, certificados, indicadores e treinamentos, com seus estágios originais preservados.",
            "The institutional practice also includes academic management, documents, certificates, indicators and training projects, with their original stages retained.",
          )}
        </p>
        <Link
          className="sw-button mt-6"
          href={localizedPath("/sistemas", locale)}
        >
          {t("Ver sistemas institucionais", "Explore institutional systems")} ↗
        </Link>
      </section>
    </div>
  );
}
