import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import WelcomePanel from './WelcomePanel.tsx'

describe('WelcomePanel', () => {
  it('renders the welcome heading and Coming Soon card', () => {
    render(<WelcomePanel onClose={() => {}} />)
    expect(screen.getByRole('heading', { name: /welcome to lyric music/i })).toBeInTheDocument()
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it('calls onClose when the × is clicked', async () => {
    const onClose = vi.fn()
    render(<WelcomePanel onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: /close welcome panel/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
