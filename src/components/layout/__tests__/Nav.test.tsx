import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { chapters } from '../../../content/chapters'
import { profile } from '../../../content/profile'
import { Nav } from '../Nav'

describe('Nav', () => {
  it('links to every chapter by anchor', () => {
    render(<Nav onOpenPalette={() => {}} />)
    for (const chapter of chapters) {
      const link = screen.getByRole('link', { name: new RegExp(chapter.title, 'i') })
      expect(link).toHaveAttribute('href', `#${chapter.id}`)
    }
  })

  it('offers the résumé as a download', () => {
    render(<Nav onOpenPalette={() => {}} />)
    const resume = screen.getByRole('link', { name: /résumé/i })
    expect(resume).toHaveAttribute('href', profile.resumePath)
    expect(resume).toHaveAttribute('download')
  })

  it('shows the availability chip when profile declares one', () => {
    render(<Nav onOpenPalette={() => {}} />)
    expect(screen.getByText(profile.availability!)).toBeInTheDocument()
  })

  it('exposes a labelled button that opens the command palette', () => {
    render(<Nav onOpenPalette={() => {}} />)
    expect(screen.getByRole('button', { name: /command palette/i })).toBeInTheDocument()
  })

  it('is a navigation landmark', () => {
    render(<Nav onOpenPalette={() => {}} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
