# Portfolio Rebuild — Design

**Date:** 2026-09-03
**Author:** Tom Jose (with Claude)
**Status:** Approved, ready for implementation planning

## Context

`tomjosetj31.github.io/personal-portfolio` is a Create React App site built on a
generic developer-portfolio template. Three problems make a rebuild the right
call rather than a refresh:

1. **The stack is unmaintained.** `react-scripts@5.0.1` no longer receives
   updates. The dependency list carries Bootstrap, `animate.css`,
   `react-on-screen`, three carousel libraries and Mailchimp for features the
   site does not use.
2. **The contact form is broken in production.** It POSTs to
   `http://localhost:5000`, so every message sent through the live site has been
   silently lost. GitHub Pages cannot host the accompanying Express server.
3. **It tells only half the story.** Tom is a DevOps engineer *and* a product
   engineer who ships. The current site presents a single flat identity, buries
   its strongest facts inside bullet lists, and gives no billing at all to nine
   structured technical guides.

## Goals

- Present a deliberate **dual identity**: platform operator and product builder,
  in equal measure.
- Make the strongest résumé facts unmissable: ~40% faster deploys, ~30% lower
  AWS spend, CKA/CKAD/AWS certification.
- Give the products — `spaceload`, Cronochat, the K8s operator, and more to come
  — a structure that reads as real shipped software.
- Surface the `learn-*` teaching series as a body of work.
- Land a working contact path.
- Look distinctly engineered rather than templated.

## Non-goals

- Hosting the `learn-*` guide content itself. The guides stay on GitHub; the site
  links to them. (Astro was considered and rejected for this reason — see
  Decisions.)
- A blog or CMS. Writing lives on Medium.
- A newsletter. There is no newsletter; the Mailchimp integration is removed.
- Server-side anything. The site stays static.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Visual direction | **Aurora Glass** — deep-space glassmorphism | Chosen by Tom over terminal-brutalist, blueprint-schematic and neo-editorial alternatives. Most recruiter-legible of the four. |
| Structure | **Linear narrative**, numbered chapters | Chosen over a split-spine two-lane layout and a platform/product mode toggle. Every area lands at full strength, mobile behaviour is honest, and the teaching series gets real billing. |
| Stack | Vite + React 19 + TypeScript + Tailwind v4 + Motion | Modern, small bundle, fast HMR. Tailwind v4's CSS-custom-property model suits a token-driven glass system. |
| Rejected: Astro | — | Near-zero-JS advantage is largely forfeited because the aurora and scroll motion are client-side anyway. Its real win — hosting the guides as MDX — is an explicit non-goal. Revisit if that changes. |
| Rejected: single-file static | — | No componentisation; degrades as the product list grows, and the product list is about to grow. |
| URL | `tomjosetj31.github.io` (root user site) | Cleaner on a résumé than a project subpath. Requires renaming the repo to `tomjosetj31.github.io`. |
| Old URL | `/personal-portfolio/` redirect stub | Links already on the résumé and LinkedIn must not 404. |
| Contact | Web3Forms (free, static-friendly) + `mailto:` fallback | No backend, no secret worth protecting beyond a public access key. |
| Skill meters | **Removed** | "Kubernetes 90%" invites "90% of what?" from exactly the senior engineer the site needs to impress. Replaced with grouped tool tags in context. |
| Headline | "I run the platform. / I build the product." | Second line gradient-filled. States the duality without a slogan. |
| Location | "Kerala, India — remote for Frankfurt · IST" | Accurate; signals remote-friendly. |
| Availability | Subtle pulsing status chip in nav | "Open to roles" — clear without appearing desperate. |
| Photo | GitHub avatar (`avatars.githubusercontent.com/u/60109661`) | Warmth and recognition. Replaceable later via one content field. |
| Résumé served | `Tom-Jose-DevOps-Engineer-feb-3.pdf` | The site currently ships an older `Kotaicode_Resume.pdf`. |

## Design system

Tokens are CSS custom properties on `:root`, consumed by both Tailwind utilities
and inline SVG so there is a single source of truth.

**Aurora palette**

| Token | Value | Use |
|---|---|---|
| `--aurora-violet` | `#7c3aed` | Primary bloom, chapter 02 accent |
| `--aurora-cyan` | `#22d3ee` | Secondary bloom, chapter 01 accent |
| `--aurora-magenta` | `#e879f9` | Tertiary bloom (34% opacity), depth only |
| `--accent-teal` | `#2dd4bf` | Chapter 03 accent |
| `--status-green` | `#4ade80` | Availability chip, "shipped" badges |

**Surfaces and text**

