import { FiX } from 'react-icons/fi'

interface WelcomePanelProps {
  onClose: () => void
}

// Static right-hand copy panel from the comp. Content is placeholder marketing
// copy (original wording). Closable via the × — closing expands the band grid.
export default function WelcomePanel({ onClose }: WelcomePanelProps) {
  return (
    <aside className="flex flex-col gap-6 rounded-2xl bg-panel p-6 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-accent-soft">Welcome to Lyric Music</h2>
        <button
          type="button"
          aria-label="Close welcome panel"
          onClick={onClose}
          className="shrink-0 text-muted transition-colors hover:text-neutral-100"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
        <p>
          We’re thrilled to have you join us on this musical journey. Lyric Music is
          your gateway to a fresh, immersive way to enjoy the bands and artists you
          love — search your favorites, explore curated picks, and discover the
          songs that become your next go-to anthems.
        </p>
        <p>
          Imagine the perfect soundtrack for every moment, from energizing workouts
          to quiet evenings under the stars. With an interface designed to make
          finding music effortless, you’ll spend less time searching and more time
          listening.
        </p>
        <p>
          At Lyric Music we’re passionate about building a community where music
          lovers can explore, connect, and celebrate the power of sound. Dive in,
          press play, and let the music move you.
        </p>
      </div>

      <div className="mt-auto flex items-center gap-4 rounded-xl bg-surface p-4">
        <img
          src="/sources/lyric_lg_rgb_mnt_wht.png"
          alt=""
          aria-hidden
          className="h-8 w-auto opacity-90"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-soft">
            Coming Soon
          </p>
          <p className="text-xs text-muted">
            Check out what’s new for 2025 from the Lyric team.
          </p>
        </div>
      </div>
    </aside>
  )
}
