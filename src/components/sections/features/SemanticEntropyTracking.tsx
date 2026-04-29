import FeatureKicker from './FeatureKicker'

export default function SemanticEntropyTracking() {
  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Header */}
        <div className="border-b border-border p-8 md:p-12">
          <FeatureKicker label="System_Safety_04" dotClassName="bg-amber-600" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            The Hallucination Detector: <br />
            <span className="text-muted-foreground">Semantic Entropy Tracking.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Standard models do not know when they are lying. Codebolt monitors the{' '}
            <strong className="text-foreground">Perplexity (PPL)</strong> of the output stream in
            real-time. If the signal entropy spikes, the system triggers an immediate “State
            Compression” event.
          </p>
        </div>

        {/* Legacy vs monitor */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          <div className="md:col-span-4 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-background/20">
            <div className="font-mono text-xs uppercase text-muted-foreground mb-6">
              Legacy_Problem: Unchecked Decay
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              In standard LLMs, once a model outputs a low-probability token (a lie), it forces itself
              to justify that lie with more lies. This creates a “Hallucination Loop” that is
              mathematically impossible to exit.
            </p>
            <div className="p-4 bg-background border border-border font-mono text-[10px] text-amber-500/80">
              Warning: Output Divergence <br />
              PPL Score: &gt; 85.2 (Critical)
            </div>
          </div>

          <div className="md:col-span-8 p-8 md:p-12 relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="font-mono text-xs uppercase text-muted-foreground mb-1">
                  Real-Time Signal Monitor
                </div>
                <div className="text-foreground font-medium">Active Intervention Protocol</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="font-mono text-[10px] text-muted-foreground/70">
                  Threshold <sub className="not-italic text-[10px]">max</sub>
                </div>
                <div className="font-mono text-xs text-amber-500">4.5 PPL</div>
              </div>
            </div>

            <div className="relative h-64 w-full border border-border bg-background overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute top-[30%] left-0 w-full h-px border-t border-dashed border-amber-900/50 z-10" />
              <div className="absolute top-[30%] right-2 -translate-y-full text-[8px] font-mono text-amber-900">
                HALLUCINATION_THRESHOLD
              </div>

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cbEntropyWarn" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,180 Q20,170 40,180 T80,180 T120,175 T160,180"
                  fill="none"
                  stroke="#525252"
                  strokeWidth="1.5"
                />
                <path
                  d="M160,180 L170,140 L180,160 L190,100 L200,130 L210,80 L220,110 L225,50"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
                <line
                  x1="225"
                  y1="50"
                  x2="225"
                  y2="180"
                  stroke="#fff"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <path
                  d="M225,180 L240,180 T280,180 T320,175 T600,180"
                  fill="none"
                  stroke="#525252"
                  strokeWidth="1.5"
                />
                <circle cx="225" cy="50" r="3" fill="#d97706" className="animate-pulse" />
                <circle cx="225" cy="50" r="8" fill="none" stroke="#d97706" strokeOpacity="0.5" />
              </svg>

              <div className="absolute top-[20%] left-[230px] bg-background border border-amber-900/50 px-2 py-1 z-20">
                <span className="text-[8px] font-mono text-amber-500 uppercase tracking-wide block">
                  Event: State_Compression
                </span>
                <span className="text-[8px] font-mono text-muted-foreground block">
                  Action: Context Reset
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
          <div className="p-8">
            <span className="font-mono text-[10px] text-muted-foreground/70 block mb-2">01. Monitor</span>
            <h4 className="text-foreground text-sm font-medium mb-2">Track Perplexity (PPL)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The system continuously calculates the mathematical “surprise” of every generated token
              relative to the State Vector.
            </p>
          </div>
          <div className="p-8">
            <span className="font-mono text-[10px] text-amber-600 block mb-2">02. Detect</span>
            <h4 className="text-foreground text-sm font-medium mb-2">Entropy Spike</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If the agent begins “making things up,” the entropy score spikes above the safety
              threshold (H &gt; 4.5).
            </p>
          </div>
          <div className="p-8 bg-background/20">
            <span className="font-mono text-[10px] text-foreground block mb-2">03. Intervene</span>
            <h4 className="text-foreground text-sm font-medium mb-2">State Compression</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The generation is halted. The context window is compressed to the last known “Verified
              State,” and the generation restarts.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 text-center">
          <p className="font-sans text-lg text-muted-foreground">“It stops errors before they are finished being written.”</p>
        </div>
      </div>
    </section>
  )
}