| Token | Value |
|---|---|
| `--bg` | `#05060f` |
| `--glass-bg` | `rgba(255,255,255,0.048)` |
| `--glass-border` | `rgba(255,255,255,0.115)` |
| `--glass-blur` | `14px` |
| `--text` | `#f4f6ff` |
| `--text-2` | `rgba(244,246,255,0.60)` |
| `--text-3` | `rgba(244,246,255,0.38)` |

**Typography** — two families only.

- *Display/body:* **Geist Sans**, weights 400/500/600/700, tight tracking on
  headings (`-0.038em` at hero scale). Fallback stack: Inter, system sans.
- *Mono:* **Geist Mono**. Used for **all** labels, metrics, tags and micro-copy
  — uppercase, `letter-spacing: 0.19em`.

Both self-hosted as variable fonts via `@fontsource-variable/geist` and
`@fontsource-variable/geist-mono`. No Google Fonts request: faster, and cleaner
under GDPR given a German employer.

The mono/grotesk pairing is load-bearing. It carries the ops-console character
into a glass aesthetic and is the main thing separating this from a template.

**Texture** — a 120px SVG `feTurbulence` noise overlay at 16% opacity across the
aurora field. Glassmorphism reads cheap when perfectly clean; grain fixes it.

## Page architecture

### Nav (sticky)
Glass bar, `backdrop-filter: blur(16px) saturate(140%)` over `rgba(5,6,15,0.62)`.
Monogram left. Right: availability chip, chapter links (01/02/03), `⌘K` hint,
résumé button. Mobile: slide-over sheet.

### Hero
Full viewport over the aurora field.
- Avatar + two mono eyebrow lines: `DEVOPS ENGINEER · KOTAICODE GMBH` /
  `KERALA, INDIA — REMOTE FOR FRANKFURT · IST`
- H1: *I run the platform. / I build the product.* — line two gradient-filled
  violet→cyan.
- Subline: "Five years building the systems other people's software runs on —
  and the software that runs on them. AWS, Kubernetes and GitOps by day; CLI
  tools, operators and Slack apps the rest of the time."
- CTAs: **See the work ↓** (gradient) and **Download résumé** (glass).

### Proof strip
Four glass tiles with a top hairline gradient: `~40%` faster deploys · `~30%`
lower AWS spend · `5 yrs` production platforms · `3` certifications. Numbers
count up on entry.

### 01 — Infrastructure (cyan)
**Pipeline diagram** is the centrepiece: `Git → CI → ECR → ArgoCD → EKS`, each
node labelled with its real tooling, with deploy tokens travelling the links
driven by scroll progress. Beneath a dashed rule, a supporting row:
Prometheus · Grafana · Loki · Terraform · Crossplane.

**Four outcome cards**, replacing eight undifferentiated résumé bullets. Each
card puts its metric in the heading:
- **Delivery** — `−40% deploy time` · GitHub Actions, GitLab CI, Helm
- **Cost** — `−30% AWS spend` · Karpenter, Cost Explorer, EKS
- **Reliability** — `faster MTTR` · Prometheus, Grafana, Loki
- **Provisioning** — `GitOps` · Terraform, Crossplane, ArgoCD

### 02 — Products (violet)
Data-driven card grid. Exactly one product carries `featured: true` and renders
wider, tinted, with a violet border; ordering otherwise follows array order, not
the flag. Each card: name, one-line description, the problem it solves, stack
tags, status badge, links, optional copyable install command, optional star
count.

Seed set — `spaceload` (`featured: true`), K8s Resource Booking Operator,
Cronochat.
Tom's fuller product list is pending and drops in as a content-file edit.

### 03 — Teaching & Writing (teal)
Compact grid of the `learn-*` series with day counts: Kubernetes (14-day),
Ansible (8-day), Docker (7-day), Terraform, ArgoCD, Jenkins, ELK, Linux,
CKAD. Plus Medium articles, including the Cronochat introduction.

### Credentials
CKA · CKAD · AWS Certified Cloud Practitioner as badges, clickable where a
verification URL is supplied. B.Tech, Govt. Engineering College Palakkad,
2016–2020.

### Contact
Glass panel. Web3Forms-backed form with inline validation and success/error
states, plus direct email, LinkedIn, GitHub, Medium and a timezone note.

### Footer
Mono, minimal, with a built-with line.

### ⌘K command palette
Fuzzy jump to any chapter or product by name; copy email; download résumé; open
GitHub. Opens on `⌘K`/`Ctrl+K` and on click of the nav hint. It is the cheapest
single feature that makes a portfolio feel engineered rather than decorated.

## Content model

All copy lives in typed modules under `src/content/`, never inline in
components. Adding a product is a one-file edit.

