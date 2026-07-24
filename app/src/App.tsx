import { useMemo, useState } from 'react'
import { useBands } from './hooks/useBands.ts'
import { deriveVisibleBands } from './lib/bands.ts'
import BandGrid from './components/BandGrid.tsx'
import TopBar from './components/TopBar.tsx'
import type { GenreFilter } from './types.ts'

// Welcome panel (#14) lands next.
export default function App() {
  const { bands, status } = useBands()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<GenreFilter>('all')

  const visibleBands = useMemo(
    () => deriveVisibleBands({ bands, query, genre }),
    [bands, query, genre],
  )

  return (
    <div className="min-h-screen bg-bg p-6">
      <TopBar
        query={query}
        onQueryChange={setQuery}
        genre={genre}
        onGenreChange={setGenre}
      />

      <main className="mt-6">
        {status === 'loading' && <p className="text-muted">Loading bands…</p>}
        {status === 'error' && (
          <p className="text-red-400">Couldn’t load bands. Please try again.</p>
        )}
        {status === 'ready' &&
          (visibleBands.length > 0 ? (
            <BandGrid bands={visibleBands} />
          ) : (
            <p className="mt-16 text-center text-muted">
              No bands match your search and filter.
            </p>
          ))}
      </main>
    </div>
  )
}
