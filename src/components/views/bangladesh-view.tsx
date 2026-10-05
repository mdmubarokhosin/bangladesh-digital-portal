'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Globe, ChevronRight, ArrowRight } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { getDistrictsStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

interface DistrictWithDivision {
  id: string
  slug: string
  nameBn: string
  nameEn: string
  areaSqKm: number | null
  population: number | null
  division: { nameBn: string; nameEn: string; slug: string; code: string }
}

interface DivisionGroup {
  division: { nameBn: string; nameEn: string; slug: string; code: string; description: string | null }
  districts: DistrictWithDivision[]
}

export function BangladeshView() {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const { params } = useView()
  const activeDivision = params.division

  // Static data — synchronous
  const districts = React.useMemo<DistrictWithDivision[]>(
    () => getDistrictsStatic() as unknown as DistrictWithDivision[],
    []
  )
  const loading = false

  // Group by division
  const grouped = React.useMemo<DivisionGroup[]>(() => {
    if (!districts) return []
    const map = new Map<string, DivisionGroup>()
    for (const d of districts) {
      const key = d.division.slug
      if (!map.has(key)) {
        map.set(key, {
          division: { ...d.division, description: null },
          districts: [],
        })
      }
      map.get(key)!.districts.push(d)
    }
    return Array.from(map.values()).sort((a, b) => a.division.code.localeCompare(b.division.code))
  }, [districts])

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Globe className="h-3.5 w-3.5" />
          {lang === 'bn' ? '৮ বিভাগ · ৬৪ জেলা · ৪৯৫ উপজেলা' : '8 Divisions · 64 Districts · 495 Upazilas'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {tr('exploreBangladesh', lang)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{tr('exploreBangladeshSub', lang)}</p>
      </motion.div>

      {/* Quick division nav */}
      <div className="mb-8 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => go('bangladesh', {})}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeDivision
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {tr('tabAll', lang)}
        </button>
        {grouped.map((g) => (
          <button
            key={g.division.slug}
            onClick={() => go('bangladesh', { division: g.division.slug })}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeDivision === g.division.slug
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {lang === 'bn' ? g.division.nameBn : g.division.nameEn}
            <span className="ml-1 opacity-70">({g.districts.length})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {grouped
            .filter((g) => !activeDivision || g.division.slug === activeDivision)
            .map((g, idx) => (
              <section key={g.division.slug}>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {lang === 'bn' ? 'বিভাগ' : 'Division'} {idx + 1}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {lang === 'bn' ? g.division.nameBn : g.division.nameEn}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {g.districts.length} {lang === 'bn' ? 'জেলা' : 'districts'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {g.districts.map((d) => (
                    <motion.button
                      key={d.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => go('district-detail', { slug: d.slug })}
                      className="group p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {lang === 'bn' ? d.nameBn : d.nameEn}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">
                            {d.population
                              ? `${(d.population / 100000).toFixed(1)} ${
                                  lang === 'bn' ? 'লক্ষ জনসংখ্যা' : 'L population'
                                }`
                              : ''}
                            {d.areaSqKm ? ` · ${d.areaSqKm} km²` : ''}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  )
}
