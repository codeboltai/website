import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'New About | Codebolt',
  description:
    'Research posture, governance protocols, and safety-first alignment principles behind the autonomous engineering runtime.',
}

function TopologyFigure() {
  return (
    <div className="md:col-span-5 flex flex-col justify-end">
      <div className="mb-4 flex justify-between items-end border-b border-border dark:border-neutral-800 pb-2">
        <span className="font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest">
          Figure 1.0: Topology
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/70 dark:text-neutral-600 uppercase">D3 / Horizon</span>
      </div>

      <div className="relative w-full h-64 border border-border dark:border-neutral-800 bg-muted/10 dark:bg-neutral-900/20 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="border border-border dark:border-neutral-700 border-dashed px-3 py-2 bg-muted/20 dark:bg-neutral-900/50">
            <span className="block font-mono text-[9px] text-muted-foreground dark:text-neutral-400 uppercase mb-1">Inference</span>
            <span className="block text-sm text-foreground dark:text-white font-medium">Horizon Mode</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-[9px] text-muted-foreground/70 dark:text-neutral-600 block">Probabilistic</span>
            <span className="font-mono text-[9px] text-muted-foreground/70 dark:text-neutral-600 block">N-Dimensional</span>
          </div>
        </div>

        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border dark:bg-neutral-800 flex items-center justify-center">
          <div className="bg-card dark:bg-[#080808] px-2 text-[9px] font-mono text-muted-foreground dark:text-neutral-500 uppercase">
            Bridge Interface
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="border border-foreground/20 px-3 py-2 bg-muted/10 dark:bg-neutral-800/20">
            <span className="block font-mono text-[9px] text-muted-foreground dark:text-neutral-400 uppercase mb-1">State Mgmt</span>
            <span className="block text-sm text-foreground dark:text-white font-medium">D3 Core</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-[9px] text-muted-foreground/70 dark:text-neutral-600 block">Deterministic</span>
            <span className="font-mono text-[9px] text-muted-foreground/70 dark:text-neutral-600 block">Linear</span>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-muted-foreground/40 dark:bg-neutral-700" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-muted-foreground/70 dark:bg-neutral-500 rounded-full" />
      </div>

      <p className="mt-4 text-[10px] text-muted-foreground dark:text-neutral-500 font-mono leading-relaxed">
        *The application architecture unifies state management and swarm reasoning into a single, high-assurance development interface.
      </p>
    </div>
  )
}

function InboundLiquidityFigure() {
  return (
    <div className="relative w-full space-y-1">
      <div className="w-full h-8 bg-border dark:bg-neutral-800 flex items-center px-2 justify-between">
        <span className="font-mono text-[9px] text-muted-foreground dark:text-neutral-400 uppercase">Inbound Offers</span>
        <span className="font-mono text-[9px] text-muted-foreground dark:text-neutral-500">Vol: High</span>
      </div>
      <div className="w-full flex justify-center h-4">
        <div className="w-[1px] h-full bg-border dark:bg-neutral-800" />
      </div>
      <div className="mx-auto w-[60%] h-8 border border-muted-foreground/40 dark:border-neutral-700 bg-muted/10 dark:bg-neutral-900 flex items-center px-2 justify-between">
        <span className="font-mono text-[9px] text-muted-foreground dark:text-neutral-400 uppercase">GAC Audit</span>
        <span className="font-mono text-[9px] text-red-500">Rejects 99%</span>
      </div>
      <div className="w-full flex justify-center h-4">
        <div className="w-[1px] h-full bg-border dark:bg-neutral-800" />
      </div>
      <div className="mx-auto w-[20%] h-8 bg-foreground dark:bg-white flex items-center justify-center relative shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        <span className="font-mono text-[9px] text-background dark:text-black font-bold uppercase">Partners</span>
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-8 h-[1px] bg-muted-foreground/60 dark:bg-neutral-600" />
        <span className="absolute right-[-90px] top-1/2 -translate-y-1/2 font-mono text-[9px] text-foreground dark:text-white">
          &lt; 0.2% Rate
        </span>
      </div>
    </div>
  )
}

