import { NextResponse } from "next/server";
import { validateFeedbackPayload, type FeedbackPayload } from "@/lib/form-validation";

const resendEndpoint = "https://api.resend.com/emails";
const feedbackSubject = "Novo feedback pelo site ShieldWorks";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatOptional(value?: string) {
  return value?.trim() ? value.trim() : "Não informado";
}

function buildFeedbackEmail(data: FeedbackPayload) {
  const fields = [
    ["Nota", String(data.rating)],
    ["Área de interesse", data.interest],
    ["Nome", formatOptional(data.name)],
    ["E-mail", formatOptional(data.email)],
    ["Comentário", formatOptional(data.comment)]
  ];

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0f172a;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#334155;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#334155;">
      <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${feedbackSubject}</h1>
      <p style="margin:0 0 20px;">Um novo feedback foi enviado pelo site ShieldWorks.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        ${htmlRows}
      </table>
    </div>`;

  return { text, html };
}

async function sendFeedbackEmail(data: FeedbackPayload) {
  const { text, html } = buildFeedbackEmail(data);
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error("Feedback form: missing environment variables");
    return { ok: false };
  }

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: contactToEmail,
      subject: feedbackSubject,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
    console.error("Feedback form: resend error", { status: response.status, message: errorBody?.message });
    return { ok: false };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = validateFeedbackPayload(payload);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  if (!result.data) {
    return NextResponse.json({ ok: false, message: "Dados inválidos." }, { status: 400 });
  }

  try {
    await sendFeedbackEmail(result.data);
  } catch (error) {
    console.error("Feedback form: unexpected error", error);
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Feedback registrado com sucesso. Obrigado pela contribuição."
    },
    { status: 202 }
  );
}
