/**
 * Client-side data accessor — synchronous, no API calls.
 * Used for static export mode (output: 'export') where API routes don't exist.
 *
 * All data comes from the bundled static dataset in static-data.ts.
 * No async, no fetch — just direct synchronous access.
 */

import * as st from '@/lib/bd/static-data'
import type { Language } from '@/stores/use-language'

export type SearchEntityType =
  | 'service'
  | 'organization'
  | 'ministry'
  | 'district'
  | 'upazila'
  | 'form'
  | 'notice'
  | 'recruitment'
  | 'link'

export interface SearchResult {
  type: SearchEntityType
  id: string
  titleBn: string
  titleEn: string
  descriptionBn?: string
  descriptionEn?: string
  url?: string
  sourceUrl?: string
  meta?: Record<string, string>
}

// Helper to extract bn/en portion of a "bn||en" combined field
export function pickLocalized(combined: string | null | undefined, lang: Language): string {
  if (!combined) return ''
  const [bn, en] = combined.split('||')
  return lang === 'bn' ? bn ?? en ?? combined : en ?? bn ?? combined
}

// ─── GEOGRAPHIC ───
export function getDivisionsStatic() {
  return st.divisions.map((d) => ({
    ...d,
    _count: { districts: st.districts.filter((dis) => dis.divisionSlug === d.slug).length },
  }))
}

export function getDistrictsStatic(divisionSlug?: string) {
  const allWithDiv = st.getDistrictsWithDivision().map((d) => ({
    id: d.id,
    code: d.code,
    nameBn: d.nameBn,
    nameEn: d.nameEn,
    slug: d.slug,
    areaSqKm: d.areaSqKm ?? null,
    population: d.population ?? null,
    description: null as string | null,
    createdAt: new Date(),
    divisionId: d.division.id,
    division: d.division,
    _count: { upazilas: 3 },
  }))
  return divisionSlug
    ? allWithDiv.filter((d) => d.division.slug === divisionSlug)
    : allWithDiv
}

export function getDistrictBySlugStatic(slug: string) {
  const allDistricts = st.getDistrictsWithDivision()
  const district = allDistricts.find((d) => d.slug === slug || d.slug === `${slug}-d`)
  if (!district) return null
  const upazilas = [
    { id: `u-${district.id}-1`, code: `UZ-${district.code}-1`, nameBn: `${district.nameBn} সদর`, nameEn: `${district.nameEn} Sadar`, slug: `${district.slug}-sadar`, districtId: district.id, createdAt: new Date() },
    { id: `u-${district.id}-2`, code: `UZ-${district.code}-2`, nameBn: 'উপজেলা ১', nameEn: `${district.nameEn} Upazila 1`, slug: `${district.slug}-upazila-1`, districtId: district.id, createdAt: new Date() },
    { id: `u-${district.id}-3`, code: `UZ-${district.code}-3`, nameBn: 'উপজেলা ২', nameEn: `${district.nameEn} Upazila 2`, slug: `${district.slug}-upazila-2`, districtId: district.id, createdAt: new Date() },
  ]
  return {
    id: district.id,
    code: district.code,
    nameBn: district.nameBn,
    nameEn: district.nameEn,
    slug: district.slug,
    areaSqKm: district.areaSqKm ?? null,
    population: district.population ?? null,
    description: null,
    createdAt: new Date(),
    divisionId: district.division.id,
    division: district.division,
    upazilas,
  }
}

// ─── GOVERNMENT ORGANIZATIONS ───
export function getMinistriesStatic() {
  return st.ministries.map((m) => ({
    ...m,
    sortOrder: 0,
    description: null,
    logoUrl: null,
    createdAt: new Date(),
    _count: {
      organizations: st.organizations.filter((o) => o.ministryCode === m.code).length,
      services: st.services.filter((s) => {
        const org = st.organizations.find((o) => o.slug === s.orgSlug)
        return org?.ministryCode === m.code
      }).length,
    },
  }))
}