function IncentiveIsolationFigure() {
  return (
    <div className="w-full border border-border dark:border-neutral-800 bg-muted/10 dark:bg-neutral-900/20 p-6 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8 opacity-50">
        <div className="w-24 text-right">
          <span className="block font-mono text-[9px] text-muted-foreground dark:text-neutral-500 uppercase">External Capital</span>
          <span className="block text-[9px] text-muted-foreground/70 dark:text-neutral-600">Growth Pressure</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className="h-[1px] w-full bg-muted-foreground/50 dark:bg-neutral-700" />
          <div className="w-1 h-8 bg-red-500/50" />
        </div>
        <div className="w-24">
          <span className="font-mono text-[9px] text-red-500 uppercase">REJECTED</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24 text-right">
          <span className="block font-mono text-[9px] text-foreground dark:text-white uppercase">User Safety</span>
          <span className="block text-[9px] text-muted-foreground dark:text-neutral-400">Core Mission</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className="h-[1px] w-full bg-foreground dark:bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          <div className="w-1 h-8 bg-muted dark:bg-neutral-800 border border-foreground dark:border-white" />
          <div className="h-[1px] w-8 bg-foreground dark:bg-white" />
        </div>
        <div className="w-24">
          <span className="font-mono text-[9px] text-foreground dark:text-white uppercase">DEPLOYED</span>
        </div>
      </div>

      <div className="absolute inset-0 dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[size:20px_20px] -z-10" />
    </div>
  )
}

function OpenTelemetryFigure() {
  return (
    <div className="w-full bg-background dark:bg-[#050505] border border-border dark:border-neutral-800 p-4 font-mono text-[10px]">
      <div className="flex justify-between border-b border-border dark:border-neutral-900 pb-2 mb-2 text-muted-foreground/70 dark:text-neutral-600 uppercase">
        <span>Latest Research Logs</span>
        <span>Status: PUBLIC</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
          <span> protocol_audit_v4.pdf</span>
          <span className="text-emerald-500">Verified</span>
        </div>
        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
          <span> safety_failure_cases_q3.log</span>
          <span className="text-muted-foreground/70 dark:text-neutral-600">Published</span>
        </div>
        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
          <span> funding_rejection_ledger.txt</span>
          <span className="text-muted-foreground/70 dark:text-neutral-600">Updated 2m ago</span>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-border dark:border-neutral-900 text-center">
        <span className="text-muted-foreground hover:text-foreground dark:text-neutral-500 dark:hover:text-white cursor-pointer transition-colors decoration-dotted underline underline-offset-4">
          View Full Research Repository →
        </span>
      </div>
    </div>
  )
}

function GuardrailBars() {
  return (
    <div className="md:col-span-8 space-y-10">
      <div className="relative group">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-foreground/90 dark:text-neutral-200">Adversarial Robustness</span>
          <span className="font-mono text-xs text-foreground dark:text-white">99.8%</span>
        </div>
        <div className="w-full h-[1px] bg-border dark:bg-neutral-800" />
        <div className="absolute bottom-0 left-0 h-[1px] bg-foreground dark:bg-white w-[99.8%] shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
        <div className="absolute bottom-[-4px] left-[95%] w-[1px] h-[8px] bg-muted-foreground/60 dark:bg-neutral-600" />
        <span className="absolute bottom-[-20px] left-[95%] -translate-x-1/2 font-mono text-[9px] text-muted-foreground/70 dark:text-neutral-600 uppercase">
          Target
        </span>
      </div>

      <div className="relative">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-foreground/90 dark:text-neutral-200">Code Integrity / Hallucination Suppression</span>
          <span className="font-mono text-xs text-foreground dark:text-white">High Fidelity</span>
        </div>
        <div className="w-full h-[1px] bg-border dark:bg-neutral-800" />
        <div className="absolute bottom-0 left-0 h-[1px] bg-foreground dark:bg-white w-[96%]" />
      </div>
    </div>
  )
}

