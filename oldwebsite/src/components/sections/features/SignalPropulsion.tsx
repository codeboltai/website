import FeatureKicker from './FeatureKicker'

export default function SignalPropulsion() {
  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Header */}
        <div className="border-b border-border p-8 md:p-12">
          <FeatureKicker label="System_Evolution_03" dotClassName="bg-muted-foreground/60" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            From “Chatting” to <br />
            <span className="text-muted-foreground">Signal Propulsion.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            Traditional multi-agent systems suffer from “Context Thrashing”—spending computational
            cycles reading each other’s outputs. We introduce <strong className="text-foreground">Flash-Gated Consensus</strong>,
            allowing agents to operate in isolation and emit data pings only upon resolution.
          </p>
        </div>

        {/* Figures */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
          {/* Conversational Noise */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 5.0: Conversational Noise</span>
                <span className="px-1.5 py-0.5 border border-red-900/30 bg-red-900/10 text-red-500/80 text-[10px]">
                  Inefficient (O(N^2))
                </span>
              </div>

              <div className="h-48 w-full border border-border bg-muted/10 mb-8 relative flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-60">
                  <path d="M100,20 L170,60" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L100,180" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L30,140" stroke="#333" strokeWidth="1" />
                  <path d="M100,20 L30,60" stroke="#333" strokeWidth="1" />
                  <path d="M170,60 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M170,60 L30,140" stroke="#333" strokeWidth="1" />
                  <path d="M30,60 L170,140" stroke="#333" strokeWidth="1" />
                  <path d="M30,60 L100,180" stroke="#333" strokeWidth="1" />
                  <circle cx="100" cy="20" r="3" fill="#555" />
                  <circle cx="170" cy="60" r="3" fill="#555" />
                  <circle cx="170" cy="140" r="3" fill="#555" />
                  <circle cx="100" cy="180" r="3" fill="#555" />
                  <circle cx="30" cy="140" r="3" fill="#555" />
                  <circle cx="30" cy="60" r="3" fill="#555" />
                </svg>
                <div className="absolute font-mono text-[10px] text-muted-foreground/70 bg-card px-2 border border-border">
                  Latency: High
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Legacy: Shared Context</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If 10 agents work in a shared chatroom, they parse the entire history of the other 9
                agents. This quadratic complexity limits team size to small squads.
              </p>
            </div>
          </div>

          {/* Silent Swarm */}
          <div className="p-8 md:p-12 bg-background/20 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-muted-foreground mb-8 flex justify-between items-center">
                <span>Fig 5.1: Silent Swarm</span>
                <span className="px-1.5 py-0.5 border border-green-900/30 bg-green-900/10 text-green-500/80 text-[10px]">
                  Scalable (O(1))
                </span>
              </div>

              <div className="h-48 w-full border border-border bg-background mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />

                <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
                  <circle cx="100" cy="100" r="12" fill="transparent" stroke="#fff" strokeWidth="1.5" />

                  {[
                    { x: 40, y: 40 },
                    { x: 100, y: 40 },
                    { x: 160, y: 40 },
                    { x: 40, y: 100 },
                    { x: 160, y: 100 },
                    { x: 40, y: 160 },
                    { x: 100, y: 160 },
                    { x: 160, y: 160 },
                  ].map((p, i) => (
                    <g key={`${p.x}-${p.y}`}>
                      <line x1={p.x} y1={p.y} x2="100" y2="100" stroke="#222" strokeWidth="1" />
                      <rect x={p.x - 4} y={p.y - 4} width="8" height="8" fill="#222" />
                      {i === 0 && (
                        <circle r="2" fill="white">
                          <animateMotion
                            dur="1.5s"
                            repeatCount="indefinite"
                            path="M40,40 L100,100"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                          />
                          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {i === 7 && (
                        <circle r="2" fill="white">
                          <animateMotion
                            dur="1.5s"
                            begin="0.7s"
                            repeatCount="indefinite"
                            path="M160,160 L100,100"
                            calcMode="spline"
                            keySplines="0.4 0 0.2 1"
                          />
                          <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.7s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </g>
                  ))}
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8px] text-foreground">
                  HUB
                </div>
              </div>

              <h3 className="text-foreground font-medium mb-3">Horizon: Isolated Signals</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Agents operate in total isolation (Silent Swarms). They do not communicate with peers.
                They emit a “Flash Signal” (Data Ping) only upon solving their specific puzzle fragment.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border bg-background">
          <div className="p-6 md:p-8 border-r border-border">
            <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-2">Swarm Capacity</div>
            <div className="text-2xl text-foreground font-light">10k</div>
            <div className="text-[10px] text-muted-foreground mt-1">Simultaneous Agents</div>
          </div>
          <div className="p-6 md:p-8 border-r border-border">
            <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-2">Crosstalk</div>
            <div className="text-2xl text-foreground font-light">0%</div>
            <div className="text-[10px] text-muted-foreground mt-1">Perfect Isolation</div>
          </div>
          <div className="col-span-2 p-6 md:p-8 flex items-center">
            <p className="font-mono text-xs text-muted-foreground">
              “We stopped treating collaboration like a meeting and started treating it like a distributed
              database write.”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

