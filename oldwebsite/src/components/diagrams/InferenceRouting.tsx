'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface InferenceRoutingProps {
  className?: string
}

export default function InferenceRouting({ className }: InferenceRoutingProps) {
  const swarmCells = Array.from({ length: 16 }).map((_, i) => {
    const isHot = i % 5 === 0
    const opacity = isHot ? 1 : 0.28 + ((i % 7) * 0.07)
    return { isHot, opacity: Math.min(opacity, 0.75) }
  })

  return (
    <div className={cn('w-full', className)}>
      <div className="w-full border border-border bg-card rounded-sm relative overflow-hidden group">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20 backdrop-blur-sm z-20 relative">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Fig 2.0 — Inference Routing
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-mono text-[9px] text-emerald-500/80">LIVE</span>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground border border-border px-1.5 py-0.5 rounded">
              v.4.0.2
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-10 md:p-14 relative flex items-center justify-between gap-8 z-10">
          {/* Orchestrator */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 relative"
          >
            <div className="w-20 h-20 relative flex items-center justify-center">
              <div className="absolute inset-0 border border-border/50 rounded-full" />
              <div className="absolute inset-1 border border-border/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />

              <div className="w-8 h-8 bg-foreground rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.12)] z-10">
                <div className="w-2 h-2 bg-background rounded-full" />
              </div>

              <div className="absolute w-full h-full animate-[spin_3s_linear_infinite]">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[3px]" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[10px] font-bold text-foreground tracking-wider">ORCHESTRATOR</span>
              <span className="font-mono text-[8px] text-muted-foreground uppercase">Layer 3 / State Root</span>
            </div>
          </motion.div>

          {/* Connector */}
          <div className="flex-1 relative h-px bg-border flex items-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-[shimmer_1.5s_linear_infinite]" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-border px-2 py-1 rounded-sm">
              <span className="font-mono text-[8px] text-indigo-400 whitespace-nowrap">CTX_PROMOTION :: 128kb</span>
            </div>
            <div className="absolute right-0 w-1.5 h-1.5 border-t border-r border-muted-foreground rotate-45 translate-y-[-0.5px]" />
          </div>

          {/* Scout swarm */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="flex flex-col items-center gap-4 relative"
          >
            <div className="w-24 h-24 bg-muted/10 border border-border p-1 grid grid-cols-4 gap-1 relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-muted-foreground/60" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-muted-foreground/60" />
              {swarmCells.map((cell, i) => (
                <div
                  key={i}
                  className={cn('rounded-[1px] transition-all duration-700', cell.isHot ? 'bg-indigo-500/80' : 'bg-border')}
                  style={{ opacity: cell.isHot ? 1 : cell.opacity }}
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-mono text-[10px] font-bold text-foreground tracking-wider">SCOUT SWARM</span>
              <span className="font-mono text-[8px] text-muted-foreground uppercase">Layer 1 / Dist. Compute</span>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border-t border-border bg-muted/10 relative z-10">
          <div className="p-3 border-r border-border flex flex-col gap-1">
            <span className="text-[8px] text-muted-foreground font-mono uppercase">Compute Cost</span>
            <span className="text-[10px] text-foreground font-mono">-99.2%</span>
          </div>
          <div className="p-3 border-r border-border flex flex-col gap-1">
            <span className="text-[8px] text-muted-foreground font-mono uppercase">Horizon</span>
            <span className="text-[10px] text-foreground font-mono">24h+</span>
          </div>
          <div className="p-3 flex flex-col gap-1">
            <span className="text-[8px] text-muted-foreground font-mono uppercase">Uncertainty</span>
            <span className="text-[10px] text-foreground font-mono">&lt; 0.04</span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 flex gap-3 items-start pl-1">
        <span className="text-muted-foreground font-mono text-[10px] pt-0.5">fig 2.0</span>
        <p className="text-[11px] text-muted-foreground leading-relaxed max-w-lg">
          <strong className="text-foreground font-medium">Deterministic Decoupling.</strong> The D3 Runtime separates state from probabilistic
          generation, routing tasks to optimized Scout Swarms.
        </p>
      </div>
    </div>
  )
}
