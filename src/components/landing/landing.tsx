import Link from "next/link";
import type { Locale } from "@/i18n/translations";
import { localizedPath } from "@/i18n/routing";
import { EngineeringScene } from "@/components/illustrations/engineering-scene";
import { SectionIndicator } from "@/components/landing/section-indicator";
import { ArticleList } from "@/components/editorial/article-list";
import { getArticles } from "@/lib/editorial";
import { projects } from "@/data/projects";
import { researchLines } from "@/data/research";
import { featuredSolutions, brand } from "@/data/site";
import { featuredPublications } from "@/data/publications";
import { caseStudies } from "@/data/cases";
import { translate } from "@/i18n/translations";

export function Landing({ locale }: { locale: Locale }) {
  const t = (pt: string, en: string) => (locale === "en" ? en : pt);
  const url = (path: string) => localizedPath(path, locale);
  const publication = featuredPublications[0];
  const label = (number: string, pt: string, en: string) => (
    <p className="technical-label">
      <span>{number}</span> / {t(pt, en)}
    </p>
  );
  const button = (href: string, pt: string, en: string, secondary = false) => (
    <Link
      href={url(href)}
      className={`sw-button ${secondary ? "sw-button-secondary" : ""}`}
    >
      {t(pt, en)}
      <span aria-hidden="true">↗</span>
    </Link>
  );
  return (
    <div className="landing-screens">
      <SectionIndicator />
      <section
        id="inicio"
        className="landing-screen hero-screen"
        aria-labelledby="hero-title"
      >
        <div className="section-shell hero-composition">
          <div className="hero-copy">
            {label(
              "01",
              "ENGENHARIA / PESQUISA / SOFTWARE",
              "ENGINEERING / RESEARCH / SOFTWARE",
            )}
            <h1 id="hero-title">
              {t(
                "Engenharia, pesquisa e software aplicados a problemas reais.",
                "Engineering, research and software for real-world problems.",
              )}
            </h1>
            <p className="hero-lead">
              {t(
                "Investigar com rigor. Modelar com método. Construir com propósito.",
                "Investigate rigorously. Model methodically. Build with purpose.",
              )}
            </p>
            <p className="hero-description">
              {t(
                "Da geomecânica aos sistemas digitais, conectamos conhecimento científico, engenharia computacional e experiência operacional para transformar problemas em entregas claras.",
                "From geomechanics to digital systems, we connect scientific knowledge, computational engineering and operational experience to turn problems into clear deliverables.",
              )}
            </p>
            <div className="button-row">
              {button("/solucoes", "Explorar soluções", "Explore solutions")}
              {button(
                "/projetos",
                "Conhecer projetos",
                "Explore projects",
                true,
              )}
            </div>
            <div className="hero-signature">
              <span className="signature-rule" />
              {t("Uma iniciativa de", "An initiative by")}
              <span>{brand.owner}</span>
            </div>
          </div>
          <div className="hero-visual">
            <EngineeringScene />
            <div className="visual-index">
              <span>01 / {t("Modelo físico", "Physical model")}</span>
              <span>02 / {t("Método numérico", "Numerical method")}</span>
              <span>03 / {t("Decisão", "Decision")}</span>
            </div>
          </div>
        </div>
        <div className="section-shell hero-bottom">
          <span>
            SHIELDWORKS /{" "}
            {t("CONHECIMENTO EM APLICAÇÃO", "KNOWLEDGE IN APPLICATION")}
          </span>
          <a href="#shieldworks">
            {t("Explore a convergência", "Explore the convergence")}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section
        id="shieldworks"
        className="landing-screen approach-screen"
        aria-labelledby="approach-title"
      >
        <div className="section-shell">
          {label("02", "A ABORDAGEM", "THE APPROACH")}
          <div className="split-composition">
            <h2 id="approach-title">
              {t(
                "O problema é o ponto de partida.",
                "The problem is the starting point.",
              )}
            </h2>
            <div className="reading-copy">
              <p className="section-lead">
                {t(
                  "Engenharia para compreender. Pesquisa para aprofundar. Software para colocar em prática.",
                  "Engineering to understand. Research to go deeper. Software to put knowledge into practice.",
                )}
              </p>
              <p>
                {t(
                  "A ShieldWorks reúne frentes complementares em uma atuação profissional independente. O escopo começa pelo contexto, pelas restrições e pelo resultado esperado.",
                  "ShieldWorks brings complementary disciplines together in an independent professional practice. Scope begins with context, constraints and the expected outcome.",
                )}
              </p>
            </div>
          </div>
          <ol className="approach-steps">
            {[
              [
                "01",
                "Compreender",
                "Understand",
                "Problema, dados e restrições.",
                "Problem, data and constraints.",
              ],
              [
                "02",
                "Investigar",
                "Investigate",
                "Hipóteses, métodos e evidências.",
                "Hypotheses, methods and evidence.",
              ],
              [
                "03",
                "Desenvolver",
                "Develop",
                "Modelos, análises e sistemas.",
                "Models, analyses and systems.",
              ],
              [
                "04",
                "Documentar",
                "Document",
                "Entrega clara e rastreável.",
                "Clear and traceable delivery.",
              ],
            ].map(([n, pt, en, dpt, den]) => (
              <li key={n}>
                <span>{n}</span>
                <h3>{t(pt, en)}</h3>
                <p>{t(dpt, den)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section
        id="solucoes"
        className="landing-screen solutions-screen"
        aria-labelledby="solutions-title"
      >
        <div className="section-shell split-composition">
          <div>
            {label("03", "SOLUÇÕES", "SOLUTIONS")}
            <h2 id="solutions-title">
              {t(
                "Método técnico. Aplicação concreta.",
                "Technical method. Practical application.",
              )}
            </h2>
            <p className="section-lead">
              {t(
                "Cada demanda combina problema, abordagem e entrega. A tecnologia entra onde faz diferença.",
                "Each request connects problem, approach and delivery. Technology belongs where it makes a difference.",
              )}
            </p>
            {button(
              "/solucoes",
              "Ver todas as soluções",
              "All solutions",
              true,
            )}
            <EngineeringScene kind="safety" />
          </div>
          <div className="solution-ledger">
            {featuredSolutions.map((solution, i) => (
              <Link
                key={solution.title}
                href={url(i === 4 ? "/assessoria-academica" : "/solucoes")}
              >
                <span className="ledger-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{translate(solution.title, locale)}</h3>
                  <p>{translate(solution.description, locale)}</p>
                  <div className="tag-line">{solution.tags.map(tag => translate(tag,locale)).join(" / ")}</div>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="pesquisa"
        className="landing-screen research-screen dark-section"
        aria-labelledby="research-title"
      >
        <div className="section-shell split-composition">
          <div>
            {label("04", "PESQUISA APLICADA", "APPLIED RESEARCH")}
            <h2 id="research-title">
              {t(
                "Entre a formação e o modelo.",
                "Between the formation and the model.",
              )}
            </h2>
            <p className="section-lead">
              {t(
                "Geomecânica salina, engenharia de poços e métodos computacionais. Investigações conectadas à integridade e à decisão técnica.",
                "Salt geomechanics, well engineering and computational methods. Investigations connected to integrity and technical decisions.",
              )}
            </p>
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
            {button("/pesquisa", "Explorar pesquisa", "Explore research")}
          </div>
          <EngineeringScene kind="research" />
        </div>
      </section>
      <section
        id="publicacao"
        className="landing-screen publication-screen"
        aria-labelledby="publication-title"
      >
        <div className="section-shell">
          {label("05", "PUBLICAÇÃO EM DESTAQUE", "FEATURED PUBLICATION")}
          <div className="publication-composition">
            <div>
              <p className="publication-year">{publication.year}</p>
              <p className="technical-label">
                {t("ARTIGO CIENTÍFICO", "SCIENTIFIC ARTICLE")}
              </p>
              <h2 id="publication-title" lang="en">
                {publication.title}
              </h2>
              <p className="publication-authors">{publication.authors}</p>
              <p className="publication-venue">{publication.venue}</p>
              <div className="button-row">
                {button(
                  `/pesquisa/publicacoes/${publication.id}`,
                  "Conhecer a publicação",
                  "Explore publication",
                )}
                {button(
                  "/pesquisa/publicacoes",
                  "Todas as publicações",
                  "All publications",
                  true,
                )}
              </div>
            </div>
            <aside className="publication-aside">
              <span className="plate-number">LOT</span>
              <h3>
                {t("Poço. Sal. Termomecânica.", "Well. Salt. Thermomechanics.")}
              </h3>
              <p>
                {t(
                  "Uma publicação da linha de pesquisa em leak-off test em formações salinas. Metadados e fonte acadêmica disponíveis para consulta.",
                  "A publication from the research line on leak-off tests in salt formations. Metadata and academic source are available for consultation.",
                )}
              </p>
              <a
                href={publication.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google {t("Acadêmico", "Scholar")} ↗
              </a>
            </aside>
          </div>
        </div>
      </section>
      <section
        id="projetos"
        className="landing-screen projects-screen"
        aria-labelledby="projects-title"
      >
        <div className="section-shell">
          {label("06", "PROJETOS E PRODUTOS", "PROJECTS AND PRODUCTS")}
          <div className="section-heading-row">
            <div>
              <h2 id="projects-title">
                {t(
                  "Conhecimento que se torna software.",
                  "Knowledge becomes software.",
                )}
              </h2>
              <p className="section-lead">
                {t(
                  "Ferramentas próprias, contextos diferentes, a mesma atenção ao problema.",
                  "Our own tools, different contexts, the same attention to the problem.",
                )}
              </p>
            </div>
            {button(
              "/projetos",
              "Explorar o portfólio",
              "Explore the portfolio",
              true,
            )}
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={url(`/projetos/${project.slug}`)}
                className={`project-tile project-${project.slug}`}
              >
                <div className="project-tile-top">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="project-symbol" aria-hidden="true">
                  {["M↓", "A+", "S∿", "G▦"][i]}
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary[locale]}</p>
                <span className="project-stage">{project.stage[locale]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="cases"
        className="landing-screen cases-screen"
        aria-labelledby="cases-title"
      >
        <div className="section-shell">
          {label("07", "CASES DOCUMENTADOS", "DOCUMENTED CASE STUDIES")}
          <h2 id="cases-title">
            {t("Problema, método e entrega.", "Problem, method and delivery.")}
          </h2>
          <p className="section-lead">
            {t(
              "Exemplos reais da pesquisa e dos sistemas institucionais, com contexto e rastreabilidade.",
              "Real examples from research and institutional systems, with context and traceability.",
            )}
          </p>
          <div className="case-grid">
            {caseStudies.map((study, i) => (
              <article key={study.id}>
                <p className="technical-label">
                  0{i + 1} / {study.year}
                </p>
                <h3>{translate(study.title, locale)}</h3>
                <p>{translate(study.summary, locale)}</p>
                <ol>
                  {study.method.map((step, index) => (
                    <li key={step.label}>
                      <span>0{index + 1}</span>
                      {translate(step.label, locale)}
                    </li>
                  ))}
                </ol>
                <Link href={url(`/cases/${study.id}`)}>
                  {t("Ler o case completo", "Read the complete case")} ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="conteudo"
        className="landing-screen content-screen"
        aria-labelledby="content-title"
      >
        <div className="section-shell split-composition">
          <div>
            {label("08", "CONTEÚDO", "CONTENT")}
            <h2 id="content-title">
              {t(
                "Compartilhar também é construir.",
                "Sharing is also building.",
              )}
            </h2>
            <p className="section-lead">
              {t(
                "Notas sobre engenharia, pesquisa, sistemas e segurança. Uma plataforma para aproximar método e aplicação.",
                "Notes on engineering, research, systems and safety. A platform connecting method and application.",
              )}
            </p>
            {button("/conteudo", "Explorar conteúdo", "Explore content", true)}
          </div>
          <ArticleList articles={getArticles(locale).slice(0, 3)} />
        </div>
      </section>
      <section
        id="conhecimento"
        className="landing-screen knowledge-screen dark-section"
        aria-labelledby="knowledge-title"
      >
        <div className="section-shell split-composition">
          <EngineeringScene kind="knowledge" />
          <div>
            {label("09", "ECOSSISTEMA DE CONHECIMENTO", "KNOWLEDGE ECOSYSTEM")}
            <h2 id="knowledge-title">
              {t(
                "Uma rede. Múltiplas aplicações.",
                "One network. Multiple applications.",
              )}
            </h2>
            <p className="section-lead">
              {t(
                "A pesquisa alimenta os métodos. Os métodos orientam o software. A documentação permite que o conhecimento circule.",
                "Research informs methods. Methods guide software. Documentation allows knowledge to circulate.",
              )}
            </p>
            <div className="knowledge-links">
              <Link href={url("/pesquisa/publicacoes")}>
                {t("Produção científica", "Scientific output")} ↗
              </Link>
              <Link href={url("/projetos")}>
                {t("Ferramentas digitais", "Digital tools")} ↗
              </Link>
              <a href={brand.lattes} target="_blank" rel="noopener noreferrer">
                {t("Currículo Lattes", "Lattes CV")} ↗
              </a>
              <a href={brand.orcid} target="_blank" rel="noopener noreferrer">
                ORCID ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        id="sobre"
        className="landing-screen about-screen"
        aria-labelledby="about-title"
      >
        <div className="section-shell split-composition">
          <div>
            {label("10", "QUEM CONSTRÓI", "THE PERSON BEHIND IT")}
            <h2 id="about-title">
              {t(
                "Profundidade técnica. Visão prática.",
                "Technical depth. Practical perspective.",
              )}
            </h2>
            <p className="section-lead">{brand.owner}</p>
            <p className="reading-copy">
              {t(
                "Engenheiro de Petróleo, Mestre e Doutor em Estruturas e Geomecânica. Pesquisa, experiência em segurança operacional e desenvolvimento computacional em uma trajetória multidisciplinar.",
                "Petroleum Engineer, Master's and PhD in Structures and Geomechanics. Research, operational safety experience and computational development in a multidisciplinary career.",
              )}
            </p>
            {button(
              "/sobre",
              "Conhecer a trajetória",
              "Explore the professional background",
              true,
            )}
          </div>
          <dl className="credential-ledger">
            {[
              [
                "01",
                "Engenharia e pesquisa",
                "Engineering and research",
                "Geomecânica, poços e métodos computacionais.",
                "Geomechanics, wells and computational methods.",
              ],
              [
                "02",
                "Software e automação",
                "Software and automation",
                "C++, Python, ABAQUS e sistemas web.",
                "C++, Python, ABAQUS and web systems.",
              ],
              [
                "03",
                "Ensino e metodologia",
                "Teaching and methodology",
                "Orientação consultiva, rigor e integridade acadêmica.",
                "Consultative guidance, rigor and academic integrity.",
              ],
            ].map(([n, pt, en, dpt, den]) => (
              <div key={n}>
                <dt>
                  <span>{n}</span>
                  {t(pt, en)}
                </dt>
                <dd>{t(dpt, den)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section
        id="atualizacoes"
        className="landing-screen updates-screen"
        aria-labelledby="updates-title"
      >
        <div className="section-shell split-composition">
          <div>
            {label("11", "ACOMPANHE", "FOLLOW ALONG")}
            <h2 id="updates-title">
              {t(
                "Próximas leituras, no seu ritmo.",
                "Your next reading, at your own pace.",
              )}
            </h2>
            <p className="section-lead">
              {t(
                "Receba novas notas no seu leitor de RSS. Um canal aberto para acompanhar o conhecimento publicado.",
                "Receive new notes in your RSS reader. An open channel for following published knowledge.",
              )}
            </p>
            <a className="sw-button" href="/feed.xml">
              {t("Acompanhar por RSS", "Follow via RSS")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <aside className="newsletter-panel">
            <h3>{t("Atualizações por e-mail", "Email updates")}</h3>
            <p>
              {t(
                "O canal de assinatura por e-mail está em preparação. Por enquanto, acompanhe as publicações pelo RSS ou pela área de conteúdo.",
                "Email subscriptions are being prepared. For now, follow publications through RSS or the content section.",
              )}
            </p>
            <p className="technical-label">
              {t(
                "ASSINATURA AINDA INDISPONÍVEL",
                "SUBSCRIPTIONS NOT YET AVAILABLE",
              )}
            </p>
            <Link href={url("/conteudo")}>
              {t("Ver conteúdo publicado", "Browse published content")} ↗
            </Link>
          </aside>
        </div>
      </section>
      <section
        id="contato"
        className="landing-screen contact-screen dark-section"
        aria-labelledby="contact-title"
      >
        <div className="section-shell">
          <p className="technical-label">
            12 / {t("VAMOS CONVERSAR", "LET'S TALK")}
          </p>
          <h2 id="contact-title">
            {t(
              "Qual problema você quer resolver?",
              "What problem do you want to solve?",
            )}
          </h2>
          <p className="section-lead">
            {t(
              "Apresente o contexto, as restrições e o resultado esperado. A conversa inicial define a aderência e os próximos passos.",
              "Share the context, constraints and expected outcome. An initial conversation establishes fit and next steps.",
            )}
          </p>
          <div className="button-row">
            {button(
              "/contato",
              "Apresentar minha demanda",
              "Discuss my project",
            )}
            {button(
              "/whatsapp",
              "Conversar pelo WhatsApp",
              "Talk on WhatsApp",
              true,
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
