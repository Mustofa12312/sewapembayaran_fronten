export default function Card({
  children,
  className = '',
  hover = false,
  glow = '',
  padding = 'p-6',
  ...props
}) {
  return (
    <div
      className={`
        glass-card rounded-2xl
        ${padding}
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-lg hover:shadow-black/30 cursor-pointer' : ''}
        ${glow === 'blue' ? 'hover:glow-blue' : glow === 'purple' ? 'hover:glow-purple' : glow === 'emerald' ? 'hover:glow-emerald' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`pb-4 border-b border-white/5 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-bold text-white ${className}`}>
      {children}
    </h3>
  );
}
