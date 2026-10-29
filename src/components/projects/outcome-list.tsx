import { cn } from '@/lib/cn';
import type { Outcome } from '@/types/content';

interface OutcomeListProps {
  outcomes: Outcome[];
  size?: 'compact' | 'large';
  className?: string;
}

/** Measurable results. The `context` line says how each figure was measured. */
export function OutcomeList({ outcomes, size = 'compact', className }: OutcomeListProps) {
  if (outcomes.length === 0) return null;
  return (
    <dl className={cn('grid gap-6', size === 'large' ? 'sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3', className)}>
      {outcomes.map((outcome) => (
        <div key={outcome.label} className="flex flex-col-reverse justify-end gap-1">
          <dt className="text-sm leading-snug">
            {outcome.label}
            {outcome.context && size === 'large' ? (
              <span className="mt-1 block text-xs leading-snug text-muted">{outcome.context}</span>
            ) : null}
          </dt>
          <dd className={cn('type-display tabular-nums', size === 'large' ? 'text-5xl' : 'text-3xl')}>{outcome.value}</dd>
        </div>
      ))}
    </dl>
  );
}
