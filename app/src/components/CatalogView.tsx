import BandGrid from './BandGrid.tsx'
import ErrorState from './ErrorState.tsx'
import { COPY } from '../copy.ts'
import { STATUS, type Band, type LoadStatus } from '../types.ts'

interface CatalogViewProps {
  status: LoadStatus
  error: Error | null
  /** The already-filtered bands to display. */
  bands: Band[]
  selectedId: string | null
  onSelect: (id: string) => void
}

/**
 * Renders the main content region for a given load status: the loading text, the
 * error state, the empty state, or the band grid. Keeps the status branching out
 * of App so App reads as state + composition.
 */
export default function CatalogView({
  status,
  error,
  bands,
  selectedId,
  onSelect,
}: CatalogViewProps) {
  if (status === STATUS.Loading) {
    return <p className="text-muted">{COPY.loading}</p>
  }
  if (status === STATUS.Error) {
    return <ErrorState message={error?.message} />
  }
  if (bands.length === 0) {
    return <p className="mt-16 text-center text-muted">{COPY.emptyFiltered}</p>
  }
  return <BandGrid bands={bands} selectedId={selectedId} onSelect={onSelect} />
}
