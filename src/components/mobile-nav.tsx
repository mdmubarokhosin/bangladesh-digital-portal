'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Home, FileText, Search, Building2, Sparkles } from '@/components/icon'
import { useView, type ViewName } from '@/stores/use-view'
import { useLanguage } from '@/stores/use-language'
import { tr } from '@/lib/i18n'

interface NavItem {
  view: ViewName
  icon: React.ElementType
  labelKey: 'navHome' | 'navServices' | 'navSearch' | 'navDirectory'
  active: ViewName[]
}

const NAV: NavItem[] = [
  { view: 'home', icon: Home, labelKey: 'navHome', active: ['home'] },
  { view: 'services', icon: FileText, labelKey: 'navServices', active: ['services', 'service-detail', 'forms', 'laws'] },
  { view: 'search', icon: Search, labelKey: 'navSearch', active: ['search'] },
  { view: 'ministries', icon: Building2, labelKey: 'navDirectory', active: ['ministries', 'ministry-detail', 'organizations', 'organization-detail', 'bangladesh', 'district-detail', 'notices', 'jobs', 'emergency', 'favorites', 'about'] },
]

export function MobileNav() {
  const { go, view } = useView()
  const { lang } = useLanguage()

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-5 gap-1 px-2 py-1.5">
        {NAV.map((item) => {
          const Icon = item.icon
          const isActive = item.active.includes(view)
          return (
            <button
              key={item.view}
              onClick={() => {
                if (item.view === 'search') {
                  go('search', { q: '' })
                } else {
                  go(item.view)
                }
              }}
              className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium min-h-[44px]"
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`grid place-items-center h-7 w-9 rounded-full transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span
                className={
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground'
                }
              >
                {tr(item.labelKey, lang)}
              </span>
            </button>
          )
        })}
        <button
          onClick={() => go('assistant')}
          className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium min-h-[44px]"
          aria-current={view === 'assistant' ? 'page' : undefined}
        >
          <span
            className={`grid place-items-center h-7 w-9 rounded-full transition-colors ${
              view === 'assistant'
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/10 text-primary'
            }`}
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span
            className={
              view === 'assistant'
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            }
          >
            {tr('assistant', lang)}
          </span>
        </button>
      </div>
    </nav>
  )
}
