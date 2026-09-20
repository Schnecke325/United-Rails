import { cn } from '@/lib/utils/cn';

/**
 * Steht dort, wo später ein echtes Bild hinkommt.
 *
 * Der Platzhalter hält das Seitenverhältnis, damit sich das Layout beim
 * Austausch nicht verschiebt, und benennt, welches Bild gebraucht wird.
 * Ersetzt wird er durch ein `next/image` mit denselben Maßen.
 */
type Props = {
  /** Was für ein Bild hier hingehört, zum Beispiel "Bannerbild Startseite". */
  label: string;
  /** Seitenverhältnis als CSS-Wert, etwa "16 / 9". */
  ratio?: string;
  /** Empfohlene Kantenlänge, wird klein darunter angezeigt. */
  hint?: string;
  className?: string;
};

export function ImagePlaceholder({ label, ratio = '16 / 9', hint, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`Platzhalter für ein Bild: ${label}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        'ur-image-placeholder relative flex w-full flex-col items-center justify-center gap-1',
        'rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)]',
        'px-4 text-center',
        className,
      )}
    >
      <span className="ur-display text-xs uppercase tracking-[var(--tracking-display)] text-fg-muted">
        Bild folgt
      </span>
      <span className="text-sm font-medium text-fg-secondary">{label}</span>
      {hint && <span className="text-xs text-fg-muted">{hint}</span>}
    </div>
  );
}
