import { NextResponse } from "next/server";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32_000;

export async function readJsonBody(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return { error: NextResponse.json({ ok: false, message: "Payload muito grande." }, { status: 413 }) };
  }

  if (!request.body) return { payload: null };
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let source = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { error: NextResponse.json({ ok: false, message: "Payload muito grande." }, { status: 413 }) };
      }
      source += decoder.decode(value, { stream: true });
    }
    source += decoder.decode();
    return { payload: JSON.parse(source) as unknown };
  } catch {
    return { payload: null };
  } finally {
    reader.releaseLock();
  }
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
