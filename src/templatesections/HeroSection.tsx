'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface HeroSectionProps {
  /** Eyebrow/badge text */
  eyebrow?: string
  /** Main headline (use \n for line breaks) */
  title: string
  /** Description paragraph */
  description?: string | ReactNode
  /** Primary CTA */
  primaryCTA?: ReactNode
  /** Secondary CTA */
  secondaryCTA?: ReactNode
  /** Hero visual content (diagram, preview, etc.) - has glow/float effects */
  visual?: ReactNode
  /** Bottom content (stats strip, etc.) - no special effects */
  bottomContent?: ReactNode
  /** Text alignment */
  align?: 'left' | 'center'
  /** Layout variant */
  layout?: 'default' | 'two-column'
  /** Show grid background */
  showGridBg?: boolean
  /** Show status indicator */
  showStatus?: boolean
  /** Status text */
  statusText?: string
  /** Additional class names */
  className?: string
}

/**
 * HeroSection - Page hero section template
 * 
 * Flexible hero section with support for various layouts,
 * CTAs, and visual elements.
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   eyebrow="System Capabilities"
 *   title={"The Recursive\nRuntime."}
 *   description="Explore the comprehensive suite..."
 *   primaryCTA={<CTAButton href="/download">Download</CTAButton>}
 *   visual={<HeroPreview />}
 * />
 * ```
 */
export function HeroSection({
  eyebrow,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  visual,
  bottomContent,
  align = 'center',
  layout = 'default',
  showGridBg = true,
  showStatus = false,
  statusText = 'System Status: Active',
  className,
}: HeroSectionProps) {
  const titleLines = title.split('\n')

  return (
    <section
      className={cn(
        'relative bg-background dark:bg-[#050505] text-foreground min-h-screen border-b border-border dark:border-neutral-900 font-sans antialiased overflow-hidden',
        className
      )}
    >
      {/* Grid Background */}
      {showGridBg && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 dark:opacity-20 pointer-events-none" />
      )}

      <div className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {layout === 'two-column' ? (
            <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
              {/* Left Column - Headline */}
              <div className="md:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {showStatus && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-[0.15em]">
                        {statusText}
                      </span>
                    </div>
                  )}

                  <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-foreground dark:text-white leading-[0.9]">
                    {titleLines.map((line, i) => (
                      <span
                        key={i}
                        className={cn(
                          'block',
                          i > 0 && 'text-muted-foreground dark:text-neutral-500'
                        )}
                      >
                        {line}
                      </span>
                    ))}
                  </h1>
                </motion.div>
              </div>

              {/* Right Column - Description & CTA */}
              <div className="md:col-span-4 pb-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {description && (
                    <div className="text-lg text-muted-foreground dark:text-neutral-400 font-light leading-relaxed mb-8">
                      {typeof description === 'string' ? <p>{description}</p> : description}
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {primaryCTA}
                    {secondaryCTA}
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            // Center-aligned layout
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={cn(
                'mb-12',
                align === 'center' && 'text-center max-w-4xl mx-auto'
              )}
            >
              {eyebrow && (
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
                  {eyebrow}
                </div>
              )}

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground dark:text-white tracking-tight mb-8 leading-[1.1]">
                {titleLines.map((line, i) => (
                  <span
                    key={i}
                    className={cn(
                      i > 0 && 'text-muted-foreground dark:text-zinc-500'
                    )}
                  >
                    {line}
                    {i < titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {description && (
                <div className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
                  {typeof description === 'string' ? <p>{description}</p> : description}
                </div>
              )}

              {(primaryCTA || secondaryCTA) && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  {primaryCTA}
                  {secondaryCTA}
                </div>
              )}
            </motion.div>
          )}

          {/* Visual */}
          {visual && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/30 via-transparent to-transparent rounded-lg opacity-50" />
                {visual}
              </motion.div>
            </motion.div>
          )}

          {/* Bottom Content (stats strip, etc.) */}
          {bottomContent}
        </div>
      </div>
    </section>
  )
}
