import { cn } from '@/lib/utils'

export default function FeatureKicker({
  label,
  dotClassName,
  className,
}: {
  label: string
  dotClassName?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('w-2 h-2', dotClassName ?? 'bg-foreground/70')} />
      <span className="font-mono text-xs uppercase tracking-tight text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

