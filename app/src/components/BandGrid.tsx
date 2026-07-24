import BandCard from './BandCard.tsx'
import type { Band } from '../types.ts'

interface BandGridProps {
  bands: Band[]
  selectedId: string | null
  onSelect: (id: string) => void
}

/**
 * Grid of band cards. Three per row on desktop (per the comp), collapsing to
 * two then one on narrower widths. `items-stretch` (grid default) + `h-full`
 * cards give every card in a row an equal height.
 */
export default function BandGrid({ bands, selectedId, onSelect }: BandGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bands.map((band) => (
        <BandCard
          key={band.id}
          band={band}
          selected={band.id === selectedId}
          onSelect={() => onSelect(band.id)}
        />
      ))}
    </div>
  )
}
