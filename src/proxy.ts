import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/jwt";

export async function proxy(request: NextRequest) {
  const session = request.cookies.get("s")?.value;

  const result = await decrypt(session);

  if (!result?.userId)
    return NextResponse.redirect(
      new URL("/login?err=login first", request.nextUrl),
    );

  const next = NextResponse.next();
  next.headers.set("x-user-id", String(result.userId));

  return next;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/(profile|profile/settings)",
    "/notifications/:path*",
  ],
};
