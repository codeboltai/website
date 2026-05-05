'use client'

import { cn } from '@/lib/utils'

export interface LayerRowProps {
  /** Layer level (e.g., "$L_1$", "L1") */
  level: string
  /** Layer title */
  title: string
  /** Meta information */
  meta: string
  /** Whether this is the last row (no bottom border) */
  isLast?: boolean
  /** Level color variant */
  levelVariant?: 'default' | 'emerald' | 'amber' | 'red'
  /** Additional class names */
  className?: string
}

const levelColors = {
  default: 'text-muted-foreground dark:text-zinc-400',
  emerald: 'text-emerald-600 dark:text-emerald-500',
  amber: 'text-amber-600 dark:text-amber-500',
  red: 'text-red-600 dark:text-red-500',
}

/**
 * LayerRow - Pipeline layer row
 * 
 * Used for displaying verification layers or process stages.
 * 
 * @example
 * ```tsx
 * <LayerRow level="L1" title="Syntactic Validity" meta="AST Integrity" />
 * <LayerRow level="L2" title="Static Analysis" meta="SAST Scan" />
 * <LayerRow level="L3" title="Functional Correctness" meta="Test Harness" isLast />
 * ```
 */
export function LayerRow({
  level,
  title,
  meta,
  isLast = false,
  levelVariant = 'emerald',
  className,
}: LayerRowProps) {
  return (
    <div
      className={cn(
        'p-4 flex justify-between items-center group hover:bg-muted/30 dark:hover:bg-zinc-900/30 transition-colors',
        !isLast && 'border-b border-border dark:border-zinc-800',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('font-mono text-xs', levelColors[levelVariant])}>
          {level}
        </span>
        <span className="text-sm text-foreground dark:text-white font-medium">
          {title}
        </span>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500">
        {meta}
      </div>
    </div>
  )
}
