'use client'

import { cn } from '@/lib/utils'

export interface MetricDisplayProps {
  /** Metric label */
  label: string
  /** Metric value */
  value: string
  /** Optional trend indicator (e.g., "+15%") */
  trend?: string
  /** Color variant */
  variant?: 'default' | 'primary' | 'emerald' | 'amber' | 'indigo'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Additional class names */
  className?: string
}

const valueColors = {
  default: 'text-foreground dark:text-white',
  primary: 'text-primary dark:text-cyan-500',
  emerald: 'text-emerald-500',
  amber: 'text-amber-500',
  indigo: 'text-indigo-400',
}

const sizeStyles = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
}

/**
 * MetricDisplay - Large metric value display
 * 
 * Used for displaying key statistics with optional trends.
 * 
 * @example
 * ```tsx
 * <MetricDisplay label="Dev Velocity" value="100x" variant="primary" />
 * <MetricDisplay label="Safety Violations" value="-89%" trend="▼" />
 * ```
 */
export function MetricDisplay({
  label,
  value,
  trend,
  variant = 'default',
  size = 'md',
  className,
}: MetricDisplayProps) {
  // Handle percentage suffix
  const trimmed = value.trim()
  const hasPercent = trimmed.endsWith('%')
  const mainValue = hasPercent ? trimmed.slice(0, -1) : trimmed

  return (
    <div className={className}>
      <span className="block text-[9px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-widest mb-2">
        {label}
      </span>
      <span className={cn('block font-light mb-1', sizeStyles[size], valueColors[variant])}>
        {mainValue}
        {hasPercent && <span className="text-sm text-muted-foreground dark:text-zinc-600">%</span>}
      </span>
      {trend && (
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
          {trend}
        </span>
      )}
    </div>
  )
}
