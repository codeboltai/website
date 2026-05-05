'use client'

import { DeepDiveSection } from '@/templatesections'
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
    return (
        <DeepDiveSection
            kicker={subtitle}
            title={title}
            description={description}
            metrics={metrics}
            orientation={orientation}
        />
    )
}
