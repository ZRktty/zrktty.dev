# Plan: ZRKTTYDEV-1 — contact sheet with Vercel BotID + Resend

## Work item

<https://app.plane.so/zrktty/projects/62ee9d97-66ff-4a9d-9cb2-78ba066b5008/issues/c40be1fd-2973-41cf-87ff-be4e8ddd2354>

Supersedes phase 1 (`docs/ZR-49-plan.md`, PR #37 merged). That phase only split the address so
regex harvesters could not read it; this one keeps the address off the client entirely.

## 🔴 REMAINING BLOCKER — DNS, owner-only

Everything is built except delivery. Resend is provisioned but **unverified**, and an unverified
account may only send to its own owner address:

```text
[contact] resend rejected the send: "validation_error" "You can only send testing emails to your
own email address (zoltanrakottyai@gmail.com). To send emails to other recipients, please verify a
domain at resend.com/domains, and change the `from` address to an email using this domain."
```

The destination is `hello@zrktty.dev` (from Sanity), so every send fails until `send.zrktty.dev`
is verified. Add these three records at **Spaceship**, in the `zrktty.dev` zone:

| Type | Host                     | Priority | Value                                            |
| ---- | ------------------------ | -------- | ------------------------------------------------ |
| TXT  | `resend._domainkey.send` | —        | the DKIM `p=MIGf…` key from the Resend dashboard |
| MX   | `send.send`              | 10       | `feedback-smtp.eu-west-1.amazonses.com`          |
| TXT  | `send.send`              | —        | `v=spf1 include:amazonses.com ~all`              |

`send.send` is not a typo — Resend puts its bounce/SPF domain one level below the sending domain,
so the full names are `send.send.zrktty.dev` and `resend._domainkey.send.zrktty.dev`.
**The apex SPF (`v=spf1 ip4:193.201.190.9 ~all`) must not be touched** — cPanel mail depends on it.

Once Resend reports the domain verified, flip one line:

```ts
// src/constants/contact.ts
export const CONTACT_FROM_ADDRESS = 'Contact form <contact@send.zrktty.dev>'
```

Re-run the live send test afterwards. Until then the form correctly shows its error state rather
than pretending to have sent.

## What was built

### Created

- `src/components/contact/` — `ContactSheetContext.tsx` (throws outside the provider),
  `ContactSheetProvider.tsx` (mounted once in the layout, holds `isOpen` + `location`),
  `ContactForm.tsx`, `ContactTriggerButton.tsx`, `index.ts`.
- `src/app/api/contact/route.ts` — `POST` only: `checkBotId()` → honeypot (silent 200) → shared
  zod schema (400 + field errors) → destination from Sanity → Resend.
- `src/constants/contact.ts`, `src/lib/contact/schema.ts`, `src/constants/ctaClasses.ts`.

### Modified

- `src/app/(with-layout)/layout.tsx` — `<ContactSheetProvider>` inside `MobileNavProvider`.
- `src/components/about/ContactBlock.tsx` — `<ContactTriggerButton location="about-contact" />`.
- `next.config.ts` — `withBotId(nextConfig)`. `instrumentation-client.ts` — `initBotId()`.
- `src/sanity/queries.ts` — `CONTACT_EMAIL_QUERY` added, `contactEmail` dropped from `ABOUT_QUERY`.
- `src/constants/analyticsEvents.ts` — `ContactEmailClicked` → `ContactFormOpened` /
  `ContactFormSubmitted` / `ContactFormFailed`. `docs/posthog-setup-report.md` updated.

### Deleted

- `src/lib/contact/obfuscate.ts`, `src/components/about/RevealEmail.tsx` — phase 1, superseded.

## Verified

- `bun run build` ✓ · `bun run lint` ✓ · `bunx tsc --noEmit` ✓
- PostHog's three `/ingest/*` rewrites survive alongside BotID's two injected ones
  (checked in `.next/routes-manifest.json`) — this was the flagged risk of `withBotId`.
- Built `/about`: 0 `mailto:`, 0 email addresses, nothing in `.next/static/chunks/`.
- Playwright, headed Chrome, sheet open at every viewport: 360 ✓ 375 ✓ 393 ✓ 768 ✓ 1280 ✓ —
  no horizontal overflow anywhere; sheet is full-width below `sm`, 448px above; all fields inside
  the viewport; honeypot parked at x=-9998.
- Closes via Escape ✓, overlay click ✓, close button ✓. Radix unmounts the content, so a second
  open always starts on a clean form.
- Live submit reached Resend and was rejected only by the sandbox rule above — proof the BotID,
  honeypot, schema, Sanity-lookup and send path are all correctly wired.

## Gotchas discovered — do not re-derive

- **`vercel env pull` overwrites the local env file outright, with no backup.** It also pulled a
  stale `NEXT_PUBLIC_SANITY_DATASET=development` from Vercel's Development environment — a dataset
  that has never existed in project `8tbsip27` (only `production` and `production-comments` do).
  Every route 500'd with `Dataset "development" not found` until the Vercel value was corrected to
  `production` and re-pulled. Check that variable before any future pull.
- `SANITY_API_TOKEN` is listed in the example env file but referenced nowhere in `src/`, and is
  absent from Vercel. If anything (Sanity CLI, typegen) needs it, it was lost in the overwrite.
- The `.claude/hooks/block-env-access.mjs` hook blocks the agent from reading _or_ writing any
  env file, the example one included — so `RESEND_API_KEY=` still needs adding there by hand.
- Resend provisioning needs `-m domain=… -m region=… --plan free`; region is fixed at provision
  time. Chosen: `eu-west-1`, matching the EU PostHog instance.
- BotID is a no-op locally: `checkBotId()` always returns `isBot: false` in dev, and `curl` against
  the route in production **will** be blocked. Test only by submitting the real form on a preview.
- The sheet's close button is shadcn's 16×16 X in `src/components/ui/sheet.tsx` — below the 24×24
  WCAG minimum for touch. That file is shadcn-managed and must not be edited; override from
  `SheetContent` with an arbitrary-variant class if it needs fixing.

## Optional follow-ups

- Vercel WAF rate-limit rule on `/api/contact` (~10 req/10 min per IP). Stage with
  `--rate-limit-action log`, review, then tighten. BotID is the primary defense; this is the
  backstop against a bot that gets through and burns the Resend quota.
- Repoint the [Lead gen CTAs insight](https://eu.posthog.com/insights/BRBraJjs) at
  `contact_form_submitted` — it still trends the retired `contact_email_clicked`.
- Delete the stray second `aboutMe` document (`fc539c33-ed2f-49bd-83de-7f6ffd993fb7`,
  `contactEmail: null`). `CONTACT_EMAIL_QUERY` is pinned to `_id == "aboutMe"` so mail is safe,
  but `ABOUT_QUERY` still picks between the two by `_id` sort luck.
- `studio/schemaTypes/aboutMe.ts:142-148` still describes `contactEmail` as "shown in the contact
  section" — no longer true.
