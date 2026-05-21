<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into zrktty.dev. PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ approach) with a reverse proxy through `/ingest` to improve ad-blocker resilience. 11 custom events are tracked across 9 files, covering the full visitor journey from content discovery through lead conversion. No existing code was restructured — all additions are minimal and targeted.

| Event                    | Description                                                                               | File                                              |
| ------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `book_call_clicked`      | Primary CTA clicked in the hero section                                                   | `src/components/HeroCtaButtons.tsx`               |
| `book_call_clicked`      | Primary CTA clicked in the contact/about section                                          | `src/components/about/ContactBlock.tsx`           |
| `contact_email_clicked`  | "Email me directly" link clicked                                                          | `src/components/about/ContactBlock.tsx`           |
| `cv_downloaded`          | CV download link clicked                                                                  | `src/components/about/CVDownload.tsx`             |
| `social_link_clicked`    | Social media link clicked (with `platform` and `url` properties)                          | `src/components/SocialLinks.tsx`                  |
| `project_card_clicked`   | Featured project card clicked (with `project_title`, `project_slug`, `is_featured: true`) | `src/components/projects/FeaturedProjectCard.tsx` |
| `project_card_clicked`   | Project card clicked (with `project_title`, `project_slug`, `is_featured: false`)         | `src/components/projects/ProjectCard.tsx`         |
| `blog_post_clicked`      | Blog post list item clicked (with `post_title`, `post_slug`, `category`)                  | `src/components/Blog/PostListItem.tsx`            |
| `blog_category_filtered` | Blog category filter changed (with `category`)                                            | `src/components/Blog/BlogArchiveClient.tsx`       |
| `blog_load_more_clicked` | "Load Archive" button clicked                                                             | `src/components/Blog/BlogArchiveClient.tsx`       |
| `theme_toggled`          | Light/dark theme toggled (with `theme` = new value)                                       | `src/components/ThemeSelector.tsx`                |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/696886)
- [Lead gen CTAs over time](/insights/BRBraJjs) — `book_call_clicked` + `contact_email_clicked` trend
- [CV downloads](/insights/Xxedr2iN) — total CV download count (bold number)
- [Content engagement](/insights/114VOq7j) — project card + blog post clicks over time
- [Social link clicks by platform](/insights/cbkPn0cv) — `social_link_clicked` broken down by platform
- [Lead conversion funnel](/insights/yTcXRRFm) — Project viewed → CV downloaded → Booked a call

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
