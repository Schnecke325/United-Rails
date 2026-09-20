import Link from 'next/link';
import { routes, site } from '@/lib/config/site';

/**
 * Wortmarke mit technischem Signet: zwei Schienen, die in einer Weiche
 * zusammenlaufen, darüber ein Signalpunkt.
 *
 * TODO: Sobald der Verein ein Logo liefert, ersetzt es dieses Signet.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href={routes.home}
      className="group inline-flex items-center gap-3"
      aria-label={`${site.name}, zur Startseite`}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
        {/* Schienenpaar mit Weiche */}
        <path
          d="M10 28V17l6-6M22 28V17l-6-6M16 11V6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Schwellen */}
        <path
          d="M8.5 24.5h15M9.5 21h13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Signalpunkt */}
        <circle cx="16" cy="5" r="2.6" fill="var(--accent-bright)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap text-base font-semibold tracking-tight">
          {compact ? site.shortName : site.name}
        </span>
        {!compact && (
          <span className="ur-display mt-1 hidden whitespace-nowrap text-[0.6rem] uppercase text-fg-muted lg:block">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
