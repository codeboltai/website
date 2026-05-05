'use client'

import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'
import { HeroSection, MetricStrip } from '@/templatesections'

export default function Hero() {
  return (
    <>
      <HeroSection
        layout="two-column"
        showStatus
        statusText="Agentic Development Platform"
        title={"Deploy AI Swarms.\nBuild 24/7."}
        description="The world's first IDE for multi-agent development. Orchestrate hundreds of AI agents working in parallel—while you sleep, while you strategize, while you scale."
        primaryCTA={
          <Link
            href="/download"
            className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            Download Codebolt
            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
          </Link>
        }
        secondaryCTA={
          <Link
            href="/features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 group"
          >
            Explore Features
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        }
        bottomContent={
          <MetricStrip
            variant="strip"
            animate
            animationDelay={0.4}
            metrics={[
              { label: 'Parallel Agents', value: '100+' },
              { label: 'Operation Mode', value: '24/7' },
              { label: 'Coordination', value: 'Stigmergy' },
              { label: 'Visibility', value: 'Full' },
            ]}
          />
        }
      />
    </>
  )
}
