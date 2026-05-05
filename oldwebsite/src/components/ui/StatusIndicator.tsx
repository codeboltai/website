interface StatusIndicatorProps {
  status: 'online' | 'warning' | 'info' | 'offline'
  label: string
  className?: string
}

export default function StatusIndicator({ status, label, className = '' }: StatusIndicatorProps) {
  const statusClasses = {
    online: 'bg-green-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]',
    warning: 'bg-yellow-500 shadow-[0_0_0_2px_rgba(245,158,11,0.2)]',
    info: 'bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]',
    offline: 'bg-gray-400 shadow-[0_0_0_2px_rgba(156,163,175,0.2)]'
  }
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${statusClasses[status]}`}></div>
      <span className="text-sm text-muted-foreground font-cyber-alt">{label}</span>
    </div>
  )
} 