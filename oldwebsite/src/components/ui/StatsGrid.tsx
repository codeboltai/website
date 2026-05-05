'use client'

import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: string
  highlight?: boolean
}

interface StatsGridProps {
  stats: Stat[]
  className?: string
}

export default function StatsGrid({ stats, className }: StatsGridProps) {
  // Ensure we have exactly 4 stats for 2x2 grid, pad with empty if needed
  const displayStats = [...stats.slice(0, 4)]
  while (displayStats.length < 4) {
    displayStats.push({ label: '', value: '-' })
  }

  return (
    <div className={cn('border border-border divide-y divide-border', className)}>
      {/* Top row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {displayStats.slice(0, 2).map((stat, i) => (
          <div key={i} className="p-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground block mb-1">
              {stat.label}
            </span>
            <span className={cn(
              'text-lg font-medium',
              stat.highlight ? 'text-emerald-500' : 'text-foreground'
            )}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {displayStats.slice(2, 4).map((stat, i) => (
          <div key={i} className="p-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground block mb-1">
              {stat.label}
            </span>
            <span className={cn(
              'text-lg font-medium',
              stat.highlight ? 'text-emerald-500' : 'text-foreground'
            )}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
