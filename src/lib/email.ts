export type EmailField = [label: string, value: string];

export type SendEmailInput = {
  subject: string;
  intro: string;
  fields: EmailField[];
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; status: 200; message: string }
  | { ok: false; status: number; message: string };

const resendEndpoint = "https://api.resend.com/emails";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatOptional(value?: string) {
  return value?.trim() ? value.trim() : "Não informado";
}

export function buildEmailBodies(subject: string, intro: string, fields: EmailField[]) {
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
      <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${escapeHtml(subject)}</h1>
      <p style="margin:0 0 20px;">${escapeHtml(intro)}</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        ${htmlRows}
      </table>
    </div>`;

  return { text, html };
}

export async function sendTransactionalEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error("Email: missing environment variables");
    return {
      ok: false,
      status: 500,
      message: "O envio de mensagens ainda não está configurado corretamente."
    };
  }

  const { text, html } = buildEmailBodies(input.subject, input.intro, input.fields);

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: contactToEmail,
      subject: input.subject,
      reply_to: input.replyTo,
      text,
      html
    })
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;
    console.error("Email: resend error", {
      status: response.status,
      message: errorBody?.message || errorBody?.error || "Resend request failed"
    });

    return {
      ok: false,
      status: 502,
      message: "Não foi possível enviar a mensagem no momento. Tente novamente mais tarde."
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Mensagem enviada com sucesso. Obrigado pelo contato."
  };
}
