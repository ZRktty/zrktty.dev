# Plan: ZR-49 — hide the business email behind an alias, then a contact sheet

> ⚠️ **ZR-49 is an inferred ticket number.** Atlassian MCP was not authorized last session, so the
> number was guessed from the highest existing `docs/ZR-*-plan.md` (ZR-48). Verify it on the board
> and, if wrong, rename the branch and amend both commit messages before opening the PR.

---

## 🔴 NEXT SESSION — START HERE

Paste this as the first message:

```text
Resume ZR-49. Read docs/ZR-49-plan.md first — it has full context.

Branch ZR49_contact-email-obfuscation is checked out with 2 commits. Phase 1
(email obfuscation hotfix) is code-complete and the alias is already live in
Sanity. Two things to do, in order:

1. Finish the Phase 1 self-QA: `bun run dev`, then use the Playwright MCP
   (now configured in .mcp.json — must run HEADED, never headless) to check
   /about at 375, 393, 360, 768 and 1280. Confirm no horizontal overflow, the
   "Email me directly" button is not clipped, and clicking it reveals
   hello@zrktty.dev. Then open the PR.

2. Start Phase 2: the global contact sheet + Vercel BotID + Resend. The full
   spec is in this file under "Phase 2".

Also confirm the real Jira number — ZR-49 was inferred, not verified.
```

**Restart was required** because `.mcp.json` gained a `playwright` entry and MCP servers only
connect at startup. Verify with `/mcp` that `playwright` is connected before starting.

---

## Ticket

Board: <https://zoltanrakottyai.atlassian.net/jira/core/projects/ZR/board> · Epic ZR-21

## Summary

`zoltan@zrktty.dev` started receiving spam. The address was rendered on `/about` as a plain
`href="mailto:…"` inside a `'use client'` component, so it shipped both in the static HTML and in
the serialized RSC payload — exactly what regex address harvesters look for. Phase 1 swaps in a
rotatable alias and stops shipping the raw string. Phase 2 replaces the link entirely with a
bot-protected contact form, after which the address never reaches the browser at all.

**Honest framing:** Phase 1 is obfuscation, not security. It defeats regex harvesters, not a
headless-browser harvester. Its real value is buying time and making the address _rotatable_ — when
`hello@` gets burned, kill the forwarder and mint a new one without touching the real inbox.
Phase 2 is what actually closes the hole.

---

## ✅ Phase 1 — DONE (committed, not yet PR'd)

Commits on `ZR49_contact-email-obfuscation`:

- `72888c2` fix(ZR-49): stop shipping contact email as a scrapeable mailto link
- `766e794` chore(ZR-49): add project-scoped playwright mcp, headed only

### Files created

- `src/lib/contact/obfuscate.ts` — `splitEmail()` / `joinEmail()` / `mailtoHref()`. Server splits,
  client rejoins, so no contiguous `user@domain` exists in any payload.
- `src/components/about/RevealEmail.tsx` — renders a `<button>`; on click it rejoins the address,
  fires `AnalyticsEvent.ContactEmailClicked`, navigates to `mailto:`, and swaps itself for a real
  `<a>` so copy-link still works without a mail client.

### Files modified

- `src/app/(with-layout)/about/page.tsx` — calls `splitEmail()` server-side, passes `emailParts`.
- `src/components/about/ContactBlock.tsx` — prop `contactEmail` → `emailParts`; renders `RevealEmail`.
- `src/types/index.ts` — added `EmailParts`.
- `.mcp.json` + `CLAUDE.md` — project-scoped Playwright MCP, headed-only note.

### Already done outside the repo

- Owner created cPanel forwarder `hello@zrktty.dev` → `zoltan@zrktty.dev`.
- Sanity `aboutMe.contactEmail` patched to `hello@zrktty.dev` **and published** (via Sanity MCP).

### Verified

- `bun run lint` ✓ · `bunx tsc --noEmit` ✓ · `bun run build` ✓
- `.next/server/app/about.html` and `about.rsc`: **0** `mailto:`, **0** contiguous email addresses.
- Dev server render confirms the alias: ships as `"user":"hello","domain":"zrktty.dev"`.
- 375px (headless, before the headed-only rule): no horizontal overflow, button 311×46 inside
  viewport, JetBrains Mono inherited, transparent background.

### ⛔ Still outstanding for Phase 1

