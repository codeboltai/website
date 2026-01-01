import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'New Pricing | Codebolt',
  description: 'Dropstone-style pricing layout preview.',
}

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

function FeatureLi({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 group/item">
      <div className="mt-1.5 w-1 h-1 shrink-0 transition-colors bg-primary" />
      <span className="text-sm text-muted-foreground font-sans leading-relaxed group-hover/item:text-foreground transition-colors">
        {children}
      </span>
    </li>
  )
}

function Plan({
  label,
  labelTone = 'primary',
  name,
  description,
  price,
  priceSuffix,
  meta,
  sections,
  cta,
  active = false,
}: {
  label?: string
  labelTone?: 'primary' | 'muted'
  name: string
  description: string
  price: string
  priceSuffix?: string
  meta?: string
  sections: Array<{ title: string; items: string[] }>
  cta: { text: string; href?: string; disabled?: boolean }
  active?: boolean
}) {
  return (
    <div
      className={[
        'group relative flex flex-col border-r border-b lg:border-b-0 border-border p-8 lg:p-12 transition-colors duration-300',
        active ? 'bg-primary/5 border-primary/30' : 'bg-card/50',
      ].join(' ')}
    >
      {label && (
        <div
          className={[
            'absolute top-0 right-0 border-l border-b border-border px-3 py-1.5',
            labelTone === 'primary' ? 'bg-primary' : 'bg-muted',
          ].join(' ')}
        >
          <span
            className={[
              'text-[9px] font-sans uppercase tracking-widest font-bold',
              labelTone === 'primary' ? 'text-primary-foreground' : 'text-foreground',
            ].join(' ')}
          >
            {label}
          </span>
        </div>
      )}

      <div className="mb-16">
        <h3 className="text-xl font-medium text-foreground mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground font-sans min-h-[40px] leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl lg:text-6xl font-light text-foreground tracking-tighter">{price}</span>
          {priceSuffix && <span className="text-lg text-muted-foreground font-light">{priceSuffix}</span>}
        </div>
        {meta && (
          <p className="text-sm text-muted-foreground/70 mt-2 font-mono">{meta}</p>
        )}
      </div>

      <div className="flex-1 mb-16">
        <ul className="space-y-3">
          {sections.map((sec) => (
            <li key={sec.title} className="pt-0">
              <span className="text-sm font-mono text-primary uppercase tracking-widest">{sec.title}</span>
              <ul className="space-y-3 mt-3">
                {sec.items.map((it) => (
                  <FeatureLi key={it}>{it}</FeatureLi>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        {cta.disabled ? (
          <button
            type="button"
            disabled
            className="w-full py-4 text-sm uppercase font-semibold font-sans border transition-all duration-200 bg-muted text-muted-foreground border-border cursor-not-allowed"
          >
            {cta.text}
          </button>
        ) : (
          <Link
            href={cta.href ?? '/'}
            className="block w-full py-4 text-center text-sm uppercase font-semibold font-sans border transition-all duration-200 bg-primary text-primary-foreground border-primary hover:brightness-110"
          >
            {cta.text}
          </Link>
        )}
      </div>
    </div>
  )
}

export default function NewPricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="min-h-screen py-32 px-6 font-sans border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
              <div className="mb-10">
                <div className="inline-flex items-center gap-3 mb-6 bg-muted/30 px-3 py-1 rounded-full border border-border">
                  <Dot />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    Resource Provisioning
                  </span>
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
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                      Active Session
                    </span>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 border-l border-border">
            <Plan
              label="Current Plan"
              name="Free"
              description="Local Runtime — Open-source experimentation & local model inference"
              price="Free"
              sections={[
                { title: 'COMPUTE ALLOCATION', items: ['50 Fast Requests / day', 'Unlimited Local Models (Ollama)'] },
                {
                  title: 'RUNTIME CAPABILITIES',
                  items: [
                    'Horizon Mode: DISABLED (Linear Inference Only)',
                    'Context: Standard Linear Window',
                    'State Virtualization: INACTIVE',
                  ],
                },
                { title: 'COLLABORATION', items: ['5 Active Share Links (24h TTL)'] },
              ]}
              cta={{ text: 'Current Plan', disabled: true }}
              active
            />

            <Plan
              label="Recommended"
              name="Pro"
              description="Professional Engineer — Senior developers requiring deep reasoning and infinite context"
              price="1,335"
              priceSuffix="INR"
              meta="(approx. $15 USD)"
              sections={[
                { title: 'COMPUTE ALLOCATION', items: ['Unlimited Local & Fast Models', '~750 Frontier Requests (Claude 4.5 Sonnet, GPT 5.2)'] },
                {
                  title: 'HORIZON ARCHITECTURE',
                  items: ['Scout Swarm: ACTIVE (Exploration Layer)', 'Adversarial Monitor: L1-L2 Verification', 'Impact Analysis Engine'],
                },
                { title: 'MEMORY MANIFOLD', items: ['Advanced Contextual Understanding', 'Intelligent Learning System (Personal Weights)'] },
                { title: 'COLLABORATION', items: ['Unlimited Share Links (30-day TTL)', 'Share Chat (Read/Fork Only)'] },
              ]}
              cta={{ text: 'Start Pro Plan', href: '/newdownload' }}
            />

            <Plan
              label="Recommended"
              name="Teams"
              description="Recursive Swarm — Engineering teams requiring shared state and full autonomous verification"
              price="6,675"
              priceSuffix="INR"
              meta="(approx. $75 USD)"
              sections={[
                { title: 'COMPUTE ALLOCATION', items: ['~2,250 Frontier Requests (3x Allowance)', 'Pooled Team Credits'] },
                {
                  title: 'HORIZON FULL STACK',
                  items: [
                    'Flash Protocol: ACTIVE (Instant Pruning)',
                    'Negative Knowledge: ACTIVE (Shared Failure Vectors)',
                    'Verification: L3-L4 (Sandboxed Execution)',
                  ],
                },
                { title: 'DISTRIBUTED STATE', items: ['Shared Workspace State (Vector Sync)', 'Distributed Knowledge Mesh', 'Real-time Collaborative Editing'] },
                { title: 'ENTERPRISE GOVERNANCE', items: ['SSO / SAML Integration', 'Advanced Audit Logging'] },
              ]}
              cta={{ text: 'Start Teams Plan', href: '/contact' }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

