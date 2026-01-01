'use client'

import { cn } from '@/lib/utils'

interface DiagramContainerProps {
  children: React.ReactNode
  showGrid?: boolean
  showCorners?: boolean
  className?: string
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
}

export default function DiagramContainer({
  children,
  showGrid = true,
  showCorners = true,
  className,
  headerLeft,
  headerRight
}: DiagramContainerProps) {
  return (
    <div className={cn(
      'relative overflow-hidden bg-card border border-border',
      className
    )}>
      {/* Header Bar */}
      {(headerLeft || headerRight) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Window dots */}
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            </div>
            {headerLeft}
          </div>
          {headerRight}
        </div>
      )}

      {/* Grid Background */}
      {showGrid && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      )}

      {/* Corner Brackets */}
      {showCorners && (
        <>
          <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-border pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-border pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-border pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-border pointer-events-none" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {children}
      </div>

      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
    </div>
  )
}