```ts
// src/content/types.ts
export interface Product {
  slug: string
  name: string
  tagline: string          // one line: what it does
  problem: string          // the problem it solves
  status: 'shipped' | 'live' | 'wip' | 'archived'
  stack: string[]
  install?: { label: string; command: string }
  links: { label: string; href: string }[]
  stars?: number
  featured?: boolean
}

export interface OutcomeCard {
  title: string
  metric: string
  body: string
  tools: string[]
}

export interface Guide {
  name: string
  repo: string
  description: string
  days?: number
}

export interface Certification {
  name: string
  abbr: string
  issuer: string
  verifyUrl?: string
}
```

Modules: `products.ts`, `experience.ts`, `guides.ts`, `certifications.ts`,
`profile.ts` (name, headline, eyebrows, location, avatar, socials).

## Motion

| Element | Behaviour |
|---|---|
| Aurora blooms | CSS-only drift, 34s/41s/47s loops, alternating |
| Section entry | Motion `whileInView`, y+opacity, staggered children |
| Pipeline tokens | Position driven by `useScroll` + `useTransform` |
| Proof numbers | Count-up on first view |
| Glass panels | Cursor-tracked radial highlight |
| ⌘K palette | Fade + scale with backdrop blur |

Every animation is disabled or reduced under `prefers-reduced-motion: reduce`.

## Accessibility

Glassmorphism's standard failure is text over a bright bloom. Mitigation:
**every text-bearing panel carries an opaque scrim beneath its blur**, so
contrast holds at WCAG AA regardless of what drifts behind it. This is a hard
constraint on the design, not a nice-to-have.

Also required: visible focus rings on all interactive elements, full keyboard
operation of the ⌘K palette (including Escape and focus trap), semantic landmark
elements, `alt` text, and a skip-to-content link.

## Project structure

```
src/
  content/       types.ts, profile.ts, products.ts, experience.ts,
                 guides.ts, certifications.ts
  components/
    layout/      Nav.tsx, Footer.tsx, AuroraField.tsx, Grain.tsx
    sections/    Hero.tsx, ProofStrip.tsx, Infrastructure.tsx,
                 Products.tsx, Teaching.tsx, Credentials.tsx, Contact.tsx
    ui/          GlassPanel.tsx, MonoLabel.tsx, Tag.tsx, StatusChip.tsx,
                 CopyableCommand.tsx, CountUp.tsx
    diagrams/    PipelineDiagram.tsx
    palette/     CommandPalette.tsx
  hooks/         useReducedMotion.ts, useCursorGlow.ts
  styles/        tokens.css, index.css
public/          resume PDF, favicon, CNAME (if custom domain later),
                 personal-portfolio/index.html (redirect stub)
```

Components stay small and single-purpose. Section components compose `ui/`
primitives and read from `content/`; they hold no copy of their own.

## Deployment

- Vite `base: '/'`.
- Repo renamed `personal-portfolio` → `tomjosetj31.github.io`. GitHub redirects
  the repo URL; the Pages path does not carry over, hence the redirect stub.
- GitHub Actions workflow: build on push to `main`, deploy via
  `actions/deploy-pages`. Replaces both the existing Jekyll-oriented workflow
  and the `gh-pages` npm dependency.
- Removed from the repo: `server.js`, `nodemailer`, `cors`, `express`,
  `bootstrap`, `react-bootstrap`, `animate.css`, `react-on-screen`,
  `react-multi-carousel`, `react-responsive-carousel`,
  `react-mailchimp-subscribe`, `gh-pages`.

## Testing

The site is presentational, so testing targets logic and contracts rather than
appearance:

- **Content contracts** — every `Product` has required fields; no empty link
  arrays; exactly one `featured`. Guards against a malformed hand-edit.
- **Command palette** — search matches products and chapters, keyboard
  navigation, Escape closes, focus returns.
- **Contact form** — validation states, success and error rendering, submit
  disabled while pending.
- **`CopyableCommand`** — writes to clipboard and shows confirmation.
- **Reduced motion** — animated components render static output when the
  preference is set.
- **Build gate** — `tsc --noEmit` plus a successful production build in CI.

Vitest + React Testing Library. No visual-regression tooling; not worth the
maintenance at this size.

## Open items

These do not block implementation; each is a content-file edit once supplied.

1. **Tom's fuller product list.** Building with the three known products as the
   seed set.
2. **Certification verification URLs.** Badges render unlinked without them.
3. **Medium article URLs** beyond the known Cronochat introduction.
4. **Web3Forms access key** — needed before the contact form goes live; falls
   back to `mailto:` until then.
