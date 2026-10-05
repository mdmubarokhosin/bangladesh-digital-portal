'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, ArrowRight, TrendingUp, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useSearchStore } from '@/stores/use-search'
import { tr } from '@/lib/i18n'

export function HeroSearch() {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const { recent, trending, addRecent, clearRecent } = useSearchStore()
  const [query, setQuery] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const submit = (q?: string) => {
    const value = (q ?? query).trim()
    if (!value) return
    addRecent(value)
    go('search', { q: value })
    setQuery('')
    setFocused(false)
  }

  // Close suggestions on outside click
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative group"
      >
        <div className="relative">
          <Search
            className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
              focused ? 'text-primary' : 'text-muted-foreground'
            }`}
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={tr('searchPlaceholder', lang)}
            aria-label={tr('search', lang)}
            className="w-full h-14 sm:h-16 pl-12 sm:pl-14 pr-32 sm:pr-40 rounded-2xl bg-card border border-border/80 shadow-lg shadow-primary/5 text-base sm:text-lg font-medium placeholder:text-muted-foreground/70 placeholder:font-normal focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus()
                }}
                className="grid place-items-center h-8 w-8 rounded-full hover:bg-accent text-muted-foreground"
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <Button
              type="submit"
              size="sm"
              className="h-10 sm:h-12 px-4 sm:px-5 rounded-xl gap-1.5 font-semibold"
            >
              <span className="hidden sm:inline">{tr('searchCta', lang)}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden"
          >
            {/* Trending */}
            {trending.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  {tr('trendingSearches', lang)}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {trending.slice(0, 8).map((t) => (
                    <button
                      key={t}
                      onClick={() => submit(t)}
                      className="px-2.5 py-1 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent */}
            {recent.length > 0 && (
              <div className="p-3 border-t border-border/60">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 px-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    <Clock className="h-3 w-3" />
                    {tr('recentSearches', lang)}
                  </div>
                  <button
                    onClick={clearRecent}
                    className="text-[11px] text-muted-foreground hover:text-destructive px-2"
                  >
                    {tr('clearAll', lang)}
                  </button>
                </div>
                <div className="space-y-0.5">
                  {recent.slice(0, 6).map((r) => (
                    <button
                      key={r}
                      onClick={() => submit(r)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent text-sm text-left"
                    >
                      <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Assistant CTA */}
            <button
              onClick={() => {
                setFocused(false)
                go('assistant')
              }}
              className="w-full flex items-center gap-3 p-3 border-t border-border/60 hover:bg-accent/60 text-left"
            >
              <div className="grid place-items-center h-8 w-8 rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {tr('askAssistant', lang)}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {tr('assistantSubtitle', lang)}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
