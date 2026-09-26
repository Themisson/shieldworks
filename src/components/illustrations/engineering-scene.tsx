"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { CompactSceneArtwork, SceneArtwork } from "./scene-artwork";

export type SceneKind =
  | "integrated"
  | "approach"
  | "solutions"
  | "research"
  | "publication"
  | "software"
  | "cases"
  | "editorial"
  | "knowledge"
  | "trajectory"
  | "updates"
  | "contact"
  | "numerical"
  | "safety";

const scenes: Record<
  SceneKind,
  { title: [string, string]; description: [string, string] }
> = {
  integrated: {
    title: ["CONVERGÊNCIA", "CONVERGENCE"],
    description: [
      "Poço em formação salina conectado a uma malha numérica, código, análise e integridade: engenharia, pesquisa, software e segurança aplicados ao mesmo problema.",
      "A well in a salt formation connected to a numerical mesh, code, analysis and integrity: engineering, research, software and safety applied to the same problem.",
    ],
  },
  approach: {
    title: ["DO CONTEXTO À ENTREGA", "FROM CONTEXT TO DELIVERY"],
    description: [
      "Quatro etapas conectadas: compreender o contexto, investigar hipóteses, desenvolver modelos e documentar a entrega.",
      "Four connected stages: understand the context, investigate hypotheses, develop models and document delivery.",
    ],
  },
  solutions: {
    title: ["CAPACIDADES CONECTADAS", "CONNECTED CAPABILITIES"],
    description: [
      "Engenharia numérica, software, segurança, pesquisa e assessoria conectados para responder a um problema real.",
      "Numerical engineering, software, safety, research and advisory work connected to address a real problem.",
    ],
  },
  research: {
    title: ["GEOMECÂNICA E POÇOS", "GEOMECHANICS AND WELLS"],
    description: [
      "Seção geológica com intervalo salino, poço revestido e campo de tensões, conectada ao modelo termomecânico e à análise.",
      "Geological cross-section with a salt interval, cased well and stress field, connected to a thermomechanical model and analysis.",
    ],
  },
  publication: {
    title: ["REGISTRO CIENTÍFICO", "SCIENTIFIC RECORD"],
    description: [
      "Formação salina, análise do leak-off test e documento da publicação de 2025: da investigação ao registro científico.",
      "Salt formation, leak-off test analysis and the 2025 publication document: from investigation to scientific record.",
    ],
  },
  software: {
    title: ["PRODUTOS DIGITAIS", "DIGITAL PRODUCTS"],
    description: [
      "Quatro ferramentas do ecossistema: MDFolio para documentos, AcadImprove para avaliação educacional, Sursum para cifras e Gabarita para leitura de folhas de resposta.",
      "Four ecosystem tools: MDFolio for documents, AcadImprove for educational assessment, Sursum for chord sheets and Gabarita for answer-sheet reading.",
    ],
  },
  cases: {
    title: ["EVIDÊNCIA E ENTREGA", "EVIDENCE AND DELIVERY"],
    description: [
      "Modelagem de poços e implementação de sistemas conectadas a método, validação e documentação dos cases.",
      "Well modelling and systems implementation connected to method, validation and case documentation.",
    ],
  },
  editorial: {
    title: ["CONHECIMENTO PUBLICADO", "PUBLISHED KNOWLEDGE"],
    description: [
      "Livro, código e nota técnica conectados: ideias, equações, exemplos e referências tornam o conhecimento consultável.",
      "A book, code and technical note connected: ideas, equations, examples and references make knowledge accessible.",
    ],
  },
  knowledge: {
    title: ["ECOSSISTEMA", "ECOSYSTEM"],
    description: [
      "Rede da ShieldWorks conectando pesquisa, métodos, software, publicações, segurança e decisão.",
      "The ShieldWorks network connects research, methods, software, publications, safety and decisions.",
    ],
  },
  trajectory: {
    title: ["TRAJETÓRIA MULTIDISCIPLINAR", "MULTIDISCIPLINARY BACKGROUND"],
    description: [
      "Ensino e pesquisa, engenharia e software, segurança: disciplinas conectadas na trajetória profissional.",
      "Teaching and research, engineering and software, safety: connected disciplines in a professional career.",
    ],
  },
  updates: {
    title: ["DISTRIBUIÇÃO ABERTA", "OPEN DISTRIBUTION"],
    description: [
      "Um conteúdo publicado se conecta, por RSS, ao leitor de atualizações. Não representa assinatura por e-mail.",
      "Published content connects to an updates reader through RSS. It does not represent email subscriptions.",
    ],
  },
  contact: {
    title: ["CONVERSA E ESCOPO", "CONVERSATION AND SCOPE"],
    description: [
      "Duas mensagens conectadas: o contexto apresentado orienta o escopo e os próximos passos de uma entrega.",
      "Two connected messages: the shared context guides scope and the next steps of delivery.",
    ],
  },
  numerical: {
    title: ["ENGENHARIA COMPUTACIONAL", "COMPUTATIONAL ENGINEERING"],
    description: [
      "Malha triangular com nós e condições de contorno, processamento em código e análise conceitual de resultados.",
      "Triangular mesh with nodes and boundary conditions, code processing and conceptual results analysis.",
    ],
  },
  safety: {
    title: ["BARREIRAS E INTEGRIDADE", "BARRIERS AND INTEGRITY"],
    description: [
      "Quatro barreiras redundantes no caminho entre um risco e a decisão, representando camadas de proteção.",
      "Four redundant barriers along the path between a risk and a decision, representing layers of protection.",
    ],
  },
};

