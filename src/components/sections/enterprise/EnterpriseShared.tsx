import type { ReactNode } from 'react'

export function WarningTriangle() {
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

export function TopologyIconLinear() {
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

export function TopologyIconMesh() {
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

export function TopologyIconCore() {
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

export function SequenceDecor() {
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

export function BarRow({
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
        <span className={`text-lg font-medium tracking-tight block ${filled ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
        <span className="text-[11px] text-muted-foreground/70 font-mono mt-1 block">{sub}</span>
      </div>
      <div className="col-span-6">
        <div className="flex gap-1 h-3 items-center">
          {new Array(5).fill(0).map((_, idx) => (
            <div key={idx} className={`flex-1 h-full rounded-[1px] ${filled ? 'bg-foreground' : 'bg-border'}`} />
          ))}
          <span className={`ml-3 text-[10px] font-mono uppercase ${filled ? 'text-foreground' : 'text-muted-foreground/70'}`}>{suffix}</span>
        </div>
      </div>
    </div>
  )
}

export function ProcessBars() {
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
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="flex-1 bg-foreground hover:bg-muted-foreground transition-all duration-300"
          style={{ height: `${b.h}%`, opacity: b.o }}
        />
      ))}
    </div>
  )
}

export function SectionWrapper({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground font-sans selection:bg-muted selection:text-foreground">{children}</div>
}

