'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Heart, MapPin, Phone, Globe, Building2 } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import type { GovernmentOrganization, Ministry } from '@/lib/bd/types'

interface OrgCardProps {
  org: GovernmentOrganization & { ministry?: Ministry | null }
}

const TYPE_LABEL_BN: Record<string, string> = {
  directorate: 'অধিদপ্তর',
  department: 'বিভাগ',
  authority: 'কর্তৃপক্ষ',
  board: 'বোর্ড',
  commission: 'কমিশন',
  corporation: 'কর্পোরেশন',
  bureau: 'ব্যুরো',
  institute: 'ইনস্টিটিউট',
  council: 'কাউন্সিল',
  agency: 'এজেন্সি',
  office: 'অফিস',
}

const TYPE_LABEL_EN: Record<string, string> = {
  directorate: 'Directorate',
  department: 'Department',
  authority: 'Authority',
  board: 'Board',
  commission: 'Commission',
  corporation: 'Corporation',
  bureau: 'Bureau',
  institute: 'Institute',
  council: 'Council',
  agency: 'Agency',
  office: 'Office',
}

export function OrganizationCard({ org }: OrgCardProps) {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const { has, toggle } = useFavorites()
  const saved = has(org.id)
  const typeLabel = lang === 'bn' ? (TYPE_LABEL_BN[org.organizationType] ?? org.organizationType) : (TYPE_LABEL_EN[org.organizationType] ?? org.organizationType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className="card-lift cursor-pointer p-5 hover:shadow-md hover:border-primary/40 transition-all group"
        onClick={() => go('organization-detail', { slug: org.slug })}
      >
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {lang === 'bn' ? org.nameBn : org.nameEn}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggle({
                    id: org.id,
                    type: 'organization',
                    titleBn: org.nameBn,
                    titleEn: org.nameEn,
                    subtitle: typeLabel,
                    url: org.officialUrl ?? undefined,
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
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
              <Badge variant="secondary" className="text-[10px] py-0.5">
                {typeLabel}
              </Badge>
              {org.ministry && (
                <span className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                  {lang === 'bn' ? org.ministry.nameBn : org.ministry.nameEn}
                </span>
              )}
            </div>
            {(org.addressEn || org.addressBn) && (
              <div className="mt-2 flex items-start gap-1 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                <span className="line-clamp-1">
                  {lang === 'bn' ? (org.addressBn ?? org.addressEn) : (org.addressEn ?? org.addressBn)}
                </span>
              </div>
            )}
          </div>
        </div>

        {(org.officialUrl || org.phone) && (
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-3 text-muted-foreground">
              {org.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {org.phone}
                </span>
              )}
            </div>
            {org.officialUrl && (
              <a
                href={org.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <Globe className="h-3 w-3" />
                <span>{lang === 'bn' ? 'ওয়েবসাইট' : 'Website'}</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
