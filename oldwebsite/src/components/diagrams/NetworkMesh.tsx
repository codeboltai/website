'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface NetworkMeshProps {
  className?: string
}

export default function NetworkMesh({ className }: NetworkMeshProps) {
  const nodes = [
    // Positioned to sit below typical overlay headers in containers
    { id: 'A', label: 'AGENT_A', x: 120, y: 85 },
    { id: 'B', label: 'AGENT_B', x: 280, y: 85 },
    { id: 'C', label: 'AGENT_C', x: 120, y: 225 },
    { id: 'D', label: 'AGENT_D', x: 280, y: 225 },
    { id: 'HUB', label: 'HUB_01', x: 200, y: 155, isHub: true },
  ]

  const connections = [
    { from: 'A', to: 'HUB' },
    { from: 'B', to: 'HUB' },
    { from: 'C', to: 'HUB' },
    { from: 'D', to: 'HUB' },
    { from: 'A', to: 'B' },
    { from: 'C', to: 'D' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
  ]

  const getNode = (id: string) => nodes.find(n => n.id === id)

  return (
    <div className={cn('relative', className)}>
      <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-auto">
        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from)
          const to = getNode(conn.to)
          if (!from || !to) return null
          
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          )
        })}

        {/* Animated Packets */}
        {connections.slice(0, 4).map((conn, i) => {
          const from = getNode(conn.from)
          const to = getNode(conn.to)
          if (!from || !to) return null

          return (
            <motion.circle
              key={`packet-${i}`}
              r="3"
              fill="hsl(var(--mesh-accent, var(--primary)))"
              initial={{ cx: from.x, cy: from.y }}
              animate={{ 
                cx: [from.x, to.x, from.x],
                cy: [from.y, to.y, from.y]
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.isHub ? 12 : 8}
              fill={node.isHub ? 'hsl(var(--mesh-accent, var(--primary)) / 0.2)' : 'hsl(var(--card))'}
              stroke={node.isHub ? 'hsl(var(--mesh-accent, var(--primary)))' : 'hsl(var(--border))'}
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill={node.isHub ? 'hsl(var(--mesh-accent, var(--primary)))' : 'hsl(var(--muted-foreground))'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            />
            <motion.text
              x={node.x}
              y={node.y + (node.isHub ? 30 : 25)}
              textAnchor="middle"
              className="text-[9px] font-mono uppercase tracking-wider"
              fill="hsl(var(--muted-foreground))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-[1px] bg-border" />
          <span>LINK</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>PACKET</span>
        </div>
      </div>
    </div>
  )
}
