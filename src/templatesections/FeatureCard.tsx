'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface FeatureCardProps {
  /** Figure label (e.g., "Fig 3.1 — Linear Attention") */
  figureLabel?: string
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Diagram/visual content */
  diagram?: ReactNode
  /** Stats to display at bottom */
  stats?: Array<{ label: string; value: string; highlight?: boolean }>
  /** Background variant */
  variant?: 'default' | 'muted'
  /** Additional class names */
  className?: string
}

/**
 * FeatureCard - Technical feature card with diagram area
 * 
 * Used for showcasing individual features with visualizations.
 * Includes figure labels, corner brackets, and optional stats.
 * 
 * @example
 * ```tsx
 * <FeatureCard
 *   figureLabel="Fig 3.1 — Linear Attention"
 *   title="Infinite Context"
 *   description="Virtualized session handling allows for..."
 *   diagram={<LinearAttentionDiagram />}
 *   stats={[{ label: 'Capacity', value: '∞ (Virtual)' }]}
 * />
 * ```
 */
export function FeatureCard({
  figureLabel,
  title,
  description,
  diagram,
  stats,
  variant = 'default',
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative border border-border p-6 transition-all duration-500 hover:border-muted-foreground/50',
        'dark:border-zinc-800 dark:hover:border-zinc-700',
        variant === 'muted' && 'bg-muted/10 dark:bg-zinc-900/10',
        className
      )}
    >
      {/* Corner brackets */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-muted-foreground/40 dark:border-zinc-600" />
      <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-muted-foreground/40 dark:border-zinc-600" />
      <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-muted-foreground/40 dark:border-zinc-600" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-muted-foreground/40 dark:border-zinc-600" />

      {/* Figure label */}
      {figureLabel && (
        <div className="mb-4 font-mono text-[10px] uppercase text-muted-foreground dark:text-zinc-500 tracking-widest">
          {figureLabel}
        </div>
      )}

      {/* Diagram area */}
      {diagram && (
        <div className="aspect-[4/3] w-full bg-background dark:bg-[#050505] border border-border dark:border-zinc-800 flex items-center justify-center mb-6 overflow-hidden">
          {diagram}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-medium text-foreground dark:text-white mb-3 tracking-tight group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground dark:text-zinc-400 font-light leading-relaxed">
        {description}
      </p>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border dark:border-zinc-800">
          <div className="flex gap-6">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-1">
                  {stat.label}
                </span>
                <span
                  className={cn(
                    'font-mono text-sm',
                    stat.highlight ? 'text-primary dark:text-cyan-500' : 'text-foreground dark:text-zinc-200'
                  )}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
