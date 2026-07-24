import { FiSearch } from 'react-icons/fi'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

/** Rounded search pill with a leading magnifier icon. Filters bands by name. */
export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-bg px-4 py-2 ring-1 ring-white/10 focus-within:ring-accent">
      <FiSearch className="h-4 w-4 shrink-0 text-muted" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search bands…"
        aria-label="Search bands by name"
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-100 placeholder:text-muted focus:outline-none"
      />
    </div>
  )
}
