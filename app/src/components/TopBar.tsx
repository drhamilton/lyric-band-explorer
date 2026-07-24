import Logo from './Logo.tsx'
import IconBar from './IconBar.tsx'
import SearchBox from './SearchBox.tsx'
import GenreFilter from './GenreFilter.tsx'
import type { GenreFilter as GenreFilterValue } from '../types.ts'

interface TopBarProps {
  query: string
  onQueryChange: (value: string) => void
  genre: GenreFilterValue
  onGenreChange: (value: GenreFilterValue) => void
}

// The top navigation bar. Assembles the logo, the genre pills + search box, and
// the decorative icon bar. Rounded surface panel per the comp.
export default function TopBar({
  query,
  onQueryChange,
  genre,
  onGenreChange,
}: TopBarProps) {
  return (
    <header className="flex items-center gap-6 rounded-2xl bg-surface px-5 py-3">
      <Logo />
      <GenreFilter value={genre} onChange={onGenreChange} />
      <SearchBox value={query} onChange={onQueryChange} />
      <IconBar />
    </header>
  )
}
