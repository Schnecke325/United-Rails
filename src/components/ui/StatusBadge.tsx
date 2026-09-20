import { cn } from '@/lib/utils/cn';

/**
 * Statusanzeige im Signalstil. Dieselben Farben tragen Galerie-Status,
 * Bewerbungsstatus und Serverstatus, damit die Seite ein Vokabular hat.
 */
export type SignalTone = 'clear' | 'stop' | 'caution' | 'info' | 'neutral';

const tones: Record<SignalTone, string> = {
  clear: 'text-signal-clear bg-[var(--signal-clear-soft)] border-[var(--signal-clear)]',
  stop: 'text-signal-stop bg-[var(--signal-stop-soft)] border-[var(--signal-stop)]',
  caution: 'text-signal-caution bg-[var(--signal-caution-soft)] border-[var(--signal-caution)]',
  info: 'text-signal-info bg-[var(--signal-info-soft)] border-[var(--signal-info)]',
  neutral: 'text-fg-muted bg-[var(--surface-1)] border-[var(--border-default)]',
};

type Props = {
  tone?: SignalTone;
  children: React.ReactNode;
  /** Zeigt links einen Signalpunkt. */
  dot?: boolean;
  className?: string;
};

export function StatusBadge({ tone = 'neutral', dot = true, children, className }: Props) {
  return (
    <span
      className={cn(
        'ur-display inline-flex items-center gap-2 rounded-[var(--radius-pill)] border',
        'px-3 py-1 text-xs uppercase',
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden className="h-2 w-2 rounded-full bg-current" />}
      {children}
    </span>
  );
}
