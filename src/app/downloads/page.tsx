import { redirect } from 'next/navigation'

export default function DownloadsPage() {
  redirect('/newdownload')
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Copy, Download } from 'lucide-react'

type DetectedSystem = 'macos' | 'windows' | 'unknown'

type ReleaseBuild = {
  label: string
  target: string
  arch: string
  buildId: string
  version: string
  size: string
  sha256: string
}

const BUILDS: Record<'macos' | 'windows', ReleaseBuild> = {
  macos: {
    label: 'macOS',
    target: 'DARWIN_ARM64',
    arch: 'Apple Silicon',
    buildId: '24C105',
    version: 'v3.0.2',
    size: '350 MB',
    sha256: '1e49be1104863695553b8761fe0a98a3456cf8b64fa90a5258115239e9e34974',
  },
  windows: {
    label: 'Windows',
    target: 'WIN32_NT_X64',
    arch: 'x64',
    buildId: '24C105',
    version: 'v3.0.2',
    size: '265 MB',
    sha256: 'ddd45437283ed0bb30b8d893fe555f67034e6363fb34bebb2591dab35f54ea39',
  },
}

const LEGACY_BUILDS = ['v2.0.4', 'v2.0.3', 'v2.0.21', 'v2.0.2', 'v2.0.11', 'v2.0.1', 'v1.0.1']

