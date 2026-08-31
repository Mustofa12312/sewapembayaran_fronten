import { PackageOpen } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No data yet',
  description = '',
  actionLabel,
  onAction,
  actionTo,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/5 flex items-center justify-center mb-5">
        <Icon size={28} className="text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      )}
      {actionLabel && (onAction || actionTo) && (
        actionTo ? (
          <a href={actionTo}>
            <Button variant="secondary" size="sm">{actionLabel}</Button>
          </a>
        ) : (
          <Button variant="secondary" size="sm" onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  );
}
