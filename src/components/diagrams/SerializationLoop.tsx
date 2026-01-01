'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface SerializationLoopProps {
  className?: string
}

export default function SerializationLoop({ className }: SerializationLoopProps) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full gap-4', className)}>
      {/* IN node */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
        </div>
        <span className="text-[9px] font-mono text-muted-foreground mt-2 uppercase">IN</span>
      </motion.div>

      {/* Connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center"
      >
        <div className="w-6 h-[1px] bg-border" />
        <div className="w-2 h-2 rounded-full border border-border bg-card" />
      </motion.div>

      {/* Processing box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-16 h-12 border border-border flex items-center justify-center relative"
      >
        {/* Animated pulse line */}
        <motion.div
          className="absolute inset-x-2 h-[2px] bg-primary/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Connector line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center"
      >
        <div className="w-2 h-2 rounded-full border border-border bg-card" />
        <div className="w-6 h-[1px] bg-border" />
      </motion.div>

      {/* OUT node */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
        <span className="text-[9px] font-mono text-primary mt-2 uppercase">OUT</span>
      </motion.div>
    </div>
  )
}
