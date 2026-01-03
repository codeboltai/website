'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface ThreeColumnGridProps {
  /** Array of column content */
  columns: ReactNode[]
  /** Whether columns have dividers */
  divider?: boolean
  /** Animation enabled */
  animate?: boolean
  /** Animation stagger delay */
  staggerDelay?: number
  /** Additional class names */
  className?: string
}

/**
 * ThreeColumnGrid - Equal three-column responsive grid
 * 
 * Used for protocol cards, feature triptychs, step cards, etc.
 * 
 * @example
 * ```tsx
 * <ThreeColumnGrid
 *   divider
 *   columns={[
 *     <ProtocolCard key="1" ... />,
 *     <ProtocolCard key="2" ... />,
 *     <ProtocolCard key="3" ... />,
 *   ]}
 * />
 * ```
 */
export function ThreeColumnGrid({
  columns,
  divider = false,
  animate = true,
  staggerDelay = 0.05,
  className,
}: ThreeColumnGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3',
        divider && 'divide-y md:divide-y-0 md:divide-x divide-border dark:divide-zinc-800',
        className
      )}
    >
      {columns.map((col, idx) => {
        if (animate) {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * staggerDelay }}
            >
              {col}
            </motion.div>
          )
        }
        return <div key={idx}>{col}</div>
      })}
    </div>
  )
}
