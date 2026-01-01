'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface TechCardProps {
  figureLabel: string
  title: string
  description: string
  diagram?: React.ReactNode
  stats?: Array<{ label: string; value: string }>
  className?: string
}

export default function TechCard({
  figureLabel,
  title,
  description,
  diagram,
  stats,
  className
}: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors',
        className
      )}
    >
      {/* Diagram Container with Corner Brackets */}
      <div className="relative p-6 pb-0">
        {/* Figure Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {figureLabel}
          </span>
        </div>

        {/* Diagram Area with Corners */}
        <div className="relative h-40 md:h-48 bg-muted/30 border border-border flex items-center justify-center overflow-hidden">
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-muted-foreground/30" />
          <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-muted-foreground/30" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-muted-foreground/30" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-muted-foreground/30" />

          {/* Diagram Content */}
          {diagram || (
            <span className="text-muted-foreground font-mono text-xs">
              [DIAGRAM]
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Stats Footer */}
        {stats && stats.length > 0 && (
          <div className="border-t border-border mt-4 pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-sm font-medium text-primary">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}
