'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface HighlightBannerSectionProps {
    /** Rich content to display (supports JSX with styled spans) */
    content: ReactNode
    /** Background tone */
    tone?: 'default' | 'accent' | 'muted'
    /** Vertical padding size */
    padding?: 'sm' | 'md' | 'lg'
    /** Show top border */
    borderTop?: boolean
    /** Show bottom border */
    borderBottom?: boolean
    /** Additional class names */
    className?: string
}

const toneStyles = {
    default: 'bg-background dark:bg-[#050505]',
    accent: 'bg-primary/5 dark:bg-cyan-500/5',
    muted: 'bg-muted/10 dark:bg-zinc-900/20',
}

const paddingStyles = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
}

/**
 * HighlightBannerSection - Centered banner for key messages
 * 
 * Used for impactful one-liners, callouts, or key value propositions.
 * 
 * @example
 * ```tsx
 * <HighlightBannerSection
 *   content={
 *     <>
 *       Today's AI gives you <span className="text-primary font-medium">one helper</span>.
 *       Codebolt gives you <span className="text-primary font-medium">an entire team</span>.
 *     </>
 *   }
 *   tone="accent"
 * />
 * ```
 */
export function HighlightBannerSection({
    content,
    tone = 'default',
    padding = 'md',
    borderTop = false,
    borderBottom = true,
    className,
}: HighlightBannerSectionProps) {
    return (
        <section
            className={cn(
                'px-6',
                toneStyles[tone],
                paddingStyles[padding],
                borderTop && 'border-t border-border dark:border-zinc-900',
                borderBottom && 'border-b border-border dark:border-zinc-900',
                className
            )}
        >
            <div className="max-w-4xl mx-auto text-center">
                <p className="text-2xl md:text-3xl text-foreground font-light leading-relaxed">
                    {content}
                </p>
            </div>
        </section>
    )
}
