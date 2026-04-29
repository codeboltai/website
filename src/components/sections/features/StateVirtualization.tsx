export default function StateVirtualization() {
  const metrics = [
    { label: 'Compression Rate', value: '50:1', meta: 'Token/Vector' },
    { label: 'Recall Accuracy', value: '99.9%', meta: 'P-Value < 0.01' },
    { label: 'Inference Latency', value: '12ms', meta: 'Per Step' },
    { label: 'Max Context', value: '∞', meta: 'Theoretical' },
  ]

  const topology = [
    {
      n: '01',
      tag: 'Active RAM',
      title: 'Episodic Buffer',
      body: 'Volatile, high-fidelity workspace for immediate reasoning tasks.',
    },
    {
      n: '02',
      tag: 'Vector HD',
      title: 'Sequential Drive',
      body: 'Compressed logic history. Replays decision trees without linguistic overhead.',
    },
    {
      n: '03',
      tag: 'Global Graph',
      title: 'Associative Net',
      body: 'Cross-referencing global knowledge base with current session data.',
    },
    {
      n: '04',
      tag: 'Hard-coded',
      title: 'Procedural Core',
      body: 'Immutable primitives and tool-use definitions.',
    },
  ]

  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Research preview header */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-foreground" />
                <span className="font-mono text-xs uppercase tracking-tight text-muted-foreground">
                  Research_Preview
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground/80 space-y-1">
                <p>Spec: 04.22-A</p>
                <p>Status: Verified</p>
              </div>
            </div>
            <div className="hidden md:block font-mono text-xs text-muted-foreground/60 mt-12">
              Fig 1.0 — Architecture
            </div>
          </div>

          <div className="md:col-span-9 p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-8 leading-[1.1]">
              State Virtualization for <br />
              Infinite Context Windows
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
              We present a method for decoupling reasoning depth from token limitations. By treating
              memory as a file system rather than a linear sequence, Codebolt achieves a 50:1
              compression ratio while maintaining absolute logical recall.
            </p>
          </div>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Figure A */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
              <span>Figure A: Standard Transformer</span>
              <span>Decay: Linear</span>
            </div>

            <div className="relative h-32 w-full border-l border-b border-border/70 mb-6">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path
                  d="M0,10 Q150,20 300,120"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.7)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>
              <div className="absolute top-2 left-0 w-1.5 h-1.5 bg-foreground" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-muted-foreground/60" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground/60 bg-card px-2">
                Context Saturation
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard models re-process the entire transcript for every query. Reasoning quality
              degrades exponentially as context length approaches the token limit (<span className="italic">N</span>).
            </p>
          </div>

          {/* Figure B */}
          <div className="p-8 md:p-12 bg-muted/10">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between">
              <span>Figure B: Codebolt Engine</span>
              <span className="text-foreground">Retention: 100%</span>
            </div>

            <div className="relative h-32 w-full flex items-center gap-1 mb-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className="h-12 w-2 bg-border"
                  style={{ opacity: (i + 1) / 10 }}
                />
              ))}
              <div className="h-px w-8 bg-muted-foreground/60 mx-2" />
              <div className="h-12 w-12 border border-foreground flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground" />
              </div>
              <div className="absolute top-0 right-0 font-mono text-[10px] text-muted-foreground text-right">
                Vector
                <br />
                State
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Logic and variables are extracted into a{' '}
              <span className="text-foreground font-medium">State Vector</span>. Linguistic “fluff” is
              discarded, allowing infinite recursion without context loss.
            </p>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border divide-x divide-border">
          {metrics.map((m) => (
            <div key={m.label} className="p-8">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                {m.label}
              </div>
              <div className="text-3xl font-light text-foreground mb-1">{m.value}</div>
              <div className="font-mono text-[10px] text-muted-foreground/70">{m.meta}</div>
            </div>
          ))}
        </div>

        {/* Topology cards */}
        <div className="p-8 md:p-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12 block">
            Figure 2.0 — Quad-Partite Memory Topology
          </span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {topology.map((t) => (
              <div key={t.n} className="group relative">
                <div className="absolute -top-6 left-0 w-full h-px bg-border hidden md:block" />
                <div className="absolute -top-6 left-0 w-px h-6 bg-border hidden md:block" />
                <div className="border border-border p-6 h-full bg-card group-hover:border-muted-foreground/60 transition-colors duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[10px] text-muted-foreground/60">{t.n}</span>
                    <span className="font-mono text-[10px] text-muted-foreground bg-muted/40 px-1">
                      {t.tag}
                    </span>
                  </div>
                  <h4 className="text-foreground font-medium mb-3">{t.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-border p-8 md:p-12 bg-muted/5">
          <div className="max-w-2xl">
            <p className="font-sans text-xl text-muted-foreground leading-relaxed mb-6">
              “The model perceives infinite memory not by storing every word, but by rapidly swapping{' '}
              <span className="text-foreground not-italic">State Vectors</span>. This simulates infinite
              recall for complex engineering tasks without the computational cost of linear attention.”
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-border/70" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Blankline Research
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

