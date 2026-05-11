import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "@/components/forms";
import { ProfessionalLinks } from "@/components/ProfessionalLinks";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato profissional para demandas técnicas, acadêmicas, institucionais e digitais."
};

export default function ContatoPage() {
  const contactNotes = [
    "Soluções técnicas, sistemas, pesquisa aplicada e assessoria acadêmica.",
    "Demandas avaliadas com definição clara de escopo, contexto e próximos passos.",
    "Este site é uma iniciativa profissional pessoal e não representa página oficial de órgão público."
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Contato"
          title="Entre em contato"
          description="Envie uma mensagem para tratar de soluções técnicas, sistemas, pesquisa aplicada, assessoria acadêmica ou demandas institucionais."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-base font-semibold tracking-tight text-slate-950">Áreas de atendimento</h2>
              <div className="mt-5 grid gap-3">
                {contactNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-petroleum-700" aria-hidden="true" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-sm leading-6 text-graphite-600 shadow-sm">
              <h2 className="text-base font-semibold tracking-tight text-slate-950">Perfis profissionais</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Consulte perfis acadêmicos e profissionais para identificação científica, produção técnica e repositórios.
              </p>
              <div className="mt-5">
                <ProfessionalLinks compact />
              </div>
            </div>
            <div className="rounded-2xl border border-petroleum-100 bg-petroleum-50 p-5 text-sm leading-6 text-petroleum-900 shadow-sm">
              Envie sua mensagem. O contato será recebido pelo canal profissional da ShieldWorks.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
