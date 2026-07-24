import { describe, it, expect } from 'vitest'
import {
  loadBands,
  fetchBandDetail,
  deriveVisibleBands,
  DEFAULT_DESCRIPTION,
  type FetchLike,
} from './bands.ts'
import type { Band } from '../types.ts'

// A small fixture of fully-hydrated bands for the pure filter tests.
const BANDS: Band[] = [
  { id: '001', band_name: 'The Velvet Echo', album: 'Whispers', genre: 'rock', cover: '', description: '' },
  { id: '002', band_name: 'Silver Strings', album: 'Resonance', genre: 'country', cover: '', description: '' },
  { id: '004', band_name: 'Crimson Groove', album: 'Scarlet', genre: 'pop', cover: '', description: '' },
]

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

describe('deriveVisibleBands — search', () => {
  it('returns all bands when the query is empty', () => {
    expect(deriveVisibleBands({ bands: BANDS, query: '' })).toHaveLength(3)
  })

  it('matches partial names, case-insensitively', () => {
    const result = deriveVisibleBands({ bands: BANDS, query: 'sil' })
    expect(result.map((b) => b.id)).toEqual(['002'])
    expect(deriveVisibleBands({ bands: BANDS, query: 'ECHO' }).map((b) => b.id)).toEqual(['001'])
  })

  it('trims whitespace-only queries to "match all"', () => {
    expect(deriveVisibleBands({ bands: BANDS, query: '   ' })).toHaveLength(3)
  })

  it('returns an empty list when nothing matches', () => {
    expect(deriveVisibleBands({ bands: BANDS, query: 'zzz' })).toEqual([])
  })

  it('preserves input ordering', () => {
    const result = deriveVisibleBands({ bands: BANDS, query: 's' })
    expect(result.map((b) => b.id)).toEqual(['002', '004'])
  })
})

describe('deriveVisibleBands — genre + combined', () => {
  it("'all' returns every band", () => {
    expect(deriveVisibleBands({ bands: BANDS, genre: 'all' })).toHaveLength(3)
  })

  it('filters to a single genre', () => {
    expect(deriveVisibleBands({ bands: BANDS, genre: 'rock' }).map((b) => b.id)).toEqual(['001'])
    expect(deriveVisibleBands({ bands: BANDS, genre: 'pop' }).map((b) => b.id)).toEqual(['004'])
  })

  it('applies query AND genre together', () => {
    // 'e' matches Velvet Echo (rock) + Silver Strings (country) + Crimson Groove... "crimson groove" has no 'e'? -> it does not
    const rockAndE = deriveVisibleBands({ bands: BANDS, query: 'e', genre: 'rock' })
    expect(rockAndE.map((b) => b.id)).toEqual(['001'])
  })

  it('returns empty when query and genre have no overlap', () => {
    // 'velvet' is a rock band; asking for pop yields nothing
    expect(deriveVisibleBands({ bands: BANDS, query: 'velvet', genre: 'pop' })).toEqual([])
  })
})
