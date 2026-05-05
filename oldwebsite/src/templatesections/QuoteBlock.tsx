'use client'

import { cn } from '@/lib/utils'

export interface QuoteBlockProps {
  /** Quote text */
  quote: string
  /** Attribution/source */
  attribution?: string
  /** Background variant */
  variant?: 'default' | 'muted'
  /** Text size */
  size?: 'sm' | 'md' | 'lg'
  /** Text alignment */
  align?: 'left' | 'center'
  /** Additional class names */
  className?: string
}

const sizeStyles = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
}

/**
 * QuoteBlock - Styled quote/testimonial block
 * 
 * Used for research quotes, testimonials, or callout text.
 * 
 * @example
 * ```tsx
 * <QuoteBlock
 *   quote="The model perceives infinite memory not by storing every word..."
 *   attribution="Codebolt Research"
 *   variant="muted"
 * />
 * ```
 */
export function QuoteBlock({
  quote,
  attribution,
  variant = 'default',
  size = 'md',
  align = 'left',
  className,
}: QuoteBlockProps) {
  return (
    <div
      className={cn(
        'p-8 md:p-12 border-t border-border dark:border-zinc-800',
        variant === 'muted' && 'bg-muted/10 dark:bg-zinc-900/10',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        <p className={cn('font-sans text-muted-foreground dark:text-zinc-400 leading-relaxed mb-6', sizeStyles[size])}>
          &quot;{quote}&quot;
        </p>
        {attribution && (
          <div className="flex items-center gap-4">
            {align === 'left' && <div className="h-px w-12 bg-border dark:bg-zinc-700" />}
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
              {attribution}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
