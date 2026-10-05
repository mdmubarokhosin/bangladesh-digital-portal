'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Phone,
  Siren,
  MapPin,
  Building2,
  FileText,
  Briefcase,
  TrendingUp,
  Users,
  Landmark,
  Globe,
  Shield,
  Clock,
} from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { HeroSearch } from '@/components/hero-search'
import { SectionHeader } from '@/components/section-header'
import { ServiceCard } from '@/components/service-card'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { tr } from '@/lib/i18n'
import {
  getServicesStatic,
  getNoticesStatic,
  getRecruitmentsStatic,
  getEmergencyServicesStatic,
  getStatsStatic,
  getDivisionsStatic,
} from '@/lib/bd/client-data'

interface ServiceWithOrg {
  id: string
  slug: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  category: string
  serviceUrl: string | null
  mobileAvailable: boolean
  onlineApplication: boolean
  isPopular: boolean
  processingTime: string | null
  fees: string | null
  organization: { nameBn: string; nameEn: string } | null
}

interface NoticeItem {
  id: string
  titleBn: string
  titleEn: string
  excerptBn: string | null
  excerptEn: string | null
  publishedAt: string
  deadline: string | null
  organization: string | null
  category: string
  sourceUrl: string | null
}

interface JobItem {
  id: string
  titleBn: string
  titleEn: string
  positionBn: string | null
  positionEn: string | null
  organization: string | null
  publishedAt: string
  deadline: string
  applicationUrl: string | null
}

interface EmergencyItem {
  id: string
  nameBn: string
  nameEn: string
  number: string
  descriptionBn: string | null
  descriptionEn: string | null
  organization: string | null
  available247: boolean
  category: string
}

interface Stats {
  ministries: number
  organizations: number
  divisions: number
  districts: number
  upazilas: number
  services: number
  forms: number
  emergency: number
}

interface Division {
  id: string
  code: string
  nameBn: string
  nameEn: string
  slug: string
  description: string | null
  _count: { districts: number }
}

const CATEGORY_CARDS = [
  { key: 'passport-immigration', icon: '🛂', labelBn: 'পাসপোর্ট ও ইমিগ্রেশন', labelEn: 'Passport & Immigration' },
  { key: 'citizen-services', icon: '🪪', labelBn: 'নাগরিক সেবা', labelEn: 'Citizen Services' },
  { key: 'land', icon: '🗺️', labelBn: 'ভূমি', labelEn: 'Land' },
  { key: 'transport', icon: '🚗', labelBn: 'যানবাহন', labelEn: 'Transport' },
  { key: 'tax', icon: '💰', labelBn: 'কর', labelEn: 'Tax' },
  { key: 'business', icon: '🏢', labelBn: 'ব্যবসা', labelEn: 'Business' },
  { key: 'utility', icon: '⚡', labelBn: 'ইউটিলিটি', labelEn: 'Utility' },
  { key: 'education', icon: '🎓', labelBn: 'শিক্ষা', labelEn: 'Education' },
  { key: 'health', icon: '🏥', labelBn: 'স্বাস্থ্য', labelEn: 'Health' },
  { key: 'agriculture', icon: '🌾', labelBn: 'কৃষি', labelEn: 'Agriculture' },
  { key: 'social-welfare', icon: '🤝', labelBn: 'সামাজিক কল্যাণ', labelEn: 'Social Welfare' },
  { key: 'employment', icon: '💼', labelBn: 'নিয়োগ', labelEn: 'Employment' },
]

