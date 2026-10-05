'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, X, Building2 } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { OrganizationCard } from '@/components/organization-card'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { tr } from '@/lib/i18n'
import { getOrganizationsStatic } from '@/lib/bd/client-data'
import type { GovernmentOrganization, Ministry } from '@/lib/bd/types'

interface OrgWithMinistry extends GovernmentOrganization {
  ministry: Ministry | null
  _count?: { services: number }
}

const TYPES = [
  { key: 'all', labelBn: 'সব', labelEn: 'All' },
  { key: 'directorate', labelBn: 'অধিদপ্তর', labelEn: 'Directorate' },
  { key: 'department', labelBn: 'বিভাগ', labelEn: 'Department' },
  { key: 'authority', labelBn: 'কর্তৃপক্ষ', labelEn: 'Authority' },
  { key: 'board', labelBn: 'বোর্ড', labelEn: 'Board' },
  { key: 'commission', labelBn: 'কমিশন', labelEn: 'Commission' },
  { key: 'corporation', labelBn: 'কর্পোরেশন', labelEn: 'Corporation' },
  { key: 'bureau', labelBn: 'ব্যুরো', labelEn: 'Bureau' },
  { key: 'institute', labelBn: 'ইনস্টিটিউট', labelEn: 'Institute' },
]

export function OrganizationsView() {
  const { lang } = useLanguage()
  const [query, setQuery] = React.useState('')
  const [type, setType] = React.useState('all')

  // Static data — synchronous
  const data = React.useMemo<OrgWithMinistry[]>(
    () => getOrganizationsStatic() as unknown as OrgWithMinistry[],
    []
  )
  const loading = false

  const filtered = React.useMemo(() => {
    if (!data) return []
    let list = data
    if (type !== 'all') list = list.filter((o) => o.organizationType === type)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (o) =>
          o.nameBn.includes(query) ||
          o.nameEn.toLowerCase().includes(q)
      )
    }
    return list
  }, [data, type, query])

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {tr('organizations', lang)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn'
            ? 'সরকারি অধিদপ্তর, বিভাগ, কর্তৃপক্ষ ও কর্পোরেশন'
            : 'Government directorates, departments, authorities and corporations'}
        </p>
      </motion.div>

      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr('search', lang)}
            className="pl-10 h-11 rounded-full bg-muted/50 border-transparent focus-visible:border-primary"
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
        <div className="flex items-center gap-2 text-xs text-muted-foreground sm:px-3">
          <Building2 className="h-3.5 w-3.5" />
          <span className="font-medium">
            {filtered.length} {tr('results', lang)}
          </span>
        </div>
      </div>

      <div className="mb-6 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        {TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === t.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {lang === 'bn' ? t.labelBn : t.labelEn}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🏢</div>
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((o) => (
            <OrganizationCard key={o.id} org={o} />
          ))}
        </div>
      )}
    </div>
  )
}
