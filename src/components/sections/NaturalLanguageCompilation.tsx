'use client'

import { motion } from 'motion/react'

export default function NaturalLanguageCompilation() {
  return (
    <section className="bg-background text-foreground py-24 px-6 lg:px-10 border-b border-border dark:bg-[#050505] dark:text-neutral-200 dark:border-neutral-900 dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 bg-foreground dark:bg-white rounded-full animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground dark:text-neutral-500">
              Mode: Guided_Autonomy
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-8 leading-[1.05] dark:text-white">
            Natural Language
            <br />
            <span className="text-muted-foreground dark:text-neutral-500">Compilation.</span>
          </h2>

          <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed mb-12 border-l border-border pl-6 dark:border-neutral-800 dark:text-neutral-400">
            <p>
              For the solo developer, context is leverage. Our agent utilizes a self-learning topology to map your codebase{' '}
              <strong className="text-foreground font-medium dark:text-white">100x deeper</strong> than standard LLMs, identifying architectural debt before runtime.
            </p>
            <p>
              Powerful, yet bounded. We prioritize{' '}
              <span className="text-foreground border-b border-border pb-0.5 dark:text-white dark:border-neutral-700">Prompt-Guided Execution</span>.
              The agent amplifies intent; it does not hallucinate features.
            </p>
          </div>

          <div className="py-6 border-t border-border flex gap-6 items-start dark:border-neutral-900">
            <div className="mt-1">
              <div className="w-4 h-4 border border-muted-foreground/60 flex items-center justify-center dark:border-neutral-600">
                <div className="w-1.5 h-1.5 bg-muted-foreground dark:bg-neutral-400" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-foreground mb-2 dark:text-white">State of Autonomy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono max-w-sm dark:text-neutral-500">
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
          className="lg:col-span-7 w-full aspect-square md:aspect-[4/3] bg-card border border-border flex flex-col relative overflow-hidden dark:bg-[#080808] dark:border-neutral-900"
        >
          {/* Header */}
          <div className="h-12 border-b border-border bg-background flex justify-between items-center px-6 dark:bg-[#050505] dark:border-neutral-900">
            <span className="text-[9px] font-mono uppercase text-muted-foreground tracking-widest dark:text-neutral-600">
              Agent_Workspace // 09
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase text-muted-foreground dark:text-neutral-600">Guardrails</span>
                <div className="w-6 h-3 border border-border rounded-full flex items-center px-0.5 dark:border-neutral-700">
                  <div className="w-2 h-2 bg-foreground rounded-full dark:bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 relative p-8 lg:p-12 flex flex-col justify-center items-center">
            <div className="absolute inset-0 z-0 opacity-[0.18] dark:opacity-[0.2]">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="cb-nlc-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="hsl(var(--border))" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#cb-nlc-dots)" />
              </svg>
            </div>

            <div className="relative z-10 w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Context map */}
              <div className="aspect-square w-full border border-border bg-background relative overflow-hidden opacity-90 hover:opacity-100 transition-opacity dark:border-neutral-800 dark:bg-[#050505]">
                <div className="absolute top-2 left-2 text-[8px] font-mono text-muted-foreground uppercase dark:text-neutral-600">Fig 1.1: Context_Map</div>
                <svg viewBox="0 0 400 300" className="w-full h-full text-muted-foreground dark:text-neutral-600" fill="none" stroke="currentColor">
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
                  <circle cx="200" cy="150" r="2" fill="white" />
                  <circle cx="120" cy="120" r="1.5" fill="currentColor" />
                  <line x1="120" y1="120" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="280" cy="180" r="1.5" fill="currentColor" />
                  <line x1="280" y1="180" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <circle cx="250" cy="80" r="1.5" fill="currentColor" />
                  <line x1="250" y1="80" x2="200" y2="150" strokeWidth="0.5" opacity="0.4" />
                  <line x1="0" y1="0" x2="0" y2="300" strokeWidth="1" stroke="white" opacity="0.08">
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

                <div className="mt-8 border-t border-dashed border-border pt-6 dark:border-neutral-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono uppercase text-muted-foreground bg-muted/20 px-1 dark:text-neutral-600 dark:bg-neutral-900">
                      Input_Stream
                    </span>
                  </div>
                  <p className="font-mono text-xs text-foreground dark:text-neutral-300">
                    <span className="text-muted-foreground mr-2 dark:text-neutral-600">$</span>refactor auth_flow.ts
                    <span className="text-muted-foreground ml-2 dark:text-neutral-500">--strict --dry-run</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="h-10 border-t border-border bg-background flex justify-between items-center px-6 dark:bg-[#050505] dark:border-neutral-900">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-foreground rounded-full dark:bg-white" />
                <span className="text-[9px] font-mono uppercase text-muted-foreground dark:text-neutral-500">Listening</span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-muted-foreground uppercase dark:text-neutral-600">Context: 2M_Tokens</div>
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
        <span className="text-[9px] font-mono text-muted-foreground uppercase dark:text-neutral-500">{label}</span>
        <span className="text-[9px] font-mono text-muted-foreground dark:text-neutral-400">{value}%</span>
      </div>
      <div className="h-[1px] w-full bg-border relative dark:bg-neutral-800">
        <div className="absolute top-0 left-0 h-full bg-foreground transition-all duration-1000 dark:bg-white" style={{ width: `${value}%` }} />
        {showMarker && <div className="absolute top-[-2px] right-0 w-[1px] h-[5px] bg-muted-foreground dark:bg-neutral-600" />}
      </div>
    </div>
  )
}

