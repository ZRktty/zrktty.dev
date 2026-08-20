# Plan: ZRKTTYDEV-1 — contact sheet with Vercel BotID + cPanel SMTP

## Work item

<https://app.plane.so/zrktty/projects/62ee9d97-66ff-4a9d-9cb2-78ba066b5008/issues/c40be1fd-2973-41cf-87ff-be4e8ddd2354>

Supersedes phase 1 (`docs/ZR-49-plan.md`, PR #37 merged). That phase only split the address so
regex harvesters could not read it; this one keeps the address off the client entirely.

## Delivery: cPanel SMTP, not Resend

The original plan specified Resend via the Vercel Marketplace. It was provisioned, wired, and then
**dropped** — the owner chose to send through the existing cPanel mail server instead. Both worked;
the deciding factor was that the form mails you, at your own server, so the deliverability
reputation a sending service buys you is worth nothing here.

|                        | cPanel SMTP (chosen)           | Resend (dropped)         |
| ---------------------- | ------------------------------ | ------------------------ |
| DNS work               | none — apex SPF already covers | 3 records on a subdomain |
| Credential in env      | mailbox password               | scoped API key           |
| Third party reads mail | no                             | yes                      |
| Delivery logs          | none                           | dashboard                |

The apex SPF (`v=spf1 ip4:193.201.190.9 ~all`) already authorises RackForest to send as
`zrktty.dev`, which is why this path needs no DNS records at all.

Mail is sent from a **dedicated send-only mailbox**, `contactform@zrktty.dev`. Not a personal
mailbox, because the password lives in Vercel's environment and a leak should cost one password
rotation rather than access to your mail. Not `hello@zrktty.dev`, because that is a forwarder with
nothing to authenticate against.

## Configuration

Four server-only variables. Nothing is `NEXT_PUBLIC_`.

| Variable        | Value                    | Notes                                                |
| --------------- | ------------------------ | ---------------------------------------------------- |
| `SMTP_HOST`     | `mail.zrktty.dev`        | Whatever cPanel → Connect Devices reports            |
| `SMTP_PORT`     | `465`                    | Implicit TLS; 587 switches to STARTTLS automatically |
| `SMTP_USER`     | `contactform@zrktty.dev` | Also becomes the `From` address                      |
| `SMTP_PASSWORD` | —                        | cPanel mailbox password                              |

`From` is built as `` `${CONTACT_FROM_NAME} <${credentials.user}>` `` rather than a constant,
because cPanel only lets an authenticated session send as its own mailbox — a hardcoded second
address produces `550 relay not permitted`. The visitor's address goes in `Reply-To`.

## What was built

### Created

- `src/components/contact/` — `ContactSheetContext.tsx` (throws outside the provider),
  `ContactSheetProvider.tsx` (mounted once in the layout, holds `isOpen` + `location`),
  `ContactForm.tsx`, `ContactTriggerButton.tsx`, `index.ts`.
- `src/app/api/contact/route.ts` — `POST` only: `checkBotId()` → honeypot (silent 200) → shared
  zod schema (400 + field errors) → destination from Sanity → SMTP send.
- `src/lib/contact/mailer.ts` — reads SMTP config, builds a per-request transport with 10s
  timeouts so a hung mail host cannot hold a serverless function open.
- `src/lib/analytics/server.ts` — `captureServerException()`, server-side PostHog error tracking.
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

## Error reporting

Every 500 shows the visitor the same vague message, so each failure is reported with the stage that
produced it — to `console.error` and to PostHog error tracking:

| Stage                 | Fires when                                                      |
| --------------------- | --------------------------------------------------------------- |
| `smtp-config-missing` | A variable is absent in that environment                        |
| `destination-missing` | Sanity has no `contactEmail`                                    |
| `smtp-send-failed`    | The send failed — carries `smtp_code` (`EAUTH`, `ETIMEDOUT`, …) |

Events send immediately (`flushAt: 1`, `await shutdown()`) because a serverless instance can freeze
the moment it returns a response, dropping a batched event. Server code talks to
`https://eu.i.posthog.com` directly — the `/ingest` reverse proxy only exists inside a page request.

## Verified

- `bun run build` ✓ · `bun run lint` ✓ · `bunx tsc --noEmit` ✓
- PostHog's three `/ingest/*` rewrites survive alongside BotID's two injected ones
  (checked in `.next/routes-manifest.json`) — this was the flagged risk of `withBotId`.
- Built `/about`: 0 `mailto:`, 0 email addresses, nothing in `.next/static/chunks/`.
- Playwright, headed Chrome, sheet open at every viewport: 360 ✓ 375 ✓ 393 ✓ 768 ✓ 1280 ✓ —
  no horizontal overflow anywhere; full-width below `sm`, 448px above; all fields inside the
  viewport; honeypot parked at x=-9998.
- Closes via Escape ✓, overlay click ✓, close button ✓. Radix unmounts the content, so a second
  open always starts on a clean form.
- Route behaviour by curl: 400 with per-field errors on bad input ✓, silent 200 when the honeypot
  is filled ✓, 500 + `smtp-config-missing` when unconfigured ✓.

## NOT yet verified

- **A successful send.** The SMTP variables are set on Production and Preview but not Development,
  so localhost cannot send. No message has completed the full path end to end on any environment.
- **BotID.** `checkBotId()` always returns `isBot: false` in dev. The first real test is on the
  preview deploy: submitting the form in a browser must succeed while
  `curl -X POST <preview>/api/contact` must return **403**. A 403 from curl is the pass condition.
- **PostHog delivery.** A test exception was sent and `captureServerException` resolved cleanly, but
  the PostHog MCP was not connected, so arrival was never confirmed in the UI.

## Gotchas discovered — do not re-derive

- **`vercel env pull` overwrites the local env file outright, with no backup.** It also pulled a
  stale `NEXT_PUBLIC_SANITY_DATASET=development` from Vercel's Development environment — a dataset
  that has never existed in project `8tbsip27` (only `production` and `production-comments` do).
  Every route 500'd with `Dataset "development" not found` until the Vercel value was corrected to
  `production` and re-pulled. Check that variable before any future pull.
- **Environment scope is easy to get wrong.** Variables added to Production and Preview only look
  correct in the dashboard and work on deployments, but `vercel env pull` reads _Development_ — so
  localhost silently has nothing.
- The `.claude/hooks/block-env-access.mjs` hook blocks the agent from reading _or_ writing any env
  file, the example one included — so the SMTP variables still need adding there by hand.
- BotID is a no-op locally, and `curl` against the route in production **will** be blocked. That is
  correct behaviour, not a bug.
- The sheet's close button is shadcn's 16×16 X in `src/components/ui/sheet.tsx` — below the 24×24
  WCAG minimum for touch. That file is shadcn-managed and must not be edited; override from
  `SheetContent` with an arbitrary-variant class if it needs fixing.

## Follow-ups

- **Rate-limit `/api/contact`** — a Vercel WAF rule, ~10 requests per 10 minutes per IP. This
  matters more with SMTP than it would have with an API service: shared cPanel hosting has an hourly
  send cap, and exhausting it takes out normal mail too. Stage with `--rate-limit-action log` first.
- **Remove the unused Resend resource** — `vercel integration remove resend/resend-email --yes`,
  plus `RESEND_API_KEY` and `RESEND_EMAIL_DOMAIN`. Free plan, no DNS was ever added, but it leaves a
  live API key attached to a service nothing uses.
- **Link server errors to session replay** — the form already knows the visitor's PostHog distinct
  ID; passing it in the request body would tie each server error to that person's replay instead of
  a synthetic `server` actor.
- Repoint the [Lead gen CTAs insight](https://eu.posthog.com/insights/BRBraJjs) at
  `contact_form_submitted` — it still trends the retired `contact_email_clicked`.
- Delete the stray second `aboutMe` document (`fc539c33-ed2f-49bd-83de-7f6ffd993fb7`,
  `contactEmail: null`). `CONTACT_EMAIL_QUERY` is pinned to `_id == "aboutMe"` so mail is safe,
  but `ABOUT_QUERY` still picks between the two by `_id` sort luck.
- `studio/schemaTypes/aboutMe.ts:142-148` still describes `contactEmail` as "shown in the contact
  section" — no longer true.
