'use client'

import { motion } from 'motion/react'
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
  /** Number of columns (2, 3, or 4) */
  columns?: 2 | 3 | 4
  /** 
   * Layout variant:
   * - 'divider': Horizontal dividers between metrics (original)
   * - 'strip': Bordered cells with label on top, value below (Hero.tsx style)
   * - 'centered': Centered text with colored values (features/page.tsx style)
   * - 'cards': Individual bordered cards (multi-agent-swarms style)
   */
  variant?: 'divider' | 'strip' | 'centered' | 'cards'
  /** Wrap in a section with background (for centered/cards variants) */
  asSection?: boolean
  /** Section background tone */
  sectionTone?: 'default' | 'muted'
  /** Whether to animate on scroll */
  animate?: boolean
  /** Animation delay (in seconds) */
  animationDelay?: number
  /** Additional class names */
  className?: string
}

/**
 * MetricStrip - Flexible horizontal row of key metrics
 * 
 * Supports multiple layout variants for different use cases:
 * - `divider`: Original style with divider lines
 * - `strip`: Bordered cells (Hero.tsx stats strip)
 * - `centered`: Centered values with color (features overview)
 * - `cards`: Individual bordered cards (feature detail pages)
 * 
 * @example
 * ```tsx
 * // Original divider style
 * <MetricStrip
 *   variant="divider"
 *   columns={4}
 *   metrics={[
 *     { label: 'Rate', value: '50:1', meta: 'Token/Vector' },
 *   ]}
 * />
 * 
 * // Hero strip style
 * <MetricStrip
 *   variant="strip"
 *   animate
 *   animationDelay={0.4}
 *   metrics={[
 *     { label: 'Parallel Agents', value: '100+' },
 *     { label: 'Operation Mode', value: '24/7' },
 *   ]}
 * />
 * 
 * // Centered section style
 * <MetricStrip
 *   variant="centered"
 *   asSection
 *   sectionTone="muted"
 *   metrics={[
 *     { label: 'Parallel Agents', value: '100+', highlight: true },
 *   ]}
 * />
 * 
 * // Cards style
 * <MetricStrip
 *   variant="cards"
 *   metrics={[
 *     { label: 'Linear Scaling', value: '100x' },
 *   ]}
 * />
 * ```
 */
export function MetricStrip({
  metrics,
  columns = 4,
  variant = 'divider',
  asSection = false,
  sectionTone = 'default',
  animate = false,
  animationDelay = 0,
  className,
}: MetricStripProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  // Render metric based on variant
  const renderMetric = (m: MetricData, idx: number) => {
    switch (variant) {
      case 'strip':
        // Hero.tsx style - bordered cells, label on top
        const isLastCol = (idx + 1) % (columns === 2 ? 2 : 4) === 0
        const isFirstRow = idx < (columns === 2 ? 2 : 4)
        return (
          <div
            key={idx}
            className={cn(
              'p-6',
              !isLastCol && 'border-r border-border dark:border-zinc-800',
              !isFirstRow && columns === 2 && 'border-t border-border dark:border-zinc-800',
              idx < 2 && columns === 4 && 'border-b md:border-b-0 border-border dark:border-zinc-800'
            )}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-2">
              {m.label}
            </span>
            <span className={cn(
              'font-mono text-2xl',
              m.highlight ? 'text-primary dark:text-cyan-400' : 'text-foreground dark:text-white'
            )}>
              {m.value}
            </span>
          </div>
        )

      case 'centered':
        // features/page.tsx style - centered, colored values
        return (
          <div key={idx} className="text-center">
            <span className={cn(
              'font-mono text-4xl font-medium block mb-2',
              m.highlight !== false ? 'text-primary dark:text-cyan-400' : 'text-foreground dark:text-white'
            )}>
              {m.value}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {m.label}
            </span>
          </div>
        )

      case 'cards':
        // multi-agent-swarms style - bordered cards
        return (
          <div
            key={idx}
            className="text-center p-8 border border-border dark:border-zinc-800 bg-card/30 dark:bg-zinc-900/30"
          >
            <span className={cn(
              'font-mono text-3xl block mb-2',
              m.highlight !== false ? 'text-primary dark:text-cyan-400' : 'text-foreground dark:text-white'
            )}>
              {m.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {m.label}
            </span>
          </div>
        )

      case 'divider':
      default:
        // Original style
        return (
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
        )
    }
  }

  // Base grid styles per variant
  const getGridClasses = () => {
    switch (variant) {
      case 'strip':
        return cn(
          'grid gap-0 border border-border dark:border-zinc-800',
          gridCols[columns]
        )
      case 'centered':
        return cn('grid gap-8', gridCols[columns])
      case 'cards':
        return cn('grid gap-6', gridCols[columns])
      case 'divider':
      default:
        return cn(
          'grid border-b border-border dark:border-zinc-800',
          gridCols[columns],
          'divide-x divide-border dark:divide-zinc-800'
        )
    }
  }

  const content = (
    <div className={cn(getGridClasses(), className)}>
      {metrics.map((m, idx) => renderMetric(m, idx))}
    </div>
  )

  // Wrap with animation if needed
  const animatedContent = animate ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      {content}
    </motion.div>
  ) : (
    content
  )

  // Wrap in section if needed
  if (asSection) {
    return (
      <section
        className={cn(
          'py-16 px-6 border-y border-border dark:border-zinc-900',
          sectionTone === 'muted'
            ? 'bg-muted/10 dark:bg-zinc-900/20'
            : 'bg-background dark:bg-[#050505]'
        )}
      >
        <div className="max-w-6xl mx-auto">
          {animatedContent}
        </div>
      </section>
    )
  }

  return animatedContent
}
