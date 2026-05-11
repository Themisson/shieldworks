import { Send } from "lucide-react";
import { interestOptions } from "@/data/site";

export function ContactForm() {
  return (
    <form className="rounded-lg border border-graphite-100 bg-white p-6 shadow-sm" aria-label="Formulario de contato">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="name">Nome</label>
          <input className="field mt-2" id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="email">E-mail</label>
          <input className="field mt-2" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">Telefone/WhatsApp</label>
          <input className="field mt-2" id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="institution">Instituicao, se houver</label>
          <input className="field mt-2" id="institution" name="institution" type="text" />
        </div>
        <div>
          <label className="label" htmlFor="interest">Area de interesse</label>
          <select className="field mt-2" id="interest" name="interest" defaultValue="">
            <option value="" disabled>Selecione uma area</option>
            {interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="message">Mensagem</label>
          <textarea className="field mt-2 min-h-36" id="message" name="message" required />
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-graphite-500">
        Formulario preparado para integracao futura com API, e-mail, banco de dados ou plataforma externa.
      </p>
      <button className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-petroleum-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-petroleum-900" type="submit">
        <Send className="h-4 w-4" aria-hidden="true" />
        Enviar mensagem
      </button>
    </form>
  );
}

export function FeedbackForm() {
  return (
    <form className="rounded-lg border border-graphite-100 bg-graphite-50 p-6" aria-label="Formulario de opiniao">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="feedback-name">Nome opcional</label>
          <input className="field mt-2" id="feedback-name" name="feedback-name" type="text" />
        </div>
        <div>
          <label className="label" htmlFor="feedback-email">E-mail opcional</label>
          <input className="field mt-2" id="feedback-email" name="feedback-email" type="email" />
        </div>
        <div>
          <label className="label" htmlFor="rating">Nota de 1 a 5</label>
          <select className="field mt-2" id="rating" name="rating" defaultValue="5">
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="feedback-interest">Area de interesse</label>
          <select className="field mt-2" id="feedback-interest" name="feedback-interest" defaultValue="">
            <option value="" disabled>Selecione uma area</option>
            {interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="comment">Comentario</label>
          <textarea className="field mt-2 min-h-28" id="comment" name="comment" />
        </div>
      </div>
      <button className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-petroleum-700 px-5 py-2.5 text-sm font-semibold text-petroleum-900 transition hover:bg-petroleum-50" type="submit">
        Registrar feedback
      </button>
    </form>
  );
}
