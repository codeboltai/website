'use client'

import { motion } from 'motion/react'

interface MetricsProps {
    value: string
    label: string
    sublabel?: string
    trend?: string
    trendDirection?: 'up' | 'down'
    className?: string
}

export default function Metrics({ value, label, sublabel, trend, trendDirection = 'up', className = '' }: MetricsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${className}`}
        >
            <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-foreground tracking-tighter">{value}</span>
                {trend && (
                    <span className={`text-sm font-mono font-bold py-1 px-2 rounded-full ${trendDirection === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <span className="text-sm font-bold text-foreground uppercase tracking-widest mb-1">{label}</span>
            {sublabel && <span className="text-xs text-muted-foreground font-mono">{sublabel}</span>}
        </motion.div>
    )
}
