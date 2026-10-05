'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Siren, Phone, Clock, Shield } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { getEmergencyServicesStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

interface EmergencyItem {
  id: string
  nameBn: string
  nameEn: string
  number: string
  descriptionBn: string | null
  descriptionEn: string | null
  organization: string | null
  available247: boolean
  category: string
}

const CATEGORY_LABEL: Record<string, { bn: string; en: string }> = {
  general: { bn: 'সাধারণ', en: 'General' },
  information: { bn: 'তথ্য', en: 'Information' },
  'women-children': { bn: 'নারী ও শিশু', en: 'Women & Children' },
  fire: { bn: 'অগ্নিনির্বাপন', en: 'Fire' },
  police: { bn: 'পুলিশ', en: 'Police' },
  health: { bn: 'স্বাস্থ্য', en: 'Health' },
  utility: { bn: 'ইউটিলিটি', en: 'Utility' },
  children: { bn: 'শিশু', en: 'Children' },
  expatriate: { bn: 'প্রবাসী', en: 'Expatriate' },
  agriculture: { bn: 'কৃষি', en: 'Agriculture' },
  cyber: { bn: 'সাইবার', en: 'Cyber' },
  transport: { bn: 'পরিবহন', en: 'Transport' },
  women: { bn: 'নারী', en: 'Women' },
}

export function EmergencyView() {
  const { lang } = useLanguage()

  // Static data — synchronous
  const data = React.useMemo<EmergencyItem[]>(
    () => getEmergencyServicesStatic() as unknown as EmergencyItem[],
    []
  )
  const loading = false

  // Sort: 999, 333, then by number ascending
  const sorted = React.useMemo(() => {
    if (!data) return []
    return [...data].sort((a, b) => {
      const priority = (n: string) => (n === '999' ? 0 : n === '333' ? 1 : n === '109' ? 2 : 3)
      const p = priority(a.number) - priority(b.number)
      if (p !== 0) return p
      return a.number.localeCompare(b.number)
    })
  }, [data])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-bd-red/10 text-bd-red px-3 py-1 text-xs font-semibold mb-3">
          <Siren className="h-3 w-3" />
          {lang === 'bn' ? '২৪/৭ জরুরি সেবা' : '24/7 Emergency'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('emergency', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn' ? 'জরুরি প্রয়োজনে সরাসরি কল করুন' : 'Call directly in case of emergency'}
        </p>
      </motion.div>

      {/* Hero — 999 */}
      <Card className="mb-6 p-6 border-bd-red/40 bg-gradient-to-br from-bd-red/10 via-card to-bd-red/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="grid place-items-center h-16 w-16 rounded-2xl bg-bd-red text-white shadow-lg shadow-bd-red/30">
              <Siren className="h-8 w-8" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-bd-red font-semibold">
                {lang === 'bn' ? 'জাতীয় জরুরি নম্বর' : 'National Emergency Number'}
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground tabular-nums tracking-tight">
                999
              </div>
              <div className="text-xs text-muted-foreground">
                {lang === 'bn' ? 'পুলিশ · ফায়ার সার্ভিস · অ্যাম্বুলেন্স' : 'Police · Fire · Ambulance'}
              </div>
            </div>
          </div>
          <Button asChild size="lg" className="bg-bd-red hover:bg-bd-red/90 gap-2 h-12 px-6 text-base">
            <a href="tel:999">
              <Phone className="h-5 w-5" />
              {tr('call', lang)}
            </a>
          </Button>
        </div>
      </Card>

      {/* All emergency numbers grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map((e, i) => {
            const label = CATEGORY_LABEL[e.category] ?? { bn: e.category, en: e.category }
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Card className="p-4 hover:shadow-md transition-all border-bd-red/20">
                  <div className="flex items-start gap-3">
                    <div className="grid place-items-center h-12 w-12 rounded-xl bg-bd-red/10 text-bd-red shrink-0 font-bold text-lg tabular-nums">
                      {e.number.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                          {lang === 'bn' ? e.nameBn : e.nameEn}
                        </h3>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0">
                          {lang === 'bn' ? label.bn : label.en}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground tabular-nums tracking-tight">
                          {e.number}
                        </span>
                        {e.available247 ? (
                          <Badge className="badge-bd !bg-bd-red/90 !text-white text-[9px] gap-0.5">
                            <Clock className="h-2 w-2" />
                            24/7
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[9px] py-0">
                            <Clock className="h-2 w-2 mr-0.5" />
                            {tr('not247', lang)}
                          </Badge>
                        )}
                      </div>
                      {(e.descriptionBn || e.descriptionEn) && (
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                          {lang === 'bn' ? e.descriptionBn : e.descriptionEn}
                        </p>
                      )}
                      {e.organization && (
                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{e.organization}</p>
                      )}
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="shrink-0 rounded-full text-bd-red hover:bg-bd-red/10 hover:text-bd-red gap-1 px-2"
                    >
                      <a href={`tel:${e.number}`}>
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <p className="mt-8 text-xs text-muted-foreground flex items-start gap-1.5">
        <Shield className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
        <span>
          {lang === 'bn'
            ? 'উপরোক্ত নম্বরগুলো সরকারি উৎস থেকে সংগৃহীত। জরুরি অবস্থায় সরাসরি কল করুন।'
            : 'The numbers above are sourced from official government records. Call directly in emergencies.'}
        </span>
      </p>
    </div>
  )
}
