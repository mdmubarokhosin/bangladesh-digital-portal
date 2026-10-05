'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Database,
  Globe,
  Heart,
  Lock,
  Sparkles,
  Code,
  Server,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { getStatsStatic } from '@/lib/bd/client-data'
import { tr } from '@/lib/i18n'

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

export function AboutView() {
  const { lang } = useLanguage()
  const go = useView((s) => s.go)
  const stats = React.useMemo<Stats>(() => getStatsStatic(), [])

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-3">
          <Sparkles className="h-3 w-3" />
          {tr('brandTagline', lang)}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {lang === 'bn' ? 'পোর্টাল সম্পর্কে' : 'About This Portal'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {lang === 'bn'
            ? 'বাংলাদেশ ডিজিটাল জাতীয় পোর্টাল — নেক্সট জেনারেশন হলো একটি স্বাধীন ডিজিটাল সরকারি পোর্টাল কনসেপ্ট, যা সরকারি তথ্য ও সেবাকে নাগরিকদের জন্য আরও সহজলভ্য করতে ডিজাইন করা হয়েছে।'
            : 'The Bangladesh Digital National Portal — Next Generation is an independent digital government portal concept, designed to make government information and services more accessible to citizens.'}
        </p>
      </motion.div>

      {/* Important disclaimer */}
      <Card className="mb-6 p-5 border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-foreground mb-1">
              {lang === 'bn' ? 'গুরুত্বপূর্ণ দাবিত্যাগ' : 'Important Disclaimer'}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === 'bn'
                ? 'এই পোর্টাল বাংলাদেশ সরকারের অফিসিয়াল পোর্টাল নয়। এটি একটি স্বাধীন কনসেপ্ট ডেমো। সমস্ত সরকারি তথ্যের জন্য অফিসিয়াল বাংলাদেশ জাতীয় পোর্টাল (bangladesh.gov.bd) দেখুন।'
                : 'This portal is not the official portal of the Government of Bangladesh. It is an independent concept demo. For all official government information, please visit the official Bangladesh National Portal (bangladesh.gov.bd).'}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      {stats && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            {lang === 'bn' ? 'তথ্য ভাণ্ডার' : 'Data Repository'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: tr('statMinistries', lang), value: stats.ministries },
              { label: tr('statOrganizations', lang), value: stats.organizations },
              { label: tr('statDivisions', lang), value: stats.divisions },
              { label: tr('statDistricts', lang), value: stats.districts },
              { label: tr('statUpazilas', lang), value: stats.upazilas },
              { label: tr('statServices', lang), value: stats.services },
              { label: tr('statForms', lang), value: stats.forms },
              { label: tr('statEmergencyNumbers', lang), value: stats.emergency },
            ].map((s, i) => (
              <Card key={i} className="p-3 text-center">
                <div className="text-xl font-bold text-foreground tabular-nums">
                  {s.value.toLocaleString()}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Architecture */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          {lang === 'bn' ? 'প্রযুক্তি স্থাপত্য' : 'Technology Architecture'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { icon: Code, label: 'Next.js 16' },
            { icon: Code, label: 'TypeScript' },
            { icon: Server, label: 'Prisma ORM' },
            { icon: Database, label: 'SQLite' },
            { icon: Globe, label: 'Tailwind CSS 4' },
            { icon: Sparkles, label: 'shadcn/ui' },
            { icon: Sparkles, label: 'Framer Motion' },
            { icon: Server, label: 'REST API' },
            { icon: Sparkles, label: 'AI RAG' },
          ].map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-border/60 bg-card text-xs"
              >
                <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-foreground font-medium">{t.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-bd-red" />
          {lang === 'bn' ? 'নকশা নীতি' : 'Design Principles'}
        </h2>
        <div className="space-y-2">
          {[
            {
              icon: Shield,
              titleBn: 'উৎস-ভিত্তিক তথ্য',
              titleEn: 'Source-grounded information',
              descBn: 'সমস্ত সরকারি তথ্য অফিসিয়াল উৎস থেকে যাচাই করা',
              descEn: 'All government information verified from official sources',
            },
            {
              icon: Lock,
              titleBn: 'গোপনীয়তা-প্রথম',
              titleEn: 'Privacy-first',
              descBn: 'নাগরিকদের ব্যক্তিগত তথ্য সংগ্রহ না করা',
              descEn: 'No collection of citizens\' personal data',
            },
            {
              icon: Globe,
              titleBn: 'দ্বিভাষিক',
              titleEn: 'Bilingual',
              descBn: 'বাংলা ও ইংরেজি — উভয় ভাষায়',
              descEn: 'Both Bangla and English',
            },
            {
              icon: Sparkles,
              titleBn: 'AI-চালিত',
              titleEn: 'AI-powered',
              descBn: 'সেবা সহকারী দ্বারা বুদ্ধিদীপ্ত অনুসন্ধান',
              descEn: 'Intelligent search via Gov Assistant',
            },
          ].map((p, i) => {
            const Icon = p.icon
            return (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground">
                      {lang === 'bn' ? p.titleBn : p.titleEn}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {lang === 'bn' ? p.descBn : p.descEn}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Source attribution */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          {lang === 'bn' ? 'তথ্যের উৎস' : 'Data Sources'}
        </h2>
        <Card className="p-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <a
                href="https://bangladesh.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                bangladesh.gov.bd
              </a>
              <Badge variant="outline" className="text-[10px] ml-auto">
                {lang === 'bn' ? 'জাতীয় পোর্টাল' : 'National Portal'}
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <a
                href="https://www.passport.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                passport.gov.bd
              </a>
              <Badge variant="outline" className="text-[10px] ml-auto">
                {lang === 'bn' ? 'পাসপোর্ট' : 'Passport'}
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <a
                href="https://bdlaws.minlaw.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                bdlaws.minlaw.gov.bd
              </a>
              <Badge variant="outline" className="text-[10px] ml-auto">
                {lang === 'bn' ? 'আইন' : 'Laws'}
              </Badge>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <a
                href="https://dghs.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                dghs.gov.bd
              </a>
              <Badge variant="outline" className="text-[10px] ml-auto">
                {lang === 'bn' ? 'স্বাস্থ্য' : 'Health'}
              </Badge>
            </li>
          </ul>
        </Card>
      </section>

      {/* CTA */}
      <Card className="p-5 bg-gradient-to-br from-primary/5 via-card to-bd-red/5 border-primary/20">
        <div className="text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-lg font-bold text-foreground mb-1">
            {lang === 'bn' ? 'সেবা সহকারী ব্যবহার করে দেখুন' : 'Try the Gov Assistant'}
          </h2>
          <p className="text-xs text-muted-foreground mb-4 max-w-md mx-auto">
            {lang === 'bn'
              ? 'AI-চালিত সহকারী সরকারি তথ্যের ভিত্তিতে আপনার প্রশ্নের উত্তর দেবে।'
              : 'The AI-powered assistant will answer your questions based on government information.'}
          </p>
          <Button onClick={() => go('assistant')} className="gap-1.5">
            <Sparkles className="h-4 w-4" />
            {tr('askAssistant', lang)}
          </Button>
        </div>
      </Card>
    </div>
  )
}
