import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/forms";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato profissional para demandas técnicas, acadêmicas, institucionais e digitais.",
  alternates: {
    canonical: canonicalUrl("/contato")
  },
  openGraph: {
    title: "Contato | ShieldWorks",
    description: "Contato profissional para demandas técnicas, acadêmicas, institucionais e digitais.",
    url: canonicalUrl("/contato"),
    siteName: "ShieldWorks",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShieldWorks - Engenharia, Pesquisa, Segurança e Tecnologia Aplicada"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | ShieldWorks",
    description: "Contato profissional para demandas técnicas, acadêmicas, institucionais e digitais.",
    images: ["/og-image.png"]
  }
};

export default function ContatoPage() {
  const contactNotes = [
    "Soluções técnicas, sistemas, pesquisa aplicada e assessoria acadêmica.",
    "Demandas avaliadas com definição clara de escopo, contexto e próximos passos.",
    "Este site é uma iniciativa profissional pessoal e não representa página oficial de órgão público."
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
                <h2 className="text-base font-semibold tracking-tight text-graphite-900">Áreas de atendimento</h2>
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
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="panel p-6 text-sm leading-6 text-graphite-600">
                <h2 className="text-base font-semibold tracking-tight text-graphite-900">Perfis profissionais</h2>
                <p className="mt-2 text-sm leading-6 text-graphite-600">
                  Consulte perfis acadêmicos e profissionais para identificação científica, produção técnica e
                  repositórios.
                </p>
                <div className="mt-5">
                  <ProfessionalLinks compact />
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="panel-accent p-5 text-sm leading-6 text-petroleum-900">
                Utilize o formulário para apresentar sua necessidade, projeto, dúvida técnica ou proposta de contato.
                Quanto mais clara for a descrição, melhor será a avaliação inicial da demanda.
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