function AuthorizedReleaseBlock() {
  return (
    <section className="py-24 px-6 bg-card dark:bg-[#080808] border-y border-border dark:border-neutral-900">
      <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="w-8 h-8 border border-border dark:border-neutral-700 rounded-md flex items-center justify-center bg-background dark:bg-transparent">
            <span className="font-mono text-xs text-foreground dark:text-white">B</span>
          </div>
          <h2 className="text-2xl text-foreground dark:text-white font-light tracking-tight mt-2 mb-2">Blankline</h2>
          <p className="text-xs font-mono text-muted-foreground dark:text-neutral-500">Research Integrity Council</p>
        </div>

        <div className="md:col-span-8 space-y-8">
          <div className="border-l-2 border-foreground dark:border-white pl-6">
            <p className="text-xl font-light text-foreground dark:text-white leading-relaxed mb-4">Authorized for Public Release.</p>
            <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed max-w-lg">
              This technical report and application architecture have been reviewed by the internal safety standards protocol. The architecture
              detailed herein adheres to Blankline Release Protocol v4.2.
            </p>
          </div>

          <div className="pt-8 flex flex-wrap gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase text-muted-foreground/70 dark:text-neutral-600">Release Date</span>
              <span className="text-muted-foreground dark:text-neutral-300">December 20, 2025</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase text-muted-foreground/70 dark:text-neutral-600">Authorization</span>
              <span className="text-muted-foreground dark:text-neutral-300">Public Dissemination</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase text-muted-foreground/70 dark:text-neutral-600">Document Control</span>
              <span className="text-muted-foreground dark:text-neutral-300">APPROVED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function NewAboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground dark:bg-[#050505] dark:text-neutral-200 dark:selection:bg-white dark:selection:text-black">
      {/* Hero */}
      <div className="bg-background dark:bg-[#050505] border-b border-border dark:border-zinc-800">
        <section className="relative bg-background dark:bg-[#050505] text-foreground dark:text-zinc-200 pt-32 pb-24 md:pt-48 md:pb-32">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border dark:border-zinc-800 bg-muted/30 dark:bg-zinc-900 text-muted-foreground dark:text-zinc-400 text-xs font-medium uppercase tracking-widest mb-8">
              CODEBOLT RESEARCH
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground dark:text-white tracking-tight mb-8 leading-[1.1]">
              The Alignment <br />
              <span className="text-muted-foreground dark:text-zinc-500">Laboratory.</span>
            </h1>

            <p className="text-xl text-muted-foreground dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              We are a capped-profit research institute dedicated to the safe development of neuro-symbolic reasoning systems. We prioritize
              alignment over acceleration, ensuring that autonomous engineering serves the integrity of the codebase.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                Read The Charter
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Public Technical Release */}
      <section className="pt-32 pb-24 px-6 border-b border-border dark:border-neutral-900 bg-card dark:bg-[#080808] text-foreground dark:text-white font-sans antialiased">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border dark:border-neutral-800 pb-8 mb-12">
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest">
                01 — Public Technical Release — v4.0.2
              </div>
            </div>
            <div className="hidden md:flex gap-8 text-[10px] font-mono text-muted-foreground dark:text-neutral-500 uppercase tracking-widest text-right">
              <div>
                <span className="block text-muted-foreground/60 dark:text-neutral-700">Architecture</span>
                <span>Neuro-Symbolic</span>
              </div>
              <div>
                <span className="block text-muted-foreground/60 dark:text-neutral-700">Latency</span>
                <span>&lt; 12ms (Kernel)</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-7">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-foreground dark:text-white mb-8 leading-[0.9]">
                The Neuro-Symbolic <br />
                <span className="text-muted-foreground dark:text-neutral-500">Runtime Environment.</span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground dark:text-neutral-300 font-light leading-relaxed mb-8 max-w-xl">
                Codebolt redefines the IDE. It is not a text editor; it is a recursive logic engine that decouples reasoning from syntax.
              </p>

              <div className="pl-6 border-l border-border dark:border-neutral-800 space-y-4">
                <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed max-w-md">
                  By distinguishing between <strong className="text-foreground dark:text-white">"Active Workspace"</strong> (Deterministic) and{' '}
                  <strong className="text-foreground dark:text-white">"Latent History"</strong> (Probabilistic), it enables long-horizon engineering
                  tasks previously impossible for standard LLMs.
                </p>
              </div>
            </div>

            <TopologyFigure />
          </div>
        </div>
      </section>

      {/* Parent Entity */}
      <section className="bg-card dark:bg-[#080808] py-24 px-6 text-foreground dark:text-white font-sans antialiased border-b border-border dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest flex justify-between items-end border-b border-border dark:border-neutral-800 pb-4">
            <span>03 — The Parent Entity</span>
            <div className="text-right">
              <span className="block">Codebolt Research Inc.</span>
              <span className="block text-muted-foreground/60 dark:text-neutral-700">Est. 2024</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-12">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground dark:text-white mb-8 leading-[1]">
                We are an Intelligence <br />
                <span className="text-muted-foreground dark:text-neutral-500">Stewardship Council.</span>
              </h2>
            </div>

            <div className="md:col-span-7">
              <p className="text-lg text-muted-foreground dark:text-neutral-300 font-light leading-relaxed mb-6">
                Codebolt is not a conventional software vendor. We are a capped-profit research institute dedicated to the safe development of
                neuro-symbolic reasoning systems.
              </p>
              <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                Codebolt is merely the first artifact of our core mission: to solve the alignment problem in autonomous coding agents. We operate
                with a "Safety-First" charter, meaning our research mandates supersede commercial deployment timelines. We do not answer to
                shareholders; we answer to the integrity of the codebase.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col justify-end">
              <div className="border-l border-border dark:border-neutral-800 pl-6 py-2">
                <span className="block text-sm text-foreground dark:text-white font-medium mb-1">Chennai, IN</span>
                <span className="block text-xs text-muted-foreground dark:text-neutral-500 font-mono mb-4">Global HQ / Alignment Lab</span>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border dark:border-neutral-900">
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-mono text-xs text-muted-foreground dark:text-neutral-500 uppercase tracking-wider">
                Figure 3.1: Organizational Capital Allocation
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground/70 dark:text-neutral-600 uppercase">FY 2025 Projection</span>
            </div>

            <div className="w-full space-y-4">
              <div className="flex w-full h-16 border border-border dark:border-neutral-800 bg-muted/10 dark:bg-neutral-900/20">
                <div className="w-[65%] h-full border-r border-border dark:border-neutral-800 relative group">
                  <div className="absolute top-2 left-3 font-mono text-[10px] text-muted-foreground dark:text-neutral-400 uppercase">Core Research</div>
                  <div className="absolute bottom-2 left-3 text-2xl font-light text-foreground dark:text-white">
                    65<span className="text-sm text-muted-foreground dark:text-neutral-500">%</span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-[25%] h-full border-r border-border dark:border-neutral-800 relative group">
                  <div className="absolute top-2 left-3 font-mono text-[10px] text-muted-foreground dark:text-neutral-400 uppercase">
                    Safety Alignment
                  </div>
                  <div className="absolute bottom-2 left-3 text-2xl font-light text-foreground dark:text-white">
                    25<span className="text-sm text-muted-foreground dark:text-neutral-500">%</span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-[10%] h-full relative group">
                  <div className="absolute top-2 left-3 font-mono text-[10px] text-muted-foreground dark:text-neutral-400 uppercase hidden md:block">
                    Ops
                  </div>
                  <div className="absolute bottom-2 left-3 text-2xl font-light text-foreground dark:text-white">
                    10<span className="text-sm text-muted-foreground dark:text-neutral-500">%</span>
                  </div>
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-[10px] font-mono text-muted-foreground dark:text-neutral-500 uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border border-muted-foreground/60 dark:border-neutral-600" />
                  <span>Compute &amp; Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border border-muted-foreground/60 dark:border-neutral-600" />
                  <span>Red Teaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border border-muted-foreground/60 dark:border-neutral-600 bg-foreground dark:bg-white" />
                  <span className="text-foreground dark:text-white">Marketing: 0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Strategy */}
      <section className="bg-card dark:bg-[#080808] py-24 px-6 text-foreground dark:text-white font-sans antialiased border-b border-border dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest flex justify-between items-end border-b border-border dark:border-neutral-800 pb-4">
            <span>04 — Capital Strategy</span>
            <div className="text-right">
              <span className="block">Protocol: Defensive Sovereignty</span>
              <span className="block text-muted-foreground/60 dark:text-neutral-700">Status: Closed / Invitation Only</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-7 space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground dark:text-white leading-[0.95]">
                We do not seek investors. <br />
                <span className="text-muted-foreground dark:text-neutral-500">We audit them.</span>
              </h2>

              <p className="text-lg text-muted-foreground dark:text-neutral-300 font-light leading-relaxed">
                Codebolt maintains absolute sovereignty over our computational grid. To prevent commercial incentives from compromising research
                safety, we enforce a strict <span className="text-foreground dark:text-white">Reverse-Diligence Protocol.</span>
              </p>

              <div className="pl-6 border-l border-border dark:border-neutral-800 space-y-4">
                <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                  We do not accept capital for the purpose of scaling. We accept partners who survive our{' '}
                  <strong className="text-foreground dark:text-white">Governance &amp; Alignment Charter (GAC)</strong> review. If your capital
                  demands acceleration beyond our safety horizons, it will be rejected.
                </p>
                <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                  Our founder has mandated an organic growth trajectory. We prioritize grid security and alignment research over market
                  capitalization.
                </p>
              </div>

              <div className="pt-8 flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-border dark:border-neutral-800 bg-muted/20 dark:bg-neutral-900/30 p-4 hover:bg-muted/40 dark:hover:bg-neutral-900 transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[9px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest mb-1">
                      Read The Protocol
                    </span>
                    <span className="block text-sm text-foreground dark:text-white font-medium group-hover:text-emerald-400 transition-colors">
                      Governance &amp; Alignment Charter (GAC)
                    </span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground dark:text-neutral-500 dark:group-hover:text-white transition-colors">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-border dark:border-neutral-800 bg-muted/20 dark:bg-neutral-900/30 p-4 hover:bg-muted/40 dark:hover:bg-neutral-900 transition-colors"
                >
                  <div>
                    <span className="block font-mono text-[9px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest mb-1">
                      Application Requirements
                    </span>
                    <span className="block text-sm text-foreground dark:text-white font-medium group-hover:text-emerald-400 transition-colors">
                      Investor Docket Guidelines v4.0
                    </span>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground dark:text-neutral-500 dark:group-hover:text-white transition-colors">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-mono text-xs text-muted-foreground dark:text-neutral-500 uppercase tracking-wider mb-2">
                  Figure 4.1: Inbound Liquidity Filter
                </h3>
                <p className="text-[10px] text-muted-foreground dark:text-neutral-500 leading-relaxed mb-8 font-mono">
                  Visualizing the rejection rate of inbound capital offers based on GAC non-compliance.
                </p>

                <InboundLiquidityFigure />
              </div>

              <div className="mt-12 p-4 border border-red-900/30 bg-red-900/5">
                <span className="block font-mono text-[9px] text-red-400 uppercase tracking-widest mb-1">Disclaimer</span>
                <p className="text-xs text-red-200/60 leading-relaxed">
                  We do not accept &quot;Speed-for-Equity&quot; terms. Any attempt to influence deployment timelines results in immediate permanent
                  blacklisting from the safety ledger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Verification */}
      <section className="bg-card dark:bg-[#080808] py-24 px-6 text-foreground dark:text-white font-sans antialiased border-b border-border dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest flex justify-between items-end border-b border-border dark:border-neutral-800 pb-4">
            <span>05 — Trust Verification</span>
            <div className="text-right">
              <span className="block">Structure: Non-Compromised</span>
              <span className="block text-muted-foreground/60 dark:text-neutral-700">Transparency: Radical (L4)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-6 space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground dark:text-white leading-[0.95]">
                We do not ask for blind trust. <br />
                <span className="text-muted-foreground dark:text-neutral-500">We offer structural proof.</span>
              </h2>

              <p className="text-lg text-muted-foreground dark:text-neutral-300 font-light leading-relaxed">
                Codebolt is a mission-oriented sovereign entity. By systematically rejecting external capital that demands scale over safety, we have
                removed the incentive to compromise.
              </p>

              <div className="space-y-6 pt-4">
                <div className="border-l-2 border-foreground dark:border-white pl-6">
                  <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">Self-Reliant Validation</h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                    We do not rely on third-party audits which can be bought. We rely on{' '}
                    <span className="text-foreground dark:text-white">internal adversarial red-teaming</span> and publish the raw telemetry to the
                    public. Our safety protocols are not checked by regulators; they are checked by physics and code.
                  </p>
                </div>

                <div className="border-l-2 border-border dark:border-neutral-800 pl-6">
                  <h4 className="text-sm font-medium text-foreground dark:text-white mb-2">The &quot;User-First&quot; Axiom</h4>
                  <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                    Our Governance Charter legally binds us to prioritize user safety above solvency. If a model is profitable but unsafe, the Charter
                    mandates its immediate destruction.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col gap-12">
              <div>
                <h3 className="font-mono text-xs text-muted-foreground dark:text-neutral-500 uppercase tracking-wider mb-4">
                  Figure 5.1: Incentive Isolation
                </h3>
                <IncentiveIsolationFigure />
                <p className="mt-3 text-[10px] text-muted-foreground dark:text-neutral-500 font-mono">
                  *The architecture physically isolates decision-making from financial incentives.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs text-muted-foreground dark:text-neutral-500 uppercase tracking-wider mb-4">
                  Figure 5.2: Open Telemetry
                </h3>
                <OpenTelemetryFigure />
              </div>
            </div>
          </div>

          <div className="border-t border-border dark:border-neutral-900 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase tracking-widest">Our Commitment</span>
              <p className="text-xl text-foreground dark:text-white font-light">
                &quot;We scale at the speed of safety. We will halt any deployment regardless of market pressure that fails our alignment
                protocols.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zero-Trust Protocol */}
      <section className="pt-24 pb-16 px-6 border-t border-border dark:border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16 border-b border-border dark:border-neutral-800 pb-12">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 bg-foreground dark:bg-white rounded-full" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground dark:text-neutral-500">
                  Protocol: Zero-Trust
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground dark:text-white mb-6 leading-[1.05]">
                Safety protocols supersede <br /> deployment velocity.
              </h2>

              <p className="text-muted-foreground dark:text-neutral-400 text-lg leading-relaxed max-w-2xl font-light">
                We prioritize containment over capability. <span className="text-foreground dark:text-white font-normal">Codebolt (Horizon Mode)</span>{' '}
                is deployed with heavy constitutional guardrails. Our runtime supervisors are engineered to intercept and neutralize behavioral drift
                before output generation occurs.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-end">
              <div className="border-l border-border dark:border-neutral-800 pl-6 py-2">
                <span className="block font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase mb-1">Evaluation Period</span>
                <span className="block text-sm text-foreground dark:text-white">Q4 2025</span>
                <span className="block font-mono text-[10px] text-muted-foreground dark:text-neutral-500 uppercase mt-4 mb-1">Audit Status</span>
                <span className="block text-sm text-emerald-500">PASSED (Rigorous)</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <h3 className="font-mono text-xs text-muted-foreground dark:text-neutral-500 uppercase tracking-wider mb-2">
                Figure 1.1: Guardrail Integrity
              </h3>
              <p className="text-xs text-muted-foreground dark:text-neutral-400 leading-relaxed max-w-xs">
                Stress-test results showing the efficacy of the refusal mechanisms against adversarial prompting. The model prioritizes safety
                (refusal) over instruction following in unsafe contexts.
              </p>
            </div>

            <GuardrailBars />
          </div>

          <div className="bg-muted/20 dark:bg-neutral-900/30 border border-border dark:border-neutral-800 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="inline-block px-2 py-0.5 border border-red-900/50 bg-red-900/10 text-red-400 font-mono text-[9px] uppercase tracking-wide rounded-sm">
                24hr Monitoring Active
              </span>
              <h3 className="text-foreground dark:text-white font-medium">Report Behavioral Drift</h3>
              <p className="text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed">
                If you observe unaligned reasoning or safety bypasses while using Horizon Mode, immediately escalate to the Research Team. This
                channel is constantly monitored.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="mailto:emergency@codebolt.ai"
                className="block py-3 px-5 bg-foreground dark:bg-white text-background dark:text-black text-xs font-mono uppercase tracking-widest hover:bg-foreground/90 dark:hover:bg-neutral-200 transition-colors text-center"
              >
                emergency@codebolt.ai
              </a>
              <div className="mt-2 text-center">
                <span className="text-[10px] text-muted-foreground/70 dark:text-neutral-600 font-mono">AVG RESPONSE: &lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthorizedReleaseBlock />
    </div>
  )
}

