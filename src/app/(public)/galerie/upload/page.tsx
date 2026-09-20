import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { Card, CardBody } from '@/components/ui/Card';
import { GALLERY_CATEGORIES } from '@/services/gallery/types';
import { routes } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Bild einreichen',
  description: 'Reiche ein Bild für die Galerie von United Rails ein.',
  alternates: { canonical: routes.galerieUpload },
  robots: { index: false, follow: true },
};

export default function GalerieUploadPage() {
  // TODO: Das Formular folgt in der Ausbaustufe „Galerie"; es braucht die
  // Datenbank, den StorageService und die Upload-Prüfung.
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Bild einreichen"
        description="Bild, Titel, Beschreibung, Kategorien, Minecraft-Name und optional dein Discord-Name."
      />
      <Section tone="base">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Placeholder title="Upload-Formular">
            Das Formular wird angeschlossen, sobald Datenbank und Dateiablage stehen.
          </Placeholder>

          <Card>
            <CardBody className="space-y-4 text-sm text-fg-secondary">
              <p className="font-medium text-fg">
                Was nach dem Einreichen passiert
              </p>
              <p>
                Eingereichte Bilder sind nicht sofort öffentlich. Das Team sieht sich jedes
                Bild an und gibt es frei oder lehnt es ab.
              </p>
              <div>
                <p className="ur-display text-xs uppercase text-fg-muted">
                  Kategorien zur Auswahl
                </p>
                <p className="mt-1">
                  {GALLERY_CATEGORIES.map((c) => c.label).join(' · ')}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Section>
    </>
  );
}
