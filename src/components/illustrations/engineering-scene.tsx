import type { Locale } from "@/i18n/translations";
import { SceneArtwork, sceneFormat, type SceneKind } from "./scene-artwork";
import { SceneFrame } from "./scene-frame";

export type { SceneKind } from "./scene-artwork";

type Pair = [string, string];

const scenes: Record<
  SceneKind,
  { title: Pair; description: Pair; legend: (Pair | string)[] }
> = {
  integrated: {
    title: ["CONVERGÊNCIA", "CONVERGENCE"],
    description: [
      "Seção geológica com intervalo salino e poço revestido, ampliada em uma malha refinada junto à parede do poço e conectada a análise e integridade: modelo físico, método numérico e decisão.",
      "Geological cross-section with a salt interval and a cased well, enlarged into a mesh refined near the wellbore and connected to analysis and integrity: physical model, numerical method and decision.",
    ],
    legend: [
      ["Modelo físico", "Physical model"],
      ["Método numérico", "Numerical method"],
      ["Decisão", "Decision"],
    ],
  },
  approach: {
    title: ["DO CONTEXTO À ENTREGA", "FROM CONTEXT TO DELIVERY"],
    description: [
      "Quatro etapas conectadas: compreender o contexto, investigar hipóteses, desenvolver modelos e documentar a entrega.",
      "Four connected stages: understand the context, investigate hypotheses, develop models and document delivery.",
    ],
    legend: [
      ["Contexto", "Context"],
      ["Hipótese", "Hypothesis"],
      ["Modelo", "Model"],
      ["Entrega", "Delivery"],
    ],
  },
  solutions: {
    title: ["CAPACIDADES CONECTADAS", "CONNECTED CAPABILITIES"],
    description: [
      "Cinco frentes convergindo para um problema real: engenharia computacional, pesquisa aplicada, sistemas institucionais, segurança operacional e assessoria acadêmica.",
      "Five disciplines converging on a real problem: computational engineering, applied research, institutional systems, operational safety and academic advisory.",
    ],
    legend: [
      ["Engenharia computacional", "Computational engineering"],
      ["Pesquisa aplicada", "Applied research"],
      ["Sistemas institucionais", "Institutional systems"],
      ["Segurança operacional", "Operational safety"],
      ["Assessoria acadêmica", "Academic advisory"],
    ],
  },
  research: {
    title: ["GEOMECÂNICA E POÇOS", "GEOMECHANICS AND WELLS"],
    description: [
      "Seção geológica com intervalo salino e campo de tensões ao redor de um poço revestido, detalhada em uma malha numérica refinada junto à parede do poço.",
      "Geological cross-section with a salt interval and a stress field around a cased well, detailed in a numerical mesh refined near the wellbore.",
    ],
    legend: [
      ["Intervalo salino", "Salt interval"],
      ["Malha numérica", "Numerical mesh"],
      ["Poço revestido", "Cased well"],
    ],
  },
  publication: {
    title: ["REGISTRO CIENTÍFICO", "SCIENTIFIC RECORD"],
    description: [
      "Formação salina com poço, forma conceitual de uma curva de leak-off test e documento da publicação: da investigação ao registro científico.",
      "Salt formation with a well, the conceptual shape of a leak-off test curve and the publication document: from investigation to scientific record.",
    ],
    legend: [
      ["Formação salina", "Salt formation"],
      "Leak-off test",
      ["Publicação", "Publication"],
    ],
  },
  software: {
    title: ["PRODUTOS DIGITAIS", "DIGITAL PRODUCTS"],
    description: [
      "Quatro ferramentas do ecossistema: MDFolio para documentos, AcadImprove para avaliação educacional, Sursum para cifras e Gabarita para leitura de folhas de resposta.",
      "Four ecosystem tools: MDFolio for documents, AcadImprove for educational assessment, Sursum for chord sheets and Gabarita for answer-sheet reading.",
    ],
    legend: ["MDFolio", "AcadImprove", "Sursum", "Gabarita"],
  },
  cases: {
    title: ["EVIDÊNCIA E ENTREGA", "EVIDENCE AND DELIVERY"],
    description: [
      "Dois cases: corte de um poço com revestimentos e anular confinado em evaporitos, e um sistema de gestão acadêmica com módulos e verificações.",
      "Two case studies: a well section with casings and a trapped annulus in evaporites, and an academic management system with modules and checks.",
    ],
    legend: [
      ["Poço e anulares", "Well and annuli"],
      ["Sistema acadêmico", "Academic system"],
    ],
  },
  editorial: {
    title: ["CONHECIMENTO PUBLICADO", "PUBLISHED KNOWLEDGE"],
    description: [
      "Livro, exemplo em código e nota técnica com referências: ideias organizadas para consulta.",
      "A book, a code example and a technical note with references: ideas organised for consultation.",
    ],
    legend: [
      ["Ideias", "Ideas"],
      ["Exemplos", "Examples"],
      ["Referências", "References"],
    ],
  },
  knowledge: {
    title: ["ECOSSISTEMA", "ECOSYSTEM"],
    description: [
      "Rede da ShieldWorks conectando pesquisa, métodos, software, publicações, segurança e decisão.",
      "The ShieldWorks network connects research, methods, software, publications, safety and decisions.",
    ],
    legend: [
      ["Pesquisa", "Research"],
      ["Métodos", "Methods"],
      "Software",
      ["Publicações", "Publications"],
      ["Segurança", "Safety"],
      ["Decisão", "Decision"],
    ],
  },
  trajectory: {
    title: ["TRAJETÓRIA MULTIDISCIPLINAR", "MULTIDISCIPLINARY BACKGROUND"],
    description: [
      "Trajetória ascendente que conecta engenharia e pesquisa, software e automação, ensino e metodologia.",
      "A rising path connecting engineering and research, software and automation, teaching and methodology.",
    ],
    legend: [
      ["Engenharia e pesquisa", "Engineering and research"],
      ["Software e automação", "Software and automation"],
      ["Ensino e metodologia", "Teaching and methodology"],
    ],
  },
  updates: {
    title: ["DISTRIBUIÇÃO ABERTA", "OPEN DISTRIBUTION"],
    description: [
      "Um conteúdo publicado se conecta, por RSS, ao leitor de atualizações. Não representa assinatura por e-mail.",
      "Published content connects to an updates reader through RSS. It does not represent email subscriptions.",
    ],
    legend: [["Publicar", "Publish"], "RSS", ["Seu leitor", "Your reader"]],
  },
  contact: {
    title: ["CONVERSA E ESCOPO", "CONVERSATION AND SCOPE"],
    description: [
      "Uma mensagem com o contexto recebe uma resposta com o escopo verificado e um caminho até a entrega.",
      "A message with the context receives a reply with a checked scope and a path towards delivery.",
    ],
    legend: [
      ["Seu contexto", "Your context"],
      ["Escopo", "Scope"],
      ["Próximos passos", "Next steps"],
    ],
  },
  numerical: {
    title: ["ENGENHARIA COMPUTACIONAL", "COMPUTATIONAL ENGINEERING"],
    description: [
      "Malha triangular refinada com cargas e apoios, processamento em código e comparação conceitual de resultados.",
      "Refined triangular mesh with loads and supports, code processing and a conceptual comparison of results.",
    ],
    legend: [
      ["Discretizar", "Discretize"],
      ["Resolver", "Solve"],
      ["Validar", "Validate"],
    ],
  },  aboutConvergence: {
    title: ["CONVERGÊNCIA", "CONVERGENCE"],
    description: [
      "Quatro frentes convergem para a ShieldWorks: malha discretizada com cargas e apoios, formação salina com poço e curva conceitual de fluência, código e dados, e barreiras entre um risco e a decisão.",
      "Four fronts converge on ShieldWorks: a discretized mesh with loads and supports, a salt formation with a well and a conceptual creep curve, code and data, and barriers between a hazard and the decision.",
    ],
    legend: [
      ["Engenharia", "Engineering"],
      ["Pesquisa", "Research"],
      ["Tecnologia", "Technology"],
      ["Segurança", "Safety"],
    ],
  },
  aboutAreas: {
    title: ["QUATRO EIXOS", "FOUR AXES"],
    description: [
      "Rede com quatro eixos partindo da ShieldWorks: engenharia, pesquisa, tecnologia e segurança, cada um com três ramificações.",
      "A network of four axes leaving ShieldWorks: engineering, research, technology and safety, each with three branches.",
    ],
    legend: [
      ["Engenharia", "Engineering"],
      ["Pesquisa", "Research"],
      ["Tecnologia", "Technology"],
      ["Segurança", "Safety"],
    ],
  },
  researchProcess: {
    title: ["DO PROBLEMA À PUBLICAÇÃO", "FROM PROBLEM TO PUBLICATION"],
    description: [
      "Pesquisa aplicada em seis etapas conectadas: problema físico, modelagem, discretização, simulação, validação e publicação.",
      "Applied research in six connected stages: physical problem, modelling, discretization, simulation, validation and publication.",
    ],
    legend: [
      ["Problema físico", "Physical problem"],
      ["Modelagem", "Modelling"],
      ["Discretização", "Discretization"],
      ["Simulação", "Simulation"],
      ["Validação", "Validation"],
      ["Publicação", "Publication"],
    ],
  },
  career: {
    title: ["MAPA DE CONHECIMENTO", "KNOWLEDGE MAP"],
    description: [
      "Mapa com quatro linhas — operação e segurança, engenharia e pesquisa, computação e sistemas, ensino — cujas oito estações convergem para a ShieldWorks. A posição nas linhas não representa datas.",
      "A map with four lines — operations and safety, engineering and research, computing and systems, teaching — whose eight stations converge on ShieldWorks. Position along the lines does not represent dates.",
    ],
    legend: [
      ["Carreira institucional", "Institutional career"],
      ["Segurança operacional", "Operational safety"],
      ["Engenharia de petróleo", "Petroleum engineering"],
      ["Mestrado e doutorado", "Master's and doctorate"],
      ["Geomecânica salina e poços", "Salt geomechanics and wells"],
      ["Computação científica", "Scientific computing"],
      ["Sistemas e produtos digitais", "Systems and digital products"],
      ["Ensino e metodologia", "Teaching and methodology"],
      "ShieldWorks",
    ],
  },
};

