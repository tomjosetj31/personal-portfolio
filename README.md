# tomjosetj31.github.io

Personal site for Tom Jose — DevOps engineer and product builder.

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · Motion. Deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Editing content

All copy lives in `src/content/` — components hold none of their own.

| To change | Edit |
|---|---|
| Products | `src/content/products.ts` |
| Role and outcome cards | `src/content/experience.ts` |
| Teaching guides | `src/content/guides.ts` |
| Headline, socials, availability | `src/content/profile.ts` |
| Certifications | `src/content/certifications.ts` |

`src/content/articles.archive.json` is **machine-written** — never edit it by hand.

## Medium sync

`npm run sync:medium` fetches the feed and merges new posts into the archive.
It runs automatically before every build and daily via GitHub Actions, so the
writing chapter updates itself. If Medium is unreachable the sync is skipped and
the build proceeds from the last good archive.

## Contact form

Set `VITE_WEB3FORMS_KEY` (see `.env.example`). Without it the contact section
falls back to a `mailto:` link.

## Commands

```bash
npm run dev         # dev server
npm run test        # unit tests
npm run typecheck   # tsc --noEmit
npm run build       # sync + typecheck + production build
```
