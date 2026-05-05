'use client'

import { cn } from '@/lib/utils'

interface DecoupledTopologyProps {
  className?: string
}

export default function DecoupledTopology({ className }: DecoupledTopologyProps) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <svg width="200" height="100" viewBox="0 0 200 100" className="text-muted-foreground dark:text-zinc-500" fill="none">
        <text x="10" y="25" className="fill-current font-mono uppercase" fontSize="8">
          UI Thread
        </text>
        <line x1="60" y1="22" x2="190" y2="22" stroke="#3f3f46" strokeWidth="1" />
        <circle cx="100" cy="22" r="2" fill="#f4f4f5" />
        <circle cx="140" cy="22" r="2" fill="#f4f4f5" />
        <path d="M100 22 L100 78" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M140 22 L140 78" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />

        <text x="10" y="80" className="fill-current font-mono uppercase" fontSize="8">
          Worker
        </text>
        <line x1="60" y1="78" x2="190" y2="78" stroke="#3f3f46" strokeWidth="1" />

        <rect x="100" y="72" width="40" height="12" rx="2" fill="#18181b" stroke="#0ea5e9" strokeWidth="1" />
        <path d="M105 78 L135 78" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  )
}
