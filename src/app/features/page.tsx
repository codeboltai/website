import Link from 'next/link'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionTone = 'card' | 'deep'

function FeatureShell({
  tone = 'card',
  className,
  children,
}: {
  tone?: SectionTone
  className?: string
  children: React.ReactNode
}) {
  const isDeep = tone === 'deep'

  return (
    <section
      className={cn(
        'min-h-screen py-20 px-4 md:px-8 border-t',
        isDeep ? 'border-border dark:border-neutral-900 bg-background dark:bg-[#050505]' : 'border-border bg-card',
        'text-foreground selection:bg-foreground selection:text-background',
        className,
      )}
    >
      <div
        className={cn(
          'max-w-6xl mx-auto border-l border-r',
          isDeep ? 'border-border dark:border-neutral-900 bg-background dark:bg-[#050505]' : 'border-border bg-card',
        )}
      >
        {children}
      </div>
    </section>
  )
}

function Kicker({
  label,
  dotClassName = 'bg-muted-foreground',
  dotShape = 'square',
}: {
  label: string
  dotClassName?: string
  dotShape?: 'square' | 'circle'
}) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div
        className={cn('w-2 h-2', dotShape === 'circle' ? 'rounded-full' : '', dotClassName)}
        aria-hidden
      />
      <span className="font-mono text-xs uppercase tracking-tight text-muted-foreground">{label}</span>
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="bg-background border-b border-border">
        <section className="relative bg-background dark:bg-[#050505] text-foreground pt-32 pb-24 md:pt-48 md:pb-32">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-card text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
              System Capabilities
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
              The Recursive <br />
              <span className="text-muted-foreground">Runtime.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              Explore the comprehensive suite of autonomous capabilities that allow Codebolt to engineer software with
              human-level fidelity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/newdownload"
                className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                Start Building
                <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 stroke-[2.5px]" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 1) State Virtualization */}
      <FeatureShell>
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-foreground" />
                <span className="font-mono text-xs uppercase tracking-tight text-muted-foreground">
                  Research_Preview
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground space-y-1">
                <p>Spec: 04.22-A</p>
                <p>Status: Verified</p>
              </div>
            </div>
            <div className="hidden md:block font-mono text-xs text-muted-foreground/70 mt-12">Fig 1.0 — Architecture</div>
          </div>

          <div className="md:col-span-9 p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-8 leading-[1.1]">
              State Virtualization for <br />
              Infinite Context Windows
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              We present a method for decoupling reasoning depth from token limitations. By treating memory as a file
              system rather than a linear sequence, Codebolt achieves a 50:1 compression ratio while maintaining
              absolute logical recall.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
              <span>Figure A: Standard Transformer</span>
              <span>Decay: Linear</span>
            </div>

            <div className="relative h-32 w-full border-l border-b border-neutral-700 dark:border-neutral-700 mb-6">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path
                  d="M0,10 Q150,20 300,120"
                  fill="none"
                  stroke="#525252"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="absolute top-2 left-0 w-1.5 h-1.5 bg-foreground" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-neutral-600" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-600 bg-card px-2">
                Context Saturation
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard models re-process the entire transcript for every query. Reasoning quality degrades
              exponentially as context length approaches the token limit (<span className="font-mono">N</span>).
            </p>
          </div>

          <div className="p-8 md:p-12 bg-muted/10">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
              <span>Figure B: Codebolt Engine</span>
              <span className="text-foreground">Retention: 100%</span>
            </div>

            <div className="relative h-32 w-full flex items-center gap-1 mb-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-2 bg-neutral-800"
                  style={{ opacity: (i + 1) / 10 }}
                  aria-hidden
                />
              ))}
              <div className="h-px w-8 bg-neutral-600 mx-2" />
              <div className="h-12 w-12 border border-foreground flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground" />
              </div>
              <div className="absolute top-0 right-0 font-mono text-[10px] text-muted-foreground text-right">
                Vector
                <br />
                State
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Logic and variables are extracted into a <span className="text-foreground font-medium">State Vector</span>
              . Linguistic &quot;fluff&quot; is discarded, allowing infinite recursion without context loss.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border divide-x divide-border">
          <Metric label="Compression Rate" value="50:1" sub="Token/Vector" />
          <Metric label="Recall Accuracy" value="99.9%" sub="P-Value < 0.01" />
          <Metric label="Inference Latency" value="12ms" sub="Per Step" />
          <Metric label="Max Context" value="∞" sub="Theoretical" />
        </div>

        <div className="p-8 md:p-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12 block">
            Figure 2.0 — Quad-Partite Memory Topology
          </span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TopoCard idx="01" tag="Active RAM" title="Episodic Buffer" desc="Volatile, high-fidelity workspace for immediate reasoning tasks." />
            <TopoCard idx="02" tag="Vector HD" title="Sequential Drive" desc="Compressed logic history. Replays decision trees without linguistic overhead." />
            <TopoCard idx="03" tag="Global Graph" title="Associative Net" desc="Cross-referencing global knowledge base with current session data." />
            <TopoCard idx="04" tag="Hard-coded" title="Procedural Core" desc="Immutable primitives and tool-use definitions." />
          </div>
        </div>

        <div className="border-t border-border p-8 md:p-12 bg-muted/10">
          <div className="max-w-2xl">
            <p className="font-sans text-xl text-muted-foreground leading-relaxed mb-6">
              &quot;The model perceives infinite memory not by storing every word, but by rapidly swapping{' '}
              <span className="text-foreground not-italic">State Vectors</span>. This simulates infinite recall for
              complex engineering tasks without the computational cost of linear attention.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-neutral-700" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Codebolt Research
              </span>
            </div>
          </div>
        </div>
      </FeatureShell>

      {/* 2) Economics of Intelligence */}
      <FeatureShell>
        <div className="border-b border-border p-8 md:p-12">
          <Kicker label="System_Economics" dotClassName="bg-neutral-600" dotShape="square" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
            The Economics of Intelligence.
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We optimize for cost-effective reasoning. By decoupling &quot;Exploration&quot; (Scouts) from
            &quot;Architecture&quot; (Frontier), the system achieves high solution coverage at near-zero marginal cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Scouts */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold select-none">N</div>
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
              <span>Component: The Scouts</span>
              <span className="border border-border px-1 py-0.5 rounded text-[10px]">Cost: ~$0.00</span>
            </div>

            <div className="h-32 w-full mb-8 relative border border-border bg-muted/20">
              {SCOUT_DOTS.map((d, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neutral-500 rounded-full"
                  style={{ top: d.top, left: d.left, opacity: d.opacity }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
                <path d="M20,50 Q60,20 100,60" stroke="#525252" strokeWidth="0.5" fill="none" />
                <path d="M40,80 Q90,90 120,40" stroke="#525252" strokeWidth="0.5" fill="none" />
              </svg>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-muted-foreground/70">
                Fig 3.0: Hypothesis Fuzzing
              </div>
            </div>

            <h3 className="text-xl text-foreground font-medium mb-2">Exploration Layer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Role:</strong> Rapid Hypothesis Generation.
              <br />
              The system deploys cheap agents to explore 98% of the search tree. If 19 paths fail, the cost is
              negligible.
            </p>
            <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
              <div>Success &gt; 92% (Simple)</div>
              <div>Model: GPT-4o-mini</div>
            </div>
          </div>

          {/* Frontier */}
          <div className="p-8 md:p-12 relative bg-muted/10">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold select-none">1</div>
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
              <span>Component: The Frontier</span>
              <span className="border border-border px-1 py-0.5 rounded text-[10px]">Cost: High</span>
            </div>

            <div className="h-32 w-full mb-8 relative border border-border bg-muted/20 flex items-center justify-center">
              <div className="relative z-10 w-16 h-16 border border-foreground bg-background flex items-center justify-center">
                <div className="w-4 h-4 bg-foreground" />
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" aria-hidden>
                <line x1="0" y1="20" x2="50%" y2="50%" stroke="#525252" strokeWidth="1" />
                <line x1="0" y1="80" x2="50%" y2="50%" stroke="#525252" strokeWidth="1" />
                <line x1="100%" y1="20" x2="50%" y2="50%" stroke="#525252" strokeWidth="1" />
                <line x1="100%" y1="80" x2="50%" y2="50%" stroke="#525252" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-2 right-2 font-mono text-[10px] text-muted-foreground/70">
                Fig 3.1: Context Promotion
              </div>
            </div>

            <h3 className="text-xl text-foreground font-medium mb-2">Architectural Layer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Role:</strong> Context Promotion.
              <br />
              When a Scout validates a path (<span className="font-mono">P &gt; 0.85</span>), the context is promoted to
              the Frontier model for complex debugging and final architecture.
            </p>
            <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
              <div>Reasoning: Max</div>
              <div>Model: Gemini 3</div>
            </div>
          </div>
        </div>

        <div className="border-b border-border p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <div className="max-w-md">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                Redefining Speed
              </span>
              <h3 className="text-2xl text-foreground font-medium mb-4">Latency vs. Engineering Velocity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We shift the optimization target from &quot;Time to First Token&quot; to &quot;Solution Space Coverage.&quot;
                A swarm may take minutes to think, but it solves in 10 minutes what takes a human 4 hours of debugging.
              </p>
            </div>

            <div className="flex-1 w-full bg-muted/20 border border-border p-6">
              <div className="mb-6">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2">
                  <span>Standard Iteration (Serial)</span>
                  <span>4 Hours</span>
                </div>
                <div className="flex w-full h-2 gap-1" aria-hidden>
                  <div className="h-full w-1/4 bg-neutral-700" />
                  <div className="h-full w-1/4 bg-neutral-700 opacity-50" />
                  <div className="h-full w-1/4 bg-neutral-700 opacity-30" />
                  <div className="h-full w-1/4 bg-neutral-800" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-foreground mb-2">
                  <span>Horizon Swarm (Parallel)</span>
                  <span>10 Mins</span>
                </div>
                <div className="w-full relative h-4" aria-hidden>
                  <div className="absolute top-0 left-0 h-full w-[5%] bg-foreground" />
                  <div className="absolute top-1 left-0 h-full w-[5%] bg-foreground opacity-50" />
                  <div className="absolute top-2 left-0 h-full w-[5%] bg-foreground opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-8 md:p-12">
            <div className="inline-block border border-neutral-700 rounded-full px-3 py-1 mb-6">
              <span className="font-mono text-[10px] text-foreground uppercase tracking-widest">
                Architecture A: The Deep Diver
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center h-24 mb-6 border-l border-border ml-4 pl-4">
              <div className="w-32 h-1 bg-neutral-600" />
              <div className="w-32 h-1 bg-neutral-700" />
              <div className="w-32 h-1 bg-neutral-800" />
              <span className="text-[10px] font-mono text-muted-foreground mt-2">Sequential Memory Integrity</span>
            </div>
            <h4 className="text-foreground font-medium mb-2">Target: Deep Debugging</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Single-stream execution. Ideal for holding a massive 2,000-line file in context without
              &quot;hallucinating&quot; variables.
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

          <div className="p-8 md:p-12 bg-muted/5">
            <div className="inline-block border border-blue-900/30 bg-blue-900/10 rounded-full px-3 py-1 mb-6">
              <span className="font-mono text-[10px] text-blue-200 uppercase tracking-widest">
                Architecture B: The Swarm
              </span>
            </div>
            <div className="flex items-center justify-center h-24 mb-6 relative ml-4 pl-4">
              <div className="grid grid-cols-5 gap-1" aria-hidden>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn('w-1 h-1 rounded-full', i === 7 ? 'bg-blue-400' : 'bg-neutral-700')}
                  />
                ))}
              </div>
              <span className="absolute -bottom-1 text-[10px] font-mono text-muted-foreground">Recursive Distribution</span>
            </div>
            <h4 className="text-foreground font-medium mb-2">Target: System Architecture</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              25-Agent recursive swarm. Ideal for finding &quot;low-probability&quot; (<span className="font-mono">P &lt; 0.05</span>)
              bugs, security audits, and greenfield spec generation.
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
      </FeatureShell>

      {/* 3) Trajectory Search */}
      <FeatureShell>
        <div className="border-b border-border p-8 md:p-12">
          <Kicker label="System_Evolution_02" dotClassName="bg-foreground" dotShape="square" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            From &quot;Linear Guessing&quot; to <br />
            <span className="text-muted-foreground">Trajectory Search.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We replaced the standard &quot;Next Token Prediction&quot; model with a &quot;Recursive Search&quot; topology.
            This allows the system to acknowledge, explore, and prune 10,000 potential failure paths before committing
            to a final answer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
                <span>Fig 4.0: Linear Sequence</span>
                <span>Risk: High</span>
              </div>

              <div className="h-48 w-full border border-border bg-muted/10 mb-8 relative flex flex-col items-center pt-8">
                <div className="w-px h-8 bg-neutral-600" />
                <div className="w-2 h-2 rounded-full bg-neutral-500" />
                <div className="w-px h-8 bg-neutral-600" />
                <div className="w-2 h-2 rounded-full bg-neutral-500" />
                <div className="w-px h-8 bg-neutral-600" />
                <div className="w-3 h-3 border border-neutral-500 flex items-center justify-center text-[8px] text-neutral-500 font-mono">
                  X
                </div>
                <div className="w-px h-12 border-l border-dashed border-neutral-700" />
                <span className="absolute bottom-4 text-[10px] font-mono text-red-900/50 uppercase tracking-widest">
                  Cascading Failure
                </span>
              </div>

              <h3 className="text-foreground font-medium mb-3">Dec 2025 Standard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Models predicted step 1 → 2 → 3 in a straight line. If step 50 contained an error, the subsequent 450
                steps were hallucinated on false premises.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <span className="font-mono text-[10px] text-muted-foreground/70">
                Outcome: Frequent hallucinations on long-tasks.
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-muted/5 flex flex-col justify-between border-l border-border relative overflow-hidden">
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

              <div className="h-56 w-full border border-border bg-background dark:bg-[#080808] mb-8 relative overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden
                >
                  <path
                    d="M200,20 C180,60 100,80 80,140"
                    stroke="#333"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <circle cx="80" cy="140" r="2" fill="#333" />
                  <text x="60" y="155" fill="#444" fontSize="8" fontFamily="monospace">
                    P=0.12 (Pruned)
                  </text>
                  <path
                    d="M200,20 C220,60 300,80 320,140"
                    stroke="#333"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <circle cx="320" cy="140" r="2" fill="#333" />
                  <text x="300" y="155" fill="#444" fontSize="8" fontFamily="monospace">
                    P=0.04 (Pruned)
                  </text>
                  <path d="M200,20 C200,80 200,100 200,120" stroke="#525252" strokeWidth="1" fill="none" />
                  <path d="M200,120 C200,150 230,160 250,180" stroke="#fff" strokeWidth="1.5" fill="none" />
                  <circle cx="200" cy="20" r="3" fill="#fff" />
                  <circle cx="200" cy="120" r="2" fill="#525252" />
                  <circle cx="250" cy="180" r="4" fill="#fff">
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
                The system utilizes a <strong className="text-foreground">Recursive Swarm Topology</strong>. It explores
                divergent branches simultaneously, using a discriminator model to prune low-probability paths (
                <span className="font-mono text-xs text-muted-foreground">p &lt; 0.2</span>) before they consume token
                budget.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-border flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Capability Unlocked</span>
              <span className="font-mono text-xs text-foreground">24h+ Continuous Reasoning</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-muted/10 border-b border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-sans text-xl text-muted-foreground">
                &quot;It doesn’t just try to be right once; it tries 10,000 different paths simultaneously to guarantee
                the result.&quot;
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
      </FeatureShell>

      {/* 4) Signal Propulsion */}
      <FeatureShell>
        <div className="border-b border-border p-8 md:p-12">
          <Kicker label="System_Evolution_03" dotClassName="bg-neutral-600" dotShape="square" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            From &quot;Chatting&quot; to <br />
            <span className="text-muted-foreground">Signal Propulsion.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Traditional multi-agent systems suffer from &quot;Context Thrashing&quot;—spending computational cycles
            reading each other’s outputs. We introduce <strong className="text-foreground">Flash-Gated Consensus</strong>
            , allowing agents to operate in isolation and emit data pings only upon resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 5.0: Conversational Noise</span>
                <span className="px-1.5 py-0.5 border border-red-900/30 bg-red-900/10 text-red-500/80 text-[10px]">
                  Inefficient (<span className="font-mono">O(N²)</span>)
                </span>
              </div>

              <div className="h-48 w-full border border-border bg-muted/10 mb-8 relative flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-60" aria-hidden>
                  <path d="M100,20 L170,60" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L100,180" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L30,140" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L30,60" stroke="#333" strokeWidth="1" />
                  <path d="M170,60 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M170,60 L30,140" stroke="#333" strokeWidth="1" />
                  <path d="M30,60 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M30,60 L100,180" stroke="#333" strokeWidth="1" />
                  <circle cx="100" cy="20" r="3" fill="#555" />
                  <circle cx="170" cy="60" r="3" fill="#555" />
                  <circle cx="170" cy="140" r="3" fill="#555" />
                  <circle cx="100" cy="180" r="3" fill="#555" />
                  <circle cx="30" cy="140" r="3" fill="#555" />
                  <circle cx="30" cy="60" r="3" fill="#555" />
                </svg>
                <div className="absolute font-mono text-[10px] text-muted-foreground/70 bg-card px-2 border border-border">
                  Latency: High
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Legacy: Shared Context</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If 10 agents work in a shared chatroom, they parse the entire history of the other 9 agents. This
                quadratic complexity limits team size to small squads.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-muted/5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 5.1: Silent Swarm</span>
                <span className="px-1.5 py-0.5 border border-green-900/30 bg-green-900/10 text-green-500/80 text-[10px]">
                  Scalable (<span className="font-mono">O(1)</span>)
                </span>
              </div>

              <div className="h-48 w-full border border-border bg-background dark:bg-[#0c0c0c] mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />
                <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10" aria-hidden>
                  <circle cx="100" cy="100" r="12" fill="#000" stroke="#fff" strokeWidth="1.5" />
                  {SILENT_SWARM_LINES.map((l, i) => (
                    <g key={i}>
                      <line x1={l.x1} y1={l.y1} x2="100" y2="100" stroke="#222" strokeWidth="1" />
                      <rect x={l.x1 - 4} y={l.y1 - 4} width="8" height="8" fill="#222" />
                    </g>
                  ))}
                  <circle r="2" fill="#fff">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M40,40 L100,100" />
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2" fill="#fff">
                    <animateMotion dur="1.5s" begin="0.7s" repeatCount="indefinite" path="M160,160 L100,100" />
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.7s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] text-foreground">
                  HUB
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Horizon: Isolated Signals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Agents operate in total isolation (Silent Swarms). They do not communicate with peers. They emit a
                &quot;Flash Signal&quot; (Data Ping) only upon solving their specific puzzle fragment.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border bg-background dark:bg-[#080808]">
          <div className="p-6 md:p-8 border-r border-border">
            <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-2">Swarm Capacity</div>
            <div className="text-2xl text-foreground font-light">10k</div>
            <div className="text-[10px] text-muted-foreground mt-1">Simultaneous Agents</div>
          </div>
          <div className="p-6 md:p-8 border-r border-border">
            <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-2">Crosstalk</div>
            <div className="text-2xl text-foreground font-light">0%</div>
            <div className="text-[10px] text-muted-foreground mt-1">Perfect Isolation</div>
          </div>
          <div className="col-span-2 p-6 md:p-8 flex items-center">
            <p className="font-mono text-xs text-muted-foreground">
              &quot;We stopped treating collaboration like a meeting and started treating it like a distributed database
              write.&quot;
            </p>
          </div>
        </div>
      </FeatureShell>

      {/* 5) Semantic Entropy Tracking */}
      <FeatureShell>
        <div className="border-b border-border p-8 md:p-12">
          <Kicker label="System_Safety_04" dotClassName="bg-amber-600" dotShape="square" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            The Hallucination Detector: <br />
            <span className="text-muted-foreground">Semantic Entropy Tracking.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Standard models do not know when they are lying. Codebolt monitors the{' '}
            <strong className="text-foreground">Perplexity (PPL)</strong> of the output stream in real-time. If the
            signal entropy spikes, the system triggers an immediate &quot;State Compression&quot; event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          <div className="md:col-span-4 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-muted/5">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-6">Legacy_Problem: Unchecked Decay</div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              In standard LLMs, once a model outputs a low-probability token (a lie), it forces itself to justify that
              lie with more lies. This creates a &quot;Hallucination Loop&quot; that is mathematically impossible to
              exit.
            </p>
            <div className="p-4 bg-background dark:bg-[#0c0c0c] border border-border font-mono text-[10px] text-amber-500/80">
              Warning: Output Divergence <br />
              PPL Score: &gt; 85.2 (Critical)
            </div>
          </div>

          <div className="md:col-span-8 p-8 md:p-12 relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="font-mono text-xs uppercase text-muted-foreground mb-1">Real-Time Signal Monitor</div>
                <div className="text-foreground font-medium">Active Intervention Protocol</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="font-mono text-[10px] text-muted-foreground/70">
                  Threshold <sub className="not-italic text-[10px]">max</sub>
                </div>
                <div className="font-mono text-xs text-amber-500">4.5 PPL</div>
              </div>
            </div>

            <div className="relative h-64 w-full border border-border bg-background dark:bg-[#080808] overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute top-[30%] left-0 w-full h-px border-t border-dashed border-amber-900/50 z-10" />
              <div className="absolute top-[30%] right-2 -translate-y-full text-[8px] font-mono text-amber-900">
                HALLUCINATION_THRESHOLD
              </div>

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
                <path d="M0,180 Q20,170 40,180 T80,180 T120,175 T160,180" fill="none" stroke="#525252" strokeWidth="1.5" />
                <path
                  d="M160,180 L170,140 L180,160 L190,100 L200,130 L210,80 L220,110 L225,50"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
                <line x1="225" y1="50" x2="225" y2="180" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" />
                <path d="M225,180 L240,180 T280,180 T320,175 T600,180" fill="none" stroke="#525252" strokeWidth="1.5" />
                <circle cx="225" cy="50" r="3" fill="#d97706" className="animate-pulse" />
                <circle cx="225" cy="50" r="8" fill="none" stroke="#d97706" strokeOpacity="0.5" />
              </svg>

              <div className="absolute top-[20%] left-[230px] bg-background dark:bg-[#080808] border border-amber-900/50 px-2 py-1 z-20">
                <span className="text-[8px] font-mono text-amber-500 uppercase tracking-wide block">
                  Event: State_Compression
                </span>
                <span className="text-[8px] font-mono text-muted-foreground block">Action: Context Reset</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
          <StepCard idx="01. Monitor" title="Track Perplexity (PPL)" desc="Continuously calculate token surprise relative to the State Vector." />
          <StepCard
            idx="02. Detect"
            idxClassName="text-amber-600"
            title="Entropy Spike"
            desc="If the agent begins making things up, the entropy score spikes above the safety threshold."
          />
          <StepCard
            idx="03. Intervene"
            className="bg-muted/5"
            idxClassName="text-foreground"
            title="State Compression"
            desc="Generation is halted, context compresses to the last verified state, and generation restarts."
          />
        </div>

        <div className="p-8 md:p-12 text-center">
          <p className="font-sans text-lg text-muted-foreground">&quot;It stops errors before they are finished being written.&quot;</p>
        </div>
      </FeatureShell>

      {/* 6) Hierarchical Verification */}
      <FeatureShell>
        <div className="border-b border-border p-8 md:p-12">
          <Kicker label="System_QA_05" dotClassName="bg-emerald-600" dotShape="square" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            The Automated QA Dept: <br />
            <span className="text-muted-foreground">Hierarchical Verification.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We replace human review with a <strong className="text-foreground">4-Layer Deterministic Envelope</strong>.
            Before code is ever displayed to the user, it must survive four rigorous &quot;Robot Guards.&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-background dark:bg-[#080808] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4 text-center">
                <div className="inline-block px-3 py-1 border border-neutral-700 rounded-full bg-card text-[10px] font-mono text-muted-foreground mb-2">
                  Input: Raw_Token_Stream
                </div>
                <div className="h-6 w-px bg-neutral-700 mx-auto" />
              </div>

              <div className="w-full max-w-sm border border-neutral-700 bg-muted/20 backdrop-blur-sm rounded-sm p-1">
                <LayerRow level="$L_1$" title="Syntactic Validity" meta="AST Integrity" />
                <LayerRow level="$L_2$" title="Static Analysis" meta="SAST Scan" />
                <LayerRow level="$L_3$" title="Functional Correctness" meta="Test Harness" />
                <LayerRow level="$L_4$" title="Property Testing" meta="Fuzz Injection" isLast />
              </div>

              <div className="mt-4 text-center">
                <div className="h-6 w-px bg-emerald-900 mx-auto" />
                <div className="inline-block px-4 py-1.5 border border-emerald-900/50 rounded-full bg-emerald-900/10 text-[10px] font-mono text-emerald-400 mt-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Output: Verified_Artifact
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col">
            <SideRow level="L1" title="Syntax Guard" desc="Instant filtration of broken syntax trees. If code cannot parse, it is rejected before execution begins." />
            <SideRow level="L2" title="Security Scanner" desc="Static Analysis (SAST) scans for vulnerability patterns (SQLi, XSS, Buffer Overflows) without running the code." />
            <SideRow level="L3" title="Self-Correction" desc="The AI writes a temporary test harness, executes the code in a sandbox, and reads stdout/stderr to verify functional logic." />
            <SideRow level="L4" title="Chaos Engineering" desc="Property-based fuzzing throws random garbage at inputs to ensure the function handles edge cases gracefully." isLast />
          </div>
        </div>

        <div className="p-8 md:p-12 bg-muted/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                System_Reliability
              </span>
              <p className="text-muted-foreground text-sm max-w-xl">
                &quot;The old way required human intervention for every error. The envelope automates rejection, ensuring
                you only see code that compiles, runs, and passes security checks.&quot;
              </p>
            </div>

            <div className="flex gap-8 border-l border-border pl-8">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-1">Human Review</div>
                <div className="text-xl text-muted-foreground line-through decoration-foreground">Required</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-emerald-600 mb-1">Auto-Pass Rate</div>
                <div className="text-xl text-foreground">99.4%</div>
              </div>
            </div>
          </div>
        </div>
      </FeatureShell>

      {/* 7) Long-Horizon Reasoning Topology */}
      <FeatureShell tone="deep">
        <div className="border-b border-border dark:border-neutral-900 p-8 md:p-12">
          <Kicker
            label="System_Capability_Final"
            dotClassName="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            dotShape="square"
          />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            Recursive Long-Horizon <br />
            <span className="text-muted-foreground">Reasoning Topology.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We challenge the premise that complex engineering requires &quot;smarter&quot; models. By decoupling{' '}
            <strong className="text-foreground">Fluid Intelligence</strong> from <strong className="text-foreground">State Retention</strong>, we enable
            continuous, recursive problem solving (<span className="font-mono">T &gt; 24h</span>) without context degradation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border dark:border-neutral-900">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border dark:border-neutral-900 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-10">
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 6.0: The Optimization Loop</span>
                <span className="text-[10px] bg-indigo-900/10 text-indigo-400 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                  Running
                </span>
              </div>

              <div className="relative w-full aspect-square max-h-72 border border-border bg-background dark:bg-[#080808] flex items-center justify-center mb-8 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <div className="w-full h-px bg-border/50" />
                  <div className="h-full w-px bg-border/50 absolute" />
                </div>

                <svg className="w-full h-full max-w-[200px] max-h-[200px]" viewBox="0 0 200 200" aria-hidden>
                  <defs>
                    <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <g className="animate-[spin_12s_linear_infinite] origin-center">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="100" cy="10" r="2" fill="#404040" />
                  </g>
                  <g className="animate-[spin_8s_linear_infinite_reverse] origin-center">
                    <ellipse cx="100" cy="100" rx="70" ry="70" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" />
                    <circle cx="100" cy="30" r="3" fill="#818cf8" filter="url(#glow)" />
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
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-background/80 dark:bg-[#080808] border border-border text-[9px] font-mono text-muted-foreground rounded-sm z-10">
                  GENERATE
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-background/80 dark:bg-[#080808] border border-border text-[9px] font-mono text-muted-foreground rounded-sm z-10">
                  PRUNE
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-background/80 dark:bg-[#080808] border border-border text-[9px] font-mono text-red-900/70 rounded-sm z-10">
                  FAIL
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-indigo-900/10 border border-indigo-500/30 text-[9px] font-mono text-indigo-300 rounded-sm z-10 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                  LEARN
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Self-Correction Architecture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If Agent 7 fails on step 50, the <strong className="text-foreground">Flash Protocol</strong> creates a
                constraint embedding (failure log). The system warns all other agents to avoid that specific path,
                effectively learning from the mistake instantly.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-background dark:bg-[#080808] md:border-b-0 relative">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-6 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                Fig 6.1: Divergent Initialization
              </span>
              <span className="text-[10px] font-mono bg-card text-indigo-400 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                Target: Long Tail (<span className="font-mono">P &lt; 0.05</span>)
              </span>
            </div>

            <div className="relative w-full h-56 border-b border-border dark:border-neutral-900 mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_14px]" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <g fill="#262626">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <rect key={i} x={50 + i * 10} y={130 - i * 8} width="5" height={30 + i * 8} />
                  ))}
                </g>
                <g fill="url(#barGrad)">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <rect key={i} x={200 + i * 10} y={140 + i * 2} width="5" height={20 - i * 2} opacity={0.5 + i * 0.07} />
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
              Technical invention does not happen in the most probable token space. The scout swarm is forced to explore
              the <strong className="text-foreground">Long Tail</strong>—obscure combinations that standard models ignore
              as low probability.
            </p>

            <div className="bg-background dark:bg-[#050505] border border-border p-4 rounded-sm relative overflow-hidden">
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
                Where <span className="text-foreground/80">L</span> (Reasoning Steps) → ∞ via Context Decoupling.
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 border-b border-border dark:border-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">
                The Engine
              </span>
              <h4 className="text-xl text-foreground font-light mb-2">Codebolt Horizon</h4>
              <p className="text-sm text-muted-foreground">
                The infrastructure that executes the process. It handles state virtualization, swarm recursion, and
                error-pruning.
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-500 block mb-4">The Fuel</span>
              <h4 className="text-xl text-foreground font-light mb-2">Gemini 3 (45% ARC)</h4>
              <p className="text-sm text-muted-foreground">
                The raw fluid intelligence. High reasoning density enables complex hypothesis generation within the
                Horizon framework.
              </p>
            </div>
          </div>
        </div>
      </FeatureShell>

      {/* 8) High-Fidelity Topologies & Scale Deployment */}
      <FeatureShell tone="deep">
        <div className="border-b border-border dark:border-neutral-900 p-8 md:p-12">
          <Kicker
            label="Restricted_Access_Tier"
            dotClassName="bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            dotShape="square"
          />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            High-Fidelity Topologies <br />
            <span className="text-muted-foreground">&amp; Scale Deployment.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Access to &quot;Dual-Frontier&quot; architectures and Massive-Scale Swarms (<span className="font-mono">N &gt; 1,000</span>)
            is strictly gated. Deployment requires regulatory pre-approval via the integrity framework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border dark:border-neutral-900">
          <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border dark:border-neutral-900 relative overflow-hidden bg-background dark:bg-[#080808]">
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background dark:bg-[#080808] px-2 text-[8px] font-mono text-purple-300">
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

          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-xl text-foreground font-medium mb-3">All-Frontier Topology</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              We replace cheap Scout models with full-reasoning Frontier models. Every branch of the search tree—even
              dead ends—is analyzed with maximum compute density.
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
                <span className="font-mono text-xs text-muted-foreground">Expensive</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border dark:border-neutral-900 divide-y md:divide-y-0 md:divide-x divide-border dark:divide-neutral-900">
          <TierCard
            tier="Enterprise_Tier_02"
            title="Swarm Level"
            agents="1k"
            desc="Designed for departmental R&D. Capable of refactoring mid-sized codebases (50k+ LOC) in a single session."
            progress="20%"
            accent="foreground"
          />
          <TierCard
            tier="Enterprise_Tier_01"
            title="Hive Level"
            agents="10k"
            desc="Industrial scale. Capable of generating entire OS kernels or verifying cryptographic primitives via brute-force reasoning."
            progress="100%"
            accent="purple"
            className="bg-background dark:bg-[#0a0a0a]"
          />
        </div>

        <div className="p-8 md:p-12 bg-muted/10 flex flex-col items-center text-center">
          <div className="mb-6 relative">
            <div className="w-12 h-12 border border-neutral-700 rounded-sm flex items-center justify-center bg-background dark:bg-[#050505]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth="2" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-900 rounded-full border border-background" />
          </div>

          <h3 className="text-foreground font-medium mb-2">Compliance Check Required</h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Usage of Tier 1 or Dense Frontier Plan requires a valid integrity license. This ensures alignment with
            safety protocols regarding recursive self-improvement algorithms.
          </p>

          <div className="w-full max-w-md bg-background dark:bg-[#050505] border border-border p-1 flex items-center rounded-sm">
            <div className="bg-card px-3 py-2 text-[10px] font-mono text-muted-foreground uppercase border-r border-border">
              License_Key
            </div>
            <input
              placeholder="BLXX-XXXX-YYYY-ZZZZ"
              disabled
              className="bg-transparent border-none outline-none text-xs font-mono text-muted-foreground px-4 w-full cursor-not-allowed"
              type="text"
            />
            <button className="px-4 py-2 bg-muted text-muted-foreground text-[10px] font-mono uppercase hover:bg-muted/70 hover:text-foreground transition-colors">
              Verify
            </button>
          </div>

          <div className="mt-4 flex gap-6">
            <span className="text-[9px] font-mono text-muted-foreground uppercase hover:text-foreground cursor-pointer transition-colors">
              Apply for Research License →
            </span>
            <span className="text-[9px] font-mono text-muted-foreground uppercase hover:text-foreground cursor-pointer transition-colors">
              Read Safety Protocol →
            </span>
          </div>
        </div>
      </FeatureShell>
    </div>
  )
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="p-8">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      <div className="text-3xl font-light text-foreground mb-1">{value}</div>
      <div className="font-mono text-[10px] text-muted-foreground/70">{sub}</div>
    </div>
  )
}

function TopoCard({ idx, tag, title, desc }: { idx: string; tag: string; title: string; desc: string }) {
  return (
    <div className="group relative">
      <div className="absolute -top-6 left-0 w-full h-px bg-border hidden md:block" />
      <div className="absolute -top-6 left-0 w-px h-6 bg-border hidden md:block" />
      <div className="border border-border p-6 h-full bg-card group-hover:border-neutral-600 transition-colors duration-500">
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[10px] text-muted-foreground/70">{idx}</span>
          <span className="font-mono text-[10px] text-muted-foreground bg-muted px-1">{tag}</span>
        </div>
        <h4 className="text-foreground font-medium mb-3">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function StepCard({
  idx,
  title,
  desc,
  className,
  idxClassName,
}: {
  idx: string
  title: string
  desc: string
  className?: string
  idxClassName?: string
}) {
  return (
    <div className={cn('p-8', className)}>
      <span className={cn('font-mono text-[10px] text-muted-foreground/70 block mb-2', idxClassName)}>{idx}</span>
      <h4 className="text-foreground text-sm font-medium mb-2">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

function LayerRow({
  level,
  title,
  meta,
  isLast,
}: {
  level: string
  title: string
  meta: string
  isLast?: boolean
}) {
  return (
    <div className={cn('p-4 flex justify-between items-center group hover:bg-muted/30 transition-colors', !isLast && 'border-b border-border')}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-emerald-600">{level}</span>
        <span className="text-sm text-foreground font-medium">{title}</span>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground">{meta}</div>
    </div>
  )
}

function SideRow({
  level,
  title,
  desc,
  isLast,
}: {
  level: string
  title: string
  desc: string
  isLast?: boolean
}) {
  return (
    <div className={cn('flex-1 p-6 md:p-8 border-b border-border hover:bg-muted/5 transition-colors', isLast && 'border-b-0')}>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="font-mono text-xs font-bold text-muted-foreground/70">{level}</span>
        <h3 className="text-foreground font-medium text-sm">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pl-6 border-l border-border">{desc}</p>
    </div>
  )
}

function TierCard({
  tier,
  title,
  agents,
  desc,
  progress,
  accent,
  className,
}: {
  tier: string
  title: string
  agents: string
  desc: string
  progress: string
  accent: 'foreground' | 'purple'
  className?: string
}) {
  const barClass = accent === 'purple' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-foreground'
  const numClass = accent === 'purple' ? 'text-purple-400' : 'text-foreground'

  return (
    <div className={cn('p-8 md:p-12 hover:bg-muted/10 transition-colors', className)}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="font-mono text-xs uppercase text-muted-foreground mb-1">{tier}</div>
          <h4 className="text-2xl text-foreground font-light">{title}</h4>
        </div>
        <div className="text-right">
          <span className={cn('block text-3xl font-light', numClass)}>{agents}</span>
          <span className="text-[10px] font-mono text-muted-foreground/70 uppercase">Concurrent Agents</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{desc}</p>
      <div className="w-full bg-neutral-800 h-1 mt-4" aria-hidden>
        <div className={cn('h-1', barClass)} style={{ width: progress }} />
      </div>
      <div className="mt-2 text-[9px] font-mono text-muted-foreground/70 text-right">Capacity: {progress}</div>
    </div>
  )
}

const SCOUT_DOTS = [
  { top: '30.217%', left: '31.8213%', opacity: 0.4 },
  { top: '40.0904%', left: '84.082%', opacity: 1 },
  { top: '65.0399%', left: '9.91988%', opacity: 1 },
  { top: '16.203%', left: '69.8549%', opacity: 1 },
  { top: '86.6595%', left: '61.7518%', opacity: 0.4 },
  { top: '38.1302%', left: '51.1945%', opacity: 1 },
  { top: '31.9476%', left: '68.1881%', opacity: 0.4 },
  { top: '78.7377%', left: '78.036%', opacity: 0.4 },
  { top: '42.5946%', left: '8.91884%', opacity: 1 },
  { top: '26.1483%', left: '65.2148%', opacity: 0.4 },
  { top: '79.4439%', left: '6.49603%', opacity: 1 },
  { top: '19.5457%', left: '94.3963%', opacity: 1 },
]

const SILENT_SWARM_LINES = [
  { x1: 40, y1: 40 },
  { x1: 100, y1: 40 },
  { x1: 160, y1: 40 },
  { x1: 40, y1: 100 },
  { x1: 160, y1: 100 },
  { x1: 40, y1: 160 },
  { x1: 100, y1: 160 },
  { x1: 160, y1: 160 },
]
