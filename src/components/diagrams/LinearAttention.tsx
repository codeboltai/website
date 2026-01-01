'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface LinearAttentionProps {
  className?: string
}

export default function LinearAttention({ className }: LinearAttentionProps) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Main box with nested boxes */}
        <div className="relative w-32 h-24 border border-border">
          {/* Outer dashed border */}
          <div className="absolute -inset-3 border border-dashed border-muted-foreground/30" />
          
          {/* Inner content - nested rectangles */}
          <div className="absolute inset-4 border border-muted-foreground/50 flex items-center justify-center">
            <div className="w-12 h-8 border border-primary/50 bg-primary/5 flex items-center justify-center">
              <div className="w-4 h-[2px] bg-primary" />
            </div>
          </div>
          
          {/* Connecting lines */}
          <div className="absolute left-1/2 -top-3 w-[1px] h-3 bg-border" />
          <div className="absolute left-1/2 -bottom-3 w-[1px] h-3 bg-border" />
          <div className="absolute -left-3 top-1/2 w-3 h-[1px] bg-border" />
          <div className="absolute -right-3 top-1/2 w-3 h-[1px] bg-border" />
        </div>
      </motion.div>
    </div>
  )
}
