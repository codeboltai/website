import FeatureKicker from './FeatureKicker'

export default function TrajectorySearch() {
  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Header */}
        <div className="border-b border-border p-8 md:p-12">
          <FeatureKicker label="System_Evolution_02" dotClassName="bg-foreground/60" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            From “Linear Guessing” to <br />
            <span className="text-muted-foreground">Trajectory Search.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We replaced the standard “Next Token Prediction” model with a “Recursive Search” topology.
            This allows the system to acknowledge, explore, and prune 10,000 potential failure paths
            before committing to a final answer.
          </p>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Linear */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
                <span>Fig 4.0: Linear Sequence</span>
                <span>Risk: High</span>
              </div>

              <div className="h-48 w-full border border-border bg-muted/10 mb-8 relative flex flex-col items-center pt-8">
                <div className="w-px h-8 bg-muted-foreground/60" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/70" />
                <div className="w-px h-8 bg-muted-foreground/60" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/70" />
                <div className="w-px h-8 bg-muted-foreground/60" />
                <div className="w-3 h-3 border border-muted-foreground/70 flex items-center justify-center text-[8px] text-muted-foreground font-mono">
                  X
                </div>
                <div className="w-px h-12 border-l border-dashed border-border" />
                <span className="absolute bottom-4 text-[10px] font-mono text-red-900/50 uppercase tracking-widest">
                  Cascading Failure
                </span>
              </div>

              <h3 className="text-foreground font-medium mb-3">Dec 2025 Standard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Models predicted step 1 → 2 → 3 in a straight line. If step 50 contained an error, the
                subsequent 450 steps were hallucinated on false premises.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <span className="font-mono text-[10px] text-muted-foreground/70">
                Outcome: Frequent hallucinations on long-tasks.
              </span>
            </div>
          </div>

          {/* Divergent */}
          <div className="p-8 md:p-12 bg-background/20 flex flex-col justify-between border-l border-border relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10">
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                  Fig 4.1: Divergent Search
                </span>
                <div className="px-2 py-1 bg-green-900/20 border border-green-900/30 text-green-400 text-[10px] tracking-wider">
                  RISK: MITIGATED
                </div>
              </div>

              <div className="h-56 w-full border border-border bg-background mb-8 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                  <path d="M200,20 C180,60 100,80 80,140" stroke="#333" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="80" cy="140" r="2" fill="#333" />
                  <text x="60" y="155" fill="#444" fontSize="8" fontFamily="monospace">
                    P=0.12 (Pruned)
                  </text>

                  <path d="M200,20 C220,60 300,80 320,140" stroke="#333" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="320" cy="140" r="2" fill="#333" />
                  <text x="300" y="155" fill="#444" fontSize="8" fontFamily="monospace">
                    P=0.04 (Pruned)
                  </text>

                  <path d="M200,20 C200,80 200,100 200,120" stroke="#525252" strokeWidth="1" fill="none" />
                  <path d="M200,120 C200,150 230,160 250,180" stroke="#fff" strokeWidth="1.5" fill="none" />
                  <circle cx="200" cy="20" r="3" fill="white" />
                  <circle cx="200" cy="120" r="2" fill="#525252" />
                  <circle cx="250" cy="180" r="4" fill="white">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <g transform="translate(265, 182)">
                    <rect x="0" y="-8" width="60" height="14" fill="#111" stroke="#333" rx="2" />
                    <text x="5" y="2" fill="#fff" fontSize="8" fontFamily="monospace">
                      SOLVER_FOUND
                    </text>
                  </g>
                </svg>

                <div className="absolute top-4 right-4 text-right hidden md:block">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    Search_Depth
                  </div>
                  <div className="text-xl font-light text-foreground font-mono">10,240</div>
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3 text-lg">Horizon Mode</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                The system utilizes a <strong className="text-foreground">Recursive Swarm Topology</strong>.
                It explores divergent branches simultaneously, using a discriminator model to prune
                low-probability paths (<span className="font-mono text-xs text-muted-foreground">p &lt; 0.2</span>)
                before they consume token budget.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-border flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Capability Unlocked
              </span>
              <span className="font-mono text-xs text-foreground">24h+ Continuous Reasoning</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="p-8 md:p-12 bg-background/40 border-b border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-sans text-xl text-muted-foreground">
                “It doesn’t just try to be right once; it tries 10,000 different paths simultaneously to
                guarantee the result.”
              </p>
            </div>
            <div className="flex items-center gap-6 border-l border-border pl-6">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-1">Depth</div>
                <div className="text-2xl text-foreground font-light">10k+</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-1">Duration</div>
                <div className="text-2xl text-foreground font-light">24h+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

