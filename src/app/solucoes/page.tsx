import type { Metadata } from "next";
import { ListCard } from "@/components/card";
import { SectionTitle } from "@/components/section-title";
import { serviceIcons } from "@/data/site";

export const metadata: Metadata = {
  title: "Soluções",
  description: "Soluções em engenharia computacional, sistemas institucionais, segurança operacional e assessoria acadêmica."
};

const solutionBlocks = [
  {
    title: "Engenharia Computacional",
    description:
      "Modelagem numérica computacional aplicada à engenharia, com uso de C++, Python, ABAQUS e métodos numéricos para análise de tensões, deformações, comportamento geomecânico, validação de modelos e apoio à tomada de decisão técnica.",
    items: [
      "Modelagem numérica computacional",
      "Modelos numéricos em ABAQUS",
      "Simulações em C++ e Python",
      "Scripts de pré e pós-processamento",
      "Análise de tensões e deformações",
      "Simulações geomecânicas e estruturais",
      "Validação de resultados numéricos",
      "Comparação entre simulação e soluções analíticas",
      "Relatórios técnicos de modelagem computacional"
    ],
    icon: serviceIcons.computationalEngineering
  },
  {
    title: "Sistemas Institucionais",
    description:
      "Plataformas para rotinas acadêmicas, documentos, indicadores administrativos e organização de dados institucionais.",
    items: ["Gestão acadêmica", "Emissão de certificados", "Controle de cursos e turmas", "Gestão de instrutores", "Formulários e avaliações", "Dashboards administrativos", "Geração automática de documentos"],
    icon: serviceIcons.institutionalSystems
  },
  {
    title: "Segurança Operacional e Gestão de Riscos",
    description:
      "Apoio técnico à prevenção, análise de riscos, monitoramento e resposta operacional com uso de tecnologia aplicada.",
    items: ["Diagnóstico de risco", "Prevenção", "Resposta operacional", "Uso de tecnologia em emergências", "Drones e monitoramento", "Capacitações em segurança"],
    icon: serviceIcons.operationalSafety
  },
  {
    title: "Assessoria Acadêmica e Científica",
    description:
      "Acompanhamento consultivo para estruturação, revisão técnica, metodologia, normalização e apresentação de trabalhos.",
    items: ["Projetos de pesquisa", "TCC", "Artigos científicos", "Relatórios técnicos", "Metodologia", "Normalização", "Análise de dados", "Preparação para bancas"],
    icon: serviceIcons.academicAdvisory
  },
  {
    title: "Capacitação Técnica",
    description:
      "Frente futura para cursos e treinamentos técnicos em metodologia, segurança, programação e simulação numérica.",
    items: ["Metodologia científica", "TCC e trabalhos técnicos", "Segurança operacional", "Primeiros socorros/RCP", "Python para engenharia", "C++ para simulação numérica", "Métodos numéricos aplicados", "Geomecânica aplicada"],
    icon: serviceIcons.technicalTraining
  }
];

export default function SolucoesPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Soluções"
          title="Serviços estruturados para demandas técnicas, digitais e acadêmicas."
          description="Cada frente pode ser tratada como consultoria, projeto técnico, demonstração, protótipo, documento técnico ou sistema evolutivo."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {solutionBlocks.map((block) => (
            <ListCard key={block.title} {...block} />
          ))}
        </div>
      </div>
    </section>
  );
}
