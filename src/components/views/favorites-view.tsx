'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Trash2,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  FileText,
  Building2,
  Landmark,
  Briefcase,
  Globe,
} from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites, type FavoriteType } from '@/stores/use-favorites'
import { tr } from '@/lib/i18n'

const TYPE_META: Record<
  FavoriteType,
  { icon: React.ElementType; bn: string; en: string; color: string }
> = {
  service: { icon: FileText, bn: 'সেবা', en: 'Service', color: 'text-primary' },
  organization: { icon: Building2, bn: 'দপ্তর', en: 'Organization', color: 'text-bd-green' },
  ministry: { icon: Landmark, bn: 'মন্ত্রণালয়', en: 'Ministry', color: 'text-bd-green' },
  form: { icon: FileText, bn: 'ফরম', en: 'Form', color: 'text-amber-600' },
  notice: { icon: FileText, bn: 'বিজ্ঞপ্তি', en: 'Notice', color: 'text-amber-600' },
  recruitment: { icon: Briefcase, bn: 'চাকরি', en: 'Job', color: 'text-bd-green' },
  link: { icon: Globe, bn: 'ওয়েবসাইট', en: 'Website', color: 'text-muted-foreground' },
}

export function FavoritesView() {
  const { lang } = useLanguage()
  const { go } = useView()
  const { items, remove, clear } = useFavorites()

  const handleOpen = (item: (typeof items)[number]) => {
    if (item.type === 'service') go('service-detail', { slug: item.id })
    else if (item.type === 'organization') go('organization-detail', { slug: item.id })
    else if (item.type === 'ministry') go('ministry-detail', { slug: item.id })
    else if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Heart className="h-6 w-6 text-bd-red fill-bd-red" />
              {tr('favorites', lang)}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length > 0
                ? `${items.length} ${lang === 'bn' ? 'টি সংরক্ষিত আইটেম' : 'saved items'}`
                : lang === 'bn'
                ? 'আপনার সংরক্ষিত সেবা ও দপ্তর এখানে দেখা যাবে'
                : 'Your saved services and organizations will appear here'}
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {tr('clearAll', lang)}
            </Button>
          )}
        </div>
      </motion.div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="grid place-items-center h-16 w-16 rounded-full bg-muted/60 mx-auto mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-base font-semibold text-foreground mb-1">
            {lang === 'bn' ? 'এখনও কিছু সংরক্ষণ করা নেই' : 'Nothing saved yet'}
          </h2>
          <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
            {lang === 'bn'
              ? 'সেবা, দপ্তর বা মন্ত্রণালয়ের কার্ডে হার্ট আইকনে ক্লিক করে সংরক্ষণ করুন।'
              : 'Click the heart icon on a service, organization, or ministry card to save it here.'}
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => go('services')}>
              {tr('services', lang)}
            </Button>
            <Button variant="outline" size="sm" onClick={() => go('organizations')}>
              {tr('organizations', lang)}
            </Button>
            <Button variant="outline" size="sm" onClick={() => go('ministries')}>
              {tr('ministries', lang)}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => {
            const meta = TYPE_META[item.type]
            const Icon = meta.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <Card
                  className="p-4 hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                  onClick={() => handleOpen(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`grid place-items-center h-10 w-10 rounded-lg bg-muted shrink-0 ${meta.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {lang === 'bn' ? item.titleBn : item.titleEn}
                        </h3>
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0">
                          {lang === 'bn' ? meta.bn : meta.en}
                        </Badge>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {item.subtitle}
                        </p>
                      )}
                      <div className="mt-1.5 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            remove(item.id)
                          }}
                          className="inline-flex items-center gap-1 text-[10px] text-destructive hover:underline"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                          {lang === 'bn' ? 'সরান' : 'Remove'}
                        </button>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
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
