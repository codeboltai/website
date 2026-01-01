'use client'

import { cn } from '@/lib/utils'

interface VelocityComplexityProps {
  className?: string
}

export default function VelocityComplexity({ className }: VelocityComplexityProps) {
  return (
    <svg className={cn('w-full h-full overflow-visible', className)} viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cb-vc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* grid lines */}
      <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />

      {/* human limit */}
      <path d="M0,350 Q200,300 300,300 L600,300" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />

      {/* recursive curve */}
      <path d="M0,350 Q300,350 550,50" fill="none" stroke="rgb(99 102 241)" strokeWidth="3" />
      <path d="M0,350 Q300,350 550,50 L550,350 Z" fill="url(#cb-vc-area)" opacity="0.9" />

      {/* breakout point */}
      <circle cx="300" cy="300" r="4" fill="hsl(var(--foreground))" />
      <line x1="300" y1="300" x2="300" y2="350" stroke="hsl(var(--foreground))" strokeOpacity="0.25" strokeDasharray="2 2" />
      <text x="312" y="292" fill="hsl(var(--foreground))" fontSize="12" fontWeight="700">
        The Breakout Point
      </text>
    </svg>
  )
}