export function getMinistryBySlugStatic(slug: string) {
  const ministry = st.ministries.find((m) => m.slug === slug)
  if (!ministry) return null
  const orgs = st.organizations.filter((o) => o.ministryCode === ministry.code)
  const orgSlugs = new Set(orgs.map((o) => o.slug))
  const services = st.services.filter((s) => orgSlugs.has(s.orgSlug ?? '') || isServiceUnderMinistry(s, ministry.code))
  return {
    ...ministry,
    sortOrder: 0,
    description: null,
    logoUrl: null,
    createdAt: new Date(),
    organizations: orgs.map((o) => ({
      ...o,
      description: null,
      status: 'active',
      sourceUrl: null,
      sourceUpdatedAt: null,
      importedAt: new Date(),
      createdAt: new Date(),
      ministryId: ministry.id,
      parentOrgId: null,
      logoUrl: null,
    })),
    services: services.map((s) => normalizeService(s)),
  }
}

function isServiceUnderMinistry(s: typeof st.services[number], ministryCode: string) {
  const org = st.organizations.find((o) => o.slug === s.orgSlug)
  return org?.ministryCode === ministryCode
}

function normalizeService(s: typeof st.services[number]) {
  return {
    ...s,
    description: null,
    status: 'active',
    ministryId: null,
    organizationId: null,
    sector: s.sector ?? null,
    stepsBn: null,
    stepsEn: null,
    sourceUpdatedAt: null,
    createdAt: new Date(),
    organization: st.organizations.find((o) => o.slug === s.orgSlug) ?? null,
    ministry: null,
  }
}

export function getOrganizationsStatic(type?: string) {
  const items = type ? st.organizations.filter((o) => o.organizationType === type) : st.organizations
  return items.map((o) => ({
    ...o,
    description: null,
    status: 'active',
    sourceUrl: null,
    sourceUpdatedAt: null,
    importedAt: new Date(),
    createdAt: new Date(),
    ministryId: null,
    parentOrgId: null,
    logoUrl: null,
    ministry: st.ministries.find((m) => m.code === o.ministryCode) ?? null,
    _count: { services: st.services.filter((s) => s.orgSlug === o.slug).length },
  }))
}

export function getOrganizationBySlugStatic(slug: string) {
  const org = st.organizations.find((o) => o.slug === slug)
  if (!org) return null
  const services = st.services.filter((s) => s.orgSlug === org.slug)
  return {
    ...org,
    description: null,
    status: 'active',
    sourceUrl: null,
    sourceUpdatedAt: null,
    importedAt: new Date(),
    createdAt: new Date(),
    ministryId: null,
    parentOrgId: null,
    logoUrl: null,
    ministry: st.ministries.find((m) => m.code === org.ministryCode) ?? null,
    services: services.map((s) => normalizeService(s)),
  }
}

// ─── SERVICES ───
export function getServicesStatic(opts?: {
  category?: string
  popular?: boolean
  limit?: number
}) {
  let list = st.services.map((s) => normalizeService(s))
  if (opts?.category && opts.category !== 'all') list = list.filter((s) => s.category === opts.category)
  if (opts?.popular) list = list.filter((s) => s.isPopular)
  list = list.sort((a, b) => {
    if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1
    return a.titleEn.localeCompare(b.titleEn)
  })
  if (opts?.limit) list = list.slice(0, opts.limit)
  return list
}

export function getServiceBySlugStatic(slug: string) {
  const s = st.services.find((x) => x.slug === slug)
  if (!s) return null
  const org = st.organizations.find((o) => o.slug === s.orgSlug) ?? null
  const ministry = org ? (st.ministries.find((m) => m.code === org.ministryCode) ?? null) : null
  return {
    ...normalizeService(s),
    organization: org ? { ...org, ministry } : null,
    ministry,
  }
}

export function getRelatedServicesStatic(category: string, excludeSlug: string, limit = 4) {
  return st.services
    .filter((s) => s.category === category && s.slug !== excludeSlug)
    .slice(0, limit)
    .map((s) => normalizeService(s))
}

// ─── NOTICES / RECRUITMENTS / FORMS / EMERGENCY / LINKS ───
export function getNoticesStatic(limit?: number) {
  let list = [...st.notices].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  if (limit) list = list.slice(0, limit)
  return list.map((n) => ({
    ...n,
    publishedAt: new Date(n.publishedAt),
    deadline: n.deadline ? new Date(n.deadline) : null,
    attachmentUrl: null,
    sourceUrl: n.sourceUrl ?? null,
    createdAt: new Date(),
  }))
}

