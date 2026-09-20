import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Impressum',
  alternates: { canonical: routes.impressum },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <Section tone="base">
        <Placeholder title="Impressumsangaben">
          Vertretungsberechtigte Personen, Anschrift, Kontakt, Registergericht und
          Registernummer liefert der Verein. Hier steht bewusst kein erfundener Text — die
          Seite bleibt bis zur Zulieferung leer.
        </Placeholder>
      </Section>
    </>
  );
}
