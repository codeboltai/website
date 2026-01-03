'use client'

import { cn } from '@/lib/utils'

export interface MetricData {
  /** Metric label */
  label: string
  /** Metric value */
  value: string
  /** Optional sublabel/meta */
  meta?: string
  /** Highlight color */
  highlight?: boolean
}

export interface MetricStripProps {
  /** Array of metrics to display */
  metrics: MetricData[]
  /** Number of columns (2 or 4) */
  columns?: 2 | 4
  /** Whether to show dividers */
  divider?: boolean
  /** Additional class names */
  className?: string
}

/**
 * MetricStrip - Horizontal row of key metrics
 * 
 * Used for displaying 2-4 key statistics in a bordered strip.
 * 
 * @example
 * ```tsx
 * <MetricStrip
 *   columns={4}
 *   divider
 *   metrics={[
 *     { label: 'Compression Rate', value: '50:1', meta: 'Token/Vector' },
 *     { label: 'Recall Accuracy', value: '99.9%', meta: 'P-Value < 0.01' },
 *     { label: 'Inference Latency', value: '12ms', meta: 'Per Step' },
 *     { label: 'Max Context', value: '∞', meta: 'Theoretical' },
 *   ]}
 * />
 * ```
 */
export function MetricStrip({
  metrics,
  columns = 4,
  divider = true,
  className,
}: MetricStripProps) {
  return (
    <div
      className={cn(
        'grid border-b border-border dark:border-zinc-800',
        columns === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4',
        divider && 'divide-x divide-border dark:divide-zinc-800',
        className
      )}
    >
      {metrics.map((m, idx) => (
        <div key={idx} className="p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 mb-2">
            {m.label}
          </div>
          <div className={cn(
            'text-3xl font-light mb-1',
            m.highlight ? 'text-primary dark:text-cyan-500' : 'text-foreground dark:text-white'
          )}>
            {m.value}
          </div>
          {m.meta && (
            <div className="font-mono text-[10px] text-muted-foreground/70 dark:text-zinc-600">
              {m.meta}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
