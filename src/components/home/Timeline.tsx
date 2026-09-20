import { Placeholder } from '@/components/ui/Placeholder';
import { cn } from '@/lib/utils/cn';

export type TimelineEntry = {
  id: string;
  /** Freies Datumsfeld, damit auch „Frühjahr 2023" möglich ist. */
  date: string;
  title: string;
  body?: string;
};

/**
 * Zeitleiste im Streckenband-Stil: eine durchgehende Linie mit Haltepunkten.
 *
 * Solange keine offiziellen Angaben vorliegen, zeigt sie einen Platzhalter,
 * keine erfundenen Gründungsdaten.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) {
    return (
      <Placeholder
        title="Offizielle United-Rails-Historie"
        token="[PLATZHALTER: OFFIZIELLE UNITED-RAILS-HISTORIE]"
      >
        Gründungsdatum, Eintragung des Vereins und die weiteren Stationen kommen vom
        Verein. Die Zeitleiste ist fertig und wird dann gefüllt.
      </Placeholder>
    );
  }

  return (
    <ol className="relative space-y-10 border-l-2 border-[var(--border-default)] pl-8">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            aria-hidden
            className={cn(
              'absolute -left-[41px] top-1.5 h-4 w-4 rounded-full',
              'border-2 border-[var(--accent-bright)] bg-[var(--surface-0)]',
            )}
          />
          <span className="ur-display text-xs uppercase text-accent-text">
            {entry.date}
          </span>
          <h3 className="mt-1 text-lg">{entry.title}</h3>
          {entry.body && (
            <p className="mt-2 max-w-2xl text-fg-secondary">{entry.body}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
