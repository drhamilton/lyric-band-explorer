import { describe, it, expect } from 'vitest'
import {
  loadBands,
  fetchBandDetail,
  DEFAULT_DESCRIPTION,
  type FetchLike,
} from './bands.ts'

type Route = { body?: unknown; ok?: boolean; status?: number; throws?: boolean }

// Build a fake fetch from a { url: route } map so the data layer can be
// tested without a network or the DOM.
function fakeFetch(routes: Record<string, Route>): FetchLike {
  return async (url: string) => {
    const entry = routes[url]
    if (!entry) return { ok: false, status: 404, json: async () => ({}) }
    if (entry.throws) throw new Error('network down')
    return {
      ok: entry.ok ?? true,
      status: entry.status ?? 200,
      json: async () => entry.body,
    }
  }
}

describe('fetchBandDetail', () => {
  it('returns the description from the detail file when present', async () => {
    const fetch = fakeFetch({ '/mock_data/001.json': { body: { description: 'Real text' } } })
    expect(await fetchBandDetail('001', fetch)).toBe('Real text')
  })

  it('falls back to default when the detail file is missing', async () => {
    const fetch = fakeFetch({}) // 404 for everything
    expect(await fetchBandDetail('006', fetch)).toBe(DEFAULT_DESCRIPTION)
  })

  it('falls back to default when the fetch throws', async () => {
    const fetch = fakeFetch({ '/mock_data/009.json': { throws: true } })
    expect(await fetchBandDetail('009', fetch)).toBe(DEFAULT_DESCRIPTION)
  })
})

describe('loadBands', () => {
  it('merges cover + description onto each summary; rejects only on summary failure', async () => {
    const fetch = fakeFetch({
      '/mock_data/bands.json': {
        body: [
          { id: '001', band_name: 'The Velvet Echo', album: 'Whispers', genre: 'rock' },
          { id: '004', band_name: 'Crimson Groove', album: 'Scarlet', genre: 'pop' },
        ],
      },
      '/mock_data/001.json': { body: { description: 'Haunting melodies' } },
      // 004 has no detail file -> default description
    })

    const bands = await loadBands(fetch)
    expect(bands).toHaveLength(2)
    expect(bands[0]).toMatchObject({
      id: '001',
      cover: '/sources/im001.png',
      description: 'Haunting melodies',
    })
    expect(bands[1]).toMatchObject({
      id: '004',
      cover: '/sources/im004.png',
      description: DEFAULT_DESCRIPTION,
    })
  })

  it('rejects when the band summary list fails to load', async () => {
    const fetch = fakeFetch({}) // bands.json 404
    await expect(loadBands(fetch)).rejects.toThrow(/Failed to load bands/)
  })
})
