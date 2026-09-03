import type { Article, ArticleArchive } from '../content/types'

const MS_PER_DAY = 86_400_000

/** UTC `YYYY-MM-DD`. All article maths is done in UTC so tests never depend on the runner's timezone. */
export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** The Monday of the week containing `isoDate`. Sunday belongs to the week that precedes it. */
export function mondayOf(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00.000Z`)
  const dow = d.getUTCDay() // 0 = Sunday
  const shift = dow === 0 ? 6 : dow - 1
  return toISODate(new Date(d.getTime() - shift * MS_PER_DAY))
}

export function addDaysISO(isoDate: string, days: number): string {
  return toISODate(new Date(new Date(`${isoDate}T00:00:00.000Z`).getTime() + days * MS_PER_DAY))
}

export function daysBetween(startISO: string, endISO: string): number {
  const start = new Date(`${startISO}T00:00:00.000Z`).getTime()
  const end = new Date(`${endISO}T00:00:00.000Z`).getTime()
  return Math.round((end - start) / MS_PER_DAY)
}

export function createEmptyArchive(source: string, now: Date): ArticleArchive {
  return { source, firstSeenAt: toISODate(now), lastSyncedAt: now.toISOString(), articles: [] }
}

/**
 * Append-only merge keyed on Medium's `guid`.
 *
 * An article present in the archive but absent from `incoming` is preserved —
 * Medium's RSS exposes only the latest 10 posts, so absence from the feed is
 * not evidence that a post is gone.
 */
export function mergeArchive(
  archive: ArticleArchive,
  incoming: Article[],
  now: Date,
): ArticleArchive {
  const byGuid = new Map<string, Article>()
  for (const existing of archive.articles) byGuid.set(existing.guid, existing)
  for (const fresh of incoming) {
    byGuid.set(fresh.guid, { ...(byGuid.get(fresh.guid) ?? {}), ...fresh })
  }

  const articles = [...byGuid.values()].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.guid.localeCompare(b.guid),
  )

  return {
    source: archive.source,
    firstSeenAt: archive.firstSeenAt || toISODate(now),
    lastSyncedAt: now.toISOString(),
    articles,
  }
}
