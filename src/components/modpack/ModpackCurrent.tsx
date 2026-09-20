import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Placeholder } from '@/components/ui/Placeholder';
import type { ModpackVersionView } from '@/services/modpack/types';
import type { ExternalLink } from '@/lib/config/links';
import { cn } from '@/lib/utils/cn';

/** Aktuelle Modpack-Version, prominent dargestellt. */
export function ModpackCurrent({
  version,
  curseforge,
  modrinth,
}: {
  version?: ModpackVersionView;
  curseforge?: ExternalLink;
  modrinth?: ExternalLink;
}) {
  if (!version) {
    return (
      <Placeholder title="Aktuelle Modpack-Version">
        Sobald das Team im Dashboard ein Release anlegt, erscheint es hier mit Version,
        Minecraft-Version, Loader, Änderungsliste und Download.
      </Placeholder>
    );
  }

  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--accent-border)]',
        'bg-[var(--surface-2)] p-6 sm:p-8',
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge tone="clear">Aktuell</StatusBadge>
        <span className="ur-display text-xs uppercase text-fg-muted">
          Veröffentlicht am{' '}
          {version.releasedAt.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>

      <h3 className="ur-display mt-4 text-3xl text-fg">
        {version.version}
      </h3>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <Fact label="Minecraft" value={version.minecraftVersion} />
        <Fact
          label="Loader"
          value={
            version.loaderVersion ? `${version.loader} ${version.loaderVersion}` : version.loader
          }
        />
        <Fact label="Dateien" value={String(version.files.length)} />
      </dl>

      {version.changelog.length > 0 && (
        <div className="mt-6">
          <p className="ur-display text-xs uppercase text-fg-muted">
            Änderungen
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fg-secondary">
            {version.changelog.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {version.files[0] && (
          <ButtonLink href={version.files[0].url} size="lg">
            Direkt herunterladen
          </ButtonLink>
        )}
        {curseforge && (
          <ButtonLink href={curseforge.url} external variant="secondary" size="lg">
            CurseForge
          </ButtonLink>
        )}
        {modrinth && (
          <ButtonLink href={modrinth.url} external variant="secondary" size="lg">
            Modrinth
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="ur-display text-xs uppercase text-fg-muted">
        {label}
      </dt>
      <dd className="ur-display mt-1 text-lg text-fg">{value}</dd>
    </div>
  );
}
