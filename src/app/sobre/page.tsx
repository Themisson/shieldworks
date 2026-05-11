import type { Metadata } from "next";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { SectionTitle } from "@/components/section-title";
import { Badge } from "@/components/badge";

export const metadata: Metadata = {
  title: "Sobre | ShieldWorks",
  description:
    "Trajetória profissional e acadêmica de Themisson dos Santos Vasconcelos, com atuação em engenharia computacional, geomecânica, segurança operacional, pesquisa aplicada e sistemas institucionais."
};

const highlights = [
  "Oficial do Corpo de Bombeiros Militar de Alagoas",
  "Formação em Engenharia de Petróleo",
  "Mestrado e doutorado na área de estruturas e geomecânica",
  "Pesquisa em geomecânica salina e fluência de rochas evaporíticas",
  "Experiência com simulação numérica, ABAQUS e métodos computacionais",
  "Desenvolvimento em C++ e Python",
  "Atuação docente, acadêmica e em gestão acadêmica",
  "Instrutor de TCC e Metodologia Científica desde 2019",
  "Participação em bancas e acompanhamento de trabalhos acadêmicos",
  "Desenvolvimento de sistemas institucionais e rotinas digitais"
];

export default function SobrePage() {
  return (
    <section className="bg-white py-18">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Sobre"
          title="Themisson dos Santos Vasconcelos"
          description="Perfil técnico-profissional orientado por engenharia, pesquisa aplicada, segurança operacional, desenvolvimento computacional e ensino."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-graphite-100 bg-graphite-50 p-6">
            <p className="text-sm leading-7 text-graphite-700">
              Themisson dos Santos Vasconcelos e Tenente-Coronel do Corpo de Bombeiros Militar de Alagoas,
              engenheiro de petróleo, mestre e doutor na área de estruturas e geomecânica. Sua trajetória integra
              segurança operacional, pesquisa aplicada, engenharia computacional, gestão acadêmica e desenvolvimento
              de soluções digitais.
            </p>
            <p className="mt-5 text-sm leading-7 text-graphite-700">
              Sua atuação técnica envolve modelagem numérica computacional, geomecânica aplicada, simulação de
              problemas estruturais e geomecânicos, desenvolvimento de códigos próprios em C++ e Python e utilização
              de ferramentas consolidadas de análise, incluindo o ABAQUS, para estudos envolvendo tensões,
              deformações, comportamento de materiais e validação de modelos numéricos.
            </p>
            <div className="mt-6">
              <ProfessionalLinks />
            </div>
            <p className="mt-6 text-sm leading-7 text-graphite-700">
              A apresentação neste site tem caráter profissional pessoal. Ela não configura promoção institucional
              nem declara que eventuais sistemas, demonstrações ou projetos digitais sejam produtos oficiais do CBMAL
              ou de qualquer órgão público.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Pesquisa e engenharia</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Atuação em geomecânica salina, simulação numérica, engenharia de poços, ABAQUS, métodos computacionais
              e análise técnica de problemas complexos.
            </p>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Tecnologia aplicada</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Desenvolvimento de soluções em C++ e Python, sistemas web, automação documental, indicadores e apoio à
              gestão institucional.
            </p>
          </article>
          <article className="rounded-lg border border-graphite-100 p-6">
            <h2 className="text-lg font-semibold text-graphite-900">Ensino e metodologia</h2>
            <p className="mt-3 text-sm leading-6 text-graphite-600">
              Desde 2019, atua como instrutor de TCC e Metodologia Científica nos cursos do Corpo de Bombeiros
              Militar de Alagoas, contribuindo para a formação acadêmica e técnico-profissional por meio do
              acompanhamento de projetos, trabalhos de conclusão de curso, artigos científicos, relatórios técnicos e
              preparação para bancas.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
