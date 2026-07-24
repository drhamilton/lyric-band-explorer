import { useMemo, useState } from 'react'
import { useBands } from './hooks/useBands.ts'
import { deriveVisibleBands } from './lib/bands.ts'
import { cx } from './lib/cx.ts'
import TopBar from './components/TopBar.tsx'
import CatalogView from './components/CatalogView.tsx'
import WelcomePanel from './components/WelcomePanel.tsx'
import ReopenWelcomeButton from './components/ReopenWelcomeButton.tsx'
import { ALL_GENRES, type GenreFilter } from './types.ts'

export default function App() {
  const { bands, status, error } = useBands()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<GenreFilter>(ALL_GENRES)
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
        className={cx(
          'mt-8 grid gap-8 lg:min-h-0 lg:flex-1 lg:items-stretch',
          welcomeOpen
            ? 'items-start lg:grid-cols-[1fr_var(--width-panel)]'
            : 'grid-cols-1',
        )}
      >
        <main className="lg:min-h-0 lg:overflow-y-auto">
          <CatalogView
            status={status}
            error={error}
            bands={visibleBands}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </main>

        {welcomeOpen && <WelcomePanel onClose={() => setWelcomeOpen(false)} />}
      </div>

      {!welcomeOpen && <ReopenWelcomeButton onClick={() => setWelcomeOpen(true)} />}
    </div>
  )
}
