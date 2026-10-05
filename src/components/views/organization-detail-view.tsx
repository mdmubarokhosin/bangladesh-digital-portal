'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Heart,
  Phone,
  Mail,
  MapPin,
  Building2,
  FileText,
  Shield,
} from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ServiceCard } from '@/components/service-card'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { tr } from '@/lib/i18n'
import { getOrganizationBySlugStatic } from '@/lib/bd/client-data'
import type { GovernmentOrganization, GovernmentService, Ministry } from '@/lib/bd/types'

interface OrgDetail extends GovernmentOrganization {
  ministry: Ministry | null
  services: GovernmentService[]
}

export function OrganizationDetailView() {
  const { lang } = useLanguage()
  const { params, go } = useView()
  const { has, toggle } = useFavorites()

  // Static data — synchronous
  const data = React.useMemo<OrgDetail | null>(
    () => (params.slug ? (getOrganizationBySlugStatic(params.slug) as unknown as OrgDetail | null) : null),
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
        <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">{tr('noData', lang)}</p>
        <Button onClick={() => go('organizations')} variant="outline" className="mt-4">
          {tr('organizations', lang)}
        </Button>
      </div>
    )
  }

  const title = lang === 'bn' ? data.nameBn : data.nameEn
  const saved = has(data.id)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-10">
      <nav className="mb-5 text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
        <button onClick={() => go('home')} className="hover:text-primary">{tr('home', lang)}</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => go('organizations')} className="hover:text-primary">{tr('organizations', lang)}</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium line-clamp-1">{title}</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Button variant="ghost" size="icon" onClick={() => go('organizations')} className="rounded-full shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="grid place-items-center h-14 w-14 rounded-2xl bg-primary/10 text-primary shrink-0">
            <Building2 className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{title}</h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="capitalize">{data.organizationType}</Badge>
              {data.ministry && (
                <button
                  onClick={() => data.ministry && go('ministry-detail', { slug: data.ministry.slug })}
                  className="text-xs text-primary hover:underline"
                >
                  {lang === 'bn' ? data.ministry.nameBn : data.ministry.nameEn}
                </button>
              )}
              <Badge variant="outline" className="gap-1 bg-bd-green/5 text-bd-green border-bd-green/30">
                <Shield className="h-3 w-3" />
                {tr('officialBadge', lang)}
              </Badge>
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
                url: data.officialUrl ?? undefined,
              })
            }
            className="shrink-0 rounded-full"
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-bd-red text-bd-red' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </motion.div>

      {/* Contact info */}
      <Card className="mb-6 p-5">
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          {data.officialUrl && (
            <div>
              <div className="text-[11px] uppercase text-muted-foreground font-semibold mb-1">Website</div>
              <a
                href={data.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <Globe className="h-3.5 w-3.5" />
                {data.officialUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          {data.phone && (
            <div>
              <div className="text-[11px] uppercase text-muted-foreground font-semibold mb-1">Phone</div>
              <a href={`tel:${data.phone}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                <Phone className="h-3.5 w-3.5" />
                {data.phone}
              </a>
            </div>
          )}
          {data.email && (
            <div>
              <div className="text-[11px] uppercase text-muted-foreground font-semibold mb-1">Email</div>
              <a href={`mailto:${data.email}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                <Mail className="h-3.5 w-3.5" />
                {data.email}
              </a>
            </div>
          )}
          {(data.addressEn || data.addressBn) && (
            <div>
              <div className="text-[11px] uppercase text-muted-foreground font-semibold mb-1">Address</div>
              <div className="flex items-start gap-1 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>{lang === 'bn' ? (data.addressBn ?? data.addressEn) : (data.addressEn ?? data.addressBn)}</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Services */}
      {data.services.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {tr('services', lang)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.services.map((s) => (
              <ServiceCard key={s.id} service={s as any} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
