'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, X, Landmark } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { MinistryCard } from '@/components/ministry-card'
import { useLanguage } from '@/stores/use-language'
import { getMinistriesStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'
import type { Ministry } from '@/lib/bd/types'

interface MinistryWithCounts extends Ministry {
  _count: { organizations: number; services: number }
}

export function MinistriesView() {
  const { lang } = useLanguage()
  const [query, setQuery] = React.useState('')

  // Static data — synchronous
  const data = React.useMemo<MinistryWithCounts[]>(
    () => getMinistriesStatic() as unknown as MinistryWithCounts[],
    []
  )
  const loading = false

  const filtered = React.useMemo(() => {
    if (!data) return []
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter(
      (m) =>
        m.nameBn.includes(query) ||
        m.nameEn.toLowerCase().includes(q)
    )
  }, [data, query])

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {tr('ministries', lang)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn'
            ? 'বাংলাদেশ সরকারের সকল মন্ত্রণালয় ও বিভাগ'
            : 'All ministries and divisions of the Government of Bangladesh'}
        </p>
      </motion.div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tr('search', lang)}
          className="pl-10 h-11 rounded-full bg-muted/50 border-transparent focus-visible:border-primary max-w-xl"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Landmark className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MinistryCard key={m.id} ministry={m} />
          ))}
        </div>
      )}
    </div>
  )
}
