'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ComponentType } from 'react'

export interface IconFeatureItem {
    /** Lucide icon component */
    icon: ComponentType<{ className?: string }>
    /** Feature title */
    title: string
    /** Feature description */
    description: string
}

export interface IconFeatureGridSectionProps {
    /** Kicker/eyebrow text */
    kicker?: string
    /** Section title (use \n for line breaks) */
    title: string
    /** Section description */
    description?: string
    /** Feature items to display */
    features: IconFeatureItem[]
    /** Number of columns (2, 3, or 4) */
    columns?: 2 | 3 | 4
    /** Background tone */
    tone?: 'default' | 'muted'
    /** Show top border */
    borderTop?: boolean
    /** Show bottom border */
    borderBottom?: boolean
    /** Additional class names */
    className?: string
}

const toneStyles = {
    default: 'bg-background dark:bg-[#050505]',
    muted: 'bg-muted/10 dark:bg-zinc-900/20',
}

const columnStyles = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

/**
 * IconFeatureGridSection - Grid of icon + title + description cards
 * 
 * Used for development tools, platform features, integrations, etc.
 * 
 * @example
 * ```tsx
 * <IconFeatureGridSection
 *   kicker="Development Tools"
 *   title="Everything You Need to Build"
 *   description="A complete IDE with all the tools."
 *   columns={3}
 *   features={[
 *     { icon: Code, title: "Monaco Editor", description: "Full-featured code editor..." },
 *   ]}
 * />
 * ```
 */
export function IconFeatureGridSection({
    kicker,
    title,
    description,
    features,
    columns = 3,
    tone = 'default',
    borderTop = false,
    borderBottom = false,
    className,
}: IconFeatureGridSectionProps) {
    const titleLines = title.split('\n')

    return (
        <section
            className={cn(
                'py-24 px-6',
                toneStyles[tone],
                borderTop && 'border-t border-border dark:border-zinc-800',
                borderBottom && 'border-b border-border dark:border-zinc-800',
                className
            )}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    {kicker && (
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                                {kicker}
                            </span>
                        </div>
                    )}
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                        {titleLines.map((line, i) => (
                            <span
                                key={i}
                                className={cn('block', i > 0 && 'text-muted-foreground')}
                            >
                                {line}
                            </span>
                        ))}
                    </h2>
                    {description && (
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            {description}
                        </p>
                    )}
                </motion.div>

                {/* Grid */}
                <div className={cn('grid gap-6', columnStyles[columns])}>
                    {features.map((feature, idx) => {
                        const IconComponent = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.03 }}
                                className="border border-border p-6 bg-card/30 hover:border-primary/50 transition-colors"
                            >
                                <IconComponent className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
