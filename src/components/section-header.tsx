'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from '@/components/icon'
import { Button } from '@/components/ui/button'

interface SectionHeaderProps {
  titleBn: string
  titleEn: string
  subtitleBn?: string
  subtitleEn?: string
  lang: 'bn' | 'en'
  viewAllLabelBn?: string
  viewAllLabelEn?: string
  onViewAll?: () => void
}

export function SectionHeader({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  lang,
  viewAllLabelBn = 'সব দেখুন',
  viewAllLabelEn = 'View all',
  onViewAll,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-end justify-between gap-4 mb-5"
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          {lang === 'bn' ? titleBn : titleEn}
        </h2>
        {(subtitleBn || subtitleEn) && (
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === 'bn' ? subtitleBn : subtitleEn}
          </p>
        )}
      </div>
      {onViewAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="shrink-0 text-primary hover:bg-primary/10 hover:text-primary gap-1"
        >
          <span className="text-xs font-medium">
            {lang === 'bn' ? viewAllLabelBn : viewAllLabelEn}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      )}
    </motion.div>
  )
}
