import { useEffect, useState } from 'react'
import { loadBands } from '../lib/bands.ts'
import type { Band, LoadStatus } from '../types.ts'

interface UseBandsResult {
  bands: Band[]
  status: LoadStatus
  error: Error | null
}

// React entry point to the band data layer. Owns the async lifecycle only;
// the actual fetching/merging/filtering lives in ../lib/bands.ts so it stays
// testable without React.
export function useBands(): UseBandsResult {
  const [bands, setBands] = useState<Band[]>([])
  const [status, setStatus] = useState<LoadStatus>('loading')
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    loadBands()
      .then((result) => {
        if (cancelled) return
        setBands(result)
        setStatus('ready')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { bands, status, error }
}