export default function DownloadsPage() {
  const [system, setSystem] = useState<DetectedSystem>('unknown')

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.includes('win')) setSystem('windows')
    else if (ua.includes('mac')) setSystem('macos')
    else setSystem('unknown')
  }, [])

  const activeBuild = useMemo(() => {
    if (system === 'windows') return BUILDS.windows
    return BUILDS.macos
  }, [system])

  const detectedLabel = useMemo(() => {
    if (system === 'windows') return 'Detected System: Windows'
    if (system === 'macos') return 'Detected System: macOS'
    return 'Detected System: Unknown'
  }, [system])

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // no-op
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1400px] mx-auto border-x border-border grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24">
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border p-8 flex flex-col justify-between relative bg-card/20">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative">
            <div className="mb-16">
              <h1 className="text-xl font-medium tracking-tight text-foreground mb-2">Installation</h1>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                Select the appropriate binary for your system architecture.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-3">
                  Active Release
                </div>
                <div className="text-3xl font-mono text-foreground tracking-tighter mb-2">v3.0.2</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-primary text-primary-foreground px-2 py-0.5 uppercase tracking-wider font-bold">
                    Beta
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 pt-8 border-t border-border">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-4">Latest Patch</div>
            <ul className="space-y-3 text-xs text-muted-foreground font-mono">
              <li className="flex gap-3">
                <span className="text-muted-foreground/70">24C105</span>
                <span>Fixed learning memory module</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground/70">24C104</span>
                <span>Enhanced context retention</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground/70">24C103</span>
                <span>Improved inference stability</span>
              </li>
              <li className="flex gap-3">
                <span className="text-muted-foreground/70">24C102</span>
                <span>Core engine optimization</span>
              </li>
            </ul>
            <Link
              href="/changelog"
              className="inline-block mt-6 text-[10px] font-mono text-primary border-b border-primary/50 pb-0.5 hover:border-primary transition-colors"
            >
              VIEW_FULL_LOG →
            </Link>
          </div>
        </aside>

        <main className="lg:col-span-9 bg-background">
          <div className="p-8 lg:p-16 border-b border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
              <div className="relative w-16 h-16 opacity-10 rotate-90 text-foreground">
                <div className="absolute inset-0 border border-current" />
                <div className="absolute inset-2 border border-current opacity-60" />
                <div className="absolute inset-4 border border-current opacity-40" />
                <div className="absolute inset-6 bg-current opacity-20" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-current" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-current" />
              </div>
            </div>

            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-[9px] font-sans uppercase tracking-widest mb-8 font-bold">
                {detectedLabel}
              </div>

              <h2 className="text-5xl md:text-7xl font-medium text-foreground tracking-tight mb-8">
                {system === 'windows' ? 'Windows' : system === 'macos' ? 'macOS' : 'Downloads'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-end">
                <div className="md:col-span-3 space-y-4 font-mono text-xs text-muted-foreground border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Architecture</span>
                    <span className="text-foreground">{activeBuild.arch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Build ID</span>
                    <span className="text-foreground">{activeBuild.buildId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Size</span>
                    <span className="text-foreground">{activeBuild.size}</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    className="w-full bg-primary text-primary-foreground h-12 transition-all duration-300 flex items-center justify-center gap-3 px-6 font-sans text-[11px] uppercase font-bold hover:brightness-110 group/btn shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5px]" />
                    <span>Download</span>
                  </button>
                  <p className="text-[10px] text-muted-foreground/70 mt-3 text-center leading-relaxed">
                    Includes CLI, local inference engine, and vector runtime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="manifest" className="p-8 lg:p-16">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">Release Manifest</h3>
              <div className="hidden md:block">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm" />
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm animate-pulse" />
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm" />
                  <div className="w-1 h-1 bg-muted-foreground/40 rounded-sm" />
                </div>
              </div>
            </div>

            <div className="border-t border-border">
              <div className="grid grid-cols-12 gap-4 py-4 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">
                <div className="col-span-4 md:col-span-3">Target</div>
                <div className="col-span-4 md:col-span-2">Build</div>
                <div className="hidden md:block md:col-span-5">Integrity (SHA-256)</div>
                <div className="col-span-4 md:col-span-2 text-right">Action</div>
              </div>

              {[BUILDS.macos, BUILDS.windows].map((b) => (
                <div
                  key={b.target}
                  className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors items-center group"
                >
                  <div className="col-span-4 md:col-span-3">
                    <div className="font-medium text-foreground text-sm">{b.label}</div>
                    <div className="text-[10px] text-muted-foreground font-sans mt-0.5">{b.target}</div>
                  </div>

                  <div className="col-span-4 md:col-span-2 font-mono text-xs">
                    <div className="text-foreground">{b.version}</div>
                    <div className="text-[10px] text-muted-foreground">{b.size}</div>
                  </div>

                  <div className="hidden md:block md:col-span-5 font-mono text-[9px] text-muted-foreground/70 truncate relative">
                    <button
                      type="button"
                      onClick={() => copy(b.sha256)}
                      className="hover:text-foreground transition-colors text-left w-full truncate flex items-center gap-2 group/sha py-1"
                      aria-label={`Copy SHA-256 for ${b.label}`}
                    >
                      <span className="truncate">{b.sha256}</span>
                      <span className="opacity-0 group-hover/sha:opacity-100 transition-opacity uppercase tracking-widest text-muted-foreground">
                        Copy
                      </span>
                    </button>
                  </div>

                  <div className="col-span-4 md:col-span-2 flex justify-end">
                    <button
                      type="button"
                      className="text-[10px] font-mono uppercase tracking-wider px-3 py-2 transition-all bg-primary text-primary-foreground font-bold hover:brightness-110"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border bg-card/20">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-xs font-sans uppercase tracking-widest text-primary">Verification</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono mb-4">
                Verify download integrity by comparing SHA-256 checksums against the official manifest.
              </p>

              <div className="space-y-3">
                {[BUILDS.macos, BUILDS.windows].map((b) => (
                  <div key={b.target} className="group">
                    <div className="text-[9px] font-mono text-muted-foreground/70 uppercase tracking-wider mb-1">
                      {b.label} ({b.target})
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(b.sha256)}
                      className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      <code className="truncate max-w-[200px]">{b.sha256}</code>
                      <Copy className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-card/20">
              <h4 className="text-xs font-sans uppercase tracking-widest text-primary mb-4">Legacy Builds</h4>
              <div className="flex gap-2 flex-wrap">
                {LEGACY_BUILDS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    disabled
                    className="px-3 py-1.5 bg-background border border-border text-[10px] font-mono text-muted-foreground cursor-not-allowed"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