/**
 * Authored conceptual scenes, rendered on the server. Numbers in the drawing match
 * the legend or, with `legend={false}`, the numbered copy of the surrounding section.
 */
export function EngineeringScene({
  kind = "integrated",
  locale,
  legend = true,
}: {
  kind?: SceneKind;
  locale: Locale;
  legend?: boolean;
}) {
  const t = (value: Pair | string) =>
    typeof value === "string" ? value : value[locale === "en" ? 1 : 0];
  const scene = scenes[kind];
  const { variant, viewBox, narrowViewBox } = sceneFormat[kind];
  return (
    <SceneFrame
      kind={kind}
      variant={variant}
      steps={scene.legend.length}
      note={`SW / ${t(scene.title)} · ${t(["Esquema conceitual, sem dados de simulação.", "Conceptual diagram, without simulation data."])}`}
      pause={t(["Pausar movimento", "Pause motion"])}
      resume={t(["Retomar movimento", "Resume motion"])}
      legend={
        legend && (
          <ol className="scene-legend" data-count={scene.legend.length}>
            {scene.legend.map((item, i) => (
              <li key={i} data-focus={i + 1}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t(item)}
              </li>
            ))}
          </ol>
        )
      }
    >
      {[false, ...(narrowViewBox ? [true] : [])].map((narrow) => (
        // A narrow layout replaces the wide one on small screens; CSS shows one.
        <svg
          key={String(narrow)}
          className={
            narrowViewBox ? (narrow ? "scene-narrow" : "scene-wide") : undefined
          }
          viewBox={narrow ? narrowViewBox : viewBox}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          preserveAspectRatio={
            variant === "compact" || variant === "wide"
              ? "xMinYMid meet"
              : "xMidYMid meet"
          }
          role="img"
          aria-label={t(scene.description)}
        >
          <SceneArtwork kind={kind} narrow={narrow} />
        </svg>
      ))}
    </SceneFrame>
  );
}
