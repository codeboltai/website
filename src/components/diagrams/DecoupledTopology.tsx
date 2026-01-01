'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface DecoupledTopologyProps {
  className?: string
}

export default function DecoupledTopology({ className }: DecoupledTopologyProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center w-full h-full gap-6', className)}>
      {/* UI Thread */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
          UI THREAD
        </span>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-muted-foreground/30 border border-border" />
          <div className="w-3 h-3 bg-muted-foreground/30 border border-border" />
          <div className="w-3 h-3 bg-muted-foreground/30 border border-border" />
        </div>
      </motion.div>

      {/* Separator with dots */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className="w-1 h-1 rounded-full bg-muted-foreground/50"
          />
        ))}
      </div>

      {/* Worker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
          WORKER
        </span>
        <div className="px-3 py-1.5 bg-primary/20 border border-primary/50">
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-primary" />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
