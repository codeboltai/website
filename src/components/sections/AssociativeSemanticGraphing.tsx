'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const CODE_LINES: Array<{ n: number; indent?: number; node: ReactNode }> = [
  {
    n: 1,
    node: (
      <>
        <span className="text-purple-400">function</span>{' '}
        <span className="text-blue-300">derive_state</span>(ctx: Context) {'{'}
      </>
    ),
  },
  { n: 2, indent: 1, node: <span className="text-muted-foreground/60">// Mapping inputs to recursive manifold</span> },
  {
    n: 3,
    indent: 1,
    node: (
      <>
        <span className="text-purple-400">const</span> entropy = <span className="text-orange-300">0.991</span>;
      </>
    ),
  },
  {
    n: 4,
    indent: 1,
    node: (
      <>
        <span className="text-purple-400">const</span> threshold = <span className="text-orange-300">0.850</span>;
      </>
    ),
  },
  {
    n: 5,
    indent: 1,
    node: (
      <>
        <span className="text-purple-400">if</span> (entropy &gt; threshold) {'{'}
      </>
    ),
  },
  {
    n: 6,
    indent: 1,
    node: (
      <div className="my-1 bg-indigo-500/5 border-l-2 border-indigo-500 py-1">
        <div className="pl-4 text-muted-foreground/60">// Ambiguity detected. Recursive expansion.</div>
        <div className="pl-4">
          <span className="text-indigo-300">return</span> <span className="text-blue-300">recursive_manifold</span>(ctx);
        </div>
      </div>
    ),
  },
  { n: 7, indent: 1, node: <> {'}'} </> },
  {
    n: 8,
    indent: 1,
    node: (
      <>
        <span className="text-purple-400">await</span> ctx.crystallize({'{'}
      </>
    ),
  },
  { n: 9, indent: 2, node: <>id: <span className="text-green-300">'0x992'</span>,</> },
  {
    n: 10,
    indent: 2,
    node: (
      <>
        vector: [<span className="text-orange-300">0.2</span>, <span className="text-orange-300">-0.4</span>, ...]
      </>
    ),
  },
  { n: 11, indent: 1, node: <> {'});'} </> },
  { n: 12, node: <> {'}'} </> },
]

export default function AssociativeSemanticGraphing() {
  return (
    <section className="bg-background py-24 px-6 lg:px-10 border-b border-border selection:bg-indigo-500/10 selection:text-indigo-200 dark:bg-black dark:border-white/5 dark:text-zinc-200 dark:selection:bg-indigo-500/20 dark:selection:text-indigo-200">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300">Live_Inference</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-600">
                SYS_04: ASSOCIATIVE_MEMORY
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter mb-6 leading-[1.1] dark:text-white">
              Associative <br />
              <span className="text-muted-foreground dark:text-zinc-500">Semantic Graphing.</span>
            </h2>

            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl dark:text-zinc-400">
              The system moves beyond static context windows. It utilizes{' '}
              <strong className="text-foreground font-normal dark:text-zinc-200">Recursive Definition Search</strong> to map novel terminology
              against your codebase architecture, resolving semantic ambiguities before serializing logic into persistent Associative Memory nodes.
            </p>
          </div>

          <div className="flex gap-8 border-l border-border pl-8 pb-2 dark:border-white/10">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">
                Recursion_Depth
              </div>
              <div className="text-2xl text-foreground font-light tracking-tight dark:text-white">
                12 <span className="text-muted-foreground text-[10px] uppercase tracking-tighter dark:text-zinc-600">Iterations</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 dark:text-zinc-500">Latent layers traversed</div>
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">
                Graph_Insertion
              </div>
              <div className="text-2xl text-indigo-400 font-light tracking-tight">
                180ms<span className="text-muted-foreground text-sm dark:text-zinc-600">/node</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 dark:text-zinc-500">Asynchronous write latency</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="w-full h-[750px] bg-card border border-border flex flex-col shadow-2xl relative dark:bg-[#050505] dark:border-zinc-800"
        >
          {/* Top bar */}
          <div className="h-12 border-b border-border flex items-center px-6 justify-between bg-muted/20 dark:bg-[#080808] dark:border-zinc-800">
            <div className="flex gap-8">
              <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-muted-foreground/70 dark:text-zinc-600">Session:</span>
                <span className="font-mono text-foreground/80 dark:text-zinc-300">x99_alpha_reasoning</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-zinc-400">
                <span className="text-muted-foreground/70 dark:text-zinc-600">Mode:</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-sm border border-indigo-500/20">
                  Deep_Analysis
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">Live_Connection</span>
            </div>
          </div>

          {/* Body grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden dark:divide-zinc-800">
            {/* Source */}
            <div className="lg:col-span-4 flex flex-col bg-muted/20 dark:bg-[#030303]">
              <div className="px-5 py-3 border-b border-border bg-card flex justify-between items-center dark:border-zinc-800 dark:bg-[#050505]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">Source :: src/logic.ts</span>
              </div>
              <div className="p-5 overflow-y-auto font-mono text-xs leading-6 text-muted-foreground dark:text-zinc-400">
                <div className="flex gap-4">
                  <div className="flex flex-col text-muted-foreground/40 select-none text-right min-w-[20px] dark:text-zinc-700">
                    {CODE_LINES.map((l) => (
                      <span key={l.n}>{l.n}</span>
                    ))}
                  </div>
                  <div className="flex flex-col flex-1">
                    {CODE_LINES.map((l) => (
                      <div key={l.n} className={l.indent ? (l.indent === 2 ? 'pl-8' : 'pl-4') : undefined}>
                        {l.node}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Execution stack */}
            <div className="lg:col-span-4 flex flex-col bg-card dark:bg-[#050505]">
              <div className="px-5 py-3 border-b border-border bg-card flex justify-between items-center dark:border-zinc-800 dark:bg-[#050505]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">Execution_Stack</span>
                <span className="text-[10px] text-indigo-400 animate-pulse">Processing...</span>
              </div>
              <div className="flex-1 p-6 overflow-hidden relative">
                <div className="absolute left-6 top-6 bottom-6 w-px bg-border border-l border-dashed border-muted-foreground/50 dark:bg-zinc-800 dark:border-zinc-700" />
                <div className="space-y-8 relative z-10">
                  <ExecutionStep dim title="Pass_01: Linear_Scan" metaLeft="Result" metaRight="Ambiguous" metaRightClassName="text-orange-400" body="Heuristic match failed." dotClassName="bg-border border-muted-foreground/60" />
                  <ExecutionStep dim title="Pass_02: Divergence" metaLeft="Drift" metaRight="+24%" metaRightClassName="text-foreground" dotClassName="bg-muted-foreground/50 border-muted-foreground/60" />
                  <ExecutionStep
                    title="Pass_03: Topology_Commit"
                    highlight
                    metaLeft="Constraint_Match"
                    metaRight="99.1%"
                    metaRightClassName="text-indigo-300 font-bold"
                    body="Converged on state-preserving geometry. Serializing to node 0x992."
                    dotClassName="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] border-indigo-500/60"
                  />
                </div>
              </div>
            </div>

            {/* Latent space */}
            <div className="lg:col-span-4 flex flex-col bg-background relative dark:bg-[#020202]">
              <div className="px-5 py-3 border-b border-border bg-card flex justify-between items-center z-10 dark:border-zinc-800 dark:bg-[#050505]">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500">Latent_Space</span>
                <span className="text-[10px] text-muted-foreground/70 dark:text-zinc-600">t-SNE Projection</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(hsl(var(--border) / 0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.25) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <svg className="absolute inset-0 w-full h-full p-8" xmlns="http://www.w3.org/2000/svg">
                  <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.4" />
                  <line x1="70%" y1="20%" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.4" />
                  <line x1="60%" y1="70%" x2="50%" y2="50%" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.4" />
                  <circle cx="30%" cy="30%" r="4" fill="hsl(var(--muted-foreground))" opacity="0.7" />
                  <circle cx="70%" cy="20%" r="4" fill="hsl(var(--muted-foreground))" opacity="0.7" />
                  <circle cx="60%" cy="70%" r="4" fill="hsl(var(--muted-foreground))" opacity="0.7" />

                  <g>
                    <circle cx="50%" cy="50%" r="30" fill="rgb(99,102,241)" fillOpacity="0.12">
                      <animate attributeName="r" values="10;40;10" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50%" cy="50%" r="6" fill="rgb(99,102,241)" stroke="hsl(var(--foreground))" strokeWidth="2" />
                    <text
                      x="50%"
                      y="62%"
                      textAnchor="middle"
                      fill="rgb(165,180,252)"
                      fontFamily="monospace"
                      fontSize="10"
                      style={{ letterSpacing: '1px' }}
                    >
                      0x992
                    </text>
                  </g>
                </svg>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] text-muted-foreground font-mono bg-background/70 backdrop-blur-sm p-2 border border-border dark:text-zinc-500 dark:bg-[#020202]/80 dark:border-zinc-800">
                    Visualizing 768-dimensional vector collapse into 2D manifold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ExecutionStep({
  title,
  body,
  metaLeft,
  metaRight,
  metaRightClassName,
  dotClassName,
  highlight,
  dim,
}: {
  title: string
  body?: string
  metaLeft?: string
  metaRight?: string
  metaRightClassName?: string
  dotClassName: string
  highlight?: boolean
  dim?: boolean
}) {
  return (
    <div className={`flex gap-4 ${dim ? 'opacity-60' : ''}`}>
      <div className={`w-2 h-2 mt-2 rounded-full border shrink-0 ${dotClassName}`} />
      <div className="w-full">
        <div className={`text-xs uppercase mb-1 font-semibold ${highlight ? 'text-indigo-300' : 'text-foreground/80'}`}>{title}</div>
        <div className={`p-3 border border-border bg-background rounded-sm text-xs ${highlight ? 'bg-indigo-500/5 border-indigo-500/30' : ''}`}>
          {(metaLeft || metaRight) && (
            <div className={`flex justify-between mb-1 ${highlight ? 'border-b border-indigo-500/20 pb-2 mb-2' : ''}`}>
              <span>{metaLeft}</span>
              <span className={metaRightClassName}>{metaRight}</span>
            </div>
          )}
          {body && <p className="text-muted-foreground leading-relaxed">{body}</p>}
        </div>
      </div>
    </div>
  )
}

