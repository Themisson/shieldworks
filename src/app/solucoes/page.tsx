import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Solucoes",
  description: "Solucoes em engenharia computacional, sistemas institucionais, seguranca operacional e assessoria academica."
};

const solutionBlocks = [
  {
    title: "Engenharia Computacional",
    items: ["Modelagem numerica", "Simulacoes em C++ e Python", "Analise de tensoes e deformacoes", "Geomecanica aplicada", "Automacao de calculos tecnicos", "Validacao de modelos numericos"]
  },
  {
    title: "Sistemas Institucionais",
    items: ["Gestao academica", "Emissao de certificados", "Controle de cursos e turmas", "Gestao de instrutores", "Formularios e avaliacoes", "Dashboards administrativos", "Geracao automatica de documentos"]
  },
  {
    title: "Seguranca Operacional e Gestao de Riscos",
    items: ["Diagnostico de risco", "Prevencao", "Resposta operacional", "Uso de tecnologia em emergencias", "Drones e monitoramento", "Capacitacoes em seguranca"]
  },
  {
    title: "Assessoria Academica e Cientifica",
    items: ["Projetos de pesquisa", "TCC", "Artigos cientificos", "Relatorios tecnicos", "Metodologia", "Normalizacao", "Analise de dados", "Preparacao para bancas"]
  },
  {
    title: "Capacitacao Tecnica",
    items: ["Metodologia cientifica", "PCC e TCC", "Seguranca operacional", "Primeiros socorros/RCP", "Python para engenharia", "C++ para simulacao numerica", "Metodos numericos aplicados", "Geomecanica aplicada"]
  }
];

export default function SolucoesPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Solucoes"
          title="Servicos estruturados para demandas tecnicas, digitais e academicas."
          description="Cada frente pode ser tratada como consultoria, projeto tecnico, demonstracao, prototipo, documento tecnico ou sistema evolutivo."
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
