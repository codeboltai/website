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
        'group relative flex flex-col h-full overflow-hidden bg-card border border-border transition-all duration-500 hover:bg-muted/10',
        'dark:bg-[#0A0A0A] dark:border-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-[#0A0A0A]',
        className
      )}
    >
      {/* Diagram */}
      <div className="h-56 relative border-b border-border dark:border-zinc-900 bg-muted/20 dark:bg-[#080808] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[size:20px_20px]" />

        <div className="absolute top-4 left-4 font-mono text-[9px] text-muted-foreground/70 dark:text-zinc-600 uppercase tracking-widest flex items-center gap-2">
          <div className="w-1 h-1 bg-muted-foreground/60 dark:bg-zinc-600 rounded-full" />
          {figureLabel}
        </div>

        <div className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out">
          {diagram || <span className="text-muted-foreground font-mono text-xs">[DIAGRAM]</span>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-foreground dark:text-zinc-100 tracking-tight mb-3 group-hover:text-foreground dark:group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground dark:text-zinc-500 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Stats Footer */}
        {stats && stats.length > 0 && (
          <div className="mt-8 pt-4 border-t border-border/50 dark:border-zinc-900/50 flex justify-between items-center">
            <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-600 uppercase tracking-wider">
              {stats[0].label}
            </span>
            <span className="font-mono text-xs text-foreground dark:text-zinc-300 bg-muted dark:bg-zinc-900 px-2 py-1 rounded border border-border dark:border-zinc-800">
              {stats[0].value}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
