'use client'

import * as React from 'react'
import { Link2, ExternalLink, Mail, Phone, MapPin, Github, Heart } from '@/components/icon'
import { useView } from '@/stores/use-view'
import { useLanguage } from '@/stores/use-language'
import { tr } from '@/lib/i18n'

export function SiteFooter() {
  const go = useView((s) => s.go)
  const { lang } = useLanguage()

  return (
    <footer className="mt-auto border-t border-border bg-muted/30 pt-12 pb-20 lg:pb-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center relative overflow-hidden">
                <span className="text-primary-foreground font-bold text-base">বা</span>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-bd-red/80" />
              </div>
              <div className="flex flex-col leading-tight">
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
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {tr('footerDisclaimer', lang)}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go('emergency')}
                className="badge-bd"
                aria-label={tr('emergency', lang)}
              >
                <Phone className="h-2.5 w-2.5" />
                <span>999</span>
              </button>
              <a
                href="https://bangladesh.gov.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                <Link2 className="h-2.5 w-2.5" />
                bangladesh.gov.bd
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              {tr('footerQuickLinks', lang)}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { view: 'services' as const, label: tr('services', lang) },
                { view: 'ministries' as const, label: tr('ministries', lang) },
                { view: 'organizations' as const, label: tr('organizations', lang) },
                { view: 'bangladesh' as const, label: tr('bangladesh', lang) },
                { view: 'assistant' as const, label: tr('assistant', lang) },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => go(item.view)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              {tr('footerResources', lang)}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { view: 'notices' as const, label: tr('notices', lang) },
                { view: 'jobs' as const, label: tr('jobs', lang) },
                { view: 'forms' as const, label: tr('forms', lang) },
                { view: 'laws' as const, label: tr('laws', lang) },
                { view: 'emergency' as const, label: tr('emergency', lang) },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => go(item.view)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              {tr('footerLegal', lang)}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { view: 'about' as const, label: tr('footerAbout', lang) },
                { view: 'about' as const, label: tr('footerPrivacy', lang) },
                { view: 'about' as const, label: tr('footerTerms', lang) },
                { view: 'about' as const, label: tr('footerAccessibility', lang) },
                { view: 'about' as const, label: tr('footerSitemap', lang) },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => go(item.view)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-0.5">
              {tr('footerPoweredBy', lang)}
            </p>
            <p>
              © {new Date().getFullYear()}{' '}
              {lang === 'bn'
                ? 'বাংলাদেশ ডিজিটাল জাতীয় পোর্টাল'
                : 'Bangladesh Digital National Portal'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-bd-green" />
              <span className="inline-block h-2 w-2 rounded-full bg-bd-red" />
              <span className="ml-1">
                {lang === 'bn' ? 'বাংলাদেশে তৈরি' : 'Made in Bangladesh'}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-bd-red" />
              {lang === 'bn' ? 'নাগরিকদের জন্য' : 'For citizens'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
