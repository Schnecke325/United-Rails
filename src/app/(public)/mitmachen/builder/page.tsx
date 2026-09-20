import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Builder werden',
  description: 'Bewirb dich als Builder bei United Rails e.V.',
  alternates: { canonical: routes.builder },
};

const steps = [
  { title: 'Bewerbung schreiben', body: 'Minecraft-Name, Discord-Name und warum du dabei sein willst.' },
  { title: 'Bilder anhängen', body: 'Mehrere Bilder deiner Bauwerke, Fahrzeuge oder Strecken.' },
  { title: 'Rückmeldung abwarten', body: 'Das Team sieht sich jede Bewerbung an und meldet sich über Discord.' },
];

export default function BuilderPage() {
  // TODO: Das Bewerbungsformular folgt in der Ausbaustufe „Bewerbungen";
  // es braucht Datenbank, Dateiablage und die Upload-Prüfung.
  return (
    <>
      <PageHeader
        eyebrow="Mitmachen"
        title="Builder werden"
        description="Du baust Bahnhöfe, Strecken oder Fahrzeuge? Zeig uns, was du kannst."
      />

      <Section tone="base">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Placeholder title="Bewerbungsformular">
            Das Formular wird angeschlossen, sobald Datenbank und Dateiablage stehen. Es
            enthält außerdem die Ankreuzoption für Interesse an einer Mitgliedschaft im
            United Rails e.V.
          </Placeholder>

          <Card>
            <CardBody className="space-y-5">
              <CardTitle>So läuft es ab</CardTitle>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="ur-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent-border)] text-xs text-accent">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-medium text-fg">
                        {step.title}
                      </span>
                      <span className="block text-sm text-fg-secondary">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>
      </Section>
    </>
  );
}
