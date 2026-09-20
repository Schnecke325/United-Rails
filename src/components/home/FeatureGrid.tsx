import { Card, CardBody, CardTitle } from '@/components/ui/Card';

type Feature = {
  title: string;
  body: string;
  icon: 'rail' | 'train' | 'station' | 'timetable' | 'community' | 'association';
};

/**
 * „Was ist United Rails?" — beschreibt die Bestandteile, die die Vorgabe nennt.
 * Reine Struktur- und Tätigkeitsbeschreibung, keine erfundenen Vereinsaussagen.
 */
const features: Feature[] = [
  {
    icon: 'rail',
    title: 'Streckenbau',
    body: 'Gleise, Trassen und Anbindungen entstehen gemeinsam und wachsen zu einem zusammenhängenden Netz.',
  },
  {
    icon: 'train',
    title: 'Fahrzeuge',
    body: 'Züge und Fahrzeuge werden gebaut, eingesetzt und im Netz betrieben.',
  },
  {
    icon: 'station',
    title: 'Bahnhöfe und Infrastruktur',
    body: 'Bahnhöfe, Betriebsanlagen und die Bauten drumherum bilden die Knotenpunkte des Netzes.',
  },
  {
    icon: 'timetable',
    title: 'Fahrpläne',
    body: 'Linien und Fahrpläne verbinden die Bahnhöfe zu planbaren Verbindungen.',
  },
  {
    icon: 'community',
    title: 'Community',
    body: 'Ein Server, auf dem gemeinsam geplant, gebaut und gefahren wird.',
  },
  {
    icon: 'association',
    title: 'Eingetragener Verein',
    body: 'United Rails e.V. gibt dem Projekt eine dauerhafte organisatorische Grundlage.',
  },
];

export function FeatureGrid() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <li key={feature.title}>
          <Card className="h-full">
            <CardBody className="flex h-full flex-col gap-3">
              <FeatureIcon name={feature.icon} />
              <CardTitle>{feature.title}</CardTitle>
              <p className="text-sm text-fg-secondary">{feature.body}</p>
            </CardBody>
          </Card>
        </li>
      ))}
    </ul>
  );
}

const paths: Record<Feature['icon'], string> = {
  rail: 'M5 21V9l7-6 7 6v12M9 21V11M15 21V11M5 14h14M5 18h14',
  train: 'M6 3h12v12H6zM6 15l-2 5M18 15l2 5M9 7h6M9 11h.01M15 11h.01',
  station: 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h6',
  timetable: 'M4 4h16v16H4zM4 9h16M9 9v11M13 13h4M13 17h4',
  community: 'M8 11a3 3 0 100-6 3 3 0 000 6zM2 21v-2a5 5 0 015-5h2a5 5 0 015 5v2M17 8h5M19.5 5.5v5',
  association: 'M12 3l9 5v3c0 5-3.6 8.7-9 10-5.4-1.3-9-5-9-10V8l9-5zM9 12l2 2 4-4',
};

function FeatureIcon({ name }: { name: Feature['icon'] }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-inset)] text-accent"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d={paths[name]}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
