import { NextResponse } from "next/server";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32_000;

export async function readJsonBody(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { error: NextResponse.json({ ok: false, message: "Payload muito grande." }, { status: 413 }) };
  }

  const payload = await request.json().catch(() => null);
  return { payload };
}

export function enforceRateLimit(request: Request, scope: string) {
  const key = `${scope}:${getClientKey(request)}`;
  const result = checkRateLimit(key);

  if (!result.allowed) {
    const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Aguarde um momento e tente novamente." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter)
        }
      }
    );
  }

  return null;
}

/** Silent success used when honeypot is tripped (do not tip off bots). */
export function honeypotAcceptedResponse(message: string) {
  return NextResponse.json({ ok: true, message }, { status: 200 });
}
