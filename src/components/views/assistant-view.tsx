'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Send,
  Shield,
  ExternalLink,
  Loader2,
  ArrowLeft,
  User,
  AlertCircle,
  CheckCircle2,
} from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/stores/use-language'
import { useView } from '@/stores/use-view'
import { tr } from '@/lib/i18n'
import { generateAssistantAnswer } from '@/lib/bd/client-data'

interface Source {
  type: string
  titleBn: string
  titleEn: string
  url?: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  confidence?: 'high' | 'medium' | 'low'
  loading?: boolean
}

const SUGGESTED_BN = [
  'আমি পাসপোর্ট করতে চাই',
  'জন্ম নিবন্ধন কীভাবে করব?',
  'আয়কর রিটার্ন কীভাবে দাখিল করব?',
  'ভূমি খতিয়ান কোথায় পাব?',
  'ড্রাইভিং লাইসেন্সের ফি কত?',
  'জাতীয় জরুরি নম্বর কী?',
]

const SUGGESTED_EN = [
  'I want to apply for a passport',
  'How do I register a birth?',
  'How do I file my income tax return?',
  'Where do I find my land record (khatian)?',
  'What is the fee for a driving license?',
  'What is the national emergency number?',
]

export function AssistantView() {
  const { lang } = useLanguage()
  const { go } = useView()
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [input, setInput] = React.useState('')
  const [pending, setPending] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const suggestions = lang === 'bn' ? SUGGESTED_BN : SUGGESTED_EN

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const ask = async (question: string) => {
    const trimmed = question.trim()
    if (!trimmed || pending) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    }
    const loadingMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: '',
      loading: true,
    }
    setMessages((prev) => [...prev, userMsg, loadingMsg])
    setInput('')
    setPending(true)

    try {
      // Client-side smart response generation — no API call needed (works in static export)
      // Generates a grounded answer from the verified bundled Bangladesh government data
      const result = generateAssistantAnswer(trimmed, lang)

      // Small delay to show loading state (feels more natural)
      await new Promise((resolve) => setTimeout(resolve, 400))

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? {
                ...m,
                loading: false,
                content: result.answer || tr('noData', lang),
                sources: result.sources.map((s) => ({
                  type: s.type,
                  titleBn: s.titleBn,
                  titleEn: s.titleEn,
                  url: s.url,
                })),
                confidence: result.confidence,
              }
            : m
        )
      )
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? {
                ...m,
                loading: false,
                content: tr('error', lang),
              }
            : m
        )
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 sm:py-8 flex flex-col h-[calc(100vh-7rem)] lg:h-[calc(100vh-9rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => go('home')} className="rounded-full shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-primary text-primary-foreground relative shrink-0">
            <Sparkles className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-bd-green border-2 border-background" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-foreground">
              {tr('assistantTitle', lang)}
            </h1>
            <p className="text-xs text-muted-foreground truncate">
              {tr('assistantSubtitle', lang)}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="mb-3 p-3 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
          <p>{tr('assistantDisclaimer', lang)}</p>
        </div>
      </Card>

      {/* Chat messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 py-4"
          >
            <div className="text-center max-w-md mx-auto">
              <div className="grid place-items-center h-16 w-16 rounded-2xl bg-primary/10 mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {tr('assistantTitle', lang)}
              </h2>
              <p className="text-xs text-muted-foreground">
                {tr('assistantSubtitle', lang)}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 text-center">
                {tr('assistantSuggestions', lang)}
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="text-left p-3 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all text-sm group"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-foreground">{s}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`grid place-items-center h-8 w-8 rounded-full shrink-0 ${
                  m.role === 'user'
                    ? 'bg-foreground text-background'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {m.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>
              <div
                className={`flex-1 min-w-0 ${m.role === 'user' ? 'flex justify-end' : ''}`}
              >
                {m.loading ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-muted text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>{tr('loading', lang)}</span>
                  </div>
                ) : (
                  <>
                    <div
                      className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-card border border-border rounded-bl-sm text-foreground'
                      } max-w-full`}
                    >
                      <div className="whitespace-pre-wrap break-words">{m.content}</div>
                    </div>

                    {m.role === 'assistant' && m.sources && m.sources.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {m.confidence && (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            {m.confidence === 'high' ? (
                              <Badge variant="outline" className="gap-1 text-bd-green border-bd-green/30 bg-bd-green/5">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                {lang === 'bn' ? 'উচ্চ আত্মবিশ্বাস' : 'High confidence'}
                              </Badge>
                            ) : m.confidence === 'medium' ? (
                              <Badge variant="outline" className="gap-1 text-amber-600 border-amber-600/30 bg-amber-500/5">
                                <AlertCircle className="h-2.5 w-2.5" />
                                {lang === 'bn' ? 'মাঝারি আত্মবিশ্বাস' : 'Medium confidence'}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="gap-1 text-bd-red border-bd-red/30 bg-bd-red/5">
                                <AlertCircle className="h-2.5 w-2.5" />
                                {lang === 'bn' ? 'নিম্ন আত্মবিশ্বাস' : 'Low confidence'}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                          {tr('assistantSource', lang)}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {m.sources.slice(0, 4).map((s, i) => (
                            <a
                              key={i}
                              href={s.url ?? '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/60 hover:bg-primary/10 hover:text-primary text-[11px] transition-colors max-w-full"
                            >
                              <Shield className="h-2.5 w-2.5 shrink-0" />
                              <span className="truncate">
                                {lang === 'bn' ? s.titleBn : s.titleEn}
                              </span>
                              <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          ask(input)
        }}
        className="relative"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tr('assistantPlaceholder', lang)}
          disabled={pending}
          className="w-full h-12 sm:h-14 pl-4 pr-14 rounded-2xl bg-card border border-border shadow-sm text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-60"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || pending}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  )
}
