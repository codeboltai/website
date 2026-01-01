'use client'

import { cn } from '@/lib/utils'

interface DivergentTrajectorySearchProps {
  className?: string
}

export default function DivergentTrajectorySearch({ className }: DivergentTrajectorySearchProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 350"
      className={cn('absolute inset-0 z-10', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cb-dts-branch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
        <filter id="cb-dts-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="30"
        y="175"
        fill="hsl(var(--muted-foreground))"
        fontFamily="monospace"
        fontSize="8"
        style={{ letterSpacing: '2px' }}
      >
        T_ZERO_INPUT
      </text>
      <circle cx="110" cy="175" r="3" fill="hsl(var(--primary))" className="animate-pulse" />

      <g filter="url(#cb-dts-glow)">
        <path d="M114,175 C180,175 220,60 380,50" stroke="url(#cb-dts-branch-grad)" strokeWidth="1" fill="none" />
        <path d="M114,175 C180,175 220,120 350,110" stroke="url(#cb-dts-branch-grad)" strokeWidth="1" fill="none" />
        <path d="M114,175 C180,175 220,230 350,240" stroke="url(#cb-dts-branch-grad)" strokeWidth="1" fill="none" />
        <path d="M114,175 C180,175 220,300 380,310" stroke="url(#cb-dts-branch-grad)" strokeWidth="1" fill="none" />

        <text
          x="390"
          y="53"
          fill="hsl(var(--muted-foreground))"
          fontFamily="monospace"
          fontSize="9"
          style={{ letterSpacing: '1px' }}
        >
          [X_FAILURE_VECTOR]
        </text>
        <text x="360" y="113" fill="hsl(var(--muted-foreground))" fontFamily="monospace" fontSize="9">
          [X]
        </text>
        <text x="360" y="243" fill="hsl(var(--muted-foreground))" fontFamily="monospace" fontSize="9">
          [X]
        </text>
        <text
          x="390"
          y="313"
          fill="hsl(var(--muted-foreground))"
          fontFamily="monospace"
          fontSize="9"
          style={{ letterSpacing: '1px' }}
        >
          [X_FAILURE_VECTOR]
        </text>
      </g>

      <path d="M114,175 L450,175" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
      <circle
        cx="450"
        cy="175"
        r="4"
        fill="hsl(var(--foreground))"
        style={{ filter: 'drop-shadow(0px 0px 8px rgba(255,255,255,0.85))' }}
      />
      <text
        x="360"
        y="165"
        fill="hsl(var(--foreground))"
        fontFamily="monospace"
        fontSize="9"
        style={{ letterSpacing: '1px' }}
      >
        CONFIDENCE_PROMOTION (P &gt; 0.85)
      </text>
      <path
        d="M454,175 L620,175"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.5"
        strokeDasharray="3 6"
        fill="none"
        opacity="0.3"
      />
      <rect
        x="620"
        y="145"
        width="140"
        height="60"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.5"
        fill="hsl(var(--background))"
      />
      <text
        x="690"
        y="170"
        fill="hsl(var(--foreground))"
        fontFamily="monospace"
        fontSize="10"
        textAnchor="middle"
        style={{ letterSpacing: '2px' }}
      >
        FRONTIER_L2_NODE
      </text>
      <text
        x="690"
        y="185"
        fill="hsl(var(--muted-foreground))"
        fontFamily="monospace"
        fontSize="8"
        textAnchor="middle"
      >
        INFERENCE_REFINEMENT
      </text>
    </svg>
  )
}

