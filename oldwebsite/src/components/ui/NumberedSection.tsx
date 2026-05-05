'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface NumberedSectionProps {
  number: string
  label: string
  title: string
  description?: string | React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function NumberedSection({
  number,
  label,
  title,
  description,
  children,
  className
}: NumberedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('py-8 px-6 border-b border-border', className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start gap-4">
          {/* Cyan accent bar */}
          <div className="w-1 bg-primary flex-shrink-0 self-stretch min-h-[48px]" />
          
          <div className="flex-1">
            {/* Number + Label */}
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] block mb-2">
              {number} — {label}
            </span>
            
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-2">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <div className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </div>
            )}

            {/* Additional Content */}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