function StatCard({
  icon: Icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ElementType
  value: number
  label: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
        <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xl font-bold text-foreground tabular-nums">
            {value.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted-foreground truncate">{label}</div>
        </div>
      </Card>
    </motion.div>
  )
}

export function HomeView() {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)

  // Static data — no API calls (works in static export mode)
  const popularServices = React.useMemo<ServiceWithOrg[]>(
    () => getServicesStatic() as unknown as ServiceWithOrg[],
    []
  )
  const notices = React.useMemo<NoticeItem[]>(
    () => getNoticesStatic() as unknown as NoticeItem[],
    []
  )
  const jobs = React.useMemo<JobItem[]>(
    () => getRecruitmentsStatic() as unknown as JobItem[],
    []
  )
  const emergencies = React.useMemo<EmergencyItem[]>(
    () => getEmergencyServicesStatic() as unknown as EmergencyItem[],
    []
  )
  const stats = React.useMemo<Stats>(() => getStatsStatic(), [])
  const divisionsList = React.useMemo<
    Array<{ nameBn: string; nameEn: string; slug: string; description: string | null; districts: number }>
  >(
    () =>
      getDivisionsStatic().map((d) => ({
        nameBn: d.nameBn,
        nameEn: d.nameEn,
        slug: d.slug,
        description: d.description,
        districts: d._count.districts,
      })),
    []
  )

  const loadingServices = false
  const loadingNotices = false
  const loadingJobs = false
  const loadingEmergencies = false
  const loadingStats = false

  const topServices = (popularServices ?? []).slice(0, 8)
  const topNotices = (notices ?? []).slice(0, 4)
  const topJobs = (jobs ?? []).slice(0, 4)
  const topEmergencies = (emergencies ?? []).slice(0, 6)

  return (
    <div className="flex flex-col">
      {/* ────────── HERO ────────── */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-hero-pattern" aria-hidden />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden />

        <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-20 lg:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Top badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              {lang === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার — ডিজিটাল নেক্সট জেনারেশন'
                : 'Government of Bangladesh — Digital Next Generation'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {tr('heroTitle', lang)}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {tr('heroSubtitle', lang)}
            </p>

            <div className="mt-8">
              <HeroSearch />
            </div>

            {/* Quick CTAs */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <Button
                variant="outline"
                size="sm"
                onClick={() => go('assistant')}
                className="rounded-full gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {tr('askAssistant', lang)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => go('services')}
                className="rounded-full gap-1.5"
              >
                <FileText className="h-3.5 w-3.5" />
                {tr('popularServices', lang)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => go('emergency')}
                className="rounded-full gap-1.5 border-bd-red/30 text-bd-red hover:bg-bd-red/10 hover:text-bd-red"
              >
                <Siren className="h-3.5 w-3.5" />
                {tr('emergency', lang)}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-10 sm:py-14 space-y-14 sm:space-y-20">
        {/* ────────── STATS ────────── */}
        {stats && (
          <section>
            <SectionHeader
              lang={lang}
              titleBn="ডিজিটাল বাংলাদেশ পরিসংখ্যান"
              titleEn="Digital Bangladesh Statistics"
              subtitleBn="সরকারি তথ্য ভাণ্ডারের পরিসংখ্যান"
              subtitleEn="Government information repository statistics"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Landmark} value={stats.ministries} label={tr('statMinistries', lang)} delay={0} />
              <StatCard icon={Building2} value={stats.organizations} label={tr('statOrganizations', lang)} delay={0.05} />
              <StatCard icon={MapPin} value={stats.divisions} label={tr('statDivisions', lang)} delay={0.1} />
              <StatCard icon={Globe} value={stats.districts} label={tr('statDistricts', lang)} delay={0.15} />
              <StatCard icon={MapPin} value={stats.upazilas} label={tr('statUpazilas', lang)} delay={0.2} />
              <StatCard icon={FileText} value={stats.services} label={tr('statServices', lang)} delay={0.25} />
              <StatCard icon={FileText} value={stats.forms} label={tr('statForms', lang)} delay={0.3} />
              <StatCard icon={Phone} value={stats.emergency} label={tr('statEmergencyNumbers', lang)} delay={0.35} />
            </div>
          </section>
        )}

        {/* ────────── POPULAR SERVICES ────────── */}
        <section>
          <SectionHeader
            lang={lang}
            titleBn="জনপ্রিয় সরকারি সেবা"
            titleEn="Popular Government Services"
            subtitleBn="নাগরিকদের সবচেয়ে ব্যবহৃত সেবা"
            subtitleEn="Most used services by citizens"
            onViewAll={() => go('services')}
          />
          {loadingServices ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-44 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topServices.map((s) => (
                <ServiceCard key={s.id} service={s as any} />
              ))}
            </div>
          )}
        </section>

        {/* ────────── SERVICE CATEGORIES ────────── */}
        <section>
          <SectionHeader
            lang={lang}
            titleBn="সেবা ক্যাটাগরি"
            titleEn="Service Categories"
            subtitleBn="আপনার প্রয়োজনীয় সেবা খুঁজুন"
            subtitleEn="Find the service you need"
            onViewAll={() => go('services')}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORY_CARDS.map((c, i) => (
              <motion.button
                key={c.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                onClick={() => go('services', { category: c.key })}
                className="group p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all text-left"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {lang === 'bn' ? c.labelBn : c.labelEn}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ────────── AI ASSISTANT BANNER ────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 via-card to-bd-red/5 p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
                  <Sparkles className="h-3 w-3" />
                  {tr('assistant', lang)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {lang === 'bn'
                    ? 'সেবা সহকারী — সরকারি তথ্যে ভিত্তিকৃত AI'
                    : 'Gov Assistant — AI grounded in government data'}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {tr('assistantSubtitle', lang)}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{lang === 'bn' ? 'যাচাইকৃত সরকারি তথ্য থেকে উত্তর' : 'Answers from verified government data'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span>{lang === 'bn' ? 'বাংলা ও ইংরেজি উভয় ভাষায়' : 'Both Bangla and English'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{lang === 'bn' ? 'প্রতিটি উত্তরে উৎসের তথ্য' : 'Source citations in every answer'}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => go('assistant')}
                  className="mt-5 gap-1.5"
                  size="lg"
                >
                  <Sparkles className="h-4 w-4" />
                  {tr('askAssistant', lang)}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative hidden lg:block">
                <div className="rounded-2xl bg-card border border-border shadow-lg p-5">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/60">
                    <div className="grid place-items-center h-8 w-8 rounded-full bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{tr('assistantTitle', lang)}</div>
                      <div className="text-[10px] text-muted-foreground">{tr('assistantSubtitle', lang)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1.5 text-xs">
                      {lang === 'bn' ? 'আমি পাসপোর্ট করতে চাই।' : 'I want to apply for a passport.'}
                    </div>
                    <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-muted px-3 py-1.5 text-xs">
                      {lang === 'bn'
                        ? 'পাসপোর্ট সেবার জন্য পাসপোর্ট অধিদপ্তর দায়িত্বপ্রাপ্ত। ই-পাসপোর্টের ফি: সাধারণ ৪,০০০ টাকা, জরুরি ৬,০০০ টাকা, অতি জরুরি ৮,০০০ টাকা।'
                        : 'For passport services, the Department of Immigration and Passports is responsible. E-passport fees: Regular 4,000 BDT, Urgent 6,000 BDT, Super Urgent 8,000 BDT.'}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Shield className="h-2.5 w-2.5 text-primary" />
                      {tr('assistantSource', lang)}: passport.gov.bd
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* ────────── EXPLORE BANGLADESH ────────── */}
        <section>
          <SectionHeader
            lang={lang}
            titleBn="বাংলাদেশ আবিষ্কার করুন"
            titleEn="Explore Bangladesh"
            subtitleBn="৮ বিভাগ, ৬৪ জেলা, উপজেলা ও ইউনিয়ন"
            subtitleEn="8 Divisions, 64 Districts, Upazilas and Unions"
            onViewAll={() => go('bangladesh')}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {divisionsList.map((d, i) => (
              <motion.button
                key={d.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => go('bangladesh', { division: d.slug })}
                className="group p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all text-center"
              >
                <div className="text-[10px] text-muted-foreground mb-1">
                  {lang === 'bn' ? 'বিভাগ' : 'Division'}
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {lang === 'bn' ? d.nameBn : d.nameEn}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {d.count} {lang === 'bn' ? 'জেলা' : 'districts'}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ────────── NOTICES & JOBS (split) ────────── */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Notices */}
          <div>
            <SectionHeader
              lang={lang}
              titleBn="সর্বশেষ বিজ্ঞপ্তি"
              titleEn="Latest Notices"
              subtitleBn="সরকারি খবর ও ঘোষণা"
              subtitleEn="Government news and announcements"
              onViewAll={() => go('notices')}
            />
            {loadingNotices ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {topNotices.map((n) => {
                  const dateStr = new Date(n.publishedAt).toLocaleDateString(
                    lang === 'bn' ? 'bn-BD' : 'en-GB',
                    { day: 'numeric', month: 'short', year: 'numeric' }
                  )
                  return (
                    <motion.button
                      key={n.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => go('notices')}
                      className="w-full flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left group"
                    >
                      <div className="grid place-items-center h-9 w-9 shrink-0 rounded-lg bg-primary/10 text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {lang === 'bn' ? n.titleBn : n.titleEn}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{n.organization}</span>
                          <span>·</span>
                          <span>{dateStr}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Jobs */}
          <div>
            <SectionHeader
              lang={lang}
              titleBn="সরকারি চাকরি"
              titleEn="Government Jobs"
              subtitleBn="নতুন নিয়োগ বিজ্ঞপ্তি"
              subtitleEn="Latest recruitment notices"
              onViewAll={() => go('jobs')}
            />
            {loadingJobs ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {topJobs.map((j) => {
                  const deadline = new Date(j.deadline)
                  const now = new Date()
                  const daysLeft = Math.max(
                    0,
                    Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                  )
                  return (
                    <motion.button
                      key={j.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => go('jobs')}
                      className="w-full flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left group"
                    >
                      <div className="grid place-items-center h-9 w-9 shrink-0 rounded-lg bg-bd-green/10 text-bd-green">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {lang === 'bn' ? j.titleBn : j.titleEn}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px]">
                          <span className="text-muted-foreground">{j.organization}</span>
                          {daysLeft > 0 && (
                            <Badge
                              variant="outline"
                              className={`text-[10px] py-0 px-1.5 ${
                                daysLeft < 7
                                  ? 'border-bd-red/40 text-bd-red bg-bd-red/5'
                                  : 'border-primary/30 text-primary bg-primary/5'
                              }`}
                            >
                              <Clock className="h-2.5 w-2.5 mr-1" />
                              {daysLeft} {tr('daysLeft', lang)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* ────────── EMERGENCY SERVICES ────────── */}
        <section>
          <SectionHeader
            lang={lang}
            titleBn="জরুরি হেল্পলাইন"
            titleEn="Emergency Helplines"
            subtitleBn="জরুরি প্রয়োজনে যোগাযোগের নম্বর"
            subtitleEn="Emergency contact numbers"
            onViewAll={() => go('emergency')}
          />
          {loadingEmergencies ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {topEmergencies.map((e, i) => (
                <motion.a
                  key={e.id}
                  href={`tel:${e.number}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="group p-4 rounded-xl border border-bd-red/20 bg-bd-red/5 hover:bg-bd-red/10 hover:border-bd-red/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Siren className="h-4 w-4 text-bd-red" />
                    {e.available247 && (
                      <Badge className="badge-bd !bg-bd-red !text-white text-[9px]">
                        24/7
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-foreground tabular-nums tracking-tight">
                    {e.number}
                  </div>
                  <div className="text-[11px] text-foreground font-medium mt-0.5 line-clamp-1">
                    {lang === 'bn' ? e.nameBn : e.nameEn}
                  </div>
                  <div className="text-[10px] text-muted-foreground line-clamp-1 mt-1">
                    {lang === 'bn' ? e.descriptionBn : e.descriptionEn}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
