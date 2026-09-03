import { chapters } from '../../content/chapters'
import { profile } from '../../content/profile'
import { MonoLabel } from '../ui/MonoLabel'
import { StatusChip } from '../ui/StatusChip'

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <nav
      className="sticky top-0 z-20 border-b border-white/[0.07]"
      style={{ backdropFilter: 'blur(16px) saturate(140%)', background: 'rgba(5,6,15,0.62)' }}
    >
      <div className="shell flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="grid h-6 w-6 place-items-center rounded-md text-[10px] font-extrabold"
            style={{ background: 'linear-gradient(135deg, var(--aurora-violet), var(--aurora-cyan))' }}
          >
            {profile.monogram}
          </span>
          <span className="text-[12.5px] font-semibold tracking-tight">{profile.name}</span>
        </a>

        <div className="flex items-center gap-4">
          {profile.availability && (
            <span className="hidden sm:inline-flex">
              <StatusChip>{profile.availability}</StatusChip>
            </span>
          )}

          <ul className="hidden items-center gap-4 md:flex">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="text-[11.5px] font-medium"
                  style={{ color: 'var(--text-2)' }}
                >
                  {chapter.num} {chapter.title}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="rounded-[5px] border px-1.5 py-1"
            style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}
          >
            <MonoLabel>⌘K</MonoLabel>
          </button>

          <a
            href={profile.resumePath}
            download
            className="rounded-[7px] px-3 py-[7px] text-[11px] font-semibold"
            style={{ background: '#f4f6ff', color: '#05060f' }}
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </nav>
  )
}
