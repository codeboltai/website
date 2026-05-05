'use client'

import { cn } from '@/lib/utils'

interface VarianceReductionProps {
  className?: string
}

export default function VarianceReduction({ className }: VarianceReductionProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 300"
      className={cn('overflow-visible', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="cb-vr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="hsl(var(--foreground) / 0.06)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#cb-vr-grid)" />

      {/* Baseline */}
      <line
        x1="50"
        y1="150"
        x2="550"
        y2="150"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.7"
      />

      {/* Pruned red trajectory */}
      <path
        d="M50,150 Q100,100 150,50 T250,20"
        fill="none"
        stroke="hsl(0 84% 60%)"
        strokeWidth="1.5"
        opacity="0.8"
        strokeDasharray="2 6"
      />
      <circle cx="250" cy="20" r="3" fill="hsl(0 84% 60%)" opacity="0.9" />
      <text x="260" y="25" fontFamily="monospace" fontSize="9" fill="hsl(0 84% 60%)" opacity="0.9">
        PRUNED (High Entropy)
      </text>

      {/* Convergent green trajectory */}
      <path
        d="M50,150 C100,250 150,50 250,150 C300,180 350,140 550,150"
        fill="none"
        stroke="hsl(var(--success))"
        strokeWidth="2"
        opacity="0.95"
      />

      {/* Correction event */}
      <circle cx="250" cy="150" r="3" fill="hsl(var(--background))" stroke="hsl(var(--success))" strokeWidth="2" />
      <line x1="250" y1="155" x2="250" y2="165" stroke="hsl(var(--success))" strokeWidth="1" />
      <text x="240" y="175" fontFamily="monospace" fontSize="9" fill="hsl(var(--success))" textAnchor="middle">
        Correction Event
      </text>

      {/* Converged state */}
      <circle cx="550" cy="150" r="4" fill="hsl(var(--success))" />
      <circle cx="550" cy="150" r="12" fill="hsl(var(--success))" fillOpacity="0.18">
        <animate attributeName="r" values="10;16;10" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0.05;0.35" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <text x="540" y="130" fontFamily="monospace" fontSize="9" fill="hsl(var(--success))" textAnchor="end">
        STATE_CONVERGED
      </text>
    </svg>
  )
}
