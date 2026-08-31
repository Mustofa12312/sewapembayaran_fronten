const styles = {
  active:    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  paid:      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending:   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed:    'bg-red-500/10 text-red-400 border-red-500/20',
  expired:   'bg-slate-500/10 text-slate-400 border-slate-500/20',
  refunded:  'bg-orange-500/10 text-orange-400 border-orange-500/20',
  revoked:   'bg-red-500/10 text-red-300 border-red-500/20',
  suspended: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  info:      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  new:       'bg-purple-500/10 text-purple-400 border-purple-500/20',
  default:   'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const sizes = {
  xs: 'px-1.5 py-0.5 text-[10px]',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const style = styles[variant] || styles.default;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full font-bold uppercase tracking-wider border
        ${style}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'active' || variant === 'paid' ? 'bg-emerald-400' :
          variant === 'pending' ? 'bg-amber-400' :
          variant === 'failed' || variant === 'revoked' ? 'bg-red-400' :
          'bg-slate-400'
        }`} />
      )}
      {children}
    </span>
  );
}
