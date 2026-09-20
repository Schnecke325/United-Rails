import { ButtonLink } from '@/components/ui/Button';
import { routes, site } from '@/lib/config/site';
import type { ExternalLink } from '@/lib/config/links';

/**
 * Hero mit großem Bannerbereich.
 *
 * TODO: Das Bannerbild liefert der Verein. Bis dahin trägt der Bereich eine
 * technische Zeichnung aus Raster, Streckenlinie und Signal — kein erfundenes
 * Marketingbild und kein Platzhalter-Stockfoto.
 */
export function Hero({ discord }: { discord?: ExternalLink }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border-subtle)]">
      {/* Hintergrund: Raster, Blaupause, Lichtkegel */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--surface-0)]" />
      <div aria-hidden className="absolute inset-0 -z-10 ur-grid-surface opacity-60" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_50%_-20%,rgba(244,96,10,0.16),transparent_65%)]"
      />
      <HeroSchematic />

      <div className="ur-container relative flex min-h-[78svh] flex-col justify-center py-20 sm:py-28">
        <span className="ur-eyebrow">Eingetragener Verein · Minecraft</span>

        <h1 className="mt-5 max-w-4xl text-hero font-semibold tracking-tight">
          {site.name}
        </h1>

        <p className="ur-display mt-4 text-lg uppercase tracking-[var(--tracking-display)] text-fg-secondary sm:text-xl">
          {site.tagline}
        </p>

        <p className="mt-6 max-w-xl text-lg text-fg-secondary">
          {site.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={routes.server} size="lg">
            Server entdecken
          </ButtonLink>
          {discord ? (
            <ButtonLink href={discord.url} external variant="secondary" size="lg">
              Community beitreten
            </ButtonLink>
          ) : (
            <ButtonLink href={routes.community} variant="secondary" size="lg">
              Community ansehen
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}

/** Dezente Streckenzeichnung am unteren Rand des Heros. */
function HeroSchematic() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-full"
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
    >
      <path
        d="M0 176h420l70-58h250l70 58h390"
        stroke="var(--border-default)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M0 192h380l70-58h290l70 58h390"
        stroke="var(--border-subtle)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="490" cy="118" r="5" fill="var(--accent)" />
      <circle cx="740" cy="118" r="5" fill="var(--signal-clear)" />
      <line
        x1="0"
        y1="210"
        x2="1200"
        y2="210"
        stroke="var(--blueprint-line)"
        strokeWidth="1"
        strokeDasharray="6 10"
      />
    </svg>
  );
}
