import Link from 'next/link';
import { routes, site } from '@/lib/config/site';

/**
 * Wortmarke mit technischem Signet: zwei Schienen, die in einer Weiche
 * zusammenlaufen, darüber ein Signalpunkt. Kein Pixel-Art, keine Minecraft-Optik.
 *
 * TODO: Sobald der Verein ein offizielles Logo liefert, ersetzt es dieses Signet.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href={routes.home}
      className="group inline-flex items-center gap-3"
      aria-label={`${site.name} — Startseite`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="5"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
        />
        {/* Schienenpaar mit Weiche */}
        <path
          d="M10 27V17l6-6M22 27V17l-6-6M16 11V5"
          stroke="var(--fg-secondary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Schwellen */}
        <path
          d="M8.5 23.5h15M9.5 20h13"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Signalpunkt */}
        <circle
          cx="16"
          cy="6"
          r="2.5"
          fill="var(--accent)"
          className="transition-opacity duration-[var(--duration-base)] group-hover:opacity-80"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap text-base font-semibold tracking-tight">
          {compact ? site.shortName : site.name}
        </span>
        {!compact && (
          <span className="ur-display mt-1 hidden text-[0.6rem] uppercase text-fg-muted sm:block">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
