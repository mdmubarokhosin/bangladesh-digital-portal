'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchState {
  recent: string[]
  trending: string[]
  addRecent: (q: string) => void
  clearRecent: () => void
}

const TRENDING_DEFAULT = [
  'পাসপোর্ট',
  'জন্ম নিবন্ধন',
  'জাতীয় পরিচয়পত্র',
  'ভূমি খতিয়ান',
  'আয়কর',
  'ড্রাইভিং লাইসেন্স',
  'রেলওয়ে টিকিট',
  'পরীক্ষার ফলাফল',
]

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      recent: [],
      trending: TRENDING_DEFAULT,
      addRecent: (q) => {
        const trimmed = q.trim()
        if (!trimmed) return
        const filtered = get().recent.filter((r) => r !== trimmed)
        set({ recent: [trimmed, ...filtered].slice(0, 10) })
      },
      clearRecent: () => set({ recent: [] }),
    }),
    { name: 'bd-search' }
  )
)
