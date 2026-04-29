'use client'

import { cn } from '@/lib/utils'

export interface StepCardProps {
  /** Step index label (e.g., "01. Monitor") */
  index: string
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Index color variant */
  indexVariant?: 'default' | 'primary' | 'amber' | 'emerald' | 'red'
  /** Background variant */
  bgVariant?: 'default' | 'muted'
  /** Additional class names */
  className?: string
}

const indexVariants = {
  default: 'text-muted-foreground/70 dark:text-zinc-600',
  primary: 'text-primary dark:text-cyan-500',
  amber: 'text-amber-600 dark:text-amber-500',
  emerald: 'text-emerald-600 dark:text-emerald-500',
  red: 'text-red-600 dark:text-red-500',
}

/**
 * StepCard - Process step card
 * 
 * Used for displaying sequential steps in a process or workflow.
 * 
 * @example
 * ```tsx
 * <StepCard
 *   index="01. Monitor"
 *   title="Track Perplexity (PPL)"
 *   description="Continuously calculate token surprise relative to the State Vector."
 *   indexVariant="primary"
 * />
 * ```
 */
export function StepCard({
  index,
  title,
  description,
  indexVariant = 'default',
  bgVariant = 'default',
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        'p-8',
        bgVariant === 'muted' && 'bg-muted/10 dark:bg-zinc-900/10',
        className
      )}
    >
      <span className={cn('font-mono text-[10px] block mb-2 uppercase tracking-wider', indexVariants[indexVariant])}>
        {index}
      </span>
      <h4 className="text-foreground dark:text-white text-sm font-medium mb-2">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
