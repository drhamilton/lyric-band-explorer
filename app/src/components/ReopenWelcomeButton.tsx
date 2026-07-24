import { FiInfo } from 'react-icons/fi'

/** Floating affordance to reopen the welcome panel once it's been closed. */
export default function ReopenWelcomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-accent-soft"
    >
      <FiInfo className="h-4 w-4" />
      Welcome
    </button>
  )
}
