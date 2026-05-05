'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface TwoColumnSectionProps {
  /** Left column content */
  left: ReactNode
  /** Right column content */
  right: ReactNode
  /** Column split ratio */
  split?: '5-7' | '7-5' | '6-6' | '4-8' | '8-4'
  /** Which column shows first on mobile */
  mobileOrder?: 'left-first' | 'right-first'
  /** Vertical alignment */
  align?: 'start' | 'center' | 'end'
  /** Gap between columns */
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether columns have divider */
  divider?: boolean
  /** Animation enabled */
  animate?: boolean
  /** Additional class names */
  className?: string
}

const splitStyles: Record<NonNullable<TwoColumnSectionProps['split']>, { left: string; right: string }> = {
  '5-7': { left: 'lg:col-span-5', right: 'lg:col-span-7' },
  '7-5': { left: 'lg:col-span-7', right: 'lg:col-span-5' },
  '6-6': { left: 'lg:col-span-6', right: 'lg:col-span-6' },
  '4-8': { left: 'lg:col-span-4', right: 'lg:col-span-8' },
  '8-4': { left: 'lg:col-span-8', right: 'lg:col-span-4' },
}

const gapStyles: Record<NonNullable<TwoColumnSectionProps['gap']>, string> = {
  sm: 'gap-8',
  md: 'gap-12',
  lg: 'gap-16',
  xl: 'gap-24',
}

const alignStyles: Record<NonNullable<TwoColumnSectionProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}

/**
 * TwoColumnSection - Responsive two-column layout
 * 
 * Commonly used for text + diagram layouts. Supports various split ratios
 * and responsive reordering.
 * 
 * @example
 * ```tsx
 * <TwoColumnSection
 *   split="5-7"
 *   align="center"
 *   left={<TextContent />}
 *   right={<DiagramPanel />}
 * />
 * ```
 */
export function TwoColumnSection({
  left,
  right,
  split = '5-7',
  mobileOrder = 'left-first',
  align = 'center',
  gap = 'lg',
  divider = false,
  animate = true,
  className,
}: TwoColumnSectionProps) {
  const { left: leftClass, right: rightClass } = splitStyles[split]

  const leftCol = (
    <div className={cn('col-span-1', leftClass, mobileOrder === 'right-first' && 'lg:order-first order-last')}>
      {left}
    </div>
  )

  const rightCol = (
    <div className={cn('col-span-1', rightClass, mobileOrder === 'right-first' && 'lg:order-last order-first')}>
      {right}
    </div>
  )

  const content = (
    <div className={cn(
      'grid grid-cols-1 lg:grid-cols-12',
      gapStyles[gap],
      alignStyles[align],
      divider && 'divide-y lg:divide-y-0 lg:divide-x divide-border dark:divide-zinc-800',
      className
    )}>
      {leftCol}
      {rightCol}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
