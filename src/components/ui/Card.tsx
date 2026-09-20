import { cn } from '@/lib/utils/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Hebt die Karte beim Überfahren leicht an, nur für verlinkte Karten sinnvoll. */
  interactive?: boolean;
};

export function Card({ interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)]',
        'shadow-[var(--shadow-card)]',
        interactive &&
          'transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] ' +
            'hover:border-[var(--border-default)] hover:bg-[var(--surface-3)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 sm:p-7', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold', className)} {...props} />;
}
