'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Download, Copy, Check } from 'lucide-react'

type OSKey = 'mac' | 'windows' | 'linux' | 'other'

const RELEASE_VERSION = 'v3.0.2'
const PATCHES = [
  { id: '24C105', text: 'Fixed learning memory module' },
  { id: '24C104', text: 'Enhanced context retention' },
  { id: '24C103', text: 'Improved inference stability' },
  { id: '24C102', text: 'Core engine optimization' },
]

const MANIFEST = [
  {
    target: 'macOS',
    platform: 'DARWIN_ARM64',
    build: RELEASE_VERSION,
    size: '350 MB',
    integrity: '1e49be1104863695553b8761fe0a98a3456cf8b64fa90a5258115239e9e34974',
  },
  {
    target: 'Windows',
    platform: 'WIN32_NT_X64',
    build: RELEASE_VERSION,
    size: '265 MB',
    integrity: 'ddd45437283ed0bb30b8d893fe555f67034e6363fb34bebb2591dab35f54ea39',
  },
]

function detectOS(): OSKey {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return 'windows'
  if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) return 'mac'
  if (ua.includes('linux')) return 'linux'
  return 'other'
}

function InlineCopy({
  value,
  className = '',
}: {
  value: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`hover:text-foreground transition-colors text-left w-full truncate flex items-center gap-2 group/sha py-1 ${className}`}
      aria-label="Copy SHA-256"
    >
      <span className="truncate">{value}</span>
      <span
        className={[
          'ml-auto uppercase tracking-widest text-[9px] transition-opacity',
          copied ? 'opacity-100 text-primary' : 'opacity-0 group-hover/sha:opacity-100 text-muted-foreground',
        ].join(' ')}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3" />
            Copied
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <Copy className="w-3 h-3" />
            Copy
          </span>
        )}
      </span>
    </button>
  )
}

export default function NewDownloadClient() {
  const [os, setOs] = useState<OSKey>('mac')

  useEffect(() => {
    setOs(detectOS())
  }, [])

  const hero = useMemo(() => {
    if (os === 'windows') {
      return { label: 'Windows', arch: 'x64', buildId: PATCHES[0]?.id ?? '—', size: MANIFEST[1].size }
    }
    if (os === 'linux') {
      return { label: 'Linux', arch: 'x64', buildId: PATCHES[0]?.id ?? '—', size: '—' }
    }
    if (os === 'mac') {
      return { label: 'macOS', arch: 'Apple Silicon', buildId: PATCHES[0]?.id ?? '—', size: MANIFEST[0].size }
    }
    return { label: 'System', arch: '—', buildId: PATCHES[0]?.id ?? '—', size: '—' }
  }, [os])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-[1400px] mx-auto border-x border-border grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-24">
        <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border p-8 flex flex-col justify-between relative bg-muted/20">
          <div className="absolute inset-0 bg-grid-subtle opacity-[0.06] pointer-events-none" />

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
                <div className="text-3xl font-mono text-foreground tracking-tighter mb-2">{RELEASE_VERSION}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-primary text-primary-foreground px-2 py-0.5 uppercase tracking-wider font-bold">
                    Beta
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 pt-8 border-t border-border">
            <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-4">
              Latest Patch
            </div>
            <ul className="space-y-3 text-xs text-muted-foreground font-mono">
              {PATCHES.map((p) => (
                <li key={p.id} className="flex gap-3">
                  <span className="text-muted-foreground/70">{p.id}</span>
                  <span>{p.text}</span>
                </li>
              ))}
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
          {/* Hero */}
          <div className="p-8 lg:p-16 border-b border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
              <div className="relative w-16 h-16 opacity-10 rotate-90">
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
                Detected System: {hero.label}
              </div>

              <h2 className="text-5xl md:text-7xl font-medium text-foreground tracking-tight mb-8">
                {hero.label}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-end">
                <div className="md:col-span-3 space-y-4 font-mono text-xs text-muted-foreground border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Architecture</span>
                    <span className="text-foreground">{hero.arch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Build ID</span>
                    <span className="text-foreground">{hero.buildId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Size</span>
                    <span className="text-foreground">{hero.size}</span>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    className="w-full bg-primary text-primary-foreground h-12 transition-all duration-300 flex items-center justify-center gap-3 px-6 font-sans text-[11px] uppercase font-bold hover:brightness-110 group/btn shadow-[0_0_15px_hsl(var(--primary)/0.25)]"
                  >
                    <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                    <span>Download</span>
                  </button>
                  <p className="text-[10px] text-muted-foreground/70 mt-3 text-center leading-relaxed">
                    Includes CLI, local inference engine, and vector runtime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manifest */}
          <div className="p-8 lg:p-16">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
              <h3 className="text-lg font-medium text-foreground">Release Manifest</h3>
              <div className="hidden md:block">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm" />
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm animate-pulse" />
                  <div className="w-1 h-1 bg-muted-foreground rounded-sm" />
                  <div className="w-1 h-1 bg-border rounded-sm" />
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

              {MANIFEST.map((row) => (
                <div
                  key={row.platform}
                  className="grid grid-cols-12 gap-4 py-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors items-center group"
                >
                  <div className="col-span-4 md:col-span-3">
                    <div className="font-medium text-foreground text-sm">{row.target}</div>
                    <div className="text-[10px] text-muted-foreground font-sans mt-0.5">{row.platform}</div>
                  </div>

                  <div className="col-span-4 md:col-span-2 font-mono text-xs">
                    <div className="text-foreground">{row.build}</div>
                    <div className="text-[10px] text-muted-foreground">{row.size}</div>
                  </div>

                  <div className="hidden md:block md:col-span-5 font-mono text-[9px] text-muted-foreground truncate relative">
                    <InlineCopy value={row.integrity} />
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

          {/* Verification + Legacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <div className="p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-xs font-sans uppercase tracking-widest text-primary">Verification</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono mb-4">
                Verify download integrity by comparing SHA-256 checksums against the official manifest.
              </p>
              <div className="space-y-3">
                {MANIFEST.map((row) => (
                  <div key={row.platform} className="group">
                    <div className="text-[9px] font-mono text-muted-foreground/70 uppercase tracking-wider mb-1">
                      {row.target} ({row.platform})
                    </div>
                    <InlineCopy
                      value={row.integrity}
                      className="text-[10px] font-mono text-muted-foreground hover:text-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-muted/10">
              <h4 className="text-xs font-sans uppercase tracking-widest text-primary mb-4">Legacy Builds</h4>
              <div className="flex gap-2 flex-wrap">
                {['v2.0.4', 'v2.0.3', 'v2.0.21', 'v2.0.2', 'v2.0.11', 'v2.0.1', 'v1.0.1'].map((v) => (
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

