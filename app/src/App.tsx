import { useBands } from './hooks/useBands.ts'
import BandGrid from './components/BandGrid.tsx'
import TopBar from './components/TopBar.tsx'

// Search (#11), genre (#12), welcome panel (#14) land next.
export default function App() {
  const { bands, status } = useBands()

  return (
    <div className="min-h-screen bg-bg p-6">
      <TopBar />

      <main className="mt-6">
        {status === 'loading' && <p className="text-muted">Loading bands…</p>}
        {status === 'error' && (
          <p className="text-red-400">Couldn’t load bands. Please try again.</p>
        )}
        {status === 'ready' && <BandGrid bands={bands} />}
      </main>
    </div>
  )
}
