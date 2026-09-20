import { cn } from '@/lib/utils/cn';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * Hintergrund. `base` ist weiß, `raised` ein hellgraues Band, `grid` legt
   * zusätzlich das Ingenieurraster darunter, `dark` ist ein Kontrastband.
   */
  tone?: 'base' | 'raised' | 'grid' | 'dark';
};

export function Section({ tone = 'base', className, children, ...props }: SectionProps) {
  const tones = {
    base: 'bg-[var(--surface-0)]',
    raised: 'bg-[var(--surface-1)]',
    grid: 'bg-[var(--surface-1)] ur-grid-surface',
    dark: 'ur-dark ur-grid-surface',
  } as const;

  return (
    <section className={cn('ur-section', tones[tone], className)} {...props}>
      <div className="ur-container">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  /** Kleine Marke über der Überschrift, im Anzeigetafel-Stil. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Überschriftenebene, damit die Dokumentstruktur stimmt. */
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="ur-eyebrow">{eyebrow}</span>}
      <Tag className={cn('text-2xl sm:text-3xl', align === 'center' && 'max-w-2xl')}>{title}</Tag>
      {description && (
        <p className={cn('max-w-2xl text-fg-secondary', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
