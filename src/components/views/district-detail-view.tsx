'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Users,
  Globe,
  Building2,
  Phone,
  Heart,
  Siren,
  ExternalLink,
} from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { tr } from '@/lib/i18n'
import { getDistrictBySlugStatic } from '@/lib/bd/client-data'

interface DistrictDetail {
  id: string
  slug: string
  nameBn: string
  nameEn: string
  areaSqKm: number | null
  population: number | null
  description: string | null
  division: { nameBn: string; nameEn: string; slug: string }
  upazilas: Array<{ id: string; slug: string; nameBn: string; nameEn: string }>
}

export function DistrictDetailView() {
  const { lang } = useLanguage()
  const { params, go } = useView()
  const { has, toggle } = useFavorites()

  // Static data — synchronous
  const data = React.useMemo<DistrictDetail | null>(
    () => (params.slug ? (getDistrictBySlugStatic(params.slug) as unknown as DistrictDetail | null) : null),
    [params.slug]
  )
  const loading = false

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Skeleton className="h-8 w-1/2 mb-3" />
        <Skeleton className="h-4 w-1/3 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">{tr('noData', lang)}</p>
        <Button onClick={() => go('bangladesh')} variant="outline" className="mt-4">
          {tr('bangladesh', lang)}
        </Button>
      </div>
    )
  }

  const title = lang === 'bn' ? data.nameBn : data.nameEn

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-10">
      <nav className="mb-5 text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
        <button onClick={() => go('home')} className="hover:text-primary">{tr('home', lang)}</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => go('bangladesh')} className="hover:text-primary">{tr('bangladesh', lang)}</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium line-clamp-1">{title}</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => go('bangladesh')} className="rounded-full shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="grid place-items-center h-14 w-14 rounded-2xl bg-primary/10 text-primary shrink-0">
            <MapPin className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{title}</h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
              <Badge variant="secondary" className="gap-1">
                <Globe className="h-3 w-3" />
                {lang === 'bn' ? data.division.nameBn : data.division.nameEn} {lang === 'bn' ? 'বিভাগ' : 'Division'}
              </Badge>
              {data.population && (
                <Badge variant="outline" className="gap-1">
                  <Users className="h-3 w-3" />
                  {data.population.toLocaleString()} {lang === 'bn' ? 'জনসংখ্যা' : 'population'}
                </Badge>
              )}
              {data.areaSqKm && (
                <Badge variant="outline">{data.areaSqKm.toLocaleString()} km²</Badge>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              toggle({
                id: data.id,
                type: 'organization',
                titleBn: data.nameBn,
                titleEn: data.nameEn,
                subtitle: lang === 'bn' ? `${data.division.nameBn} বিভাগ` : `${data.division.nameEn} Division`,
              })
            }
            className="shrink-0 rounded-full"
          >
            <Heart className={`h-4 w-4 ${has(data.id) ? 'fill-bd-red text-bd-red' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </motion.div>

      {/* Upazilas list */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold">
            {data.upazilas.length} {tr('statUpazilas', lang)}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.upazilas.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-border/60 hover:border-primary/40 hover:bg-accent/30 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground font-medium truncate">
                {lang === 'bn' ? u.nameBn : u.nameEn}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency quick call */}
      <Card className="mt-4 p-5 border-bd-red/30 bg-bd-red/5">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-10 w-10 rounded-lg bg-bd-red/10 text-bd-red shrink-0">
            <Siren className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground">
              {lang === 'bn' ? 'জরুরি সেবা' : 'Emergency Services'}
            </div>
            <div className="text-xs text-muted-foreground">
              {lang === 'bn' ? 'জাতীয় জরুরি নম্বর' : 'National emergency number'}
            </div>
          </div>
          <Button asChild size="sm" className="bg-bd-red hover:bg-bd-red/90 gap-1.5">
            <a href="tel:999">
              <Phone className="h-3.5 w-3.5" />
              999
            </a>
          </Button>
        </div>
      </Card>

      {/* External portal link */}
      <Card className="mt-4 p-4 bg-muted/30">
        <a
          href={`https://${data.slug}.gov.bd/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <Globe className="h-4 w-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0 text-sm">
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
              {title} {lang === 'bn' ? 'জেলা পোর্টাল' : 'District Portal'}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {data.slug}.gov.bd
            </div>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </a>
      </Card>
    </div>
  )
}
