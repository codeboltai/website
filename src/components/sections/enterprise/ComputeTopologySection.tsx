import Link from 'next/link'
import { TopologyIconCore, TopologyIconLinear, TopologyIconMesh } from '@/components/sections/enterprise/EnterpriseShared'

export default function ComputeTopologySection() {
  return (
    <section className="w-full bg-card text-foreground font-sans py-24 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 pb-8 border-b border-border">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6">Compute Topology</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-lg">
              Infrastructure allocation is segmented by topological complexity. Higher tiers provide greater reasoning depth but incur stricter safety
              oversight.
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
              <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">Kinetic usage for surveillance weaponry is strictly prohibited.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">02. Beneficence</h4>
              <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">License restricted to entities accelerating unharmful tech.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">03. Auto-Revocation</h4>
              <p className="text-[10px] text-muted-foreground/80 font-mono leading-relaxed">Adversarial prompting results in immediate hardware ban.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

