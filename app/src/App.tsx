import { useBands } from './hooks/useBands.ts'
import BandGrid from './components/BandGrid.tsx'

// Tracer bullet (#10): load bands end-to-end and render the grid.
// Top bar chrome (#13), search (#11), genre (#12), welcome panel (#14) land next.
export default function App() {
  const { bands, status } = useBands()

  return (
    <div className="min-h-screen bg-bg p-6">
      <header className="mb-6 rounded-2xl bg-surface px-6 py-4">
        <span className="text-xl font-bold text-white">Lyric</span>
        <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-accent-soft">
          Music
        </span>
      </header>

      <main>
        {status === 'loading' && <p className="text-muted">Loading bands…</p>}
        {status === 'error' && (
          <p className="text-red-400">Couldn’t load bands. Please try again.</p>
        )}
        {status === 'ready' && <BandGrid bands={bands} />}
      </main>
    </div>
  )
}
