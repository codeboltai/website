'use client'

import { cn } from '@/lib/utils'

interface StatusLabelProps {
  children: React.ReactNode
  dotColor?: 'primary' | 'success' | 'warning' | 'error' | 'muted'
  showDot?: boolean
  className?: string
}

export default function StatusLabel({ 
  children, 
  dotColor = 'primary', 
  showDot = true,
  className 
}: StatusLabelProps) {
  const dotColors = {
    primary: 'bg-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    muted: 'bg-muted-foreground',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {showDot && (
        <div className={cn('w-1.5 h-1.5 rounded-full', dotColors[dotColor])} />
      )}
      <span className="text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {children}
      </span>
    </div>
  )
}
