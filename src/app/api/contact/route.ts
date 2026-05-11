import { NextResponse } from "next/server";
import type { ContactPayload } from "@/lib/form-validation";
import { validateContactPayload } from "@/lib/form-validation";

const resendEndpoint = "https://api.resend.com/emails";
const contactSubject = "Novo contato pelo site ShieldWorks";

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

function buildContactEmail(data: ContactPayload) {
  const fields = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["Telefone/WhatsApp", formatOptional(data.phone)],
    ["Instituição", formatOptional(data.institution)],
    ["Área de interesse", data.interest],
    ["Mensagem", data.message]
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
      <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${contactSubject}</h1>
      <p style="margin:0 0 20px;">Uma nova mensagem foi enviada pelo formulário de contato do site ShieldWorks.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        ${htmlRows}
      </table>
    </div>`;

  return { text, html };
}

async function sendContactEmail(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error("Envio de e-mail não configurado. Defina RESEND_API_KEY, CONTACT_TO_EMAIL e CONTACT_FROM_EMAIL.");
  }

  const { text, html } = buildContactEmail(data);
  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: contactSubject,
      reply_to: data.email,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
    throw new Error(errorBody?.message || errorBody?.error || "Não foi possível enviar o e-mail de contato.");
  }
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = validateContactPayload(payload);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  if (!result.data) {
    return NextResponse.json({ ok: false, message: "Dados inválidos." }, { status: 400 });
  }

  try {
    await sendContactEmail(result.data);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Não foi possível enviar a mensagem."
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Mensagem enviada com sucesso. Obrigado pelo contato."
    },
    { status: 200 }
  );
}
