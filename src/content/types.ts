export type ProductStatus = 'shipped' | 'live' | 'wip' | 'archived'

export interface ProductLink {
  label: string
  href: string
}

export interface Product {
  slug: string
  name: string
  /** One line: what it does. */
  tagline: string
  /** The problem it solves, in the user's terms. */
  problem: string
  status: ProductStatus
  stack: string[]
  /** Rendered as a copyable command block when present. */
  install?: { label: string; command: string }
  links: ProductLink[]
  stars?: number
  /** Exactly one product carries this. Enforced by contracts.test.ts. */
  featured?: boolean
}

export interface OutcomeCard {
  title: string
  /** Short metric rendered as a chip in the card heading, e.g. "-40% deploy time". */
  metric: string
  body: string
  tools: string[]
}

export interface Guide {
  name: string
  repo: string
  description: string
  /** Length of the guide in days, where it has one. */
  days?: number
}

export interface Certification {
  name: string
  abbr: string
  issuer: string
  verifyUrl?: string
}

export interface Article {
  /** Medium's stable post id. The dedupe key — never derive it from the title. */
  guid: string
  title: string
  url: string
  /** ISO 8601, UTC. */
  publishedAt: string
  /** From RSS <category> tags. */
  topics: string[]
}

export interface ArticleArchive {
  source: string
  /** ISO date of the first sync. Caption metadata only — not the heatmap window. */
  firstSeenAt: string
  lastSyncedAt: string
  /** Append-only, sorted newest first. */
  articles: Article[]
}

export interface SocialLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  monogram: string
  /** Headline renders as two lines; the second is gradient-filled. */
  headlineTop: string
  headlineBottom: string
  eyebrow: string
  location: string
  subline: string
  avatarUrl: string
  email: string
  resumePath: string
  /** Nav status chip text, or null to hide the chip. */
  availability: string | null
  socials: SocialLink[]
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  outcomes: OutcomeCard[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
}
