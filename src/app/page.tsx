'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileNav } from '@/components/mobile-nav'
import { useView } from '@/stores/use-view'

// Views
import { HomeView } from '@/components/views/home-view'
import { ServicesView } from '@/components/views/services-view'
import { ServiceDetailView } from '@/components/views/service-detail-view'
import { MinistriesView } from '@/components/views/ministries-view'
import { MinistryDetailView } from '@/components/views/ministry-detail-view'
import { OrganizationsView } from '@/components/views/organizations-view'
import { OrganizationDetailView } from '@/components/views/organization-detail-view'
import { BangladeshView } from '@/components/views/bangladesh-view'
import { DistrictDetailView } from '@/components/views/district-detail-view'
import { NoticesView } from '@/components/views/notices-view'
import { JobsView } from '@/components/views/jobs-view'
import { FormsView } from '@/components/views/forms-view'
import { EmergencyView } from '@/components/views/emergency-view'
import { LawsView } from '@/components/views/laws-view'
import { SearchView } from '@/components/views/search-view'
import { AssistantView } from '@/components/views/assistant-view'
import { FavoritesView } from '@/components/views/favorites-view'
import { AboutView } from '@/components/views/about-view'

export default function Home() {
  const view = useView((s) => s.view)
  const params = useView((s) => s.params)

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView />
      case 'services':
        return <ServicesView />
      case 'service-detail':
        return <ServiceDetailView key={params.slug} />
      case 'ministries':
        return <MinistriesView />
      case 'ministry-detail':
        return <MinistryDetailView key={params.slug} />
      case 'organizations':
        return <OrganizationsView />
      case 'organization-detail':
        return <OrganizationDetailView key={params.slug} />
      case 'bangladesh':
        return <BangladeshView key={params.division ?? 'all'} />
      case 'district-detail':
        return <DistrictDetailView key={params.slug} />
      case 'notices':
        return <NoticesView />
      case 'jobs':
        return <JobsView />
      case 'forms':
        return <FormsView />
      case 'emergency':
        return <EmergencyView />
      case 'laws':
        return <LawsView />
      case 'search':
        return <SearchView key={params.q ?? 'empty'} />
      case 'assistant':
        return <AssistantView />
      case 'favorites':
        return <FavoritesView />
      case 'about':
        return <AboutView />
      default:
        return <HomeView />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={view + (params.slug ?? params.q ?? params.division ?? '')}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  )
}
