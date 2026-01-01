import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Enterprise | Codebolt',
  description:
    'Deploy autonomous engineering agents within your private cloud. Full data sovereignty, zero-retention logging, and dedicated compute clusters.',
}

function WarningTriangle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-red-500" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function TopologyIconLinear() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full text-muted-foreground" fill="none" stroke="currentColor">
      <line x1="0" y1="10" x2="100" y2="10" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="20" x2="100" y2="20" strokeWidth="0.5" opacity="0.5" />
      <line x1="0" y1="30" x2="100" y2="30" strokeWidth="0.5" opacity="0.5" />
      <rect x="20" y="8" width="4" height="4" fill="currentColor" />
      <rect x="50" y="18" width="4" height="4" fill="currentColor" />
      <rect x="80" y="28" width="4" height="4" fill="currentColor" />
    </svg>
  )
}

function TopologyIconMesh() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full text-muted-foreground" fill="none" stroke="currentColor">
      <path d="M 20 20 L 50 10 L 80 20 L 50 30 Z" strokeWidth="0.5" opacity="0.3" />
      <path d="M 20 20 L 50 30" strokeWidth="0.5" opacity="0.3" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="80" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="30" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="35" cy="15" r="1" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="65" cy="25" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  )
}

function TopologyIconCore() {
  return (
    <svg viewBox="0 0 100 40" className="w-full h-full text-foreground" fill="none" stroke="currentColor">
      <circle cx="50" cy="20" r="15" strokeWidth="0.5" opacity="0.2" />
      <circle cx="50" cy="20" r="10" strokeWidth="0.5" opacity="0.4" />
      <circle cx="50" cy="20" r="5" strokeWidth="0.5" opacity="0.8" />
      <circle cx="50" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <line x1="35" y1="20" x2="20" y2="20" strokeWidth="0.5" opacity="0.3" />
      <line x1="65" y1="20" x2="80" y2="20" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

function SequenceDecor() {
  return (
    <svg viewBox="0 0 300 24" className="w-full h-full text-muted-foreground" fill="none" stroke="currentColor">
      <line x1="0" y1="12" x2="300" y2="12" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <rect x="20" y="8" width="8" height="8" fill="hsl(var(--background))" strokeWidth="1" />
      <rect x="100" y="8" width="8" height="8" fill="hsl(var(--background))" strokeWidth="1" />
      <path d="M 180 12 L 185 7 L 190 12 L 185 17 Z" fill="hsl(var(--background))" strokeWidth="1" />
      <rect x="260" y="8" width="8" height="8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BarRow({
  label,
  sub,
  tone = 'muted',
  suffix,
}: {
  label: string
  sub: string
  tone?: 'muted' | 'bright'
  suffix: string
}) {
  const filled = tone === 'bright'

  return (
    <div className="grid grid-cols-12 py-6 border-b border-border items-center">
      <div className="col-span-6 pr-4">
        <span className={`text-lg font-medium tracking-tight block ${filled ? 'text-foreground' : 'text-muted-foreground'}`}>
          {label}
        </span>
        <span className="text-[11px] text-muted-foreground/70 font-mono mt-1 block">{sub}</span>
      </div>
      <div className="col-span-6">
        <div className="flex gap-1 h-3 items-center">
          {new Array(5).fill(0).map((_, idx) => (
            <div key={idx} className={`flex-1 h-full rounded-[1px] ${filled ? 'bg-foreground' : 'bg-border'}`} />
          ))}
          <span className={`ml-3 text-[10px] font-mono uppercase ${filled ? 'text-foreground' : 'text-muted-foreground/70'}`}>
            {suffix}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProcessBars() {
  const bars = [
    { h: 20, o: 0.2 },
    { h: 45, o: 0.45 },
    { h: 30, o: 0.3 },
    { h: 80, o: 0.8 },
    { h: 55, o: 0.55 },
    { h: 90, o: 0.9 },
    { h: 35, o: 0.35 },
    { h: 60, o: 0.6 },
    { h: 45, o: 0.45 },
    { h: 85, o: 0.85 },
    { h: 55, o: 0.55 },
    { h: 30, o: 0.3 },
    { h: 70, o: 0.7 },
    { h: 45, o: 0.45 },
    { h: 95, o: 0.95 },
    { h: 60, o: 0.6 },
    { h: 30, o: 0.3 },
    { h: 50, o: 0.5 },
    { h: 20, o: 0.2 },
    { h: 60, o: 0.6 },
  ]

  return (
    <div className="flex items-end gap-px h-8 w-full mt-2 pt-2 border-t border-border">
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex-1 bg-foreground hover:bg-muted-foreground transition-all duration-300"
          style={{ height: `${b.h}%`, opacity: b.o }}
        />
      ))}
    </div>
  )
}

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-muted selection:text-foreground">
      {/* Hero */}
      <div className="bg-background border-b border-border">
        <section className="relative bg-card text-foreground pt-32 pb-24 md:pt-48 md:pb-32">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
              Enterprise Architecture
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
              Scale Intelligence <br />
              <span className="text-muted-foreground">Securely.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              Deploy autonomous engineering agents within your private cloud. Full data sovereignty, zero-retention logging, and dedicated compute
              clusters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-cyan-400 transition-colors flex items-center gap-2 group"
              >
                Contact Sales <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Integrity Mandate */}
      <section className="w-full bg-card text-foreground py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Core_Philosophy: Protection
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground mb-8 leading-[1.1]">
                  Why the <br />
                  <span className="text-muted-foreground">Integrity Mandate?</span>
                </h2>

                <div className="space-y-6 text-sm text-muted-foreground leading-relaxed font-sans border-l border-border pl-6">
                  <p>
                    At Codebolt, <strong className="text-foreground">safety precedes scaling.</strong> We view high-fidelity reasoning models not as
                    public utilities, but as regulated assets with dual-use potential.
                  </p>
                  <p>
                    We cannot democratize &quot;superpowers&quot; without a rigid verification architecture. Public access is restricted by design; we
                    grant licenses solely to entities that pass our adversarial evaluation of intent and infrastructure.
                  </p>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 p-6 border border-border bg-muted/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="flex justify-between items-end">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">
                    Verification Status
                    <br />
                    <span className="text-foreground">STRICT_ENFORCEMENT</span>
                  </div>
                  <div className="w-8 h-8 border border-border rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border border-muted-foreground rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative h-full">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500/50 rounded-sm animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Live Protocol Monitor // v.3.0.2
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground/70">ENFORCEMENT: STRICT</span>
                </div>

                <div className="absolute left-[-1px] top-12 bottom-0 w-[1px] bg-border/50 overflow-hidden hidden lg:block">
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-red-500/80 to-transparent cb-enterprise-scan" />
                </div>

                <div className="space-y-4 lg:pl-8">
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-muted-foreground/70 group-hover:text-foreground transition-colors uppercase tracking-widest">
                        01 // Malware Proliferation
                      </span>
                      <div className="h-px flex-1 bg-border/60 group-hover:bg-border transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed pl-8 border-l border-transparent group-hover:border-border transition-all duration-500">
                      Zero-tolerance policy for polymorphic virus generation, zero-day payload construction, or unauthorized penetration testing
                      tools. AST scanned pre-compilation.
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-muted-foreground/70 group-hover:text-foreground transition-colors uppercase tracking-widest">
                        02 // Constructive Architecture
                      </span>
                      <div className="h-px flex-1 bg-border/60 group-hover:bg-border transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed pl-8 border-l border-transparent group-hover:border-border transition-all duration-500">
                      Usage restricted to stable, maintainable software systems. Generation of &quot;Dark Pattern&quot; algorithms or invasive
                      surveillance scripts is forbidden.
                    </p>
                  </div>

                  <div className="relative mt-8 group">
                    <div className="absolute inset-0 border border-red-900/50 bg-red-950/10 cb-enterprise-pulse-border -z-10" />
                    <div className="p-6 border border-red-500/20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">03 // CRITICAL</span>
                          <h3 className="text-lg font-medium text-foreground">Automated Circuit Breaker</h3>
                        </div>
                        <WarningTriangle />
                      </div>
                      <p className="text-xs text-red-200/80 font-mono leading-relaxed max-w-xl">
                        Detection of obfuscated code generation or adversarial payloads triggers an immediate Session Quarantine. The runtime
                        environment is frozen to prevent network propagation.
                      </p>
                      <div className="mt-4 pt-3 border-t border-red-900/30 flex justify-between items-center text-[9px] font-mono text-red-400/70 uppercase tracking-wider">
                        <span>Action: SESSION_HALT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security Posture */}
      <section className="w-full bg-card text-foreground font-sans py-24 lg:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 mb-6 border border-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System_State_2.1</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground leading-[1.05] mb-6">
                Compliance &amp; <br />
                Security Posture.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed tracking-tight">
                We define security through radical transparency. The following data represents the active constraints and verification layers of our
                infrastructure.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end font-mono text-xs text-muted-foreground/70">
              <div className="flex flex-col gap-2 text-right">
                <div className="flex justify-between w-48 border-b border-border pb-2">
                  <span>TARGET</span> <span className="text-foreground">Q1 2026</span>
                </div>
                <div className="flex justify-between w-48 border-b border-border pb-2">
                  <span>REGION</span> <span className="text-foreground">US-EAST</span>
                </div>
                <div className="flex justify-between w-48 pb-2">
                  <span>STATUS</span> <span className="text-emerald-500">LIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-border">
            <div className="lg:col-span-7 lg:border-r border-border pt-12 pr-0 lg:pr-12">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">01 — Active Controls</h3>

              <div className="flex flex-col">
                <div className="grid grid-cols-12 pb-4 border-b border-border text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                  <div className="col-span-6">Metric</div>
                  <div className="col-span-6">Visual State</div>
                </div>

                <BarRow label="SOC 2 Type II" sub="Pending Audit Cycle" suffix="Observation_Period_Active" />
                <BarRow label="Bridge Letter" sub="Active Assessment" tone="bright" suffix="ISSUED" />
                <BarRow label="AES-256-GCM" sub="Encryption Layer" tone="bright" suffix="ENFORCED" />
              </div>

              <div className="mt-8">
                <p className="text-xs text-muted-foreground font-mono leading-relaxed border-l-2 border-border pl-4 py-1">
                  <span className="text-foreground">Note:</span> We are currently in the SOC 2 Type II observation window. Enterprise partners may
                  request a Bridge Letter to validate interim control effectiveness.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 pt-12 pl-0 lg:pl-12">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">02 — Process Queue</h3>

              <div className="relative border-l border-border ml-2 pl-8 space-y-12">
                <div className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-muted rounded-sm" />
                  <div className="flex flex-col gap-1 opacity-50">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Completed</span>
                    <span className="text-base text-foreground/80 font-medium tracking-tight">Internal Pen-Test</span>
                    <div className="w-full h-1 bg-muted mt-2" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-foreground rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.35)]" />
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-mono text-foreground uppercase tracking-widest">Current Epoch</span>
                      <span className="text-[10px] font-mono text-muted-foreground/70">PID_882</span>
                    </div>
                    <span className="text-xl text-foreground font-medium tracking-tight">Bridge Assessment</span>
                    <ProcessBars />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 border border-border bg-transparent rounded-sm" />
                  <div className="flex flex-col gap-1 opacity-40">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Q1 2026</span>
                    <span className="text-base text-foreground/80 font-medium tracking-tight">SOC 2 Audit</span>
                    <div className="w-full h-px border-t border-dashed border-border mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compute Topology */}
      <section className="w-full bg-card text-foreground font-sans py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 pb-8 border-b border-border">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6">Compute Topology</h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-lg">
                Infrastructure allocation is segmented by topological complexity. Higher tiers provide greater reasoning depth but incur stricter
                safety oversight.
              </p>
            </div>
            <div className="text-right hidden lg:block">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Ref: BL-ARCH-99</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Protocol v4.2</div>
            </div>
          </div>

          <div className="border-t border-border">
            {/* Enterprise I */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-border hover:bg-muted/10 transition-colors">
              <div className="lg:col-span-3 lg:border-r border-border p-8 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-32 h-12">
                  <TopologyIconLinear />
                </div>
              </div>
              <div className="lg:col-span-6 p-8 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="text-xl font-medium text-foreground">Enterprise I</h3>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-1.5 py-0.5 rounded-sm">
                    Linear Scaling
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-lg">
                  Industrial hive topology. Designed for high-throughput brute-force reasoning tasks.
                </p>
              </div>
              <div className="lg:col-span-3 p-8 lg:border-l border-border flex flex-col justify-between items-end">
                <div className="text-right mb-6">
                  <div className="block text-xl font-light text-foreground mb-1">10k Agents</div>
                  <div className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Throughput</div>
                </div>
                <Link
                  className="text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-cyan-400 transition-all w-full lg:w-auto text-center"
                  href="/contact"
                >
                  Get License
                </Link>
              </div>
            </div>

            {/* Enterprise II */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-border hover:bg-muted/10 transition-colors">
              <div className="lg:col-span-3 lg:border-r border-border p-8 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-32 h-12">
                  <TopologyIconMesh />
                </div>
              </div>
              <div className="lg:col-span-6 p-8 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="text-xl font-medium text-foreground">Enterprise II</h3>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-1.5 py-0.5 rounded-sm">
                    Vector Swarm
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-lg">
                  Mesh topology. Agents share a distributed vector context window for collaborative solving.
                </p>
              </div>
              <div className="lg:col-span-3 p-8 lg:border-l border-border flex flex-col justify-between items-end">
                <div className="text-right mb-6">
                  <div className="block text-xl font-light text-foreground mb-1">1k Agents</div>
                  <div className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Throughput</div>
                </div>
                <Link
                  className="text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-cyan-400 transition-all w-full lg:w-auto text-center"
                  href="/contact"
                >
                  Get License
                </Link>
              </div>
            </div>

            {/* Dense Frontier */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 border-b border-border hover:bg-muted/10 transition-colors">
              <div className="lg:col-span-3 lg:border-r border-border p-8 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-32 h-12">
                  <TopologyIconCore />
                </div>
              </div>
              <div className="lg:col-span-6 p-8 flex flex-col justify-center">
                <div className="flex items-baseline gap-4 mb-2 flex-wrap">
                  <h3 className="text-xl font-medium text-foreground">Dense Frontier</h3>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border px-1.5 py-0.5 rounded-sm">
                    Recursive Frontier
                  </span>
                  <span className="text-[10px] font-mono text-foreground uppercase tracking-widest border border-foreground px-1.5 py-0.5 rounded-sm">
                    Restricted
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-lg">
                  O-Series reasoning pipeline. Unrestricted depth. Requires Council Ratification.
                </p>
              </div>
              <div className="lg:col-span-3 p-8 lg:border-l border-border flex flex-col justify-between items-end">
                <div className="text-right mb-6">
                  <div className="block text-xl font-light text-foreground mb-1">Dynamic</div>
                  <div className="block text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Throughput</div>
                </div>
                <Link
                  className="text-[10px] font-sans font-bold uppercase tracking-widest px-4 py-2 bg-primary text-primary-foreground hover:bg-cyan-400 transition-all w-full lg:w-auto text-center"
                  href="/contact"
                >
                  Get License
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-12 pt-12 border-t border-border">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-1 bg-foreground rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Council Mandate</span>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">01. Non-Proliferation</h4>
                <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">
                  Kinetic usage for surveillance weaponry is strictly prohibited.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">02. Beneficence</h4>
                <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">
                  License restricted to entities accelerating unharmful tech.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">03. Auto-Revocation</h4>
                <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">
                  Adversarial prompting results in immediate hardware ban.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sequence Protocol */}
      <section className="w-full bg-card text-foreground py-24 border-t border-border font-sans">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 pb-8 border-b border-border">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4 font-sans">Sequence Protocol</h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-md">
                Access to Enterprise tiers follows a strict, four-phase ratification process to ensure Integrity Council alignment.
              </p>
            </div>
            <div className="hidden lg:block w-64 h-6 opacity-60 mb-1">
              <SequenceDecor />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 border-l border-border">
            {[
              {
                n: '01',
                code: '[INIT_REQ]',
                title: 'Submission',
                desc: 'Submit infrastructure request. System freezes a provisional slot in the waitlist queue.',
                status: 'AWAITING_INPUT',
                active: false,
              },
              {
                n: '02',
                code: '[AUDIT_GATE]',
                title: 'Verification',
                desc: 'Adversarial review process. Safety Systems determine progression (Accept / Reject).',
                status: 'PENDING_REVIEW',
                active: false,
              },
              {
                n: '03',
                code: '[KEY_PROV]',
                title: 'Provisioning',
                desc: 'Encrypted instruction delivery for terminal-based API License Key generation.',
                status: 'LOCKED',
                active: false,
              },
              {
                n: '04',
                code: '[ACTIVE_STATE]',
                title: 'Activation',
                desc: 'Enterprise features and dedicated topology are activated upon verification.',
                status: 'LOCKED',
                active: true,
              },
            ].map((s) => (
              <div
                key={s.n}
                className="group relative p-8 border-r border-b lg:border-b-0 border-border hover:bg-muted/20 transition-colors"
              >
                <div className={`absolute top-0 left-0 w-full h-[1px] transition-colors ${s.active ? 'bg-foreground' : 'bg-border'}`} />

                <div className="flex justify-between items-baseline mb-12">
                  <span className={`text-3xl font-light font-sans transition-colors ${s.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.n}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground/70 uppercase tracking-widest">{s.code}</span>
                </div>

                <div className="space-y-3 mb-12">
                  <h3 className={`text-lg font-medium font-sans ${s.active ? 'text-foreground' : 'text-foreground/90'}`}>{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{s.desc}</p>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${s.active ? 'bg-foreground' : 'bg-muted-foreground'}`} />
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${s.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-16 border-t border-border pt-8">
            <div>
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Estimated Latency</span>
              <span className="text-xs font-mono text-foreground">T+48 HOURS</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Security Standard</span>
              <span className="text-xs font-mono text-foreground">TLS 1.3 // AUDITED</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

