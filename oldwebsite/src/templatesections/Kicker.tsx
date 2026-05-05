'use client'

import { cn } from '@/lib/utils'

export interface KickerProps {
  /** Label text */
  label: string
  /** Dot color variant */
  dotColor?: 'primary' | 'emerald' | 'amber' | 'indigo' | 'purple' | 'red' | 'muted' | 'foreground'
  /** Dot shape */
  dotShape?: 'circle' | 'square'
  /** Whether dot should pulse */
  pulse?: boolean
  /** Additional class names */
  className?: string
}

const dotColors: Record<NonNullable<KickerProps['dotColor']>, string> = {
  primary: 'bg-primary dark:bg-cyan-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  muted: 'bg-muted-foreground dark:bg-zinc-600',
  foreground: 'bg-foreground dark:bg-white',
}

/**
 * Kicker - Eyebrow label with indicator dot
 * 
 * Used above section headings to provide context or category.
 * 
 * @example
 * ```tsx
 * <Kicker label="System_Economics" dotColor="emerald" dotShape="square" />
 * ```
 */
export function Kicker({
  label,
  dotColor = 'primary',
  dotShape = 'circle',
  pulse = false,
  className,
}: KickerProps) {
  return (
    <div className={cn('flex items-center gap-2 mb-6', className)}>
      <div className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full opacity-75',
              dotShape === 'circle' ? 'rounded-full' : '',
              dotColors[dotColor]
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex h-2 w-2',
            dotShape === 'circle' ? 'rounded-full' : '',
            dotColors[dotColor]
          )}
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-tight text-muted-foreground dark:text-zinc-500">
        {label}
      </span>
    </div>
  )
}
