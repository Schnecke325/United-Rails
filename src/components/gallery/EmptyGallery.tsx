import { ButtonLink } from '@/components/ui/Button';
import { routes } from '@/lib/config/site';

/** Zustand, solange keine freigegebenen Bilder vorliegen. */
export function EmptyGallery({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-default)] bg-[var(--surface-1)] p-8 text-center">
      <p className="text-fg">Noch keine freigegebenen Bilder.</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
        Eingereichte Bilder erscheinen hier, sobald das Team sie freigegeben hat.
      </p>
      {!compact && (
        <ButtonLink href={routes.galerieUpload} variant="secondary" className="mt-5">
          Bild einreichen
        </ButtonLink>
      )}
    </div>
  );
}
