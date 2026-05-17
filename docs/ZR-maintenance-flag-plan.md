# Plan: Replace env-driven maintenance mode with Vercel Feature Flag

## Summary

Replace the `NEXT_PUBLIC_MAINTENANCE_MODE` env var toggle with a proper Vercel Feature Flag
so maintenance mode can be toggled from the Vercel Dashboard without a redeploy.

---

## Existing bug discovered

`src/proxy.ts` is the renamed former `src/middleware.ts` (renamed in commit `8a6a14a`).
Next.js only recognises a file called `middleware.ts` as middleware — **`proxy.ts` is never
executed**. This means maintenance mode redirects are currently not running at all, even though
`NEXT_PUBLIC_MAINTENANCE_MODE=true` is set in production. The maintenance page would not be
shown to any visitor right now.

This plan fixes the bug as a side-effect: the new `src/middleware.ts` replaces the broken proxy.

---

## Feasibility

**High.** The project already has `FLAGS` and `FLAGS_SECRET` env vars provisioned on Vercel
(Production, Preview, and Development). The main work is:

1. Installing the `flags` package
2. Creating `src/flags.ts`
3. Creating/restoring `src/middleware.ts` (currently missing)
4. Adding the discovery endpoint (enables Flags Explorer toolbar)
5. Creating the flag in the Vercel Dashboard and toggling it off to go live

---

## Files to create

| File                                        | Purpose                                      |
| ------------------------------------------- | -------------------------------------------- |
| `src/flags.ts`                              | Single source of truth for all feature flags |
| `src/middleware.ts`                         | Restored Next.js middleware using the flag   |
| `src/app/.well-known/vercel/flags/route.ts` | Flags Explorer discovery endpoint            |

## Files to modify

| File           | Change                                      |
| -------------- | ------------------------------------------- |
| `src/proxy.ts` | Delete — logic moves to `src/middleware.ts` |

## Files to remove from Vercel

| Env var                        | Action                     |
| ------------------------------ | -------------------------- |
| `NEXT_PUBLIC_MAINTENANCE_MODE` | Remove from Production env |

---

## Implementation steps

### 1. Install the Flags SDK

```bash
bun add flags
```

### 2. Create `src/flags.ts`

```ts
import { flag } from 'flags/next'

export const maintenanceMode = flag<boolean>({
  key: 'maintenance-mode',
  defaultValue: false,
  decide: () => false,
  description: 'Redirect all traffic to /maintenance when enabled',
})
```

The `decide` fallback (`false`) means the flag fails open — site stays live if the
Flags service is unreachable.

### 3. Create `src/middleware.ts`

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { maintenanceMode } from '@/flags'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|maintenance|robots.txt|sitemap.xml).*)',
  ],
}

export async function middleware(request: NextRequest) {
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
```

### 4. Add Flags Explorer discovery endpoint

```ts
// src/app/.well-known/vercel/flags/route.ts
import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next'
import * as flags from '@/flags'

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return getProviderData(flags)
})
```

### 5. Create the flag in Vercel Dashboard

1. Open Vercel Dashboard → your project → **Flags**
2. Create flag: key `maintenance-mode`, type **Boolean**
3. Set it **on** for Development/Preview, **off** for Production
4. Pull updated env: `vercel env pull`

### 6. Remove old env var

```bash
vercel env rm NEXT_PUBLIC_MAINTENANCE_MODE production
```

### 7. Deploy

```bash
# push branch and open PR → merge to main → auto-deploys to production
```

After deploy, toggle the flag off in the Vercel Dashboard → site goes live instantly
(no redeploy needed for subsequent toggles).

---

## Toggling maintenance mode after launch

**To enable:** Vercel Dashboard → Flags → `maintenance-mode` → toggle **on** → save  
**To disable:** toggle **off** → save  
No code change, no redeploy required.

---

## Questions / blockers

- None. FLAGS + FLAGS_SECRET are already provisioned. The `flags` package is the only new dep.
- The maintenance page at `src/app/(no-layout)/maintenance/page.tsx` stays as-is.
