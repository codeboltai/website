'use client'

import { motion } from 'motion/react'
import StatusLabel from '@/components/ui/StatusLabel'
import StatsGrid from '@/components/ui/StatsGrid'
import InferenceRouting from '@/components/diagrams/InferenceRouting'

interface DeepDiveProps {
  title: string
  subtitle: string
  description: string | React.ReactNode
  metrics: Array<{ value: string; label: string; trend?: string }>
  orientation?: 'left' | 'right'
  children?: React.ReactNode
}

export default function DeepDive({ 
  title, 
  subtitle, 
  description, 
  metrics, 
  orientation = 'left',
  children 
}: DeepDiveProps) {
  const titleLines = title.split('\n')

  return (
    <section className="py-24 px-6 border-b border-border bg-background">
      <div
        className={`
          max-w-6xl mx-auto
          grid md:grid-cols-12 gap-16 items-center
        `}
      >

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={orientation === 'right' ? 'md:col-span-6 md:col-start-7' : 'md:col-span-6'}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {subtitle}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[0.95] mb-8">
            {titleLines.map((line, i) => (
              <span
                key={i}
                className={`block ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-8">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <MetricValue value={m.value} />
                {m.trend && (
                  <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {m.trend}
                  </span>
                )}
                <span className="block font-mono text-[9px] text-muted-foreground uppercase tracking-widest mt-2">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={orientation === 'right' ? 'md:col-span-6 md:col-start-1 md:row-start-1' : 'md:col-span-6'}
        >
          <div className="font-sans">
            {children || <InferenceRouting />}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function MetricValue({ value }: { value: string }) {
  const trimmed = value.trim()
  if (trimmed.endsWith('%')) {
    const main = trimmed.slice(0, -1)
    return (
      <span className="block text-3xl font-light text-foreground mb-1">
        {main}
        <span className="text-sm text-muted-foreground">%</span>
      </span>
    )
  }

  return <span className="block text-3xl font-light text-foreground mb-1">{trimmed}</span>
}

// New component for feature detail sections with stats box
interface FeatureDetailProps {
  sectionLabel: string
  title: string
  description: string | React.ReactNode
  stats: Array<{ label: string; value: string; highlight?: boolean }>
  children?: React.ReactNode
}

export function FeatureDetail({
  sectionLabel,
  title,
  description,
  stats,
  children
}: FeatureDetailProps) {
  return (
    <section className="py-16 md:py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 mb-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <StatusLabel dotColor="primary" className="mb-6">
              {sectionLabel}
            </StatusLabel>

            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6">
              {title}
            </h2>

            <div className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </div>
          </motion.div>

          {/* Stats Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5"
          >
            <StatsGrid stats={stats} />
          </motion.div>
        </div>

        {/* Diagram */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center py-12 border border-border bg-card"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
