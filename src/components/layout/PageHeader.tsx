import { cn } from '@/lib/utils/cn';

/** Kopfbereich einer Unterseite: Marke, Überschrift, Einordnung. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'border-b border-[var(--border-subtle)] bg-[var(--surface-1)] ur-grid-surface',
        className,
      )}
    >
      <div className="ur-container py-14 sm:py-20">
        {eyebrow && <span className="ur-eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl text-3xl sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-fg-secondary">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
