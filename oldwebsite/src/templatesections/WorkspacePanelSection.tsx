'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface WorkspacePanelSectionProps {
  /** Section kicker */
  kicker?: string
  /** Kicker accent color */
  kickerAccent?: 'primary' | 'emerald' | 'amber' | 'indigo' | 'purple'
  /** Section title (use \n for line breaks) */
  title: string
  /** Section description */
  description?: ReactNode
  /** Stats to show beside title */
  stats?: Array<{
    label: string
    value: string
    subtext?: string
    highlight?: boolean
  }>
  /** Main workspace panel content */
  workspacePanel: ReactNode
  /** Panel header bar content (left side) */
  panelHeaderLeft?: ReactNode
  /** Panel header bar content (right side) */
  panelHeaderRight?: ReactNode
  /** Background tone */
  tone?: 'default' | 'deep'
  /** Show border */
  borderBottom?: boolean
  /** Additional class names */
  className?: string
}

const kickerColors = {
  primary: 'bg-primary dark:bg-cyan-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
}

/**
 * WorkspacePanelSection - Full-width workspace/IDE panel section
 * 
 * A ready-to-use section for displaying workspace-like interfaces
 * (code editors, execution panels, visualization dashboards).
 * 
 * @example
 * ```tsx
 * <WorkspacePanelSection
 *   kicker="SYS_04: ASSOCIATIVE_MEMORY"
 *   kickerAccent="indigo"
 *   title={"Associative\nSemantic Graphing."}
 *   description="The system moves beyond static context windows..."
 *   stats={[
 *     { label: 'Recursion_Depth', value: '12', subtext: 'Latent layers traversed' },
 *   ]}
 *   workspacePanel={<YourWorkspaceContent />}
 * />
 * ```
 */
export function WorkspacePanelSection({
  kicker,
  kickerAccent = 'primary',
  title,
  description,
  stats,
  workspacePanel,
  panelHeaderLeft,
  panelHeaderRight,
  tone = 'default',
  borderBottom = true,
  className,
}: WorkspacePanelSectionProps) {
  const titleLines = title.split('\n')

  return (
    <section
      className={cn(
        'py-24 px-6 lg:px-10',
        tone === 'default' ? 'bg-background dark:bg-black' : 'bg-background dark:bg-[#030303]',
        borderBottom && 'border-b border-border dark:border-white/5',
        className
      )}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            {/* Kicker badges */}
            {kicker && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 dark:bg-indigo-500/10 border border-primary/20 dark:border-indigo-500/20 rounded-full">
                  <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', kickerColors[kickerAccent])} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary dark:text-indigo-300">
                    Live_Inference
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-600">
                  {kicker}
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter mb-6 leading-[1.1] dark:text-white">
              {titleLines.map((line, i) => (
                <span
                  key={i}
                  className={cn('block', i > 0 && 'text-muted-foreground dark:text-zinc-500')}
                >
                  {line}
                </span>
              ))}
            </h2>

            {/* Description */}
            {description && (
              <div className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl dark:text-zinc-400">
                {description}
              </div>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex gap-8 border-l border-border dark:border-white/10 pl-8 pb-2">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">
                    {stat.label}
                  </div>
                  <div className={cn(
                    'text-2xl font-light tracking-tight',
                    stat.highlight ? 'text-primary dark:text-indigo-400' : 'text-foreground dark:text-white'
                  )}>
                    {stat.value}
                  </div>
                  {stat.subtext && (
                    <div className="text-[10px] text-muted-foreground mt-1 dark:text-zinc-500">
                      {stat.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Workspace Panel */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="w-full bg-card border border-border flex flex-col shadow-2xl relative dark:bg-[#050505] dark:border-zinc-800"
        >
          {/* Panel header bar */}
          {(panelHeaderLeft || panelHeaderRight) && (
            <div className="h-12 border-b border-border flex items-center px-6 justify-between bg-muted/20 dark:bg-[#080808] dark:border-zinc-800">
              <div className="flex gap-8">
                {panelHeaderLeft}
              </div>
              <div className="flex items-center gap-2">
                {panelHeaderRight}
              </div>
            </div>
          )}

          {/* Main content */}
          {workspacePanel}
        </motion.div>
      </div>
    </section>
  )
}
