import { NextResponse } from "next/server";
import { enforceRateLimit, honeypotAcceptedResponse, readJsonBody } from "@/lib/api-request";
import { formatOptional, sendTransactionalEmail } from "@/lib/email";
import { validateFeedbackPayload } from "@/lib/form-validation";

const feedbackSubject = "Novo feedback pelo site ShieldWorks";
const successMessage = "Feedback registrado com sucesso. Obrigado pela contribuição.";

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "feedback");
  if (limited) {
    return limited;
  }

  const { payload, error: bodyError } = await readJsonBody(request);
  if (bodyError) {
    return bodyError;
  }

  const result = validateFeedbackPayload(payload);

  if (result.error === "honeypot") {
    return honeypotAcceptedResponse(successMessage);
  }

  if (result.error || !result.data) {
    return NextResponse.json(
      { ok: false, message: result.error ?? "Dados inválidos." },
      { status: 400 }
    );
  }

  try {
    const emailResult = await sendTransactionalEmail({
      subject: feedbackSubject,
      intro: "Um novo feedback foi enviado pelo site ShieldWorks.",
      replyTo: result.data.email || undefined,
      fields: [
        ["Nota", String(result.data.rating)],
        ["Área de interesse", result.data.interest],
        ["Nome", formatOptional(result.data.name)],
        ["E-mail", formatOptional(result.data.email)],
        ["Comentário", formatOptional(result.data.comment)]
      ]
    });

    if (!emailResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: emailResult.message
        },
        { status: emailResult.status }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: successMessage
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("Feedback form: unexpected error", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Não foi possível registrar o feedback no momento. Tente novamente mais tarde."
      },
      { status: 502 }
    );
  }
}
