import FeatureKicker from './FeatureKicker'

export default function ScaleDeployment() {
  return (
    <section className="bg-background text-foreground py-20 px-4 md:px-8 border-t border-border/80">
      <div className="max-w-6xl mx-auto border-l border-r border-border/80 bg-background">
        {/* Header */}
        <div className="border-b border-border/80 p-8 md:p-12">
          <FeatureKicker
            label="Restricted_Access_Tier"
            dotClassName="bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            className="mb-6"
          />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            High-Fidelity Topologies <br />
            <span className="text-muted-foreground">&amp; Scale Deployment.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Access to “Dual-Frontier” architectures and Massive-Scale Swarms (<span className="font-mono text-sm">N &gt; 1,000</span>) is strictly gated.
            Deployment requires regulatory pre-approval via the Blankline Research Integrity framework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border/80">
          {/* Diagram */}
          <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border/80 relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="inline-block px-3 py-1 border border-purple-500/30 bg-purple-900/10 rounded text-[10px] font-mono text-purple-300 uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  Config: God_Mode
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-muted-foreground/70 uppercase">Est. Cost</div>
                  <div className="text-foreground font-mono">~$0.85 / Step</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8 py-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-purple-500/50 bg-card flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                    <div className="absolute inset-0 rounded-full border border-purple-500 opacity-20 animate-ping" />
                    <span className="font-mono text-xs text-foreground z-10">GEMINI_3</span>
                    <span className="absolute -bottom-6 font-mono text-[9px] text-purple-400 uppercase tracking-widest">
                      Scout
                    </span>
                  </div>
                </div>

                <div className="flex-1 h-px bg-purple-900/50 relative max-w-[100px]">
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-purple-500/50 to-purple-500" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-[8px] font-mono text-purple-300">
                    LOSSLESS
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-purple-500 bg-card flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <span className="font-mono text-xs text-foreground">GEMINI_3</span>
                    <span className="absolute -bottom-6 font-mono text-[9px] text-foreground uppercase tracking-widest">
                      Frontier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-xl text-foreground font-medium mb-3">All-Frontier Topology</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              We replace the cheap “Scout” models with full-reasoning Frontier models. Every branch of
              the search tree—even the dead ends—is analyzed with maximum compute density.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-mono text-xs text-muted-foreground">Scout Intelligence</span>
                <span className="font-mono text-xs text-purple-400">99.9% (Gemini 3)</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-mono text-xs text-muted-foreground">Hypothesis Depth</span>
                <span className="font-mono text-xs text-foreground">Maximum</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-mono text-xs text-muted-foreground">Cost Profile</span>
                <span className="font-mono text-xs text-muted-foreground/80">Expensive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border/80 divide-y md:divide-y-0 md:divide-x divide-border/80">
          <div className="p-8 md:p-12 hover:bg-background/20 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-mono text-xs uppercase text-muted-foreground mb-1">Enterprise_Tier_02</div>
                <h4 className="text-2xl text-foreground font-light">Swarm Level</h4>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-light text-foreground">1k</span>
                <span className="text-[10px] font-mono text-muted-foreground/70 uppercase">
                  Concurrent Agents
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Designed for departmental R&amp;D. Capable of refactoring mid-sized codebases (50k+ LOC) in a
              single session.
            </p>
            <div className="w-full bg-border h-1 mt-4">
              <div className="bg-foreground h-1 w-[20%]" />
            </div>
            <div className="mt-2 text-[9px] font-mono text-muted-foreground/70 text-right">Capacity: 20%</div>
          </div>

          <div className="p-8 md:p-12 bg-background/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-mono text-xs uppercase text-muted-foreground mb-1">Enterprise_Tier_01</div>
                <h4 className="text-2xl text-foreground font-light">Hive Level</h4>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-light text-purple-400">10k</span>
                <span className="text-[10px] font-mono text-muted-foreground/70 uppercase">
                  Concurrent Agents
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Industrial Scale. Capable of generating entire OS kernels or verifying cryptographic
              primitives via brute-force reasoning.
            </p>
            <div className="w-full bg-border h-1 mt-4">
              <div className="bg-purple-500 h-1 w-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
            <div className="mt-2 text-[9px] font-mono text-muted-foreground/70 text-right">Capacity: 100%</div>
          </div>
        </div>

        {/* Compliance */}
        <div className="p-8 md:p-12 bg-background/40 flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <div className="w-12 h-12 border border-border rounded-sm flex items-center justify-center bg-background">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-900 rounded-full border border-background" />
          </div>

          <h3 className="text-foreground font-medium mb-2">Compliance Check Required</h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Usage of Tier 1 or Dense Frontier Plan requires a valid{' '}
            <span className="text-foreground">Blankline Research Integrity License</span>. This ensures
            alignment with safety protocols regarding recursive self-improvement algorithms.
          </p>

          <div className="w-full max-w-md bg-background border border-border p-1 flex items-center rounded-sm">
            <div className="bg-muted/40 px-3 py-2 text-[10px] font-mono text-muted-foreground uppercase border-r border-border">
              License_Key
            </div>
            <input
              placeholder="BLXX-XXXX-YYYY-ZZZZ"
              disabled
              className="bg-transparent border-none outline-none text-xs font-mono text-muted-foreground px-4 w-full cursor-not-allowed"
              type="text"
            />
            <button
              type="button"
              className="px-4 py-2 bg-muted/40 text-muted-foreground text-[10px] font-mono uppercase hover:bg-muted hover:text-foreground transition-colors"
            >
              Verify
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="text-[9px] font-mono text-muted-foreground/70 uppercase hover:text-muted-foreground cursor-pointer transition-colors">
              Apply for Research License →
            </span>
            <span className="text-[9px] font-mono text-muted-foreground/70 uppercase hover:text-muted-foreground cursor-pointer transition-colors">
              Read Safety Protocol →
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

