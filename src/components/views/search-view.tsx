'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Search as SearchIcon,
  X,
  Sparkles,
  FileText,
  Building2,
  Landmark,
  MapPin,
  Briefcase,
  ExternalLink,
  Heart,
  ArrowRight,
  Globe,
} from '@/components/icon'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { useSearchStore } from '@/stores/use-search'
import { tr } from '@/lib/i18n'
import { searchAllStatic } from '@/lib/bd/client-data'

interface SearchResult {
  type: 'service' | 'organization' | 'ministry' | 'district' | 'upazila' | 'form' | 'notice' | 'recruitment' | 'link'
  id: string
  titleBn: string
  titleEn: string
  descriptionBn?: string
  descriptionEn?: string
  url?: string
  sourceUrl?: string
  meta?: Record<string, string>
}

interface SearchResponse {
  results: SearchResult[]
  count: number
  query: string
  counts: Record<string, number>
}

const TYPE_META: Record<
  SearchResult['type'],
  { icon: React.ElementType; bn: string; en: string; color: string }
> = {
  service: { icon: FileText, bn: 'সেবা', en: 'Service', color: 'text-primary' },
  organization: { icon: Building2, bn: 'দপ্তর', en: 'Organization', color: 'text-bd-green' },
  ministry: { icon: Landmark, bn: 'মন্ত্রণালয়', en: 'Ministry', color: 'text-bd-green' },
  district: { icon: MapPin, bn: 'জেলা', en: 'District', color: 'text-primary' },
  upazila: { icon: MapPin, bn: 'উপজেলা', en: 'Upazila', color: 'text-primary' },
  form: { icon: FileText, bn: 'ফরম', en: 'Form', color: 'text-amber-600' },
  notice: { icon: FileText, bn: 'বিজ্ঞপ্তি', en: 'Notice', color: 'text-amber-600' },
  recruitment: { icon: Briefcase, bn: 'চাকরি', en: 'Job', color: 'text-bd-green' },
  link: { icon: Globe, bn: 'ওয়েবসাইট', en: 'Website', color: 'text-muted-foreground' },
}

const TABS: Array<{ key: 'all' | SearchResult['type']; labelBn: string; labelEn: string }> = [
  { key: 'all', labelBn: 'সব', labelEn: 'All' },
  { key: 'service', labelBn: 'সেবা', labelEn: 'Services' },
  { key: 'organization', labelBn: 'দপ্তর', labelEn: 'Organizations' },
  { key: 'ministry', labelBn: 'মন্ত্রণালয়', labelEn: 'Ministries' },
  { key: 'district', labelBn: 'জেলা', labelEn: 'Districts' },
  { key: 'form', labelBn: 'ফরম', labelEn: 'Forms' },
  { key: 'notice', labelBn: 'বিজ্ঞপ্তি', labelEn: 'Notices' },
  { key: 'recruitment', labelBn: 'চাকরি', labelEn: 'Jobs' },
  { key: 'link', labelBn: 'ওয়েবসাইট', labelEn: 'Websites' },
]

