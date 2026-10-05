'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Heart,
  Phone,
  Shield,
  Building2,
  ChevronRight,
  Info,
} from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ServiceCard } from '@/components/service-card'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { useFavorites } from '@/stores/use-favorites'
import { tr } from '@/lib/i18n'
import { pickLocalized, getServiceBySlugStatic, getRelatedServicesStatic } from '@/lib/bd/client-data'

// Server-side data fetch (we'll use an API endpoint instead to keep things simple)
interface ServiceDetail {
  id: string
  slug: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  category: string
  sector: string | null
  serviceUrl: string | null
  mobileAvailable: boolean
  onlineApplication: boolean
  requiredDocuments: string | null
  fees: string | null
  processingTime: string | null
  eligibility: string | null
  stepsBn: string | null
  stepsEn: string | null
  isPopular: boolean
  sourceUrl: string | null
  sourceUpdatedAt: string | null
  organization: {
    nameBn: string
    nameEn: string
    slug: string
    officialUrl: string | null
    phone: string | null
    email: string | null
    addressBn: string | null
    addressEn: string | null
    ministry: { nameBn: string; nameEn: string; slug: string } | null
  } | null
}

export function ServiceDetailView() {
  const { lang } = useLanguage()
  const { params, go } = useView()
  const slug = params.slug
  const { has, toggle } = useFavorites()

  // Static data — synchronous, no API calls
  const service = React.useMemo<ServiceDetail | null>(
    () => (slug ? (getServiceBySlugStatic(slug) as unknown as ServiceDetail | null) : null),
    [slug]
  )
  const related = React.useMemo<ServiceDetail[]>(
    () =>
      service?.category
        ? (getRelatedServicesStatic(service.category, service.slug ?? '', 4) as unknown as ServiceDetail[])
        : [],
    [service]
  )
  const loading = false

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Skeleton className="h-8 w-1/2 mb-3" />
        <Skeleton className="h-4 w-1/3 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <Info className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">{tr('noData', lang)}</p>
        <Button onClick={() => go('services')} variant="outline" className="mt-4">
          {tr('services', lang)}
        </Button>
      </div>
    )
  }

  const saved = has(service.id)
  const title = lang === 'bn' ? service.titleBn : service.titleEn
  const description = lang === 'bn' ? service.descriptionBn : service.descriptionEn

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-5 text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
        <button onClick={() => go('home')} className="hover:text-primary">
          {tr('home', lang)}
        </button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => go('services')} className="hover:text-primary">
          {tr('services', lang)}
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium line-clamp-1">{title}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-start gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => go('services')}
            className="rounded-full shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            {service.organization && (
              <button
                onClick={() => service.organization && go('organization-detail', { slug: service.organization.slug })}
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <Building2 className="h-3.5 w-3.5" />
                {lang === 'bn' ? service.organization.nameBn : service.organization.nameEn}
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              toggle({
                id: service.id,
                type: 'service',
                titleBn: service.titleBn,
                titleEn: service.titleEn,
                subtitle: service.organization?.nameEn,
                url: service.serviceUrl ?? undefined,
              })
            }
            className="shrink-0 rounded-full"
            aria-label="Save"
          >
            <Heart
              className={`h-4 w-4 ${
                saved ? 'fill-bd-red text-bd-red' : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.isPopular && (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {lang === 'bn' ? 'জনপ্রিয়' : 'Popular'}
            </Badge>
          )}
          {service.onlineApplication && (
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30 gap-1">
              <ExternalLink className="h-3 w-3" />
              {tr('onlineBadge', lang)}
            </Badge>
          )}
          {service.mobileAvailable && (
            <Badge variant="outline" className="gap-1">
              {tr('mobileBadge', lang)}
            </Badge>
          )}
          <Badge variant="outline" className="gap-1 bg-bd-green/5 text-bd-green border-bd-green/30">
            <Shield className="h-3 w-3" />
            {tr('officialBadge', lang)}
          </Badge>
        </div>
      </motion.div>

      {/* Open service CTA */}
      {service.serviceUrl && (
        <Card className="mb-6 p-5 border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <div className="grid place-items-center h-10 w-10 rounded-lg bg-primary/10 shrink-0">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground">
                {lang === 'bn' ? 'অফিসিয়াল সেবায় আবেদন করুন' : 'Apply on the Official Service'}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                {tr('externalLinkNotice', lang)}
              </p>
              <Button asChild size="sm" className="gap-1.5">
                <a href={service.serviceUrl} target="_blank" rel="noopener noreferrer">
                  {tr('openOfficialService', lang)}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Detail sections */}
      <div className="space-y-4">
        <DetailSection icon={Info} title={tr('whatIsThis', lang)}>
          {description}
        </DetailSection>

        {service.eligibility && (
          <DetailSection icon={CheckCircle2} title={tr('eligibility', lang)}>
            {pickLocalized(service.eligibility, lang)}
          </DetailSection>
        )}

        {service.requiredDocuments && (
          <DetailSection icon={FileText} title={tr('requiredDocuments', lang)}>
            {pickLocalized(service.requiredDocuments, lang)}
          </DetailSection>
        )}

        {service.fees && (
          <DetailSection icon={Clock} title={tr('fees', lang)}>
            {pickLocalized(service.fees, lang)}
          </DetailSection>
        )}

        {service.processingTime && (
          <DetailSection icon={Clock} title={tr('processingTime', lang)}>
            {pickLocalized(service.processingTime, lang)}
          </DetailSection>
        )}

        {service.organization && (service.organization.phone || service.organization.email || service.organization.addressEn) && (
          <DetailSection icon={Building2} title={tr('footerContact', lang)}>
            <div className="space-y-1.5">
              {service.organization.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <a href={`tel:${service.organization.phone}`} className="text-primary hover:underline">
                    {service.organization.phone}
                  </a>
                </div>
              )}
              {(service.organization.addressEn || service.organization.addressBn) && (
                <div className="text-sm text-muted-foreground">
                  {lang === 'bn'
                    ? (service.organization.addressBn ?? service.organization.addressEn)
                    : (service.organization.addressEn ?? service.organization.addressBn)}
                </div>
              )}
              {service.organization.officialUrl && (
                <a
                  href={service.organization.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Globe className="h-3 w-3" />
                  {service.organization.officialUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              )}
            </div>
          </DetailSection>
        )}
      </div>

      {/* Source transparency */}
      <Card className="mt-6 p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <Shield className="h-4 w-4 text-bd-green mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0 text-xs">
            <div className="font-semibold text-foreground mb-1">{tr('sourceInfo', lang)}</div>
            <div className="text-muted-foreground">
              <span className="font-medium text-foreground">{tr('officialSource', lang)}:</span>{' '}
              {service.organization?.nameEn ?? 'Government of Bangladesh'}
            </div>
            {service.sourceUrl && (
              <div className="mt-1">
                <span className="font-medium text-foreground">{tr('originalSource', lang)}:</span>{' '}
                <a
                  href={service.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-0.5"
                >
                  {service.sourceUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').slice(0, 50)}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            )}
            <div className="mt-1">
              <span className="font-medium text-foreground">{tr('lastVerified', lang)}:</span>{' '}
              {service.sourceUpdatedAt
                ? new Date(service.sourceUpdatedAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB')
                : new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB')}
            </div>
          </div>
        </div>
      </Card>

      {/* Related services */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground mb-4">{tr('relatedServices', lang)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s as any} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="grid place-items-center h-9 w-9 rounded-lg bg-primary/10 shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </div>
    </Card>
  )
}
