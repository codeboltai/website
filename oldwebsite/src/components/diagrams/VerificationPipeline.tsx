'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface VerificationPipelineProps {
  className?: string
  variant?: 'standalone' | 'embedded'
}

export default function VerificationPipeline({ className, variant = 'standalone' }: VerificationPipelineProps) {
  const stages = [
    { label: 'INPUT_STREAM', icon: 'lines' },
    { label: 'ADVERSARIAL_GATE', icon: 'arrow', sublabel: 'SYSCALL_FILTER', color: 'red' },
    { label: 'ENTROPY_GATE', icon: 'wave', sublabel: 'PPL_MONITORING', color: 'green' },
    { label: 'DETERMINISTIC', icon: 'check' },
  ]

  const content = (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-6">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center"
          >
            {/* Icon Box */}
            <div className={cn(
              'w-16 h-16 border flex items-center justify-center relative',
              stage.color === 'red' ? 'border-red-500/50' :
              stage.color === 'green' ? 'border-emerald-500/50' : 'border-border'
            )}>
              {stage.icon === 'lines' && (
                <div className="flex flex-col gap-1">
                  <div className="w-6 h-[2px] bg-muted-foreground" />
                  <div className="w-6 h-[2px] bg-muted-foreground" />
                  <div className="w-6 h-[2px] bg-muted-foreground" />
                </div>
              )}
              {stage.icon === 'arrow' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-red-500">
                  <path d="M12 5v14M12 19l-4-4M12 19l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {stage.icon === 'wave' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-500">
                  <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0 4 3 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              {stage.icon === 'check' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>

            {/* Label */}
            <span className={cn(
              'text-[9px] font-mono uppercase tracking-wider mt-2',
              stage.color === 'red' ? 'text-red-500' :
              stage.color === 'green' ? 'text-emerald-500' : 'text-muted-foreground'
            )}>
              {stage.label}
            </span>

            {/* Sublabel */}
            {stage.sublabel && (
              <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                {stage.sublabel}
              </span>
            )}
          </motion.div>

          {/* Connector */}
          {i < stages.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex md:flex-row flex-col items-center justify-center text-muted-foreground"
              aria-hidden="true"
            >
              <div className="hidden md:flex items-center">
                <div className="w-10 h-px bg-border" />
                <span className="mx-2">*</span>
                <div className="w-10 h-px bg-border" />
              </div>

              <div className="md:hidden flex flex-col items-center my-3">
                <div className="h-6 w-px bg-border" />
                <span className="text-xs">*</span>
                <div className="h-6 w-px bg-border" />
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('w-full', className)}>
      {variant === 'standalone' ? (
        <div className="relative bg-card border border-border p-6 md:p-8">
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  )
}
