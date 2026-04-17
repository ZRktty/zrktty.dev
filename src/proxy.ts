import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|maintenance|robots.txt|sitemap.xml).*)',
  ],
}

export function proxy(request: NextRequest) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

  const url = request.nextUrl.clone()

  if (maintenanceMode && url.pathname !== '/maintenance') {
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url, { status: 503 })
  }

  if (!maintenanceMode && url.pathname === '/maintenance') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
