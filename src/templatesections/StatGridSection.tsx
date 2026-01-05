'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface StatItem {
    /** The stat value (e.g., "100+", "24/7", "∞") */
    value: string
    /** Label below the value */
    label: string
}

export interface StatGridSectionProps {
    /** Stats to display */
    stats: StatItem[]
    /** Number of columns (2, 3, or 4) */
    columns?: 2 | 3 | 4
    /** Background tone */
    tone?: 'default' | 'muted'
    /** Show top border */
    borderTop?: boolean
    /** Show bottom border */
    borderBottom?: boolean
    /** Enable animations */
    animate?: boolean
    /** Additional class names */
    className?: string
}

const toneStyles = {
    default: 'bg-background dark:bg-[#050505]',
    muted: 'bg-muted/10 dark:bg-zinc-900/20',
}

const columnStyles = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
}

/**
 * StatGridSection - Horizontal stats display
 * 
 * Used for quick stats sections, key metrics displays.
 * 
 * @example
 * ```tsx
 * <StatGridSection
 *   tone="muted"
 *   columns={4}
 *   stats={[
 *     { value: "100+", label: "Parallel Agents" },
 *     { value: "24/7", label: "Operation" },
 *     { value: "∞", label: "Context Window" },
 *     { value: "100%", label: "Visibility" },
 *   ]}
 * />
 * ```
 */
export function StatGridSection({
    stats,
    columns = 4,
    tone = 'default',
    borderTop = true,
    borderBottom = true,
    animate = true,
    className,
}: StatGridSectionProps) {
    const StatWrapper = animate ? motion.div : 'div'

    return (
        <section
            className={cn(
                'py-16 px-6',
                toneStyles[tone],
                borderTop && 'border-t border-border dark:border-zinc-800',
                borderBottom && 'border-b border-border dark:border-zinc-800',
                className
            )}
        >
            <div className="max-w-6xl mx-auto">
                <div className={cn('grid gap-8 text-center', columnStyles[columns])}>
                    {stats.map((stat, idx) => (
                        <StatWrapper
                            key={idx}
                            {...(animate
                                ? {
                                    initial: { opacity: 0, y: 16 },
                                    whileInView: { opacity: 1, y: 0 },
                                    viewport: { once: true },
                                    transition: { delay: idx * 0.05 },
                                }
                                : {})}
                        >
                            <span className="font-mono text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">
                                {stat.value}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </span>
                        </StatWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}