- [ ] **Headed** Playwright check at 393 / 360 / 768 / 1280 (375 was measured, but headless).
- [ ] Click-through test: button reveals `hello@zrktty.dev` and opens the mail client.
- [ ] Confirm the real Jira number; rename branch + amend commits if it is not ZR-49.
- [ ] `git push -u origin ZR49_…` and `gh pr create`.

---

## Phase 2 — contact sheet + BotID + Resend (not started)

Branch off `main` after Phase 1 merges: `ZR{n}_contact-form-sheet`

### Decisions already made by the owner

| Question       | Decision                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Bot protection | **Vercel BotID** — invisible, Basic tier free on all plans. Not Turnstile, not a visible captcha.                                   |
| Form location  | **A sheet that slides in from the right**, invocable **from any page** (a "Send me a message" button will go on other pages later). |
| Delivery       | **Resend** via Vercel Marketplace.                                                                                                  |

### Architecture — one sheet, many triggers

The sheet is **not** owned by `ContactBlock`. Mount it once via a provider in
`src/app/(with-layout)/layout.tsx`; any component calls `useContactSheet().open(location)`.
Mirror the existing `src/components/mobile-nav/` convention exactly (barrel `index.ts` +
`MobileNavProvider.tsx` + `NavContext.tsx` exporting `useNav()` + `HamburgerButton.tsx`).

`src/components/contact/`:

- `ContactSheetContext.tsx` — context + `useContactSheet()` that throws outside the provider.
- `ContactSheetProvider.tsx` — `'use client'`. Holds `isOpen` + triggering `location`, renders
  `<Sheet>` + `<ContactForm />` once next to `{children}`. Takes `children` as a prop so server
  components below it stay server components.
- `ContactForm.tsx` — fields + submit logic.
- `ContactTriggerButton.tsx` — reusable button; props `location`, `label`, `className`.
- `index.ts` — barrel.

### Provision first

```bash
vercel integration add resend/resend-email --yes --no-claim   # auto-sets RESEND_API_KEY
vercel env pull --yes
bun add botid resend zod
bunx shadcn@latest add input textarea label
```

If the CLI hands off to a claim/dashboard step: `vercel integration open resend/resend-email`.

### Sending identity

- **Start (0 DNS):** `from: 'zrktty.dev <onboarding@resend.dev>'`, `replyTo:` submitter. Works
  **only if** the destination equals the Resend account-owner address — unverified Resend accounts
  can only send to themselves.
- **Production:** verify subdomain `send.zrktty.dev` in Resend, add its 3 records at Spaceship
  (MX on `send`, SPF TXT on `send`, `resend._domainkey` TXT). The subdomain is deliberate — it
  leaves the apex SPF that cPanel mail depends on untouched. Then
  `from: 'Contact form <contact@send.zrktty.dev>'`.

Only the `from` string differs — keep it in the constants file for a one-line swap.

### Files to create

- The five files in `src/components/contact/` above.
- `src/constants/contact.ts` — `HONEYPOT_FIELD_NAME`, `MAX_NAME_LENGTH`, `MAX_EMAIL_LENGTH`,
  `MAX_MESSAGE_LENGTH`, `MIN_MESSAGE_LENGTH`, `CONTACT_FROM_ADDRESS`, `CONTACT_SUBJECT_PREFIX`,
  `CONTACT_API_PATH`, `CONTACT_TRIGGER_DEFAULT_LABEL`.
- `src/lib/contact/schema.ts` — one zod schema built from those constants, imported by **both**
  client and server.
- `src/app/api/contact/route.ts` — `POST` only:
  1. `const { isBot } = await checkBotId()` → 403.
  2. Honeypot non-empty → return 200 and silently drop.
  3. `schema.safeParse()` → 400 with field errors.
  4. Resolve destination server-side via new `CONTACT_EMAIL_QUERY` — never reaches a client bundle.
  5. `resend.emails.send({ from, to, replyTo, subject, text })` → 200 / 500.

`ContactForm` detail: `SheetContent` **needs a `SheetTitle`** or Radix Dialog logs an a11y
violation. Honeypot field: `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`, visually hidden.
Reset state on close so a second open starts clean.

### Files to modify

- `src/app/(with-layout)/layout.tsx` — wrap with `<ContactSheetProvider>` inside `MobileNavProvider`.
  No props needed; the destination is resolved server-side in the route handler.
- `src/components/about/ContactBlock.tsx` — replace `RevealEmail` with
  `<ContactTriggerButton location="about-contact" />`.
