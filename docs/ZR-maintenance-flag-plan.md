# Plan: Replace env-driven maintenance mode with Vercel Feature Flag

## Summary

Replace the `NEXT_PUBLIC_MAINTENANCE_MODE` env var toggle with a proper Vercel Feature Flag
so maintenance mode can be toggled from the Vercel Dashboard without a redeploy.

---

## Context: Next.js 16 proxy convention

Next.js 16 renamed the middleware file convention from `middleware.ts` → `proxy.ts` and the
export from `middleware()` → `proxy()`. The project's `src/proxy.ts` is correct for Next.js 16.
The plan originally noted the file was broken — that was wrong; it works fine once the SDK
call replaces the env-var read.

---

## Feasibility

**High.** The project already has `FLAGS` and `FLAGS_SECRET` env vars provisioned on Vercel
(Production, Preview, and Development). The main work is:

1. Installing the `flags` package
2. Creating `src/flags.ts`
3. Updating `src/proxy.ts` to call `await maintenanceMode()` instead of reading the env var
4. Adding the discovery endpoint (enables Flags Explorer toolbar)
5. Creating the flag in the Vercel Dashboard and toggling it off to go live

---

## Files to create

| File                                        | Purpose                                      |
| ------------------------------------------- | -------------------------------------------- |
| `src/flags.ts`                              | Single source of truth for all feature flags |
| `src/app/.well-known/vercel/flags/route.ts` | Flags Explorer discovery endpoint            |

## Files to modify

| File           | Change                                                      |
| -------------- | ----------------------------------------------------------- |
| `src/proxy.ts` | Replace env-var read with `await maintenanceMode()` (async) |

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
  description: 'Rewrite all traffic to /maintenance with 503 when enabled',
})
```

The `decide` fallback (`false`) means the flag fails open — site stays live if the
Flags service is unreachable.

### 3. Update `src/proxy.ts`

Next.js 16 uses `proxy.ts` / `export async function proxy()` — the existing file is correct.
Update it to call `await maintenanceMode()` instead of reading the env var:

```ts
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
