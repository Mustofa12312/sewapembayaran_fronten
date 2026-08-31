import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-white/10 hover:border-white/20',
  ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
  danger: 'bg-red-600/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/20',
  outline: 'bg-transparent border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400',
  accent: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20',
  success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs rounded-lg gap-1',
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        active:scale-[0.97]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} className="animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />}
    </button>
  );
}
