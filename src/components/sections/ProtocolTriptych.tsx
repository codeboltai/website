'use client'

import { motion } from 'motion/react'

type TriptychCard = {
  code: string
  title: string
  description: string
  leftLabel: string
  leftValue: string
  rightLabel: string
  rightValue: string
  rightValueClassName?: string
}

const CARDS: TriptychCard[] = [
  {
    code: '01_STATE_MANAGEMENT',
    title: 'Context Virtualization',
    description:
      'To bypass context saturation, the runtime separates "Active Workspace" from "Latent History." This keeps causal logic coherent across extended horizons (24h+) without the degradation seen in sliding-window models.',
    leftLabel: 'Inference Horizon',
    leftValue: '24H+',
    rightLabel: 'Registry Status',
    rightValue: 'SERIALIZED',
    rightValueClassName: 'text-primary/80',
  },
  {
    code: '02_VERIFICATION',
    title: 'Flash-Gated Consensus',
    description:
      'Replace standard generation with an adversarial loop. Agents must pass a "Silent Flash" protocol where peers verify logic in real-time. Failed branches are pruned instantly, preventing hallucination cascades.',
    leftLabel: 'Verification Protocol',
    leftValue: 'L4-GATED',
    rightLabel: 'Max Error Rate',
    rightValue: '<1.4%',
    rightValueClassName: 'text-primary/80',
  },
  {
    code: '03_TOPOLOGY',
    title: 'Hyper-Parallelized Search',
    description:
      'Treat compute as a liquid asset. The system instantiates 10,000+ ephemeral Scout agents to explore divergent solution trees, testing low-probability strategies that linear models discard.',
    leftLabel: 'Active Scouts',
    leftValue: '10,000+',
    rightLabel: 'Exploration Mode',
    rightValue: 'DIVERGENT',
    rightValueClassName: 'text-primary/80',
  },
]

export default function ProtocolTriptych() {
  return (
    <section className="w-full border-y border-border bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {CARDS.map((card, idx) => (
          <motion.div
            key={card.code}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group p-8 md:p-12 hover:bg-muted/20 transition-colors duration-500 flex flex-col h-full relative"
          >
            <div className="mb-8 flex justify-between items-start">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] border border-border px-2 py-1 rounded-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">
                {card.code}
              </span>
              <div className="w-1.5 h-1.5 bg-border rounded-full group-hover:bg-primary transition-colors shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>

            <h3 className="text-xl font-medium text-foreground mb-4 tracking-tight">{card.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-10 flex-grow group-hover:text-muted-foreground/80 transition-colors">
              {card.description}
            </p>

            <div className="pt-6 border-t border-border/50 flex items-center justify-between font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-muted-foreground/70">{card.leftLabel}</span>
                <span className="text-foreground">{card.leftValue}</span>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[8px] text-muted-foreground/70">{card.rightLabel}</span>
                <span className={card.rightValueClassName ?? 'text-foreground'}>{card.rightValue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

