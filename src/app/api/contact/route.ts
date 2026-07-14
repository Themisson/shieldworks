import { NextResponse } from "next/server";
import { enforceRateLimit, honeypotAcceptedResponse, readJsonBody } from "@/lib/api-request";
import { formatOptional, sendTransactionalEmail } from "@/lib/email";
import { validateContactPayload } from "@/lib/form-validation";

const contactSubject = "Novo contato pelo site ShieldWorks";
const invalidContactMessage = "Preencha os campos obrigatórios: nome, e-mail, área de interesse e mensagem.";
const successMessage = "Mensagem enviada com sucesso. Obrigado pelo contato.";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "contact");
  if (limited) {
    return limited;
  }

  const { payload, error: bodyError } = await readJsonBody(request);
  if (bodyError) {
    return bodyError;
  }

  const result = validateContactPayload(payload);

  if (result.error === "honeypot") {
    return honeypotAcceptedResponse(successMessage);
  }

  if (result.error || !result.data) {
    return NextResponse.json(
      { ok: false, message: result.error && result.error !== "honeypot" ? result.error : invalidContactMessage },
      { status: 400 }
    );
  }

  try {
    const emailResult = await sendTransactionalEmail({
      subject: contactSubject,
      intro: "Uma nova mensagem foi enviada pelo formulário de contato do site ShieldWorks.",
      replyTo: result.data.email,
      fields: [
        ["Nome", result.data.name],
        ["E-mail", result.data.email],
        ["Telefone/WhatsApp", formatOptional(result.data.phone)],
        ["Instituição", formatOptional(result.data.institution)],
        ["Área de interesse", result.data.interest],
        ["Mensagem", result.data.message]
      ]
    });

    return NextResponse.json(
      {
        ok: emailResult.ok,
        message: emailResult.ok ? successMessage : emailResult.message
      },
      { status: emailResult.status }
    );
  } catch (error) {
    console.error("Contact form: unexpected error", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível enviar a mensagem no momento. Tente novamente mais tarde."
      },
      { status: 502 }
    );
  }
}
