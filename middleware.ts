import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from './src/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    try {
      const session = await getIronSession<SessionData>(
        request.cookies as any,
        sessionOptions
      );

      if (pathname === '/admin/login') {
        if (session?.isAdmin) {
          const dashboardUrl = new URL('/admin', request.url);
          return NextResponse.redirect(dashboardUrl);
        }
        return NextResponse.next();
      }

      if (!session?.isAdmin) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('callback', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      if (pathname !== '/admin/login') {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
