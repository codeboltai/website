'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface DeepDiveSectionProps {
    /** Section subtitle/kicker text */
    kicker?: string
    /** Main title (use \n for line breaks, second line will be muted) */
    title: string
    /** Rich description content */
    description: ReactNode
    /** Metrics to display in a 2x2 grid */
    metrics?: Array<{ value: string; label: string }>
    /** Layout orientation - text left or right */
    orientation?: 'left' | 'right'
    /** Background tone */
    tone?: 'default' | 'deep' | 'muted'
    /** Show top border */
    borderTop?: boolean
    /** Show bottom border */
    borderBottom?: boolean
    /** Additional class names */
    className?: string
}

const toneStyles = {
    default: 'bg-background dark:bg-[#050505]',
    deep: 'bg-background dark:bg-[#030303]',
    muted: 'bg-muted/10 dark:bg-zinc-900/10',
}

/**
 * DeepDiveSection - Two-column text + metrics layout
 * 
 * Used for feature explanations, paradigm shifts, deep dives into concepts.
 * Supports reversible orientation for visual variety.
 * 
 * @example
 * ```tsx
 * <DeepDiveSection
 *   kicker="The Multi-Agent Paradigm"
 *   title={"Stop Optimizing for Speed.\nOptimize for Scale."}
 *   description={<>Your rich description with <strong>bold</strong> text...</>}
 *   metrics={[
 *     { value: "100+", label: "Parallel Agents" },
 *     { value: "24/7", label: "Operation" },
 *   ]}
 *   orientation="left"
 * />
 * ```
 */
export function DeepDiveSection({
    kicker,
    title,
    description,
    metrics,
    orientation = 'left',
    tone = 'default',
    borderTop = false,
    borderBottom = true,
    className,
}: DeepDiveSectionProps) {
    const titleLines = title.split('\n')

    return (
        <section
            className={cn(
                'py-32 px-6',
                toneStyles[tone],
                borderTop && 'border-t border-border dark:border-zinc-900',
                borderBottom && 'border-b border-border dark:border-zinc-900',
                className
            )}
        >
            <div className="max-w-5xl mx-auto">
                <div
                    className={cn(
                        'grid md:grid-cols-12 gap-12',
                        orientation === 'right' && 'md:[&>*:first-child]:order-2'
                    )}
                >
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7"
                    >
                        {kicker && (
                            <span className="font-mono text-[10px] text-primary dark:text-cyan-500 uppercase mb-6 block tracking-[0.3em] font-medium">
                                {kicker}
                            </span>
                        )}

                        <h2 className="text-4xl md:text-5xl font-medium text-foreground dark:text-white mb-8 tracking-tighter leading-[0.95]">
                            {titleLines.map((line, i) => (
                                <span key={i} className={i > 0 ? 'block text-muted-foreground dark:text-neutral-500' : 'block'}>
                                    {line}
                                </span>
                            ))}
                        </h2>

                        <div className="text-lg text-muted-foreground dark:text-neutral-400 font-light leading-relaxed">
                            {description}
                        </div>
                    </motion.div>

                    {/* Metrics */}
                    {metrics && metrics.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-5 flex flex-col justify-center"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                {metrics.map((metric, idx) => (
                                    <div key={idx} className="p-6 border border-border dark:border-zinc-800 bg-card/30 dark:bg-zinc-900/20">
                                        <span className="font-mono text-3xl md:text-4xl font-medium text-primary dark:text-cyan-400 block mb-2">
                                            {metric.value}
                                        </span>
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
                                            {metric.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
