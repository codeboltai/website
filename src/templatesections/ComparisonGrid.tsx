'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface ComparisonItem {
  /** Figure label (e.g., "Fig 4.0: Linear Sequence") */
  figureLabel?: string
  /** Risk/status badge text */
  badge?: string
  /** Badge variant */
  badgeVariant?: 'default' | 'risk' | 'success'
  /** Visual diagram */
  visual?: ReactNode
  /** Title */
  title: string
  /** Description */
  description: string | ReactNode
  /** Footer note */
  footer?: string
  /** Background variant */
  bgVariant?: 'default' | 'muted' | 'highlight'
}

export interface ComparisonGridProps {
  /** Left comparison item */
  left: ComparisonItem
  /** Right comparison item */
  right: ComparisonItem
  /** Additional class names */
  className?: string
}

const badgeStyles = {
  default: 'border-border bg-muted/20 text-muted-foreground',
  risk: 'border-red-900/30 bg-red-900/10 text-red-500',
  success: 'border-green-900/30 bg-green-900/10 text-green-500',
}

const bgStyles = {
  default: 'bg-card dark:bg-[#050505]',
  muted: 'bg-muted/10 dark:bg-zinc-900/10',
  highlight: 'bg-muted/5 dark:bg-[#080808]',
}

/**
 * ComparisonGrid - Side-by-side comparison layout
 * 
 * Used for before/after, old/new, or A/B comparisons.
 * 
 * @example
 * ```tsx
 * <ComparisonGrid
 *   left={{
 *     figureLabel: "Fig 4.0: Linear Sequence",
 *     badge: "Risk: High",
 *     badgeVariant: "risk",
 *     visual: <LinearDiagram />,
 *     title: "Dec 2025 Standard",
 *     description: "Models predicted step 1 → 2 → 3...",
 *     footer: "Outcome: Frequent hallucinations on long-tasks.",
 *   }}
 *   right={{
 *     figureLabel: "Fig 4.1: Divergent Search",
 *     badge: "RISK: MITIGATED",
 *     badgeVariant: "success",
 *     visual: <DivergentDiagram />,
 *     title: "Horizon Mode",
 *     description: "The system utilizes a Recursive Swarm Topology...",
 *     footer: "Capability Unlocked: 24h+ Continuous Reasoning",
 *     bgVariant: "highlight",
 *   }}
 * />
 * ```
 */
export function ComparisonGrid({
  left,
  right,
  className,
}: ComparisonGridProps) {
  const renderItem = (item: ComparisonItem, side: 'left' | 'right') => (
    <div
      className={cn(
        'p-8 md:p-12 flex flex-col justify-between relative overflow-hidden',
        side === 'left' ? 'border-b md:border-b-0 md:border-r border-border dark:border-zinc-800' : '',
        bgStyles[item.bgVariant ?? 'default']
      )}
    >
      {/* Grid overlay for highlight */}
      {item.bgVariant === 'highlight' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      )}

      <div className="relative z-10">
        {/* Figure label + badge */}
        <div className="font-mono text-xs uppercase text-muted-foreground dark:text-zinc-500 mb-8 flex justify-between items-center">
          <span className="flex items-center gap-2">
            {side === 'right' && (
              <span className="w-1.5 h-1.5 bg-foreground dark:bg-white rounded-full" />
            )}
            {item.figureLabel}
          </span>
          {item.badge && (
            <span className={cn('px-2 py-1 border text-[10px] tracking-wider', badgeStyles[item.badgeVariant ?? 'default'])}>
              {item.badge}
            </span>
          )}
        </div>

        {/* Visual */}
        {item.visual && (
          <div className="h-48 w-full border border-border dark:border-zinc-800 bg-muted/10 dark:bg-[#080808] mb-8 relative flex items-center justify-center overflow-hidden">
            {item.visual}
          </div>
        )}

        {/* Title */}
        <h3 className="text-foreground dark:text-white font-medium mb-3 text-lg">
          {item.title}
        </h3>

        {/* Description */}
        <div className="text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed">
          {typeof item.description === 'string' ? <p>{item.description}</p> : item.description}
        </div>
      </div>

      {/* Footer */}
      {item.footer && (
        <div className="relative z-10 mt-8 pt-4 border-t border-border dark:border-zinc-800">
          <span className="font-mono text-[10px] text-muted-foreground/70 dark:text-zinc-600">
            {item.footer}
          </span>
        </div>
      )}
    </div>
  )

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 border-b border-border dark:border-zinc-800', className)}>
      {renderItem(left, 'left')}
      {renderItem(right, 'right')}
    </div>
  )
}
