'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface NodeGridProps {
  rows?: number
  cols?: number
  activeRow?: number // Row index that should be highlighted (cyan)
  variant?: 'default' | 'denseFrontier'
  className?: string
}

export default function NodeGrid({ 
  rows = 5, 
  cols = 5, 
  activeRow = 4,
  variant = 'default',
  className 
}: NodeGridProps) {
  if (variant === 'denseFrontier') {
    const advRow = rows - 1
    const total = rows * cols

    return (
      <div className={cn('flex flex-col items-center', className)}>
        <div className="relative p-6 border border-border bg-card shadow-2xl">
          {/* Corner markers */}
          <div className="absolute top-2 left-2 text-muted-foreground/60 text-[8px] select-none">+</div>
          <div className="absolute top-2 right-2 text-muted-foreground/60 text-[8px] select-none">+</div>
          <div className="absolute bottom-2 left-2 text-muted-foreground/60 text-[8px] select-none">+</div>
          <div className="absolute bottom-2 right-2 text-muted-foreground/60 text-[8px] select-none">+</div>

          <div className="grid gap-1.5 w-[240px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {Array.from({ length: total }).map((_, i) => {
              const rowIndex = Math.floor(i / cols)
              const isAdv = rowIndex === advRow
              return (
                <div
                  key={i}
                  className={cn(
                    'aspect-square flex items-center justify-center transition-colors',
                    isAdv
                      ? 'bg-muted/20 border border-red-900/20 hover:bg-red-900/10 cursor-not-allowed'
                      : 'bg-muted/30 border border-border hover:bg-muted/50 cursor-crosshair'
                  )}
                >
                  {isAdv ? (
                    <div className="w-1.5 h-1.5 border border-red-500/40 rounded-sm transition-colors" />
                  ) : (
                    <div className="w-1 h-1 bg-muted-foreground rounded-full transition-colors hover:bg-emerald-400" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-between w-[240px] mt-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
            <span className="text-[9px] font-mono text-muted-foreground uppercase">Sim_Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 border border-red-500/40 rounded-sm" />
            <span className="text-[9px] font-mono text-muted-foreground uppercase">Adv_Node</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {/* Corner brackets */}
      <div className="absolute -top-2 -left-2 w-3 h-3 border-l border-t border-muted-foreground/40" />
      <div className="absolute -top-2 -right-2 w-3 h-3 border-r border-t border-muted-foreground/40" />
      <div className="absolute -bottom-2 -left-2 w-3 h-3 border-l border-b border-muted-foreground/40" />
      <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r border-b border-muted-foreground/40" />

      {/* Grid */}
      <div className="grid gap-2 p-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: cols }).map((_, colIndex) => {
            const isActive = rowIndex === activeRow
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (rowIndex * cols + colIndex) * 0.02 }}
                className={cn(
                  'w-10 h-10 flex items-center justify-center border transition-colors',
                  isActive
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-border bg-muted/30'
                )}
              >
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    isActive ? 'bg-primary' : 'bg-muted-foreground'
                  )}
                />
              </motion.div>
            )
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
          <span>SIM_CORE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>ADV_NODE</span>
        </div>
      </div>
    </div>
  )
}
