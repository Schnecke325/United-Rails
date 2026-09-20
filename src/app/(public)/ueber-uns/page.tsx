import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Prose } from '@/components/ui/Prose';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'United Rails e.V.: eingetragener Verein, Minecraft-Eisenbahnprojekt, Community und Team.',
  alternates: { canonical: routes.ueberUns },
};

const pillars = [
  {
    title: 'Der Verein',
    body: 'United Rails e.V. ist ein eingetragener Verein. Er trägt das Projekt organisatorisch und langfristig.',
  },
  {
    title: 'Das Minecraft-Projekt',
    body: 'Auf dem Server entsteht ein zusammenhängendes Eisenbahnnetz mit Strecken, Bahnhöfen, Fahrzeugen und Fahrplänen.',
  },
  {
    title: 'Die Community',
    body: 'Gebaut, geplant und gefahren wird gemeinsam. Der Austausch läuft über Discord.',
  },
];

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Verein, Projekt und Community"
        description="United Rails ist beides: ein Minecraft-Eisenbahnprojekt und ein eingetragener Verein, der es trägt."
      />

      <Section tone="base">
        <ul className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <Card className="h-full">
                <CardBody className="space-y-3">
                  <CardTitle>{pillar.title}</CardTitle>
                  <p className="text-sm text-fg-secondary">
                    {pillar.body}
                  </p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Prose>
            <h2>Ziele</h2>
            <p>
              Das Projekt ist auf Dauer angelegt. Strecken und Bahnhöfe werden nicht nur
              gebaut, sondern betrieben, gepflegt und erweitert.
            </p>
          </Prose>
          <Placeholder title="Offizielle Vereinsangaben">
            Satzungsziele, Zweck des Vereins, Gründungsdaten und offizielle Formulierungen
            liefert der Verein. Bis dahin steht hier keine offizielle Aussage.
          </Placeholder>
        </div>
      </Section>

      <Section tone="grid">
        <SectionHeading
          eyebrow="Team"
          title="Wer dahintersteht"
          description="Die Profile pflegt das Team selbst im internen Bereich."
        />
        <div className="mt-8">
          <ButtonLink href={routes.team} variant="secondary">
            Zum Team
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
