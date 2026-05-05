'use client'

import { cn } from '@/lib/utils'

interface LinearAttentionProps {
  className?: string
}

export default function LinearAttention({ className }: LinearAttentionProps) {
  return (
    <div className={cn('flex items-center justify-center w-full h-full', className)}>
      <svg
        width="180"
        height="120"
        viewBox="0 0 180 120"
        fill="none"
        className="text-muted-foreground dark:text-zinc-600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 30 L120 30 L120 90 L40 90 Z" fill="rgba(20,20,20,0.35)" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <path d="M40 30 L60 10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
        <path d="M120 30 L140 10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
        <rect x="50" y="20" width="80" height="60" fill="#0A0A0A" stroke="currentColor" strokeWidth="1" opacity="0.7" />

        <g className="transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">
          <rect x="60" y="10" width="80" height="60" fill="#09090B" stroke="#3f3f46" strokeWidth="1" />
          <line x1="70" y1="25" x2="100" y2="25" strokeWidth="1" stroke="#52525b" />
          <line x1="70" y1="35" x2="120" y2="35" strokeWidth="1" stroke="#27272a" />
          <line x1="70" y1="45" x2="110" y2="45" strokeWidth="1" stroke="#27272a" />
          <circle cx="125" cy="55" r="2" fill="#10b981" className="animate-pulse" />
        </g>

        <line x1="90" y1="70" x2="90" y2="100" strokeWidth="0.5" stroke="#27272a" />
      </svg>
    </div>
  )
}
