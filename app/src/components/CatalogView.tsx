import BandGrid from './BandGrid.tsx'
import ErrorState from './ErrorState.tsx'
import { COPY } from '../copy.ts'
import { STATUS, type Band, type LoadStatus } from '../types.ts'

interface CatalogViewProps {
  status: LoadStatus
  error: Error | null
  /** The already-filtered bands to display. */
  bands: Band[]
  /** Whether a search query or non-'all' genre is narrowing the list. */
  isFiltered: boolean
  selectedId: string | null
  onSelect: (id: string) => void
}

/**
 * Renders the main content region for a given load status: the loading text, the
 * error state, the empty state, or the band grid. Keeps the status branching out
 * of App so App reads as state + composition.
 *
 * The empty state distinguishes "nothing matched the active filter" from "the
 * catalog itself is empty": with no filter active, an empty list can only mean
 * there are no bands to show. Loading/empty are announced via role="status" +
 * aria-live so screen-reader users hear the transitions (the error state carries
 * its own role="alert").
 */
export default function CatalogView({
  status,
  error,
  bands,
  isFiltered,
  selectedId,
  onSelect,
}: CatalogViewProps) {
  if (status === STATUS.Loading) {
    return (
      <p role="status" aria-live="polite" className="text-muted">
        {COPY.loading}
      </p>
    )
  }
  if (status === STATUS.Error) {
    return <ErrorState message={error?.message} />
  }
  if (bands.length === 0) {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-16 text-center text-muted"
      >
        {isFiltered ? COPY.emptyFiltered : COPY.emptyCatalog}
      </p>
    )
  }
  return <BandGrid bands={bands} selectedId={selectedId} onSelect={onSelect} />
}
