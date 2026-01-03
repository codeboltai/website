'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface SectionHeaderProps {
  /** Kicker/eyebrow text (optional) */
  kicker?: string
  /** Kicker dot color variant */
  kickerDot?: 'primary' | 'emerald' | 'amber' | 'indigo' | 'purple' | 'red' | 'muted'
  /** Whether kicker dot should animate */
  kickerPulse?: boolean
  /** Main heading (can be multi-line using \n) */
  title: string
  /** Description paragraph */
  description?: string | ReactNode
  /** Right-aligned status/badge content */
  rightContent?: ReactNode
  /** Text alignment */
  align?: 'left' | 'center'
  /** Animation enabled */
  animate?: boolean
  /** Additional class names */
  className?: string
}

const dotColors: Record<NonNullable<SectionHeaderProps['kickerDot']>, string> = {
  primary: 'bg-primary dark:bg-cyan-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  muted: 'bg-muted-foreground dark:bg-zinc-500',
}

/**
 * SectionHeader - Consistent header for sections
 * 
 * Provides kicker text, two-tone title, and description.
 * Supports animation and right-aligned status content.
 * 
 * @example
 * ```tsx
 * <SectionHeader
 *   kicker="System Architecture"
 *   kickerDot="emerald"
 *   title={"Multi-line Title\nWith Muted Continuation"}
 *   description="Your descriptive text here."
 * />
 * ```
 */
export function SectionHeader({
  kicker,
  kickerDot = 'primary',
  kickerPulse = false,
  title,
  description,
  rightContent,
  align = 'left',
  animate = true,
  className,
}: SectionHeaderProps) {
  const titleLines = title.split('\n')

  const content = (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12',
        align === 'center' && 'md:flex-col md:items-center text-center',
        className
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        {/* Kicker */}
        {kicker && (
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex h-2 w-2">
              {kickerPulse && (
                <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[kickerDot])} />
              )}
              <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[kickerDot])} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground dark:text-zinc-500">
              {kicker}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
          {titleLines.map((line, i) => (
            <span
              key={i}
              className={cn(
                'block',
                i === 0 ? 'text-foreground dark:text-white' : 'text-muted-foreground dark:text-zinc-500'
              )}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* Description */}
        {description && (
          <div className="text-lg text-muted-foreground dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        )}
      </div>

      {/* Right content (e.g., stats, badges) */}
      {rightContent && (
        <div className="flex-shrink-0">
          {rightContent}
        </div>
      )}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
