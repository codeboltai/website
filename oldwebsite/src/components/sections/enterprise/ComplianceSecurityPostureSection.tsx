import { BarRow, ProcessBars } from '@/components/sections/enterprise/EnterpriseShared'

export default function ComplianceSecurityPostureSection() {
  return (
    <section className="w-full bg-card text-foreground font-sans py-24 lg:py-32 border-t border-border">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-6 border border-border rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System_State_2.1</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground leading-[1.05] mb-6">
              Compliance &amp; <br />
              Security Posture.
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed tracking-tight">
              We define security through radical transparency. The following data represents the active constraints and verification layers of our
              infrastructure.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end font-mono text-xs text-muted-foreground/70">
            <div className="flex flex-col gap-2 text-right">
              <div className="flex justify-between w-48 border-b border-border pb-2">
                <span>TARGET</span> <span className="text-foreground">Q1 2026</span>
              </div>
              <div className="flex justify-between w-48 border-b border-border pb-2">
                <span>REGION</span> <span className="text-foreground">US-EAST</span>
              </div>
              <div className="flex justify-between w-48 pb-2">
                <span>STATUS</span> <span className="text-emerald-500">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-border">
          <div className="lg:col-span-7 lg:border-r border-border pt-12 pr-0 lg:pr-12">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">01 — Active Controls</h3>

            <div className="flex flex-col">
              <div className="grid grid-cols-12 pb-4 border-b border-border text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
                <div className="col-span-6">Metric</div>
                <div className="col-span-6">Visual State</div>
              </div>

              <BarRow label="SOC 2 Type II" sub="Pending Audit Cycle" suffix="Observation_Period_Active" />
              <BarRow label="Bridge Letter" sub="Active Assessment" tone="bright" suffix="ISSUED" />
              <BarRow label="AES-256-GCM" sub="Encryption Layer" tone="bright" suffix="ENFORCED" />
            </div>

            <div className="mt-8">
              <p className="text-xs text-muted-foreground font-mono leading-relaxed border-l-2 border-border pl-4 py-1">
                <span className="text-foreground">Note:</span> We are currently in the SOC 2 Type II observation window. Enterprise partners may
                request a Bridge Letter to validate interim control effectiveness.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 pt-12 pl-0 lg:pl-12">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">02 — Process Queue</h3>

            <div className="relative border-l border-border ml-2 pl-8 space-y-12">
              <div className="relative group">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-muted rounded-sm" />
                <div className="flex flex-col gap-1 opacity-50">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Completed</span>
                  <span className="text-base text-foreground/80 font-medium tracking-tight">Internal Pen-Test</span>
                  <div className="w-full h-1 bg-muted mt-2" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-foreground rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.35)]" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono text-foreground uppercase tracking-widest">Current Epoch</span>
                    <span className="text-[10px] font-mono text-muted-foreground/70">PID_882</span>
                  </div>
                  <span className="text-xl text-foreground font-medium tracking-tight">Bridge Assessment</span>
                  <ProcessBars />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 border border-border bg-transparent rounded-sm" />
                <div className="flex flex-col gap-1 opacity-40">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Q1 2026</span>
                  <span className="text-base text-foreground/80 font-medium tracking-tight">SOC 2 Audit</span>
                  <div className="w-full h-px border-t border-dashed border-border mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

