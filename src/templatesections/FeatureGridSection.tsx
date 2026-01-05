'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface FeatureGridItem {
  /** Figure label */
  figureLabel?: string
  /** Feature title */
  title: string
  /** Feature description */
  description: string
  /** Diagram/visual content */
  diagram?: ReactNode
  /** Stats */
  stats?: Array<{ label: string; value: string }>
  /** Link URL for "Learn more" */
  href?: string
}

export interface FeatureGridSectionProps {
  /** Section kicker */
  kicker?: string
  /** Section title (use \n for line breaks) */
  title: string
  /** Section description */
  description?: string | ReactNode
  /** Feature cards (1-4 items) */
  features: FeatureGridItem[]
  /** Number of columns */
  columns?: 2 | 3 | 4
  /** Background tone */
  tone?: 'default' | 'muted'
  /** Show border */
  borderBottom?: boolean
  /** Additional class names */
  className?: string
}

/**
 * FeatureGridSection - Complete section with header and feature card grid
 * 
 * A ready-to-use section for displaying multiple features in a grid layout.
 * 
 * @example
 * ```tsx
 * <FeatureGridSection
 *   kicker="System Architecture: Frontend"
 *   title={"The Interface is Standard.\nThe Runtime is Recursive."}
 *   description="Your description here..."
 *   columns={3}
 *   features={[
 *     {
 *       figureLabel: "Fig 3.1 — Linear Attention",
 *       title: "Infinite Context",
 *       description: "Virtualized session handling...",
 *       diagram: <LinearAttention />,
 *       stats: [{ label: 'Capacity', value: '∞ (Virtual)' }],
 *     },
 *     // ... more features
 *   ]}
 * />
 * ```
 */
export function FeatureGridSection({
  kicker,
  title,
  description,
  features,
  columns = 3,
  tone = 'default',
  borderBottom = true,
  className,
}: FeatureGridSectionProps) {
  const titleLines = title.split('\n')

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section
      className={cn(
        'py-24 px-6 text-foreground font-sans antialiased',
        tone === 'default' ? 'bg-background dark:bg-[#050505]' : 'bg-muted/10 dark:bg-zinc-900/10',
        borderBottom && 'border-b border-border dark:border-zinc-900',
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          {kicker && (
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-primary dark:bg-cyan-500 rounded-full" />
              <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                {kicker}
              </span>
            </div>
          )}

          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground dark:text-white mb-8 leading-[0.95]">
            {titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                <span className={i > 0 ? 'text-muted-foreground dark:text-zinc-500' : ''}>
                  {line}
                </span>
              </span>
            ))}
          </h2>

          {description && (
            <div className="text-xl text-muted-foreground dark:text-zinc-400 font-light leading-relaxed border-l-2 border-border dark:border-zinc-800 pl-6">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
          )}
        </motion.div>

        {/* Feature Cards Grid */}
        <div className={cn('grid gap-6', gridCols[columns])}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative border border-border dark:border-zinc-800 p-6 transition-all duration-500 hover:border-muted-foreground/50 dark:hover:border-zinc-700"
            >
              {/* Corner brackets */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-muted-foreground/40 dark:border-zinc-600" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-muted-foreground/40 dark:border-zinc-600" />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-muted-foreground/40 dark:border-zinc-600" />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-muted-foreground/40 dark:border-zinc-600" />

              {/* Figure label */}
              {feature.figureLabel && (
                <div className="mb-4 font-mono text-[10px] uppercase text-muted-foreground dark:text-zinc-500 tracking-widest">
                  {feature.figureLabel}
                </div>
              )}

              {/* Diagram area */}
              {feature.diagram && (
                <div className="aspect-[4/3] w-full bg-background dark:bg-[#050505] border border-border dark:border-zinc-800 flex items-center justify-center mb-6 overflow-hidden">
                  {feature.diagram}
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg font-medium text-foreground dark:text-white mb-3 tracking-tight group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground dark:text-zinc-400 font-light leading-relaxed">
                {feature.description}
              </p>

              {/* Stats + Link */}
              {(feature.stats && feature.stats.length > 0) || feature.href ? (
                <div className="mt-6 pt-4 border-t border-border dark:border-zinc-800 flex justify-between items-center">
                  <div className="flex gap-6">
                    {feature.stats?.map((stat, sidx) => (
                      <div key={sidx}>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-1">
                          {stat.label}
                        </span>
                        <span className="font-mono text-sm text-foreground dark:text-zinc-200">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {feature.href && (
                    <Link
                      href={feature.href}
                      className="text-xs text-muted-foreground hover:text-primary dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group/link"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
