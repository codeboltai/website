'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type SectionTone = 'default' | 'card' | 'deep' | 'muted'

export interface SectionShellProps {
  /** Visual tone of the section */
  tone?: SectionTone
  /** Additional class names */
  className?: string
  /** Whether to add top border */
  borderTop?: boolean
  /** Whether to add bottom border */
  borderBottom?: boolean
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Max width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /** Content */
  children: ReactNode
}

const toneStyles: Record<SectionTone, string> = {
  default: 'bg-background dark:bg-[#050505]',
  card: 'bg-card dark:bg-[#050505]',
  deep: 'bg-background dark:bg-[#030303]',
  muted: 'bg-muted/10 dark:bg-zinc-900/10',
}

const paddingStyles: Record<NonNullable<SectionShellProps['padding']>, string> = {
  none: '',
  sm: 'py-12 px-4 md:px-6',
  md: 'py-16 px-4 md:px-8',
  lg: 'py-20 px-4 md:px-8',
  xl: 'py-24 lg:py-32 px-6 lg:px-10',
}

const maxWidthStyles: Record<NonNullable<SectionShellProps['maxWidth']>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-[1400px]',
}

/**
 * SectionShell - Base container for page sections
 * 
 * Provides consistent spacing, borders, and theming for sections.
 * Use as a wrapper for any major content block.
 * 
 * @example
 * ```tsx
 * <SectionShell tone="card" padding="xl" borderTop>
 *   <SectionHeader ... />
 *   <YourContent />
 * </SectionShell>
 * ```
 */
export function SectionShell({
  tone = 'default',
  className,
  borderTop = false,
  borderBottom = false,
  padding = 'xl',
  maxWidth = 'xl',
  children,
}: SectionShellProps) {
  return (
    <section
      className={cn(
        'text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary-foreground',
        toneStyles[tone],
        paddingStyles[padding],
        borderTop && 'border-t border-border dark:border-zinc-800',
        borderBottom && 'border-b border-border dark:border-zinc-800',
        className
      )}
    >
      <div className={cn('mx-auto', maxWidthStyles[maxWidth])}>
        {children}
      </div>
    </section>
  )
}
