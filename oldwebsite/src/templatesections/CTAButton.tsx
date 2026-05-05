'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface CTAButtonProps {
  /** Button text */
  children: ReactNode
  /** Link href */
  href?: string
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Icon (right side) */
  icon?: ReactNode
  /** Full width */
  fullWidth?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Click handler (when not using href) */
  onClick?: () => void
  /** Additional class names */
  className?: string
}

const variantStyles = {
  primary: cn(
    'bg-primary text-primary-foreground dark:bg-cyan-500 dark:text-black',
    'hover:bg-cyan-400 dark:hover:bg-cyan-400',
    'shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
  ),
  secondary: cn(
    'bg-foreground text-background dark:bg-zinc-100 dark:text-black',
    'hover:bg-foreground/90 dark:hover:bg-white'
  ),
  outline: cn(
    'bg-transparent border border-border dark:border-zinc-700',
    'text-foreground dark:text-zinc-200',
    'hover:bg-muted/20 dark:hover:bg-zinc-800/50 hover:border-muted-foreground dark:hover:border-zinc-600'
  ),
  ghost: cn(
    'bg-transparent text-muted-foreground dark:text-zinc-400',
    'hover:text-foreground dark:hover:text-white hover:bg-muted/20 dark:hover:bg-zinc-800/30'
  ),
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
}

/**
 * CTAButton - Call-to-action button/link
 * 
 * Versatile button component with multiple variants and sizes.
 * Can be used as a link or button.
 * 
 * @example
 * ```tsx
 * <CTAButton href="/download" variant="primary" size="lg">
 *   Download
 * </CTAButton>
 * 
 * <CTAButton variant="outline" icon={<ArrowRight />}>
 *   Learn More
 * </CTAButton>
 * ```
 */
export function CTAButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}: CTAButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-between gap-2 font-sans uppercase tracking-[0.2em] font-bold transition-all duration-300 group',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={baseStyles} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}
