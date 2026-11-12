import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(request, res, sessionOptions);

    if (!session.isLoggedIn) {
      // In reverse-proxy setups (Apache/NuCDN), request.url host may resolve to internal 127.0.0.1:3000.
      // Use x-forwarded-host / host or a relative path to ensure the user stays on the public domain.
      const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
      const forwardedProto = request.headers.get("x-forwarded-proto") || "https";

      let loginUrl: URL;
      if (forwardedHost && !forwardedHost.includes("localhost") && !forwardedHost.includes("127.0.0.1")) {
        loginUrl = new URL(`${forwardedProto}://${forwardedHost}/admin/login`);
      } else {
        loginUrl = new URL("/admin/login", request.nextUrl.origin);
        // If the origin is localhost:3000 but we have a public forwarded host, fix it:
        if (forwardedHost) {
          loginUrl.host = forwardedHost;
          loginUrl.protocol = forwardedProto.endsWith(":") ? forwardedProto : `${forwardedProto}:`;
        }
      }

      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
