'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface ProtocolCardProps {
  /** Protocol code (e.g., "01_STATE_MANAGEMENT") */
  code: string
  /** Protocol title */
  title: string
  /** Protocol description */
  description: string
  /** Left stat label */
  leftLabel: string
  /** Left stat value */
  leftValue: string
  /** Right stat label */
  rightLabel: string
  /** Right stat value */
  rightValue: string
  /** Right value custom class */
  rightValueClassName?: string
  /** Animation delay */
  animationDelay?: number
  /** Additional class names */
  className?: string
}

/**
 * ProtocolCard - System protocol card for triptych layouts
 * 
 * Used in 3-column protocol sections. Includes code badge, stats footer.
 * 
 * @example
 * ```tsx
 * <ProtocolCard
 *   code="01_STATE_MANAGEMENT"
 *   title="Context Virtualization"
 *   description="To bypass context saturation, the runtime separates..."
 *   leftLabel="Inference Horizon"
 *   leftValue="24H+"
 *   rightLabel="Registry Status"
 *   rightValue="SERIALIZED"
 * />
 * ```
 */
export function ProtocolCard({
  code,
  title,
  description,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  rightValueClassName,
  animationDelay = 0,
  className,
}: ProtocolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay }}
      className={cn(
        'group p-8 md:p-12 hover:bg-muted/20 dark:hover:bg-zinc-900/30 transition-colors duration-500 flex flex-col h-full relative',
        className
      )}
    >
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-[0.2em] border border-border dark:border-zinc-800 px-2 py-1 rounded-sm group-hover:border-primary/50 group-hover:text-primary dark:group-hover:border-cyan-500/50 dark:group-hover:text-cyan-400 transition-colors">
          {code}
        </span>
        <div className="w-1.5 h-1.5 bg-border dark:bg-zinc-800 rounded-full group-hover:bg-primary dark:group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_hsl(var(--primary))] dark:shadow-[0_0_10px_#06b6d4]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-medium text-foreground dark:text-white mb-4 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground dark:text-zinc-500 font-light leading-relaxed mb-10 flex-grow">
        {description}
      </p>

      {/* Footer stats */}
      <div className="pt-6 border-t border-border/50 dark:border-zinc-800/50 flex items-center justify-between font-mono text-[9px] text-muted-foreground dark:text-zinc-600 uppercase tracking-widest">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-muted-foreground/70 dark:text-zinc-700">{leftLabel}</span>
          <span className="text-foreground dark:text-zinc-300">{leftValue}</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-[8px] text-muted-foreground/70 dark:text-zinc-700">{rightLabel}</span>
          <span className={rightValueClassName ?? 'text-primary/80 dark:text-cyan-500/70'}>{rightValue}</span>
        </div>
      </div>
    </motion.div>
  )
}
