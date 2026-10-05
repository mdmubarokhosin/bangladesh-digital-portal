'use client'

import * as React from 'react'
import { useLanguage } from '@/stores/use-language'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/**
 * Lightweight data fetch hook with language as a re-fetch trigger.
 */
export function useFetch<T>(url: string | null): FetchState<T> {
  const { lang } = useLanguage()
  const [state, setState] = React.useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  // Include language in dep so refetch happens if user toggles lang (when endpoint is lang-aware)
  const cacheRef = React.useRef<Map<string, T>>(new Map())
  const key = `${url}::${lang}`

  React.useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null })
      return
    }

    let cancelled = false
    if (cacheRef.current.has(key)) {
      setState({ data: cacheRef.current.get(key) as T, loading: false, error: null })
      return
    }
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const json = await r.json()
        if (cancelled) return
        if (json.success === false) {
          throw new Error(json.error?.message ?? 'Fetch failed')
        }
        const data = json.data as T
        cacheRef.current.set(key, data)
        setState({ data, loading: false, error: null })
      })
      .catch((e) => {
        if (cancelled) return
        setState({ data: null, loading: false, error: e.message })
      })

    return () => {
      cancelled = true
    }
  }, [url, lang, key])

  return state
}
