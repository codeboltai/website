'use client'

import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  variant?: 'live' | 'encrypted' | 'version' | 'default'
  children: React.ReactNode
  className?: string
}

export default function StatusBadge({ 
  variant = 'default', 
  children,
  className 
}: StatusBadgeProps) {
  const variants = {
    live: 'text-emerald-500',
    encrypted: 'text-emerald-500',
    version: 'text-muted-foreground border border-border px-2 py-0.5 rounded',
    default: 'text-muted-foreground',
  }

  return (
    <span className={cn(
      'text-[10px] font-mono font-medium uppercase tracking-wider inline-flex items-center gap-1.5',
      variants[variant],
      className
    )}>
      {(variant === 'live' || variant === 'encrypted') && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
      {children}
    </span>
  )
}
