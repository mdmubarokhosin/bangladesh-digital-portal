'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Landmark as Scale, ExternalLink, FileText, Calendar } from '@/components/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { tr } from '@/lib/i18n'

const LAWS = [
  {
    titleBn: 'বাংলাদেশের সংবিধান',
    titleEn: 'Constitution of Bangladesh',
    typeBn: 'সংবিধান',
    typeEn: 'Constitution',
    year: '1972',
    orgBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    orgEn: 'Government of Bangladesh',
    url: 'https://bdlaws.minlaw.gov.bd/act-367.html',
  },
  {
    titleBn: 'দণ্ডবিধি, ১৮৬০',
    titleEn: 'Penal Code, 1860',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1860',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-11.html',
  },
  {
    titleBn: 'ফৌজদারি কার্যবিধি, ১৮৯৮',
    titleEn: 'Code of Criminal Procedure, 1898',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1898',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-20.html',
  },
  {
    titleBn: 'দেওয়ানি কার্যবিধি, ১৯০৮',
    titleEn: 'Code of Civil Procedure, 1908',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1908',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-27.html',
  },
  {
    titleBn: 'চুক্তি আইন, ১৮৭২',
    titleEn: 'Contract Act, 1872',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1872',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-18.html',
  },
  {
    titleBn: 'তথ্য অধিকার আইন, ২০০৯',
    titleEn: 'Right to Information Act, 2009',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '2009',
    orgBn: 'তথ্য কমিশন',
    orgEn: 'Information Commission',
    url: 'https://bdlaws.minlaw.gov.bd/act-743.html',
  },
  {
    titleBn: 'ডিজিটাল নিরাপত্তা আইন, ২০১৮',
    titleEn: 'Digital Security Act, 2018',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '2018',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-1086.html',
  },
  {
    titleBn: 'ভূমি অধিগ্রহণ আইন, ১৯৪৮',
    titleEn: 'Acquisition and Requisition of Property Act, 1948',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1948',
    orgBn: 'ভূমি মন্ত্রণালয়',
    orgEn: 'Ministry of Land',
    url: 'https://bdlaws.minlaw.gov.bd/act-262.html',
  },
  {
    titleBn: 'শ্রম আইন, ২০০৬',
    titleEn: 'Labour Act, 2006',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '2006',
    orgBn: 'শ্রম মন্ত্রণালয়',
    orgEn: 'Ministry of Labour',
    url: 'https://bdlaws.minlaw.gov.bd/act-673.html',
  },
  {
    titleBn: 'বাংলাদেশ শ্রম বিধি, ২০১৫',
    titleEn: 'Bangladesh Labour Rules, 2015',
    typeBn: 'বিধি',
    typeEn: 'Rules',
    year: '2015',
    orgBn: 'শ্রম মন্ত্রণালয়',
    orgEn: 'Ministry of Labour',
    url: 'https://bdlaws.minlaw.gov.bd/act-1019.html',
  },
  {
    titleBn: 'পণ্য আইন, ১৯৩০',
    titleEn: 'Sale of Goods Act, 1930',
    typeBn: 'আইন',
    typeEn: 'Act',
    year: '1930',
    orgBn: 'আইন মন্ত্রণালয়',
    orgEn: 'Ministry of Law',
    url: 'https://bdlaws.minlaw.gov.bd/act-60.html',
  },
  {
    titleBn: 'বাংলাদেশ গেজেট',
    titleEn: 'Bangladesh Gazette',
    typeBn: 'গেজেট',
    typeEn: 'Gazette',
    year: '2024',
    orgBn: 'মন্ত্রিপরিষদ বিভাগ',
    orgEn: 'Cabinet Division',
    url: 'https://bangladesh.gov.bd/site/view/gazette_list',
  },
]

export function LawsView() {
  const { lang } = useLanguage()
  const [filter, setFilter] = React.useState('all')

  const types = React.useMemo(() => {
    const set = new Set(LAWS.map((l) => l.typeEn))
    return Array.from(set)
  }, [])

  const filtered = React.useMemo(() => {
    if (filter === 'all') return LAWS
    return LAWS.filter((l) => l.typeEn === filter)
  }, [filter])

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{tr('laws', lang)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === 'bn' ? 'বাংলাদেশের আইন, বিধি ও প্রবিধান' : 'Laws, rules and regulations of Bangladesh'}
        </p>
      </motion.div>

      <div className="mb-6 -mx-1 px-1 flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
          }`}
        >
          {tr('tabAll', lang)}
        </button>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === t
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {lang === 'bn' ? LAWS.find((l) => l.typeEn === t)?.typeBn : t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((l, i) => (
          <motion.div
            key={l.titleEn}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="p-4 hover:shadow-md hover:border-primary/40 transition-all group">
              <div className="flex items-start gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Scale className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {lang === 'bn' ? l.titleBn : l.titleEn}
                    </h3>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 shrink-0">
                      {lang === 'bn' ? l.typeBn : l.typeEn}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {l.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {lang === 'bn' ? l.orgBn : l.orgEn}
                    </span>
                  </div>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {lang === 'bn' ? 'পড়ুন' : 'Read'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <Card className="p-5 bg-muted/30">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-foreground mb-1">
                {lang === 'bn' ? 'অফিসিয়াল আইন সংগ্রহশালা' : 'Official Law Repository'}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {lang === 'bn'
                  ? 'সম্পূর্ণ বাংলাদেশ আইন সংগ্রহশালার জন্য আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়ের অফিসিয়াল ওয়েবসাইট দেখুন।'
                  : 'For the complete Bangladesh law repository, please visit the official website of the Ministry of Law, Justice and Parliamentary Affairs.'}
              </p>
              <a
                href="https://bdlaws.minlaw.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                bdlaws.minlaw.gov.bd
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
