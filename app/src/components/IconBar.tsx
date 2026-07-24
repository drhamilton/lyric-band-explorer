import { FiBell, FiSettings, FiMessageCircle } from 'react-icons/fi'

// Decorative top-right icons from the comp. Non-functional per the brief, but
// rendered as buttons with accessible labels so they read as real controls.
const ICONS = [
  { Icon: FiBell, label: 'Notifications' },
  { Icon: FiSettings, label: 'Settings' },
  { Icon: FiMessageCircle, label: 'Messages' },
]

export default function IconBar() {
  return (
    <nav aria-label="Utilities" className="flex shrink-0 items-center gap-4">
      {ICONS.map(({ Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="text-muted transition-colors hover:text-neutral-200"
        >
          <Icon className="h-5 w-5" />
        </button>
      ))}
    </nav>
  )
}
