/**
 * Local type definitions — replaces @prisma/client types.
 * These mirror the Prisma schema fields but don't require the Prisma client.
 * Used for type-only imports across the app.
 */

export interface Ministry {
  id: string
  code: string
  nameBn: string
  nameEn: string
  slug: string
  description: string | null
  officialUrl: string | null
  logoUrl: string | null
  sortOrder: number
  createdAt: Date
  _count?: { organizations: number; services: number }
}

export interface GovernmentOrganization {
  id: string
  nameBn: string
  nameEn: string
  slug: string
  organizationType: string
  ministryId: string | null
  parentOrgId: string | null
  description: string | null
  officialUrl: string | null
  email: string | null
  phone: string | null
  addressBn: string | null
  addressEn: string | null
  status: string
  sourceUrl: string | null
  sourceUpdatedAt: Date | null
  importedAt: Date
  createdAt: Date
  ministry?: Ministry | null
  _count?: { services: number }
}

export interface GovernmentService {
  id: string
  slug: string
  titleBn: string
  titleEn: string
  descriptionBn: string
  descriptionEn: string
  category: string
  sector: string | null
  ministryId: string | null
  organizationId: string | null
  serviceUrl: string | null
  mobileAvailable: boolean
  onlineApplication: boolean
  requiredDocuments: string | null
  fees: string | null
  processingTime: string | null
  eligibility: string | null
  stepsBn: string | null
  stepsEn: string | null
  status: string
  isPopular: boolean
  sourceUrl: string | null
  sourceUpdatedAt: Date | null
  createdAt: Date
  organization?: GovernmentOrganization | null
  ministry?: Ministry | null
}

export interface Division {
  id: string
  code: string
  nameBn: string
  nameEn: string
  slug: string
  description: string | null
  createdAt: Date
  _count?: { districts: number }
}

export interface District {
  id: string
  code: string
  divisionId: string
  nameBn: string
  nameEn: string
  slug: string
  areaSqKm: number | null
  population: number | null
  description: string | null
  createdAt: Date
  division?: Division
  _count?: { upazilas: number }
}

export interface Upazila {
  id: string
  code: string
  districtId: string
  nameBn: string
  nameEn: string
  slug: string
  createdAt: Date
  district?: District
}

export interface Form {
  id: string
  titleBn: string
  titleEn: string
  category: string
  organization: string | null
  fileUrl: string | null
  officialUrl: string | null
  sourceUrl: string | null
  createdAt: Date
}

export interface Notice {
  id: string
  titleBn: string
  titleEn: string
  organization: string | null
  category: string
  publishedAt: Date
  deadline: Date | null
  excerptBn: string | null
  excerptEn: string | null
  attachmentUrl: string | null
  sourceUrl: string | null
  createdAt: Date
}

export interface Recruitment {
  id: string
  titleBn: string
  titleEn: string
  organization: string | null
  positionBn: string | null
  positionEn: string | null
  publishedAt: Date
  deadline: Date
  applicationUrl: string | null
  sourceUrl: string | null
  createdAt: Date
}

export interface EmergencyService {
  id: string
  nameBn: string
  nameEn: string
  number: string
  descriptionBn: string | null
  descriptionEn: string | null
  organization: string | null
  available247: boolean
  category: string
  createdAt: Date
}

export interface GovernmentLink {
  id: string
  titleBn: string
  titleEn: string
  organization: string | null
  category: string
  url: string
  sourceUrl: string | null
  createdAt: Date
}
