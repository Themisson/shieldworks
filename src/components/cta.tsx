"use client";

import { Text } from "@/i18n/locale-provider";

import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { trackEvent } from "@/lib/analytics";

type CTAProps = {
  title?: string;
  description?: string;
  action?: string;
};

export function CTA({
  title = "Tem uma demanda técnica, acadêmica ou institucional que precisa se transformar em uma solução prática?",
  description = "A ShieldWorks foi estruturada para organizar demandas complexas em projetos objetivos, aplicáveis e bem documentados.",
  action = "Vamos conversar"
}: CTAProps) {
  return (
    <section className="relative overflow-hidden border-t border-petroleum-800 bg-petroleum-950 py-16 text-white sm:py-20">

      <div className="section-shell relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2rem] lg:leading-tight">
            <Text>{title}</Text>
          </h2>
          <p className="mt-4 max-w-[55ch] text-sm leading-7 text-petroleum-100/90 sm:text-base">
            <Text>{description}</Text>
          </p>
        </div>
        <div className="shrink-0" onClick={() => trackEvent("cta_contact_click", { source: "cta_section" })}>
          <ButtonLink href="/contato" variant="inverse" className="w-full sm:w-auto">
            <Text>{action}</Text>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
