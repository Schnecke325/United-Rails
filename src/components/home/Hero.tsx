import { ButtonLink } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { routes, site } from '@/lib/config/site';
import type { ExternalLink } from '@/lib/config/links';

/**
 * Startbereich. Text links, Bannerbild rechts.
 *
 * Das Bild liefert der Verein. Bis dahin steht dort ein Platzhalter im selben
 * Seitenverhältnis, damit sich beim Austausch nichts verschiebt.
 */
export function Hero({ discord }: { discord?: ExternalLink }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-0)]">
      <div aria-hidden className="absolute inset-0 -z-10 ur-blueprint-surface opacity-70" />

      <div className="ur-container grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div>
          <span className="ur-eyebrow">Eingetragener Verein und Minecraft-Projekt</span>

          <h1 className="mt-5 text-hero font-semibold tracking-tight">{site.name}</h1>

          <p className="ur-display mt-4 text-lg uppercase tracking-[var(--tracking-display)] text-fg-muted sm:text-xl">
            {site.tagline}
          </p>

          <p className="mt-6 max-w-xl text-lg text-fg-secondary">
            Wir bauen in Minecraft ein Eisenbahnnetz: Strecken, Bahnhöfe, Fahrzeuge und einen
            Betrieb nach Fahrplan. Getragen wird das Ganze von United Rails e.V.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={routes.server} size="lg">
              Server ansehen
            </ButtonLink>
            {discord ? (
              <ButtonLink href={discord.url} external variant="secondary" size="lg">
                Discord beitreten
              </ButtonLink>
            ) : (
              <ButtonLink href={routes.community} variant="secondary" size="lg">
                Zur Community
              </ButtonLink>
            )}
          </div>
        </div>

        <ImagePlaceholder
          label="Bannerbild der Startseite"
          ratio="4 / 3"
          hint="Querformat, zum Beispiel ein Bahnhof oder eine Strecke aus dem Netz"
        />
      </div>

      <RailStrip />
    </section>
  );
}

/** Schmales Gleisband als Abschluss des Startbereichs. */
function RailStrip() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none block h-10 w-full"
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
    >
      <path d="M0 14h1200" stroke="var(--border-default)" strokeWidth="1.5" />
      <path d="M0 26h1200" stroke="var(--border-default)" strokeWidth="1.5" />
      <path
        d="M0 20h1200"
        stroke="var(--border-subtle)"
        strokeWidth="10"
        strokeDasharray="2 12"
      />
      <circle cx="240" cy="20" r="4" fill="var(--accent-bright)" />
      <circle cx="880" cy="20" r="4" fill="var(--signal-clear)" />
    </svg>
  );
}
