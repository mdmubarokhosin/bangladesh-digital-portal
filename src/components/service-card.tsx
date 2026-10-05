'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  Heart,
  Clock,
  Building2,
} from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { pickLocalized } from '@/lib/bd/client-data'
import type { GovernmentService, GovernmentOrganization } from '@/lib/bd/types'

interface ServiceCardProps {
  service: GovernmentService & {
    organization?: GovernmentOrganization | null
  }
  compact?: boolean
}

const CATEGORY_ICON_MAP: Record<string, string> = {
  'passport-immigration': '🛂',
  'citizen-services': '🪪',
  land: '🗺️',
  transport: '🚗',
  tax: '💰',
  business: '🏢',
  utility: '⚡',
  education: '🎓',
  health: '🏥',
  agriculture: '🌾',
  'social-welfare': '🤝',
  employment: '💼',
  information: 'ℹ️',
  emergency: '🚨',
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const { has, toggle } = useFavorites()
  const saved = has(service.id)
  const emoji = CATEGORY_ICON_MAP[service.category] ?? '📄'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className="card-lift cursor-pointer p-5 hover:shadow-md hover:border-primary/40 transition-all group"
        onClick={() => go('service-detail', { slug: service.slug })}
      >
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl">
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {lang === 'bn' ? service.titleBn : service.titleEn}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggle({
                    id: service.id,
                    type: 'service',
                    titleBn: service.titleBn,
                    titleEn: service.titleEn,
                    subtitle: service.organization?.nameEn ?? undefined,
                    url: service.serviceUrl ?? undefined,
                  })
                }}
                className="shrink-0 -mr-1 -mt-1 p-1.5 rounded-full hover:bg-accent transition-colors"
                aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    saved ? 'fill-bd-red text-bd-red' : 'text-muted-foreground'
                  }`}
                />
              </button>
            </div>
            {!compact && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {lang === 'bn' ? service.descriptionBn : service.descriptionEn}
              </p>
            )}
            {service.organization && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Building2 className="h-3 w-3" />
                <span className="truncate">
                  {lang === 'bn' ? service.organization.nameBn : service.organization.nameEn}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 flex-wrap">
          {service.isPopular && (
            <Badge variant="secondary" className="text-[10px] gap-1 py-0.5">
              <CheckCircle2 className="h-2.5 w-2.5" />
              {lang === 'bn' ? 'জনপ্রিয়' : 'Popular'}
            </Badge>
          )}
          {service.onlineApplication && (
            <Badge variant="outline" className="text-[10px] gap-1 py-0.5 bg-primary/5 text-primary border-primary/30">
              <ExternalLink className="h-2.5 w-2.5" />
              {lang === 'bn' ? 'অনলাইন' : 'Online'}
            </Badge>
          )}
          {service.mobileAvailable && (
            <Badge variant="outline" className="text-[10px] gap-1 py-0.5">
              <Smartphone className="h-2.5 w-2.5" />
              {lang === 'bn' ? 'মোবাইল' : 'Mobile'}
            </Badge>
          )}
        </div>

        {!compact && (
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="truncate">
                {pickLocalized(service.processingTime, lang).split(',')[0]}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-[11px] text-primary hover:bg-primary/10 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation()
                go('service-detail', { slug: service.slug })
              }}
            >
              {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  )
}