- **Delete** `src/lib/contact/obfuscate.ts` and `src/components/about/RevealEmail.tsx` — Phase 1 is
  fully superseded.
- `next.config.ts` — `export default withBotId(nextConfig)` from `botid/next/config`.
  ⚠️ After `bun run build`, verify the existing PostHog `/ingest/*` rewrites survive alongside
  BotID's injected rewrites.
- `instrumentation-client.ts` (repo root, already exists for PostHog) — add
  `initBotId({ protect: [{ path: CONTACT_API_PATH, method: 'POST' }] })`. Next 16 is past 15.3, so
  this is the recommended path over `<BotIdClient />`.
- `src/sanity/queries.ts` — add `CONTACT_EMAIL_QUERY` (server-only); **remove `contactEmail` from
  `ABOUT_QUERY`** (~line 143).
- `src/app/(with-layout)/about/page.tsx` — stop passing any email-derived prop.
- `src/types/index.ts` — drop `contactEmail` from `AboutPageData`, drop `EmailParts`, add
  contact-form request/response types.
- `src/constants/analyticsEvents.ts` — replace `ContactEmailClicked` with `ContactFormOpened`,
  `ContactFormSubmitted`, `ContactFormFailed` (carry `{ location }`, matching `BookCallClicked`).
  Also update `docs/posthog-setup-report.md:9-10,25`.
- `.env.example` — add `RESEND_API_KEY`.

**Optional (studio submodule):** `studio/schemaTypes/aboutMe.ts:142-148` still describes
`contactEmail` as "shown in the contact section" — no longer true. Update, push in `studio/`, then
`mcp__sanity__deploy_schema`.

**Optional hardening:** Vercel WAF rate-limit rule on `/api/contact` (~10 req/10 min per IP).
Stage with `--rate-limit-action log`, review, then tighten. BotID is the primary defense; the WAF
rule is the backstop against a bot that gets through and burns the Resend quota.

---

## Mobile considerations

Viewports to test: 375, 393, 360, 768, 1280. The sheet must be fully usable at **360px** without
horizontal overflow, and must close via overlay click, Escape, and the close button.

---

## ⚠️ Gotchas discovered — do not re-derive

- **Two `aboutMe` documents exist** in `production`: the real `aboutMe` singleton and a stray
  `fc539c33-ed2f-49bd-83de-7f6ffd993fb7` with `contactEmail: null`. `ABOUT_QUERY` uses
  `*[_type == "aboutMe"][0]` with no ordering, so it picks the right one **only by `_id` sort
  luck**. Fix separately: delete the stray, or pin the query to `_id == "aboutMe"`.
- `hello@` forwards to `zoltan@`, so spam still lands in the same inbox. The win is rotatability,
  not filtering. Don't oversell it.
- **BotID local behavior:** `checkBotId()` always returns `isBot: false` in dev, and hitting the
  route with `curl` in production **will** be blocked — that's correct behavior, not a bug. Test
  only by submitting the real form from a page on a preview deploy.
- **Playwright must be headed.** `@playwright/mcp` is headed by default — never add `--headless`.
  The Docker MCP profile's Playwright runs in a container with no display and is always headless;
  do not use it.
- `src/components/ui/sheet.tsx` already exists and already defaults to `side="right"`.
- `src/components/cv/`, `src/app/cv/`, `src/app/cover-letter/`, `docs/jobdesc/` are **gitignored**
  and never deployed. `src/components/cv/Letterhead.tsx:47` hardcodes the old address — out of scope.
- DNS facts: MX → `cpanel34.rackforest.com` (cPanel at RackForest), nameservers → Spaceship, apex
  SPF is `v=spf1 ip4:193.201.190.9 ~all` — **do not touch the apex SPF.**
- Vercel: team `zrktty-projects`, project `zrktty.dev`.
- A pre-commit hook runs GitLeaks + lint-staged (prettier/eslint `--fix`), so commits may reformat
  files. `bunx` does **not** dirty `bun.lock`.

## Questions / blockers

- **Jira number unverified** — Atlassian MCP not authorized. Authorize via claude.ai connector
  settings, or supply the real number.
- Phase 2 blocked on nothing technical; provisioning Resend needs an owner-facing browser step if
  the CLI hands off.

## Source plan

Full approved plan (superset of this file): `~/.claude/plans/i-started-to-get-distributed-parasol.md`
