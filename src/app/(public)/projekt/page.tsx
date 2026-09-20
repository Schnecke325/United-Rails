import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Prose } from '@/components/ui/Prose';
import { Placeholder } from '@/components/ui/Placeholder';
import { ButtonLink } from '@/components/ui/Button';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Projekt',
  description:
    'Das Eisenbahnprojekt von United Rails: Streckenbau, Bahnhöfe, Fahrzeuge und Fahrplanbetrieb in Minecraft.',
  alternates: { canonical: routes.projekt },
};

export default function ProjektPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projekt"
        title="Das Eisenbahnprojekt"
        description="Ein zusammenhängendes Netz, das über Jahre wächst: geplante Strecken, gebaute Bahnhöfe, eingesetzte Fahrzeuge und ein Betrieb nach Fahrplan."
      />

      <Section tone="base">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Prose>
            <h2>Wie gebaut wird</h2>
            <p>
              Strecken entstehen nicht zufällig. Sie werden geplant, an das bestehende Netz
              angebunden und mit Bahnhöfen, Betriebsanlagen und Signaltechnik ausgestattet.
              Was fertig ist, geht in den Fahrplanbetrieb über.
            </p>
            <h2>Wer baut</h2>
            <p>
              Am Netz arbeitet ein Team aus Buildern. Wer mitbauen möchte, bewirbt sich mit
              eigenen Bauwerken oder Fahrzeugen.
            </p>
          </Prose>

          <div className="space-y-4">
            <Placeholder title="Offizielle Projektbeschreibung">
              Der ausführliche Text zum Projekt, seinen Zielen und seinem Umfang kommt vom
              Verein. Die Abschnitte hier beschreiben nur die Arbeitsweise und enthalten
              keine offiziellen Aussagen.
            </Placeholder>
            <ButtonLink href={routes.builder} variant="secondary">
              Als Builder bewerben
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="grid">
        <SectionHeading
          eyebrow="Historie"
          title="Wie United Rails entstanden ist"
          description="Die Zeitleiste der Gründung und der wichtigsten Schritte."
        />
        <div className="mt-8">
          <ButtonLink href={routes.historie} variant="secondary">
            Zur Zeitleiste
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
