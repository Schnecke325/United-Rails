import { cn } from '@/lib/utils/cn';

/**
 * Sichtbarer Platzhalter für Angaben, die der Verein noch liefern muss, und
 * für Anbindungen, deren Dokumentation noch aussteht.
 *
 * Deutlich als Platzhalter erkennbar, damit niemand ihn für eine echte Angabe
 * hält und niemand in Versuchung kommt, hier etwas zu erfinden.
 */
type Props = {
  /** Kurzer Titel, zum Beispiel "Vereinshistorie". */
  title: string;
  /** Was genau fehlt und von wem es kommt. */
  children?: React.ReactNode;
  /** Technische Marke, erscheint als Kennzeichnung. */
  token?: string;
  className?: string;
};

export function Placeholder({ title, children, token, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border border-dashed border-[var(--signal-info)]',
        'bg-[var(--signal-info-soft)] p-5',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="ur-display text-xs uppercase text-signal-info">Platzhalter</span>
        <span className="font-semibold text-fg">{title}</span>
      </div>
      {children && <div className="mt-2 text-sm text-fg-secondary">{children}</div>}
      {token && <code className="ur-display mt-3 block text-xs text-fg-muted">{token}</code>}
    </div>
  );
}
