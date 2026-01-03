'use client'

import { cn } from '@/lib/utils'

export interface TopoCardProps {
  /** Index number (e.g., "01", "02") */
  index: string
  /** Tag/category label */
  tag: string
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** Tag background variant */
  tagVariant?: 'default' | 'primary' | 'emerald' | 'amber' | 'indigo'
  /** Show connector lines (for grid positioning) */
  showConnector?: boolean
  /** Additional class names */
  className?: string
}

const tagVariants = {
  default: 'bg-muted dark:bg-zinc-800 text-muted-foreground dark:text-zinc-400',
  primary: 'bg-primary/10 text-primary dark:bg-cyan-500/10 dark:text-cyan-400',
  emerald: 'bg-emerald-500/10 text-emerald-500',
  amber: 'bg-amber-500/10 text-amber-500',
  indigo: 'bg-indigo-500/10 text-indigo-400',
}

/**
 * TopoCard - Indexed topology/feature card
 * 
 * Used in grid layouts for numbered features or architecture components.
 * 
 * @example
 * ```tsx
 * <TopoCard
 *   index="01"
 *   tag="Active RAM"
 *   title="Episodic Buffer"
 *   description="Volatile, high-fidelity workspace for immediate reasoning tasks."
 * />
 * ```
 */
export function TopoCard({
  index,
  tag,
  title,
  description,
  tagVariant = 'default',
  showConnector = true,
  className,
}: TopoCardProps) {
  return (
    <div className={cn('group relative', className)}>
      {/* Connector lines */}
      {showConnector && (
        <>
          <div className="absolute -top-6 left-0 w-full h-px bg-border dark:bg-zinc-800 hidden md:block" />
          <div className="absolute -top-6 left-0 w-px h-6 bg-border dark:bg-zinc-800 hidden md:block" />
        </>
      )}

      <div className="border border-border dark:border-zinc-800 p-6 h-full bg-card dark:bg-[#050505] group-hover:border-muted-foreground/60 dark:group-hover:border-zinc-700 transition-colors duration-500">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[10px] text-muted-foreground/60 dark:text-zinc-600">
            {index}
          </span>
          <span className={cn('font-mono text-[10px] px-2 py-0.5 rounded-sm', tagVariants[tagVariant])}>
            {tag}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-foreground dark:text-white font-medium mb-3">
          {title}
        </h4>

        {/* Description */}
        <p className="text-xs text-muted-foreground dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
