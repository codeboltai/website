import Link from 'next/link'
import { Download } from 'lucide-react'

export default function FeaturesHero() {
  return (
    <section className="bg-background border-b border-border">
      <div className="relative bg-card pt-32 pb-24 md:pt-48 md:pb-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
            System Capabilities
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight mb-8 leading-[1.1]">
            The Recursive <br />
            <span className="text-muted-foreground">Runtime.</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            Explore the comprehensive suite of autonomous capabilities that allow Codebolt to engineer
            software with human-level fidelity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/newdownload"
              className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              Start Building
              <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

