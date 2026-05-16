import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-petroleum-700">Erro 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-graphite-900 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-graphite-600">
          O endereço acessado não existe ou foi removido. Verifique o link ou navegue para uma das páginas abaixo.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-petroleum-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-petroleum-700 focus:outline-none focus:ring-2 focus:ring-petroleum-300 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para o início
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-graphite-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-petroleum-300 focus:ring-offset-2"
          >
            Entrar em contato
          </Link>
        </div>
      </div>
    </section>
  );
}
