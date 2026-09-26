import { Text } from "@/i18n/locale-provider";
import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  Cpu,
  FlaskConical,
  GraduationCap,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";

type ProfileHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const profileHighlights: ProfileHighlight[] = [
  {
    title: "Carreira institucional",
    description:
      "Oficial do Corpo de Bombeiros Militar de Alagoas, com experiência operacional, administrativa e acadêmica.",
    icon: ShieldCheck,
  },
  {
    title: "Formação em engenharia",
    description:
      "Engenheiro de petróleo, mestre e doutor na área de estruturas e geomecânica.",
    icon: GraduationCap,
  },
  {
    title: "Pesquisa aplicada",
    description:
      "Atuação em geomecânica salina, fluência de rochas evaporíticas, engenharia de poços e simulação numérica.",
    icon: FlaskConical,
  },
  {
    title: "Modelagem computacional",
    description:
      "Uso de C++, Python, ABAQUS, BEM, FEM, MPM e FVM em problemas técnicos de engenharia.",
    icon: Cpu,
  },
  {
    title: "Ensino e metodologia",
    description:
      "Instrutor de TCC e Metodologia Científica desde 2019, com acompanhamento de projetos, artigos, relatórios e bancas.",
    icon: BookOpenCheck,
  },
  {
    title: "Tecnologia institucional",
    description:
      "Desenvolvimento de sistemas, rotinas digitais, automação documental e apoio à gestão acadêmica.",
    icon: PanelsTopLeft,
  },
];

export function ProfileHighlights() {
  return (
    <article className="border-t border-graphite-100 bg-transparent py-6">
      <div>
        <p className="eyebrow">
          <Text>{"Competências"}</Text>
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-graphite-900">
          <Text>{"Síntese profissional"}</Text>
        </h2>
        <p className="mt-2 text-sm leading-6 text-graphite-600">
          <Text>
            {
              "Atuação integrada entre carreira institucional, engenharia, pesquisa aplicada, desenvolvimento computacional, docência e soluções digitais."
            }
          </Text>
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {profileHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="border-t border-graphite-100 py-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-petroleum-800 ring-1 ring-graphite-100 transition duration-300 group-hover:bg-petroleum-900 group-hover:text-white">
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-graphite-900">
                    <Text>{item.title}</Text>
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-graphite-600">
                    <Text>{item.description}</Text>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
