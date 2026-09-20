import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { MasonryGrid } from './MasonryGrid';
import type { GalleryImageView } from '@/services/gallery/types';

/**
 * Vorschau auf der Startseite.
 *
 * Solange keine freigegebenen Bilder vorliegen, zeigen Platzhalter im richtigen
 * Seitenverhältnis, wie der Bereich später aussieht. Die Platzhalter sind als
 * solche beschriftet und werden einfach durch echte Bilder ersetzt.
 */
const previewSlots = [
  { label: 'Bahnhof', ratio: '4 / 5' },
  { label: 'Fahrzeug', ratio: '4 / 3' },
  { label: 'Strecke', ratio: '3 / 4' },
  { label: 'Landschaft', ratio: '1 / 1' },
];

export function GalleryPreview({ images }: { images: GalleryImageView[] }) {
  if (images.length > 0) {
    return <MasonryGrid images={images.slice(0, 8)} />;
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {previewSlots.map((slot) => (
          <li key={slot.label}>
            <ImagePlaceholder label={slot.label} ratio={slot.ratio} />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-fg-muted">
        Hier stehen später Bilder aus der Community. Sie erscheinen, sobald das Team sie
        freigegeben hat.
      </p>
    </div>
  );
}
