'use client'

import { cn } from '@/lib/utils'

export interface TierCardProps {
  /** Tier label (e.g., "Enterprise_Tier_02") */
  tierLabel: string
  /** Tier title */
  title: string
  /** Main numeric value */
  value: string
  /** Value suffix (e.g., "Concurrent Agents") */
  valueSuffix?: string
  /** Description */
  description: string
  /** Progress percentage (e.g., "20%") */
  progress?: string
  /** Accent color variant */
  accent?: 'default' | 'purple' | 'emerald' | 'amber'
  /** Additional class names */
  className?: string
}

const accentStyles = {
  default: {
    value: 'text-foreground dark:text-white',
    bar: 'bg-foreground dark:bg-white',
  },
  purple: {
    value: 'text-purple-400',
    bar: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
  },
  emerald: {
    value: 'text-emerald-400',
    bar: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
  },
  amber: {
    value: 'text-amber-400',
    bar: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
  },
}

/**
 * TierCard - Tier comparison card
 * 
 * Used for pricing tiers or capacity levels with progress indicators.
 * 
 * @example
 * ```tsx
 * <TierCard
 *   tierLabel="Enterprise_Tier_01"
 *   title="Hive Level"
 *   value="10k"
 *   valueSuffix="Concurrent Agents"
 *   description="Industrial scale. Capable of generating entire OS kernels..."
 *   progress="100%"
 *   accent="purple"
 * />
 * ```
 */
export function TierCard({
  tierLabel,
  title,
  value,
  valueSuffix,
  description,
  progress,
  accent = 'default',
  className,
}: TierCardProps) {
  const styles = accentStyles[accent]

  return (
    <div className={cn('p-8 md:p-12 hover:bg-muted/10 dark:hover:bg-zinc-900/20 transition-colors', className)}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="font-mono text-xs uppercase text-muted-foreground dark:text-zinc-500 mb-1">
            {tierLabel}
          </div>
          <h4 className="text-2xl text-foreground dark:text-white font-light">
            {title}
          </h4>
        </div>
        <div className="text-right">
          <span className={cn('block text-3xl font-light', styles.value)}>{value}</span>
          {valueSuffix && (
            <span className="text-[10px] font-mono text-muted-foreground/70 dark:text-zinc-600 uppercase">
              {valueSuffix}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed mb-6">
        {description}
      </p>

      {/* Progress bar */}
      {progress && (
        <>
          <div className="w-full bg-neutral-800 dark:bg-zinc-800 h-1 mt-4">
            <div className={cn('h-1', styles.bar)} style={{ width: progress }} />
          </div>
          <div className="mt-2 text-[9px] font-mono text-muted-foreground/70 dark:text-zinc-600 text-right">
            Capacity: {progress}
          </div>
        </>
      )}
    </div>
  )
}
