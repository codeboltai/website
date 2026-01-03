'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface DiagramPanelProps {
  /** Panel title/label */
  title?: string
  /** Subtitle/meta text */
  subtitle?: string
  /** Figure label (bottom left) */
  figureLabel?: string
  /** Status badge (top right) */
  statusBadge?: ReactNode
  /** Stats panel (top right) */
  statsPanel?: ReactNode
  /** Diagram content */
  children: ReactNode
  /** Aspect ratio */
  aspectRatio?: '4/3' | '16/9' | 'square' | 'auto'
  /** Show grid background */
  showGrid?: boolean
  /** Height (when aspectRatio is 'auto') */
  height?: string
  /** Additional class names */
  className?: string
}

/**
 * DiagramPanel - Container for technical diagrams
 * 
 * Provides consistent styling for diagram areas with optional
 * labels, grid backgrounds, and overlay content.
 * 
 * @example
 * ```tsx
 * <DiagramPanel
 *   title="Topology_View"
 *   subtitle="Mesh_04 :: Active_Sync"
 *   figureLabel="FIG 3.0: P2P State Synchronization"
 *   showGrid
 * >
 *   <NetworkMesh />
 * </DiagramPanel>
 * ```
 */
export function DiagramPanel({
  title,
  subtitle,
  figureLabel,
  statusBadge,
  statsPanel,
  children,
  aspectRatio = '4/3',
  showGrid = false,
  height,
  className,
}: DiagramPanelProps) {
  const aspectStyles = {
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    'square': 'aspect-square',
    'auto': '',
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Main panel */}
      <div
        className={cn(
          'relative w-full bg-card dark:bg-[#050505] border border-border dark:border-zinc-800/60 rounded-sm overflow-hidden',
          aspectStyles[aspectRatio]
        )}
        style={aspectRatio === 'auto' && height ? { height } : undefined}
      >
        {/* Grid background */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-20 dark:opacity-100 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}

        {/* Top left label */}
        {(title || subtitle) && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex flex-col">
              {title && (
                <span className="text-[9px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                  {title}
                </span>
              )}
              {subtitle && (
                <span className="text-[10px] font-mono text-foreground/80 dark:text-zinc-300">
                  {subtitle}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Top right status/stats */}
        {(statusBadge || statsPanel) && (
          <div className="absolute top-4 right-4 z-10">
            {statusBadge || statsPanel}
          </div>
        )}

        {/* Content */}
        <div className="relative z-0 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Bottom caption */}
      {figureLabel && (
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-[10px] text-muted-foreground dark:text-zinc-600 font-mono">
            {figureLabel}
          </p>
        </div>
      )}
    </div>
  )
}
