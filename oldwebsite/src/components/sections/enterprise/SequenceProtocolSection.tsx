import { SequenceDecor } from '@/components/sections/enterprise/EnterpriseShared'

export default function SequenceProtocolSection() {
  return (
    <section className="w-full bg-card text-foreground py-24 border-t border-border font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 pb-8 border-b border-border">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4 font-sans">Sequence Protocol</h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-md">
              Access to Enterprise tiers follows a strict, four-phase ratification process to ensure Integrity Council alignment.
            </p>
          </div>
          <div className="hidden lg:block w-64 h-6 opacity-60 mb-1">
            <SequenceDecor />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 border-l border-border">
          {[
            {
              n: '01',
              code: '[INIT_REQ]',
              title: 'Submission',
              desc: 'Submit infrastructure request. System freezes a provisional slot in the waitlist queue.',
              status: 'AWAITING_INPUT',
              active: false,
            },
            {
              n: '02',
              code: '[AUDIT_GATE]',
              title: 'Verification',
              desc: 'Adversarial review process. Safety Systems determine progression (Accept / Reject).',
              status: 'PENDING_REVIEW',
              active: false,
            },
            {
              n: '03',
              code: '[KEY_PROV]',
              title: 'Provisioning',
              desc: 'Encrypted instruction delivery for terminal-based API License Key generation.',
              status: 'LOCKED',
              active: false,
            },
            {
              n: '04',
              code: '[ACTIVE_STATE]',
              title: 'Activation',
              desc: 'Enterprise features and dedicated topology are activated upon verification.',
              status: 'LOCKED',
              active: true,
            },
          ].map((s) => (
            <div key={s.n} className="group relative p-8 border-r border-b lg:border-b-0 border-border hover:bg-muted/20 transition-colors">
              <div className={`absolute top-0 left-0 w-full h-[1px] transition-colors ${s.active ? 'bg-foreground' : 'bg-border'}`} />

              <div className="flex justify-between items-baseline mb-12">
                <span className={`text-3xl font-light font-sans transition-colors ${s.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.n}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/70 uppercase tracking-widest">{s.code}</span>
              </div>

              <div className="space-y-3 mb-12">
                <h3 className={`text-lg font-medium font-sans ${s.active ? 'text-foreground' : 'text-foreground/90'}`}>{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${s.active ? 'bg-foreground' : 'bg-muted-foreground'}`} />
                <span className={`text-[9px] font-mono uppercase tracking-widest ${s.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-16 border-t border-border pt-8">
          <div>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Estimated Latency</span>
            <span className="text-xs font-mono text-foreground">T+48 HOURS</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Security Standard</span>
            <span className="text-xs font-mono text-foreground">TLS 1.3 // AUDITED</span>
          </div>
        </div>
      </div>
    </section>
  )
}

