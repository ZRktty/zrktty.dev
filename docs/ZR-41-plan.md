# Plan: ZR-41 — Experience page — list experience items from Sanity

## Ticket

https://zoltanrakottyai.atlassian.net/browse/ZR-41

## Summary

Build the Experience page by fetching `experience` documents from Sanity and rendering them as a timeline-style list. The page already exists as a placeholder at `src/app/(with-layout)/experience/page.tsx`.

## Files to create

- `src/components/experience/ExperienceCard.tsx` — renders a single experience item
- `src/components/experience/ExperienceList.tsx` — maps items to ExperienceCard

## Files to modify

- `src/sanity/queries.ts` — add `EXPERIENCE_QUERY`
- `src/sanity/types.ts` — regenerate via `bunx sanity typegen generate` (after schema is live in Sanity)
- `src/app/(with-layout)/experience/page.tsx` — fetch data, render ExperienceList

## Implementation steps

1. Run `bunx sanity typegen generate` to pull `experience` + `aboutMe` types into `types.ts`
2. Add `EXPERIENCE_QUERY` to `src/sanity/queries.ts` — ordered by `order asc`, projecting all display fields
3. Create `ExperienceCard` component:
   - Header: role (bold), company (linked via `webUrl`), type badge (`fulltime` | `freelance` | `contract`), date range
   - Date range: format `startDate` → `endDate` (or "Present" if null)
   - Body: PortableText description via `RenderBodyContent`
   - Footer: tech stack tag chips, optional logo
4. Create `ExperienceList` — simple vertical stack of `ExperienceCard`
5. Update `experience/page.tsx` — async server component, fetch with `client.fetch(EXPERIENCE_QUERY)`, pass to `ExperienceList`

## GROQ query shape

```groq
*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  webUrl,
  type,
  startDate,
  endDate,
  description,
  techStack,
  logo { asset->{ url }, alt }
}
```

## Mobile considerations

- Viewports to test: 375, 393, 360, 768, 1280
- Card layout: single column mobile, max-w-3xl centred (matches existing page wrapper)
- Tech stack chips: wrap on small screens

## Questions / blockers

- None — schema is deployed, content exists in Sanity, client + urlFor are ready
