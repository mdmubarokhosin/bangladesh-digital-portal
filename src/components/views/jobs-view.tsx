'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, Clock, Calendar, Building2, ChevronRight } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { getRecruitmentsStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

interface Job {
  id: string
  titleBn: string
  titleEn: string
  positionBn: string | null
  positionEn: string | null
  organization: string | null
  publishedAt: string | Date
  deadline: string | Date
  applicationUrl: string | null
  sourceUrl: string | null
}

export function JobsView() {
  const { lang } = useLanguage()
  const [expired, setExpired] = React.useState(false)

  // Static data — synchronous
  const data = React.useMemo<Job[]>(
    () => getRecruitmentsStatic() as unknown as Job[],
    []
  )
  const loading = false

  const filtered = React.useMemo(() => {
    if (!data) return []
    const now = Date.now()
    return data.filter((j) => {
      const isActive = new Date(j.deadline).getTime() > now
      return expired ? !isActive : isActive
    })
  }, [data, expired])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('jobs', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn' ? 'সরকারি নিয়োগ বিজ্ঞপ্তি ও চাকরির সুযোগ' : 'Government recruitment notices and job opportunities'}
        </p>
      </motion.div>

      <div className="mb-6 -mx-1 px-1 flex gap-1.5">
        <button
          onClick={() => setExpired(false)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !expired
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {lang === 'bn' ? 'চলমান' : 'Active'}
        </button>
        <button
          onClick={() => setExpired(true)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            expired
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {lang === 'bn' ? 'শেষ হয়েছে' : 'Expired'}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((j, i) => {
            const deadline = new Date(j.deadline)
            const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            const dateStr = new Date(j.publishedAt).toLocaleDateString(
              lang === 'bn' ? 'bn-BD' : 'en-GB',
              { day: 'numeric', month: 'short', year: 'numeric' }
            )
            const deadlineStr = deadline.toLocaleDateString(
              lang === 'bn' ? 'bn-BD' : 'en-GB',
              { day: 'numeric', month: 'short', year: 'numeric' }
            )
            return (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="p-5 hover:shadow-md hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="grid place-items-center h-12 w-12 rounded-xl bg-bd-green/10 text-bd-green shrink-0">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2">
                        {lang === 'bn' ? j.titleBn : j.titleEn}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        {j.organization && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {j.organization}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {tr('publishedOn', lang)}: {dateStr}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`gap-1 ${
                            daysLeft < 7
                              ? 'border-bd-red/40 text-bd-red bg-bd-red/5'
                              : 'border-primary/30 text-primary bg-primary/5'
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {tr('deadline', lang)}: {deadlineStr} ({daysLeft} {tr('daysLeft', lang)})
                        </Badge>
                      </div>
                    </div>
                    {(j.applicationUrl || j.sourceUrl) && (
                      <Button asChild size="sm" className="shrink-0 gap-1.5">
                        <a href={j.applicationUrl ?? j.sourceUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                          {tr('applyNow', lang)}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
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
