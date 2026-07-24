import { DEFAULT_COVER } from '../lib/images.ts'
import type { Band } from '../types.ts'

interface BandCardProps {
  band: Band
  selected: boolean
  onSelect: () => void
}

/**
 * A single band card: cover image, band name, album line, description. Cards are
 * uniform height (flex column, h-full in the grid) and share one image height
 * (fixed 16:9 on equal-width columns). Type specs come straight from the comp.
 * Clicking selects it (indigo border). Missing covers fall back to default.png.
 */
export default function BandCard({ band, selected, onSelect }: BandCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        'flex h-full flex-col overflow-hidden rounded-xl bg-card text-left transition-shadow ring-1 ' +
        (selected ? 'ring-2 ring-selected' : 'ring-white/5 hover:ring-white/20')
      }
    >
      <img
        src={band.cover}
        alt={`${band.band_name} — ${band.album}`}
        loading="lazy"
        onError={(e) => {
          // Fall back once; avoid an error loop if default.png also fails.
          const img = e.currentTarget
          if (img.src.endsWith(DEFAULT_COVER)) return
          img.src = DEFAULT_COVER
        }}
        className="aspect-[16/9] w-full shrink-0 object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        {/* Title: #007264, Inter Bold 20/700 */}
        <h2 className="text-[20px] font-bold leading-tight text-accent">
          {band.band_name}
        </h2>
        {/* Album: #cbcbcb, Inter Regular 13/400 */}
        <p className="mt-2 text-[13px] font-normal text-[#cbcbcb]">{band.album}</p>
        {/* Description: #9c9c9c, Inter Regular 13/400 */}
        <p className="mt-3 line-clamp-4 text-[13px] font-normal leading-relaxed text-[#9c9c9c]">
          {band.description}
        </p>
      </div>
    </button>
  )
}