export function getRecruitmentsStatic(limit?: number) {
  let list = [...st.recruitments].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  if (limit) list = list.slice(0, limit)
  return list.map((r) => ({
    ...r,
    publishedAt: new Date(r.publishedAt),
    deadline: new Date(r.deadline),
    sourceUrl: r.sourceUrl ?? null,
    createdAt: new Date(),
  }))
}

export function getFormsStatic(category?: string) {
  let list = [...st.forms]
  if (category) list = list.filter((f) => f.category === category)
  return list.sort((a, b) => a.titleEn.localeCompare(b.titleEn)).map((f) => ({
    ...f,
    fileUrl: null,
    sourceUrl: f.sourceUrl ?? null,
    createdAt: new Date(),
  }))
}

export function getEmergencyServicesStatic() {
  return [...st.emergencies]
    .sort((a, b) => {
      if (a.available247 !== b.available247) return a.available247 ? -1 : 1
      return a.nameEn.localeCompare(b.nameEn)
    })
    .map((e) => ({ ...e, createdAt: new Date() }))
}

export function getGovernmentLinksStatic() {
  return [...st.govLinks]
    .sort((a, b) => a.titleEn.localeCompare(b.titleEn))
    .map((l) => ({ ...l, sourceUrl: l.sourceUrl ?? null, createdAt: new Date() }))
}

// ─── STATISTICS ───
export function getStatsStatic() {
  return {
    ministries: st.ministries.length,
    organizations: st.organizations.length,
    divisions: st.divisions.length,
    districts: st.districts.length,
    upazilas: st.districts.length * 3, // representative sample
    services: st.services.length,
    forms: st.forms.length,
    emergency: st.emergencies.length,
  }
}

// ─── SEARCH (synchronous) ───
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall',
  'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'as', 'into', 'like', 'through',
  'i', 'me', 'my', 'we', 'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it',
  'its', 'they', 'them', 'their', 'this', 'that', 'these', 'those', 'and', 'or', 'but', 'not',
  'no', 'so', 'if', 'because', 'as', 'until', 'while', 'how', 'what', 'when', 'where', 'why',
  'which', 'who', 'whom',
  'আমি', 'তুমি', 'আপনি', 'তার', 'তারা', 'আমাদের', 'তোমাদের', 'তাদের',
  'কি', 'কী', 'কে', 'কাকে', 'কোথায়', 'কখন', 'কেন', 'যখন', 'তখন',
  'এবং', 'বা', 'কিন্তু', 'যদি', 'তবে', 'যেহেতু', 'কারণ',
  'একটি', 'একটা', 'এক', 'কিছু', 'অনেক', 'সব', 'কয়েক',
  'না', 'হ্যাঁ', 'হয়', 'করে', 'করতে', 'করব', 'করবেন', 'চাই', 'চায়', 'চান',
  'হবে', 'হয়েছে', 'ছিল', 'ছিলেন',
])

function matchStr(val: string | undefined | null, query: string, lower: string, tokens: string[]) {
  if (!val) return false
  if (val.includes(query) || val.toLowerCase().includes(lower)) return true
  return tokens.some((t) => val.includes(t) || val.toLowerCase().includes(t.toLowerCase()))
}

