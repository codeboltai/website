'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface TopologyStat {
  label: string
  value: string
  highlight?: boolean
}

export interface TopologyNumberedBlock {
  number: string
  label: string
  title: string
  description: string
  accentColor?: 'emerald' | 'red' | 'amber' | 'indigo' | 'purple'
}

export interface TopologyCodeColumn {
  title: string
  lines: string[]
}

export interface TopologySectionProps {
  /** Version badge */
  versionBadge?: string
  /** Section title */
  title: string
  /** Section description */
  description?: ReactNode
  /** Stats grid (top right) */
  stats?: TopologyStat[]
  /** Left diagram content */
  diagram?: ReactNode
  /** Numbered content blocks */
  numberedBlocks?: TopologyNumberedBlock[]
  /** Bottom code columns */
  codeColumns?: TopologyCodeColumn[]
  /** Background tone */
  tone?: 'default' | 'deep'
  /** Additional class names */
  className?: string
}

const accentColors = {
  emerald: 'bg-emerald-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
}

/**
 * TopologySection - Complex topology/architecture section with diagram
 * 
 * A ready-to-use section for displaying system topologies with diagrams,
 * numbered explanations, and code examples.
 * 
 * @example
 * ```tsx
 * <TopologySection
 *   versionBadge="System Architecture v.2.4"
 *   title="Dense Frontier Topology"
 *   description="Standard swarms utilize mass-parallelism..."
 *   stats={[
 *     { label: 'Inference', value: 'L2' },
 *     { label: 'Entropy', value: 'Low', highlight: true },
 *   ]}
 *   diagram={<NodeGrid />}
 *   numberedBlocks={[
 *     { number: '01', label: 'Reasoning Runtime', title: 'Simulation over Iteration', description: '...' },
 *   ]}
 * />
 * ```
 */
export function TopologySection({
  versionBadge,
  title,
  description,
  stats,
  diagram,
  numberedBlocks,
  codeColumns,
  tone = 'deep',
  className,
}: TopologySectionProps) {
  return (
    <section
      className={cn(
        'py-24 px-4 md:px-8 font-sans',
        tone === 'deep' ? 'bg-background dark:bg-[#030303]' : 'bg-background dark:bg-[#050505]',
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto border border-border bg-card dark:border-zinc-800/60 dark:bg-[#050505] relative overflow-hidden shadow-sm">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none dark:opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-border dark:border-zinc-800/60 relative z-10 bg-muted/10 dark:bg-zinc-900/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-2xl">
              {versionBadge && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                    {versionBadge}
                  </span>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white mb-6">
                {title}
              </h2>
              {description && (
                <div className="text-sm md:text-base text-muted-foreground dark:text-zinc-400 leading-relaxed font-light max-w-xl">
                  {description}
                </div>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="hidden md:grid grid-cols-2 gap-px bg-border/50 border border-border/50 dark:bg-zinc-800/50 dark:border-zinc-800/50">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-card dark:bg-[#050505] p-4 flex flex-col gap-1 w-32">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 font-mono">
                      {stat.label}
                    </span>
                    <span className={cn('text-lg font-mono', stat.highlight ? 'text-emerald-500' : 'text-foreground dark:text-zinc-200')}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 border-b border-border dark:border-zinc-800/60 relative z-10">
          {/* Diagram */}
          {diagram && (
            <div className="lg:col-span-5 p-12 bg-background dark:bg-[#020202] flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-border dark:border-zinc-800/60">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {diagram}
              </motion.div>
            </div>
          )}

          {/* Numbered blocks */}
          {numberedBlocks && numberedBlocks.length > 0 && (
            <div className={cn('p-10 md:p-16 bg-card dark:bg-[#050505] flex flex-col justify-center', diagram ? 'lg:col-span-7' : 'lg:col-span-12')}>
              <div className="space-y-12">
                {numberedBlocks.map((block, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border dark:border-zinc-800">
                    <div className={cn('absolute top-0 left-0 w-[1px] h-6 -translate-x-[1px]', accentColors[block.accentColor ?? 'emerald'])} />
                    <span className="font-mono text-[9px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest mb-2 block">
                      {block.number} — {block.label}
                    </span>
                    <h3 className="text-lg text-foreground dark:text-zinc-100 font-medium mb-2">
                      {block.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed font-light">
                      {block.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom code columns */}
        {codeColumns && codeColumns.length > 0 && (
          <div className={cn('grid divide-y md:divide-y-0 md:divide-x divide-border dark:divide-zinc-800/60 bg-background dark:bg-[#030303] border-t border-border dark:border-zinc-800/60 relative z-10', `grid-cols-1 md:grid-cols-${codeColumns.length}`)}>
            {codeColumns.map((col, idx) => (
              <div key={idx} className="p-8 group hover:bg-muted/10 transition-colors">
                <h4 className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mb-3">
                  {col.title}
                </h4>
                <div className="text-[11px] text-muted-foreground leading-relaxed font-mono">
                  {col.lines.map((line, lidx) => (
                    <div key={lidx}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
