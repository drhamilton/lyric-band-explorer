import { cx } from '../lib/cx.ts'
import { ALL_GENRES, type GenreFilter as GenreFilterValue } from '../types.ts'

interface GenreFilterProps {
  value: GenreFilterValue
  onChange: (value: GenreFilterValue) => void
}

// The genre pill row from the comp. Exactly one pill is active; 'all' clears the
// genre constraint. Styled but the set is fixed (matches the mock data genres).
const PILLS: { value: GenreFilterValue; label: string }[] = [
  { value: ALL_GENRES, label: 'All' },
  { value: 'country', label: 'Country' },
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
]

const PILL_BASE = 'rounded-full px-4 py-1.5 text-sm font-medium transition-colors'
const PILL_ACTIVE = 'bg-accent text-white'
const PILL_IDLE = 'text-neutral-300 ring-1 ring-white/10 hover:bg-white/5'

export default function GenreFilter({ value, onChange }: GenreFilterProps) {
  return (
    <div role="group" aria-label="Filter by genre" className="flex shrink-0 items-center gap-2">
      {PILLS.map((pill) => {
        const active = pill.value === value
        return (
          <button
            key={pill.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(pill.value)}
            className={cx(PILL_BASE, active ? PILL_ACTIVE : PILL_IDLE)}
          >
            {pill.label}
          </button>
        )
      })}
    </div>
  )
}
