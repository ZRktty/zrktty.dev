import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // The matcher specifies which paths the middleware should run on.
  // We want to match all paths EXCEPT those that should be accessible
  // during maintenance or are static assets.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /_next/static (Next.js static assets)
     * - /_next/image (Next.js image optimization files)
     * - /favicon.ico (your favicon)
     * - /api/ (your API routes - include if they should be available during maintenance, otherwise remove)
     * - /maintenance (the maintenance page itself, *crucially* to prevent infinite redirects)
     * - /robots.txt, /sitemap.xml (if you want these accessible for search engines during maintenance)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|maintenance|robots.txt|sitemap.xml).*)',
  ],
};

export function proxy(request: NextRequest) {
  // Read the environment variable. It needs to be 'true' as a string.
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  console.log(`Maintenance mode is ${maintenanceMode ? 'ON' : 'OFF'}`);

  const url = request.nextUrl.clone(); // Clone the URL to modify it

  // 1. If maintenance mode is ON and the user is NOT on the maintenance page
  if (maintenanceMode && url.pathname !== '/maintenance') {
    // Set the path to the maintenance page
    url.pathname = '/maintenance';
    // Rewrite the URL internally and set a 503 status code.
    // This tells search engines "service temporarily unavailable".
    return NextResponse.rewrite(url, { status: 503 });
  }

  // 2. If maintenance mode is OFF and the user IS on the maintenance page
  if (!maintenanceMode && url.pathname === '/maintenance') {
    // Redirect them back to the home page (or wherever you want them to go)
    // This ensures users don't get stuck on the maintenance page after it's lifted.
    url.pathname = '/';
    return NextResponse.redirect(url); // A 307 Temporary Redirect is fine here.
  }

  // 3. Otherwise (maintenance mode is OFF OR user is already on the maintenance page),
  // continue to the requested page.
  return NextResponse.next();
}