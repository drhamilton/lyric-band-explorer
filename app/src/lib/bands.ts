import { coverImageUrl } from './images.ts'
import type { Band, BandSummary, GenreFilter } from '../types.ts'

// Data layer for bands: loading band summaries, merging per-band detail, and
// deriving the visible set from search + genre. Kept UI-free so it can be unit
// tested at a single seam (see bands.test.ts).

const BANDS_URL = '/mock_data/bands.json'
const detailUrl = (id: string) => `/mock_data/${id}.json`

/** Minimal fetch signature the data layer needs — lets tests inject a fake. */
export type FetchLike = (url: string) => Promise<{
  ok: boolean
  status: number
  json: () => Promise<unknown>
}>

// Shown when a band has no detail file (only 001 and 005 ship one today).
export const DEFAULT_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
  'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.'

/**
 * Fetch a band's detail description, falling back to the default text on any
 * failure (missing file, non-OK response, invalid JSON). Never throws.
 */
export async function fetchBandDetail(
  id: string,
  fetchImpl: FetchLike = fetch,
): Promise<string> {
  try {
    const res = await fetchImpl(detailUrl(id))
    if (!res.ok) return DEFAULT_DESCRIPTION
    const detail = (await res.json()) as { description?: unknown }
    return typeof detail.description === 'string' && detail.description.trim()
      ? detail.description
      : DEFAULT_DESCRIPTION
  } catch {
    return DEFAULT_DESCRIPTION
  }
}

/**
 * Load all bands: fetch the summary list, then resolve each band's cover image
 * and detail description. Rejects only if the summary list itself fails to load
 * (a whole-app error); per-band detail failures degrade to default text.
 */
export async function loadBands(fetchImpl: FetchLike = fetch): Promise<Band[]> {
  const res = await fetchImpl(BANDS_URL)
  if (!res.ok) throw new Error(`Failed to load bands (${res.status})`)
  const summaries = (await res.json()) as BandSummary[]

  return Promise.all(
    summaries.map(async (band) => ({
      ...band,
      cover: coverImageUrl(band.id),
      description: await fetchBandDetail(band.id, fetchImpl),
    })),
  )
}

/**
 * Pure filter: bands whose name contains the query (case-insensitive, partial)
 * AND whose genre matches the active genre ('all' = no genre constraint).
 * Ordering of the input is preserved.
 */
export function deriveVisibleBands({
  bands,
  query = '',
  genre = 'all',
}: {
  bands: Band[]
  query?: string
  genre?: GenreFilter
}): Band[] {
  const q = query.trim().toLowerCase()
  return bands.filter((band) => {
    const matchesQuery = q === '' || band.band_name.toLowerCase().includes(q)
    const matchesGenre = genre === 'all' || band.genre.toLowerCase() === genre
    return matchesQuery && matchesGenre
  })
}
