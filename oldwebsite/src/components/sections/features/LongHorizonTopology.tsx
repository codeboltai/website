import FeatureKicker from './FeatureKicker'

export default function LongHorizonTopology() {
  return (
    <section className="bg-background text-foreground py-20 px-4 md:px-8 border-t border-border/80">
      <div className="max-w-6xl mx-auto border-l border-r border-border/80 bg-background">
        {/* Header */}
        <div className="border-b border-border/80 p-8 md:p-12">
          <FeatureKicker
            label="System_Capability_Final"
            dotClassName="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            className="mb-6"
          />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            Recursive Long-Horizon <br />
            <span className="text-muted-foreground">Reasoning Topology.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We challenge the premise that complex engineering requires “smarter” models. By decoupling{' '}
            <strong className="text-foreground">Fluid Intelligence</strong> from{' '}
            <strong className="text-foreground">State Retention</strong>, we enable an autonomous agent
            capable of continuous, recursive problem solving (<span className="font-mono text-sm">T &gt; 24h</span>)
            without context degradation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border/80">
          {/* Fig 6.0 */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border/80 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10">
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 6.0: The Optimization Loop</span>
                <span className="text-[10px] bg-indigo-900/10 text-indigo-400 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                  Running
                </span>
              </div>

              <div className="relative w-full aspect-square max-h-72 border border-border bg-background flex items-center justify-center mb-8 overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-border/50" />
                  <div className="h-full w-px bg-border/50 absolute" />
                </div>

                <svg className="w-full h-full max-w-[200px] max-h-[200px]" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="cbOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                    <filter id="cbOrbitGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  <g className="animate-[spin_12s_linear_infinite] origin-center">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="100" cy="10" r="2" fill="#404040" />
                  </g>

                  <g className="animate-[spin_8s_linear_infinite_reverse] origin-center">
                    <ellipse cx="100" cy="100" rx="70" ry="70" fill="none" stroke="url(#cbOrbitGrad)" strokeWidth="1.5" />
                    <circle cx="100" cy="30" r="3" fill="#818cf8" filter="url(#cbOrbitGlow)" />
                  </g>

                  <g className="animate-[spin_4s_linear_infinite] origin-center">
                    <circle cx="100" cy="100" r="45" fill="none" stroke="#404040" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="100" cy="145" r="2" fill="#fff" />
                  </g>

                  <circle cx="100" cy="100" r="8" fill="#6366f1">
                    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="100" r="16" fill="none" stroke="#6366f1" strokeOpacity="0.3">
                    <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <div className="absolute top-4 left-4 text-[10px] font-mono text-muted-foreground/70">
                  Swarm_Active
                  <br />
                  N=25
                </div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[9px] font-mono text-muted-foreground rounded-sm z-10">
                  GENERATE
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-background border border-border text-[9px] font-mono text-muted-foreground rounded-sm z-10">
                  PRUNE
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-background border border-border text-[9px] font-mono text-red-900/70 rounded-sm z-10">
                  FAIL
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-indigo-900/10 border border-indigo-500/30 text-[9px] font-mono text-indigo-300 rounded-sm z-10 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                  LEARN
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Self-Correction Architecture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If Agent 7 fails on step 50, the <strong className="text-foreground">Flash Protocol</strong> creates a “Constraint Embedding” (failure log).
                The system warns all other 24 agents to avoid that specific path, effectively “learning”
                from the mistake instantly.
              </p>
            </div>
          </div>

          {/* Fig 6.1 */}
          <div className="p-8 md:p-12 bg-background border-b border-border/80 md:border-b-0 relative group">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-6 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                Fig 6.1: Divergent Initialization
              </span>
              <span className="text-[10px] font-mono bg-muted/30 text-indigo-400 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                Target: Long Tail (P &lt; 0.05)
              </span>
            </div>

            <div className="relative w-full h-56 border-b border-border mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_14px]" />
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160">
                <defs>
                  <linearGradient id="cbBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <g fill="#262626">
                  {[
                    [50, 130, 30],
                    [60, 110, 50],
                    [70, 90, 70],
                    [80, 70, 90],
                    [90, 50, 110],
                    [100, 40, 120],
                    [110, 35, 125],
                    [120, 30, 130],
                    [130, 35, 125],
                    [140, 40, 120],
                    [150, 50, 110],
                    [160, 70, 90],
                    [170, 90, 70],
                    [180, 110, 50],
                    [190, 130, 30],
                  ].map(([x, y, h]) => (
                    <rect key={x} x={x} y={y} width="5" height={h} />
                  ))}
                </g>
                <g fill="url(#cbBarGrad)">
                  {[
                    [200, 140, 20, 0.5],
                    [210, 145, 15, 0.6],
                    [220, 148, 12, 0.7],
                    [230, 150, 10, 0.8],
                    [240, 152, 8, 0.9],
                    [250, 153, 7, 1],
                    [260, 154, 6, 1],
                    [270, 155, 5, 1],
                    [280, 156, 4, 1],
                  ].map(([x, y, h, o]) => (
                    <rect key={x} x={x} y={y} width="5" height={h} opacity={o} />
                  ))}
                </g>
                <line x1="200" y1="130" x2="200" y2="160" stroke="#818cf8" strokeWidth="1">
                  <animate attributeName="x1" values="200;300;200" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="x2" values="200;300;200" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                </line>
                <circle cx="262.5" cy="154" r="3" fill="#fff">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="r" values="1;4;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="120" y="150" textAnchor="middle" fill="#404040" fontSize="8" fontFamily="monospace">
                  CONSENSUS (NOISE)
                </text>
                <text x="260" y="130" textAnchor="middle" fill="#6366f1" fontSize="8" fontFamily="monospace">
                  INVENTION (SIGNAL)
                </text>
              </svg>

              <div className="absolute top-2 right-2 flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] text-indigo-300">SCANNING_TAIL</span>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/70">σ &gt; 3.5</span>
              </div>
            </div>

            <h3 className="text-foreground font-medium mb-2">Combinatorial Power</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Technical invention does not happen in the “most probable” token space. The Scout Swarm is
              forced to explore the <strong className="text-foreground">Long Tail</strong>—obscure combinations of algorithms that standard models ignore as “low probability.”
            </p>

            <div className="bg-background border border-border p-4 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-indigo-900/20 to-transparent" />
              <div className="absolute top-0 right-0 w-px h-2 bg-indigo-500/50" />
              <div className="absolute top-0 right-0 h-px w-2 bg-indigo-500/50" />
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-muted-foreground uppercase">Success Equation</span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-serif text-xl text-foreground italic">P</span>
                <span className="text-sm text-muted-foreground">(success)</span>
                <span className="text-xl text-muted-foreground mx-1">≈</span>
                <div className="flex items-start">
                  <span className="font-serif text-xl text-foreground italic">(1-ε)</span>
                  <span className="text-xs text-blue-400 font-mono mt-[-4px]">L</span>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground mt-2 font-mono">
                Where <span className="text-foreground/80">L</span> (Reasoning Steps) → ∞ via Context
                Decoupling.
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 border-b border-border/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">
                The Engine
              </span>
              <h4 className="text-xl text-foreground font-light mb-2">Codebolt Horizon</h4>
              <p className="text-sm text-muted-foreground">
                The infrastructure that executes the process. It handles state virtualization, swarm
                recursion, and error-pruning.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-500 block mb-4">
                The Fuel
              </span>
              <h4 className="text-xl text-foreground font-light mb-2">Gemini 3 (45% ARC)</h4>
              <p className="text-sm text-muted-foreground">
                The raw fluid intelligence. High reasoning density enables complex hypothesis generation
                within the Horizon framework.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

