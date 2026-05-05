import FeatureKicker from './FeatureKicker'

export default function EconomicsOfIntelligence() {
  const fuzzDots = [
    { top: 30.217, left: 31.8213, opacity: 0.4 },
    { top: 40.0904, left: 84.082, opacity: 1 },
    { top: 65.0399, left: 9.91988, opacity: 1 },
    { top: 16.203, left: 69.8549, opacity: 1 },
    { top: 86.6595, left: 61.7518, opacity: 0.4 },
    { top: 38.1302, left: 51.1945, opacity: 1 },
    { top: 31.9476, left: 68.1881, opacity: 0.4 },
    { top: 78.7377, left: 78.036, opacity: 0.4 },
    { top: 42.5946, left: 8.91884, opacity: 1 },
    { top: 26.1483, left: 65.2148, opacity: 0.4 },
    { top: 79.4439, left: 6.49603, opacity: 1 },
    { top: 19.5457, left: 94.3963, opacity: 1 },
    { top: 56.044, left: 56.8144, opacity: 1 },
    { top: 29.4036, left: 90.4111, opacity: 0.4 },
    { top: 65.0388, left: 67.4543, opacity: 1 },
    { top: 76.6688, left: 91.1135, opacity: 1 },
    { top: 47.6355, left: 49.8742, opacity: 1 },
    { top: 45.0543, left: 17.1648, opacity: 0.4 },
    { top: 68.1071, left: 85.5107, opacity: 0.4 },
    { top: 84.7625, left: 10.7818, opacity: 1 },
  ]

  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Header */}
        <div className="border-b border-border p-8 md:p-12">
          <FeatureKicker label="System_Economics" dotClassName="bg-muted-foreground/60" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            The Economics of Intelligence.
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We optimize for cost-effective reasoning. By decoupling “Exploration” (Scouts) from
            “Architecture” (Frontier), the system achieves high solution coverage at near-zero marginal
            cost.
          </p>
        </div>

        {/* Scouts vs Frontier */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Scouts */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold select-none">
              N
            </div>
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
              <span>Component: The Scouts</span>
              <span className="border border-border px-1 py-0.5 rounded text-[10px]">Cost: ~$0.00</span>
            </div>

            <div className="h-32 w-full mb-8 relative border border-border bg-muted/10">
              {fuzzDots.map((d, i) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="absolute w-1 h-1 bg-muted-foreground rounded-full"
                  style={{ top: `${d.top}%`, left: `${d.left}%`, opacity: d.opacity }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M20,50 Q60,20 100,60" stroke="hsl(var(--muted-foreground) / 0.6)" strokeWidth="0.5" fill="none" />
                <path d="M40,80 Q90,90 120,40" stroke="hsl(var(--muted-foreground) / 0.6)" strokeWidth="0.5" fill="none" />
              </svg>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-muted-foreground/70">
                Fig 3.0: Hypothesis Fuzzing
              </div>
            </div>

            <h3 className="text-xl text-foreground font-medium mb-2">Exploration Layer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Role:</strong> Rapid Hypothesis Generation.
              <br />
              The system deploys cheap agents to explore 98% of the search tree. If 19 paths fail, the
              cost is negligible.
            </p>
            <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
              <div>Success &gt; 92% (Simple)</div>
              <div>Model: GPT-4o-mini</div>
            </div>
          </div>

          {/* Frontier */}
          <div className="p-8 md:p-12 relative bg-muted/5">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold select-none">
              1
            </div>
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
              <span>Component: The Frontier</span>
              <span className="border border-border px-1 py-0.5 rounded text-[10px]">Cost: High</span>
            </div>

            <div className="h-32 w-full mb-8 relative border border-border bg-muted/10 flex items-center justify-center">
              <div className="relative z-10 w-16 h-16 border border-foreground bg-background flex items-center justify-center">
                <div className="w-4 h-4 bg-foreground" />
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="0" y1="20" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground) / 0.7)" strokeWidth="1" />
                <line x1="0" y1="80" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground) / 0.7)" strokeWidth="1" />
                <line x1="100%" y1="20" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground) / 0.7)" strokeWidth="1" />
                <line x1="100%" y1="80" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground) / 0.7)" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-muted-foreground/70">
                Fig 3.1: Context Promotion
              </div>
            </div>

            <h3 className="text-xl text-foreground font-medium mb-2">Architectural Layer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Role:</strong> Context Promotion.
              <br />
              When a Scout validates a path (<span className="font-mono text-xs">P &gt; 0.85</span>), the
              context is promoted to the Frontier model for complex debugging and final architecture.
            </p>
            <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
              <div>Reasoning: Max</div>
              <div>Model: Gemini 3</div>
            </div>
          </div>
        </div>

        {/* Latency vs velocity */}
        <div className="border-b border-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <div className="max-w-md">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                Redefining Speed
              </span>
              <h3 className="text-2xl text-foreground font-medium mb-4">Latency vs. Engineering Velocity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We shift the optimization target from “Time to First Token” to “Solution Space Coverage.”
                A swarm may take minutes to think, but it solves in 10 minutes what takes a human 4
                hours of debugging.
              </p>
            </div>

            <div className="flex-1 w-full bg-muted/10 border border-border p-6">
              <div className="mb-6">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                  <span>Standard Iteration (Serial)</span>
                  <span>4 Hours</span>
                </div>
                <div className="flex w-full h-2 gap-1">
                  <div className="h-full w-1/4 bg-border" />
                  <div className="h-full w-1/4 bg-border/60" />
                  <div className="h-full w-1/4 bg-border/40" />
                  <div className="h-full w-1/4 bg-border/25" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono text-foreground mb-2">
                  <span>Horizon Swarm (Parallel)</span>
                  <span>10 Mins</span>
                </div>
                <div className="w-full relative h-4">
                  <div className="absolute top-0 left-0 h-full w-[5%] bg-foreground" />
                  <div className="absolute top-1 left-0 h-full w-[5%] bg-foreground/50" />
                  <div className="absolute top-2 left-0 h-full w-[5%] bg-foreground/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectures A/B */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-8 md:p-12">
            <div className="inline-block border border-border rounded-full px-3 py-1 mb-6">
              <span className="font-mono text-[10px] text-foreground uppercase tracking-widest">
                Architecture A: The Deep Diver
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center h-24 mb-6 border-l border-border ml-4 pl-4">
              <div className="w-32 h-1 bg-border/70" />
              <div className="w-32 h-1 bg-border/50" />
              <div className="w-32 h-1 bg-border/30" />
              <span className="text-[10px] font-mono text-muted-foreground mt-2">
                Sequential Memory Integrity
              </span>
            </div>
            <h4 className="text-foreground font-medium mb-2">Target: Deep Debugging</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Single-stream execution. Ideal for holding a massive 2,000-line file in context without
              “hallucinating” variables.
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1 h-1 bg-foreground" />
                Layer 3 Functional Correctness
              </li>
              <li className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1 h-1 bg-foreground" />
                Infinite Context (D3 Engine)
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-12 bg-background/30">
            <div className="inline-block border border-blue-900/30 bg-blue-900/10 rounded-full px-3 py-1 mb-6">
              <span className="font-mono text-[10px] text-blue-200 uppercase tracking-widest">
                Architecture B: The Swarm
              </span>
            </div>
            <div className="flex items-center justify-center h-24 mb-6 relative ml-4 pl-4">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={`w-1 h-1 rounded-full ${i === 7 ? 'bg-blue-400' : 'bg-border/60'}`}
                  />
                ))}
              </div>
              <span className="absolute -bottom-1 text-[10px] font-mono text-muted-foreground">
                Recursive Distribution
              </span>
            </div>
            <h4 className="text-foreground font-medium mb-2">Target: System Architecture</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              25-Agent recursive swarm. Ideal for finding low-probability (<span className="font-mono text-xs">P &lt; 0.05</span>) bugs,
              security audits, and greenfield spec generation.
            </p>
            <ul className="space-y-2">
              <li className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-400" />
                Adversarial Oversight (Red Teaming)
              </li>
              <li className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1 h-1 bg-blue-400" />
                Parallel Fuzz-Testing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

