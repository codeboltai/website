'use client'

import { motion } from 'motion/react'

type AccessRow = {
  key: string
  initial: string
  identity: string
  session: string
  access: 'OWNER' | 'WRITE' | 'READ'
  accent?: 'primary' | 'muted'
}

const ACCESS_ROWS: AccessRow[] = [
  {
    key: 'root',
    initial: 'R',
    identity: 'root_user',
    session: 'sha256:88a...92x',
    access: 'OWNER',
    accent: 'primary',
  },
  {
    key: 'sarah',
    initial: 'S',
    identity: 'k.sarah@team.ai',
    session: 'sha256:11b...44z',
    access: 'WRITE',
    accent: 'muted',
  },
  {
    key: 'eval',
    initial: 'B',
    identity: 'sys_eval_04',
    session: 'api_key:xk9...22',
    access: 'READ',
    accent: 'muted',
  },
]

export default function CollaborativeContext() {
  return (
    <section className="bg-background w-full py-24 px-6 lg:px-10 border-t border-border font-sans selection:bg-primary/30 selection:text-primary-foreground dark:bg-[#030303] dark:border-zinc-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-200">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col pt-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8 border-l border-border pl-4 dark:text-zinc-500 dark:border-zinc-800">
            <span>sys</span>
            <span className="text-muted-foreground/40 dark:text-zinc-700">/</span>
            <span>security</span>
            <span className="text-muted-foreground/40 dark:text-zinc-700">/</span>
            <span className="text-foreground/80 dark:text-zinc-300">context_policy</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-6 dark:text-zinc-100">
            Collaborative Context
          </h2>

          <div className="space-y-4">
            <p className="text-muted-foreground font-light text-base leading-relaxed dark:text-zinc-400">
              Engineering is multiplayer. Codebolt synchronizes{' '}
              <span className="text-foreground font-medium dark:text-zinc-200">immutable reasoning states</span>{' '}
              across your team, creating a Directed Acyclic Graph (DAG) of decision history.
            </p>
            <p className="text-muted-foreground font-light text-base leading-relaxed dark:text-zinc-400">
              Generate ephemeral snapshots for quick feedback or grant persistent{' '}
              <span className="text-foreground font-medium dark:text-zinc-200">RBAC access</span>{' '}
              for deep code review cycles.
            </p>
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-7 w-full bg-card border border-border relative shadow-2xl dark:bg-[#050505] dark:border-zinc-800/60"
        >
          {/* Corner brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-muted-foreground/60 dark:border-zinc-500" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-muted-foreground/60 dark:border-zinc-500" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-muted-foreground/60 dark:border-zinc-500" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-muted-foreground/60 dark:border-zinc-500" />

          {/* Header */}
          <div className="px-6 py-4 border-b border-border bg-muted/10 flex justify-between items-center dark:border-zinc-800/60 dark:bg-[#050505]">
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest dark:text-zinc-500">
              Policy :: ws_09_alpha
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
              <span className="text-xs font-mono uppercase text-emerald-500/80 tracking-wider">Encrypted</span>
            </div>
          </div>

          {/* Input row */}
          <div className="p-6 border-b border-border dark:border-zinc-800/60">
            <div className="flex w-full">
              <div className="relative flex-grow bg-muted/20 border border-border border-r-0 focus-within:border-muted-foreground/60 transition-colors h-12 dark:bg-[#080808] dark:border-zinc-800 dark:focus-within:border-zinc-600">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground dark:text-zinc-500">ID:</div>
                <input
                  placeholder="user_hash or email"
                  className="w-full h-full bg-transparent text-sm text-foreground pl-12 pr-4 focus:outline-none font-mono placeholder:text-muted-foreground/50 dark:text-zinc-200 dark:placeholder:text-zinc-700"
                  type="text"
                />
              </div>
              <div className="bg-muted/20 border border-border border-r-0 px-4 flex items-center min-w-[120px] dark:bg-[#080808] dark:border-zinc-800">
                <select className="w-full bg-transparent text-xs font-mono text-foreground/80 focus:outline-none uppercase cursor-pointer dark:text-zinc-300">
                  <option className="bg-background text-foreground dark:bg-[#080808] dark:text-zinc-300">Viewer</option>
                  <option className="bg-background text-foreground dark:bg-[#080808] dark:text-zinc-300">Editor</option>
                  <option className="bg-background text-foreground dark:bg-[#080808] dark:text-zinc-300">Admin</option>
                </select>
              </div>
              <button className="bg-foreground hover:bg-foreground/90 text-background text-xs font-mono font-bold px-6 transition-colors uppercase border border-foreground tracking-wider dark:bg-zinc-100 dark:text-black dark:border-zinc-100 dark:hover:bg-white">
                Add
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col">
            <div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-muted/20">
              <div className="col-span-5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Principal Identity</div>
              <div className="col-span-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Session Hash</div>
              <div className="col-span-3 text-right text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Access</div>
            </div>

            {ACCESS_ROWS.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-12 px-6 py-4 border-b border-border/40 items-center hover:bg-muted/20 transition-colors group/row"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div
                    className={[
                      'w-6 h-6 border flex items-center justify-center text-xs font-mono',
                      row.accent === 'primary'
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'bg-muted/30 border-border text-muted-foreground',
                    ].join(' ')}
                  >
                    {row.initial}
                  </div>
                  <span className="text-sm font-mono text-foreground/80 group-hover/row:text-foreground transition-colors">
                    {row.identity}
                  </span>
                </div>
                <div className="col-span-4">
                  <span className="text-xs font-mono text-muted-foreground">{row.session}</span>
                </div>
                <div className="col-span-3 flex justify-end gap-3 items-center">
                  {row.access !== 'OWNER' && (
                    <span className="text-[10px] font-mono text-red-500 opacity-0 group-hover/row:opacity-100 cursor-pointer hover:underline uppercase tracking-wide">
                      Revoke
                    </span>
                  )}
                  <span
                    className={[
                      'text-[10px] font-mono uppercase tracking-wide px-2 py-1 border rounded-sm',
                      row.access === 'OWNER'
                        ? 'text-primary bg-primary/10 border-primary/20'
                        : 'text-muted-foreground bg-muted/20 border-border',
                    ].join(' ')}
                  >
                    {row.access}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Public Snapshot */}
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-foreground/80 uppercase tracking-widest">Public Snapshot</span>
                <p className="text-xs text-muted-foreground max-w-[260px] leading-relaxed">
                  Generates a read-only serialized state. Visible to anyone with the link.
                </p>
              </div>
              <button className="flex items-center gap-4 cursor-pointer">
                <span className="text-xs font-mono uppercase transition-colors text-muted-foreground">Disabled</span>
                <div className="w-10 h-5 border transition-colors relative border-border bg-muted/30">
                  <div className="absolute top-0.5 bottom-0.5 w-4 bg-current transition-all duration-200 left-0.5 bg-muted-foreground" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

