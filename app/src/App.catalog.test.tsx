import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import App from './App.tsx'

// End-to-end (App-level) behavior tests the spec's Testing Decisions call for:
// real cards render through the App and search/genre/selection are exercised
// through the DOM. fetch is stubbed with a small catalog so no network is hit.

const BANDS = [
  { id: '001', band_name: 'The Velvet Echo', album: 'Whispers', genre: 'rock' },
  { id: '002', band_name: 'Silver Strings', album: 'Resonance', genre: 'country' },
  { id: '004', band_name: 'Crimson Groove', album: 'Scarlet', genre: 'pop' },
]
const DETAIL: Record<string, unknown> = {
  '001': { id: '001', description: 'Haunting melodies', album: 'Whispers' },
}

function stubFetch(bands: unknown = BANDS) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      if (url === '/mock_data/bands.json') {
        return { ok: true, status: 200, json: async () => bands }
      }
      const m = url.match(/\/mock_data\/(\d+)\.json$/)
      if (m && DETAIL[m[1]]) {
        return { ok: true, status: 200, json: async () => DETAIL[m[1]] }
      }
      return { ok: false, status: 404, json: async () => ({}) }
    }),
  )
}

const card = (name: RegExp) => screen.queryByRole('button', { name })
const searchbox = () => screen.getByRole('searchbox', { name: /search bands/i })

beforeEach(() => stubFetch())
afterEach(() => vi.unstubAllGlobals())

describe('App — catalog behavior', () => {
  it('renders a card per band after load', async () => {
    render(<App />)
    expect(await screen.findByRole('button', { name: /the velvet echo/i })).toBeInTheDocument()
    expect(card(/silver strings/i)).toBeInTheDocument()
    expect(card(/crimson groove/i)).toBeInTheDocument()
  })

  it('search narrows the rendered cards by name', async () => {
    render(<App />)
    await screen.findByRole('button', { name: /the velvet echo/i })
    await userEvent.type(searchbox(), 'silver')
    expect(card(/silver strings/i)).toBeInTheDocument()
    expect(card(/the velvet echo/i)).not.toBeInTheDocument()
    expect(card(/crimson groove/i)).not.toBeInTheDocument()
  })

  it('a genre pill narrows results and becomes active', async () => {
    render(<App />)
    await screen.findByRole('button', { name: /the velvet echo/i })
    const rock = screen.getByRole('button', { name: 'Rock' })
    await userEvent.click(rock)
    expect(rock).toHaveAttribute('aria-pressed', 'true')
    expect(card(/the velvet echo/i)).toBeInTheDocument()
    expect(card(/silver strings/i)).not.toBeInTheDocument()
  })

  it('shows the "no matches" empty state when genre + search overlap to nothing', async () => {
    render(<App />)
    await screen.findByRole('button', { name: /the velvet echo/i })
    await userEvent.click(screen.getByRole('button', { name: 'Pop' })) // → Crimson Groove only
    await userEvent.type(searchbox(), 'velvet') // no pop band named "velvet"
    expect(screen.getByText(/no bands match/i)).toBeInTheDocument()
  })

  it('selects a card on click (aria-pressed toggles on)', async () => {
    render(<App />)
    const velvet = await screen.findByRole('button', { name: /the velvet echo/i })
    expect(velvet).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(velvet)
    expect(velvet).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows "No bands available" (not the filtered message) for an empty catalog', async () => {
    stubFetch([])
    render(<App />)
    expect(await screen.findByText(/no bands available/i)).toBeInTheDocument()
  })
})
