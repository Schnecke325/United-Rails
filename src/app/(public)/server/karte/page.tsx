import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Netzkarte',
  description: 'Die Karte des Eisenbahnnetzes von United Rails mit Bahnhöfen und Strecken.',
  alternates: { canonical: routes.serverKarte },
};

export default function KartePage() {
  // TODO: Die Kartenkacheln (tile_z_x_y.png) liegen noch nicht vor. Die
  // Kartenkomponente folgt in der Ausbaustufe „Serverseite".
  return (
    <>
      <PageHeader
        eyebrow="Karte"
        title="Netzkarte"
        description="Kachelbasierte Karte mit Zoom, Verschieben, Bahnhöfen, Strecken und Punkten von Interesse."
      />
      <Section tone="base">
        <Placeholder title="Kartenkacheln">
          Die Karte lädt ein Kachelraster (zum Beispiel <code>tile_0_0.png</code>,{' '}
          <code>tile_0_1.png</code>). Sobald ein Satz Kacheln vorliegt, wird er hier
          eingebunden — ohne ein einzelnes riesiges Bild und ohne Annahme über das
          erzeugende Werkzeug.
        </Placeholder>
      </Section>
    </>
  );
}
