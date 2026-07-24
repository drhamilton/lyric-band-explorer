import BandCard from './BandCard.tsx'
import type { Band } from '../types.ts'

/** Responsive grid of band cards. */
export default function BandGrid({ bands }: { bands: Band[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {bands.map((band) => (
        <BandCard key={band.id} band={band} />
      ))}
    </div>
  )
}