export function SearchView() {
  const { lang } = useLanguage()
  const { params, go } = useView()
  const { addRecent, recent, trending } = useSearchStore()
  const { has, toggle } = useFavorites()
  const [query, setQuery] = React.useState(params.q ?? '')
  const [activeTab, setActiveTab] = React.useState<'all' | SearchResult['type']>('all')
  const [data, setData] = React.useState<SearchResponse | null>(null)
  const [loading, setLoading] = React.useState(false)

  const runSearch = React.useCallback(
    (q: string) => {
      const trimmed = q.trim()
      if (!trimmed) {
        setData(null)
        return
      }
      setLoading(true)
      addRecent(trimmed)
      // Synchronous static-data search — no API call
      const results = searchAllStatic(trimmed)
      const counts = results.reduce(
        (acc, r) => {
          acc.all = (acc.all ?? 0) + 1
          acc[r.type] = (acc[r.type] ?? 0) + 1
          return acc
        },
        {} as Record<string, number>
      )
      setData({
        results,
        count: results.length,
        query: trimmed,
        counts,
      })
      setLoading(false)
    },
    [addRecent]
  )

  // Auto-search on mount if query param present
  React.useEffect(() => {
    if (params.q) {
      setQuery(params.q)
      runSearch(params.q)
    }
  }, [params.q, runSearch])

  const filteredResults = React.useMemo(() => {
    if (!data) return []
    return activeTab === 'all' ? data.results : data.results.filter((r) => r.type === activeTab)
  }, [data, activeTab])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('searchResults', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn'
            ? 'সরকারি সেবা, দপ্তর, জেলা ও আরও অনেক কিছু খুঁজুন'
            : 'Find government services, organizations, districts and more'}
        </p>
      </motion.div>

      {/* Search bar */}
      <form onSubmit={submit} className="relative mb-4">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tr('searchPlaceholder', lang)}
          className="h-12 sm:h-14 pl-12 pr-32 text-base rounded-2xl bg-card border-border shadow-sm focus-visible:border-primary"
          autoFocus
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setData(null)
              }}
              className="grid place-items-center h-8 w-8 rounded-full hover:bg-accent text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button type="submit" size="sm" className="h-9 px-4 rounded-xl gap-1.5">
            {tr('searchCta', lang)}
          </Button>
        </div>
      </form>

      {/* Empty state — show suggestions */}
      {!data && !loading && (
        <div className="space-y-6 mt-6">
          {recent.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                {tr('recentSearches', lang)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recent.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setQuery(r)
                      runSearch(r)
                    }}
                    className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              {tr('trendingSearches', lang)}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trending.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setQuery(t)
                    runSearch(t)
                  }}
                  className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Card className="p-5 border-primary/30 bg-primary/5">
            <button
              onClick={() => go('assistant')}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className="grid place-items-center h-10 w-10 rounded-full bg-primary/10 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  {tr('askAssistant', lang)}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {tr('assistantSubtitle', lang)}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </Card>
        </div>
      )}

      {/* Tabs */}
      {data && (
        <div className="mb-4 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
          {TABS.map((t) => {
            const count = t.key === 'all' ? data.count : data.counts[t.key] ?? 0
            if (t.key !== 'all' && count === 0) return null
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === t.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {lang === 'bn' ? t.labelBn : t.labelEn}
                <span className="text-[10px] opacity-70">{count}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground mb-2">
            {tr('showing', lang)} {filteredResults.length} {tr('of', lang)} {data.count} {tr('results', lang)}
          </div>
          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm font-medium text-foreground mb-1">{tr('noResults', lang)}</p>
              <p className="text-xs text-muted-foreground mb-4">{tr('noResultsDesc', lang)}</p>
              <Button variant="outline" size="sm" onClick={() => go('assistant')} className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {tr('askAssistant', lang)}
              </Button>
            </div>
          ) : (
            filteredResults.map((r, i) => {
              const meta = TYPE_META[r.type]
              const Icon = meta.icon
              const title = lang === 'bn' ? r.titleBn : r.titleEn
              const desc = lang === 'bn' ? r.descriptionBn : r.descriptionEn
              const favId = `${r.type}-${r.id}`
              const saved = has(favId)
              const handleOpen = () => {
                if (r.type === 'service') go('service-detail', { slug: r.id })
                else if (r.type === 'organization') go('organization-detail', { slug: r.id })
                else if (r.type === 'ministry') go('ministry-detail', { slug: r.id })
                else if (r.type === 'district' || r.type === 'upazila') go('district-detail', { slug: r.id })
                else if (r.url) window.open(r.url, '_blank', 'noopener,noreferrer')
              }
              return (
                <motion.div
                  key={`${r.type}-${r.id}-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Card
                    className="p-4 hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                    onClick={handleOpen}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`grid place-items-center h-10 w-10 rounded-lg bg-muted shrink-0 ${meta.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {title}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                              {lang === 'bn' ? meta.bn : meta.en}
                            </Badge>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggle({
                                  id: favId,
                                  type: 'service',
                                  titleBn: r.titleBn,
                                  titleEn: r.titleEn,
                                  subtitle: lang === 'bn' ? meta.bn : meta.en,
                                  url: r.url ?? r.sourceUrl,
                                })
                              }}
                              className="p-1 rounded-full hover:bg-accent"
                            >
                              <Heart
                                className={`h-3.5 w-3.5 ${
                                  saved ? 'fill-bd-red text-bd-red' : 'text-muted-foreground'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        {desc && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{desc}</p>
                        )}
                        {r.meta && Object.keys(r.meta).length > 0 && (
                          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground flex-wrap">
                            {Object.entries(r.meta)
                              .filter(([, v]) => v)
                              .slice(0, 3)
                              .map(([k, v]) => (
                                <span key={k} className="truncate">
                                  <span className="opacity-60">{k}:</span>{' '}
                                  <span className="font-medium">{v}</span>
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                      {(r.url || r.sourceUrl) && (
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
