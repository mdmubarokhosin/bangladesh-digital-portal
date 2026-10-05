'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Language = 'bn' | 'en'

interface LanguageState {
  lang: Language
  setLang: (l: Language) => void
  toggle: () => void
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: 'bn',
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === 'bn' ? 'en' : 'bn' }),
    }),
    { name: 'bd-lang' }
  )
)

// Helper to pick a localized string
export function t(bn: string, en: string, lang: Language = 'bn') {
  return lang === 'bn' ? bn : en
}
