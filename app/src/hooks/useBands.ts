import { useEffect, useState } from 'react'
import { loadBands } from '../lib/bands.ts'
import { STATUS, type Band, type LoadStatus } from '../types.ts'

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
  const [status, setStatus] = useState<LoadStatus>(STATUS.Loading)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    setStatus(STATUS.Loading)
    loadBands()
      .then((result) => {
        if (cancelled) return
        setBands(result)
        setStatus(STATUS.Ready)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setStatus(STATUS.Error)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { bands, status, error }
}
