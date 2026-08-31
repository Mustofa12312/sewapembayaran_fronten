export function Skeleton({ className = '', ...props }) {
  return <div className={`skeleton ${className}`} {...props} />;
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3.5"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card rounded-2xl p-6 space-y-4 ${className}`}>
      <Skeleton className="h-5 w-2/5" />
      <SkeletonText lines={2} />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonProductCard({ className = '' }) {
  return (
    <div className={`glass-card rounded-2xl p-8 space-y-5 ${className}`}>
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-6 w-3/5" />
      <SkeletonText lines={2} />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3.5 w-3/5" />
        <Skeleton className="h-3.5 w-2/5" />
      </div>
      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex gap-4 py-3">
          {Array.from({ length: cols }).map((_, col) => (
            <Skeleton
              key={col}
              className="h-4 flex-1"
              style={{ maxWidth: col === 0 ? '120px' : undefined }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
