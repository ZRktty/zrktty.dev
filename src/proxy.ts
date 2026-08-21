import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { maintenanceMode } from '@/flags'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|robots.txt|sitemap.xml).*)'],
}

export async function proxy(request: NextRequest) {
  const isMaintenance = await maintenanceMode()
  const url = request.nextUrl.clone()
  const isOnMaintenance = url.pathname === '/maintenance'

  if (isMaintenance) {
    if (!isOnMaintenance) url.pathname = '/maintenance'
    return NextResponse.rewrite(url, { status: 503 })
  }

  if (isOnMaintenance) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
