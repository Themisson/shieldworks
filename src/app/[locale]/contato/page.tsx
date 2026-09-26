import { pageMetadata } from "@/lib/page-metadata";
import { routeLocale } from "@/lib/route-locale";

import { Text } from "@/i18n/locale-provider";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/forms";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";

export default function ContatoPage() {
  const contactNotes = [
    "Soluções técnicas, sistemas, pesquisa aplicada e assessoria acadêmica.",
    "Demandas avaliadas com definição clara de escopo, contexto e próximos passos.",
    "Este site é uma iniciativa profissional pessoal e não representa página oficial de órgão público.",
  ];

  return (
    <section className="page-hero">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="section-shell relative py-14 sm:py-16 lg:py-20">
        <Reveal immediate>
          <SectionTitle
            title="Entre em contato"
            description="Envie sua mensagem para tratar de soluções técnicas, sistemas, pesquisa aplicada, assessoria acadêmica ou demandas institucionais. O contato será recebido pelo canal profissional da ShieldWorks."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          <aside className="space-y-4">
            <Reveal delay={60}>
              <div className="panel-muted p-6">
                <h2 className="text-base font-semibold tracking-tight text-graphite-900">
                  <Text>{"Áreas de atendimento"}</Text>
                </h2>
                <div className="mt-5 grid gap-3">
                  {contactNotes.map((note) => (
                    <div
                      key={note}
                      className="flex items-start gap-3 rounded-xl border border-graphite-100 bg-white px-4 py-3 text-sm leading-6 text-graphite-600"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-600"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span>
                        <Text>{note}</Text>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="panel p-6 text-sm leading-6 text-graphite-600">
                <h2 className="text-base font-semibold tracking-tight text-graphite-900">
                  <Text>{"Perfis profissionais"}</Text>
                </h2>
                <p className="mt-2 text-sm leading-6 text-graphite-600">
                  <Text>
                    {
                      "Consulte perfis acadêmicos e profissionais para identificação científica, produção técnica e repositórios."
                    }
                  </Text>
                </p>
                <div className="mt-5">
                  <ProfessionalLinks compact />
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="panel-accent p-5 text-sm leading-6 text-petroleum-900">
                <Text>
                  {
                    "Utilize o formulário para apresentar sua necessidade, projeto, dúvida técnica ou proposta de contato. Quanto mais clara for a descrição, melhor será a avaliação inicial da demanda."
                  }
                </Text>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await routeLocale(params);
  return pageMetadata(
    "/contato",
    locale === "en" ? "Contact" : "Contato",
    locale === "en"
      ? "Discuss engineering, research, software and technical advisory needs."
      : "Converse sobre demandas de engenharia, pesquisa, software e assessoria técnica.",
    locale,
  );
}
