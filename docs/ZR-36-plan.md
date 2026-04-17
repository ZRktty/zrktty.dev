# Plan: ZR-36 — Upgrade Sanity ecosystem (next-sanity 9→12, @sanity/image-url 1→2)

## Ticket
https://zoltanrakottyai.atlassian.net/browse/ZR-36

## Summary
Upgrade next-sanity from 9.12.3 to 12.3.0 and @sanity/image-url from 1.1.0 to 2.1.1. Both are major version bumps that may introduce breaking changes in the client config API and image URL builder.

## Branch
`ZR22b_sanity-ecosystem-upgrade` → PR into `ZR22_project-setup-nextjs-upgrade`

## Files to modify
- `src/sanity/client.ts` — update if createClient API changed
- `src/sanity/utils.ts` — update urlFor builder for @sanity/image-url v2 API
- `src/sanity/types.ts` — regenerate with `bunx sanity typegen generate`

## Files to review (no changes expected)
- `src/sanity/queries.ts` — GROQ queries are unaffected by package versions

## Implementation steps
1. Check changelogs for next-sanity v10/11/12 and @sanity/image-url v2 breaking changes
2. `bun add next-sanity@12.3.0 @sanity/image-url@2.1.1`
3. Fix any TypeScript or import errors
4. Update `src/sanity/client.ts` if client config API changed
5. Update `src/sanity/utils.ts` for image-url v2 if API changed
6. `bunx sanity typegen generate` to regenerate types
7. `bun run build` — must pass
8. `bun run lint` — must pass

## Verification
- Blog listing page loads with post list
- Blog post page loads with images rendering
- `bun run build` passes with no TypeScript errors
- `bun run lint` passes

## Questions / blockers
- None identified yet — check changelogs first
