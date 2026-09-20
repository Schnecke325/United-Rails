import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { Prose } from '@/components/ui/Prose';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Datenschutz',
  alternates: { canonical: routes.datenschutz },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutz" />
      <Section tone="base">
        <div className="space-y-6">
          <Placeholder title="Datenschutzerklärung">
            Die Erklärung liefert der Verein. Es wird kein rechtlicher Text erfunden.
          </Placeholder>

          <Prose>
            <h2>Woran sich die Erklärung orientieren muss</h2>
            <p>
              Damit die Zulieferung vollständig wird, hier die Stellen, an denen diese
              Webseite personenbezogene Daten verarbeitet. Das ist eine technische
              Aufstellung, keine Datenschutzerklärung.
            </p>
            <ul>
              <li>Anmeldung von Teammitgliedern über Discord (Discord-ID, Benutzername, Avatar)</li>
              <li>Galerie-Uploads (Minecraft-Name, optional Discord-Name, Bild, Titel, Beschreibung)</li>
              <li>Builder-Bewerbungen (Minecraft-Name, Discord-Name, Begründung, Bilder)</li>
              <li>Interessensbekundungen zur Mitgliedschaft (Minecraft-Name, Discord-Name, Motivation)</li>
              <li>Protokoll administrativer Aktionen im internen Bereich</li>
              <li>Server-Logs des Hosters</li>
            </ul>
          </Prose>
        </div>
      </Section>
    </>
  );
}
