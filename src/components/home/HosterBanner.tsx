import { Placeholder } from '@/components/ui/Placeholder';
import type { ExternalLink } from '@/lib/config/links';

/**
 * Partner- und Hosterbereich.
 *
 * TODO: Name, Logo und genaue Formulierung der Partnerschaft kommen vom Verein.
 * Ohne konfigurierte HOSTER_URL bleibt hier ein sichtbarer Platzhalter.
 */
export function HosterBanner({ hoster }: { hoster?: ExternalLink }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 sm:p-8">
      <span className="ur-eyebrow">Partner</span>
      {hoster ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-fg-secondary">
            Server und Webseite laufen bei unserem Hostingpartner.
          </p>
          <a
            href={hoster.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Zum Hoster
          </a>
        </div>
      ) : (
        <Placeholder className="mt-4" title="Partner und Hoster" token="HOSTER_URL">
          Name, Logo und Beschreibung der Partnerschaft liegen noch nicht vor.
        </Placeholder>
      )}
    </div>
  );
}
