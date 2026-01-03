import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function EnterpriseHeroSection() {
  return (
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
  )
}

