'use client'

import { motion } from 'motion/react'

export default function NaturalLanguageCompilation() {
  return (
    <section className="bg-background text-foreground py-24 px-6 lg:px-10 border-b border-border">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Mode: Guided_Autonomy</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-8 leading-[1.05]">
            Natural Language
            <br />
            <span className="text-muted-foreground">Compilation.</span>
          </h2>

          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed mb-12 border-l border-border pl-6">
            <p>
              For the solo developer, context is leverage. Our agent utilizes a self-learning topology to map your codebase{' '}
              <strong className="text-foreground font-medium">100x deeper</strong> than standard LLMs, identifying architectural debt before runtime.
            </p>
            <p>
              Powerful, yet bounded. We prioritize{' '}
              <span className="text-foreground border-b border-border pb-0.5">Prompt-Guided Execution</span>. The agent amplifies intent; it does
              not hallucinate features.
            </p>
          </div>

          <div className="py-6 border-t border-border flex gap-6 items-start">
            <div className="mt-1">
              <div className="w-4 h-4 border border-muted-foreground/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-muted-foreground" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-foreground mb-2">State of Autonomy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono max-w-sm">
                Non-deterministic output. System performance exceeds industry baselines by orders of magnitude, yet human oversight remains required
                for commit ratification.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-7 w-full aspect-square md:aspect-[4/3] bg-card border border-border flex flex-col relative overflow-hidden"
        >
          {/* Header */}
          <div className="h-12 border-b border-border bg-background flex justify-between items-center px-6">
            <span className="text-[9px] font-mono uppercase text-muted-foreground tracking-widest">Agent_Workspace // 09</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase text-muted-foreground">Guardrails</span>
                <div className="w-6 h-3 border border-border rounded-full flex items-center px-0.5">
                  <div className="w-2 h-2 bg-foreground rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 relative p-8 lg:p-12 flex flex-col justify-center items-center">
            <div className="absolute inset-0 z-0 opacity-[0.18]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="cb-nlc-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="hsl(var(--border))" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cb-nlc-dots)" />
              </svg>
            </div>

            <div className="relative z-10 w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Context map */}
              <div className="aspect-square w-full border border-border bg-background relative overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                <div className="absolute top-2 left-2 text-[8px] font-mono text-muted-foreground uppercase">Fig 1.1: Context_Map</div>
                <svg viewBox="0 0 400 300" className="w-full h-full text-muted-foreground" fill="none" stroke="currentColor">
                  <defs>
                    <linearGradient id="cb-nlc-fade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 150 Q 200 50 350 150" strokeWidth="0.5" opacity="0.3" />
                  <path d="M 50 150 Q 200 250 350 150" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="50" x2="200" y2="250" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
                  <circle cx="200" cy="150" r="40" fill="url(#cb-nlc-fade)" stroke="none" />
                  <circle cx="200" cy="150" r="2" fill="hsl(var(--foreground))" />
                  <circle cx="120" cy="120" r="1.5" fill="currentColor" />
                  <line x1="120" y1="120" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="280" cy="180" r="1.5" fill="currentColor" />
                  <line x1="280" y1="180" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="250" cy="80" r="1.5" fill="currentColor" />
                  <line x1="250" y1="80" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <line x1="0" y1="0" x2="0" y2="300" strokeWidth="1" stroke="hsl(var(--foreground))" opacity="0.08">
                    <animate attributeName="x1" from="0" to="400" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="x2" from="0" to="400" dur="4s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>

              {/* Progress + terminal */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <MetricBar label="Semantic_Depth" value={98} />
                  <MetricBar label="Graph_Integrity" value={94} />
                  <MetricBar label="Logic_Inference" value={82} showMarker />
                  <MetricBar label="Security_Audit" value={99} />
                </div>

                <div className="mt-8 border-t border-dashed border-border pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono uppercase text-muted-foreground bg-muted/20 px-1">Input_Stream</span>
                  </div>
                  <p className="font-mono text-xs text-foreground">
                    <span className="text-muted-foreground mr-2">$</span>refactor auth_flow.ts
                    <span className="text-muted-foreground ml-2">--strict --dry-run</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-10 border-t border-border bg-background flex justify-between items-center px-6">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-foreground rounded-full" />
                <span className="text-[9px] font-mono uppercase text-muted-foreground">Listening</span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase">Context: 2M_Tokens</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MetricBar({ label, value, showMarker }: { label: string; value: number; showMarker?: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[9px] font-mono text-muted-foreground uppercase">{label}</span>
        <span className="text-[9px] font-mono text-muted-foreground">{value}%</span>
      </div>
      <div className="h-[1px] w-full bg-border relative">
        <div className="absolute top-0 left-0 h-full bg-foreground transition-all duration-1000" style={{ width: `${value}%` }} />
        {showMarker && <div className="absolute top-[-2px] right-0 w-[1px] h-[5px] bg-muted-foreground" />}
      </div>
    </div>
  )
}