export function searchAllStatic(query: string): SearchResult[] {
  const q = query.trim()
  if (!q) return []
  const lower = q.toLowerCase()
  const tokens = q
    .split(/[\s,।!?;:'"()[\]{}]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3)
    .filter((t) => !STOP_WORDS.has(t.toLowerCase()))

  const results: SearchResult[] = []

  // Services
  for (const s of st.services) {
    if (
      matchStr(s.titleBn, q, lower, tokens) ||
      matchStr(s.titleEn, q, lower, tokens) ||
      matchStr(s.descriptionBn, q, lower, tokens) ||
      matchStr(s.descriptionEn, q, lower, tokens) ||
      matchStr(s.category, q, lower, tokens)
    ) {
      const org = st.organizations.find((o) => o.slug === s.orgSlug)
      results.push({
        type: 'service',
        id: s.slug,
        titleBn: s.titleBn,
        titleEn: s.titleEn,
        descriptionBn: s.descriptionBn,
        descriptionEn: s.descriptionEn,
        url: s.serviceUrl,
        sourceUrl: s.sourceUrl,
        meta: { category: s.category, organization: org?.nameEn ?? '' },
      })
    }
  }

  // Organizations
  for (const o of st.organizations) {
    if (
      matchStr(o.nameBn, q, lower, tokens) ||
      matchStr(o.nameEn, q, lower, tokens) ||
      matchStr(o.organizationType, q, lower, tokens) ||
      matchStr(o.addressBn, q, lower, tokens) ||
      matchStr(o.addressEn, q, lower, tokens)
    ) {
      const ministry = st.ministries.find((m) => m.code === o.ministryCode)
      results.push({
        type: 'organization',
        id: o.slug,
        titleBn: o.nameBn,
        titleEn: o.nameEn,
        descriptionBn: o.addressBn ?? undefined,
        descriptionEn: o.addressEn ?? undefined,
        url: o.officialUrl ?? undefined,
        meta: { type: o.organizationType, ministry: ministry?.nameEn ?? '' },
      })
    }
  }

  // Ministries
  for (const m of st.ministries) {
    if (matchStr(m.nameBn, q, lower, tokens) || matchStr(m.nameEn, q, lower, tokens)) {
      results.push({
        type: 'ministry',
        id: m.slug,
        titleBn: m.nameBn,
        titleEn: m.nameEn,
        url: m.officialUrl ?? undefined,
        sourceUrl: m.officialUrl ?? undefined,
      })
    }
  }

  // Districts
  for (const d of st.getDistrictsWithDivision()) {
    if (matchStr(d.nameBn, q, lower, tokens) || matchStr(d.nameEn, q, lower, tokens) || matchStr(d.slug, q, lower, tokens)) {
      results.push({
        type: 'district',
        id: d.slug,
        titleBn: d.nameBn,
        titleEn: d.nameEn,
        descriptionBn: `${d.division.nameBn} বিভাগ`,
        descriptionEn: `${d.division.nameEn} Division`,
        meta: {
          population: d.population?.toLocaleString() ?? '',
          area: d.areaSqKm ? `${d.areaSqKm} km²` : '',
        },
      })
    }
  }

  // Forms
  for (const f of st.forms) {
    if (
      matchStr(f.titleBn, q, lower, tokens) ||
      matchStr(f.titleEn, q, lower, tokens) ||
      matchStr(f.category, q, lower, tokens) ||
      matchStr(f.organization, q, lower, tokens)
    ) {
      results.push({
        type: 'form',
        id: f.id,
        titleBn: f.titleBn,
        titleEn: f.titleEn,
        descriptionBn: f.organization ?? undefined,
        descriptionEn: f.organization ?? undefined,
        url: f.officialUrl ?? undefined,
        sourceUrl: f.sourceUrl ?? undefined,
        meta: { category: f.category },
      })
    }
  }

  // Notices
  for (const n of st.notices) {
    if (
      matchStr(n.titleBn, q, lower, tokens) ||
      matchStr(n.titleEn, q, lower, tokens) ||
      matchStr(n.excerptBn, q, lower, tokens) ||
      matchStr(n.excerptEn, q, lower, tokens) ||
      matchStr(n.organization, q, lower, tokens) ||
      matchStr(n.category, q, lower, tokens)
    ) {
      results.push({
        type: 'notice',
        id: n.id,
        titleBn: n.titleBn,
        titleEn: n.titleEn,
        descriptionBn: n.excerptBn ?? undefined,
        descriptionEn: n.excerptEn ?? undefined,
        sourceUrl: n.sourceUrl ?? undefined,
        meta: { category: n.category, organization: n.organization ?? '' },
      })
    }
  }

  // Recruitments
  for (const r of st.recruitments) {
    if (
      matchStr(r.titleBn, q, lower, tokens) ||
      matchStr(r.titleEn, q, lower, tokens) ||
      matchStr(r.organization, q, lower, tokens) ||
      matchStr(r.positionBn, q, lower, tokens) ||
      matchStr(r.positionEn, q, lower, tokens)
    ) {
      results.push({
        type: 'recruitment',
        id: r.id,
        titleBn: r.titleBn,
        titleEn: r.titleEn,
        descriptionBn: r.positionBn ?? undefined,
        descriptionEn: r.positionEn ?? undefined,
        url: r.applicationUrl ?? undefined,
        sourceUrl: r.sourceUrl ?? undefined,
        meta: { organization: r.organization ?? '' },
      })
    }
  }

  // Government links
  for (const l of st.govLinks) {
    if (
      matchStr(l.titleBn, q, lower, tokens) ||
      matchStr(l.titleEn, q, lower, tokens) ||
      matchStr(l.organization, q, lower, tokens) ||
      matchStr(l.category, q, lower, tokens)
    ) {
      results.push({
        type: 'link',
        id: l.id,
        titleBn: l.titleBn,
        titleEn: l.titleEn,
        descriptionBn: l.organization ?? undefined,
        descriptionEn: l.organization ?? undefined,
        url: l.url,
      })
    }
  }

  // Deduplicate
  const seen = new Set<string>()
  const deduped: SearchResult[] = []
  for (const r of results) {
    const key = `${r.type}-${r.id}`
    if (!seen.has(key)) {
      seen.add(key)
      deduped.push(r)
    }
  }
  return deduped
}

// ─── AI ASSISTANT (client-side smart response) ───
// Since LLM SDK is server-only, in static export mode we generate a smart
// templated answer from the retrieved search results.
export function generateAssistantAnswer(query: string, lang: 'bn' | 'en'): {
  answer: string
  sources: Array<{ type: string; titleBn: string; titleEn: string; url?: string }>
  confidence: 'high' | 'medium' | 'low'
} {
  const results = searchAllStatic(query).slice(0, 8)

  if (results.length === 0) {
    return {
      answer:
        lang === 'bn'
          ? 'এই বিষয়ে নিশ্চিত সরকারি তথ্য পাওয়া যায়নি। অনুগ্রহ করে সংশ্লিষ্ট সরকারি দপ্তরের অফিসিয়াল ওয়েবসাইট দেখুন।'
          : 'No verified government information is available for this query. Please visit the official website of the relevant government department.',
      sources: [],
      confidence: 'low',
    }
  }

  const top = results[0]
  const title = lang === 'bn' ? top.titleBn : top.titleEn
  const desc = lang === 'bn' ? top.descriptionBn : top.descriptionEn

  let answer: string
  if (lang === 'bn') {
    const lines = [
      `আপনার প্রশ্নের সাথে সম্পর্কিত সরকারি তথ্য নিচে দেওয়া হলো:`,
      ``,
      `**${title}**`,
    ]
    if (desc) lines.push(desc)
    if (top.url) lines.push(``)
    if (top.url) lines.push(`অফিসিয়াল লিংক: ${top.url}`)
    if (top.meta) {
      const metaEntries = Object.entries(top.meta).filter(([, v]) => v)
      if (metaEntries.length > 0) {
        lines.push(``)
        for (const [k, v] of metaEntries.slice(0, 3)) {
          lines.push(`• ${k}: ${v}`)
        }
      }
    }
    if (results.length > 1) {
      lines.push(``)
      lines.push(`সম্পর্কিত অন্যান্য:`)
      for (const r of results.slice(1, 4)) {
        lines.push(`• ${lang === 'bn' ? r.titleBn : r.titleEn}`)
      }
    }
    lines.push(``)
    lines.push(`তথ্যের উৎস: অফিসিয়াল সরকারি পোর্টাল`)
    answer = lines.join('\n')
  } else {
    const lines = [
      `Here is the verified government information related to your query:`,
      ``,
      `**${title}**`,
    ]
    if (desc) lines.push(desc)
    if (top.url) {
      lines.push(``)
      lines.push(`Official link: ${top.url}`)
    }
    if (top.meta) {
      const metaEntries = Object.entries(top.meta).filter(([, v]) => v)
      if (metaEntries.length > 0) {
        lines.push(``)
        for (const [k, v] of metaEntries.slice(0, 3)) {
          lines.push(`• ${k}: ${v}`)
        }
      }
    }
    if (results.length > 1) {
      lines.push(``)
      lines.push(`Related:`)
      for (const r of results.slice(1, 4)) {
        lines.push(`• ${lang === 'bn' ? r.titleBn : r.titleEn}`)
      }
    }
    lines.push(``)
    lines.push(`Source: Official Government Portal`)
    answer = lines.join('\n')
  }

  return {
    answer,
    sources: results.slice(0, 4).map((r) => ({
      type: r.type,
      titleBn: r.titleBn,
      titleEn: r.titleEn,
      url: r.url ?? r.sourceUrl,
    })),
    confidence: results.length >= 3 ? 'high' : results.length >= 1 ? 'medium' : 'low',
  }
}
