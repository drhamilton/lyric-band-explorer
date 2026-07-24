import { FiAlertTriangle } from 'react-icons/fi'

/** Graceful inline error shown when the band list fails to load. */
export default function ErrorState({ message }: { message?: string }) {
  return (
    <div
      role="alert"
      className="mx-auto mt-16 flex max-w-md flex-col items-center gap-3 rounded-2xl bg-surface p-8 text-center"
    >
      <FiAlertTriangle className="h-8 w-8 text-red-400" aria-hidden />
      <p className="font-semibold text-neutral-100">Couldn’t load bands</p>
      <p className="text-sm text-muted">
        {message ?? 'Something went wrong while fetching the catalog. Please try again.'}
      </p>
    </div>
  )
}
