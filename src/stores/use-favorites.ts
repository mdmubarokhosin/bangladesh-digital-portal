'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FavoriteType =
  | 'service'
  | 'organization'
  | 'ministry'
  | 'form'
  | 'notice'
  | 'recruitment'
  | 'link'

interface FavoriteItem {
  id: string
  type: FavoriteType
  titleBn: string
  titleEn: string
  subtitle?: string
  url?: string
  savedAt: number
}

interface FavoritesState {
  items: FavoriteItem[]
  toggle: (item: Omit<FavoriteItem, 'savedAt'>) => void
  has: (id: string) => boolean
  remove: (id: string) => void
  clear: () => void
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.some((i) => i.id === item.id)
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== item.id) })
        } else {
          set({ items: [{ ...item, savedAt: Date.now() }, ...get().items].slice(0, 200) })
        }
      },
      has: (id) => get().items.some((i) => i.id === item.id),
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: 'bd-favorites' }
  )
)
