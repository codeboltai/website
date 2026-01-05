'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface PricingFeatureSection {
  /** Section title */
  title: string
  /** Feature items */
  items: string[]
}

export interface PricingPlan {
  /** Plan label badge */
  label?: string
  /** Label color */
  labelColor?: 'primary' | 'muted'
  /** Plan name */
  name: string
  /** Plan description */
  description: string
  /** Price display */
  price: string
  /** Price suffix (e.g., "/month") */
  priceSuffix?: string
  /** Price meta (e.g., "Billed annually") */
  priceMeta?: string
  /** Feature sections */
  features: PricingFeatureSection[]
  /** CTA button text */
  ctaText: string
  /** CTA button href */
  ctaHref?: string
  /** CTA disabled */
  ctaDisabled?: boolean
  /** Is this plan highlighted */
  highlighted?: boolean
}

export interface PricingSectionProps {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Pricing plans (typically 3) */
  plans: PricingPlan[]
  /** Toggle options (e.g., Monthly/Yearly) */
  toggleOptions?: Array<{ label: string; active?: boolean }>
  /** Additional class names */
  className?: string
}

/**
 * PricingSection - Complete pricing comparison section
 * 
 * A ready-to-use pricing section with plan comparison grid.
 * 
 * @example
 * ```tsx
 * <PricingSection
 *   title="Choose Your Plan"
 *   plans={[
 *     {
 *       name: 'Starter',
 *       description: 'For individual developers',
 *       price: '$0',
 *       priceSuffix: '/month',
 *       features: [{ title: 'Core', items: ['Feature 1', 'Feature 2'] }],
 *       ctaText: 'Get Started',
 *       ctaHref: '/download',
 *     },
 *     // ... more plans
 *   ]}
 * />
 * ```
 */
export function PricingSection({
  title,
  description,
  plans,
  toggleOptions,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn('bg-card text-foreground py-24 px-4 md:px-8 border-t border-border', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || description || toggleOptions) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {description}
              </p>
            )}
            {toggleOptions && (
              <div className="inline-flex border border-border rounded-sm">
                {toggleOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={cn(
                      'px-6 py-2 text-sm uppercase font-sans tracking-widest transition-all duration-200',
                      opt.active
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Plans Grid */}
        <div className={cn(
          'grid border border-border',
          plans.length === 3 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        )}>
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                'relative flex flex-col border-r border-b lg:border-b-0 border-border p-8 lg:p-12 transition-colors duration-300',
                plan.highlighted ? 'bg-primary/5 border-primary/30' : 'bg-card/50',
                idx === plans.length - 1 && 'border-r-0'
              )}
            >
              {/* Label badge */}
              {plan.label && (
                <div
                  className={cn(
                    'absolute top-0 right-0 border-l border-b border-border px-3 py-1.5',
                    plan.labelColor === 'primary' ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'text-[9px] font-sans uppercase tracking-widest font-bold',
                      plan.labelColor === 'primary' ? 'text-primary-foreground' : 'text-foreground'
                    )}
                  >
                    {plan.label}
                  </span>
                </div>
              )}

              {/* Plan info */}
              <div className="mb-16">
                <h3 className="text-xl font-medium text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground font-sans min-h-[40px] leading-relaxed max-w-xs">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-12">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl lg:text-6xl font-light text-foreground tracking-tighter">
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-lg text-muted-foreground font-light">{plan.priceSuffix}</span>
                  )}
                </div>
                {plan.priceMeta && (
                  <p className="text-sm text-muted-foreground/70 mt-2 font-mono">{plan.priceMeta}</p>
                )}
              </div>

              {/* Features */}
              <div className="flex-1 mb-16">
                <ul className="space-y-3">
                  {plan.features.map((sec, sidx) => (
                    <li key={sidx} className="pt-0">
                      <span className="text-sm font-mono text-primary uppercase tracking-widest">
                        {sec.title}
                      </span>
                      <ul className="space-y-3 mt-3">
                        {sec.items.map((item, iidx) => (
                          <li key={iidx} className="flex items-start gap-3 group/item">
                            <div className="mt-1.5 w-1 h-1 shrink-0 transition-colors bg-primary" />
                            <span className="text-sm text-muted-foreground font-sans leading-relaxed group-hover/item:text-foreground transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {plan.ctaDisabled ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-4 text-sm uppercase font-semibold font-sans border transition-all duration-200 bg-muted text-muted-foreground border-border cursor-not-allowed"
                  >
                    {plan.ctaText}
                  </button>
                ) : (
                  <Link
                    href={plan.ctaHref ?? '#'}
                    className={cn(
                      'w-full py-4 text-sm uppercase font-semibold font-sans border transition-all duration-200 flex items-center justify-center',
                      plan.highlighted
                        ? 'bg-primary text-primary-foreground border-primary hover:bg-cyan-400'
                        : 'bg-foreground text-background border-foreground hover:bg-foreground/90'
                    )}
                  >
                    {plan.ctaText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
