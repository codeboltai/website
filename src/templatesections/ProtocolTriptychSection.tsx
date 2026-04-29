'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface ProtocolItem {
  /** Protocol code (e.g., "01_STATE_MANAGEMENT") */
  code: string
  /** Protocol title */
  title: string
  /** Protocol description */
  description: string
  /** Left stat label */
  leftLabel: string
  /** Left stat value */
  leftValue: string
  /** Right stat label */
  rightLabel: string
  /** Right stat value */
  rightValue: string
}

export interface ProtocolTriptychSectionProps {
  /** Array of 3 protocol items */
  protocols: [ProtocolItem, ProtocolItem, ProtocolItem]
  /** Background tone */
  tone?: 'default' | 'muted'
  /** Additional class names */
  className?: string
}

/**
 * ProtocolTriptychSection - Three-column protocol showcase section
 * 
 * A ready-to-use section for displaying three system protocols or features
 * in a horizontal strip layout.
 * 
 * @example
 * ```tsx
 * <ProtocolTriptychSection
 *   protocols={[
 *     {
 *       code: '01_STATE_MANAGEMENT',
 *       title: 'Context Virtualization',
 *       description: 'To bypass context saturation...',
 *       leftLabel: 'Inference Horizon',
 *       leftValue: '24H+',
 *       rightLabel: 'Registry Status',
 *       rightValue: 'SERIALIZED',
 *     },
 *     // ... 2 more items
 *   ]}
 * />
 * ```
 */
export function ProtocolTriptychSection({
  protocols,
  tone = 'muted',
  className,
}: ProtocolTriptychSectionProps) {
  return (
    <section
      className={cn(
        'w-full text-foreground font-sans',
        tone === 'muted' ? 'bg-muted/10 dark:bg-[#030303]' : 'bg-background dark:bg-[#050505]',
        className
      )}
    >
      <div className="border-t border-b border-border dark:border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border dark:divide-zinc-800">
          {protocols.map((card, idx) => (
            <motion.div
              key={card.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-8 md:p-12 hover:bg-muted/20 dark:hover:bg-zinc-900/30 transition-colors duration-500 flex flex-col h-full relative"
            >
              {/* Header */}
              <div className="mb-8 flex justify-between items-start">
                <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-[0.2em] border border-border dark:border-zinc-800 px-2 py-1 rounded-sm group-hover:border-primary/50 group-hover:text-primary dark:group-hover:border-cyan-500/50 dark:group-hover:text-cyan-400 transition-colors">
                  {card.code}
                </span>
                <div className="w-1.5 h-1.5 bg-border dark:bg-zinc-800 rounded-full group-hover:bg-primary dark:group-hover:bg-cyan-500 transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-foreground dark:text-white mb-4 tracking-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground dark:text-zinc-500 font-light leading-relaxed mb-10 flex-grow">
                {card.description}
              </p>

              {/* Footer stats */}
              <div className="pt-6 border-t border-border/50 dark:border-zinc-800/50 flex items-center justify-between font-mono text-[9px] text-muted-foreground dark:text-zinc-600 uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-muted-foreground/70 dark:text-zinc-700">{card.leftLabel}</span>
                  <span className="text-foreground dark:text-zinc-300">{card.leftValue}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[8px] text-muted-foreground/70 dark:text-zinc-700">{card.rightLabel}</span>
                  <span className="text-primary/80 dark:text-cyan-500/70">{card.rightValue}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
