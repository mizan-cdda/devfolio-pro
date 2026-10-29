import { cn } from '@/lib/cn';

interface TagListProps {
  items: string[];
  label: string;
  className?: string;
}

/** Inline list of technologies. Rendered as a real list so screen readers announce the count. */
export function TagList({ items, label, className }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-x-1.5 gap-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="type-meta rounded-control border border-line px-2.5 py-1 text-muted">
          {item}
        </li>
      ))}
    </ul>
  );
}
