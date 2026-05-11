import { NextResponse } from "next/server";
import { validateFeedbackPayload } from "@/lib/form-validation";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const result = validateFeedbackPayload(payload);

  if (result.error) {
    return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Feedback registrado para processamento futuro."
    },
    { status: 202 }
  );
}
