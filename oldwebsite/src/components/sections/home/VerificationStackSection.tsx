import VerificationPipeline from '@/components/diagrams/VerificationPipeline'

export default function VerificationStackSection() {
  return (
    <section className="py-32 md:py-48 bg-background border-b border-border selection:bg-emerald-500 selection:text-black dark:bg-black dark:border-white/5 dark:text-zinc-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="col-span-1 lg:col-span-5">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-xs text-emerald-500 tracking-widest">05</span>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest dark:text-zinc-600">PROTOCOL: C_STACK</span>
          </div>

          <h3 className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter mb-8 leading-tight dark:text-white">
            Hierarchical <br /> Verification Stack.
          </h3>

          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 dark:text-zinc-400">
            Autonomous agents require a <span className="text-foreground font-medium dark:text-white">Deterministic Envelope</span>. We utilize a
            multi-stage consensus protocol (<span className="font-serif text-emerald-500/80">C</span>
            <sub>stack</sub>) that verifies code execution in ephemeral, network-isolated sandboxes with kernel-level syscall filtering.
          </p>

          <div className="flex flex-col gap-8 border-t border-border pt-8 dark:border-zinc-900">
            <div className="group">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-foreground font-medium dark:text-white">Adversarial Oversight</h4>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em]">ISOLATION: MICRO_VM</span>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed dark:text-zinc-500">
                All unverified logic is detained in network-gapped microVMs. Agents must pass &quot;Property-Based Testing&quot; where adversarial
                nodes attempt to inject edge-case failures.
              </p>
            </div>

            <div className="group">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-foreground font-medium dark:text-white">Hallucination Reduction</h4>
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em]">P &lt; 1.4%</span>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed dark:text-zinc-500">
                We monitor Semantic Entropy (Perplexity Spikes). If the <span className="font-serif text-zinc-400">PPL</span> variance exceeds the
                safe threshold, the branch is immediately pruned via the Flash Protocol.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-7 flex justify-center">
          <div className="w-full max-w-4xl mx-auto p-4 font-sans">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
                    Pipeline_Architecture // C_STACK
                  </span>
                </div>
                <h2 className="text-2xl text-foreground font-light tracking-tight dark:text-white">
                  Verification Topology <span className="text-muted-foreground dark:text-zinc-600">v2.1</span>
                </h2>
                <p className="mt-2 text-muted-foreground text-sm max-w-md leading-relaxed dark:text-zinc-400">
                  Visualizing the double-gate validation process. Artifacts are subjected to adversarial sandboxing before passing entropy thresholds.
                </p>
              </div>

              <div className="flex gap-8 border-l border-white/10 pl-8">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">Pass_Rate</div>
                  <div className="text-lg text-emerald-400 font-mono tracking-tighter">94.2%</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">Avg_Latency</div>
                  <div className="text-lg text-foreground font-mono tracking-tighter dark:text-zinc-300">12ms</div>
                </div>
              </div>
            </div>

            <div className="w-full bg-card border border-border rounded-sm relative overflow-hidden flex items-center justify-center dark:bg-[#050505] dark:border-white/10">
              <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 200 }).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-border/40 dark:border-zinc-800/50" />
                ))}
              </div>
              <div className="w-full p-8 md:p-10">
                <VerificationPipeline variant="embedded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

