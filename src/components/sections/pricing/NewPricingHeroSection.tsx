import Link from 'next/link'
import type { ReactNode } from 'react'

function Dot() {
  return <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
}

function Pill({
  children,
  href,
  active = false,
}: {
  children: ReactNode
  href?: string
  active?: boolean
}) {
  const cls =
    'relative px-10 py-3 text-sm uppercase font-sans tracking-widest transition-all duration-200 flex items-center gap-2 rounded-sm'

  if (href) {
    return (
      <Link
        href={href}
        className={`${cls} ${
          active
            ? 'bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.35)]'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={`${cls} ${
        active
          ? 'bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_hsl(var(--primary)/0.35)]'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </button>
  )
}

export default function NewPricingHeroSection() {
  return (
    <div className="mb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 mb-6 bg-muted/30 px-3 py-1 rounded-full border border-border">
            <Dot />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Resource Provisioning</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter text-foreground mb-6 leading-[0.95]">
            Compute &amp; <br />
            <span className="text-muted-foreground">Provisioning Scales.</span>
          </h1>

          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
            Transparent access to model inference. Scaling from individual research environments to federated enterprise compute grids.
          </p>
        </div>

        <div className="inline-flex items-center gap-8 bg-card border border-border px-6 py-3 rounded-sm shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-background border border-border flex items-center justify-center font-mono text-xs text-muted-foreground">
              u
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Active Session</span>
              <span className="text-sm text-foreground font-medium">Codebolt Operator</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-border" />
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">Plan Status</span>
            <span className="text-sm font-medium uppercase text-muted-foreground">Free Plan</span>
          </div>
        </div>

        <div className="mt-12">
          <div className="inline-flex border border-border bg-background p-1 gap-1 rounded-sm">
            <Pill active>Individual</Pill>
            <Pill href="/contact">Enterprise</Pill>
          </div>
        </div>
      </div>
    </div>
  )
}

