'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, X, SlidersHorizontal } from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ServiceCard } from '@/components/service-card'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { tr } from '@/lib/i18n'
import { getServicesStatic } from '@/lib/bd/client-data'
import type { GovernmentService, GovernmentOrganization } from '@/lib/bd/types'

interface ServiceWithOrg extends GovernmentService {
  organization: GovernmentOrganization | null
}

const CATEGORIES = [
  { key: 'all', labelBn: 'সব', labelEn: 'All' },
  { key: 'passport-immigration', labelBn: 'পাসপোর্ট ও ইমিগ্রেশন', labelEn: 'Passport & Immigration' },
  { key: 'citizen-services', labelBn: 'নাগরিক সেবা', labelEn: 'Citizen Services' },
  { key: 'land', labelBn: 'ভূমি', labelEn: 'Land' },
  { key: 'transport', labelBn: 'যানবাহন', labelEn: 'Transport' },
  { key: 'tax', labelBn: 'কর', labelEn: 'Tax' },
  { key: 'business', labelBn: 'ব্যবসা', labelEn: 'Business' },
  { key: 'utility', labelBn: 'ইউটিলিটি', labelEn: 'Utility' },
  { key: 'education', labelBn: 'শিক্ষা', labelEn: 'Education' },
  { key: 'health', labelBn: 'স্বাস্থ্য', labelEn: 'Health' },
  { key: 'agriculture', labelBn: 'কৃষি', labelEn: 'Agriculture' },
  { key: 'social-welfare', labelBn: 'সামাজিক কল্যাণ', labelEn: 'Social Welfare' },
  { key: 'employment', labelBn: 'নিয়োগ', labelEn: 'Employment' },
  { key: 'information', labelBn: 'তথ্যভাণ্ডার', labelEn: 'Information' },
  { key: 'emergency', labelBn: 'জরুরি সেবা', labelEn: 'Emergency' },
]

export function ServicesView() {
  const { lang } = useLanguage()
  const { params } = useView()
  const initialCategory = params.category ?? 'all'
  const [category, setCategory] = React.useState(initialCategory)
  const [query, setQuery] = React.useState('')

  // Static data — synchronous, no API calls
  const services = React.useMemo<ServiceWithOrg[]>(
    () => getServicesStatic() as unknown as ServiceWithOrg[],
    []
  )
  const loading = false

  const filtered = React.useMemo(() => {
    if (!services) return []
    let list = services
    if (category !== 'all') list = list.filter((s) => s.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (s) =>
          s.titleBn.includes(query) ||
          s.titleEn.toLowerCase().includes(q) ||
          s.descriptionBn.includes(query) ||
          s.descriptionEn.toLowerCase().includes(q)
      )
    }
    return list
  }, [services, category, query])

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {tr('services', lang)}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn'
            ? 'সরকারি সেবা খুঁজুন এবং আবেদন করুন'
            : 'Find and apply for government services'}
        </p>
      </motion.div>

      {/* Search & filter */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr('searchPlaceholder', lang)}
            className="pl-10 h-11 rounded-full bg-muted/50 border-transparent focus-visible:border-primary"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground sm:px-3">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="font-medium">
            {filtered.length} {tr('results', lang)}
          </span>
        </div>
      </div>

      {/* Category chips */}
      <div className="mb-6 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              category === c.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {lang === 'bn' ? c.labelBn : c.labelEn}
          </button>
        ))}
      </div>

      {/* Services grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm text-muted-foreground">{tr('noResults', lang)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  )
}
