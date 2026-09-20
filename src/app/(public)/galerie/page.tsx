import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { EmptyGallery } from '@/components/gallery/EmptyGallery';
import { MasonryGrid } from '@/components/gallery/MasonryGrid';
import { GALLERY_CATEGORIES } from '@/services/gallery/types';
import { routes } from '@/lib/config/site';
import type { GalleryImageView } from '@/services/gallery/types';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Bilder aus der Community von United Rails: Fahrzeuge, Bauwerke, Bahnhöfe, Strecken und Landschaft.',
  alternates: { canonical: routes.galerie },
};

export default function GaleriePage() {
  // TODO: Freigegebene Bilder kommen aus der Datenbank, sobald sie steht.
  const images: GalleryImageView[] = [];

  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Bilder aus dem Netz"
        description="Alle Bilder stammen aus der Community. Vor der Veröffentlichung sieht das Team sie durch."
      >
        <ButtonLink href={routes.galerieUpload}>Bild einreichen</ButtonLink>
      </PageHeader>

      <Section tone="base">
        {/* Feste Kategorien, keine frei erfundenen Schlagworte. */}
        <nav aria-label="Kategorien">
          <ul className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((category) => (
              <li key={category.slug}>
                <span
                  className={
                    'ur-display inline-flex rounded-[var(--radius-pill)] border ' +
                    'border-[var(--border-default)] px-3 py-1 text-xs ' +
                    'uppercase text-fg-secondary'
                  }
                >
                  {category.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          {images.length === 0 ? <EmptyGallery /> : <MasonryGrid images={images} />}
        </div>
      </Section>
    </>
  );
}
