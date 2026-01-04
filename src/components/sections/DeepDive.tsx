'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DeepDiveProps {
    title: string
    subtitle?: string
    description: ReactNode
    metrics?: Array<{ value: string; label: string }>
    orientation?: 'left' | 'right'
}

export default function DeepDive({
    title,
    subtitle,
    description,
    metrics,
    orientation = 'left',
}: DeepDiveProps) {
    const titleLines = title.split('\n')

    return (
        <section className="py-32 px-6 bg-background border-b border-border dark:bg-[#050505] dark:border-zinc-900">
            <div className="max-w-5xl mx-auto">
                <div className={cn(
                    'grid md:grid-cols-12 gap-12',
                    orientation === 'right' && 'md:[&>*:first-child]:order-2'
                )}>
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7"
                    >
                        {subtitle && (
                            <span className="font-mono text-[10px] text-primary dark:text-cyan-500 uppercase mb-6 block tracking-[0.3em] font-medium">
                                {subtitle}
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
