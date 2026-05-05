import { WarningTriangle } from '@/components/sections/enterprise/EnterpriseShared'

export default function IntegrityMandateSection() {
  return (
    <section className="w-full bg-card text-foreground py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Core_Philosophy: Protection</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground mb-8 leading-[1.1]">
                Why the <br />
                <span className="text-muted-foreground">Integrity Mandate?</span>
              </h2>

              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed font-sans border-l border-border pl-6">
                <p>
                  At Codebolt, <strong className="text-foreground">safety precedes scaling.</strong> We view high-fidelity reasoning models not as
                  public utilities, but as regulated assets with dual-use potential.
                </p>
                <p>
                  We cannot democratize &quot;superpowers&quot; without a rigid verification architecture. Public access is restricted by design; we
                  grant licenses solely to entities that pass our adversarial evaluation of intent and infrastructure.
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 p-6 border border-border bg-muted/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="flex justify-between items-end">
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">
                  Verification Status
                  <br />
                  <span className="text-foreground">STRICT_ENFORCEMENT</span>
                </div>
                <div className="w-8 h-8 border border-border rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border border-muted-foreground rounded-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative h-full">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500/50 rounded-sm animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Live Protocol Monitor // v.3.0.2</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/70">ENFORCEMENT: STRICT</span>
              </div>

              <div className="absolute left-[-1px] top-12 bottom-0 w-[1px] bg-border/50 overflow-hidden hidden lg:block">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-red-500/80 to-transparent cb-enterprise-scan" />
              </div>

              <div className="space-y-4 lg:pl-8">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground/70 group-hover:text-foreground transition-colors uppercase tracking-widest">
                      01 // Malware Proliferation
                    </span>
                    <div className="h-px flex-1 bg-border/60 group-hover:bg-border transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed pl-8 border-l border-transparent group-hover:border-border transition-all duration-500">
                    Zero-tolerance policy for polymorphic virus generation, zero-day payload construction, or unauthorized penetration testing tools.
                    AST scanned pre-compilation.
                  </p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground/70 group-hover:text-foreground transition-colors uppercase tracking-widest">
                      02 // Constructive Architecture
                    </span>
                    <div className="h-px flex-1 bg-border/60 group-hover:bg-border transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed pl-8 border-l border-transparent group-hover:border-border transition-all duration-500">
                    Usage restricted to stable, maintainable software systems. Generation of &quot;Dark Pattern&quot; algorithms or invasive
                    surveillance scripts is forbidden.
                  </p>
                </div>

                <div className="relative mt-8 group">
                  <div className="absolute inset-0 border border-red-900/50 bg-red-950/10 cb-enterprise-pulse-border -z-10" />
                  <div className="p-6 border border-red-500/20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">03 // CRITICAL</span>
                        <h3 className="text-lg font-medium text-foreground">Automated Circuit Breaker</h3>
                      </div>
                      <WarningTriangle />
                    </div>
                    <p className="text-xs text-red-200/80 font-mono leading-relaxed max-w-xl">
                      Detection of obfuscated code generation or adversarial payloads triggers an immediate Session Quarantine. The runtime environment
                      is frozen to prevent network propagation.
                    </p>
                    <div className="mt-4 pt-3 border-t border-red-900/30 flex justify-between items-center text-[9px] font-mono text-red-400/70 uppercase tracking-wider">
                      <span>Action: SESSION_HALT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

