import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap ' +
  'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] ' +
  'disabled:pointer-events-none disabled:opacity-50 rounded-[var(--radius-md)]';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-accent-contrast hover:bg-[var(--accent-hover)] ' +
    'active:bg-[var(--accent-active)] font-semibold',
  secondary:
    'border border-[var(--border-default)] bg-[var(--surface-2)] text-fg ' +
    'hover:border-[var(--border-strong)] hover:bg-[var(--surface-3)]',
  ghost:
    'text-fg-secondary hover:bg-[var(--surface-2)] hover:text-fg',
  danger:
    'border border-[var(--signal-stop)] text-signal-stop ' +
    'hover:bg-[var(--signal-stop-soft)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={classes(variant, size, className)} {...props} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  /** Externe Ziele bekommen automatisch die sicheren rel-Attribute. */
  external?: boolean;
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  external,
  className,
  ...props
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
  return <Link className={classes(variant, size, className)} {...externalProps} {...props} />;
}
