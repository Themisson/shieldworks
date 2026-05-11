import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Soluções",
  description: "Soluções em engenharia computacional, sistemas institucionais, segurança operacional e assessoria acadêmica."
};

const solutionBlocks = [
  {
    title: "Engenharia Computacional",
    items: ["Modelagem numérica", "Simulacoes em C++ e Python", "Análise de tensoes e deformacoes", "Geomecânica aplicada", "Automação de cálculos técnicos", "Validacao de modelos numéricos"]
  },
  {
    title: "Sistemas Institucionais",
    items: ["Gestão acadêmica", "Emissão de certificados", "Controle de cursos e turmas", "Gestão de instrutores", "Formulários e avaliações", "Dashboards administrativos", "Geração automática de documentos"]
  },
  {
    title: "Segurança Operacional e Gestão de Riscos",
    items: ["Diagnóstico de risco", "Prevenção", "Resposta operacional", "Uso de tecnologia em emergências", "Drones e monitoramento", "Capacitações em segurança"]
  },
  {
    title: "Assessoria Acadêmica e Científica",
    items: ["Projetos de pesquisa", "TCC", "Artigos científicos", "Relatórios técnicos", "Metodologia", "Normalização", "Análise de dados", "Preparação para bancas"]
  },
  {
    title: "Capacitação Técnica",
    items: ["Metodologia científica", "PCC e TCC", "Segurança operacional", "Primeiros socorros/RCP", "Python para engenharia", "C++ para simulação numérica", "Métodos numéricos aplicados", "Geomecânica aplicada"]
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
            <article key={block.title} className="rounded-lg border border-graphite-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-graphite-900">{block.title}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li key={item} className="rounded-md bg-graphite-50 px-4 py-3 text-sm text-graphite-700">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
