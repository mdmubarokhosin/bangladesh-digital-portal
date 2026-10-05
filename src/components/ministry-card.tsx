'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Landmark, ExternalLink, Heart, ArrowRight } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import type { Ministry } from '@/lib/bd/types'

interface MinistryCardProps {
  ministry: Ministry & { _count?: { organizations: number; services: number } }
}

export function MinistryCard({ ministry }: MinistryCardProps) {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const { has, toggle } = useFavorites()
  const saved = has(ministry.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className="card-lift cursor-pointer p-5 hover:shadow-md hover:border-primary/40 transition-all group h-full"
        onClick={() => go('ministry-detail', { slug: ministry.slug })}
      >
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {lang === 'bn' ? ministry.nameBn : ministry.nameEn}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggle({
                    id: ministry.id,
                    type: 'ministry',
                    titleBn: ministry.nameBn,
                    titleEn: ministry.nameEn,
                    url: ministry.officialUrl ?? undefined,
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
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-[11px]">
          {typeof ministry._count?.organizations === 'number' && (
            <Badge variant="outline" className="py-0.5 text-[10px]">
              {ministry._count.organizations}{' '}
              {lang === 'bn' ? 'দপ্তর' : 'orgs'}
            </Badge>
          )}
          {typeof ministry._count?.services === 'number' && (
            <Badge variant="outline" className="py-0.5 text-[10px]">
              {ministry._count.services} {lang === 'bn' ? 'সেবা' : 'services'}
            </Badge>
          )}
          <span className="ml-auto flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
            <span className="text-[11px]">{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </Card>
    </motion.div>
  )
}
