import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Verbindungssuche',
  description: 'Verbindungen im Netz von United Rails suchen: von Bahnhof zu Bahnhof.',
  alternates: { canonical: routes.serverNavigator },
};

export default function NavigatorPage() {
  // TODO: Suchmaske und Ergebnisliste folgen in der Ausbaustufe „Serverseite";
  // die Fahrplandaten kommen später aus dem CRN-Adapter.
  return (
    <>
      <PageHeader
        eyebrow="Navigator"
        title="Verbindungssuche"
        description="Von — Nach — Verbindung suchen. Das Ergebnis zeigt Abfahrt, Ankunft, Dauer, Zug, Linie und Umstiege."
      />
      <Section tone="base">
        <Placeholder title="Fahrplandaten" token="CRN_API_BASE_URL">
          Die Suchmaske wird an den CRN-Adapter angeschlossen, sobald die offizielle
          Dokumentation vorliegt. Bis dahin gibt es keine Beispielverbindungen, die echt
          aussehen könnten.
        </Placeholder>
      </Section>
    </>
  );
}
