import type { ReactNode } from 'react'
import type { Product } from '../../content/types'
import { CopyableCommand } from './CopyableCommand'
import { GlassPanel } from './GlassPanel'
import { MonoLabel } from './MonoLabel'
import { Tag } from './Tag'

/**
 * Splits `text` on backtick-delimited spans and wraps each one in an inline
 * `<code>` element. products.ts uses backticks to mark literal commands (e.g.
 * `spaceload run`) — rendered naively those characters would show up as
 * literal backticks on the page, so every span between a pair of backticks
 * becomes code instead of plain text.
 */
function renderWithInlineCode(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan-soft)',
          }}
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export function ProductCard({ product }: { product: Product }) {
  const featured = product.featured === true

  return (
    <GlassPanel
      as="article"
      glow
      data-featured={featured ? 'true' : 'false'}
      className="h-full px-4 py-4"
      style={
        featured
          ? {
              borderColor: 'rgba(167,139,250,0.38)',
              background:
                'linear-gradient(150deg, rgba(167,139,250,0.10), rgba(255,255,255,0.035))',
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="m-0 text-[16px] font-bold" style={{ letterSpacing: '-0.025em' }}>
          {product.name}
        </h3>
        <span
          style={{
            font: '600 8.5px/1 var(--font-mono)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--status-green)',
            border: '1px solid rgba(134,239,172,0.3)',
            background: 'rgba(134,239,172,0.08)',
            padding: '4.5px 7px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
          }}
        >
          {product.status}
        </span>
      </div>

      <p className="mt-2 text-[11.5px] leading-[1.5] font-medium" style={{ color: 'var(--text-2)' }}>
        {product.tagline}
      </p>
      <p className="mt-2 text-[11.3px] leading-[1.55]" style={{ color: 'var(--text-3)' }}>
        {renderWithInlineCode(product.problem)}
      </p>

      {product.install && (
        <CopyableCommand label={product.install.label} command={product.install.command} />
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3.5">
        {product.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            style={{
              font: '600 10px/1 var(--font-mono)',
              letterSpacing: '0.08em',
              color: '#c4b5fd',
            }}
          >
            {link.label} ↗
          </a>
        ))}
        {typeof product.stars === 'number' && (
          <MonoLabel aria-label={`${product.stars} GitHub stars`}>★ {product.stars}</MonoLabel>
        )}
      </div>
    </GlassPanel>
  )
}
