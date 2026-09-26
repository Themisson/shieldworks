import { NextRequest, NextResponse } from "next/server";

/** Preserve Portuguese URLs while giving server rendering a locale param. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Internal rewrites also traverse this path. A redirect here would loop / → /pt → /.
  // Direct /pt URLs remain aliases with an unprefixed canonical.
  if (/^\/pt(?:\/|$)/.test(pathname)) return NextResponse.next();
  if (/^\/en(?:\/|$)/.test(pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!api(?:/|$)|og(?:/|$)|_next(?:/|$)|.*\\..*).*)"] };
