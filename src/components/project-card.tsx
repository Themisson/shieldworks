import Link from "next/link";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/translations";
import { localizedPath } from "@/i18n/routing";
import { ProjectMark } from "@/components/illustrations/project-marks";
import { TrackedLink } from "@/components/tracked-link";

type Props = {
  project: Project;
  locale: Locale;
  index: number;
  /** Heading level inside the surrounding section. */
  heading: "h2" | "h3";
  /** Links the tile to a numbered part of the engineering scene (CSS only). */
  focus?: number;
  /** Where the click is counted from. */
  source: string;
  /** Show the category next to the number (catalog page). */
  category?: boolean;
};

/**
 * One product of the catalog: the mark (favicon) of the application, the name
 * as the primary link to the internal page (stretched over the whole tile by
 * CSS) and, when the application is online, a separate "open" link to it.
 * Everything is server-rendered; hover and focus states are CSS only.
 */
export function ProjectCard({
  project,
  locale,
  index,
  heading: Heading,
  focus,
  source,
  category = false,
}: Props) {
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const number = String(index + 1).padStart(2, "0");
  const host = project.href ? new URL(project.href).host : null;
  return (
    <article className="project-tile" data-focus={focus}>
      <div className="project-identity">
        <ProjectMark slug={project.slug} />
        <div className="project-identity-text">
          <span className="project-kicker">
            {number}
            {category ? ` / ${project.category[locale]}` : null}
          </span>
          <Heading>
            <Link
              className="project-tile-link"
              href={localizedPath(`/projetos/${project.slug}`, locale)}
            >
              {project.name}
            </Link>
          </Heading>
          {host ? <span className="project-host">{host}</span> : null}
        </div>
        <span className="project-tile-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p>{project.summary[locale]}</p>
      <div className="project-tile-foot">
        <span className="project-stage">{project.stage[locale]}</span>
        {project.href ? (
          <TrackedLink
            className="project-launch"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            eventName="project_open_click"
            source={source}
            aria-label={t(
              `Abrir ${project.name} em nova aba`,
              `Open ${project.name} in a new tab`,
            )}
          >
            {t("Abrir aplicação", "Open application")}
            <span aria-hidden="true">↗</span>
          </TrackedLink>
        ) : null}
      </div>
    </article>
  );
}
