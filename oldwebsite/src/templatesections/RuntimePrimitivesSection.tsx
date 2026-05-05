'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface RuntimePrimitiveItem {
  /** Card number (e.g., "01", "02") */
  number: string
  /** Category label */
  label: string
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Stats */
  stats: Array<{ label: string; value: string; highlight?: boolean }>
  /** Icon type */
  icon?: 'cross' | 'dots' | 'lines' | 'bars'
}

export interface RuntimePrimitivesSectionProps {
  /** Section version badge */
  versionBadge?: string
  /** Section kicker */
  kicker?: string
  /** Section title */
  title: string
  /** Section description */
  description?: string | ReactNode
  /** Status indicator (right side of header) */
  statusIndicator?: {
    text: string
    subtext?: string
    color?: 'emerald' | 'amber' | 'red'
  }
  /** Primitive cards (2 or 4 items work best) */
  primitives: RuntimePrimitiveItem[]
  /** Background tone */
  tone?: 'default' | 'deep'
  /** Additional class names */
  className?: string
}

function PrimitiveIcon({ type }: { type: 'cross' | 'dots' | 'lines' | 'bars' }) {
  if (type === 'cross') {
    return (
      <div className="absolute right-10 top-16 opacity-40 pointer-events-none">
        <div className="relative w-8 h-8">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-8 bg-border dark:bg-zinc-800" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-8 bg-border dark:bg-zinc-800" />
        </div>
      </div>
    )
  }

  if (type === 'dots') {
    return (
      <div className="absolute right-10 top-14 opacity-40 pointer-events-none">
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-border dark:bg-zinc-800" />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'lines') {
    return (
      <div className="absolute right-10 top-14 opacity-40 pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <div className="w-10 h-px bg-border dark:bg-zinc-800" />
          <div className="w-8 h-px bg-border dark:bg-zinc-800" />
          <div className="w-12 h-px bg-border dark:bg-zinc-800" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute right-10 top-14 opacity-60 pointer-events-none">
      <div className="flex items-end gap-1">
        <div className="w-1 h-3 bg-border dark:bg-zinc-800" />
        <div className="w-1 h-5 bg-border dark:bg-zinc-800" />
        <div className="w-1 h-4 bg-border dark:bg-zinc-800" />
        <div className="w-1 h-7 bg-primary dark:bg-cyan-500" />
      </div>
    </div>
  )
}

/**
 * RuntimePrimitivesSection - 2x2 grid of system primitive cards
 * 
 * A ready-to-use section for displaying system primitives or core components.
 * 
 * @example
 * ```tsx
 * <RuntimePrimitivesSection
 *   versionBadge="v.2.0.4-beta"
 *   kicker="System_Primitives"
 *   title="Runtime Primitives"
 *   description="Core architectural components..."
 *   statusIndicator={{ text: 'All Systems Operational', color: 'emerald' }}
 *   primitives={[
 *     {
 *       number: '01',
 *       label: 'Routing',
 *       title: 'Inference Routing',
 *       description: 'Intelligently routes tasks...',
 *       stats: [{ label: 'Mode', value: 'Hybrid_Dynamic' }],
 *       icon: 'cross',
 *     },
 *     // ... more primitives
 *   ]}
 * />
 * ```
 */
export function RuntimePrimitivesSection({
  versionBadge,
  kicker,
  title,
  description,
  statusIndicator,
  primitives,
  tone = 'deep',
  className,
}: RuntimePrimitivesSectionProps) {
  const statusColors = {
    emerald: 'bg-emerald-500 text-emerald-500',
    amber: 'bg-amber-500 text-amber-500',
    red: 'bg-red-500 text-red-500',
  }

  return (
    <section
      className={cn(
        'text-foreground dark:text-zinc-200 font-sans py-24 px-4 md:px-8',
        tone === 'deep' ? 'bg-background dark:bg-[#030303]' : 'bg-background dark:bg-[#050505]',
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 dark:border-zinc-800/60 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {versionBadge && (
                <span className="px-1.5 py-0.5 rounded-[1px] bg-muted text-[10px] font-mono uppercase text-muted-foreground border border-border dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                  {versionBadge}
                </span>
              )}
              {kicker && (
                <span className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                  {kicker}
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white mb-4">
              {title}
            </h2>

            {description && (
              <div className="text-sm md:text-base text-muted-foreground dark:text-zinc-400 font-light leading-relaxed max-w-lg">
                {typeof description === 'string' ? <p>{description}</p> : description}
              </div>
            )}
          </div>

          {statusIndicator && (
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <div className={cn('w-1.5 h-1.5 rounded-full animate-pulse', statusColors[statusIndicator.color ?? 'emerald'].split(' ')[0])} />
                <span className={cn('text-[10px] font-mono uppercase tracking-wider', statusColors[statusIndicator.color ?? 'emerald'].split(' ')[1])}>
                  {statusIndicator.text}
                </span>
              </div>
              {statusIndicator.subtext && (
                <span className="text-[10px] font-mono text-muted-foreground/70 dark:text-zinc-600">
                  {statusIndicator.subtext}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 dark:border-zinc-800/60 bg-card dark:bg-[#050505]">
          {primitives.map((prim, idx) => {
            const isTopRow = idx < 2
            const isLeftCol = idx % 2 === 0

            return (
              <div
                key={prim.number}
                className={cn(
                  'group relative p-8 md:p-10 hover:bg-muted/10 dark:hover:bg-zinc-900/20 transition-colors',
                  !isTopRow && 'border-t border-border/60 dark:border-zinc-800/60',
                  isLeftCol && 'md:border-r border-border/60 dark:border-zinc-800/60'
                )}
              >
                <PrimitiveIcon type={prim.icon ?? 'cross'} />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-muted-foreground border border-border bg-background/20 dark:bg-zinc-900 dark:border-zinc-800 px-1.5 py-0.5">
                    {prim.number}
                  </span>
                  <span className="text-[10px] font-mono text-primary dark:text-cyan-500 uppercase tracking-[0.2em]">
                    {prim.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-white tracking-tight mb-4">
                  {prim.title}
                </h3>

                {/* Description */}
                <p className="text-[12px] font-mono text-muted-foreground dark:text-zinc-400 leading-relaxed max-w-md">
                  {prim.description}
                </p>

                {/* Stats */}
                <div className="border-t border-border dark:border-zinc-800 mt-8 pt-6 grid grid-cols-2 gap-10">
                  {prim.stats.map((stat, sidx) => (
                    <div key={sidx}>
                      <span className="text-[9px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-[0.2em] block mb-2">
                        {stat.label}
                      </span>
                      <span className={cn(
                        'text-sm font-mono',
                        stat.highlight ? 'text-primary dark:text-cyan-500' : 'text-foreground dark:text-zinc-200'
                      )}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
