import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Mitglied werden',
  description: 'Interesse an einer Mitgliedschaft im United Rails e.V. bekunden.',
  alternates: { canonical: routes.mitgliedschaft },
};

export default function MitgliedschaftPage() {
  // TODO: Das Formular folgt in der Ausbaustufe „Mitgliedschaft".
  return (
    <>
      <PageHeader
        eyebrow="Mitmachen"
        title="Mitglied werden"
        description="Bekunde dein Interesse an einer Mitgliedschaft im United Rails e.V. Für diesen ersten Schritt reichen Minecraft-Name, Discord-Name und deine Motivation."
      />

      <Section tone="base">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Placeholder title="Interessensformular">
            Das Formular wird angeschlossen, sobald die Datenbank steht. Abgefragt werden
            Minecraft-Name, Discord-Name und Motivation — kein bürgerlicher Name.
          </Placeholder>

          <Card>
            <CardBody className="space-y-3">
              <CardTitle>Was das ist und was nicht</CardTitle>
              <p className="text-sm text-fg-secondary">
                Diese Anfrage ist eine <strong className="text-fg">
                Interessensbekundung</strong>. Sie ist kein Aufnahmeantrag und begründet keine
                Mitgliedschaft.
              </p>
              <p className="text-sm text-fg-secondary">
                Wie eine vollständige Vereinsmitgliedschaft abläuft, welche Angaben dafür
                nötig sind und welche Voraussetzungen gelten, teilt der Verein mit.
              </p>
              <Placeholder title="Angaben des Vereins zur Mitgliedschaft">
                Ablauf, Voraussetzungen und Beiträge liegen noch nicht vor. Es werden keine
                rechtlichen Aussagen erfunden.
              </Placeholder>
            </CardBody>
          </Card>
        </div>
      </Section>
    </>
  );
}
