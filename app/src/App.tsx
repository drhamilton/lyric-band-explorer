import { useMemo, useState } from 'react'
import { useBands } from './hooks/useBands.ts'
import { deriveVisibleBands } from './lib/bands.ts'
import BandGrid from './components/BandGrid.tsx'
import TopBar from './components/TopBar.tsx'

// Genre (#12), welcome panel (#14) land next.
export default function App() {
  const { bands, status } = useBands()
  const [query, setQuery] = useState('')

  const visibleBands = useMemo(
    () => deriveVisibleBands({ bands, query }),
    [bands, query],
  )

  return (
    <div className="min-h-screen bg-bg p-6">
      <TopBar query={query} onQueryChange={setQuery} />

      <main className="mt-6">
        {status === 'loading' && <p className="text-muted">Loading bands…</p>}
        {status === 'error' && (
          <p className="text-red-400">Couldn’t load bands. Please try again.</p>
        )}
        {status === 'ready' && <BandGrid bands={visibleBands} />}
      </main>
    </div>
  )
}
