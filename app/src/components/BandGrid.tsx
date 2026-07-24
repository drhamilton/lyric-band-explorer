import BandCard from './BandCard.tsx'
import type { Band } from '../types.ts'

interface BandGridProps {
  bands: Band[]
  selectedId: string | null
  onSelect: (id: string) => void
}

/** Responsive grid of band cards; columns reflow to the available width. */
export default function BandGrid({ bands, selectedId, onSelect }: BandGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
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
