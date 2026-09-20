import { cn } from '@/lib/utils/cn';

/**
 * "Was ist United Rails?" nennt die Bestandteile, die die Vorgabe aufzählt.
 *
 * Bewusst ohne Symbole: Die Gliederung entsteht über Nummerierung, Typografie
 * und Abstand. Es steht hier nur, was das Projekt ausmacht, keine erfundenen
 * Aussagen des Vereins.
 */
const features = [
  {
    title: 'Streckenbau',
    body: 'Gleise und Trassen werden geplant, gebaut und an das bestehende Netz angebunden.',
  },
  {
    title: 'Fahrzeuge',
    body: 'Züge und andere Fahrzeuge entstehen im Projekt und fahren im Netz.',
  },
  {
    title: 'Bahnhöfe',
    body: 'Bahnhöfe und Betriebsanlagen sind die Knotenpunkte, an denen das Netz zusammenläuft.',
  },
  {
    title: 'Fahrpläne',
    body: 'Linien und Fahrpläne machen aus einzelnen Strecken planbare Verbindungen.',
  },
  {
    title: 'Community',
    body: 'Auf dem Server wird gemeinsam geplant, gebaut und gefahren.',
  },
  {
    title: 'Verein',
    body: 'United Rails e.V. gibt dem Projekt eine dauerhafte organisatorische Grundlage.',
  },
];

export function FeatureGrid() {
  return (
    <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <li
          key={feature.title}
          className={cn('border-t border-[var(--border-default)] pt-5')}
        >
          <span className="ur-display text-xs text-fg-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-fg-secondary">{feature.body}</p>
        </li>
      ))}
    </ul>
  );
}
