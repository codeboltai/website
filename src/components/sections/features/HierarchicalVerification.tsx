import FeatureKicker from './FeatureKicker'

export default function HierarchicalVerification() {
  return (
    <section className="bg-card text-foreground py-20 px-4 md:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto border-l border-r border-border bg-card">
        {/* Header */}
        <div className="border-b border-border p-8 md:p-12">
          <FeatureKicker label="System_QA_05" dotClassName="bg-emerald-600" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
            The Automated QA Dept: <br />
            <span className="text-muted-foreground">Hierarchical Verification.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
            We replace human review with a <strong className="text-foreground">4-Layer Deterministic Envelope</strong>.
            Before code is ever displayed to the user, it must survive four rigorous “Robot Guards.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border">
          {/* Left pipeline */}
          <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4 text-center">
                <div className="inline-block px-3 py-1 border border-border rounded-full bg-muted/40 text-[10px] font-mono text-muted-foreground mb-2">
                  Input: Raw_Token_Stream
                </div>
                <div className="h-6 w-px bg-border mx-auto" />
              </div>

              <div className="w-full max-w-sm border border-border bg-muted/20 backdrop-blur-sm rounded-sm p-1">
                <div className="border-b border-border p-4 flex justify-between items-center hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-600">$L_1$</span>
                    <span className="text-sm text-foreground font-medium">Syntactic Validity</span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">AST Integrity</div>
                </div>
                <div className="border-b border-border p-4 flex justify-between items-center hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-600">$L_2$</span>
                    <span className="text-sm text-foreground font-medium">Static Analysis</span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">SAST Scan</div>
                </div>
                <div className="border-b border-border p-4 flex justify-between items-center hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-600">$L_3$</span>
                    <span className="text-sm text-foreground font-medium">Functional Correctness</span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">Test Harness</div>
                </div>
                <div className="p-4 flex justify-between items-center hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-600">$L_4$</span>
                    <span className="text-sm text-foreground font-medium">Property Testing</span>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground">Fuzz Injection</div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="h-6 w-px bg-emerald-900 mx-auto" />
                <div className="inline-block px-4 py-1.5 border border-emerald-900/50 rounded-full bg-emerald-900/10 text-[10px] font-mono text-emerald-400 mt-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Output: Verified_Artifact
                </div>
              </div>
            </div>
          </div>

          {/* Right descriptions */}
          <div className="md:col-span-5 flex flex-col">
            {[
              {
                l: 'L1',
                t: 'Syntax Guard',
                d: 'Instant filtration of broken syntax trees. If the code cannot parse, it is rejected before execution logic begins.',
              },
              {
                l: 'L2',
                t: 'Security Scanner',
                d: 'Static Analysis (SAST) scans for 400+ known vulnerability patterns (SQLi, XSS, Buffer Overflows) without running the code.',
              },
              {
                l: 'L3',
                t: 'Self-Correction',
                d: 'The AI writes a temporary test harness, executes the code in a sandbox, and reads the stdout/stderr to verify functional logic.',
              },
              {
                l: 'L4',
                t: 'Chaos Engineering',
                d: "Property-based fuzzing throws random 'garbage' data at the inputs to ensure the function handles edge cases gracefully.",
              },
            ].map((row) => (
              <div
                key={row.l}
                className="flex-1 p-6 md:p-8 border-b border-border last:border-b-0 hover:bg-background/20 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs font-bold text-muted-foreground/70">{row.l}</span>
                  <h3 className="text-foreground font-medium text-sm">{row.t}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6 border-l border-border">
                  {row.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reliability */}
        <div className="p-8 md:p-12 bg-background/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                System_Reliability
              </span>
              <p className="text-foreground/80 text-sm max-w-xl">
                “The old way required human intervention for every error. The Envelope automates
                rejection, ensuring you only see code that compiles, runs, and passes security checks.”
              </p>
            </div>
            <div className="flex gap-8 border-l border-border pl-8">
              <div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground/70 mb-1">Human Review</div>
                <div className="text-xl text-muted-foreground line-through decoration-foreground">Required</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-emerald-600 mb-1">Auto-Pass Rate</div>
                <div className="text-xl text-foreground">99.4%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

