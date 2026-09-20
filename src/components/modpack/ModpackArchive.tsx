import type { ModpackVersionView } from '@/services/modpack/types';

/**
 * Ältere Versionen, eingeklappt. Umgesetzt mit `<details>`, damit es auch ohne
 * JavaScript und mit Tastatur funktioniert.
 */
export function ModpackArchive({ versions }: { versions: ModpackVersionView[] }) {
  if (versions.length === 0) {
    return (
      <p className="text-sm text-fg-muted">
        Noch keine älteren Versionen im Archiv.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-[var(--border-subtle)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)]">
      {versions.map((version) => (
        <li key={version.id}>
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface-2)]">
              <span className="ur-display text-base text-fg">
                Version {version.version}
              </span>
              <span className="flex items-center gap-4">
                <span className="ur-display hidden text-xs uppercase text-fg-muted sm:inline">
                  MC {version.minecraftVersion} · {version.loader}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden
                  className="shrink-0 text-fg-muted transition-transform group-open:rotate-180"
                >
                  <path
                    d="M2 4l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>

            <div className="space-y-4 border-t border-[var(--border-subtle)] px-5 py-5">
              <dl className="grid gap-3 sm:grid-cols-3">
                <div>
                  <dt className="ur-display text-xs uppercase text-fg-muted">
                    Veröffentlicht
                  </dt>
                  <dd className="ur-display text-sm">
                    {version.releasedAt.toLocaleDateString('de-DE')}
                  </dd>
                </div>
                <div>
                  <dt className="ur-display text-xs uppercase text-fg-muted">
                    Minecraft
                  </dt>
                  <dd className="ur-display text-sm">{version.minecraftVersion}</dd>
                </div>
                <div>
                  <dt className="ur-display text-xs uppercase text-fg-muted">
                    Loader
                  </dt>
                  <dd className="ur-display text-sm">{version.loader}</dd>
                </div>
              </dl>

              {version.changelog.length > 0 && (
                <ul className="list-disc space-y-1 pl-5 text-sm text-fg-secondary">
                  {version.changelog.map((entry, index) => (
                    <li key={index}>{entry}</li>
                  ))}
                </ul>
              )}

              {version.files.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  className="inline-block text-sm text-accent hover:underline"
                >
                  {file.label} herunterladen
                </a>
              ))}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
