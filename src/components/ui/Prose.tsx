import { cn } from '@/lib/utils/cn';

/** Lesbarer Textblock mit begrenzter Zeilenlänge. */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'max-w-[var(--content-narrow)] space-y-4 text-fg-secondary',
        '[&_a]:text-accent [&_a:hover]:underline',
        '[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-fg',
        '[&_h3]:mt-6 [&_h3]:text-lg [&_h3]:text-fg',
        '[&_strong]:text-fg',
        '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5',
        className,
      )}
      {...props}
    />
  );
}
