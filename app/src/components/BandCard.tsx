import { DEFAULT_COVER } from '../lib/images.ts'
import type { Band } from '../types.ts'

interface BandCardProps {
  band: Band
  selected: boolean
  onSelect: () => void
}

/**
 * A single band card: cover image, band name (accent green), album line, and
 * description. Clicking selects it (indigo border, per the comp). Missing cover
 * images fall back to default.png via onError.
 */
export default function BandCard({ band, selected, onSelect }: BandCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        'overflow-hidden rounded-xl bg-card text-left transition-shadow ring-1 ' +
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
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="p-5">
        <h2 className="text-lg font-semibold text-accent-soft">{band.band_name}</h2>
        <p className="mt-1 text-sm text-neutral-200">{band.album}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{band.description}</p>
      </div>
    </button>
  )
}
