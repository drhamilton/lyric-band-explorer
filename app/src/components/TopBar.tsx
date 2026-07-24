import Logo from './Logo.tsx'
import IconBar from './IconBar.tsx'

// The top navigation bar. Assembles the logo, the filter/search region (added in
// #11/#12), and the decorative icon bar. Rounded surface panel per the comp.
export default function TopBar() {
  return (
    <header className="flex items-center gap-6 rounded-2xl bg-surface px-5 py-3">
      <Logo />
      {/* Filter pills (#12) + search (#11) land in this middle region. */}
      <div className="flex-1" />
      <IconBar />
    </header>
  )
}
