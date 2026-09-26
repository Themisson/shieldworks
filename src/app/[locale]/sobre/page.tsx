import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { routeLocale } from "@/lib/route-locale";
import { localizedPath } from "@/i18n/routing";
import { translate } from "@/i18n/translations";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { ProfilePortrait } from "@/components/profile-portrait";
import { TrackedLink } from "@/components/tracked-link";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";
import { researchLines } from "@/data/research";
import { featuredPublications } from "@/data/publications";
import {
  careerLines,
  careerStations,
  convergingAreas,
  researchProcess,
  workPrinciples,
  type CareerLine,
} from "@/data/profile";

const number = (index: number) => String(index + 1).padStart(2, "0");

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await routeLocale(params);
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const tr = (pt: string) => translate(pt, locale);
  const url = (path: string) => localizedPath(path, locale);
  const label = (n: string, pt: string, en: string) => (
    <p className="technical-label">
      <span>{n}</span> / {t(pt, en)}
    </p>
  );
  const button = (href: string, pt: string, en: string, secondary = false) => (
    <TrackedLink
      href={url(href)}
      eventName={href === "/contato" ? "cta_contact_click" : undefined}
      source="about"
      className={`sw-button ${secondary ? "sw-button-secondary" : ""}`}
    >
      {t(pt, en)}
      <span aria-hidden="true">↗</span>
    </TrackedLink>
  );
  const publications = featuredPublications
    .filter((item) => item.kind !== "tese")
    .slice(0, 3);
  return (
    <div className="about-page">
      {/* 1. Identity and convergence: the drawing, not the portrait, leads. */}
      <section className="about-band about-hero" aria-labelledby="about-title">
        <div className="section-shell split-composition">
          <div>
            {label("01", "SOBRE / ORIGEM DA SHIELDWORKS", "ABOUT / WHERE SHIELDWORKS COMES FROM")}
            <h1 id="about-title">
              {t(
                "Engenharia, pesquisa e tecnologia construídas sobre experiência real.",
                "Engineering, research and technology built on real experience.",
              )}
            </h1>
            <p className="about-lead">
              {t(
                "A ShieldWorks nasce da convergência entre experiência operacional, formação em engenharia, pesquisa científica em geomecânica e desenvolvimento de software. Cada frente informa as outras.",
                "ShieldWorks grows out of the convergence of operational experience, engineering education, scientific research in geomechanics and software development. Each front informs the others.",
              )}
            </p>
            <nav
              className="about-anchors"
              aria-label={t("Nesta página", "On this page")}
            >
              <a href="#quem-sou">{t("Quem sou", "Who I am")}</a>
              <a href="#trajetoria">{t("Trajetória", "Background")}</a>
              <a href="#areas">{t("Áreas", "Areas")}</a>
              <a href="#pesquisa-aplicada">{t("Pesquisa", "Research")}</a>
              <a href="#principios">{t("Princípios", "Principles")}</a>
            </nav>
          </div>
          <EngineeringScene kind="aboutConvergence" locale={locale} />
        </div>
      </section>

      {/* 2. The person: portrait as identity, beside the biography. */}
      <section
        id="quem-sou"
        className="about-band about-muted about-person"
        aria-labelledby="about-person-title"
      >
        <div className="section-shell about-person-grid">
          <ProfilePortrait
            className="about-portrait"
            sizes="(max-width: 47.99rem) 11rem, (max-width: 79.99rem) 15rem, 17.5rem"
          />
          <div>
            {label("02", "QUEM SOU", "WHO I AM")}
            <h2 id="about-person-title">Themisson dos Santos Vasconcelos</h2>
            <p className="about-roles">
              {tr("Engenharia · Pesquisa · Segurança · Tecnologia")}
            </p>
            <div className="about-bio">
              <p>
                {tr(
                  "Themisson dos Santos Vasconcelos é Tenente-Coronel do Corpo de Bombeiros Militar de Alagoas, engenheiro de petróleo, mestre e doutor na área de estruturas e geomecânica. Sua trajetória integra segurança operacional, pesquisa aplicada, engenharia computacional, gestão acadêmica e desenvolvimento de soluções digitais.",
                )}
              </p>
              <p>
                {tr(
                  "Sua atuação técnica envolve modelagem numérica computacional, geomecânica aplicada, simulação de problemas estruturais e geomecânicos, desenvolvimento de códigos próprios em C++ e Python e utilização de ferramentas consolidadas de análise, incluindo o ABAQUS, para estudos envolvendo tensões, deformações, comportamento de materiais e validação de modelos numéricos.",
                )}
              </p>
            </div>
            <div className="about-links">
              <ProfessionalLinks compact />
            </div>
            <p className="about-note">
              {tr(
                "A apresentação neste site tem caráter profissional pessoal. Ela não configura promoção institucional nem declara que eventuais sistemas, demonstrações ou projetos digitais sejam produtos oficiais do CBMAL ou de qualquer órgão público.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Background as a knowledge map; phones get the same stations as a rail. */}
      <section
        id="trajetoria"
        className="about-band about-career scene-scope"
        aria-labelledby="about-career-title"
      >
        <div className="section-shell">
          {label("03", "TRAJETÓRIA", "BACKGROUND")}
          <h2 id="about-career-title">
            {t(
              "Uma trajetória que cruza disciplinas.",
              "A path that crosses disciplines.",
            )}
          </h2>
          <p className="about-lead">
            {t(
              "Quatro linhas de atuação que se encontram na ShieldWorks. O mapa mostra conexões, não datas: os anos aparecem apenas quando documentados.",
              "Four lines of practice meeting at ShieldWorks. The map shows connections, not dates: years appear only where documented.",
            )}
          </p>
          <EngineeringScene kind="career" locale={locale} legend={false} />
          <p className="career-lines" aria-hidden="true">
            {(Object.keys(careerLines) as CareerLine[]).map((line) => (
              <span key={line} className={`line-${line}`}>
                {careerLines[line][locale]}
              </span>
            ))}
          </p>
          <ol className="career-stations">
            {careerStations.map((station, i) => (
              <li
                key={station.title.pt}
                data-focus={i + 1}
                className={`line-${station.line === "shieldworks" ? "engineering" : station.line}`}
              >
                <span>{number(i)}</span>
                <div>
                  <h3>{station.title[locale]}</h3>
                  <p>{station.detail[locale]}</p>
                  {station.line !== "shieldworks" && (
                    <small>{careerLines[station.line][locale]}</small>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Four areas around one hub, arranged asymmetrically. */}
      <section
        id="areas"
        className="about-band dark-section about-areas scene-scope"
        aria-labelledby="about-areas-title"
      >
        <div className="section-shell">
          {label("04", "ÁREAS QUE CONVERGEM", "CONVERGING AREAS")}
          <h2 id="about-areas-title">
            {t("Quatro eixos, um mesmo problema.", "Four axes, one problem.")}
          </h2>
          <div className="areas-map">
            {convergingAreas.map((area, i) => (
              <article
                key={area.title.pt}
                className="area-block"
                data-focus={i + 1}
              >
                <span>{number(i)}</span>
                <h3>{area.title[locale]}</h3>
                <ul>
                  {area.branches.map((branch) => (
                    <li key={branch.pt}>{branch[locale]}</li>
                  ))}
                </ul>
              </article>
            ))}
            <EngineeringScene kind="aboutAreas" locale={locale} legend={false} />
          </div>
        </div>
      </section>

      {/* 5. Research as part of practice, with the documented record. */}
      <section
        id="pesquisa-aplicada"
        className="about-band about-research scene-scope"
        aria-labelledby="about-research-title"
      >
        <div className="section-shell">
          {label("05", "PESQUISA E PRODUÇÃO CIENTÍFICA", "RESEARCH AND SCIENTIFIC OUTPUT")}
          <h2 id="about-research-title">
            {t(
              "Pesquisa aplicada como parte da prática profissional.",
              "Applied research as part of professional practice.",
            )}
          </h2>
          <p className="about-lead">
            {t(
              "Geomecânica salina, mecânica computacional, métodos numéricos e engenharia de poços, conectados à integridade e à decisão técnica.",
              "Salt geomechanics, computational mechanics, numerical methods and well engineering, connected to integrity and technical decisions.",
            )}
          </p>
          <EngineeringScene
            kind="researchProcess"
            locale={locale}
            legend={false}
          />
          <ol className="process-steps">
            {researchProcess.map((step, i) => (
              <li key={step.pt} data-focus={i + 1}>
                <span>{number(i)}</span>
                {step[locale]}
              </li>
            ))}
          </ol>
          <div className="research-record">
            <div>
              <h3>{t("Linhas de pesquisa", "Research lines")}</h3>
              <nav
                className="research-line-links"
                aria-label={t("Linhas de pesquisa", "Research lines")}
              >
                {researchLines.map((line) => (
                  <Link key={line.slug} href={url(`/pesquisa/${line.slug}`)}>
                    <span>{line.number}</span>
                    {line.title[locale]}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3>{t("Publicações recentes", "Recent publications")}</h3>
              <ul className="publication-list">
                {publications.map((item) => (
                  <li key={item.id}>
                    <Link href={url(`/pesquisa/publicacoes/${item.id}`)}>
                      <span className="publication-title" lang="en">
                        {item.title}
                      </span>
                      <span className="publication-meta">
                        {item.year} / {item.venue}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="button-row">
                {button("/pesquisa", "Explorar pesquisa", "Explore research")}
                {button(
                  "/pesquisa/publicacoes",
                  "Todas as publicações",
                  "All publications",
                  true,
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Principles as typography. */}
      <section
        id="principios"
        className="about-band about-muted"
        aria-labelledby="about-principles-title"
      >
        <div className="section-shell">
          {label("06", "PRINCÍPIOS DE TRABALHO", "WORKING PRINCIPLES")}
          <h2 id="about-principles-title">
            {t("O que conecta as áreas.", "What connects the areas.")}
          </h2>
          <ol className="principles">
            {workPrinciples.map((principle, i) => (
              <li key={principle.title.pt}>
                <span>{number(i)}</span>
                <h3>{principle.title[locale]}</h3>
                <p>{principle.detail[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Closing: from background to current work. */}
      <section
        className="about-band dark-section about-closing"
        aria-labelledby="about-closing-title"
      >
        <div className="section-shell">
          {label("07", "HOJE", "TODAY")}
          <h2 id="about-closing-title">
            {t(
              "Problemas complexos exigem método, integração de conhecimento e capacidade de transformar análise em decisão.",
              "Complex problems call for method, integrated knowledge and the ability to turn analysis into decisions.",
            )}
          </h2>
          <div className="button-row">
            {button("/projetos", "Conhecer projetos", "Explore projects")}
            {button("/contato", "Entrar em contato", "Get in touch", true)}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/sobre",
    locale === "en" ? "About" : "Sobre",
    locale === "en"
      ? "Themisson dos Santos Vasconcelos: professional background, education and applied research."
      : "Trajetória, formação, pesquisa e atuação profissional de Themisson dos Santos Vasconcelos.",
    locale,
  );
}
