'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface TextWithDiagramSectionProps {
  /** Section kicker/eyebrow text */
  kicker?: string
  /** Kicker accent color */
  kickerAccent?: 'primary' | 'emerald' | 'amber' | 'indigo' | 'purple' | 'red'
  /** Section title (use \n for line breaks, second line will be muted) */
  title: string
  /** Description paragraphs */
  description: ReactNode
  /** Metrics to show below description */
  metrics?: Array<{
    label: string
    value: string
    highlight?: boolean
  }>
  /** Diagram/visual content */
  diagram: ReactNode
  /** Figure label below diagram */
  figureLabel?: string
  /** Diagram position */
  diagramPosition?: 'left' | 'right'
  /** Background tone */
  tone?: 'default' | 'deep' | 'muted'
  /** Show border top */
  borderTop?: boolean
  /** Show border bottom */
  borderBottom?: boolean
  /** Additional class names */
  className?: string
}

const toneStyles = {
  default: 'bg-background dark:bg-[#050505]',
  deep: 'bg-background dark:bg-[#030303]',
  muted: 'bg-muted/10 dark:bg-zinc-900/10',
}

const accentColors = {
  primary: 'border-primary dark:border-cyan-500',
  emerald: 'border-emerald-500',
  amber: 'border-amber-500',
  indigo: 'border-indigo-500',
  purple: 'border-purple-500',
  red: 'border-red-500',
}

/**
 * TextWithDiagramSection - Complete section with text content and diagram
 * 
 * A ready-to-use section template with text on one side and diagram on the other.
 * Used for feature explanations, architecture overviews, etc.
 * 
 * @example
 * ```tsx
 * <TextWithDiagramSection
 *   kicker="System Protocol 04"
 *   kickerAccent="emerald"
 *   title={"Recursive State\nConvergence"}
 *   description={<>Your description here...</>}
 *   metrics={[
 *     { label: 'Pruning Rate', value: '94.2%', highlight: true },
 *   ]}
 *   diagram={<YourDiagram />}
 *   figureLabel="FIG 2.1: Variance Reduction"
 * />
 * ```
 */
export function TextWithDiagramSection({
  kicker,
  kickerAccent = 'primary',
  title,
  description,
  metrics,
  diagram,
  figureLabel,
  diagramPosition = 'right',
  tone = 'default',
  borderTop = true,
  borderBottom = false,
  className,
}: TextWithDiagramSectionProps) {
  const titleLines = title.split('\n')

  const textContent = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col"
    >
      {/* Kicker */}
      {kicker && (
        <div className={cn('inline-flex items-center gap-2 border-l-2 pl-3 mb-8', accentColors[kickerAccent])}>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest dark:text-zinc-500">
            {kicker}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight leading-[1.1] mb-6 dark:text-zinc-100">
        {titleLines.map((line, i) => (
          <span
            key={i}
            className={cn('block', i > 0 && 'text-muted-foreground dark:text-zinc-500')}
          >
            {line}
          </span>
        ))}
      </h3>

      {/* Description */}
      <div className="space-y-4 text-muted-foreground font-light leading-relaxed dark:text-zinc-400">
        {description}
      </div>

      {/* Metrics */}
      {metrics && metrics.length > 0 && (
        <div className="mt-8 border border-border bg-card divide-y divide-border dark:border-zinc-800 dark:bg-[#050505] dark:divide-zinc-800">
          <div className={cn('grid divide-x divide-border dark:divide-zinc-800', metrics.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4')}>
            {metrics.map((m, i) => (
              <div key={i} className="p-4">
                <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1 dark:text-zinc-500">
                  {m.label}
                </span>
                <span className={cn(
                  'text-sm font-mono',
                  m.highlight ? 'text-primary dark:text-cyan-500' : 'text-foreground dark:text-zinc-200'
                )}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )

  const diagramContent = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
    >
      <div className="relative w-full h-[400px] flex items-center justify-center bg-card border border-border rounded-sm overflow-hidden dark:bg-[#050505] dark:border-zinc-800/60">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-100 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {diagram}
      </div>
      {figureLabel && (
        <p className="mt-3 text-[10px] text-muted-foreground font-mono dark:text-zinc-500 px-1">
          {figureLabel}
        </p>
      )}
    </motion.div>
  )

  return (
    <section
      className={cn(
        'py-24 lg:py-32 px-6 lg:px-10',
        toneStyles[tone],
        borderTop && 'border-t border-border dark:border-zinc-800/60',
        borderBottom && 'border-b border-border dark:border-zinc-800/60',
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className={cn('col-span-1 lg:col-span-5', diagramPosition === 'left' && 'lg:order-last')}>
          {textContent}
        </div>
        <div className={cn('col-span-1 lg:col-span-7', diagramPosition === 'left' && 'lg:order-first')}>
          {diagramContent}
        </div>
      </div>
    </section>
  )
}
