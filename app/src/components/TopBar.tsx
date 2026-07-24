import Logo from './Logo.tsx'
import IconBar from './IconBar.tsx'
import SearchBox from './SearchBox.tsx'

interface TopBarProps {
  query: string
  onQueryChange: (value: string) => void
}

// The top navigation bar. Assembles the logo, the filter/search region, and the
// decorative icon bar. Rounded surface panel per the comp.
export default function TopBar({ query, onQueryChange }: TopBarProps) {
  return (
    <header className="flex items-center gap-6 rounded-2xl bg-surface px-5 py-3">
      <Logo />
      {/* Genre pills (#12) join the search box in this middle region. */}
      <SearchBox value={query} onChange={onQueryChange} />
      <IconBar />
    </header>
  )
}
