import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App.tsx'

// App drives the data layer via fetch; stub it so tests don't hit the network.
// The welcome-panel collapse doesn't depend on band data, so an empty list is fine.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, status: 200, json: async () => [] })),
  )
})

describe('App — welcome panel collapse (stretch goal)', () => {
  it('closes the welcome panel and shows a reopen control', async () => {
    render(<App />)

    // Panel visible on load.
    expect(
      await screen.findByRole('heading', { name: /welcome to lyric music/i }),
    ).toBeInTheDocument()

    // Close it.
    await userEvent.click(screen.getByRole('button', { name: /close welcome panel/i }))

    // Panel gone, reopen affordance present.
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: /welcome to lyric music/i }),
      ).not.toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /welcome/i })).toBeInTheDocument()
  })
})
