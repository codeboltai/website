'use client'

import { motion } from 'motion/react'

interface DiagramProps {
    className?: string
    children?: React.ReactNode
    variant?: 'grid' | 'network' | 'flow'
}

export default function Diagram({ className = '', children, variant = 'grid' }: DiagramProps) {
    return (
        <div className={`relative overflow-hidden bg-card border border-border rounded-sm ${className}`}>

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 p-6 md:p-10 w-full h-full flex items-center justify-center">
                {children}
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-border" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-border" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-border" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-border" />
        </div>
    )
}

// Sub-components for building diagrams
export function DiagramNode({ x, y, label, active = false }: { x?: number, y?: number, label?: string, active?: boolean }) {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`relative w-12 h-12 flex items-center justify-center border ${active ? 'border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.3)]' : 'border-border bg-card'}`}
        >
            <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-primary' : 'bg-muted-foreground'}`} />
            {label && <span className="absolute -bottom-6 text-[10px] text-muted-foreground uppercase tracking-wider whitespace-nowrap">{label}</span>}
        </motion.div>
    )
}
