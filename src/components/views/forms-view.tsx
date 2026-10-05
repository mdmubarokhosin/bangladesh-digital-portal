'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { FileText, Search, X, ExternalLink, Download } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { getFormsStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

interface Form {
  id: string
  titleBn: string
  titleEn: string
  category: string
  organization: string | null
  fileUrl: string | null
  officialUrl: string | null
  sourceUrl: string | null
}

const CATEGORIES: Record<string, { bn: string; en: string }> = {
  passport: { bn: 'পাসপোর্ট', en: 'Passport' },
  citizen: { bn: 'নাগরিক', en: 'Citizen' },
  tax: { bn: 'কর', en: 'Tax' },
  land: { bn: 'ভূমি', en: 'Land' },
  transport: { bn: 'যানবাহন', en: 'Transport' },
  business: { bn: 'ব্যবসা', en: 'Business' },
  utility: { bn: 'ইউটিলিটি', en: 'Utility' },
  welfare: { bn: 'কল্যাণ', en: 'Welfare' },
}

export function FormsView() {
  const { lang } = useLanguage()
  const [query, setQuery] = React.useState('')
  const [cat, setCat] = React.useState('all')

  // Static data — synchronous
  const data = React.useMemo<Form[]>(
    () => getFormsStatic() as unknown as Form[],
    []
  )
  const loading = false

  const filtered = React.useMemo(() => {
    if (!data) return []
    let list = data
    if (cat !== 'all') list = list.filter((f) => f.category === cat)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (f) =>
          f.titleBn.includes(query) ||
          f.titleEn.toLowerCase().includes(q) ||
          (f.organization ?? '').toLowerCase().includes(q)
      )
    }
    return list
  }, [data, query, cat])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('forms', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn' ? 'সরকারি ফরম ও আবেদন পত্র' : 'Government forms and applications'}
        </p>
      </motion.div>

      <div className="mb-5 relative">
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

      <div className="mb-6 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setCat('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            cat === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {tr('tabAll', lang)}
        </button>
        {Object.entries(CATEGORIES).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setCat(k)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              cat === k
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {lang === 'bn' ? v.bn : v.en}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((f, i) => {
            const label = CATEGORIES[f.category] ?? { bn: f.category, en: f.category }
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Card className="p-4 hover:shadow-md hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                          {lang === 'bn' ? f.titleBn : f.titleEn}
                        </h3>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0">
                          {lang === 'bn' ? label.bn : label.en}
                        </Badge>
                      </div>
                      {f.organization && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {f.organization}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-1.5">
                        {(f.officialUrl || f.sourceUrl) && (
                          <Button asChild size="sm" variant="outline" className="h-7 text-xs gap-1">
                            <a href={f.officialUrl ?? f.sourceUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                              {tr('visitWebsite', lang)}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
