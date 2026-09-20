import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Card, CardBody, CardTitle } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { ServerStatusPanel } from '@/components/home/ServerStatusPanel';
import { getServerStatus } from '@/services/serverStatus/serverStatusService';
import { serverAddress } from '@/lib/config/links';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Server',
  description:
    'Netzkarte, Bahnhöfe, Linien, Fahrpläne und Verbindungssuche im Eisenbahnnetz von United Rails.',
  alternates: { canonical: routes.server },
};

export default async function ServerPage() {
  const status = await getServerStatus();

  return (
    <>
      <PageHeader
        eyebrow="Server"
        title="Das Netz"
        description="Karte, Bahnhöfe, Linien und Fahrpläne an einem Ort — mit Verbindungssuche von Bahnhof zu Bahnhof."
      />

      <Section tone="base">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card interactive>
              <CardBody className="space-y-3">
                <CardTitle>Netzkarte</CardTitle>
                <p className="text-sm text-fg-secondary">
                  Karte aus Kacheln mit Zoom, Verschieben, Bahnhöfen und Strecken.
                </p>
                <ButtonLink href={routes.serverKarte} variant="secondary" size="sm">
                  Karte öffnen
                </ButtonLink>
              </CardBody>
            </Card>
            <Card interactive>
              <CardBody className="space-y-3">
                <CardTitle>Verbindungssuche</CardTitle>
                <p className="text-sm text-fg-secondary">
                  Von Bahnhof zu Bahnhof, mit Abfahrt, Ankunft, Dauer, Zug und Umstiegen.
                </p>
                <ButtonLink href={routes.serverNavigator} variant="secondary" size="sm">
                  Verbindung suchen
                </ButtonLink>
              </CardBody>
            </Card>
          </div>
          <ServerStatusPanel status={status} address={serverAddress()} />
        </div>
      </Section>

      <Section tone="grid">
        <SectionHeading
          eyebrow="Datenquelle"
          title="Fahrplandaten aus dem Create Railway Navigator"
          description="Bahnhöfe, Linien und Fahrpläne sollen aus dem Create Railway Navigator kommen."
        />
        <Placeholder
          className="mt-8"
          title="CRN-Schnittstelle"
          token="CRN_API_BASE_URL · CRN_API_KEY"
        >
          Die offizielle Dokumentation liegt noch nicht vor. Die Anwendung hat eine fertige
          Adapterschicht, aber keine erfundenen Endpunkte, Formate oder Anmeldeverfahren.
          Sobald die Dokumentation da ist, wird ausschließlich danach umgesetzt.
        </Placeholder>
      </Section>
    </>
  );
}
