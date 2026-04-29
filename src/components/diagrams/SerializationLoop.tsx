'use client'

import { cn } from '@/lib/utils'

interface SerializationLoopProps {
  className?: string
}

export default function SerializationLoop({ className }: SerializationLoopProps) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <svg width="200" height="100" viewBox="0 0 200 100" className="text-muted-foreground dark:text-zinc-600" fill="none">
        <circle cx="30" cy="50" r="4" fill="#0A0A0A" stroke="currentColor" strokeWidth="1.5" />
        <text x="25" y="70" className="fill-current font-mono" fontSize="8">
          IN
        </text>

        <rect x="70" y="30" width="60" height="40" rx="2" fill="#0A0A0A" stroke="#3f3f46" strokeWidth="1" />
        <path d="M85 40 L115 40" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M85 50 L115 50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M85 60 L115 60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />

        <circle cx="170" cy="50" r="4" fill="#0A0A0A" stroke="currentColor" strokeWidth="1.5" />
        <text x="160" y="70" className="fill-current font-mono" fontSize="8">
          OUT
        </text>

        <line x1="34" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" markerEnd="url(#cb-arrow)" />
        <line x1="130" y1="50" x2="166" y2="50" stroke="currentColor" strokeWidth="1" markerEnd="url(#cb-arrow)" />

        <path
          d="M170 46 Q 170 10 100 10 Q 30 10 30 46"
          fill="none"
          strokeWidth="1"
          strokeDasharray="4 2"
          stroke="#10b981"
          className="opacity-0 group-hover:opacity-60 transition-opacity duration-700"
        />

        <defs>
          <marker id="cb-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#52525b" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
