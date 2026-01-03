'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface ArchitectureStage {
  /** Stage number (e.g., "Stage 01. Divergence") */
  stageLabel: string
  /** Stage title */
  title: string
  /** Stage description */
  description: string
}

export interface ArchitectureDeepDiveSectionProps {
  /** Section kicker */
  kicker?: string
  /** Section title (use \n for line breaks) */
  title: string
  /** Section description */
  description?: string | ReactNode
  /** Main diagram */
  diagram: ReactNode
  /** Architecture stages (typically 3) */
  stages?: ArchitectureStage[]
  /** Bottom callout/quote */
  callout?: string
  /** Background tone */
  tone?: 'default' | 'deep'
  /** Show border bottom */
  borderBottom?: boolean
  /** Additional class names */
  className?: string
}

/**
 * ArchitectureDeepDiveSection - Technical deep-dive section with diagram and stages
 * 
 * A ready-to-use section for explaining complex architecture with diagram and stages.
 * 
 * @example
 * ```tsx
 * <ArchitectureDeepDiveSection
 *   kicker="Architecture Deep Dive"
 *   title={"Horizon Mode:\nDivergent Trajectory Search"}
 *   description="Standard AI treats a prompt as a linear sequence..."
 *   diagram={<DivergentTrajectorySearch />}
 *   stages={[
 *     { stageLabel: 'Stage 01. Divergence', title: 'Scout Swarm Deployment', description: '...' },
 *     { stageLabel: 'Stage 02. Convergence', title: 'Negative Knowledge Propagation', description: '...' },
 *     { stageLabel: 'Stage 03. Promotion', title: 'Context Promotion', description: '...' },
 *   ]}
 *   callout="The resulting code is not a generation—it is the surviving winner of 10,000 parallel experiments."
 * />
 * ```
 */
export function ArchitectureDeepDiveSection({
  kicker,
  title,
  description,
  diagram,
  stages,
  callout,
  tone = 'default',
  borderBottom = true,
  className,
}: ArchitectureDeepDiveSectionProps) {
  const titleLines = title.split('\n')

  return (
    <section
      className={cn(
        'py-32 px-6',
        tone === 'default' ? 'bg-background dark:bg-[#050505]' : 'bg-background dark:bg-[#030303]',
        borderBottom && 'border-b border-border dark:border-zinc-900',
        className
      )}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {kicker && (
            <span className="font-mono text-[10px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.3em] font-medium">
              {kicker}
            </span>
          )}

          <h2 className="text-4xl md:text-5xl font-medium text-foreground dark:text-white mb-8 tracking-tighter">
            {titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && ' '}
                <span className={i > 0 ? 'text-muted-foreground dark:text-neutral-500' : ''}>
                  {line}
                </span>
              </span>
            ))}
          </h2>

          {description && (
            <div className="text-xl text-muted-foreground dark:text-neutral-400 font-light leading-relaxed max-w-3xl">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
          )}
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full h-[400px] bg-background/40 dark:bg-[#030303] border border-border dark:border-neutral-800/50 mb-16 relative overflow-hidden rounded-sm group"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(23,23,23,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.9) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {diagram}
        </motion.div>

        {/* Stages */}
        {stages && stages.length > 0 && (
          <div className={cn('grid gap-16 border-t border-border dark:border-neutral-900 pt-16', `grid-cols-1 md:grid-cols-${stages.length}`)}>
            {stages.map((stage, idx) => (
              <div key={idx}>
                <span className="font-mono text-[9px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.2em]">
                  {stage.stageLabel}
                </span>
                <h4 className="text-foreground dark:text-white text-lg font-medium mb-4">
                  {stage.title}
                </h4>
                <p className="text-sm text-muted-foreground dark:text-neutral-500 leading-relaxed font-light">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Callout */}
        {callout && (
          <div className="mt-24 p-12 border border-border dark:border-neutral-900 bg-card/40 dark:bg-[#080808]/40 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-primary dark:bg-cyan-500" />
            <p className="text-lg text-muted-foreground dark:text-neutral-400 font-light max-w-2xl mx-auto">
              {callout}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
