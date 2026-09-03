import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CopyableCommand } from '../CopyableCommand'

const COMMAND = 'brew install tomjosetj31/spaceload/spaceload'

function stubClipboard(impl: () => Promise<void>) {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(impl) } })
  return navigator.clipboard.writeText as unknown as ReturnType<typeof vi.fn>
}

describe('CopyableCommand', () => {
  it('shows the command', () => {
    render(<CopyableCommand label="Install" command={COMMAND} />)
    expect(screen.getByText(COMMAND)).toBeInTheDocument()
  })

  it('writes the command to the clipboard when clicked', async () => {
    const writeText = stubClipboard(async () => {})
    render(<CopyableCommand label="Install" command={COMMAND} />)
    await userEvent.click(screen.getByRole('button'))
    expect(writeText).toHaveBeenCalledWith(COMMAND)
  })

  it('confirms the copy to the user', async () => {
    stubClipboard(async () => {})
    render(<CopyableCommand label="Install" command={COMMAND} />)
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/copied/i))
  })

  it('exposes an accessible name that names the command', () => {
    render(<CopyableCommand label="Install" command={COMMAND} />)
    expect(screen.getByRole('button')).toHaveAccessibleName(`Copy command: ${COMMAND}`)
  })

  it('does not crash when the clipboard write is rejected', async () => {
    stubClipboard(async () => {
      throw new Error('denied')
    })
    render(<CopyableCommand label="Install" command={COMMAND} />)
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/failed/i))
  })

  it('does not crash when the clipboard API is missing entirely', async () => {
    Object.assign(navigator, { clipboard: undefined })
    render(<CopyableCommand label="Install" command={COMMAND} />)
    await userEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/failed/i))
  })
})
