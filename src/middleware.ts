import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================================
// TEMPORARY BILLING SYSTEM DOWNTIME CONFIGURATION
// Set to 'false' whenever the user wants to restore the billing site.
// ============================================================================
export const IS_BILLING_SYSTEM_DISABLED = true;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Enforce complete temporary takedown of Billing & Admin systems
  if (IS_BILLING_SYSTEM_DISABLED) {
    if (pathname.startsWith('/admin') || pathname === '/login') {
      const maintenanceUrl = new URL('/maintenance', request.url);
      return NextResponse.redirect(maintenanceUrl);
    }
  }

  // 2. Normal access control (active when IS_BILLING_SYSTEM_DISABLED is false)
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/login'],
};
