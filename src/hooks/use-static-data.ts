'use client'

import * as React from 'react'

/**
 * Simulate async data loading for static data.
 * Used by views that previously called `/api/...` endpoints.
 *
 * In static export mode, there are no API routes — instead we pass
 * already-loaded synchronous data and this hook just exposes it with
 * the same {data, loading, error} shape so views don't need to change much.
 *
 * Usage:
 *   const data = useStaticData(() => getServicesStatic())
 */
export function useStaticData<T>(loader: () => T, deps: React.DependencyList = []): {
  data: T | null
  loading: boolean
  error: string | null
} {
  const [state, setState] = React.useState<{
    data: T | null
    loading: boolean
    error: string | null
  }>({ data: null, loading: true, error: null })

  React.useEffect(() => {
    try {
      const data = loader()
      setState({ data, loading: false, error: null })
    } catch (e: any) {
      setState({ data: null, loading: false, error: e?.message ?? 'Error' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
