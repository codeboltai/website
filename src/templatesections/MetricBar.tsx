'use client'

import { cn } from '@/lib/utils'

export interface MetricBarProps {
  /** Metric label */
  label: string
  /** Percentage value (0-100) */
  value: number
  /** Whether to show a marker at the end */
  showMarker?: boolean
  /** Color variant */
  variant?: 'default' | 'primary' | 'emerald' | 'amber' | 'indigo'
  /** Additional class names */
  className?: string
}

const barColors = {
  default: 'bg-foreground dark:bg-white',
  primary: 'bg-primary dark:bg-cyan-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
}

/**
 * MetricBar - Progress bar with label
 * 
 * Used for displaying percentage metrics with visual bars.
 * 
 * @example
 * ```tsx
 * <MetricBar label="Semantic_Depth" value={98} />
 * <MetricBar label="Logic_Inference" value={82} showMarker />
 * ```
 */
export function MetricBar({
  label,
  value,
  showMarker = false,
  variant = 'default',
  className,
}: MetricBarProps) {
  return (
    <div className={cn('group', className)}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[9px] font-mono text-muted-foreground dark:text-zinc-500 uppercase">
          {label}
        </span>
        <span className="text-[9px] font-mono text-muted-foreground dark:text-zinc-400">
          {value}%
        </span>
      </div>
      <div className="h-[1px] w-full bg-border dark:bg-neutral-800 relative">
        <div
          className={cn('absolute top-0 left-0 h-full transition-all duration-1000', barColors[variant])}
          style={{ width: `${value}%` }}
        />
        {showMarker && (
          <div className="absolute top-[-2px] right-0 w-[1px] h-[5px] bg-muted-foreground dark:bg-neutral-600" />
        )}
      </div>
    </div>
  )
}
