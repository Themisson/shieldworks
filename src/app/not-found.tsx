import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="section-shell max-w-2xl text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-base leading-7 text-graphite-600">
          O endereço acessado não existe ou foi removido. Verifique o link ou navegue para uma das páginas abaixo.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para o início
          </ButtonLink>
          <ButtonLink href="/contato" variant="secondary">
            Entrar em contato
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
