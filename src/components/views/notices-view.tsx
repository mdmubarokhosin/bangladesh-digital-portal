'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { FileText, ExternalLink, Calendar, Building2, Clock, ChevronRight } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { getNoticesStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

interface Notice {
  id: string
  titleBn: string
  titleEn: string
  excerptBn: string | null
  excerptEn: string | null
  publishedAt: string | Date
  deadline: string | Date | null
  organization: string | null
  category: string
  sourceUrl: string | null
}

const CATEGORY_BADGES: Record<string, { bn: string; en: string }> = {
  'public-exam': { bn: 'পাবলিক পরীক্ষা', en: 'Public Exam' },
  circular: { bn: 'প্রজ্ঞাপন', en: 'Circular' },
  'service-notice': { bn: 'সেবা বিজ্ঞপ্তি', en: 'Service Notice' },
  'tax-notice': { bn: 'কর বিজ্ঞপ্তি', en: 'Tax Notice' },
  notice: { bn: 'বিজ্ঞপ্তি', en: 'Notice' },
  admission: { bn: 'ভর্তি', en: 'Admission' },
}

export function NoticesView() {
  const { lang } = useLanguage()
  const [filter, setFilter] = React.useState('all')

  // Static data — synchronous
  const data = React.useMemo<Notice[]>(
    () => getNoticesStatic() as unknown as Notice[],
    []
  )
  const loading = false

  const categories = React.useMemo(() => {
    if (!data) return []
    const set = new Set(data.map((n) => n.category))
    return Array.from(set)
  }, [data])

  const filtered = React.useMemo(() => {
    if (!data) return []
    return filter === 'all' ? data : data.filter((n) => n.category === filter)
  }, [data, filter])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('notices', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn'
            ? 'সরকারি খবর, বিজ্ঞপ্তি, প্রজ্ঞাপন ও ঘোষণা'
            : 'Government news, notices, circulars and announcements'}
        </p>
      </motion.div>

      <div className="mb-6 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {tr('tabAll', lang)}
        </button>
        {categories.map((c) => {
          const label = CATEGORY_BADGES[c] ?? { bn: c, en: c }
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === c
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {lang === 'bn' ? label.bn : label.en}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((n, i) => {
            const dateStr = new Date(n.publishedAt).toLocaleDateString(
              lang === 'bn' ? 'bn-BD' : 'en-GB',
              { day: 'numeric', month: 'short', year: 'numeric' }
            )
            const label = CATEGORY_BADGES[n.category] ?? { bn: n.category, en: n.category }
            const deadline = n.deadline ? new Date(n.deadline) : null
            const daysLeft = deadline
              ? Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
              : null
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="p-4 hover:shadow-md hover:border-primary/40 transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {lang === 'bn' ? n.titleBn : n.titleEn}
                        </h3>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0">
                          {lang === 'bn' ? label.bn : label.en}
                        </Badge>
                      </div>
                      {(n.excerptBn || n.excerptEn) && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {lang === 'bn' ? n.excerptBn : n.excerptEn}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                        {n.organization && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {n.organization}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {dateStr}
                        </span>
                        {daysLeft !== null && (
                          <span className="flex items-center gap-1 text-bd-red font-medium">
                            <Clock className="h-3 w-3" />
                            {daysLeft} {tr('daysLeft', lang)}
                          </span>
                        )}
                      </div>
                    </div>
                    {n.sourceUrl && (
                      <a
                        href={n.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                        aria-label={tr('readMore', lang)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
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
