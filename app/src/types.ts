// Shared domain types. Vocabulary follows CONTEXT.md.

/** A band's genre as it appears in bands.json. */
export type Genre = 'rock' | 'country' | 'pop'

/** The genre-filter selection: a real genre, or 'all' (no constraint). */
export type GenreFilter = 'all' | Genre

/** The "no genre constraint" sentinel for the filter. */
export const ALL_GENRES = 'all' as const

/** A record from bands.json (a "band summary"). */
export interface BandSummary {
  id: string
  band_name: string
  album: string
  genre: Genre
}

/** A band summary enriched with its resolved cover image and detail text. */
export interface Band extends BandSummary {
  cover: string
  description: string
}

/**
 * Loading lifecycle for the band data. The string union already prevents typos
 * at compile time; `STATUS` gives a single source + autocomplete so the literals
 * aren't scattered across the hook and the view.
 */
export const STATUS = {
  Loading: 'loading',
  Ready: 'ready',
  Error: 'error',
} as const

export type LoadStatus = (typeof STATUS)[keyof typeof STATUS]
