'use client'

import Link from 'next/link'

function CTAOverlay() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-full text-muted"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cb-cta-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(var(--background))" stopOpacity="0" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d="M -100 200 Q 400 50 900 200" strokeWidth="0.5" opacity="0.2" />
      <path d="M -100 220 Q 400 90 900 220" strokeWidth="0.5" opacity="0.3" />
      <path d="M -100 240 Q 400 130 900 240" strokeWidth="0.5" opacity="0.4" />
      <path d="M -100 260 Q 400 170 900 260" strokeWidth="0.5" opacity="0.5" />
      <path d="M -100 180 Q 400 10 900 180" strokeWidth="0.5" opacity="0.2" />
      <line x1="400" y1="0" x2="400" y2="400" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      <line x1="200" y1="100" x2="200" y2="300" strokeWidth="0.5" opacity="0.1" />
      <line x1="600" y1="100" x2="600" y2="300" strokeWidth="0.5" opacity="0.1" />
      <circle cx="400" cy="150" r="2" fill="hsl(var(--foreground))" stroke="none" />
      <circle cx="400" cy="150" r="40" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
      <rect width="100%" height="100%" fill="url(#cb-cta-fade)" stroke="none" />
    </svg>
  )
}

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground border-t border-border dark:bg-[#050505] dark:border-neutral-900 dark:selection:bg-white dark:selection:text-black">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none select-none">
        <CTAOverlay />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-32 lg:py-48">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10 leading-[1.05] dark:text-white">
            Stop optimizing for latency. <br />
            <span className="text-muted-foreground dark:text-neutral-500">Optimize for solution space.</span>
          </h2>

          <p className="text-sm text-muted-foreground font-mono max-w-lg mb-12 leading-relaxed dark:text-neutral-400">
            Codebolt shifts the paradigm from speed to depth. Deploy the engine that reasons through high-dimensional ambiguity.
          </p>

          <div className="flex flex-col items-center w-full max-w-md">
            <Link
              href="/newdownload"
              className="group relative w-full h-14 bg-primary text-primary-foreground flex items-center justify-between px-6 hover:bg-cyan-400 transition-colors dark:bg-cyan-500 dark:text-black dark:hover:bg-cyan-400"
            >
              <span className="text-sm font-mono uppercase tracking-wider font-bold">Download</span>
              <div className="flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <path d="M 0 6 H 12 M 9 3 L 12 6 L 9 9" strokeWidth="1.5" />
                </svg>
              </div>
            </Link>

            <div className="w-full flex justify-between items-center px-4 py-3 bg-muted/30 border-x border-b border-border dark:bg-neutral-900/30 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full dark:bg-neutral-500" />
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider dark:text-neutral-500">Public Release</span>
              </div>
              <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider dark:text-neutral-600">Build: 8F4A-22</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

