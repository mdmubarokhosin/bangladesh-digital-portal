'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ListIcon as Menu,
  X,
  Sun,
  MoonStars as Moon,
  Globe,
  Stars as Sparkles,
  Heart,
  ChevronRight,
  Building as Building2,
  Bank as Landmark,
  GeoAlt as MapPin,
  FileText,
  Siren,
  Briefcase,
  Info,
  Phone,
  House as HomeIcon,
} from '@/components/icon'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useLanguage } from '@/stores/use-language'
import { useView, type ViewName } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { tr } from '@/lib/i18n'

interface NavItem {
  view: ViewName
  icon: React.ElementType
  labelBn: string
  labelEn: string
}

const NAV: NavItem[] = [
  { view: 'services', icon: FileText, labelBn: 'সেবা', labelEn: 'Services' },
  { view: 'ministries', icon: Landmark, labelBn: 'মন্ত্রণালয়', labelEn: 'Ministries' },
  { view: 'organizations', icon: Building2, labelBn: 'দপ্তর', labelEn: 'Organizations' },
  { view: 'bangladesh', icon: MapPin, labelBn: 'বাংলাদেশ', labelEn: 'Bangladesh' },
  { view: 'notices', icon: Info, labelBn: 'বিজ্ঞপ্তি', labelEn: 'Notices' },
  { view: 'jobs', icon: Briefcase, labelBn: 'চাকরি', labelEn: 'Jobs' },
  { view: 'forms', icon: FileText, labelBn: 'ফরম', labelEn: 'Forms' },
  { view: 'emergency', icon: Siren, labelBn: 'জরুরি', labelEn: 'Emergency' },
  { view: 'laws', icon: Landmark, labelBn: 'আইন', labelEn: 'Laws' },
]

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { lang, toggle } = useLanguage()
  const go = useView((s) => s.go)
  const view = useView((s) => s.view)
  const [mounted, setMounted] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const favoritesCount = useFavorites((s) => s.items.length)

  React.useEffect(() => setMounted(true), [])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchValue.trim()
    if (!q) return
    go('search', { q })
    setSearchOpen(false)
    setSearchValue('')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      {/* Top utility bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-bd-red" aria-hidden />
              {lang === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
                : 'Government of the People\u2019s Republic of Bangladesh'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go('about')}
              className="opacity-90 hover:opacity-100 transition-opacity"
            >
              {tr('about', lang)}
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => go('emergency')}
              className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity"
            >
              <Siren className="h-3 w-3" />
              <span>999</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3">
          {/* Logo */}
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2.5 group"
            aria-label={tr('brandName', lang)}
          >
            <div className="relative h-9 w-9 rounded-xl bg-primary grid place-items-center overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-bd-red/15" aria-hidden />
              <div className="relative z-10 grid place-items-center">
                <span className="text-primary-foreground font-bold text-base leading-none">
                  বা
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full bg-bd-red/80" aria-hidden />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-foreground">
                {lang === 'bn' ? 'বাংলাদেশ ডিজিটাল পোর্টাল' : 'Bangladesh Digital Portal'}
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
                {tr('brandTagline', lang)}
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-4" aria-label="Primary">
            {NAV.slice(0, 7).map((item) => {
              const Icon = item.icon
              const active = view === item.view
              return (
                <button
                  key={item.view}
                  onClick={() => go(item.view)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {lang === 'bn' ? item.labelBn : item.labelEn}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="header-active"
                      className="absolute -bottom-px left-2 right-2 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Search trigger (desktop) */}
            <form onSubmit={submitSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={tr('searchPlaceholder', lang)}
                  className="w-72 pl-10 pr-3 h-9 text-sm rounded-full bg-muted/50 border-transparent focus-visible:border-primary focus-visible:bg-background"
                  aria-label={tr('search', lang)}
                />
              </div>
            </form>

            {/* Search button (mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-full"
              onClick={() => setSearchOpen(true)}
              aria-label={tr('search', lang)}
            >
              <Search className="h-4.5 w-4.5" />
            </Button>

            {/* AI Assistant */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => go('assistant')}
              className="hidden sm:flex items-center gap-1.5 h-9 rounded-full px-3 text-primary hover:bg-primary/10 hover:text-primary"
              aria-label={tr('assistant', lang)}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">{tr('assistant', lang)}</span>
            </Button>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full relative"
              onClick={() => go('favorites')}
              aria-label={tr('favorites', lang)}
            >
              <Heart className="h-4.5 w-4.5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 rounded-full bg-bd-red text-primary-foreground text-[10px] font-bold grid place-items-center px-1">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </span>
              )}
            </Button>

            {/* Language toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="h-9 w-9 rounded-full font-semibold"
              aria-label="Toggle language"
            >
              <span className="text-xs font-bold">{lang === 'bn' ? 'EN' : 'বাং'}</span>
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-full"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9 rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0">
                <SheetHeader className="p-5 pb-3 border-b">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center">
                        <span className="text-primary-foreground font-bold text-sm">বা</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {lang === 'bn'
                            ? 'বাংলাদেশ ডিজিটাল পোর্টাল'
                            : 'Bangladesh Digital Portal'}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {tr('brandTagline', lang)}
                        </span>
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-3">
                  <button
                    onClick={() => {
                      go('home')
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 text-sm font-medium"
                  >
                    <HomeIcon className="h-4 w-4 text-muted-foreground" />
                    {tr('navHome', lang)}
                  </button>
                  {NAV.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.view}
                        onClick={() => go(item.view)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 text-sm font-medium"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {lang === 'bn' ? item.labelBn : item.labelEn}
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/50" />
                      </button>
                    )
                  })}
                  <Separator className="my-3" />
                  <button
                    onClick={() => go('assistant')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 text-sm font-medium"
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                    {tr('assistant', lang)}
                    <Badge className="ml-auto badge-bd">AI</Badge>
                  </button>
                  <button
                    onClick={() => go('favorites')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 text-sm font-medium"
                  >
                    <Heart className="h-4 w-4 text-bd-red" />
                    {tr('favorites', lang)}
                    {favoritesCount > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {favoritesCount}
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => go('about')}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/60 text-sm font-medium"
                  >
                    <Info className="h-4 w-4 text-muted-foreground" />
                    {tr('about', lang)}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile search sheet */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border/60 p-4 z-50"
          >
            <form onSubmit={submitSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={tr('searchPlaceholder', lang)}
                className="pl-10 pr-12 h-11 rounded-full bg-muted/50"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
