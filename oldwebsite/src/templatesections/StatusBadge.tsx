'use client'

import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  /** Badge text */
  children: string
  /** Color variant */
  variant?: 'default' | 'primary' | 'emerald' | 'amber' | 'red' | 'indigo' | 'purple'
  /** Size */
  size?: 'sm' | 'md'
  /** Show dot indicator */
  showDot?: boolean
  /** Whether dot pulses */
  pulse?: boolean
  /** Additional class names */
  className?: string
}

const variantStyles = {
  default: {
    bg: 'bg-muted/30 dark:bg-zinc-800/50',
    border: 'border-border dark:border-zinc-700',
    text: 'text-muted-foreground dark:text-zinc-400',
    dot: 'bg-muted-foreground dark:bg-zinc-500',
  },
  primary: {
    bg: 'bg-primary/10 dark:bg-cyan-500/10',
    border: 'border-primary/20 dark:border-cyan-500/20',
    text: 'text-primary dark:text-cyan-400',
    dot: 'bg-primary dark:bg-cyan-500',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-500',
    dot: 'bg-emerald-500',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-500',
    dot: 'bg-amber-500',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-500',
    dot: 'bg-red-500',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
    dot: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    dot: 'bg-purple-500',
  },
}

/**
 * StatusBadge - Inline status indicator badge
 * 
 * Used for status indicators, version badges, tags, etc.
 * 
 * @example
 * ```tsx
 * <StatusBadge variant="emerald" showDot pulse>LIVE</StatusBadge>
 * <StatusBadge variant="default">v.2.0.4-beta</StatusBadge>
 * ```
 */
export function StatusBadge({
  children,
  variant = 'default',
  size = 'sm',
  showDot = false,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const styles = variantStyles[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border rounded-sm font-mono uppercase tracking-widest',
        styles.bg,
        styles.border,
        styles.text,
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-3 py-1 text-[10px]',
        className
      )}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', styles.dot)} />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', styles.dot)} />
        </span>
      )}
      {children}
    </span>
  )
}
