'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ViewName =
  | 'home'
  | 'services'
  | 'service-detail'
  | 'ministries'
  | 'ministry-detail'
  | 'organizations'
  | 'organization-detail'
  | 'bangladesh'
  | 'district-detail'
  | 'notices'
  | 'jobs'
  | 'forms'
  | 'emergency'
  | 'assistant'
  | 'search'
  | 'favorites'
  | 'about'
  | 'laws'

interface ViewState {
  view: ViewName
  params: Record<string, string>
  history: Array<{ view: ViewName; params: Record<string, string> }>
  // Navigation
  go: (view: ViewName, params?: Record<string, string>) => void
  back: () => void
  canGoBack: () => boolean
  // Search
  searchQuery: string
  setSearchQuery: (q: string) => void
}

export const useView = create<ViewState>()(
  persist(
    (set, get) => ({
      view: 'home',
      params: {},
      history: [],
      searchQuery: '',
      go: (view, params = {}) => {
        const { view: curView, params: curParams, history } = get()
        set({
          view,
          params,
          history: [...history, { view: curView, params: curParams }].slice(-50),
        })
        // Scroll to top on navigation
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        }
      },
      back: () => {
        const { history } = get()
        if (history.length === 0) return
        const last = history[history.length - 1]
        set({
          view: last.view,
          params: last.params,
          history: history.slice(0, -1),
        })
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        }
      },
      canGoBack: () => get().history.length > 0,
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: 'bd-view',
      // Don't persist history (it grows unbounded) — only current view/lang
      partialize: (s) => ({ view: 'home', params: {}, history: [], searchQuery: '' }),
    }
  )
)
