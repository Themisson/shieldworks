import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/form-validation";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = validateContactPayload(payload);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Mensagem recebida. A integracao com e-mail ou banco de dados pode ser ativada na proxima etapa."
    },
    { status: 202 }
  );
}
