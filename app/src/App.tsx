import { useMemo, useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import { useBands } from './hooks/useBands.ts'
import { deriveVisibleBands } from './lib/bands.ts'
import BandGrid from './components/BandGrid.tsx'
import TopBar from './components/TopBar.tsx'
import WelcomePanel from './components/WelcomePanel.tsx'
import ErrorState from './components/ErrorState.tsx'
import type { GenreFilter } from './types.ts'

export default function App() {
  const { bands, status, error } = useBands()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<GenreFilter>('all')
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visibleBands = useMemo(
    () => deriveVisibleBands({ bands, query, genre }),
    [bands, query, genre],
  )

  return (
    // Fixed-height app shell on desktop: the top bar stays put and the content
    // row fills the remaining viewport height, so the grid and welcome panel
    // scroll internally instead of the whole page. Falls back to normal page
    // flow below lg.
    <div className="min-h-screen bg-bg p-6 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
      <TopBar
        query={query}
        onQueryChange={setQuery}
        genre={genre}
        onGenreChange={setGenre}
      />

      {/* Two-column layout: band grid + welcome panel. When the panel is
          closed, the grid column takes the full width and reflows wider. */}
      <div
        className={
          'mt-8 grid gap-8 lg:min-h-0 lg:flex-1 lg:items-stretch ' +
          (welcomeOpen
            ? 'items-start lg:grid-cols-[1fr_var(--width-panel)]'
            : 'grid-cols-1')
        }
      >
        <main className="lg:min-h-0 lg:overflow-y-auto">
          {status === 'loading' && <p className="text-muted">Loading bands…</p>}
          {status === 'error' && <ErrorState message={error?.message} />}
          {status === 'ready' &&
            (visibleBands.length > 0 ? (
              <BandGrid
                bands={visibleBands}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ) : (
              <p className="mt-16 text-center text-muted">
                No bands match your search and filter.
              </p>
            ))}
        </main>

        {welcomeOpen && <WelcomePanel onClose={() => setWelcomeOpen(false)} />}
      </div>

      {/* Reopen affordance once the panel is closed. */}
      {!welcomeOpen && (
        <button
          type="button"
          onClick={() => setWelcomeOpen(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-accent-soft"
        >
          <FiInfo className="h-4 w-4" />
          Welcome
        </button>
      )}
    </div>
  )
}
