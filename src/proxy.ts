import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { maintenanceMode } from '@/flags'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|maintenance|robots.txt|sitemap.xml).*)',
  ],
}

export async function proxy(request: NextRequest) {
  const isMaintenance = await maintenanceMode()
  const url = request.nextUrl.clone()

  if (isMaintenance && url.pathname !== '/maintenance') {
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url, { status: 503 })
  }

  if (!isMaintenance && url.pathname === '/maintenance') {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
