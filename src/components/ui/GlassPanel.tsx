import type { HTMLAttributes, ReactNode } from 'react'
import { useCursorGlow } from '../../hooks/useCursorGlow'

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article' | 'aside'
  /** Adds the cursor-tracked radial highlight. Off by default. */
  glow?: boolean
  children: ReactNode
}

export function GlassPanel({
  as: Tag = 'div',
  glow = false,
  className = '',
  children,
  ...rest
}: GlassPanelProps) {
  const { onMouseMove, onMouseLeave } = useCursorGlow()
  const glowProps = glow ? { onMouseMove, onMouseLeave } : {}

  return (
    <Tag className={`glass ${glow ? 'glass-glow' : ''} ${className}`.trim()} {...glowProps} {...rest}>
      {children}
    </Tag>
  )
}