/** Authored conceptual scenes: complete static artwork, optional viewport-aware motion. */
export function EngineeringScene({
  kind = "integrated",
  compact = false,
}: {
  kind?: SceneKind;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { locale } = useLocale();
  useEffect(() => {
    const node = ref.current;
    if (!node || !window.IntersectionObserver) return;
    node.dataset.motionReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      observer.disconnect();
      delete node.dataset.motionReady;
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const label = (pt: string, en: string) => (locale === "en" ? en : pt);
  const index = locale === "en" ? 1 : 0;
  const wide =
    compact &&
    [
      "approach",
      "solutions",
      "publication",
      "software",
      "cases",
      "editorial",
      "trajectory",
      "updates",
    ].includes(kind);
  return (
    <figure
      ref={ref}
      className={`engineering-plate plate-${kind}${wide ? " plate-compact" : ""}`}
      data-scene-kind={kind}
      data-playing={inView && !paused && !hidden}
    >
      <div className="plate-meta">
        <span>SW / {scenes[kind].title[index]}</span>
        <span>{label("ESTUDO CONCEITUAL", "CONCEPTUAL STUDY")}</span>
      </div>
      <svg
        viewBox={wide ? "0 0 900 320" : "0 0 900 560"}
        fill="none"
        role="img"
        aria-label={scenes[kind].description[index]}
      >
        <defs>
          <linearGradient id={`${id}-salt`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#6fae9b" stopOpacity=".42" />
            <stop offset="1" stopColor="#bdcdad" stopOpacity=".23" />
          </linearGradient>
        </defs>
        {wide ? (
          <CompactSceneArtwork kind={kind} label={label} id={id} />
        ) : (
          <SceneArtwork kind={kind} label={label} id={id} />
        )}
      </svg>
      <figcaption className="plate-caption">
        <span>
          {label(
            "Esquema conceitual, sem dados de simulação.",
            "Conceptual diagram, without simulation data.",
          )}
        </span>
        <button
          type="button"
          className="motion-control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused
            ? label("Retomar movimento", "Resume motion")
            : label("Pausar movimento", "Pause motion")}
        </button>
      </figcaption>
    </figure>
  );
}
