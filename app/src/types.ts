// Shared domain types. Vocabulary follows CONTEXT.md.

/** A band's genre as it appears in bands.json. */
export type Genre = 'rock' | 'country' | 'pop'

/** The genre-filter selection: a real genre, or 'all' (no constraint). */
export type GenreFilter = 'all' | Genre

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

/** Loading lifecycle for the band data. */
export type LoadStatus = 'loading' | 'ready' | 'error'
