import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CountUp } from '../CountUp'

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((media: string) => ({
    matches,
    media,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  setReducedMotion(false)
})

describe('CountUp', () => {
  it('reaches the target value', async () => {
    render(<CountUp value={40} />)
    await waitFor(() => expect(screen.getByText('40')).toBeInTheDocument(), { timeout: 2000 })
  })

  it('renders the final value immediately under reduced motion', () => {
    setReducedMotion(true)
    render(<CountUp value={30} />)
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('appends a suffix', async () => {
    render(<CountUp value={40} suffix="%" />)
    await waitFor(() => expect(screen.getByText('40%')).toBeInTheDocument(), { timeout: 2000 })
  })

  it('renders decimals when asked', async () => {
    render(<CountUp value={4.2} decimals={1} />)
    await waitFor(() => expect(screen.getByText('4.2')).toBeInTheDocument(), { timeout: 2000 })
  })

  it('renders zero without animating to something else', () => {
    setReducedMotion(true)
    render(<CountUp value={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders final value on first render under reduced motion without flash', () => {
    setReducedMotion(true)
    const { container } = render(<CountUp value={42} />)
    // Assert immediately after render, without waitFor, proves no flash occurs
    expect(container.textContent).toBe('42')
  })
})
