'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface VerificationLayer {
  /** Layer level (e.g., "L1", "$L_1$") */
  level: string
  /** Layer title */
  title: string
  /** Meta info */
  meta: string
}

export interface VerificationCapability {
  /** Capability title */
  title: string
  /** Status label */
  statusLabel: string
  /** Status color */
  statusColor?: 'red' | 'emerald' | 'amber'
  /** Description */
  description: string
}

export interface VerificationStackSectionProps {
  /** Protocol number */
  protocolNumber?: string
  /** Protocol code */
  protocolCode?: string
  /** Section title (use \n for line breaks) */
  title: string
  /** Section description */
  description?: ReactNode
  /** Verification layers */
  layers: VerificationLayer[]
  /** Capabilities (shown below title) */
  capabilities?: VerificationCapability[]
  /** Pipeline diagram */
  pipelineDiagram?: ReactNode
  /** Stats to show */
  stats?: Array<{ label: string; value: string; highlight?: boolean }>
  /** Background tone */
  tone?: 'default' | 'deep'
  /** Show border bottom */
  borderBottom?: boolean
  /** Additional class names */
  className?: string
}

/**
 * VerificationStackSection - Verification/pipeline section with layers
 * 
 * A ready-to-use section for displaying verification stacks, security layers, etc.
 * 
 * @example
 * ```tsx
 * <VerificationStackSection
 *   protocolNumber="05"
 *   protocolCode="C_STACK"
 *   title={"Hierarchical\nVerification Stack."}
 *   description={<>Autonomous agents require a <strong>Deterministic Envelope</strong>...</>}
 *   layers={[
 *     { level: 'L1', title: 'Syntactic Validity', meta: 'AST Integrity' },
 *     { level: 'L2', title: 'Static Analysis', meta: 'SAST Scan' },
 *   ]}
 *   capabilities={[
 *     { title: 'Adversarial Oversight', statusLabel: 'ISOLATION: MICRO_VM', statusColor: 'red', description: '...' },
 *   ]}
 * />
 * ```
 */
export function VerificationStackSection({
  protocolNumber,
  protocolCode,
  title,
  description,
  layers,
  capabilities,
  pipelineDiagram,
  stats,
  tone = 'deep',
  borderBottom = true,
  className,
}: VerificationStackSectionProps) {
  const titleLines = title.split('\n')

  const statusColors = {
    red: 'text-red-500',
    emerald: 'text-emerald-500',
    amber: 'text-amber-500',
  }

  return (
    <section
      className={cn(
        'py-32 md:py-48 px-6',
        tone === 'deep' ? 'bg-background dark:bg-black' : 'bg-background dark:bg-[#050505]',
        borderBottom && 'border-b border-border dark:border-white/5',
        className
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left content */}
        <div className="col-span-1 lg:col-span-5">
          {(protocolNumber || protocolCode) && (
            <div className="flex items-baseline gap-4 mb-6">
              {protocolNumber && (
                <span className="font-mono text-xs text-emerald-500 tracking-widest">
                  {protocolNumber}
                </span>
              )}
              {protocolCode && (
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest dark:text-zinc-600">
                  PROTOCOL: {protocolCode}
                </span>
              )}
            </div>
          )}

          <h3 className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter mb-8 leading-tight dark:text-white">
            {titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>

          {description && (
            <div className="text-lg text-muted-foreground font-light leading-relaxed mb-12 dark:text-zinc-400">
              {description}
            </div>
          )}

          {/* Capabilities */}
          {capabilities && capabilities.length > 0 && (
            <div className="flex flex-col gap-8 border-t border-border pt-8 dark:border-zinc-900">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="text-foreground font-medium dark:text-white">{cap.title}</h4>
                    <span className={cn('text-[10px] font-mono uppercase tracking-[0.2em]', statusColors[cap.statusColor ?? 'emerald'])}>
                      {cap.statusLabel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed dark:text-zinc-500">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Pipeline */}
        <div className="col-span-1 lg:col-span-7 flex justify-center">
          <div className="w-full max-w-4xl mx-auto p-4 font-sans">
            {/* Pipeline header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
                    Pipeline_Architecture
                  </span>
                </div>
                <h2 className="text-2xl text-foreground font-light tracking-tight dark:text-white">
                  Verification Topology
                </h2>
              </div>

              {stats && stats.length > 0 && (
                <div className="flex gap-8 border-l border-white/10 pl-8">
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">
                        {stat.label}
                      </div>
                      <div className={cn(
                        'text-lg font-mono tracking-tighter',
                        stat.highlight ? 'text-emerald-400' : 'text-foreground dark:text-zinc-300'
                      )}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pipeline visualization */}
            <div className="w-full bg-card border border-border rounded-sm relative overflow-hidden dark:bg-[#050505] dark:border-white/10">
              <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 200 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-border/40 dark:border-zinc-800/50" />
                ))}
              </div>

              {pipelineDiagram ? (
                <div className="w-full p-8 md:p-10">
                  {pipelineDiagram}
                </div>
              ) : (
                <div className="p-8 md:p-10">
                  {/* Default layer visualization */}
                  <div className="w-full max-w-sm mx-auto border border-neutral-700 bg-muted/20 backdrop-blur-sm rounded-sm p-1">
                    {layers.map((layer, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-4 flex justify-between items-center group hover:bg-muted/30 transition-colors',
                          idx < layers.length - 1 && 'border-b border-border dark:border-zinc-800'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-emerald-600">{layer.level}</span>
                          <span className="text-sm text-foreground font-medium dark:text-white">
                            {layer.title}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500">
                          {layer.meta}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
