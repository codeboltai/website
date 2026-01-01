'use client'

import { cn } from '@/lib/utils'

interface VelocityVsComplexityProps {
  className?: string
}

export default function VelocityVsComplexity({ className }: VelocityVsComplexityProps) {
  return (
    <svg className={cn('w-full h-full overflow-visible', className)} viewBox="0 0 600 350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cb-vvc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />

      {/* Human limit */}
      <path d="M0,350 Q200,300 300,300 L600,300" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="6 6" />
      <text x="320" y="320" fontFamily="monospace" fontSize="12" fill="hsl(var(--muted-foreground))">
        The Human &quot;Wall&quot;
      </text>

      {/* Recursive AI curve */}
      <path d="M0,350 Q300,350 550,50" fill="none" stroke="rgb(99,102,241)" strokeWidth="3" />
      <path d="M0,350 Q300,350 550,50 L550,350 Z" fill="url(#cb-vvc-area)" />

      {/* Breakout marker */}
      <circle cx="300" cy="300" r="4" fill="hsl(var(--foreground))" />
      <line x1="300" y1="300" x2="300" y2="350" stroke="hsl(var(--foreground))" strokeOpacity="0.3" strokeDasharray="2 2" />
      <text x="310" y="290" fontFamily="system-ui, -apple-system, Segoe UI, Roboto" fontSize="12" fill="hsl(var(--foreground))" fontWeight="700">
        The Breakout Point
      </text>
    </svg>
  )
}

